import * as THREE from 'three';
import { A } from '../data/products';
import { type Paint, type Prim, type FurOpt, cap, ell, eye, furMesh, mesh, mirror, setShells, MAX_SHELLS } from './sdf';
export type Mood = 'idle' | 'walk' | 'happy' | 'sleep' | 'eat';
export interface Animal { id: string; kind: string; group: THREE.Group; size: number; update: (t: number, mood: Mood) => void; detail: (n: number) => void; headY: number }
interface PartDef { g: THREE.BufferGeometry; at: [number, number, number]; fur: FurOpt }
const cache = new Map<string, Record<string, PartDef>>();
const noise = (x: number, y: number, z: number) => Math.sin(x * 37 + Math.sin(z * 23) * 2) * Math.sin(y * 41 + 1.3) * Math.sin(z * 31 + x * 9);
const C = (s: string) => new THREE.Color(s);
function parts(id: string, make: () => Record<string, { p: Prim[]; at: [number, number, number]; cell: number; paint?: Paint }>, fur: FurOpt) {
  let d = cache.get(id);
  if (!d) { d = {}; for (const [k, v] of Object.entries(make())) d[k] = { g: mesh(v.p, v.cell, v.paint), at: v.at, fur }; cache.set(id, d); }
  const out: Record<string, THREE.Group> = {};
  for (const [k, v] of Object.entries(d)) { const m = furMesh(v.g, v.fur); m.position.set(...v.at); out[k] = m; }
  return out;
}
/** Sin pelo alrededor de los ojos, para que se vean. */
const bare = (p: Paint | undefined, ex: number, ey: number, ez: number, r: number): Paint => (x, y, z, c, f) => { const q = p?.(x, y, z, c, f), d = Math.hypot(Math.abs(x) - ex, y - ey, z - ez), base = typeof q === 'number' ? q : f; if (d < r * 1.5) c.multiplyScalar(0.82 + 0.18 * Math.min(1, d / (r * 1.5))); return base * THREE.MathUtils.smoothstep(d, r * 0.85, r * 1.9); };
const black = new THREE.MeshPhysicalMaterial({ color: '#171211', roughness: 0.3, clearcoat: 0.7 });
const pink = new THREE.MeshPhysicalMaterial({ color: '#d98f96', roughness: 0.4, clearcoat: 0.4 });
const ball = (r: number, m: THREE.Material, s: [number, number, number] = [1, 1, 1]) => { const x = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), m); x.scale.set(...s); x.raycast = () => {}; return x; };
function quad(kind: 'perro' | 'gato', v: { main: string; light: string; dark: string; paw?: string; len: number; den: number; paint?: Paint; iris: string; s: number; nose: THREE.Material }): Animal['group'] & { p?: Record<string, THREE.Group> } {
  const dog = kind === 'perro', { main: m, light: l, dark: k } = v, paw = v.paw ?? m;
  const P = parts(kind + m + l + k, () => dog ? {
    body: { at: [0, 0, 0], cell: 0.017, paint: v.paint, p: [cap([0, 0.43, -0.27], [0, 0.45, 0.2], 0.135, 0.155, m, 1, 0.1), ell([0, 0.4, 0.25], [0.135, 0.16, 0.12], l, 1.2, 0.1), cap([0, 0.5, 0.26], [0, 0.63, 0.36], 0.115, 0.1, m, 1.1, 0.1), ell([0, 0.36, 0.02], [0.11, 0.08, 0.2], l, 1, 0.08), ...mirror([ell([0.085, 0.4, -0.27], [0.075, 0.14, 0.12], m, 0.9, 0.07), ell([0.09, 0.4, 0.22], [0.065, 0.13, 0.085], m, 0.9, 0.06)])] },
    legF: { at: [0.095, 0.36, 0.23], cell: 0.012, paint: v.paint, p: [cap([0, 0.02, 0], [0, -0.3, 0.005], 0.062, 0.036, m, 0.55, 0.04), ell([0, -0.33, 0.028], [0.042, 0.032, 0.06], paw, 0.3, 0.03), ...[-0.022, 0, 0.022].map((x) => ell([x, -0.335, 0.072], [0.014, 0.018, 0.02], paw, 0.2, 0.012))] },
    legB: { at: [0.095, 0.38, -0.27], cell: 0.012, paint: v.paint, p: [cap([0, 0.02, 0], [0, -0.14, 0.05], 0.085, 0.05, m, 0.8, 0.05), cap([0, -0.14, 0.05], [0, -0.22, -0.05], 0.046, 0.034, m, 0.5, 0.04), cap([0, -0.22, -0.05], [0, -0.34, -0.03], 0.033, 0.034, m, 0.4, 0.03), ell([0, -0.35, 0.0], [0.042, 0.032, 0.06], paw, 0.3, 0.03)] },
    head: { at: [0, 0.66, 0.37], cell: 0.0095, paint: bare(v.paint, 0.052, 0.064, 0.133, 0.031), p: [ell([0, 0.05, 0.03], [0.105, 0.098, 0.115], m, 0.6, 0.05), ell([0, 0.075, 0.09], [0.07, 0.05, 0.06], m, 0.35, 0.05), cap([0, 0.012, 0.12], [0, -0.004, 0.215], 0.062, 0.045, l, 0.22, 0.05), ...mirror([ell([0.026, -0.008, 0.2], [0.032, 0.03, 0.04], l, 0.18, 0.025), ell([0.065, 0.01, 0.07], [0.05, 0.055, 0.06], m, 0.6, 0.04), cap([0.088, 0.105, 0.005], [0.137, 0.0, 0.03], 0.038, 0.047, k, 0.7, 0.02), cap([0.137, 0.0, 0.03], [0.133, -0.055, 0.05], 0.045, 0.028, k, 0.8, 0.02)]), cap([0, -0.045, 0.1], [0, -0.048, 0.175], 0.032, 0.026, l, 0.25, 0.015)] },
    tail: { at: [0, 0.5, -0.36], cell: 0.013, paint: v.paint, p: [cap([0, 0, 0.03], [0, 0.07, -0.1], 0.045, 0.04, m, 1.2, 0.03), cap([0, 0.07, -0.1], [0, 0.2, -0.17], 0.042, 0.018, l, 1.9, 0.03)] },
  } : {
    body: { at: [0, 0, 0], cell: 0.013, paint: v.paint, p: [cap([0, 0.27, -0.19], [0, 0.28, 0.13], 0.09, 0.092, m, 1, 0.07), ell([0, 0.25, 0.14], [0.078, 0.1, 0.07], l, 1.2, 0.06), cap([0, 0.31, 0.16], [0, 0.38, 0.21], 0.07, 0.065, m, 1, 0.06), ell([0, 0.22, -0.03], [0.075, 0.05, 0.14], l, 1, 0.05), ...mirror([ell([0.06, 0.25, -0.19], [0.052, 0.09, 0.085], m, 0.9, 0.05)])] },
    legF: { at: [0.058, 0.23, 0.13], cell: 0.0085, paint: v.paint, p: [cap([0, 0.02, 0], [0, -0.19, 0.004], 0.04, 0.024, m, 0.5, 0.03), ell([0, -0.21, 0.014], [0.028, 0.02, 0.036], paw, 0.3, 0.02), ...[-0.014, 0, 0.014].map((x) => ell([x, -0.213, 0.04], [0.009, 0.011, 0.012], paw, 0.2, 0.008))] },
    legB: { at: [0.06, 0.24, -0.19], cell: 0.0085, paint: v.paint, p: [cap([0, 0.02, 0], [0, -0.09, 0.03], 0.058, 0.035, m, 0.8, 0.04), cap([0, -0.09, 0.03], [0, -0.145, -0.035], 0.031, 0.022, m, 0.5, 0.03), cap([0, -0.145, -0.035], [0, -0.21, -0.02], 0.021, 0.023, m, 0.4, 0.02), ell([0, -0.22, 0.0], [0.028, 0.02, 0.036], paw, 0.3, 0.02)] },
    head: { at: [0, 0.41, 0.23], cell: 0.0068, paint: bare(v.paint, 0.034, 0.034, 0.078, 0.024), p: [ell([0, 0.03, 0.015], [0.077, 0.07, 0.075], m, 0.6, 0.03), ...mirror([ell([0.045, 0.0, 0.03], [0.038, 0.036, 0.042], m, 0.75, 0.03), ell([0.016, -0.005, 0.078], [0.022, 0.018, 0.022], l, 0.25, 0.014), { a: [0.05, 0.075, 0.0], b: [0.066, 0.145, -0.005], r: 0.033, r2: 0.005, c: k, f: 0.35, k: 0.015, cut: (_x: number, _y: number, z: number) => Math.abs(z + 0.004) - 0.02 }]), cap([0, 0.03, 0.06], [0, 0.005, 0.088], 0.026, 0.017, m, 0.2, 0.025), ell([0, -0.025, 0.066], [0.022, 0.017, 0.022], l, 0.3, 0.015)] },
    tail: { at: [0, 0.3, -0.27], cell: 0.009, paint: v.paint, p: [cap([0, 0, 0.03], [0, 0.03, -0.1], 0.026, 0.024, m, 1, 0.02), cap([0, 0.03, -0.1], [0, 0.14, -0.15], 0.024, 0.022, m, 1.1, 0.02), cap([0, 0.14, -0.15], [0, 0.23, -0.11], 0.022, 0.015, k, 1.2, 0.02)] },
  }, { len: v.len, den: v.den, comb: 0.55 });
  const G = new THREE.Group() as THREE.Group & { p?: Record<string, THREE.Group> };
  const torso = new THREE.Group(), legs: Record<string, THREE.Group> = {};
  for (const [n, sx, part] of [['FL', 1, 'legF'], ['FR', -1, 'legF'], ['BL', 1, 'legB'], ['BR', -1, 'legB']] as const) {
    const s = P[part].clone(); s.children.forEach((c, i) => { c.raycast = P[part].children[i].raycast; });
    s.position.x *= sx; s.scale.x = sx === -1 ? 1 : 1; legs[n] = s; torso.add(s);
  }
  const head = P.head;
  const E = dog ? { x: 0.052, y: 0.064, z: 0.133, r: 0.021 } : { x: 0.034, y: 0.034, z: 0.0765, r: 0.0175 };
  for (const s of [1, -1]) {
    const e = eye(E.r, v.iris, dog ? 'round' : 'slit'); e.position.set(E.x * s, E.y, E.z); e.rotation.y = s * (dog ? 0.28 : 0.2); head.add(e);
    const lid = ball(E.r * 1.12, new THREE.MeshStandardMaterial({ color: C(dog ? k : m).multiplyScalar(0.55), roughness: 0.9 })); lid.position.set(E.x * s, E.y + 0.002, E.z - E.r * 0.22); head.add(lid);
  }
  if (dog) {
    const n = ball(0.022, v.nose, [1.15, 0.85, 0.8]); n.position.set(0, 0.018, 0.256); head.add(n);
    const tongue = ball(0.02, pink, [1, 0.3, 2]); tongue.position.set(0, -0.032, 0.205); tongue.rotation.x = 0.45; tongue.name = 'tongue'; head.add(tongue);
  } else {
    const n = ball(0.0085, v.nose, [1.2, 0.8, 0.7]); n.position.set(0, 0.006, 0.104); head.add(n);
    const wm = new THREE.MeshBasicMaterial({ color: '#fbf6f0' });
    for (const s of [1, -1]) for (let i = 0; i < 4; i++) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.0003, 0.0007, 0.085, 4), wm); w.position.set(s * 0.066, -0.004 - i * 0.004, 0.082); w.rotation.set(0.2, 0, s * (1.45 + i * 0.12)); w.raycast = () => {}; head.add(w); }
    for (const s of [1, -1]) { const inner = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.048, 12), pink); inner.scale.z = 0.25; inner.position.set(s * 0.058, 0.108, 0.013); inner.rotation.z = -s * 0.22; inner.raycast = () => {}; head.add(inner); }
  }
  torso.add(P.body, head, P.tail); G.add(torso);
  G.p = { torso, head, tail: P.tail, ...legs };
  G.scale.setScalar(v.s);
  return G;
}
function animQuad(G: ReturnType<typeof quad>, dog: boolean): Animal['update'] {
  const p = G.p!, hy = p.head.position.y, hz = p.head.position.z, ph = Math.random() * 9, tongue = p.head.getObjectByName('tongue');
  return (t, mood) => {
    const w = mood === 'walk', h = mood === 'happy', sl = mood === 'sleep', ea = mood === 'eat', s = t * (w ? 9 : 4) + ph;
    const L = (k: string, o: number) => { p[k].rotation.x = w ? Math.sin(s + o) * 0.55 : sl ? (k[0] === 'F' ? -1.35 : 1.2) : 0; p[k].position.y += ((sl ? 0.12 : k[0] === 'F' ? (dog ? 0.36 : 0.23) : dog ? 0.38 : 0.24) - p[k].position.y) * 0.1; };
    L('FL', 0); L('BR', 0.3); L('FR', Math.PI); L('BL', Math.PI + 0.3);
    p.torso.position.y += ((sl ? (dog ? -0.24 : -0.14) : w ? Math.abs(Math.sin(s)) * 0.015 : h ? Math.abs(Math.sin(t * 6)) * 0.04 : 0) - p.torso.position.y) * 0.2;
    p.torso.scale.y = 1 + Math.sin(t * (sl ? 1.4 : 2.4) + ph) * 0.008;
    p.tail.rotation.y = Math.sin(t * (h ? 13 : dog ? 6 : 1.6) + ph) * (h ? 0.75 : dog ? 0.35 : 0.3); p.tail.rotation.x = sl ? -0.9 : 0;
    const look = Math.sin(t * 0.6 + ph) * 0.4;
    p.head.rotation.y += ((sl ? 0.4 : ea ? 0 : look) - p.head.rotation.y) * 0.06;
    p.head.rotation.x += ((ea ? 0.75 + Math.sin(t * 8) * 0.1 : sl ? 0.35 : Math.sin(t * 0.9 + ph) * 0.08) - p.head.rotation.x) * 0.09;
    p.head.rotation.z = h ? Math.sin(t * 2.5) * 0.14 : Math.sin(t * 0.4 + ph) * 0.06;
    p.head.position.y += (hy - (ea ? (dog ? 0.3 : 0.17) : sl ? (dog ? 0.14 : 0.08) : 0) - p.head.position.y) * 0.08; p.head.position.z += (hz + (ea ? 0.06 : 0) - p.head.position.z) * 0.08;
    if (tongue) tongue.scale.z = h || w ? 2.1 + Math.sin(t * 12) * 0.25 : 0.6;
  };
}
function rodent(rabbit: boolean, m: string, l: string, k: string, s: number) {
  const P = parts('r' + rabbit + m, () => rabbit ? {
    body: { at: [0, 0, 0], cell: 0.0115, p: [ell([0, 0.13, -0.06], [0.1, 0.115, 0.13], m, 1, 0.06), ell([0, 0.12, 0.06], [0.075, 0.09, 0.085], m, 1, 0.06), ell([0, 0.07, 0.07], [0.06, 0.05, 0.06], l, 1.1, 0.04), ...mirror([ell([0.07, 0.075, -0.07], [0.048, 0.07, 0.085], m, 0.9, 0.04), ell([0.065, 0.018, 0.0], [0.026, 0.018, 0.07], l, 0.4, 0.02), cap([0.035, 0.08, 0.11], [0.035, 0.02, 0.135], 0.026, 0.021, m, 0.5, 0.02)]), ell([0, 0.1, -0.19], [0.036, 0.036, 0.034], l, 1.6, 0.02)] },
    head: { at: [0, 0.23, 0.12], cell: 0.0072, paint: bare(undefined, 0.054, 0.016, 0.042, 0.02), p: [ell([0, 0, 0.01], [0.06, 0.06, 0.07], m, 0.7, 0.03), ell([0, -0.016, 0.06], [0.036, 0.032, 0.034], l, 0.35, 0.025), ...mirror([ell([0.035, -0.015, 0.035], [0.03, 0.03, 0.036], m, 0.6, 0.02), { a: [0.028, 0.05, -0.02], b: [0.055, 0.2, -0.05], r: 0.017, r2: 0.02, c: m, f: 0.3, k: 0.015 }])] },
  } : {
    body: { at: [0, 0, 0], cell: 0.0062, p: [ell([0, 0.055, -0.015], [0.047, 0.048, 0.062], m, 1, 0.03), ell([0, 0.035, 0.0], [0.042, 0.03, 0.055], l, 1, 0.025), ...mirror([ell([0.028, 0.01, 0.03], [0.009, 0.008, 0.016], k, 0.1, 0.008), ell([0.033, 0.01, -0.04], [0.01, 0.009, 0.018], k, 0.1, 0.008)]), ell([0, 0.04, -0.077], [0.006, 0.006, 0.012], k, 0.1, 0.008)] },
    head: { at: [0, 0.068, 0.045], cell: 0.0048, paint: bare(undefined, 0.024, 0.01, 0.027, 0.014), p: [ell([0, 0, 0], [0.037, 0.035, 0.037], m, 0.8, 0.02), ell([0, -0.01, 0.028], [0.019, 0.016, 0.018], l, 0.4, 0.016), ...mirror([ell([0.023, -0.013, 0.014], [0.018, 0.017, 0.02], l, 0.7, 0.015), { a: [0.026, 0.03, -0.008], s: [0.014, 0.015, 0.005] as [number, number, number], c: k, f: 0.15, k: 0.006 }])] },
  }, rabbit ? { len: 0.02, den: 420, comb: 0.5 } : { len: 0.011, den: 700, comb: 0.4 });
  const G = new THREE.Group(), E = rabbit ? { x: 0.053, y: 0.016, z: 0.042, r: 0.0145 } : { x: 0.0235, y: 0.011, z: 0.027, r: 0.0082 };
  for (const q of [1, -1]) { const e = eye(E.r, '#1a0f0a', 'full'); e.position.set(E.x * q, E.y, E.z); e.rotation.y = q * 0.8; P.head.add(e); }
  const n = ball(rabbit ? 0.007 : 0.004, pink); n.position.set(0, rabbit ? -0.008 : -0.005, rabbit ? 0.094 : 0.046); P.head.add(n);
  if (rabbit) for (const q of [1, -1]) { const i = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.11, 4, 8), pink); i.scale.z = 0.3; i.position.set(q * 0.045, 0.125, -0.016); i.rotation.set(-0.2, 0, -q * 0.18); i.raycast = () => {}; P.head.add(i); }
  G.add(P.body, P.head); G.scale.setScalar(s);
  const ph = Math.random() * 9, hy = P.head.position.y, base = { y: 0 };
  return { G, update: ((t, mood) => {
    const w = mood === 'walk' || mood === 'happy';
    G.position.y = base.y + (w ? Math.abs(Math.sin(t * (rabbit ? 6 : 12))) * (rabbit ? 0.09 : 0.008) : 0);
    P.body.scale.setScalar(1 + Math.sin(t * (rabbit ? 4 : 7) + ph) * 0.012);
    P.head.rotation.x = mood === 'eat' ? 0.6 + Math.sin(t * 12) * 0.08 : mood === 'sleep' ? 0.5 : Math.sin(t * 1.1 + ph) * 0.12;
    P.head.rotation.y = mood === 'eat' ? 0 : Math.sin(t * 0.7 + ph) * 0.5; P.head.position.y = hy - (mood === 'sleep' || mood === 'eat' ? hy * 0.25 : 0);
    n.scale.setScalar(1 + Math.sin(t * 17) * 0.18);
  }) as Animal['update'] };
}
function bird(m: string, l: string, k: string, beak: string, parrot: boolean, s: number) {
  const P = parts('b' + m, () => ({
    body: { at: [0, 0, 0], cell: 0.0085, paint: (x, y, z, c) => { if (parrot && y > 0.13 && z < 0) c.lerp(C(k), 0.35); }, p: [ell([0, 0.12, 0], [0.056, 0.085, 0.062], m, 1, 0.04), ell([0, 0.1, 0.03], [0.044, 0.065, 0.045], l, 1, 0.03), cap([0, 0.06, -0.04], [0, -0.03, -0.13], 0.03, 0.012, k, 0.6, 0.03), cap([0, 0.03, -0.08], [0, parrot ? -0.11 : -0.05, parrot ? -0.21 : -0.15], 0.016, 0.008, k, 0.4, 0.02)] },
    head: { at: [0, 0.22, 0.02], cell: 0.0065, p: [ell([0, 0, 0], [0.046, 0.046, 0.048], m, 0.8, 0.02), ell([0, -0.005, 0.026], [0.03, 0.028, 0.025], l, 0.5, 0.02)] },
    wing: { at: [0.052, 0.17, 0], cell: 0.0075, paint: (_x, y, z, c) => { const b = Math.sin((y * 0.7 + z) * 190); if (b > 0.25) c.lerp(C(k), 0.5); if (y < -0.08) c.lerp(C(k), 0.7); }, p: [{ a: [0, 0, 0.01], b: [0.004, -0.1, -0.06], r: 0.044, r2: 0.014, c: m, f: 0.4, k: 0.02, cut: (x) => Math.abs(x) - 0.013 }] },
  }), { len: 0.012, den: 190, comb: 1.1 });
  const G = new THREE.Group(), bm = new THREE.MeshPhysicalMaterial({ color: beak, roughness: 0.35, clearcoat: 0.5 });
  const up = new THREE.Mesh(new THREE.ConeGeometry(parrot ? 0.019 : 0.011, parrot ? 0.046 : 0.026, 14), bm); up.rotation.x = parrot ? 2.3 : 1.6; up.position.set(0, parrot ? -0.008 : -0.002, parrot ? 0.062 : 0.064); P.head.add(up);
  if (parrot) { const lo = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.02, 12), bm); lo.rotation.x = 1.9; lo.position.set(0, -0.026, 0.043); P.head.add(lo); }
  for (const q of [1, -1]) { const ring = ball(0.0105, new THREE.MeshStandardMaterial({ color: parrot ? '#f2eee4' : m })); ring.position.set(q * 0.037, 0.008, 0.022); P.head.add(ring); const e = eye(0.0085, parrot ? '#e2842e' : '#1a100a', parrot ? 'round' : 'full'); e.position.set(q * 0.0405, 0.008, 0.025); e.rotation.y = q * 1.1; P.head.add(e); }
  const w2 = P.wing.clone(); w2.position.x *= -1; w2.scale.x = -1;
  const lm = new THREE.MeshStandardMaterial({ color: parrot ? '#8d8580' : '#d9a08a', roughness: 0.8 });
  for (const q of [1, -1]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.006, 0.05, 8), lm); leg.position.set(q * 0.02, 0.025, 0.01); G.add(leg); for (const a of [-0.5, 0, 0.5]) { const toe = new THREE.Mesh(new THREE.CapsuleGeometry(0.0045, 0.025, 3, 6), lm); toe.rotation.set(1.5, 0, a); toe.position.set(q * 0.02 + a * 0.016, 0.003, 0.022); G.add(toe); } }
  G.add(P.body, P.head, P.wing, w2); G.scale.setScalar(s);
  const ph = Math.random() * 9;
  return { G, update: ((t, mood) => {
    const fl = mood === 'walk' || mood === 'happy', f = fl ? Math.abs(Math.sin(t * 16)) * 1.2 : 0.03;
    P.wing.rotation.z = f; w2.rotation.z = -f; G.position.y = fl ? Math.abs(Math.sin(t * 5)) * 0.12 : 0;
    const tw = Math.floor(t * 0.9 + ph); P.head.rotation.y += (Math.sin(tw * 5.3) * 0.9 - P.head.rotation.y) * 0.16; P.head.rotation.z += (Math.sin(tw * 3.1) * 0.3 - P.head.rotation.z) * 0.16;
    P.head.rotation.x = mood === 'eat' ? 0.5 + Math.abs(Math.sin(t * 7)) * 0.6 : mood === 'sleep' ? 0.5 : 0;
  }) as Animal['update'] };
}
function fish(m: string, l: string, fin: string, betta: boolean, s: number) {
  const G = new THREE.Group(), g = new THREE.SphereGeometry(0.06, 36, 24), pos = g.attributes.position, col = new Float32Array(pos.count * 3), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i), y = pos.getY(i); const z = pos.getZ(i), q = z / 0.06, tap = q < 0 ? 1 - Math.pow(-q, 1.4) * 0.72 : 1 - q * q * 0.18;
    x *= 0.52 * tap; y *= (betta ? 0.62 : 0.8) * tap; pos.setXYZ(i, x, y, z * (betta ? 1.5 : 1.25));
    const sc = Math.sin(z * 520) * Math.sin(y * 520 + (Math.floor(z * 165) % 2) * 1.6);
    c.set(m).lerp(new THREE.Color(l), THREE.MathUtils.clamp(0.35 - y * 18, 0, 1)).multiplyScalar(1 + sc * 0.13); col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.computeVertexNormals();
  const body = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.28, metalness: 0.25, clearcoat: 0.8, iridescence: 0.5 })); G.add(body);
  const fm = new THREE.MeshPhysicalMaterial({ color: fin, side: THREE.DoubleSide, transparent: true, opacity: 0.78, roughness: 0.4, iridescence: 0.4 });
  const fan = (w: number, h: number, n = 22) => { const gg = new THREE.PlaneGeometry(1, 1, n, 8), p = gg.attributes.position; for (let i = 0; i < p.count; i++) { const u = p.getX(i) + 0.5, v = p.getY(i); const sp = 0.25 + u * 0.75 + (betta ? Math.sin(u * 3) * 0.15 : 0); p.setXYZ(i, Math.sin(u * 5 + v * 9) * 0.004, v * h * sp * (1 + 0.06 * Math.sin(v * 40)), -u * w * (1 - Math.abs(v) * (betta ? -0.2 : 0.15))); } gg.computeVertexNormals(); return new THREE.Mesh(gg, fm); };
  const tail = fan(betta ? 0.15 : 0.09, betta ? 0.2 : 0.12); tail.position.z = betta ? -0.075 : -0.062; G.add(tail);
  const dor = fan(betta ? 0.11 : 0.07, betta ? 0.1 : 0.05); dor.position.set(0, betta ? 0.045 : 0.052, 0.02); dor.rotation.x = -0.2; G.add(dor);
  const an = fan(betta ? 0.11 : 0.04, betta ? 0.1 : 0.04); an.position.set(0, -0.045, betta ? 0 : -0.03); an.rotation.x = 0.3; G.add(an);
  const pf = [1, -1].map((q) => { const f = fan(0.035, 0.035); f.position.set(q * 0.028, -0.012, 0.03); f.rotation.y = -q * 0.9; G.add(f); return f; });
  for (const q of [1, -1]) { const e = eye(0.0095, '#d8b24a', 'round'); e.position.set(q * 0.026, 0.01, betta ? 0.062 : 0.05); e.rotation.y = q * 1.25; G.add(e); }
  G.scale.setScalar(s);
  const ph = Math.random() * 9;
  return { G, update: ((t) => { const w = Math.sin(t * 6 + ph); tail.rotation.y = w * 0.5; body.rotation.y = -w * 0.06; dor.rotation.y = w * 0.15; an.rotation.y = w * 0.15; pf.forEach((f, i) => { f.rotation.z = Math.sin(t * 8 + i) * 0.4; }); }) as Animal['update'] };
}
const white = C('#f7f2ec');
const collie: Paint = (x, y, z, c, f) => { const n = noise(x, y, z) * 0.02; if (z > 0.02 && z < 0.2 && y < 0.14 && Math.abs(x) < 0.028 + n && y > -0.1) c.copy(white); if (y > 0.2 && z > 0.12 + n && y < 0.62) c.copy(white); if (y < -0.2) c.copy(white); return f; };
const tabby: Paint = (x, y, z, c) => { if (z > 0.055 && z < 0.13 && y < 0.05 && y > -0.1) return; const s = Math.sin(z * 75 + Math.abs(x) * 30 + noise(x, y, z) * 1.5); if (s > 0.35) c.lerp(C('#4c3a2b'), 0.6); };
const siam: Paint = (x, y, z, c) => { void x; if (Math.abs(y) < 0.2 && z > 0.07 && z < 0.12 && y < 0.04) c.lerp(C('#43322b'), 0.75); if (y < -0.12) c.lerp(C('#43322b'), 0.8); };
export function buildAnimal(id: string): Animal {
  const kind = A[id].kind, group = new THREE.Group();
  const mk = (G: THREE.Group, update: Animal['update'], size: number, headY: number): Animal => { group.add(G); return { id, kind, group, size, update, headY, detail: (n) => setShells(group, Math.min(n, MAX_SHELLS)) }; };
  const q = (v: Parameters<typeof quad>[1]) => { const k = kind as 'perro' | 'gato', G = quad(k, v); return mk(G, animQuad(G, k === 'perro'), k === 'perro' ? 0.85 : 0.6, k === 'perro' ? 0.62 : 0.4); };
  switch (id) {
    case 'golden': return q({ main: '#cf9a5f', light: '#e9cfa4', dark: '#b27a43', len: 0.027, den: 300, iris: '#5a3419', s: 0.95, nose: black });
    case 'collie': return q({ main: '#26211f', light: '#f3ede6', dark: '#1a1615', paw: '#f3ede6', len: 0.027, den: 300, iris: '#7a5028', s: 0.95, nose: black, paint: collie });
    case 'labrador': return q({ main: '#54321f', light: '#63402a', dark: '#42261a', len: 0.015, den: 320, iris: '#8a5a2a', s: 1.02, nose: new THREE.MeshPhysicalMaterial({ color: '#2d1a14', roughness: 0.3, clearcoat: 0.6 }) });
    case 'tabby': return q({ main: '#a98760', light: '#e6d3b4', dark: '#8a6845', len: 0.018, den: 380, iris: '#93a83c', s: 1, nose: pink, paint: tabby });
    case 'gris': return q({ main: '#7c8189', light: '#9a9ea6', dark: '#676c74', len: 0.016, den: 420, iris: '#d59a2c', s: 1, nose: new THREE.MeshPhysicalMaterial({ color: '#4a4b52', roughness: 0.4 }) });
    case 'siames': return q({ main: '#e6d6c0', light: '#f2e8da', dark: '#43322b', paw: '#43322b', len: 0.014, den: 420, iris: '#4f93d8', s: 1, nose: black, paint: siam });
    case 'conejoblanco': { const r = rodent(true, '#f3eee9', '#ffffff', '#ded2ca', 1); return mk(r.G, r.update, 0.42, 0.22); }
    case 'conejomarron': { const r = rodent(true, '#8f6747', '#d9c2a4', '#6e4c33', 1); return mk(r.G, r.update, 0.42, 0.22); }
    case 'hamster': { const r = rodent(false, '#cf9450', '#f7ecdc', '#d9a08a', 1.5); return mk(r.G, r.update, 0.2, 0.1); }
    case 'hamstergris': { const r = rodent(false, '#8d8a88', '#f2eeea', '#caa79a', 1.25); return mk(r.G, r.update, 0.18, 0.08); }
    case 'loro': { const r = bird('#3f9a4c', '#8cc45a', '#1f5f7a', '#c9483b', true, 1.25); return mk(r.G, r.update, 0.4, 0.26); }
    case 'canario': { const r = bird('#efc733', '#f7e27a', '#c99a1e', '#e0a27a', false, 0.75); return mk(r.G, r.update, 0.22, 0.16); }
    case 'betta': { const r = fish('#2b4fae', '#5a7fe0', '#7a5bd0', true, 1.15); return mk(r.G, r.update, 0.28, 0); }
    default: { const r = fish('#e8812c', '#fbd9a6', '#f3a356', false, 1.1); return mk(r.G, r.update, 0.22, 0); }
  }
}
