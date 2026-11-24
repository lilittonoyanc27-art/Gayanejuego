import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
/** Retratos renderizados una sola vez y guardados en memoria. */
const done = new Map<string, Promise<string>>();
let R: THREE.WebGLRenderer | null = null, S: THREE.Scene, cam: THREE.PerspectiveCamera, chain: Promise<unknown> = Promise.resolve();
function setup() {
  if (R) return R;
  R = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  R.setSize(320, 320, false); R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 0.95;
  S = new THREE.Scene(); cam = new THREE.PerspectiveCamera(28, 1, 0.01, 20);
  const pm = new THREE.PMREMGenerator(R); S.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; S.environmentIntensity = 0.55;
  const k = new THREE.DirectionalLight('#fff3e6', 2.2); k.position.set(1.5, 2.5, 2.5); const rim = new THREE.DirectionalLight('#e9c6ff', 1.4); rim.position.set(-2, 2, -2); S.add(k, rim);
  return R;
}
async function render(key: string, size: number): Promise<string> {
  const [kind, id, variant] = key.split(':');
  const r = setup(); r.setSize(size, size, false);
  const G = new THREE.Group(), box = new THREE.Box3();
  if (kind === 'animal') {
    const { buildAnimal } = await import('./animals'); const a = buildAnimal(id); for (let i = 0; i < 40; i++) a.update(1 + i * 0.016, variant === 'b' ? 'happy' : 'idle'); G.add(a.group); G.rotation.y = a.kind === 'pez' ? -1.15 : variant === 'b' ? 0.85 : -0.5;
  } else if (kind === 'npc') { const { buildPerson } = await import('./people'); const p = buildPerson(id); p.update(1, 'idle'); G.add(p.group); G.rotation.y = 0.12; }
  else { const { goodGroup } = await import('./goods'); G.add(goodGroup(id)); G.rotation.y = -0.45; }
  S.add(G); G.updateMatrixWorld(true);
  if (kind === 'npc') { const { NPCS } = await import('../data/npcs'), y = NPCS[id]?.teen ? 0.93 : 1; cam.position.set(0, 1.56 * y, 1.02); cam.lookAt(0, 1.5 * y, 0); }
  else {
    box.setFromObject(G); const c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3()), big = kind === 'animal' ? 0.4 * Math.hypot(s.x, s.y, s.z) : 0.55 * Math.max(s.x, s.y, s.z) + 0.02;
    cam.position.set(c.x, c.y + big * 0.55, c.z + (big / Math.tan((14 * Math.PI) / 180)) * (kind === 'animal' ? 0.92 : 1.1)); cam.lookAt(c);
  }
  if (variant === 'b') S.background = new THREE.Color('#f3dbe4');
  r.render(S, cam); const url = r.domElement.toDataURL(variant === 'b' ? 'image/jpeg' : 'image/png', 0.92);
  S.background = null; S.remove(G);
  return url;
}
export function thumb(key: string, size = 320): Promise<string> {
  let p = done.get(key);
  if (!p) { p = chain.then(() => new Promise((r) => setTimeout(r, 8))).then(() => render(key, size)).catch(() => ''); chain = p; done.set(key, p); }
  return p;
}
