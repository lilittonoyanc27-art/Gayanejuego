import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { es } from '../core/bi';
import { P, type Product } from '../data/products';
export interface Good { body: THREE.BufferGeometry; label?: THREE.BufferGeometry; map?: THREE.Texture; w: number; h: number }
export const goodMat = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.42, clearcoat: 0.25, clearcoatRoughness: 0.4 });
export const glassMat = new THREE.MeshPhysicalMaterial({ color: '#dff2f6', transparent: true, opacity: 0.22, roughness: 0.05, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false });
const cache = new Map<string, Good>();
type Xf = (g: THREE.BufferGeometry) => void;
export function paint(g: THREE.BufferGeometry, color: string, x?: Xf) {
  let q = g.index ? g.toNonIndexed() : g; x?.(q);
  if (!q.attributes.normal) q.computeVertexNormals();
  const c = new THREE.Color(color), n = q.attributes.position.count, a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) a.set([c.r, c.g, c.b], i * 3);
  q.setAttribute('color', new THREE.BufferAttribute(a, 3));
  for (const k of Object.keys(q.attributes)) if (!['position', 'normal', 'color'].includes(k)) q.deleteAttribute(k);
  return (q = q);
}
export const merge = (gs: THREE.BufferGeometry[]) => mergeGeometries(gs, false)!;
const at = (x: number, y: number, z: number, rx = 0, ry = 0, rz = 0): Xf => (g) => { g.rotateX(rx); g.rotateY(ry); g.rotateZ(rz); g.translate(x, y, z); };
const ICON: Record<string, string> = { perro: '🐶', gato: '🐱', conejo: '🐰', hamster: '🐹', pajaro: '🐦', pez: '🐠' };
function labelTex(p: Product, w: number, h: number) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, p.c2); gr.addColorStop(1, '#ffffff'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = p.c; g.beginPath(); g.moveTo(0, 0); g.lineTo(w, 0); g.lineTo(w, h * 0.16); g.quadraticCurveTo(w / 2, h * 0.28, 0, h * 0.16); g.fill();
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = `600 ${h * 0.075}px Georgia`; g.fillText('MUNDO ANIMAL', w / 2, h * 0.12);
  g.font = `${h * 0.3}px serif`; g.fillText(p.tags.map((t) => ICON[t]).find(Boolean) ?? '🐾', w / 2, h * 0.56);
  const words = es(p.name).replace(/«|»/g, '').split(' '), lines: string[] = []; let l = '';
  words.forEach((x) => { if ((l + ' ' + x).length > 15) { lines.push(l); l = x; } else l = l ? l + ' ' + x : x; }); lines.push(l);
  g.fillStyle = '#3d2b3a'; const fs = Math.min(h * 0.088, (w / 15) * 1.75); g.font = `700 ${fs}px Georgia`; lines.slice(0, 3).forEach((x, i) => g.fillText(x, w / 2, h * 0.7 + i * fs * 1.1));
  g.fillStyle = p.c; g.fillRect(0, h * 0.965, w, h * 0.035);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
export function good(id: string): Good {
  const hit = cache.get(id); if (hit) return hit;
  const p = P[id], { c, c2 } = p, dark = new THREE.Color(c).multiplyScalar(0.7).getStyle();
  let r: Good;
  const cyl = (a: number, b: number, h: number, s = 28) => new THREE.CylinderGeometry(a, b, h, s), box = (x: number, y: number, z: number) => new THREE.BoxGeometry(x, y, z), tor = (R: number, t: number, arc = 6.2832) => new THREE.TorusGeometry(R, t, 12, 40, arc);
  const pillow = (w: number, h: number, d: number, off = 0) => (g: THREE.BufferGeometry) => { const a = g.attributes.position; for (let i = 0; i < a.count; i++) { const x = a.getX(i), y = a.getY(i), u = x / (w / 2), v = y / (h / 2); a.setZ(i, (off ? d / 2 : a.getZ(i)) * (0.12 + 0.88 * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(v), 5)))) * (0.55 + 0.45 * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(u), 4)))) + off); a.setX(i, x * (1 - 0.04 * Math.cos(v * 2.5))); } g.translate(0, h / 2, 0); g.computeVertexNormals(); };
  switch (p.shape) {
    case 'bolsa': { const w = 0.24, h = 0.33, d = 0.11; r = { body: merge([paint(new THREE.BoxGeometry(w, h, d, 12, 16, 4), c, pillow(w, h, d)), paint(box(w * 0.97, 0.018, 0.02), dark, at(0, h - 0.008, 0))]), label: new THREE.PlaneGeometry(w * 0.82, h * 0.8, 10, 12), w, h }; pillow(w, h, d, 0.003)(r.label!); r.label!.translate(0, 0, 0); break; }
    case 'lata': r = { body: merge([paint(cyl(0.046, 0.046, 0.1), '#cfd3d8', at(0, 0.05, 0)), paint(tor(0.044, 0.004), '#e6e9ec', at(0, 0.1, 0, 1.5708)), paint(tor(0.046, 0.004), '#b9bec5', at(0, 0.003, 0, 1.5708)), paint(tor(0.011, 0.002), '#eef', at(0, 0.103, 0.01, 1.5708))]), label: new THREE.CylinderGeometry(0.0468, 0.0468, 0.082, 32, 1, true, -1.2, 2.4).translate(0, 0.05, 0), w: 0.1, h: 0.1 }; break;
    case 'caja': r = { body: paint(box(0.17, 0.22, 0.08), c, at(0, 0.11, 0)), label: new THREE.PlaneGeometry(0.162, 0.21).translate(0, 0.11, 0.0412), w: 0.17, h: 0.22 }; break;
    case 'bote': r = { body: merge([paint(new THREE.LatheGeometry([[0, 0], [0.046, 0], [0.05, 0.008], [0.05, 0.15], [0.044, 0.168], [0.02, 0.18], [0.02, 0.19]].map(([a, b]) => new THREE.Vector2(a, b)), 32), c), paint(cyl(0.022, 0.024, 0.035), c2 === '#fff' ? dark : dark, at(0, 0.2, 0))]), label: new THREE.CylinderGeometry(0.0508, 0.0508, 0.125, 32, 1, true, -1.15, 2.3).translate(0, 0.08, 0), w: 0.1, h: 0.22 }; break;
    case 'pelota': r = { body: merge([paint(new THREE.SphereGeometry(0.06, 32, 24), c, at(0, 0.06, 0)), paint(tor(0.0592, 0.005), c2, at(0, 0.06, 0, 0.5)), paint(tor(0.0592, 0.005), c2, at(0, 0.06, 0, 2.1, 0.4))]), w: 0.14, h: 0.12 }; break;
    case 'hueso': r = { body: merge([paint(new THREE.CapsuleGeometry(0.02, 0.12, 6, 16), c, at(0, 0.035, 0, 0, 0, 1.5708)), ...[-1, 1].flatMap((s) => [-1, 1].map((q) => paint(new THREE.SphereGeometry(0.029, 18, 14), c, at(s * 0.075, 0.035 + q * 0.015, q * 0.016))))]), w: 0.2, h: 0.07 }; break;
    case 'raton': r = { body: merge([paint(new THREE.SphereGeometry(0.045, 24, 18), c, (g) => { g.scale(1, 0.8, 1.5); g.translate(0, 0.036, 0); }), ...[-1, 1].flatMap((s) => [paint(new THREE.SphereGeometry(0.02, 16, 10), c2, (g) => { g.scale(1, 1, 0.35); g.translate(s * 0.026, 0.072, 0.03); }), paint(new THREE.SphereGeometry(0.005, 8, 8), '#181013', at(s * 0.018, 0.05, 0.06))]), paint(new THREE.SphereGeometry(0.007, 10, 8), '#d9738e', at(0, 0.036, 0.069)), paint(new THREE.TorusGeometry(0.05, 0.004, 6, 24, 2.6), c2, at(0, 0.02, -0.1, 1.57))]), w: 0.12, h: 0.1 }; break;
    case 'collar': r = { body: merge([paint(cyl(0.066, 0.066, 0.026, 44), c, (g) => { g.deleteAttribute('uv'); at(0, 0.085, 0, 1.5708)(g); }), paint(cyl(0.058, 0.058, 0.0275, 44), '#2b2230', at(0, 0.085, 0, 1.5708)), paint(box(0.032, 0.02, 0.034), '#d7d9de', at(0, 0.152, 0)), paint(tor(0.011, 0.0025), '#e1c16e', at(0, 0.012, 0)), paint(cyl(0.015, 0.015, 0.003, 24), c2, at(0, -0.002, 0.004, 1.5708))]).translate(0, 0.018, 0), w: 0.15, h: 0.17 }; break;
    case 'correa': r = { body: merge([0, 1, 2].map((i) => paint(tor(0.062 - i * 0.012, 0.0065), c, at(0, 0.02 + i * 0.012, 0, 1.5708))).concat([paint(box(0.045, 0.1, 0.03), dark, at(0.075, 0.06, 0)), paint(new THREE.CapsuleGeometry(0.005, 0.05, 4, 8), '#d7d9de', at(-0.06, 0.07, 0.02, 0.4))])), w: 0.19, h: 0.12 }; break;
    case 'cama': r = { body: merge([paint(new THREE.TorusGeometry(0.17, 0.062, 18, 48), c, at(0, 0.062, 0, 1.5708)), paint(new THREE.SphereGeometry(0.17, 32, 16), c2, (g) => { g.scale(1, 0.25, 1); g.translate(0, 0.045, 0); })]), w: 0.46, h: 0.13 }; break;
    case 'cuenco': r = { body: merge([paint(new THREE.LatheGeometry([[0, 0.012], [0.052, 0.014], [0.07, 0.055], [0.078, 0.058], [0.084, 0], [0, 0]].map(([a, b]) => new THREE.Vector2(a, b)), 40), c), paint(cyl(0.0845, 0.0865, 0.01, 40), c2, at(0, 0.005, 0))]), w: 0.18, h: 0.06 }; break;
    case 'jaula': { const gs = [paint(box(0.42, 0.05, 0.28), c2, at(0, 0.025, 0)), paint(box(0.42, 0.012, 0.28), c, at(0, 0.36, 0))]; for (let i = 0; i <= 14; i++) for (const z of [-0.135, 0.135]) gs.push(paint(cyl(0.0022, 0.0022, 0.32, 5), c, at(-0.2 + i * 0.0286, 0.2, z))); for (let i = 0; i <= 9; i++) for (const x of [-0.2, 0.2]) gs.push(paint(cyl(0.0022, 0.0022, 0.32, 5), c, at(x, 0.2, -0.13 + i * 0.029))); gs.push(paint(tor(0.04, 0.004, 3.14), '#c9a6c9', at(0, 0.366, 0))); r = { body: merge(gs), w: 0.44, h: 0.41 }; break; }
    case 'acuario': { const k = p.price > 50 ? 1.3 : 1, W = 0.34 * k, H = 0.24 * k, D = 0.2 * k; r = { body: merge([paint(box(W, 0.018, D), '#3b4653', at(0, 0.009, 0)), paint(box(W, 0.03, D), '#3b4653', at(0, H, 0)), paint(box(W * 0.97, H * 0.75, D * 0.95), c, at(0, H * 0.42, 0)), paint(box(W * 0.98, 0.03, D * 0.96), '#d9c49a', at(0, 0.034, 0)), ...[-0.3, 0.1, 0.32].map((x) => paint(new THREE.ConeGeometry(0.02, H * 0.5, 8), '#5f9e6b', at(x * W, H * 0.3, D * 0.49)))]), w: W + 0.04, h: H + 0.02 }; break; }
    case 'cepillo': r = { body: merge([paint(new THREE.CapsuleGeometry(0.014, 0.1, 6, 14), c, at(0, 0.06, 0)), paint(new THREE.CapsuleGeometry(id === 'cd1' ? 0.012 : 0.032, 0.05, 6, 18), c, (g) => { g.scale(1, 1, 0.4); g.translate(0, 0.17, 0); }), ...Array.from({ length: 20 }, (_, i) => paint(cyl(0.0016, 0.0016, 0.022, 5), '#f5f0f2', at(((i % 4) - 1.5) * (id === 'cd1' ? 0.004 : 0.012), 0.14 + Math.floor(i / 4) * 0.015, 0.02, 1.5708)))]), w: 0.1, h: 0.23 }; break;
    case 'cuerda': r = { body: merge([0, 1].map((k) => { const pts = Array.from({ length: 30 }, (_, i) => new THREE.Vector3(-0.1 + i * 0.0069, 0.03 + Math.sin(i * 0.9 + k * 3.14) * 0.011, Math.cos(i * 0.9 + k * 3.14) * 0.011)); return paint(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.011, 8), k ? c : c2); }).concat([-1, 1].map((s) => paint(new THREE.SphereGeometry(0.03, 16, 12), c, at(s * 0.11, 0.03, 0))))), w: 0.27, h: 0.07 }; break;
    case 'planta': r = { body: merge([paint(cyl(0.04, 0.032, 0.05), c2, at(0, 0.025, 0)), ...Array.from({ length: 11 }, (_, i) => paint(new THREE.SphereGeometry(0.05, 10, 8), i % 2 ? c : '#79b783', (g) => { g.scale(0.22, 1.5 - (i % 3) * 0.25, 0.08); g.translate(0, 0.075, 0); g.rotateX(0.35 + (i % 3) * 0.12); g.rotateY(i * 2.4); g.translate(0, 0.05, 0); }))]), w: 0.13, h: 0.2 }; break;
    case 'rascador': r = { body: merge([paint(box(0.3, 0.025, 0.3), c2, at(0, 0.0125, 0)), paint(cyl(0.04, 0.04, 0.4), c, at(0, 0.22, 0)), ...Array.from({ length: 18 }, (_, i) => paint(tor(0.041, 0.005), i % 2 ? c : '#c4a77d', at(0, 0.04 + i * 0.021, 0, 1.5708))), paint(box(0.24, 0.03, 0.24), c2, at(0, 0.43, 0)), paint(new THREE.SphereGeometry(0.024, 14, 10), '#e0719a', at(0.1, 0.33, 0))]), w: 0.32, h: 0.46 }; break;
    case 'transportin': r = { body: merge([paint(new THREE.BoxGeometry(0.3, 0.13, 0.4, 2, 2, 2), c, at(0, 0.07, 0)), paint(new THREE.CylinderGeometry(0.15, 0.15, 0.39, 32, 1, false, 0, Math.PI), c2, at(0, 0.135, 0, 1.5708, 0, 1.5708)), paint(box(0.12, 0.02, 0.03), c, at(0, 0.3, 0)), ...Array.from({ length: 7 }, (_, i) => paint(cyl(0.003, 0.003, 0.18, 6), '#8f8a99', at(-0.09 + i * 0.03, 0.15, 0.201)))]), w: 0.34, h: 0.31 }; break;
    default: r = { body: merge([paint(tor(0.1, 0.012), c, at(0, 0.12, 0)), paint(tor(0.1, 0.004), dark, at(0, 0.12, 0.015)), ...Array.from({ length: 6 }, (_, i) => paint(cyl(0.003, 0.003, 0.2, 6), dark, at(0, 0.12, 0, 0, 0, (i * Math.PI) / 6))), paint(box(0.12, 0.012, 0.07), dark, at(0, 0.006, 0)), paint(cyl(0.006, 0.006, 0.12, 8), dark, at(0, 0.06, -0.02))]), w: 0.23, h: 0.23 };
  }
  if (r.label) r.map = labelTex(p, 256, Math.round(256 * (p.shape === 'lata' ? 0.75 : 1.3)));
  cache.set(id, r);
  return r;
}
export function goodGroup(id: string) {
  const g = good(id), G = new THREE.Group(), b = new THREE.Mesh(g.body, goodMat); b.castShadow = true; G.add(b);
  if (g.label) G.add(new THREE.Mesh(g.label, new THREE.MeshStandardMaterial({ map: g.map, roughness: 0.5 })));
  return G;
}
