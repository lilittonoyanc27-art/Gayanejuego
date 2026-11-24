import * as THREE from 'three';
import { NPCS } from '../data/npcs';
import { cap, ell, furMesh, mesh, mirror, setShells, type Paint, type Prim } from './sdf';
export interface Person { group: THREE.Group; update: (t: number, mood: 'idle' | 'walk' | 'talk') => void; detail: (n: number) => void }
const cache = new Map<string, Record<string, THREE.BufferGeometry>>();
/** Calcomanía proyectada de frente: permite detalle de textura sobre la malla suave. */
function decal(g: THREE.BufferGeometry, off: number, keep: (x: number, y: number, z: number, nz: number, f: number) => boolean, uv: (x: number, y: number) => [number, number]) {
  const p = g.attributes.position, n = g.attributes.normal, f = g.attributes.fur, ix = g.index!, pos: number[] = [], nor: number[] = [], uvs: number[] = [], out: number[] = [], map = new Map<number, number>();
  const ok = (i: number) => keep(p.getX(i), p.getY(i), p.getZ(i), n.getZ(i), f.getX(i));
  for (let t = 0; t < ix.count; t += 3) {
    const v = [ix.getX(t), ix.getX(t + 1), ix.getX(t + 2)];
    if (!v.every(ok)) continue;
    for (const i of v) { let k = map.get(i); if (k === undefined) { k = pos.length / 3; map.set(i, k); pos.push(p.getX(i) + n.getX(i) * off, p.getY(i) + n.getY(i) * off, p.getZ(i) + n.getZ(i) * off); nor.push(n.getX(i), n.getY(i), n.getZ(i)); uvs.push(...uv(p.getX(i), p.getY(i))); } out.push(k); }
  }
  const G = new THREE.BufferGeometry(); G.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); G.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); G.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); G.setIndex(out);
  return G;
}
const texs = new Map<string, THREE.CanvasTexture>();
function tx(key: string, w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) { let t = texs.get(key); if (!t) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!); t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; texs.set(key, t); } return t; }
/** Rostro pintado: 1 m = 6400 px en x; y hacia arriba. */
function faceTex(id: string, shut: boolean) {
  const n = NPCS[id] ?? NPCS.lucia, m = !!n.male, teen = !!n.teen;
  return tx('f' + id + shut, 1024, 1280, (g) => {
    const X = (x: number) => (x + 0.08) * 6400, Y = (y: number) => (0.1 - y) * 6400, iris = id === 'gayane' ? '#70451f' : ['#6b4325', '#4d7a63', '#5d82a8', '#7a5230'][id.length % 4], up = teen ? 0.0032 : 0, skin = new THREE.Color(n.skin), mix = (c: string, k: number) => skin.clone().lerp(new THREE.Color(c), k).getStyle();
    const soft = (x: number, y: number, r: number, c: string, a: number, sy = 1) => { g.save(); g.translate(X(x), Y(y)); g.scale(1, sy); const q = g.createRadialGradient(0, 0, 0, 0, 0, r * 6400); q.addColorStop(0, c); q.addColorStop(1, c + '00'); g.globalAlpha = a; g.fillStyle = q; g.beginPath(); g.arc(0, 0, r * 6400, 0, 7); g.fill(); g.restore(); };
    for (const s of [1, -1]) { soft(s * 0.042, -0.026, 0.024, m ? '#c9705f' : '#e0717a', m ? 0.16 : 0.3); soft(s * 0.029, 0.016, 0.026, '#6b3f33', m ? 0.24 : teen ? 0.1 : 0.3, 0.62); soft(s * 0.013, 0.0, 0.012, '#7a4637', teen ? 0.08 : 0.22, 1.7); soft(s * 0.0065, -0.0315, 0.0048, '#4a241c', 0.75, 0.6); soft(s * 0.0125, -0.026, 0.006, '#7a4637', 0.4); }
    soft(0, -0.037, 0.014, '#7a4637', 0.22, 0.5); soft(0, -0.076, 0.016, '#7a4637', 0.22, 0.4); soft(0, 0.0, 0.007, '#fff4e8', 0.3, 3);
    for (const s of [1, -1]) {
      const ex = s * 0.0298, ey = 0.0125, w = teen ? 0.0152 : 0.0142, h = m ? 0.0056 : teen ? 0.0084 : 0.0068;
      const path = (hh: number) => { g.beginPath(); g.moveTo(X(ex - s * w), Y(ey - 0.0015)); g.bezierCurveTo(X(ex - s * w * 0.5), Y(ey + hh * 1.45), X(ex + s * w * 0.45), Y(ey + hh * 1.5), X(ex + s * w), Y(ey + 0.0016)); };
      const eyeShape = () => { path(h); g.bezierCurveTo(X(ex + s * w * 0.5), Y(ey - h * 1.0), X(ex - s * w * 0.5), Y(ey - h * 1.05), X(ex - s * w), Y(ey - 0.0015)); g.closePath(); };
      if (shut) { path(-h * 0.7); g.lineWidth = 13; g.strokeStyle = '#2a1712'; g.lineCap = 'round'; g.stroke(); }
      else {
        g.save(); eyeShape(); g.clip(); g.fillStyle = '#f8f2ee'; g.fillRect(X(ex) - 130, Y(ey) - 90, 260, 180);
        const ix = X(ex), iy = Y(ey + 0.0008), R = teen ? 46 : 41; let q = g.createRadialGradient(ix, iy, 5, ix, iy, R); q.addColorStop(0, iris); q.addColorStop(0.75, iris); q.addColorStop(1, '#20130c'); g.fillStyle = q; g.beginPath(); g.arc(ix, iy, R, 0, 7); g.fill();
        g.strokeStyle = 'rgba(255,235,200,.3)'; g.lineWidth = 2; for (let i = 0; i < 26; i++) { const a = i * 0.2417; g.beginPath(); g.moveTo(ix + Math.cos(a) * 18, iy + Math.sin(a) * 18); g.lineTo(ix + Math.cos(a) * 33, iy + Math.sin(a) * 33); g.stroke(); }
        g.fillStyle = '#0a0605'; g.beginPath(); g.arc(ix, iy, 18, 0, 7); g.fill(); q = g.createLinearGradient(0, Y(ey + h), 0, Y(ey)); q.addColorStop(0, 'rgba(40,15,10,.55)'); q.addColorStop(1, 'rgba(40,15,10,0)'); g.fillStyle = q; g.fillRect(ix - 130, Y(ey + h * 1.4), 260, 60);
        g.fillStyle = '#fff'; g.beginPath(); g.arc(ix - 13, iy - 14, 9, 0, 7); g.fill(); g.globalAlpha = 0.6; g.beginPath(); g.arc(ix + 14, iy + 13, 5, 0, 7); g.fill(); g.restore();
        path(h); g.lineWidth = m ? 8 : teen ? 8 : 12; g.strokeStyle = '#2a1712'; g.lineCap = 'round'; g.stroke();
        if (!m) { g.lineWidth = teen ? 3 : 5; for (let i = 0; i < 9; i++) { const k = i / 8, lx = ex + s * w * (-0.55 + k * 1.55), ly = ey + h * (1.02 - Math.pow(k - 0.42, 2) * 2.7); g.beginPath(); g.moveTo(X(lx), Y(ly)); g.quadraticCurveTo(X(lx + s * 0.0006), Y(ly + 0.002), X(lx + s * (0.0005 + k * 0.0026)), Y(ly + 0.0033)); g.stroke(); } }
        path(h * 1.75); g.lineWidth = 5; g.strokeStyle = 'rgba(90,45,32,.45)'; g.stroke(); g.globalAlpha = 0.35; g.beginPath(); g.moveTo(X(ex - s * w), Y(ey - 0.002)); g.quadraticCurveTo(X(ex), Y(ey - h * 1.5), X(ex + s * w), Y(ey)); g.lineWidth = 4; g.stroke(); g.globalAlpha = 1;
      }
      const bh = new THREE.Color(n.hair).lerp(new THREE.Color('#2a1a14'), 0.25).getStyle(); g.strokeStyle = bh; g.lineCap = 'round';
      for (let i = 0; i < 46; i++) { const k = i / 45, bx = s * (0.0125 + k * 0.034), by = 0.0325 + Math.sin(k * 2.1) * 0.0052 - k * 0.0015, th = (m ? 0.0046 : 0.0032) * (1 - k * 0.65); g.globalAlpha = 0.75; g.lineWidth = 4; g.beginPath(); g.moveTo(X(bx), Y(by - th * 0.5)); g.lineTo(X(bx + s * (0.0015 + k * 0.003)), Y(by + th * 0.6 - k * 0.001)); g.stroke(); } g.globalAlpha = 1;
    }
    const lip = mix(m ? '#a8584f' : teen ? '#d9727c' : '#c8465c', m ? 0.5 : teen ? 0.55 : 0.75), W = m ? 0.0225 : teen ? 0.0185 : 0.021, ly = -0.0595;
    g.fillStyle = lip; g.beginPath(); g.moveTo(X(-W), Y(ly + up)); g.bezierCurveTo(X(-W * 0.55), Y(ly + 0.005), X(-0.006), Y(ly + (m ? 0.0055 : 0.0075)), X(0), Y(ly + (m ? 0.004 : 0.0055))); g.bezierCurveTo(X(0.006), Y(ly + (m ? 0.0055 : 0.0075)), X(W * 0.55), Y(ly + 0.005), X(W), Y(ly + up)); g.bezierCurveTo(X(W * 0.5), Y(ly - (m ? 0.0085 : 0.0105)), X(-W * 0.5), Y(ly - (m ? 0.0085 : 0.0105)), X(-W), Y(ly + up)); g.fill();
    g.strokeStyle = 'rgba(70,20,22,.7)'; g.lineWidth = 5; g.beginPath(); g.moveTo(X(-W * 1.08), Y(ly + 0.0016 + up * 1.2)); g.bezierCurveTo(X(-W * 0.4), Y(ly - 0.0016 - up * 0.5), X(W * 0.4), Y(ly - 0.0016 - up * 0.5), X(W * 1.08), Y(ly + 0.0016 + up * 1.2)); g.stroke(); soft(0, ly - 0.0042, 0.008, '#ffffff', 0.32, 0.35);
    if (n.beard) { g.strokeStyle = n.hair; g.lineWidth = 3.5; for (let i = 0; i < 2600; i++) { const a = (i * 0.618) % 1, b = (i * 0.377) % 1, bx = (a - 0.5) * 0.13, by = -0.1 + b * 0.085, e = Math.abs(bx); if (by > -0.062 + Math.max(0, e - 0.02) * 1.3 && !(by > -0.053 && by < -0.043 && e < 0.024)) continue; if (Math.abs(bx) < W * 1.05 && Math.abs(by - ly + 0.002) < 0.0085) continue; g.globalAlpha = 0.55; g.beginPath(); g.moveTo(X(bx), Y(by)); g.lineTo(X(bx + (bx > 0 ? 0.0012 : -0.0012)), Y(by - 0.0042)); g.stroke(); } }
  });
}
/** Delantal o detalles de la ropa. */
function clothTex(id: string) {
  const n = NPCS[id] ?? NPCS.lucia;
  return tx('c' + id, 512, 1100, (g) => {
    const X = (x: number) => ((x + 0.22) / 0.44) * 512, Y = (y: number) => (1 - (y - 0.5) / 0.95) * 1100, rr = (x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(X(x), Y(y), (w / 0.44) * 512, (h / 0.95) * 1100, r); };
    if (n.apron) {
      g.fillStyle = n.apron; g.shadowColor = 'rgba(40,10,30,.45)'; g.shadowBlur = 10; g.beginPath(); g.moveTo(X(-0.085), Y(1.27)); g.lineTo(X(0.085), Y(1.27)); g.quadraticCurveTo(X(0.1), Y(1.08), X(0.155), Y(1.03)); g.lineTo(X(0.158), Y(0.66)); g.quadraticCurveTo(X(0.15), Y(0.62), X(0.11), Y(0.62)); g.lineTo(X(-0.11), Y(0.62)); g.quadraticCurveTo(X(-0.15), Y(0.62), X(-0.158), Y(0.66)); g.lineTo(X(-0.155), Y(1.03)); g.quadraticCurveTo(X(-0.1), Y(1.08), X(-0.085), Y(1.27)); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = n.apron; g.lineWidth = 19; for (const s of [1, -1]) { g.beginPath(); g.moveTo(X(s * 0.075), Y(1.26)); g.lineTo(X(s * 0.066), Y(1.44)); g.stroke(); }
      g.strokeStyle = 'rgba(60,20,50,.28)'; g.lineWidth = 3; rr(-0.09, 0.93, 0.18, 0.13, 14); g.stroke(); g.setLineDash([7, 5]); g.strokeStyle = 'rgba(255,255,255,.55)'; rr(-0.084, 0.924, 0.168, 0.118, 12); g.stroke(); g.setLineDash([]);
      g.fillStyle = 'rgba(40,10,40,.14)'; g.fillRect(X(-0.155), Y(1.035), (0.31 / 0.44) * 512, 12);
      g.fillStyle = '#fff6f2'; const px = X(0), py = Y(1.17); g.beginPath(); g.ellipse(px, py + 8, 17, 14, 0, 0, 7); g.fill(); for (const [a, b] of [[-19, -6], [-8, -19], [8, -19], [19, -6]]) { g.beginPath(); g.ellipse(px + a, py + b, 6, 9, 0, 0, 7); g.fill(); }
      g.fillStyle = '#fffaf7'; rr(0.03, 1.245, 0.048, 0.024, 4); g.fill(); g.fillStyle = '#5a3a52'; g.font = '600 15px Georgia'; g.textAlign = 'center'; g.fillText(n.name.split(' ').pop()!, X(0.054), Y(1.228));
    } else if (n.teen) {
      g.strokeStyle = 'rgba(80,25,55,.28)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X(-0.1), Y(0.9)); g.lineTo(X(-0.072), Y(1.03)); g.lineTo(X(0.072), Y(1.03)); g.lineTo(X(0.1), Y(0.9)); g.stroke();
      g.fillStyle = 'rgba(80,25,55,.12)'; g.fillRect(X(-0.18), Y(0.835), X(0.18) - X(-0.18), 10);
      g.strokeStyle = '#fff8f5'; g.lineWidth = 5; g.lineCap = 'round'; for (const s of [1, -1]) { g.beginPath(); g.moveTo(X(s * 0.032), Y(1.375)); g.quadraticCurveTo(X(s * 0.04), Y(1.32), X(s * 0.03), Y(1.27)); g.stroke(); }
      g.fillStyle = '#fff8f5'; const px = X(0), py = Y(1.17); g.beginPath(); g.ellipse(px, py + 14, 28, 23, 0, 0, 7); g.fill(); for (const [a, b] of [[-32, -8], [-13, -31], [13, -31], [32, -8]]) { g.beginPath(); g.ellipse(px + a, py + b, 10, 14, 0, 0, 7); g.fill(); }
    } else {
      g.strokeStyle = 'rgba(60,20,40,.18)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X(0), Y(1.4)); g.lineTo(X(0), Y(0.98)); if (n.male) { g.stroke(); g.fillStyle = 'rgba(255,255,255,.85)'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(X(0), Y(1.34 - i * 0.075), 5.5, 0, 7); g.fill(); } }
      else { g.strokeStyle = '#dcb765'; g.lineWidth = 3; g.beginPath(); g.moveTo(X(-0.052), Y(1.425)); g.quadraticCurveTo(X(0), Y(1.29), X(0.052), Y(1.425)); g.stroke(); g.fillStyle = '#e0718f'; g.beginPath(); g.arc(X(0), Y(1.355), 8, 0, 7); g.fill(); }
      g.strokeStyle = 'rgba(40,20,50,.25)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X(-0.13), Y(0.93)); g.quadraticCurveTo(X(-0.07), Y(0.89), X(-0.06), Y(0.95)); g.moveTo(X(0.13), Y(0.93)); g.quadraticCurveTo(X(0.07), Y(0.89), X(0.06), Y(0.95)); g.stroke();
    }
  });
}
export function buildPerson(id: string): Person {
  const n = NPCS[id] ?? NPCS.lucia, m = !!n.male, teen = !!n.teen, sh = m ? 1.12 : teen ? 0.88 : 1;
  let g = cache.get(id);
  if (!g) {
    const { skin, hair, top, bottom } = n, shoe = '#efe6e4', sole = '#b9a7b3';
    const sk = new THREE.Color(skin), tp = new THREE.Color(top);
    const bodyPaint: Paint = (x, y, z, c) => { if (y > 1.3 && Math.abs(x) < 0.1) c.copy(y - z * 0.45 > 1.412 ? sk : tp); c.multiplyScalar(1 + Math.sin(y * 85 + Math.sin(x * 40) * 2) * Math.sin(x * 60) * 0.025); if (teen && y > 0.855 && y < 1.3) c.copy(tp); else if (Math.abs(y - 0.965) < 0.008) c.multiplyScalar(0.86); };
    const body: Prim[] = [
      ...mirror([cap([0.085, 0.9, 0], [0.09, 0.5, 0.012], 0.098, 0.066, bottom, 0, 0.03), cap([0.09, 0.5, 0.012], [0.092, 0.11, -0.005], 0.064, 0.046, bottom, 0, 0.03), ell([0.094, 0.045, 0.035], [0.044, 0.04, 0.105], shoe, 0, 0.02), ell([0.094, 0.014, 0.035], [0.048, 0.016, 0.112], sole, 0, 0.008)]),
      ell([0, 0.93, -0.004], [0.16 * (m ? 0.95 : teen ? 0.86 : 1), 0.11, teen ? 0.098 : 0.112], bottom, 0, 0.06),
      // Sudadera recta y holgada para las adolescentes.
      ...(teen ? [cap([0, 0.935, 0], [0, 1.12, 0], 0.15, 0.14, top, 0, 0.03), ell([0, 1.22, 0], [0.145, 0.2, 0.112], top, 0, 0.06), ...mirror([cap([0.03, 1.415, -0.05], [0.075, 1.4, 0.0], 0.03, 0.026, top, 0, 0.03)])] : [cap([0, 0.99, 0], [0, 1.1, 0], 0.122 * sh, 0.118 * sh, top, 0, 0.05), ell([0, 1.24, 0.0], [0.152 * sh, 0.19, 0.108], top, 0, 0.06)]),
      ...(m || teen ? [] : mirror([ell([0.062, 1.24, 0.072], [0.06, 0.062, 0.05], top, 0, 0.05)])),
      ...mirror([cap([0.05, 1.405, -0.012], [0.16 * sh, 1.365, -0.01], 0.046, 0.054, top, 0, 0.05)]), cap([0, 1.4, -0.01], [0, 1.5, 0.004], (0.052 * sh), 0.046 * sh, skin, 0, 0.02),
    ];
    const arm: Prim[] = [cap([0, 0, 0], [0.028, -0.17, -0.005], 0.052 * sh, 0.046 * sh, top, 0, 0.02), cap([0.028, -0.17, -0.005], [0.036, -0.27, 0.0], 0.044 * sh, 0.037 * sh, top, 0, 0.02), cap([0.036, -0.27, 0], [0.042, -0.48, 0.04], teen ? 0.041 : 0.035 * sh, teen ? 0.034 : 0.026 * sh, teen ? top : skin, 0, 0.02), ell([0.044, -0.53, 0.05], [0.02, 0.046, 0.034], skin, 0, 0.02), ...[0, 1, 2, 3].map((i) => cap([0.045, -0.56, 0.024 + i * 0.018], [0.04, -0.615 - (i % 3 ? 0.012 : 0), 0.026 + i * 0.018], 0.0095, 0.0078, skin, 0, 0.008)), cap([0.04, -0.51, 0.075], [0.03, -0.56, 0.097], 0.011, 0.008, skin, 0, 0.012)];
    const H: Prim[] = [
      ell([0, 0.015, -0.004], [0.07, 0.093, 0.088], skin, 0, 0.02), ell([0, -0.04, 0.026], [m ? 0.056 : teen ? 0.054 : 0.05, teen ? 0.049 : 0.054, 0.054], skin, 0, 0.045), ell([0, -0.083, 0.052], [m ? 0.026 : 0.018, 0.015, 0.018], skin, 0, 0.035), cap([0, -0.11, -0.022], [0, -0.04, -0.012], 0.045, 0.047, skin, 0, 0.03),
      cap([0, 0.012, 0.083], [0, -0.021, 0.0985], teen ? 0.006 : 0.0075, teen ? 0.0088 : 0.0108, skin, 0, 0.016), ...mirror([ell([0.0095, -0.026, 0.089], [0.0082, 0.0065, 0.0085], skin, 0, 0.009), ell([0.04, teen ? -0.024 : -0.016, 0.056], [0.024, 0.026, 0.02], skin, 0, 0.035), ell([0.03, 0.034, 0.072], [0.024, 0.008, 0.012], skin, 0, 0.02), ell([0.0725, -0.006, -0.008], [0.009, 0.023, 0.014], skin, 0, 0.01)]),
      ell([0, -0.0555, 0.076], [0.022, 0.0065, 0.0095], skin, 0, 0.012), ell([0, -0.0655, 0.0755], [0.018, 0.0068, 0.0095], skin, 0, 0.012),
    ];
    const short = n.style === 'corto';
    H.push({ a: [0, 0.032, -0.014], s: [0.083, 0.1, 0.101], c: hair, f: 1, k: 0.006, cut: (x, y, z) => Math.max(z - (y - 0.05) * 1.7 - Math.abs(x) * 0.22 - 0.012, short ? -0.03 - y - z * 0.4 : -1) });
    if (!short) H.push({ a: [0.0, 0.052, 0.018], s: [0.08, 0.062, 0.075], c: hair, f: 1, k: 0.01, cut: (x, y, z) => Math.max(0.062 - y - Math.abs(x - 0.012) * 0.05 + Math.max(0, 0.034 - Math.abs(x - 0.012)) * 0.55 - Math.max(0, Math.abs(x) - 0.052) * 2.2, z - 0.082) }, ell([0, -0.005, -0.05], [0.066, 0.078, 0.05], hair, 1, 0.02));
    else H.push(cap([-0.045, 0.1, 0.032], [0.05, 0.108, 0.03], 0.03, 0.026, hair, 1, 0.03));
    if (n.style === 'largo') H.push(...mirror([cap([0.058, 0.03, -0.035], [0.076, -0.15, -0.035], 0.036, 0.045, hair, 1, 0.03), cap([0.076, -0.15, -0.035], [0.07, -0.3, -0.03], 0.046, 0.02, hair, 1, 0.03), cap([0.07, 0.06, 0.015], [0.083, -0.09, 0.012], 0.013, 0.022, hair, 1, 0.02), cap([0.083, -0.09, 0.012], [0.085, -0.25, 0.03], 0.022, 0.016, hair, 1, 0.02)]), cap([0, 0, -0.07], [0, -0.28, -0.085], 0.052, 0.04, hair, 1, 0.03));
    if (n.style === 'coleta') H.push(cap([0, 0.06, -0.1], [0, 0.02, -0.15], 0.026, 0.036, hair, 1, 0.02), cap([0, 0.02, -0.15], [0, -0.18, -0.13], 0.038, 0.013, hair, 1, 0.02), ...mirror([cap([0.072, 0.045, 0.012], [0.076, -0.04, 0.02], 0.008, 0.005, hair, 0.8, 0.01)]));
    if (n.style === 'mono') H.push(ell([0, 0.1, -0.088], [0.045, 0.042, 0.04], hair, 0.8, 0.012), ...mirror([cap([0.072, 0.045, 0.012], [0.075, -0.02, 0.018], 0.007, 0.004, hair, 0.8, 0.01)]));
    const headPaint: Paint = (_x, _y, _z, _c, f) => (f > 0.55 ? f : 0);
    g = { body: mesh(body, 0.0135, bodyPaint), arm: mesh(arm, 0.0082), head: mesh(H, 0.0052, headPaint) };
    g.face = decal(g.head, 0.0012, (x, y, z, nz, f) => z > 0.018 && nz > 0.12 && f < 0.2 && y > -0.1, (x, y) => [(x + 0.08) / 0.16, (y + 0.1) / 0.2]);
    g.front = decal(g.body, 0.005, (x, y, z, nz) => z > -0.02 && nz > 0.02 && y > 0.5 && y < 1.44, (x, y) => [(x + 0.22) / 0.44, (y - 0.5) / 0.95]);
    cache.set(id, g);
  }
  const G = new THREE.Group(), torso = new THREE.Group(), mk = (k: string, len = 0) => furMesh(g![k], { len, den: 760, comb: 1.5, smooth: true, dir: [0, -0.75, -0.8] });
  const body = mk('body'), head = mk('head', 0.0085), L = new THREE.Group(), R = new THREE.Group();
  L.add(mk('arm')); R.add(mk('arm')); R.children[0].scale.x = -1;
  L.position.set(0.185 * sh, 1.365, -0.01); R.position.set(-0.185 * sh, 1.365, -0.01);
  head.position.set(0, 1.585, 0.01); if (teen) head.scale.setScalar(1.09);
  const fm = new THREE.MeshPhysicalMaterial({ map: faceTex(id, false), transparent: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2 });
  const face = new THREE.Mesh(g.face, fm); face.raycast = () => {}; face.renderOrder = 1; head.add(face);
  const front = new THREE.Mesh(g.front, new THREE.MeshStandardMaterial({ map: clothTex(id), transparent: true, roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -2 })); front.raycast = () => {}; front.receiveShadow = true; body.add(front);
  const open = faceTex(id, false), shut = faceTex(id, true);
  torso.add(body, L, R, head); G.add(torso);
  G.scale.setScalar(m ? 1.05 : teen ? 0.92 : 1);
  const ph = Math.random() * 9;
  return { group: G, detail: (k) => setShells(G, k), update: (t, mood) => {
    const w = mood === 'walk', s = t * 7 + ph;
    torso.position.y = w ? Math.abs(Math.sin(s)) * 0.018 : Math.sin(t * 1.6 + ph) * 0.003; torso.rotation.z = w ? Math.sin(s) * 0.018 : 0; torso.rotation.y = w ? Math.sin(s) * 0.06 : Math.sin(t * 0.5 + ph) * 0.03;
    L.rotation.x = w ? Math.sin(s) * 0.45 : mood === 'talk' ? -0.55 + Math.sin(t * 3) * 0.16 : Math.sin(t * 1.2 + ph) * 0.04; R.rotation.x = w ? -Math.sin(s) * 0.45 : mood === 'talk' ? -0.35 + Math.sin(t * 2.3 + 1) * 0.12 : -Math.sin(t * 1.2 + ph) * 0.04;
    L.rotation.z = 0.06; R.rotation.z = -0.06;
    head.rotation.y = Math.sin(t * 0.7 + ph) * (mood === 'talk' ? 0.1 : 0.22); head.rotation.x = mood === 'talk' ? Math.sin(t * 4.1) * 0.05 : Math.sin(t * 0.9 + ph) * 0.03;
    const want = (t + ph) % 3.9 < 0.13 ? shut : open; if (fm.map !== want) fm.map = want;
  } };
}
