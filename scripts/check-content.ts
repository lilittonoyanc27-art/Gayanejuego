import { DIALOGUES, CHECKOUT } from '../src/data/dialogues';
import { VET, VET_Q } from '../src/data/vet';
import { STORIES } from '../src/data/stories';
import { MISSIONS, matches } from '../src/data/missions';
import { PRODUCTS, P, DEPTS, ANIMALS } from '../src/data/products';
import { REQUESTS } from '../src/data/shop';
import { GRAMMAR } from '../src/data/grammar';
import { TONGUES } from '../src/data/tongue';
import * as G from '../src/data/games';
import { NPCS } from '../src/data/npcs';
let bad = 0;
const err = (m: string) => { bad++; console.log('✗', m); };
const hy = /[Ա-֏]/, cyr = /[Ѐ-ӿ]/;
const isBi = (b: string, w: string) => { const [a, c] = b.split('|'); if (!a || !c || !hy.test(c) || hy.test(a) || cyr.test(b)) err(`${w}: ${b}`); };
for (const s of [...DIALOGUES, CHECKOUT, ...VET, ...STORIES]) {
  isBi(s.title, s.id); if (!NPCS[s.npc]) err(`${s.id} npc ${s.npc}`);
  const labels = new Set(s.nodes.map((n) => n.label).filter(Boolean));
  s.nodes.forEach((n, i) => {
    isBi(n.line, s.id); if (n.who && !NPCS[n.who]) err(`${s.id} who ${n.who}`);
    n.opts.forEach((o) => { isBi(o.b, s.id); if (o.to && !labels.has(o.to)) err(`${s.id} label ${o.to}`); });
    n.bad.forEach((o) => { if (!o.why) err(`${s.id} sin explicación ${o.b}`); isBi(o.b, s.id); isBi(o.why, s.id); });
    if (n.goto && !labels.has(n.goto)) err(`${s.id} goto ${n.goto}`);
    if (n.end === undefined && i === s.nodes.length - 1) err(`${s.id} sin final`);
    if (n.opts.length && n.opts.length + n.bad.length > 4) err(`${s.id} >4 opciones: ${n.line}`);
  });
  const seen = new Set<number>(), go = (i: number) => {
    if (seen.has(i) || !s.nodes[i]) return; seen.add(i); const n = s.nodes[i]; if (n.end !== undefined) return;
    const at = (l?: string) => (l ? s.nodes.findIndex((x) => x.label === l) : i + 1);
    if (n.opts.length) n.opts.forEach((o) => go(at(o.to ?? n.goto))); else go(at(n.goto));
  };
  go(0); if (seen.size !== s.nodes.length) err(`${s.id}: nodos inalcanzables ${s.nodes.filter((_, i) => !seen.has(i)).map((n) => n.line.slice(0, 40))}`);
}
PRODUCTS.forEach((p) => { isBi(p.name, p.id); isBi(p.desc, p.id); if (!(p.price > 0)) err(p.id); });
DEPTS.forEach((d) => { isBi(d.name, d.id); isBi(d.info, d.id); }); ANIMALS.forEach((a) => { isBi(a.name, a.id); isBi(a.fact, a.id); });
for (const m of MISSIONS) {
  isBi(m.text, m.id); let t = 0;
  m.need.forEach((n) => { isBi(n.b, m.id + n.tag); const c = PRODUCTS.filter((p) => matches(p.id, n.tag, m.id)).sort((a, b) => a.price - b.price); if (!c.length) { err(`${m.id} ${n.tag}`); return; }
    t += m.id === 'm13' && n.n > 1 ? c.slice(0, n.n).reduce((s, p) => s + p.price, 0) : c[0].price * n.n; });
  if (t > m.budget) err(`${m.id} imposible: mínimo ${t} > ${m.budget}`);
}
REQUESTS.forEach((r) => { isBi(r.b, r.who); if (!PRODUCTS.some((p) => r.tags.some((t) => p.tags.includes(t)) && p.price <= r.max)) err('cliente ' + r.b); });
GRAMMAR.forEach((g) => { isBi(g.name.replace(/\|.*/, '|հ'), g.id); g.items.forEach((i) => { isBi(i.ctx, g.id); isBi(i.q, g.id); isBi(i.why, g.id); if (new Set(i.o).size !== 4) err(`${g.id} ${i.q}`); if (!NPCS[i.who]) err(i.who); }); });
TONGUES.forEach((t) => isBi(t.b, t.id)); G.ERRORS.forEach((e) => { if (!e.s.split(' ')[e.i]) err(e.s); if (!hy.test(e.hy)) err(e.s); });
G.LISTEN.forEach((l) => { isBi(l.t, 'L'); isBi(l.q, 'L'); if (l.o.length !== 4) err(l.q); l.o.forEach((o) => isBi(o, 'L')); });
G.PASAPALABRA.forEach((p) => { isBi(p.q, p.l); isBi(p.a, p.l); const a = p.a.split('|')[0]; const n = p.l === 'Ñ' ? a : a.normalize('NFD').replace(/[̀-̂̈]/g, ''); if (p.con ? !n.toUpperCase().includes(p.l) : n[0].toUpperCase() !== p.l) err(`pasapalabra ${p.l} ${a}`); });
[...G.DETECTIVE].forEach((d) => { if (d.clues.length !== 3 || d.d.length !== 3) err(d.a); [d.a, ...d.clues, ...d.d].forEach((b) => isBi(b, 'D')); });
G.WHOAMI.forEach((d) => { if (d.d.length !== 3) err(d.a); [d.a, d.q, ...d.d].forEach((b) => isBi(b, 'W')); });
console.log({ dialogos: DIALOGUES.length, misiones: MISSIONS.length, clinica: VET.length, preguntas: Object.keys(VET_Q).length, historias: STORIES.length, clientes: REQUESTS.length, gramatica: GRAMMAR.length, trabalenguas: TONGUES.length, letras: new Set(G.PASAPALABRA.map((p) => p.l)).size, productos: Object.keys(P).length });
console.log(bad ? `${bad} problemas` : '✓ Contenido correcto'); process.exit(bad ? 1 : 0);
