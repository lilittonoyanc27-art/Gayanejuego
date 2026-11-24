import { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildAnimal, type Animal, type Mood } from './animals';
import { buildPerson, type Person } from './people';
import { furTime } from './sdf';
import { good, goodMat, merge, paint } from './goods';
import { useGame } from '../core/store';
import { play } from '../core/audio';
import { es, type Bi } from '../core/bi';

export function Scene({ children, cam, className = '', bg = '#f5e3e6', fov = 60, fog = true, look }: { look?: [number, number, number]; children: ReactNode; cam?: [number, number, number]; className?: string; bg?: string; fov?: number; fog?: boolean }) {
  const hi = useGame((s) => s.settings.quality) === 'alta';
  return (
    <div className={`scene ${className}`}>
      <Canvas shadows={hi ? 'soft' : false} dpr={hi ? [1, 1.75] : [0.75, 1]} camera={{ fov, near: 0.05, far: 60, position: cam ?? [0, 1.6, 4] }} gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1; }}>
        <color attach="background" args={[bg]} />
        {fog && <fog attach="fog" args={[bg, 16, 42]} />}
        <Env />
        <Clock />
        <Adaptive />
        {look && <LookAt at={look} />}
        {children}
      </Canvas>
    </div>
  );
}
function LookAt({ at }: { at: [number, number, number] }) {
  const { camera, size } = useThree();
  useEffect(() => { const z = camera.userData.z0 ?? (camera.userData.z0 = camera.position.z); camera.position.z = z * (size.width < size.height ? 1.45 : 1); camera.lookAt(...at); });
  return null;
}
function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl), rt = pm.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = rt.texture; scene.environmentIntensity = 0.42;
    return () => { scene.environment = null; rt.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}
/** Calidad adaptativa: si el dispositivo no llega a ~42 fps, baja resolución y capas de pelo; si sobra, las recupera. */
const perf = { q: 1 };
function Adaptive() {
  const setDpr = useThree((s) => s.setDpr), st = useRef({ t: 0, n: 0, skip: 2, good: 0 }), hi = useGame((s) => s.settings.quality) === 'alta';
  useFrame((_, dt) => {
    const s = st.current; if (document.hidden || dt > 0.25) return; s.t += dt; s.n++; if (s.t < 1.2) return;
    const fps = s.n / s.t; s.t = s.n = 0; if (s.skip-- > 0) return;
    const top = Math.min(window.devicePixelRatio, hi ? 1.75 : 1);
    if (fps < 42 && perf.q > 0.45) { perf.q = Math.max(0.45, perf.q - 0.15); setDpr(Math.max(0.7, top * perf.q)); s.good = 0; s.skip = 1; }
    else if (fps > 57 && perf.q < 1 && ++s.good > 8) { perf.q = Math.min(1, perf.q + 0.1); setDpr(Math.max(0.7, top * perf.q)); s.good = 0; }
  });
  return null;
}
const Clock = () => { useFrame(({ clock }) => { furTime.value = clock.elapsedTime; }); return null; };
export function Lights({ area = 12, sun = [5, 9, 6] as [number, number, number], intensity = 1.5, every = false }: { area?: number; sun?: [number, number, number]; intensity?: number; every?: boolean }) {
  const ref = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    const l = ref.current; if (!l) return; const c = l.shadow.camera; c.left = c.bottom = -area; c.right = c.top = area; c.far = 30; c.updateProjectionMatrix();
    // Sombras casi estáticas: se refrescan pocas veces por segundo.
    if (every) return;
    l.shadow.autoUpdate = false; l.shadow.needsUpdate = true;
    const i = setInterval(() => { l.shadow.needsUpdate = true; }, 350);
    return () => clearInterval(i);
  }, [area, every]);
  return (<>
    <hemisphereLight args={['#fff6f2', '#e2c6bb', 1.15]} />
    <directionalLight ref={ref} position={sun} intensity={intensity} color="#fff1df" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-normalBias={0.03} />
    <directionalLight position={[-6, 5, -4]} intensity={0.35} color="#e6d0ff" />
  </>);
}
export function Beast({ id, mood = 'idle', position, rotation = 0, scale = 1, shells, onClick, onPointerMove, groupRef, wander }: { id: string; mood?: Mood; position?: [number, number, number]; rotation?: number; scale?: number; shells?: number; onClick?: (e: ThreeEvent<MouseEvent>) => void; onPointerMove?: (e: ThreeEvent<PointerEvent>) => void; groupRef?: RefObject<THREE.Group | null>; wander?: { x: number; z: number; r: number } }) {
  const a = useMemo<Animal>(() => buildAnimal(id), [id]), own = useRef<THREE.Group>(null), ref = groupRef ?? own, { camera } = useThree();
  const hi = useGame((s) => s.settings.quality) === 'alta';
  const w = useRef({ t: 0, tx: 0, tz: 0, wait: Math.random() * 5, going: false }), v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, dt) => {
    const g = ref.current; if (!g) return;
    let m = mood; const q = w.current;
    if (wander) {
      if (q.going) {
        const dx = q.tx - g.position.x, dz = q.tz - g.position.z, d = Math.hypot(dx, dz);
        if (d < 0.06) { q.going = false; q.wait = 3 + Math.random() * 6; }
        else { const sp = (a.kind === 'conejo' ? 0.5 : 0.42) * dt; g.position.x += (dx / d) * sp; g.position.z += (dz / d) * sp; let r = Math.atan2(dx, dz) - g.rotation.y; r = Math.atan2(Math.sin(r), Math.cos(r)); g.rotation.y += r * Math.min(1, dt * 5); m = 'walk'; }
      } else if ((q.wait -= dt) < 0) { const an = Math.random() * 6.28, rr = Math.random() * wander.r; q.tx = wander.x + Math.cos(an) * rr; q.tz = wander.z + Math.sin(an) * rr; q.going = true; }
    }
    a.update(clock.elapsedTime, m);
    const d = camera.position.distanceTo(g.getWorldPosition(v));
    a.detail(Math.round((shells ?? (d < 2.4 ? (hi ? 16 : 8) : d < 4.5 ? (hi ? 9 : 4) : d < 9 ? (hi ? 4 : 2) : 0)) * (0.35 + 0.65 * perf.q)));
  });
  useLayoutEffect(() => { if (position) ref.current?.position.set(...position); if (ref.current) ref.current.rotation.y = rotation; /* posición inicial */ }, [id]); // eslint-disable-line
  return <group ref={ref} scale={scale} onClick={onClick} onPointerMove={onPointerMove}><primitive object={a.group} /></group>;
}
export function Human({ id, position = [0, 0, 0], rotation = 0, mood = 'idle', onClick, path, groupRef }: { id: string; position?: [number, number, number]; rotation?: number; mood?: 'idle' | 'walk' | 'talk'; onClick?: (e: ThreeEvent<MouseEvent>) => void; path?: [number, number][]; groupRef?: RefObject<THREE.Group | null> }) {
  const p = useMemo<Person>(() => buildPerson(id), [id]), own = useRef<THREE.Group>(null), ref = groupRef ?? own, st = useRef({ i: 1, wait: 0 }), { camera } = useThree();
  const hi = useGame((s) => s.settings.quality) === 'alta';
  useFrame(({ clock }, dt) => {
    const g = ref.current; if (!g) return; let m = mood;
    if (path) {
      const s = st.current;
      if (s.wait > 0) s.wait -= dt;
      else { const [x, z] = path[s.i % path.length], dx = x - g.position.x, dz = z - g.position.z, d = Math.hypot(dx, dz); if (d < 0.1) { s.i++; s.wait = 2 + Math.random() * 4; } else { g.position.x += (dx / d) * dt * 0.8; g.position.z += (dz / d) * dt * 0.8; let r = Math.atan2(dx, dz) - g.rotation.y; r = Math.atan2(Math.sin(r), Math.cos(r)); g.rotation.y += r * Math.min(1, dt * 6); m = 'walk'; } }
    } else {
      const dx = camera.position.x - g.position.x, dz = camera.position.z - g.position.z;
      if (Math.hypot(dx, dz) < 3 && mood !== 'walk') { let r = Math.atan2(dx, dz) - g.rotation.y; r = Math.atan2(Math.sin(r), Math.cos(r)); g.rotation.y += r * Math.min(1, dt * 2.5); }
    }
    p.update(clock.elapsedTime, m);
    const d = camera.position.distanceTo(g.position); p.detail(d < 2.6 ? Math.round((hi ? 12 : 6) * perf.q) : d < 6 ? 4 : 0);
  });
  useLayoutEffect(() => { ref.current?.position.set(...(path ? ([path[0][0], 0, path[0][1]] as [number, number, number]) : position)); if (ref.current) ref.current.rotation.y = rotation; }, [id]); // eslint-disable-line
  return <group ref={ref} onClick={onClick}><primitive object={p.group} /></group>;
}
/* ───────── Texturas y materiales ───────── */
const tex = new Map<string, THREE.CanvasTexture>();
export function canvasTex(key: string, w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, rep?: [number, number]) {
  let t = tex.get(key);
  if (!t) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!); t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); } tex.set(key, t); }
  return t;
}
export const woodTex = (key: string, base: string, rep: [number, number]) => canvasTex('wood' + key, 1024, 1024, (g) => {
  const rows = 8, rh = 1024 / rows;
  for (let r = 0; r < rows; r++) { let x = -((r * 337) % 400); while (x < 1024) { const w = 420 + ((r * 97 + x) % 160); const c = new THREE.Color(base).offsetHSL(0, 0, (((r * 53 + Math.abs(x) * 7) % 17) / 17 - 0.5) * 0.07); g.fillStyle = c.getStyle(); g.fillRect(x, r * rh, w, rh); for (let i = 0; i < 26; i++) { g.strokeStyle = `rgba(70,35,20,${0.03 + (i % 5) * 0.012})`; g.lineWidth = 1 + (i % 3); g.beginPath(); const y = r * rh + ((i * 41) % rh); g.moveTo(x, y); g.bezierCurveTo(x + w * 0.3, y + 6, x + w * 0.6, y - 6, x + w, y + 2); g.stroke(); } g.fillStyle = 'rgba(60,30,20,.35)'; g.fillRect(x, r * rh, 2, rh); x += w; } g.fillStyle = 'rgba(60,30,20,.35)'; g.fillRect(0, r * rh, 1024, 2); }
}, rep);
export function signTex(b: Bi, color: string, icon = '') {
  return canvasTex('sign' + es(b) + color, 1024, 200, (g) => {
    g.fillStyle = '#fffaf6'; g.fillRect(0, 0, 1024, 200); g.fillStyle = color; g.fillRect(0, 0, 1024, 14); g.fillRect(0, 186, 1024, 14);
    g.fillStyle = '#4b3345'; g.textAlign = 'center'; g.textBaseline = 'middle'; let fs = 104; g.font = `600 ${fs}px 'Playfair Display Variable', Georgia`;
    const s = `${icon} ${es(b)}`.trim(); while (g.measureText(s).width > 950) { fs -= 4; g.font = `600 ${fs}px 'Playfair Display Variable', Georgia`; } g.fillText(s, 512, 104);
  });
}
const std = (c: string, r = 0.6, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
export const MAT = { cream: std('#f6ebe2'), white: std('#fbf7f4', 0.5), wood: std('#c9a27e', 0.5), woodD: std('#8d6549', 0.5), rose: std('#e3adc0', 0.6), lilac: std('#c3afe0', 0.6), metal: std('#cfd2d8', 0.25, 0.85), gold: std('#d9b36c', 0.28, 0.85), dark: std('#4a3c48', 0.6), hay: std('#dcc486', 0.95), green: std('#6f9f68', 0.8), fabric: std('#e8c6d3', 0.95), glow: new THREE.MeshBasicMaterial({ color: '#fff6e8' }) };
export const vc = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55 });
export const bx = (w: number, h: number, d: number, x: number, y: number, z: number, c: string) => paint(new THREE.BoxGeometry(w, h, d), c, (g) => g.translate(x, y, z));
export function Sign({ b, color, icon, position, rotation = 0, w = 2 }: { b: Bi; color: string; icon?: string; position: [number, number, number]; rotation?: number; w?: number }) {
  const t = signTex(b, color, icon), h = w * 0.2;
  return (
    <group position={position} rotation-y={rotation}>
      <mesh material={MAT.white}><boxGeometry args={[w + 0.06, h + 0.06, 0.05]} /></mesh>
      {[0.027, -0.027].map((z) => <mesh key={z} position-z={z} rotation-y={z < 0 ? Math.PI : 0}><planeGeometry args={[w, h]} /><meshBasicMaterial map={t} toneMapped={false} /></mesh>)}
    </group>
  );
}
export const SHELF_H = [0.16, 0.72, 1.28];
/** Estantería con productos instanciados; cada balda reparte los productos con varias unidades. */
/** Escala de exposición: los productos pequeños se ven más grandes en la balda. */
const fit = (id: string, slot: number) => { const g = good(id); return Math.max(1, Math.min(1.45, 0.44 / g.h, (slot - 0.03) / g.w)); };
export function Shelf({ pids, w, position, rotation = 0, onPick, color, counts }: { pids: string[]; w: number; position: [number, number, number]; rotation?: number; onPick?: (id: string) => void; color: string; counts?: Record<string, number> }) {
  const geo = useMemo(() => merge([bx(w, 1.86, 0.05, 0, 0.93, -0.24, '#f4e8df'), bx(0.05, 1.9, 0.52, -w / 2, 0.95, 0, '#c9a27e'), bx(0.05, 1.9, 0.52, w / 2, 0.95, 0, '#c9a27e'), bx(w, 0.1, 0.52, 0, 1.9, 0, '#c9a27e'), ...SHELF_H.flatMap((y) => [bx(w, 0.035, 0.5, 0, y - 0.0175, 0, '#ead9ca'), bx(w, 0.055, 0.012, 0, y - 0.03, 0.256, color)]), bx(w, 0.12, 0.46, 0, 0.06, 0, '#8d6549')]), [w, color]);
  const layout = useMemo(() => {
    const out: Record<string, [number, number, number][]> = {}; pids.forEach((p) => (out[p] = []));
    const per = Math.ceil(pids.length / 3);
    for (let l = 0; l < 3; l++) {
      const row = pids.slice(l * per, (l + 1) * per); if (!row.length) continue;
      const slot = (w - 0.16) / row.length;
      row.forEach((id, i) => {
        const gd = good(id), k0 = fit(id, slot), gw = gd.w * k0, n = Math.max(1, Math.min(7, Math.floor(slot / (gw + 0.02)))), x0 = -w / 2 + 0.08 + slot * (i + 0.5), deep = gw < 0.2 ? 2 : 1, max = counts ? counts[id] ?? 0 : 99; let k = 0;
        for (let d = 0; d < deep; d++) for (let j = 0; j < n; j++) if (k++ < max) out[id].push([x0 + (j - (n - 1) / 2) * (gw + 0.02), SHELF_H[l], (deep === 1 ? 0.02 : 0.11) - d * 0.2]);
      });
    }
    return out;
  }, [pids, w, counts]);
  return (
    <group position={position} rotation-y={rotation}>
      <mesh geometry={geo} material={vc} castShadow receiveShadow />
      {SHELF_H.map((y) => <mesh key={y} position={[0, y + 0.5, 0.22]} material={MAT.glow}><boxGeometry args={[w - 0.1, 0.012, 0.02]} /></mesh>)}
      {pids.map((id) => layout[id].length > 0 && <Stock key={id + layout[id].length} id={id} at={layout[id]} k={fit(id, (w - 0.16) / Math.ceil(pids.length / 3))} onPick={onPick} />)}
    </group>
  );
}
function Stock({ id, at, onPick, k }: { id: string; k: number; at: [number, number, number][]; onPick?: (id: string) => void }) {
  const g = good(id), a = useRef<THREE.InstancedMesh>(null), b = useRef<THREE.InstancedMesh>(null), lm = useMemo(() => g.map && new THREE.MeshStandardMaterial({ map: g.map, roughness: 0.5 }), [g]);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(k, k, k), v = new THREE.Vector3();
    at.forEach((p, i) => { e.set(0, Math.sin(i * 12.7) * 0.07, 0); m.compose(v.set(...p), q.setFromEuler(e), s); a.current?.setMatrixAt(i, m); b.current?.setMatrixAt(i, m); });
    for (const x of [a.current, b.current]) if (x) { x.instanceMatrix.needsUpdate = true; x.computeBoundingSphere(); }
  }, [at, k]);
  const click = (e: ThreeEvent<MouseEvent>) => { if (e.delta > 6 || !onPick || e.distance > 5.5) return; e.stopPropagation(); play('click'); onPick(id); };
  return (<>
    <instancedMesh ref={a} args={[g.body, goodMat, at.length]} onClick={click} castShadow onPointerOver={() => { if (onPick) document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }} />
    {g.label && lm && <instancedMesh ref={b} args={[g.label, lm, at.length]} raycast={() => null} />}
  </>);
}
/* ───────── Jugadora ───────── */
export interface Box { x: number; z: number; w: number; d: number }
export interface Point { id: string; x: number; z: number; r: number }
export const pad = { x: 0, y: 0, lookX: 0, lookY: 0 };
export const ctl = { locked: false, third: false, jump: null as null | { x: number; z: number; yaw: number; pitch?: number } };
const keys = new Set<string>();
if (typeof window !== 'undefined') {
  const typing = (e: KeyboardEvent) => /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName ?? '');
  window.addEventListener('keydown', (e) => { if (!typing(e)) { keys.add(e.code); if (/^Arrow/.test(e.code) && document.querySelector('.scene.walk') && !ctl.locked) e.preventDefault(); } });
  window.addEventListener('keyup', (e) => keys.delete(e.code)); window.addEventListener('blur', () => keys.clear());
}
export function Player({ start, yaw = 0, boxes, bounds, points, onNear, speed = 2.5, onMove, height = 1.5 }: { start: [number, number]; yaw?: number; boxes: Box[]; bounds: [number, number, number, number]; points: Point[]; onNear: (id: string | null) => void; speed?: number; onMove?: (x: number, z: number, yaw: number) => void; height?: number }) {
  const { camera, gl } = useThree(), s = useRef({ x: start[0], z: start[1], yaw, pitch: -0.05, bob: 0, near: null as string | null, vx: 0, vz: 0, step: 0, ayaw: yaw + Math.PI });
  const av = useMemo(() => buildPerson('gayane'), []), avRef = useRef<THREE.Group>(null), look = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    const el = gl.domElement; let id = -1, px = 0, py = 0;
    const down = (e: PointerEvent) => { if (id < 0) { id = e.pointerId; px = e.clientX; py = e.clientY; } };
    const move = (e: PointerEvent) => { if (e.pointerId !== id || ctl.locked) return; const k = e.pointerType === 'touch' ? 0.0062 : 0.0042; s.current.yaw -= (e.clientX - px) * k; s.current.pitch = THREE.MathUtils.clamp(s.current.pitch - (e.clientY - py) * k, -1.05, 0.9); px = e.clientX; py = e.clientY; };
    const up = (e: PointerEvent) => { if (e.pointerId === id) id = -1; };
    el.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    return () => { el.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
  }, [gl]);
  const R = 0.3, hit = (x: number, z: number, r = R) => x < bounds[0] + r || x > bounds[1] - r || z < bounds[2] + r || z > bounds[3] - r || boxes.some((b) => Math.abs(x - b.x) < b.w / 2 + r && Math.abs(z - b.z) < b.d / 2 + r);
  useFrame(({ clock }, raw) => {
    const dt = Math.min(raw, 0.05), q = s.current; let f = 0, l = 0;
    if (ctl.jump) { q.x = ctl.jump.x; q.z = ctl.jump.z; q.yaw = ctl.jump.yaw; q.pitch = ctl.jump.pitch ?? -0.12; ctl.jump = null; }
    if (!ctl.locked) {
      if (keys.has('KeyW') || keys.has('ArrowUp')) f += 1; if (keys.has('KeyS') || keys.has('ArrowDown')) f -= 1; if (keys.has('KeyA')) l -= 1; if (keys.has('KeyD')) l += 1;
      if (keys.has('ArrowLeft') || keys.has('KeyQ')) q.yaw += dt * 1.9; if (keys.has('ArrowRight')) q.yaw -= dt * 1.9;
      f -= pad.y; l += pad.x;
    }
    const len = Math.hypot(f, l) || 1, k = Math.min(1, Math.hypot(f, l)) * speed * (keys.has('ShiftLeft') ? 1.6 : 1);
    const tx = ((-Math.sin(q.yaw) * f + Math.cos(q.yaw) * l) / len) * k, tz = ((-Math.cos(q.yaw) * f - Math.sin(q.yaw) * l) / len) * k;
    q.vx += (tx - q.vx) * Math.min(1, dt * 10); q.vz += (tz - q.vz) * Math.min(1, dt * 10);
    if (!hit(q.x + q.vx * dt, q.z) || hit(q.x, q.z)) q.x += q.vx * dt; if (!hit(q.x, q.z + q.vz * dt) || hit(q.x, q.z)) q.z += q.vz * dt;
    q.x = THREE.MathUtils.clamp(q.x, bounds[0] + R, bounds[1] - R); q.z = THREE.MathUtils.clamp(q.z, bounds[2] + R, bounds[3] - R);
    const v = Math.hypot(q.vx, q.vz); q.bob += v * dt * 4.4; q.step += v * dt; if (q.step > 0.75) { q.step = 0; play('step'); }
    const fx = -Math.sin(q.yaw), fz = -Math.cos(q.yaw);
    if (ctl.third) {
      let d = 1.95; while (d > 0.5 && hit(q.x - fx * d, q.z - fz * d, 0.12)) d -= 0.1;
      const want = look.set(q.x - fx * d + Math.cos(q.yaw) * 0.32, 1.62 - q.pitch * 0.8, q.z - fz * d - Math.sin(q.yaw) * 0.32); camera.position.lerp(want, Math.min(1, dt * 9)); camera.lookAt(q.x + fx * 1.2, 1.32 + q.pitch * 1.2, q.z + fz * 1.2);
      if (v > 0.15) { let r = Math.atan2(q.vx, q.vz) - q.ayaw; r = Math.atan2(Math.sin(r), Math.cos(r)); q.ayaw += r * Math.min(1, dt * 9); }
      if (avRef.current) { avRef.current.visible = d > 0.8; avRef.current.position.set(q.x, 0, q.z); avRef.current.rotation.y = q.ayaw; av.update(clock.elapsedTime, v > 0.2 ? 'walk' : 'idle'); av.detail(12); }
    } else {
      if (avRef.current) avRef.current.visible = false;
      camera.position.set(q.x, height + Math.sin(q.bob * 2) * 0.012 * Math.min(1, v), q.z); look.set(q.x + fx * Math.cos(q.pitch), camera.position.y + Math.sin(q.pitch), q.z + fz * Math.cos(q.pitch)); camera.lookAt(look);
    }
    let best: string | null = null, bd = 1e9; for (const p of points) { const d = Math.hypot(p.x - q.x, p.z - q.z); if (d < p.r) { const a = ((p.x - q.x) * fx + (p.z - q.z) * fz) / (d || 1), w = d - a * 0.8; if (w < bd) { bd = w; best = p.id; } } }
    if (best !== q.near) { q.near = best; onNear(best); }
    onMove?.(q.x, q.z, q.yaw);
  });
  return <group ref={avRef}><primitive object={av.group} /></group>;
}
