import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { DEPT, PRODUCTS } from '../data/products';
import { Beast, Human, Lights, MAT, Player, Scene, Shelf, Sign, bx, canvasTex, ctl, vc, woodTex, type Box, type Point } from './world';
import { glassMat, merge, paint } from './goods';
import { ambient, play } from '../core/audio';

export const B: [number, number, number, number] = [-12, 12, -9, 9];
const SP: Record<string, { p: [number, number]; yaw: number; r: number }> = {
  perros: { p: [-9.3, -5.1], yaw: 0.2, r: 2.3 }, gatos: { p: [-4, -5.6], yaw: 0, r: 2 }, conejos: { p: [0.4, -5.5], yaw: 0, r: 1.8 }, hamsteres: { p: [4.3, -6.9], yaw: 0, r: 1.7 },
  pajaros: { p: [8.6, -6.3], yaw: -0.25, r: 2 }, peces: { p: [9.6, -1.2], yaw: -1.5708, r: 1.9 }, acuarios: { p: [9.6, 4.2], yaw: -1.5708, r: 1.9 }, alimentos: { p: [-9.6, 0.2], yaw: 1.5708, r: 2.6 },
  higiene: { p: [-9.6, 5.7], yaw: 1.5708, r: 2 }, juguetes: { p: [-3.9, 1.5], yaw: 0, r: 2 }, accesorios: { p: [2.9, 1.5], yaw: 0, r: 2.1 }, caja: { p: [4.4, 5.1], yaw: Math.PI, r: 1.9 },
};
export const SHOP_SPOTS = SP;
export const SHOP_NPCS: Record<string, [number, number, number]> = { lucia: [-0.4, 4.2, -0.2], marcos: [-6.7, -5.2, 0], elena: [-1.9, -6, 0.2], ines: [6.5, -5.9, 0], diego: [10.6, 1.4, -1.57], carmen: [4.6, 7.4, Math.PI] };
const BOXES: Box[] = [
  { x: -9.3, z: -7.2, w: 4.6, d: 3 }, { x: -4, z: -7.6, w: 3.8, d: 2.4 }, { x: 0.4, z: -7.4, w: 3, d: 2.4 }, { x: 4.3, z: -8.3, w: 2.6, d: 1.2 }, { x: 8.8, z: -8, w: 2.6, d: 1.8 },
  { x: 11.4, z: -1.2, w: 1.2, d: 4.8 }, { x: 11.5, z: 4.2, w: 1, d: 4.2 }, { x: -11.5, z: 0.2, w: 1, d: 6.6 }, { x: -11.5, z: 5.7, w: 1, d: 4 },
  { x: -3.9, z: 0, w: 5.1, d: 1.1 }, { x: 2.9, z: 0, w: 5.7, d: 1.1 }, { x: 4.4, z: 6.3, w: 3, d: 0.9 }, { x: 8.6, z: 8, w: 2.4, d: 1 }, { x: -6.6, z: 8.2, w: 2.6, d: 1.2 },
  ...Object.values(SHOP_NPCS).map(([x, z]) => ({ x, z, w: 0.4, d: 0.4 })),
];
const pids = (d: string) => PRODUCTS.filter((p) => p.dept === d).map((p) => p.id);
function Building() {
  const floor = woodTex('floor', '#cfa888', [7, 5]);
  const geo = useMemo(() => merge([
    bx(24, 3.6, 0.15, 0, 1.8, -9.07, '#f4e4e2'), bx(0.15, 3.6, 18, -12.07, 1.8, 0, '#efe0ea'), bx(0.15, 3.6, 18, 12.07, 1.8, 0, '#efe0ea'),
    bx(8.4, 3.6, 0.15, -7.8, 1.8, 9.07, '#f4e4e2'), bx(12.4, 0.7, 0.15, 5.8, 0.35, 9.07, '#f4e4e2'), bx(24, 0.8, 0.15, 0, 3.2, 9.07, '#f4e4e2'), bx(0.3, 3.6, 0.2, -0.3, 1.8, 9.05, '#c9a27e'), bx(0.3, 3.6, 0.2, -3.6, 1.8, 9.05, '#c9a27e'), bx(0.12, 2.2, 0.2, 5.8, 1.8, 9.05, '#c9a27e'),
    ...[-9, 9].map((z) => bx(24, 0.14, 0.06, 0, 0.07, z * 0.995, '#fffaf6')), ...[-12, 12].map((x) => bx(0.06, 0.14, 18, x * 0.996, 0.07, 0, '#fffaf6')),
    bx(24, 0.06, 0.05, 0, 1.15, -8.97, '#e3b9c6'), bx(24, 0.12, 0.2, 0, 3.54, -8.9, '#e9d6cf'),
    ...[-6, 0, 6].map((x) => bx(0.18, 0.2, 18, x, 3.5, 0, '#dfc4ae')),
  ]), []);
  const out = canvasTex('street', 1024, 512, (g) => {
    const s = g.createLinearGradient(0, 0, 0, 512); s.addColorStop(0, '#bfe0f5'); s.addColorStop(0.6, '#fbe9e4'); s.addColorStop(1, '#d9c8bd'); g.fillStyle = s; g.fillRect(0, 0, 1024, 512);
    for (let i = 0; i < 9; i++) { g.fillStyle = ['#e9c9b8', '#f0dccb', '#d9b7b4', '#e6cfd8'][i % 4]; const x = i * 120 - 20, h = 190 + ((i * 71) % 110); g.fillRect(x, 420 - h, 112, h); g.fillStyle = '#8aa3b5'; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) g.fillRect(x + 16 + a * 32, 440 - h + b * 58, 18, 30); }
    for (let i = 0; i < 14; i++) { g.fillStyle = `rgba(${90 + i * 4},${140 + (i % 5) * 9},95,.9)`; g.beginPath(); g.arc(i * 78 + 20, 400 - (i % 3) * 14, 34, 0, 7); g.fill(); }
    g.fillStyle = '#b9aea8'; g.fillRect(0, 420, 1024, 92);
  });
  return (<>
    <mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[24.2, 18.2]} /><meshPhysicalMaterial map={floor} roughness={0.36} clearcoat={0.35} clearcoatRoughness={0.3} /></mesh>
    <mesh rotation-x={Math.PI / 2} position-y={3.6}><planeGeometry args={[24, 18]} /><meshStandardMaterial color="#fbf3ee" roughness={1} emissive="#fff0ea" emissiveIntensity={0.42} /></mesh>
    <mesh geometry={geo} material={vc} receiveShadow />
    <mesh position={[4, 2.2, 13]} rotation-y={Math.PI}><planeGeometry args={[34, 12]} /><meshBasicMaterial map={out} /></mesh>
    <mesh position={[5.8, 1.75, 9.05]} material={glassMat}><planeGeometry args={[12.2, 2.3]} /></mesh>
    <mesh position={[-1.95, 1.4, 9.05]} material={glassMat}><planeGeometry args={[3, 2.8]} /></mesh>
    {[-9, -3, 3, 9].flatMap((x) => [-5.6, 0, 5.6].map((z) => <group key={`${x}${z}`} position={[x, 3.3, z]}><mesh material={MAT.glow}><boxGeometry args={[1.7, 0.05, 0.36]} /></mesh><mesh position-y={0.04} material={MAT.gold}><boxGeometry args={[1.78, 0.05, 0.44]} /></mesh></group>))}
    <mesh rotation-x={-Math.PI / 2} position={[-1.9, 0.006, 5.6]} receiveShadow><circleGeometry args={[2, 64]} /><meshStandardMaterial color="#e6b9c9" roughness={1} /></mesh>
    <mesh rotation-x={-Math.PI / 2} position={[-1.9, 0.009, 5.6]}><ringGeometry args={[1.62, 1.7, 64]} /><meshStandardMaterial color="#fff3ef" roughness={1} /></mesh>
  </>);
}
export function Plant({ position, s = 1 }: { position: [number, number, number]; s?: number }) {
  const g = useMemo(() => merge([paint(new THREE.CylinderGeometry(0.2, 0.15, 0.36, 28), '#f2e6e0', (x) => x.translate(0, 0.18, 0)), ...Array.from({ length: 26 }, (_, i) => paint(new THREE.SphereGeometry(0.16, 10, 8), ['#5d8f5a', '#6fa268', '#88b57a'][i % 3], (x) => { x.scale(0.3, 2.1 - (i % 4) * 0.3, 0.07); x.translate(0, 0.32, 0); x.rotateX(0.2 + (i % 5) * 0.16); x.rotateY(i * 2.4); x.translate(0, 0.34, 0); }))]), []);
  return <mesh geometry={g} material={vc} position={position} scale={s} castShadow />;
}
function Pen({ x, z, w, d, h = 0.62, color }: { x: number; z: number; w: number; d: number; h?: number; color: string }) {
  const frame = useMemo(() => merge([bx(w, 0.09, 0.06, 0, 0.045, d / 2, color), bx(w, 0.05, 0.06, 0, h, d / 2, color), bx(0.06, 0.09, d, -w / 2, 0.045, 0, color), bx(0.06, 0.05, d, -w / 2, h, 0, color), bx(0.06, 0.09, d, w / 2, 0.045, 0, color), bx(0.06, 0.05, d, w / 2, h, 0, color), ...[-1, 0, 1].map((i) => bx(0.06, h, 0.06, (i * w) / 2, h / 2, d / 2, color))]), [w, d, h, color]);
  return (
    <group position={[x, 0, z]}>
      <mesh geometry={frame} material={vc} castShadow />
      <mesh position={[0, h / 2, d / 2]} material={glassMat}><planeGeometry args={[w, h]} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[(s * w) / 2, h / 2, 0]} rotation-y={Math.PI / 2} material={glassMat}><planeGeometry args={[d, h]} /></mesh>)}
      <mesh rotation-x={-Math.PI / 2} position-y={0.012} receiveShadow><planeGeometry args={[w, d]} /><meshStandardMaterial color="#ead9c6" roughness={1} /></mesh>
    </group>
  );
}
export function Tank({ w, h, d, position, rotation = 0, fish, water = '#7cc4dc' }: { w: number; h: number; d: number; position: [number, number, number]; rotation?: number; fish: string[]; water?: string }) {
  const bub = useRef<THREE.InstancedMesh>(null), fr = useRef<(THREE.Group | null)[]>([]), m4 = useMemo(() => new THREE.Matrix4(), []);
  const deco = useMemo(() => merge([bx(w, 0.05, d, 0, 0.025, 0, '#4a4450'), bx(w, 0.05, d, 0, h, 0, '#4a4450'), bx(w - 0.03, 0.05, d - 0.03, 0, 0.07, 0, '#dcc79c'), ...Array.from({ length: 12 }, (_, i) => paint(new THREE.SphereGeometry(0.03 + (i % 3) * 0.02, 12, 8), ['#8d8790', '#b79fb3', '#a3968a'][i % 3], (g) => { g.scale(1.2, 0.7, 1); g.translate(-w / 2 + 0.1 + ((i * 0.37) % (w - 0.2)), 0.1, ((i * 0.23) % (d - 0.15)) - d / 2 + 0.08); })), ...Array.from({ length: 22 }, (_, i) => paint(new THREE.SphereGeometry(0.1, 8, 8), ['#4f9160', '#6fae6a', '#b36a86'][i % 3], (g) => { g.scale(0.16, (h * 0.35 + (i % 4) * 0.05) / 0.1, 0.07); g.rotateZ(((i % 5) - 2) * 0.08); g.translate(-w / 2 + 0.15 + (Math.floor(i / 6) * (w - 0.3)) / 3 + (i % 6) * 0.025, h * 0.35, -d * 0.28 + (i % 4) * 0.03); }))]), [w, h, d]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < 16; i++) { const y = (t * 0.22 + i * 0.137) % 1; m4.makeScale(1, 1, 1).setPosition(w / 2 - 0.15 + Math.sin(t * 2 + i) * 0.015, 0.1 + y * (h - 0.15), -d * 0.2); bub.current?.setMatrixAt(i, m4); }
    if (bub.current) bub.current.instanceMatrix.needsUpdate = true;
    fr.current.forEach((g, i) => { if (!g) return; const a = t * (0.35 + i * 0.07) + i * 2.1; g.position.set(Math.sin(a) * (w / 2 - 0.17), h * (0.35 + 0.16 * i % 0.4) + Math.sin(t * 0.8 + i) * 0.04, Math.cos(a * 2 + i) * (d / 2 - 0.13)); const want = Math.cos(a) > 0 ? Math.PI / 2 : -Math.PI / 2; g.rotation.y += (want - g.rotation.y) * 0.06; });
  });
  return (
    <group position={position} rotation-y={rotation}>
      <mesh geometry={deco} material={vc} />
      <mesh position={[0, h / 2, -d / 2 + 0.01]}><planeGeometry args={[w - 0.02, h]} /><meshBasicMaterial color={water} /></mesh>
      {fish.map((f, i) => <group key={i} ref={(x) => { fr.current[i] = x; }}><Beast id={f} /></group>)}
      <instancedMesh ref={bub} args={[undefined, undefined, 16]} frustumCulled={false}><sphereGeometry args={[0.008, 8, 6]} /><meshPhysicalMaterial color="#fff" transparent opacity={0.6} roughness={0} /></instancedMesh>
      <mesh position={[0, h / 2, 0]}><boxGeometry args={[w - 0.01, h - 0.05, d - 0.01]} /><meshPhysicalMaterial color="#a9dcec" transparent opacity={0.2} roughness={0.02} clearcoat={1} depthWrite={false} /></mesh>
      <mesh position={[0, h + 0.03, 0]} material={MAT.glow}><boxGeometry args={[w * 0.8, 0.03, 0.06]} /></mesh>
    </group>
  );
}
function Departments({ onAnimal }: { onAnimal: (dept: string) => void }) {
  const furn = useMemo(() => merge([
    // gatos: árbol, plataformas
    bx(3.8, 0.1, 2.2, -4, 0.05, -7.7, '#e6cfc0'), bx(0.5, 0.06, 0.5, -5.2, 0.9, -8.2, '#d8b7c6'), bx(0.6, 0.06, 0.5, -2.8, 1.25, -8.3, '#d8b7c6'), bx(0.9, 0.06, 0.5, -4.1, 0.62, -8.3, '#d8b7c6'),
    ...[[-5.2, 0.9], [-2.8, 1.25], [-4.4, 0.62], [-3.8, 0.62]].map(([x, h]) => paint(new THREE.CylinderGeometry(0.06, 0.06, h, 18), '#c8a57c', (g) => g.translate(x, h / 2, -8.2))),
    bx(0.46, 0.4, 0.42, -3.1, 0.3, -7.7, '#caa1b7'), paint(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 24), '#3b2a38', (g) => { g.rotateX(1.5708); g.translate(-3.1, 0.3, -7.485); }),
    // hámsteres: mesa
    bx(2.6, 0.06, 1, 4.3, 0.86, -8.4, '#c9a27e'), ...[[3.1, -8.8], [5.5, -8.8], [3.1, -8], [5.5, -8]].map(([x, z]) => bx(0.08, 0.86, 0.08, x, 0.43, z, '#8d6549')), bx(1.2, 0.05, 0.7, 3.65, 0.92, -8.4, '#e2c98f'), bx(1.1, 0.05, 0.7, 4.95, 0.92, -8.4, '#e2c98f'),
    bx(0.22, 0.12, 0.16, 3.3, 1, -8.6, '#b98a5c'), paint(new THREE.TorusGeometry(0.12, 0.018, 10, 32), '#b7a0dc', (g) => { g.rotateY(0.5); g.translate(5.3, 1.08, -8.55); }),
    // pájaros: peana y perchas
    bx(2.4, 0.5, 1.5, 8.8, 0.25, -8.05, '#e6cfc0'), bx(2.4, 0.05, 1.5, 8.8, 2.5, -8.05, '#cbb39f'), paint(new THREE.CylinderGeometry(0.02, 0.02, 2.3, 10), '#a9825e', (g) => { g.rotateZ(1.5708); g.translate(8.8, 1.2, -8); }), paint(new THREE.CylinderGeometry(0.018, 0.018, 2.3, 10), '#a9825e', (g) => { g.rotateZ(1.5708); g.translate(8.8, 1.75, -8.3); }),
    ...Array.from({ length: 25 }, (_, i) => paint(new THREE.CylinderGeometry(0.004, 0.004, 2, 5), '#d9c08a', (g) => g.translate(7.6 + i * 0.1, 1.5, -7.31))), ...Array.from({ length: 14 }, (_, i) => paint(new THREE.CylinderGeometry(0.004, 0.004, 2, 5), '#d9c08a', (g) => g.translate(i % 2 ? 7.61 : 9.99, 1.5, -8.75 + Math.floor(i / 2) * 0.22))),
    // perros: casetas, cuencos, camas
    bx(0.9, 0.7, 0.8, -10.8, 0.35, -8.2, '#d9b79c'), paint(new THREE.CylinderGeometry(0.01, 0.75, 0.4, 4, 1), '#b98a96', (g) => { g.rotateY(0.785); g.translate(-10.8, 0.9, -8.2); }), paint(new THREE.CylinderGeometry(0.2, 0.2, 0.02, 28), '#3b2a30', (g) => { g.rotateX(1.5708); g.translate(-10.8, 0.28, -7.795); }),
    paint(new THREE.TorusGeometry(0.4, 0.1, 14, 40), '#d9a7bd', (g) => { g.rotateX(1.5708); g.translate(-8, 0.1, -8.1); }), paint(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 32), '#f7e8ee', (g) => g.translate(-8, 0.05, -8.1)), paint(new THREE.CylinderGeometry(0.13, 0.16, 0.08, 28), '#b9c2cc', (g) => g.translate(-9.4, 0.04, -6.3)),
    // conejos
    bx(0.7, 0.4, 0.5, -0.5, 0.2, -8.2, '#c79a6c'), paint(new THREE.SphereGeometry(0.28, 16, 10), '#dcc486', (g) => { g.scale(1.3, 0.4, 1); g.translate(1.3, 0.08, -8.1); }),
    // peces y acuarios: muebles
    bx(0.9, 0.8, 4.6, 11.45, 0.4, -1.2, '#b7a1b5'), bx(0.9, 0.06, 4.6, 11.45, 1.5, -1.2, '#b7a1b5'), bx(0.06, 2.3, 4.6, 11.9, 1.15, -1.2, '#cfe3ec'),
    // caja
    bx(3, 1, 0.8, 4.4, 0.5, 6.3, '#f3e3df'), bx(3.1, 0.06, 0.9, 4.4, 1.03, 6.3, '#c9a27e'), bx(3, 0.14, 0.02, 4.4, 0.75, 5.89, '#d8a3b5'), bx(0.42, 0.3, 0.06, 5.2, 1.28, 6.3, '#3c3440'), bx(0.1, 0.12, 0.1, 5.2, 1.1, 6.3, '#3c3440'), bx(0.12, 0.05, 0.2, 3.7, 1.085, 6.1, '#2e2a33'), bx(0.5, 0.03, 0.4, 4.4, 1.075, 6.3, '#5a5262'),
    // sofá y mesa
    bx(2.4, 0.4, 0.9, 8.6, 0.25, 8.1, '#d9a7bd'), bx(2.4, 0.6, 0.25, 8.6, 0.65, 8.5, '#d298b1'), bx(0.25, 0.55, 0.9, 7.35, 0.4, 8.1, '#d298b1'), bx(0.25, 0.55, 0.9, 9.85, 0.4, 8.1, '#d298b1'),
    bx(2.4, 0.5, 1, -6.6, 0.25, 8.3, '#c9a27e'),
  ]), []);
  const go = (d: string) => (e: ThreeEvent<MouseEvent>) => { if (e.delta > 6 || e.distance > 6) return; e.stopPropagation(); onAnimal(d); };
  const sg = (d: string, p: [number, number, number], rot = 0, w = 2.1) => <Sign b={DEPT[d].name} color={DEPT[d].color} icon={DEPT[d].icon} position={p} rotation={rot} w={w} />;
  return (<>
    <mesh geometry={furn} material={vc} castShadow receiveShadow />
    <Pen x={-9.3} z={-7.2} w={4.4} d={2.9} color="#c9a27e" />
    <Pen x={0.4} z={-7.5} w={2.8} d={2.3} h={0.5} color="#d9b3c2" />
    {[3.65, 4.95].map((x) => <mesh key={x} position={[x, 1.1, -8.4]} material={glassMat}><boxGeometry args={[1.15, 0.45, 0.75]} /></mesh>)}
    <group onClick={go('perros')}><Beast id="golden" position={[-9, 0, -6.6]} wander={{ x: -9.1, z: -6.9, r: 0.9 }} /><Beast id="collie" position={[-10.2, 0, -6.9]} rotation={0.5} wander={{ x: -10, z: -6.8, r: 0.55 }} /><Beast id="labrador" position={[-8, 0.09, -8.05]} rotation={0.4} mood="sleep" /></group>
    <group onClick={go('gatos')}><Beast id="tabby" position={[-4.2, 0.1, -7.2]} rotation={0.3} wander={{ x: -4.2, z: -7.2, r: 0.7 }} /><Beast id="gris" position={[-2.8, 1.28, -8.25]} rotation={0.25} mood="sleep" /><Beast id="siames" position={[-4.1, 0.65, -8.25]} rotation={-0.3} /></group>
    <group onClick={go('conejos')}><Beast id="conejoblanco" position={[0.1, 0.01, -7]} wander={{ x: 0.2, z: -7.1, r: 0.7 }} /><Beast id="conejomarron" position={[1.2, 0.01, -7.3]} rotation={-0.4} mood="eat" /></group>
    <group onClick={go('hamsteres')}><Beast id="hamster" position={[3.75, 0.95, -8.3]} scale={1.3} wander={{ x: 3.7, z: -8.35, r: 0.22 }} /><Beast id="hamstergris" position={[4.9, 0.95, -8.25]} scale={1.3} wander={{ x: 4.9, z: -8.35, r: 0.2 }} /></group>
    <group onClick={go('pajaros')}><Beast id="loro" position={[8.5, 1.2, -8]} rotation={0.2} /><Beast id="canario" position={[9.3, 1.75, -8.3]} rotation={-0.3} /><Beast id="canario" position={[8.1, 1.75, -8.3]} rotation={0.5} /></group>
    <group onClick={go('peces')}>
      {[-2.6, -0.95, 0.35].map((z, i) => <Tank key={z} w={i === 0 ? 1.5 : 1.15} h={0.6} d={0.6} position={[11.4, 0.82, z]} rotation={-Math.PI / 2} fish={[['dorado', 'dorado', 'dorado'], ['betta'], ['dorado', 'dorado']][i]} water={['#86cbe0', '#7d9fd8', '#8fd3c9'][i]} />)}
    </group>
    <Beast id="tabby" position={[-6.2, 0.5, 8.2]} rotation={2.6} mood="sleep" />
    {sg('perros', [-9.3, 2.35, -6])}{sg('gatos', [-4, 2.45, -7.2])}{sg('conejos', [0.4, 2.35, -7])}{sg('hamsteres', [4.3, 2.3, -8])}{sg('pajaros', [8.8, 2.85, -7.3])}{sg('peces', [10.9, 2.35, -1.2], -Math.PI / 2)}{sg('acuarios', [10.9, 2.35, 4.2], -Math.PI / 2)}{sg('alimentos', [-11, 2.35, 0.2], Math.PI / 2)}{sg('higiene', [-11, 2.35, 5.7], Math.PI / 2, 2.6)}{sg('juguetes', [-3.9, 2.35, 0])}{sg('accesorios', [2.9, 2.35, 0])}{sg('caja', [4.4, 2.5, 6.2], Math.PI)}
    <Plant position={[-11.3, 0, -4.2]} s={1.3} /><Plant position={[11.3, 0, -4.4]} s={1.3} /><Plant position={[-0.2, 0, 8.4]} s={1.1} /><Plant position={[11.3, 0, 7.6]} s={1.4} /><Plant position={[-11.3, 0, 8.3]} s={1.4} /><Plant position={[6.4, 0, -8.5]} s={1.1} />
  </>);
}
export function ShopScene({ onNear, onProduct, onNpc, onAnimal, onMove }: { onNear: (id: string | null) => void; onProduct: (id: string) => void; onNpc: (id: string) => void; onAnimal: (d: string) => void; onMove?: (x: number, z: number, yaw: number) => void }) {
  const points = useMemo<Point[]>(() => [...Object.entries(SP).map(([id, s]) => ({ id, x: s.p[0], z: s.p[1], r: s.r })), ...Object.entries(SHOP_NPCS).filter(([k]) => k !== 'carmen').map(([id, p]) => ({ id: 'npc:' + id, x: p[0], z: p[1], r: 1.7 }))], []);
  const PID = useMemo(() => ({ alimentos: pids('alimentos'), higiene: pids('higiene'), juguetes: pids('juguetes'), accesorios: pids('accesorios'), acuarios: pids('acuarios') }), []);
  useEffect(() => { ctl.locked = false; ambient('tienda'); play('door'); return () => ambient(null); }, []);
  return (
    <Scene className="walk" fov={58}>
      <Lights area={13} sun={[4, 10, 7]} />
      <pointLight position={[-9, 2.6, -5]} intensity={5} color="#ffe2c4" distance={7} /><pointLight position={[9.6, 2.2, -1]} intensity={5} color="#bfe6ff" distance={6} /><pointLight position={[1, 2.8, 5]} intensity={5} color="#ffd9e2" distance={8} />
      <Building /><Departments onAnimal={onAnimal} />
      <Shelf pids={PID.alimentos} w={6.2} position={[-11.5, 0, 0.2]} rotation={Math.PI / 2} color={DEPT.alimentos.color} onPick={onProduct} />
      <Shelf pids={PID.higiene} w={3.8} position={[-11.5, 0, 5.7]} rotation={Math.PI / 2} color={DEPT.higiene.color} onPick={onProduct} />
      {[0, 1].map((k) => <group key={k}><Shelf pids={PID.juguetes} w={4.9} position={[-3.9, 0, k ? -0.27 : 0.27]} rotation={k ? Math.PI : 0} color={DEPT.juguetes.color} onPick={onProduct} /><Shelf pids={PID.accesorios} w={5.5} position={[2.9, 0, k ? -0.27 : 0.27]} rotation={k ? Math.PI : 0} color={DEPT.accesorios.color} onPick={onProduct} /></group>)}
      <Shelf pids={PID.acuarios} w={4} position={[11.5, 0, 4.2]} rotation={-Math.PI / 2} color={DEPT.acuarios.color} onPick={onProduct} />
      {Object.entries(SHOP_NPCS).map(([id, [x, z, r]]) => <Human key={id} id={id} position={[x, 0, z]} rotation={r} onClick={(e) => { if (e.delta < 6 && e.distance < 5) { e.stopPropagation(); onNpc(id); } }} />)}
      <Human id="sofia" path={[[-7, 3], [-7, -3], [-1, -3.4], [6, -3.2], [7, 3], [0, 3]]} /><Human id="andres" path={[[7.6, 2.6], [7.4, -3.6], [1, -3.8], [-6.8, -2], [-6.9, 3.4], [2, 3.2]]} />
      <Player start={[-1.9, 7.4]} yaw={0} boxes={BOXES} bounds={B} points={points} onNear={onNear} onMove={onMove} />
    </Scene>
  );
}
export function ShopMap({ pos }: { pos: { x: number; z: number; yaw: number } }) {
  const X = (x: number) => ((x + 12) / 24) * 120, Z = (z: number) => ((z + 9) / 18) * 90;
  return (
    <svg className="minimap" viewBox="0 0 120 90">
      <rect width="120" height="90" rx="8" />
      {Object.entries(SP).map(([d, s]) => <g key={d} onClick={() => { ctl.jump = { x: s.p[0], z: s.p[1], yaw: s.yaw, pitch: /perros|gatos|conejos/.test(d) ? -0.38 : -0.12 }; play('click'); }} style={{ cursor: 'pointer' }}><circle cx={X(s.p[0])} cy={Z(s.p[1])} r="6.5" fill={DEPT[d].color} /><text x={X(s.p[0])} y={Z(s.p[1]) + 2.8} fontSize="7.5" textAnchor="middle">{DEPT[d].icon}</text></g>)}
      <g transform={`translate(${X(pos.x)} ${Z(pos.z)}) rotate(${(-pos.yaw * 180) / Math.PI})`}><path d="M0 -6 L4 4 L0 2 L-4 4Z" fill="#b0336a" /></g>
    </svg>
  );
}
