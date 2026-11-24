import * as THREE from 'three';
export type V = [number, number, number];
/** Primitiva suave: cápsula cónica (a→b, r→r2) o elipsoide (s). c = color, f = densidad de pelo, k = fusión. */
export interface Prim { a: V; b?: V; r?: number; r2?: number; s?: V; c: string; f?: number; k?: number; cut?: (x: number, y: number, z: number) => number }
export type Paint = (x: number, y: number, z: number, c: THREE.Color, f: number) => number | void;
export const cap = (a: V, b: V, r: number, r2: number, c: string, f = 1, k = 0.03): Prim => ({ a, b, r, r2, c, f, k });
export const ell = (a: V, s: V, c: string, f = 1, k = 0.03): Prim => ({ a, s, c, f, k });
export const mirror = (ps: Prim[]): Prim[] => ps.flatMap((p) => [p, { ...p, a: [-p.a[0], p.a[1], p.a[2]] as V, b: p.b && ([-p.b[0], p.b[1], p.b[2]] as V) }]);
function dist(p: Prim, x: number, y: number, z: number) {
  let d: number;
  const ax = x - p.a[0], ay = y - p.a[1], az = z - p.a[2];
  if (p.s) {
    const [a, b, c] = p.s;
    const k0 = Math.hypot(ax / a, ay / b, az / c), k1 = Math.hypot(ax / (a * a), ay / (b * b), az / (c * c));
    d = k1 < 1e-9 ? -Math.min(a, b, c) : (k0 * (k0 - 1)) / k1;
  } else {
    const bx = p.b![0] - p.a[0], by = p.b![1] - p.a[1], bz = p.b![2] - p.a[2];
    const h = Math.max(0, Math.min(1, (ax * bx + ay * by + az * bz) / (bx * bx + by * by + bz * bz)));
    d = Math.hypot(ax - bx * h, ay - by * h, az - bz * h) - (p.r! + (p.r2! - p.r!) * h);
  }
  return p.cut ? Math.max(d, p.cut(x, y, z)) : d;
}
function field(ps: Prim[], x: number, y: number, z: number) {
  let d = 1e9;
  for (const p of ps) {
    const e = dist(p, x, y, z), k = p.k ?? 0.03;
    if (d > 1e8) { d = e; continue; }
    const h = Math.max(k - Math.abs(d - e), 0) / k;
    d = Math.min(d, e) - h * h * k * 0.25;
  }
  return d;
}
/** Malla única y suave mediante «naive surface nets». */
export function mesh(ps: Prim[], cell: number, paint?: Paint): THREE.BufferGeometry {
  const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
  for (const p of ps) for (const [q, r] of [[p.a, p.s ? null : p.r!], [p.b ?? p.a, p.s ? null : p.r2!]] as [V, number | null][])
    for (let i = 0; i < 3; i++) { const e = r ?? p.s![i]; lo[i] = Math.min(lo[i], q[i] - e); hi[i] = Math.max(hi[i], q[i] + e); }
  const n = [0, 1, 2].map((i) => Math.ceil((hi[i] - lo[i]) / cell) + 5), o = lo.map((v) => v - cell * 2);
  const [nx, ny, nz] = n, val = new Float32Array(nx * ny * nz), id = (x: number, y: number, z: number) => x + nx * (y + ny * z);
  for (let z = 0; z < nz; z++) for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) val[id(x, y, z)] = field(ps, o[0] + x * cell, o[1] + y * cell, o[2] + z * cell);
  const vert = new Int32Array(nx * ny * nz).fill(-1), pos: number[] = [], idx: number[] = [];
  const E = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]], c = new Float32Array(8);
  for (let z = 0; z < nz - 1; z++) for (let y = 0; y < ny - 1; y++) for (let x = 0; x < nx - 1; x++) {
    let m = 0;
    for (let i = 0; i < 8; i++) { c[i] = val[id(x + (i & 1), y + ((i >> 1) & 1), z + (i >> 2))]; if (c[i] < 0) m |= 1 << i; }
    if (m === 0 || m === 255) continue;
    let px = 0, py = 0, pz = 0, q = 0;
    for (const [a, b] of E) {
      if (c[a] < 0 === c[b] < 0) continue;
      const t = c[a] / (c[a] - c[b]);
      px += (a & 1) + ((b & 1) - (a & 1)) * t; py += ((a >> 1) & 1) + (((b >> 1) & 1) - ((a >> 1) & 1)) * t; pz += (a >> 2) + ((b >> 2) - (a >> 2)) * t; q++;
    }
    vert[id(x, y, z)] = pos.length / 3;
    pos.push(o[0] + (x + px / q) * cell, o[1] + (y + py / q) * cell, o[2] + (z + pz / q) * cell);
  }
  for (let z = 1; z < nz - 1; z++) for (let y = 1; y < ny - 1; y++) for (let x = 1; x < nx - 1; x++) {
    const v0 = val[id(x, y, z)] < 0;
    const quad = (v1: boolean, a: number, b: number, d: number, e: number) => { if (v0 === v1) return; if (v0) idx.push(a, b, d, a, d, e); else idx.push(a, d, b, a, e, d); };
    quad(val[id(x + 1, y, z)] < 0, vert[id(x, y - 1, z - 1)], vert[id(x, y, z - 1)], vert[id(x, y, z)], vert[id(x, y - 1, z)]);
    quad(val[id(x, y + 1, z)] < 0, vert[id(x - 1, y, z - 1)], vert[id(x - 1, y, z)], vert[id(x, y, z)], vert[id(x, y, z - 1)]);
    quad(val[id(x, y, z + 1)] < 0, vert[id(x - 1, y - 1, z)], vert[id(x, y - 1, z)], vert[id(x, y, z)], vert[id(x - 1, y, z)]);
  }
  const N = pos.length / 3, nor = new Float32Array(N * 3), col = new Float32Array(N * 3), fur = new Float32Array(N);
  const cols = ps.map((p) => new THREE.Color(p.c)), tmp = new THREE.Color(), e = cell * 0.6;
  for (let i = 0; i < N; i++) {
    const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
    let gx = field(ps, x + e, y, z) - field(ps, x - e, y, z), gy = field(ps, x, y + e, z) - field(ps, x, y - e, z), gz = field(ps, x, y, z + e) - field(ps, x, y, z - e);
    const g = Math.hypot(gx, gy, gz) || 1; gx /= g; gy /= g; gz /= g;
    nor.set([gx, gy, gz], i * 3);
    let w = 0, f = 0; tmp.setRGB(0, 0, 0);
    ps.forEach((p, j) => { const d = dist(p, x, y, z); if (d > 0.06) return; const q = Math.exp(-Math.max(d, -0.02) * (7 / cell)); w += q; f += (p.f ?? 1) * q; tmp.r += cols[j].r * q; tmp.g += cols[j].g * q; tmp.b += cols[j].b * q; });
    if (w > 0) { tmp.multiplyScalar(1 / w); f /= w; }
    const nf = paint?.(x, y, z, tmp, f);
    if (typeof nf === 'number') f = nf;
    col.set([tmp.r, tmp.g, tmp.b], i * 3); fur[i] = f;
  }
  const G = new THREE.BufferGeometry();
  G.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); G.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  G.setAttribute('color', new THREE.BufferAttribute(col, 3)); G.setAttribute('fur', new THREE.BufferAttribute(fur, 1)); G.setIndex(idx);
  G.computeBoundingSphere(); G.computeBoundingBox();
  return G;
}
export const furTime = { value: 0 };
const baseMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
export const skinMat = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.62, sheen: 0.4, sheenRoughness: 0.6, sheenColor: new THREE.Color('#ffd9d0') });
export const MAX_SHELLS = 18;
const shellMats = new Map<string, THREE.MeshStandardMaterial>();
/** Pelaje por capas: cada capa se desplaza por la normal y descarta lo que no es un pelo. */
function shellMat(len: number, den: number, comb: number, dir: V) {
  const key = `${len}-${den}-${comb}-${dir}`;
  let m = shellMats.get(key);
  if (m) return m;
  m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0 });
  m.onBeforeCompile = (s) => {
    Object.assign(s.uniforms, { uLen: { value: len }, uDen: { value: den }, uComb: { value: comb }, uDir: { value: new THREE.Vector3(...dir) }, uTime: furTime });
    s.vertexShader = s.vertexShader.replace('#include <common>', `#include <common>
      attribute float fur; uniform float uLen,uComb,uTime; uniform vec3 uDir; varying float vH,vF; varying vec3 vP;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      vH=float(gl_InstanceID+1)/${MAX_SHELLS}.0; vP=position; vF=fur;
      vec3 sway=vec3(sin(uTime*1.7+position.y*18.),0.,cos(uTime*1.3+position.x*14.))*.06;
      transformed+=(normalize(normal)+(uDir*uComb+sway)*vH)*fur*uLen*vH;`);
    s.fragmentShader = s.fragmentShader.replace('#include <common>', `#include <common>
      varying float vH,vF; varying vec3 vP; uniform float uDen;
      float h31(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
      { vec3 q=vP*uDen; vec3 id=floor(q); float r=h31(id); float d=length(fract(q)-.5);
        if(vF<.03||r<vH*.92||d>.78*(1.-vH*.62)) discard;
        diffuseColor.rgb*=mix(.62,1.12,vH)*(.88+.24*h31(id+7.)); }`);
  };
  m.customProgramCacheKey = () => 'fur';
  shellMats.set(key, m);
  return m;
}
export interface FurOpt { len: number; den: number; comb?: number; smooth?: boolean; dir?: V }
export function furMesh(g: THREE.BufferGeometry, o: FurOpt): THREE.Group {
  const G = new THREE.Group(), base = new THREE.Mesh(g, o.smooth ? skinMat : baseMat);
  base.castShadow = true; base.receiveShadow = true; G.add(base);
  if (o.len > 0) {
    const ig = new THREE.InstancedBufferGeometry();
    ig.index = g.index; for (const k of ['position', 'normal', 'color', 'fur']) ig.setAttribute(k, g.getAttribute(k));
    ig.instanceCount = MAX_SHELLS; ig.boundingSphere = g.boundingSphere;
    const s = new THREE.Mesh(ig, shellMat(o.len, o.den, o.comb ?? 0.5, o.dir ?? [0, -1, -0.35]));
    s.raycast = () => {}; G.add(s);
  }
  return G;
}
export function setShells(root: THREE.Object3D, n: number) {
  root.traverse((x) => { const g = (x as THREE.Mesh).geometry; if (g instanceof THREE.InstancedBufferGeometry) { x.visible = n > 0; g.instanceCount = Math.max(1, n); } });
}
const eyeTex = new Map<string, THREE.CanvasTexture>();
export function eyeTexture(iris: string, pupil: 'round' | 'slit' | 'full', white = false) {
  const k = iris + pupil + white;
  let t = eyeTex.get(k);
  if (t) return t;
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = white ? '#f4ece8' : '#160f0c'; g.fillRect(0, 0, 512, 256);
  const cx = 128, cy = 128, A = white ? 0.72 : 1.25, rx = (A / (2 * Math.PI)) * 512, ry = (A / Math.PI) * 256;
  const el = (f: number, s: string | CanvasGradient, sx = 1) => { g.fillStyle = s; g.beginPath(); g.ellipse(cx, cy, rx * f * sx, ry * f, 0, 0, 7); g.fill(); };
  if (pupil !== 'full') {
    el(1.06, '#1d1410');
    const gr = g.createRadialGradient(cx, cy, 2, cx, cy, ry); gr.addColorStop(0, iris); gr.addColorStop(0.7, iris); gr.addColorStop(1, '#2a1c12'); el(1, gr);
    g.globalAlpha = 0.25; g.strokeStyle = '#fff'; for (let i = 0; i < 44; i++) { const a = (i / 44) * 6.283; g.beginPath(); g.moveTo(cx + Math.cos(a) * rx * 0.35, cy + Math.sin(a) * ry * 0.35); g.lineTo(cx + Math.cos(a) * rx * 0.85, cy + Math.sin(a) * ry * 0.85); g.stroke(); }
    g.globalAlpha = 1; el(pupil === 'slit' ? 0.85 : 0.48, '#070504', pupil === 'slit' ? 0.34 : 1);
  }
  g.fillStyle = '#fff'; g.beginPath(); g.ellipse(cx - rx * 0.28, cy - ry * 0.34, rx * 0.16, ry * 0.18, 0, 0, 7); g.fill();
  t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; eyeTex.set(k, t);
  return t;
}
export function eye(r: number, iris: string, pupil: 'round' | 'slit' | 'full', white = false) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 18), new THREE.MeshPhysicalMaterial({ map: eyeTexture(iris, pupil, white), roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 }));
  m.raycast = () => {};
  return m;
}
