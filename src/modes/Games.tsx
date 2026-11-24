import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { bi, es, euro, fill, hy, norm, pick, sample, shuffle, similarity, type Bi } from '../core/bi';
import * as G from '../data/games';
import { ANIMALS, PRODUCTS } from '../data/products';
import { complete, count, reward, right, useGame, wrong } from '../core/store';
import { play } from '../core/audio';
import { speak } from '../core/speech';
import { thumb } from '../three/thumbs';
import { B, Say, T } from '../ui/T';
import { Choice, Clock, Panel, Portrait, Result, Stars, useClock } from '../ui/kit';
import { Lights, MAT, Player, Scene, bx, canvasTex, ctl, vc, woodTex, type Box, type Point } from '../three/world';
import { Plant } from '../three/ShopScene';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { merge } from '../three/goods';
import { Joystick } from './Shop';
import { Page } from './Page';

type P = { onExit: () => void; again: () => void; win: (stars: number) => void };
const M = 'Inteligencia';
function Head({ s, i, n, warn }: { s: number; i?: number; n?: number; warn?: boolean }) { return <div className="row between"><Clock s={s} warn={warn} />{n !== undefined && <span className="chip">{Math.min(i! + 1, n)} / {n}</span>}</div>; }
function Rounds<X>({ items, onExit, again, win, render }: P & { items: X[]; render: (x: X, next: (ok: boolean) => void, i: number) => React.ReactNode }) {
  const [i, setI] = useState(0), [ok, setOk] = useState(0), [secs] = useClock(i < items.length);
  const next = (g: boolean) => { const o = ok + (g ? 1 : 0); setOk(o); if (i + 1 >= items.length) { const p = o / items.length; if (p >= 0.6) win(p >= 0.9 ? 3 : 2); } setI(i + 1); };
  if (i >= items.length) return <Result ok={ok} total={items.length} secs={secs} onAgain={again} onExit={onExit} />;
  return <div className="stagebox"><Head s={secs} i={i} n={items.length} /><div key={i}>{render(items[i], next, i)}</div></div>;
}
function Detective(p: P) {
  const items = useMemo(() => sample(G.DETECTIVE, 6), []);
  return <Rounds {...p} items={items} render={(x, next) => <DetRound x={x} next={next} />} />;
}
function DetRound({ x, next }: { x: (typeof G.DETECTIVE)[number]; next: (ok: boolean) => void }) {
  const [n, setN] = useState(1);
  return <><T b="Lee las pistas. Cuantas menos uses, más puntos ganas.|Կարդա հուշումները։ Որքան քիչ օգտագործես, այնքան շատ միավոր։" as="p" /><ol className="clues">{x.clues.slice(0, n).map((c) => <T key={c} b={c} as="li" say />)}</ol>{n < 3 && <B b="Otra pista|Եվս մեկ հուշում" icon="🔍" onClick={() => setN(n + 1)} />}<Choice q="¿Qué animal es?|Ո՞ր կենդանին է։" sayQ={false} opts={[x.a, ...x.d]} mode={M} why={x.clues[2]} onDone={(ok) => { if (ok) reward((3 - n) * 2, 3); next(ok); }} /></>;
}
function Who(p: P) {
  const items = useMemo(() => sample(G.WHOAMI, 6), []);
  return <Rounds {...p} items={items} render={(x, next) => <Choice q={x.q} opts={[x.a, ...x.d]} mode={M} why={x.a} onDone={next} />} />;
}
function Memory({ onExit, again, win }: P) {
  const [lvl, setLvl] = useState(0), [cards, setCards] = useState<{ k: string; img: boolean; b: Bi; t: string }[]>([]), [open, setOpen] = useState<number[]>([]), [got, setGot] = useState<string[]>([]), [moves, setMoves] = useState(0), n = [0, 6, 8, 10][lvl], [secs] = useClock(lvl > 0 && got.length < n);
  const start = (l: number) => { const c = [...sample(ANIMALS.map((a) => ({ k: a.id, b: a.name, t: `animal:${a.id}` })), Math.ceil([0, 6, 8, 10][l] / 2)), ...sample(PRODUCTS.map((x) => ({ k: x.id, b: x.name, t: `prod:${x.id}` })), Math.floor([0, 6, 8, 10][l] / 2))]; setCards(shuffle(c.flatMap((x) => [{ ...x, img: true }, { ...x, img: false }]))); setLvl(l); };
  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || got.includes(cards[i].k)) return;
    play('click'); const o = [...open, i]; setOpen(o); if (!cards[i].img) speak(es(cards[i].b));
    if (o.length === 2) { setMoves(moves + 1); const [a, b] = o.map((j) => cards[j]); if (a.k === b.k) { play('good'); right(M, 4, 1); const g = [...got, a.k]; setGot(g); setOpen([]); if (g.length === n) win(moves < n * 1.6 ? 3 : moves < n * 2.5 ? 2 : 1); } else setTimeout(() => setOpen([]), 1100); }
  };
  if (!lvl) return <div className="stagebox"><T b="Une cada imagen con su nombre en español.|Միացրու յուրաքանչյուր պատկեր իր իսպաներեն անվան հետ։" as="p" say /><div className="row"><B b="6 parejas|6 զույգ" onClick={() => start(1)} className="primary" /><B b="8 parejas|8 զույգ" onClick={() => start(2)} /><B b="10 parejas|10 զույգ" onClick={() => start(3)} /></div></div>;
  if (got.length === n) return <Result ok={n} total={n} secs={secs} onAgain={again} onExit={onExit}><T b={`Movimientos: ${moves}|Քայլեր՝ ${moves}`} as="p" /></Result>;
  return <div className="stagebox"><Head s={secs} i={got.length} n={n} /><div className="memory">{cards.map((c, i) => { const on = open.includes(i) || got.includes(c.k); return <button type="button" key={i} aria-label={on ? es(c.b) : 'Carta'} className={`mcard ${on ? 'on' : ''} ${got.includes(c.k) ? 'got' : ''}`} onClick={() => flip(i)}>{on ? (c.img ? <Portrait k={c.t} size={84} /> : <span data-es={es(c.b)} data-hy={hy(c.b)}>{es(c.b)}<i className="hydot">Ա</i></span>) : <span className="back">🐾</span>}</button>; })}</div></div>;
}
/* ── Escape room 3D ── */
function Room3D({ ri, onObj, solved }: { ri: number; onObj: (i: number) => void; solved: number[] }) {
  const r = G.ESCAPE[ri], floor = woodTex('esc', ['#8d6a52', '#6f7f90', '#7a5a44'][ri], [3, 2]), wall = ['#cdb6bd', '#a9c3d3', '#b9a38f'][ri], [hover, setH] = useState(-1);
  const geo = useMemo(() => merge([bx(11, 4, 0.1, 0.5, 2, -1.6, wall), bx(0.1, 4, 6, -4, 2, 1, wall), bx(0.1, 4, 6, 5, 2, 1, wall), bx(9, 0.14, 0.05, 0.5, 0.07, -1.53, '#fff'), bx(2.4, 0.06, 0.8, 1.2, 1.0, -1, '#8d6549'), ...[[0.1, -1.3], [2.3, -1.3], [0.1, -0.7], [2.3, -0.7]].map(([x, z]) => bx(0.07, 1, 0.07, x, 0.5, z, '#6f4c36'))]), [wall]);
  const shape = (o: G.EscObj, i: number) => { const hl = hover === i, ok = solved.includes(i), col = ok ? '#9fcf9a' : hl ? '#f3c7d8' : ({ caja: '#7d8794', cuadro: '#d9b36c', libro: '#a2637e', cajon: '#a5765a', puerta: '#8d6549', acuario: '#8ec6d8', reloj: '#f4ece4' } as Record<string, string>)[o.icon];
    const m = <meshPhysicalMaterial color={col} roughness={0.45} clearcoat={0.4} emissive={hl ? '#e58fb0' : '#000'} emissiveIntensity={hl ? 0.25 : 0} />;
    switch (o.icon) {
      case 'cuadro': return <><mesh castShadow><boxGeometry args={[1.15, 0.85, 0.06]} />{m}</mesh><mesh position-z={0.04}><planeGeometry args={[0.98, 0.68]} /><meshStandardMaterial map={ri === 0 ? canvasTex('escpic', 512, 356, (g) => { g.fillStyle = '#f7ebe4'; g.fillRect(0, 0, 512, 356); g.font = '84px serif'; ['🐱', '🐱', '🐱', '🐶', '🐶', '🦜'].forEach((e, k) => g.fillText(e, 50 + (k % 3) * 150, 130 + Math.floor(k / 3) * 150)); }) : undefined} color={ri === 0 ? '#fff' : '#dcebf2'} /></mesh></>;
      case 'caja': return <><mesh castShadow><boxGeometry args={[0.85, 0.85, 0.7]} />{m}</mesh><mesh position={[0.1, 0.05, 0.37]} rotation-x={1.57} material={MAT.metal}><cylinderGeometry args={[0.14, 0.14, 0.06, 32]} /></mesh><mesh position={[-0.25, 0.05, 0.38]} material={MAT.gold}><boxGeometry args={[0.06, 0.25, 0.04]} /></mesh></>;
      case 'libro': return <><mesh rotation-y={0.3} castShadow><boxGeometry args={[0.42, 0.08, 0.55]} />{m}</mesh><mesh rotation-y={0.3} position-y={-0.01} material={MAT.white}><boxGeometry args={[0.4, 0.06, 0.57]} /></mesh></>;
      case 'cajon': return <><mesh castShadow><boxGeometry args={[0.95, 0.6, 0.55]} />{m}</mesh><mesh position={[0, 0.05, 0.29]} material={MAT.gold}><boxGeometry args={[0.3, 0.05, 0.05]} /></mesh></>;
      case 'acuario': return <><mesh castShadow><boxGeometry args={[1.2, 0.8, 0.5]} /><meshPhysicalMaterial color={col} transparent opacity={0.65} roughness={0.05} clearcoat={1} emissive={hl ? '#e58fb0' : '#3a7f9c'} emissiveIntensity={0.3} /></mesh><mesh position-y={-0.7} material={MAT.woodD}><boxGeometry args={[1.25, 0.6, 0.55]} /></mesh></>;
      case 'reloj': return <><mesh rotation-x={1.57} castShadow><cylinderGeometry args={[0.4, 0.4, 0.08, 48]} />{m}</mesh><mesh position={[-0.066, -0.104, 0.05]} rotation-z={2.58} material={MAT.dark}><boxGeometry args={[0.035, 0.22, 0.02]} /></mesh><mesh position={[-0.14, -0.08, 0.06]} rotation-z={2.094} material={MAT.dark}><boxGeometry args={[0.025, 0.32, 0.02]} /></mesh></>;
      default: return <><mesh castShadow><boxGeometry args={[1.1, 2.2, 0.1]} />{m}</mesh><mesh position={[-0.42, 0, 0.09]} material={MAT.gold}><sphereGeometry args={[0.06, 20, 16]} /></mesh></>;
    } };
  return (<><Lights area={5} sun={[1, 5, 5]} intensity={ri === 0 ? 1 : 1.3} every /><pointLight position={[0.5, 2.6, 1]} intensity={7} color={['#ffd2a6', '#a6dcff', '#ffcfa0'][ri]} distance={7} /><mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[14, 10]} /><meshPhysicalMaterial map={floor} roughness={0.4} clearcoat={0.3} /></mesh><mesh geometry={geo} material={vc} receiveShadow castShadow /><Plant position={[-3.4, 0, -1]} />
    {r.objs.map((o, i) => <group key={i} position={[o.x, o.y - (o.icon === 'libro' ? 0.13 : o.icon === 'cajon' ? 0.3 : o.icon === 'caja' ? 0.07 : 0), o.icon === 'cuadro' || o.icon === 'reloj' ? -1.5 : o.icon === 'puerta' ? -1.48 : o.icon === 'cajon' ? -0.9 : -0.95]} onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onObj(i); }} onPointerOver={(e) => { e.stopPropagation(); setH(i); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setH(-1); document.body.style.cursor = ''; }}>{shape(o, i)}</group>)}</>);
}
function Escape({ onExit, again, win }: P) {
  const [ri, setRi] = useState(0), [solved, setSolved] = useState<number[]>([]), [keys, setKeys] = useState<Bi[]>([]), [cur, setCur] = useState<number | null>(null), [seen, setSeen] = useState<Bi[]>([]), [val, setVal] = useState(''), [msg, setMsg] = useState<Bi | null>(null), [hints, setHints] = useState(0), [done, setDone] = useState(false), [secs] = useClock(!done);
  const r = G.ESCAPE[ri], o = cur === null ? null : r.objs[cur], open = (i: number) => { play('click'); setCur(i); setVal(''); setMsg(null); const x = r.objs[i]; if (x.clue && !seen.includes(x.clue)) setSeen([...seen, x.clue]); };
  const locked = o?.needs !== undefined && keys.length < o.needs;
  const submit = () => {
    if (!o?.a) return;
    if (!o.a.map(norm).includes(norm(val))) { play('bad'); setMsg(fill('No funciona. {h}|Չի աշխատում։ {h}', { h: 'Piensa en las pistas que has encontrado.|Մտածիր գտած հուշումների մասին։' })); wrong(M, o.q!, val || '—', o.a[0], o.hint!); return; }
    play('win'); right(M, 15, 4);
    if (o.needs) { if (ri + 1 < G.ESCAPE.length) { setRi(ri + 1); setSolved([]); setKeys([]); setSeen([]); setCur(null); } else { setDone(true); setCur(null); win(hints === 0 ? 3 : hints < 3 ? 2 : 1); } }
    else { setSolved([...solved, cur!]); setKeys([...keys, o.gives!]); setCur(null); }
  };
  if (done) return <Result ok={3} total={3} secs={secs} onAgain={again} onExit={onExit} title="¡Has escapado!|Փրկվեցիր։" />;
  return (
    <div className="embed"><Scene cam={[0.5, 1.6, 5.2]} look={[0.5, 1.35, -1]} fov={46} fog={false} bg="#40323f"><Room3D ri={ri} onObj={open} solved={solved} /></Scene>
      <div className="embedhud"><Clock s={secs} /><T b={r.name} as="b" /><span className="chip">🗝 {keys.length} / 2</span></div>
      <div className="embedfoot"><T b={r.intro} as="p" say /><div className="row">{r.objs.map((x, i) => <B key={i} b={x.name} className={`small ${solved.includes(i) ? 'primary' : ''}`} onClick={() => open(i)} />)}</div></div>
      {o && <Panel onClose={() => setCur(null)}><T b={o.name} as="h2" say />{o.clue && <T b={o.clue} as="p" className="bubble" say />}
        {o.q && (solved.includes(cur!) ? <T b={fill('Ya está abierto. Has encontrado {x}.|Արդեն բաց է։ Գտել ես {x}։', { x: o.gives! })} as="p" /> : locked ? <T b={fill('Necesitas dos llaves. Tienes {n}.|Երկու բանալի է պետք։ Ունես {n}։', { n: keys.length })} as="p" say /> : <><T b={o.q} as="p" say /><div className="row write"><input autoFocus value={val} aria-label="Respuesta" onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} /><B b="Abrir|Բացել" className="primary" onClick={submit} /></div><B b="Pedir una pista|Հուշում խնդրել" icon="💡" className="small" onClick={() => { setHints(hints + 1); setMsg(o.hint!); }} /></>)}
        {msg && <T b={msg} as="p" className="fb ko" say />}{seen.length > 0 && o.q && <div className="notes"><T b="Tus notas|Քո նշումները" as="b" />{seen.map((s) => <T key={s} b={s} as="p" />)}</div>}</Panel>}
    </div>
  );
}
function Secret(p: P) { const items = useMemo(() => sample(G.SECRET, 6), []); return <Rounds {...p} items={items} render={(x, next) => <SecRound x={x} next={next} />} />; }
function SecRound({ x, next }: { x: (typeof G.SECRET)[number]; next: (ok: boolean) => void }) {
  const W = x.w, base = (c: string) => (c === 'Ñ' ? 'Ñ' : c.normalize('NFD').replace(/[̀-ͯ]/g, '')), [g, setG] = useState<string[]>([]), miss = g.filter((l) => ![...W].some((c) => base(c) === l)).length, won = [...W].every((c) => g.includes(base(c))), lost = miss >= 7, over = won || lost, told = useRef(false);
  const press = useCallback((l: string) => setG((q) => (q.includes(l) ? q : [...q, l])), []);
  useEffect(() => { const k = (e: KeyboardEvent) => { const l = e.key.toUpperCase(); if (/^[A-ZÑ]$/.test(l) && !over) press(l); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [over, press]);
  useEffect(() => { if (!over || told.current) return; told.current = true; if (won) { play('good'); right(M); speak(W.toLowerCase()); } else { play('bad'); wrong(M, x.clue, '—', x.b, x.clue); } }, [over, won, W, x]);
  return <div className="choice"><T b={x.clue} as="h3" say /><p className="lives">{'🤍'.repeat(7 - miss)}{'·'.repeat(miss)}</p><div className="letters">{[...W].map((c, i) => <span key={i}>{g.includes(base(c)) || over ? c : ''}</span>)}</div><div className="keys">{[...'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'].map((l) => <button type="button" key={l} disabled={g.includes(l) || over} className={g.includes(l) ? ([...W].some((c) => base(c) === l) ? 'hit' : 'miss') : ''} onClick={() => press(l)}>{l}</button>)}</div>{over && <div className={`fb ${won ? 'ok' : 'ko'}`}><T b={x.b} as="b" say /><B b="Continuar|Շարունակել" className="primary" onClick={() => next(won)} /></div>}</div>;
}
function Pasa({ onExit, again, win }: P) {
  const L = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', qs = useMemo(() => [...L].map((l) => pick(G.PASAPALABRA.filter((x) => x.l === l))), []), [st, setSt] = useState<number[]>(() => Array(27).fill(0)), [i, setI] = useState(0), [val, setVal] = useState(''), [left, setLeft] = useState(300), [go, setGo] = useState(false), [msg, setMsg] = useState<{ ok: boolean; b: Bi } | null>(null), over = go && (left <= 0 || st.every((x) => x)), ok = st.filter((x) => x === 1).length;
  useEffect(() => { if (!go || over) return; const t = setInterval(() => setLeft((x) => x - 1), 1000); return () => clearInterval(t); }, [go, over]);
  useEffect(() => { if (go && !over) speak(es(qs[i].q)); }, [i, go]); // eslint-disable-line
  useEffect(() => { if (over && ok >= 14) win(ok >= 24 ? 3 : ok >= 19 ? 2 : 1); }, [over]); // eslint-disable-line
  const move = (s: number[]) => { for (let k = 1; k <= 27; k++) { const j = (i + k) % 27; if (!s[j]) { setI(j); return; } } };
  const answer = () => { if (!val.trim()) return; const a = es(qs[i].a), good = norm(val).replace(/^(el|la|un|una) /, '') === norm(a), s = [...st]; s[i] = good ? 1 : 2; setSt(s); setVal(''); if (good) { play('good'); right(M, 5, 1); setMsg({ ok: true, b: qs[i].a }); } else { play('bad'); wrong(M, qs[i].q, val, qs[i].a, 'Escucha la definición y piensa en la letra.|Լսիր սահմանումը և մտածիր տառի մասին։'); setMsg({ ok: false, b: qs[i].a }); } move(s); };
  if (!go) return <div className="stagebox"><T b="27 letras, cinco minutos. Si no sabes una palabra, di «pasapalabra» y vuelve después.|27 տառ, հինգ րոպե։ Եթե բառը չգիտես, ասա «pasapalabra» և հետո վերադարձիր։" as="p" say /><B b="Empezar|Սկսել" className="primary" onClick={() => setGo(true)} /></div>;
  if (over) return <Result ok={ok} total={27} secs={300 - left} onAgain={again} onExit={onExit}><div className="list">{qs.map((q, k) => st[k] !== 1 && <p key={k}><b>{q.l}</b> <T b={q.a} say /></p>)}</div></Result>;
  return <div className="stagebox pasa"><div className="rosco">{[...L].map((l, k) => { const a = (k / 27) * 2 * Math.PI - Math.PI / 2; return <span key={l} className={`${k === i ? 'cur' : ''} s${st[k]}`} style={{ left: `${50 + 45 * Math.cos(a)}%`, top: `${50 + 45 * Math.sin(a)}%` }}>{l}</span>; })}<div className="mid"><Clock s={left} warn={left < 30} /><b className="big">{ok}</b></div></div>
    <div className="choice"><T b={fill(qs[i].con ? 'Contiene la letra {l}|Պարունակում է {l} տառը' : 'Empieza por {l}|Սկսվում է {l}-ով', { l: qs[i].l })} as="b" className="chip" /><T b={qs[i].q} as="h3" say /><div className="row write"><input autoFocus value={val} aria-label="Respuesta" onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') answer(); }} /><B b="Responder|Պատասխանել" className="primary" onClick={answer} /><B b="Pasapalabra|Բաց թողնել" onClick={() => { play('click'); setVal(''); move(st); }} /></div>{msg && <div className={`fb ${msg.ok ? 'ok' : 'ko'}`}>{msg.ok ? '✓ ' : '✗ '}<T b={msg.b} /></div>}</div></div>;
}
function Price(p: P) {
  const items = useMemo(() => Array.from({ length: 8 }, (_, k) => {
    const [a, b, c] = sample(PRODUCTS.filter((x) => x.price > 3), 3), r2 = (n: number) => Math.round(n * 100) / 100, opt = (v: number) => { const s = new Set([euro(v)]); for (const d of [1, -1, 0.5, 2, 1.5, -0.5, 3]) if (s.size < 4 && v + d > 0) s.add(euro(r2(v + d))); return [...s]; };
    switch (k % 4) {
      case 0: { const all = [a, b, c].sort((x, y) => x.price - y.price); return { ids: shuffle(all), q: '¿Cuál es el producto más barato de los tres?|Երեքից ո՞րն է ամենաէժան ապրանքը։', o: all.map((x) => x.name), why: list(all) }; }
      case 1: { const d = pick([10, 20, 25, 50]), v = r2(a.price * (1 - d / 100)); return { ids: [a], q: fill('Hoy tiene un descuento del {d} %. ¿Cuánto cuesta ahora?|Այսօր {d} % զեղչ ունի։ Որքա՞ն արժե հիմա։', { d }), o: opt(v), why: `${euro(a.price)} − ${d} % = ${euro(v)}|${euro(a.price)} − ${d} % = ${euro(v)}` }; }
      case 2: { const t = r2(a.price + b.price), n = [20, 50, 100, 200].find((x) => x > t)!; return { ids: [a, b], q: fill('Compras los dos y pagas con {n} euros. ¿Cuánto te devuelven?|Գնում ես երկուսն էլ և վճարում {n} եվրո։ Որքա՞ն կվերադարձնեն։', { n }), o: opt(r2(n - t)), why: `${n} − ${euro(t)} = ${euro(n - t)}|${n} − ${euro(t)} = ${euro(n - t)}` }; }
      default: { const n = pick([2, 3, 4]), v = r2(a.price * n); return { ids: [a], q: fill('Si compras {n} unidades, ¿cuánto pagas en total?|Եթե {n} հատ գնես, ընդհանուր որքա՞ն կվճարես։', { n }), o: opt(v), why: `${euro(a.price)} × ${n} = ${euro(v)}|${euro(a.price)} × ${n} = ${euro(v)}` }; }
    }
  }), []);
  return <Rounds {...p} items={items} render={(x, next) => <Choice q={x.q} opts={x.o} mode={M} why={x.why} onDone={next}><div className="row">{x.ids.map((y) => <figure key={y.id} className="pcard"><Portrait k={`prod:${y.id}`} size={110} /><T b={y.name} /><b>{euro(y.price)}</b></figure>)}</div></Choice>} />;
}
const list = (xs: { name: Bi; price: number }[]) => bi(xs.map((x) => `${es(x.name)}: ${euro(x.price)}`).join(' · '), xs.map((x) => `${hy(x.name)}՝ ${euro(x.price)}`).join(' · '));
function OrderD(p: P) { const items = useMemo(() => sample(G.ORDER, 4), []); return <Rounds {...p} items={items} render={(x, next) => <OrdRound x={x} next={next} />} />; }
function OrdRound({ x, next }: { x: (typeof G.ORDER)[number]; next: (ok: boolean) => void }) {
  const pool = useMemo(() => shuffle(x.lines), [x]), [sel, setSel] = useState<Bi[]>([]), [errs, setErrs] = useState(0), [bad, setBad] = useState<Bi | null>(null), done = sel.length === x.lines.length;
  const tap = (l: Bi) => { if (l === x.lines[sel.length]) { play('click'); speak(es(l), { male: sel.length % 2 === 1 }); setBad(null); const n = [...sel, l]; setSel(n); if (n.length === x.lines.length) { play('good'); if (!errs) right(M, 12, 3); } } else { play('bad'); setErrs(errs + 1); setBad(l); wrong(M, x.t, l, x.lines[sel.length], 'Piensa qué frase responde a la anterior.|Մտածիր, թե որ նախադասությունն է պատասխանում նախորդին։'); } };
  return <div className="choice"><T b={x.t} as="h3" /><div className="log">{sel.map((l, i) => <T key={l} b={l} as="p" className={i % 2 ? 'me' : 'old'} say />)}</div><div className="opts">{pool.filter((l) => !sel.includes(l)).map((l) => <button type="button" key={l} data-es={es(l)} data-hy={hy(l)} className={`opt ${bad === l ? 'ko' : ''}`} onClick={() => tap(l)}><span>{es(l)}</span><i className="hydot">Ա</i></button>)}</div>{done && <B b="Continuar|Շարունակել" className="primary" onClick={() => next(errs < 2)} />}</div>;
}
function FindErr(p: P) { const items = useMemo(() => sample(G.ERRORS, 7), []); return <Rounds {...p} items={items} render={(x, next) => <ErrRound x={x} next={next} />} />; }
function ErrRound({ x, next }: { x: (typeof G.ERRORS)[number]; next: (ok: boolean) => void }) {
  const ws = x.s.split(' '), [sel, setSel] = useState<number | null>(null), ok = sel === x.i, fixed = ws.map((w, i) => (i === x.i ? x.fix + (/[.,!]$/.exec(w)?.[0] ?? '') : w)).join(' ');
  return <div className="choice"><T b="Toca la palabra incorrecta.|Դիպչիր սխալ բառին։" as="p" /><div className="built big">{ws.map((w, i) => <button type="button" key={i} className={sel === null ? '' : i === x.i ? 'miss' : i === sel ? 'dim' : ''} onClick={() => { if (sel !== null) return; setSel(i); if (i === x.i) { play('good'); right(M); } else { play('bad'); wrong(M, bi(x.s, x.hy), ws[i], bi(fixed, x.hy), x.why); } }}>{w}</button>)}</div>{sel === null ? <span className="t hint" data-es={x.s} data-hy={x.hy}>¿Qué significa?</span> : <div className={`fb ${ok ? 'ok' : 'ko'}`}><T b={bi(fixed, x.hy)} as="b" say /><T b={x.why} as="p" /><B b="Continuar|Շարունակել" className="primary" onClick={() => next(ok)} /></div>}</div>;
}
function Listen(p: P) { const items = useMemo(() => sample(G.LISTEN, 6), []); return <Rounds {...p} items={items} render={(x, next) => <LisRound x={x} next={next} />} />; }
function LisRound({ x, next }: { x: (typeof G.LISTEN)[number]; next: (ok: boolean) => void }) {
  const [show, setShow] = useState(false); useEffect(() => { const t = setTimeout(() => speak(es(x.t)), 300); return () => clearTimeout(t); }, [x]);
  return <><div className="row"><B b="Escuchar|Լսել" icon="🔊" className="primary" onClick={() => speak(es(x.t))} /><B b="Más despacio|Ավելի դանդաղ" icon="🐢" onClick={() => speak(es(x.t), { rate: 0.65 })} /><B b="Mostrar el texto|Ցույց տալ տեքստը" icon="👁" onClick={() => setShow(true)} /></div>{show && <T b={x.t} as="p" className="bubble" say />}<Choice q={x.q} sayQ={false} opts={x.o} mode={M} why={x.t} onDone={next} /></>;
}
function What(p: P) { const items = useMemo(() => sample(G.DILEMMAS, 4), []); return <Rounds {...p} items={items} render={(x, next) => <DilRound x={x} next={next} />} />; }
function DilRound({ x, next }: { x: G.Dilemma; next: (ok: boolean) => void }) {
  const opts = useMemo(() => shuffle(x.o), [x]), [sel, setSel] = useState<(typeof x.o)[number] | null>(null), [txt, setTxt] = useState(''), [fb, setFb] = useState<Bi | null>(null);
  const evalTxt = () => { const n = norm(txt), words = n.split(' ').filter(Boolean), cond = /\b\w+(aria|eria|iria|arias|erias|irias|ariamos|eriamos|iriamos)\b|\b(haria|podria|deberia|diria|tendria)\b/.test(n), k = x.keys.filter((q) => n.includes(norm(q))).length, sc = (words.length >= 6 ? 1 : 0) + (cond ? 1 : 0) + (k ? 1 : 0), sim = similarity(txt, es(x.model)); if (sc >= 2 || sim > 0.6) { play('good'); right(M, 15, 4); setFb(cond ? '¡Excelente! Has explicado tu idea y has usado el condicional.|Գերազանց է։ Բացատրեցիր միտքդ և օգտագործեցիր condicional-ը։' : '¡Bien explicado! Prueba también con el condicional: haría, diría, llevaría.|Լավ բացատրեցիր։ Փորձիր նաև condicional-ը՝ haría, diría, llevaría։'); } else { play('bad'); setFb('Amplía tu respuesta: di qué harías y añade «porque…».|Ընդարձակիր պատասխանդ՝ ասա, թե ինչ կանեիր, և ավելացրու «porque…»։'); } };
  return <div className="choice"><T b={x.q} as="h3" say /><div className="opts">{opts.map((o) => <button type="button" key={o.b} data-es={es(o.b)} data-hy={hy(o.b)} className={`opt ${sel === o ? (o.s >= 2 ? 'ok' : 'ko') : sel ? 'dim' : ''}`} onClick={() => { if (sel) return; setSel(o); if (o.s >= 2) { play('good'); right(M); } else { play('bad'); wrong(M, x.q, o.b, x.o.find((q) => q.s === 3)!.b, o.r); } }}><span>{es(o.b)}</span><i className="hydot">Ա</i><Say text={es(o.b)} /></button>)}</div>{sel && <><T b={sel.r} as="p" className="bubble" say /><T b="Ahora explica tu decisión en español:|Հիմա իսպաներեն բացատրիր որոշումդ․" as="b" /><textarea rows={3} value={txt} onChange={(e) => setTxt(e.target.value)} aria-label="Tu explicación" /><div className="row"><B b="Comprobar|Ստուգել" className="primary" onClick={evalTxt} /><B b="Ver un ejemplo|Տեսնել օրինակ" onClick={() => setFb(x.model)} /><B b="Continuar|Շարունակել" onClick={() => next(sel.s >= 2)} /></div>{fb && <T b={fb} as="p" className="fb ok" say />}</>}</div>;
}
/* ── Puzzle 3D ── */
function Tile({ tex, n, home, slot, sel, onClick }: { tex: THREE.Texture; n: number; home: number; slot: number; sel: boolean; onClick: () => void }) {
  const g = useRef<THREE.Group>(null), S = 3 / n, pos = (i: number) => [((i % n) - (n - 1) / 2) * S, ((n - 1) / 2 - Math.floor(i / n)) * S] as const;
  const geo = useMemo(() => { const p = new THREE.PlaneGeometry(S * 0.965, S * 0.965), uv = p.attributes.uv, c = home % n, r = n - 1 - Math.floor(home / n); for (let i = 0; i < 4; i++) uv.setXY(i, (c + uv.getX(i)) / n, (r + uv.getY(i)) / n); return p; }, [home, n, S]);
  useFrame(({ clock }) => { const o = g.current; if (!o) return; const [x, y] = pos(slot); o.position.x += (x - o.position.x) * 0.14; o.position.y += (y - o.position.y) * 0.14; o.position.z += ((sel ? 0.45 : 0) + Math.abs(x - o.position.x) * 0.3 - o.position.z) * 0.14; o.rotation.y += ((sel ? Math.sin(clock.elapsedTime * 3) * 0.2 : 0) - o.rotation.y) * 0.15; });
  return <group ref={g} onClick={(e) => { e.stopPropagation(); onClick(); }}><mesh castShadow position-z={-0.045}><boxGeometry args={[S * 0.97, S * 0.97, 0.08]} /><meshPhysicalMaterial color={home === slot ? '#f4d9e3' : '#b9a0d2'} roughness={0.4} clearcoat={0.4} /></mesh><mesh geometry={geo}><meshBasicMaterial map={tex} toneMapped={false} /></mesh></group>;
}
const PICS: { k: string; b: Bi }[] = [...['golden', 'tabby', 'siames', 'collie', 'conejoblanco', 'loro'].map((k) => { const a = ANIMALS.find((x) => x.id === k)!; return { k: `animal:${k}:b`, b: a.name }; }), { k: 'interior', b: 'La tienda|Խանութը' }];
async function interior(): Promise<string> {
  const ids = ['prod:pp1', 'animal:gris', 'prod:rs1', 'prod:pl1', 'animal:labrador', 'prod:ca2', 'prod:lg1', 'animal:conejomarron', 'prod:ch1', 'prod:ac2', 'animal:canario', 'prod:cm1'], c = document.createElement('canvas'); c.width = c.height = 900; const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 0, 900); gr.addColorStop(0, '#f6dfe7'); gr.addColorStop(1, '#e6d6f0'); g.fillStyle = gr; g.fillRect(0, 0, 900, 900);
  for (let i = 0; i < 12; i++) { const im = new Image(); im.src = await thumb(ids[i]); await im.decode().catch(() => {}); const x = (i % 4) * 225, y = Math.floor(i / 4) * 290; g.drawImage(im, x + 10, y + 42, 205, 205); if (i % 4 === 0) { g.fillStyle = '#c9a27e'; g.fillRect(0, y + 240, 900, 22); g.fillStyle = '#8d6549'; g.fillRect(0, y + 262, 900, 6); } }
  return c.toDataURL('image/jpeg', 0.9);
}
function Puzzle({ onExit, again, win }: P) {
  const [p, setP] = useState<(typeof PICS)[number] | null>(null), [n, setN] = useState(3), [tex, setTex] = useState<THREE.Texture | null>(null), [slots, setSlots] = useState<number[]>([]), [sel, setSel] = useState<number | null>(null), [moves, setMoves] = useState(0), done = slots.length > 0 && slots.every((s, i) => s === i), [secs] = useClock(!!tex && !done);
  useEffect(() => { if (!p) return; let on = true; void (p.k === 'interior' ? interior() : thumb(p.k, 900)).then((u) => new THREE.TextureLoader().load(u, (t) => { if (!on) return; t.colorSpace = THREE.SRGBColorSpace; setTex(t); let s = shuffle([...Array(n * n).keys()]); while (s.every((x, i) => x === i)) s = shuffle(s); setSlots(s); })); return () => { on = false; }; }, [p, n]);
  useEffect(() => { if (done) { play('win'); right(M, 20, 6); win(moves < n * n * 1.4 ? 3 : moves < n * n * 2.2 ? 2 : 1); speak(es(p!.b)); } }, [done]); // eslint-disable-line
  if (!p) return <div className="stagebox"><T b="Elige una imagen y el número de piezas.|Ընտրիր պատկեր և մասերի քանակ։" as="p" say /><div className="row">{[3, 4, 5].map((k) => <B key={k} b={`${k * k} piezas|${k * k} մաս`} className={n === k ? 'primary' : ''} onClick={() => setN(k)} />)}</div><div className="grid prods">{PICS.map((x) => <button type="button" key={x.k} className="pcard" data-es={es(x.b)} data-hy={hy(x.b)} onClick={() => setP(x)}><Portrait k={x.k === 'interior' ? 'prod:ac2' : x.k.replace(':b', '')} size={110} /><span>{es(x.b)}</span><i className="hydot">Ա</i></button>)}</div></div>;
  const tap = (home: number) => { if (done) return; play('click'); if (sel === null) return setSel(home); if (sel === home) return setSel(null); setSlots((s) => { const c = [...s]; [c[sel], c[home]] = [c[home], c[sel]]; return c; }); setMoves(moves + 1); setSel(null); };
  return <div className="embed"><Scene cam={[0, 0, 4.6]} fov={45} fog={false}><Lights area={3} sun={[2, 3, 5]} every /><mesh position-z={-0.4} receiveShadow><planeGeometry args={[12, 8]} /><meshStandardMaterial color="#efdbe4" /></mesh>{tex && slots.map((s, h) => <Tile key={h} tex={tex} n={n} home={h} slot={s} sel={sel === h} onClick={() => tap(h)} />)}</Scene><div className="embedhud"><Clock s={secs} /><T b={p.b} as="b" say /><span className="chip">{slots.filter((s, i) => s === i).length} / {n * n}</span></div>{!done && <div className="embedfoot"><T b="Toca dos piezas para cambiarlas de lugar.|Դիպչիր երկու մասի՝ տեղերը փոխելու համար։" as="p" /></div>}{done && <Panel><Result ok={n * n} total={n * n} secs={secs} onAgain={again} onExit={onExit} title={fill('¡Completado! Es: {x}|Պատրաստ է։ Սա՝ {x}', { x: p.b })} /></Panel>}</div>;
}
/* ── Laberinto 3D ── */
const N = 6, CELL = 2.4;
function makeMaze() {
  const open = new Set<string>(), seen = new Set([0]), key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`), st = [0];
  while (st.length) { const c = st[st.length - 1], x = c % N, y = Math.floor(c / N), ns = ([[1, 0], [-1, 0], [0, 1], [0, -1]] as const).map(([a, b]) => [x + a, y + b] as const).filter(([a, b]) => a >= 0 && b >= 0 && a < N && b < N && !seen.has(a + b * N)); if (!ns.length) { st.pop(); continue; } const [a, b] = pick(ns), d = a + b * N; open.add(key(c, d)); seen.add(d); st.push(d); }
  const path = (from: number, to: number) => { const prev = new Map<number, number>([[from, -1]]), q = [from]; while (q.length) { const c = q.shift()!; if (c === to) break; for (const d of [c + 1, c - 1, c + N, c - N]) if (d >= 0 && d < N * N && !prev.has(d) && open.has(key(c, d))) { prev.set(d, c); q.push(d); } } const r = [to]; while (r[0] !== from) r.unshift(prev.get(r[0])!); return r; };
  return { open, path, key };
}
const cx = (c: number) => (c % N) * CELL + CELL / 2, cz = (c: number) => Math.floor(c / N) * CELL + CELL / 2;
function MazeGame({ onExit, again, win }: P) {
  const mz = useMemo(makeMaze, []), goals = useMemo(() => { const p = mz.path(0, N * N - 1), m = p[Math.floor(p.length / 2)]; const others = shuffle([...Array(N * N).keys()].filter((c) => c !== 0 && c !== N * N - 1 && c !== m)); return [p[Math.max(1, Math.floor(p.length / 4))], m, others[0] === p[1] ? others[1] : others[0]].filter((c, i, a) => a.indexOf(c) === i); }, [mz]);
  const [got, setGot] = useState<number[]>([]), [q, setQ] = useState<number | null>(null), [ins, setIns] = useState<Bi>('Sigue recto.|Ուղիղ գնա։'), [end, setEnd] = useState(false), [errs, setErrs] = useState(0), [secs] = useClock(!end), qs = useMemo(() => sample(G.MAZE_Q, 5), []);
  const cur = useRef({ cell: -1, dir: -1, t: 0 }), target = goals.find((g) => !got.includes(g)) ?? N * N - 1, tr = useRef(target); tr.current = target;
  const walls = useMemo<Box[]>(() => { const w: Box[] = []; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const c = x + y * N; if (x < N - 1 && !mz.open.has(mz.key(c, c + 1))) w.push({ x: (x + 1) * CELL, z: cz(c), w: 0.24, d: CELL + 0.24 }); if (y < N - 1 && !mz.open.has(mz.key(c, c + N))) w.push({ x: cx(c), z: (y + 1) * CELL, w: CELL + 0.24, d: 0.24 }); } return w; }, [mz]);
  const L = N * CELL, hedge = useMemo(() => mergeGeometries([...walls, { x: L / 2, z: 0, w: L, d: 0.24 }, { x: L / 2, z: L, w: L, d: 0.24 }, { x: 0, z: L / 2, w: 0.24, d: L }, { x: L, z: L / 2, w: 0.24, d: L }].map((b) => {
    const g = new THREE.BoxGeometry(b.w, 2.1, b.d), p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv; g.translate(b.x, 1.05, b.z);
    for (let i = 0; i < p.count; i++) uv.setXY(i, (Math.abs(n.getX(i)) > 0.5 ? p.getZ(i) : p.getX(i)) / 1.4, (Math.abs(n.getY(i)) > 0.5 ? p.getZ(i) : p.getY(i)) / 1.4);
    return g;
  }), false)!, [walls, L]);
  const leaf = canvasTex('leaf', 512, 512, (g) => { g.fillStyle = '#4c7446'; g.fillRect(0, 0, 512, 512); for (let i = 0; i < 1900; i++) { const x = Math.random() * 512, y = Math.random() * 512, h = i / 1900; g.save(); g.translate(x, y); g.rotate(Math.random() * 7); g.fillStyle = i % 61 === 0 && h > 0.6 ? '#e6a3bd' : `hsl(${104 + (i % 13) * 2} ${26 + (i % 7) * 3}% ${24 + h * 24}%)`; g.beginPath(); g.ellipse(0, 0, 13, 6, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(20,45,20,.25)'; g.stroke(); g.restore(); } }, [1, 1]);
  const onMove = useCallback((x: number, z: number, yaw: number) => {
    const c = Math.floor(x / CELL) + Math.floor(z / CELL) * N, fx = -Math.sin(yaw), fz = -Math.cos(yaw), dir = Math.abs(fx) > Math.abs(fz) ? (fx > 0 ? 0 : 2) : fz > 0 ? 1 : 3;
    if (c === tr.current && Math.hypot(x - cx(c), z - cz(c)) < 0.8) { if (c === N * N - 1) { setEnd(true); return; } setQ((v) => v ?? c); return; }
    const t = performance.now(); if ((c === cur.current.cell && dir === cur.current.dir && cur.current.t === tr.current) || t < 0) return; cur.current = { cell: c, dir, t: tr.current };
    const p = mz.path(c, tr.current); if (p.length < 2) return; const d = p[1] - p[0], want = d === 1 ? 0 : d === N ? 1 : d === -1 ? 2 : 3, rel = (want - dir + 4) % 4;
    let s = 1; while (s < p.length - 1 && p[s + 1] - p[s] === d) s++;
    setIns(rel === 0 ? (s > 1 ? fill('Sigue recto y cruza {n} espacios.|Ուղիղ գնա և անցիր {n} տարածք։', { n: s }) : 'Avanza un poco y detente.|Մի քիչ առաջ գնա և կանգնիր։') : rel === 1 ? 'Gira a la derecha y continúa.|Թեքվիր աջ և շարունակիր։' : rel === 3 ? 'Dobla a la izquierda y avanza.|Թեքվիր ձախ և առաջ գնա։' : 'Da media vuelta: vas en dirección contraria.|Շրջվիր, հակառակ ուղղությամբ ես գնում։');
  }, [mz]);
  useEffect(() => { ctl.locked = q !== null || end; ctl.third = false; }, [q, end]);
  useEffect(() => { if (end) { play('win'); win(errs === 0 ? 3 : 2); } }, [end]); // eslint-disable-line
  const nothing = useCallback(() => {}, []), pts = useMemo<Point[]>(() => [], []);
  const scene = useMemo(() => <Scene className="walk" bg="#cfe6f4" fov={64}><Lights area={10} sun={[4, 10, 3]} intensity={1.9} /><mesh rotation-x={-Math.PI / 2} position={[L / 2, 0, L / 2]} receiveShadow><planeGeometry args={[L + 10, L + 10]} /><meshStandardMaterial color="#dcc9ac" roughness={1} /></mesh><mesh geometry={hedge} castShadow receiveShadow><meshStandardMaterial map={leaf} bumpMap={leaf} bumpScale={2.5} roughness={0.9} /></mesh>{goals.map((g) => !got.includes(g) && <Key key={g} p={[cx(g), 1.1, cz(g)]} />)}<group position={[cx(N * N - 1), 0, cz(N * N - 1)]}><mesh position-y={1.25}><torusGeometry args={[0.75, 0.07, 16, 60]} /><meshPhysicalMaterial color="#e58fb0" emissive="#e58fb0" emissiveIntensity={got.length >= goals.length ? 0.9 : 0.1} /></mesh></group><Player start={[cx(0), cz(0)]} yaw={mz.open.has(mz.key(0, 1)) ? -Math.PI / 2 : Math.PI} boxes={walls} bounds={[0, L, 0, L]} points={pts} onNear={nothing} onMove={onMove} speed={2.2} /></Scene>, [L, hedge, leaf, mz, goals, got, walls, pts, nothing, onMove]);
  return <div className="embed tall">{scene}<div className="embedhud"><Clock s={secs} /><span className="chip">🗝 {got.length} / {goals.length}</span></div><Joystick /><div className="embedfoot"><T b={ins} as="b" say />{got.length >= goals.length && <T b="¡Busca el arco rosa!|Գտիր վարդագույն կամարը։" as="p" />}</div>
    {q !== null && <Panel><Choice q={qs[got.length % 5].q} opts={qs[got.length % 5].o} mode={M} why={qs[got.length % 5].o[0]} onDone={(ok) => { if (!ok) setErrs(errs + 1); play('coin'); setGot([...got, q]); setQ(null); }} /></Panel>}
    {end && <Panel><Result ok={goals.length - errs < 0 ? 0 : goals.length - errs} total={goals.length} secs={secs} onAgain={again} onExit={onExit} title="¡Has salido del laberinto!|Դուրս եկար լաբիրինթոսից։" /></Panel>}</div>;
}
function Key({ p }: { p: [number, number, number] }) { const g = useRef<THREE.Group>(null); useFrame(({ clock }) => { if (g.current) { g.current.rotation.y = clock.elapsedTime * 1.6; g.current.position.y = p[1] + Math.sin(clock.elapsedTime * 2) * 0.1; } }); return <group ref={g} position={p}><mesh material={MAT.gold}><torusGeometry args={[0.16, 0.04, 14, 36]} /></mesh><mesh position-y={-0.35} material={MAT.gold}><boxGeometry args={[0.06, 0.42, 0.05]} /></mesh><mesh position={[0.08, -0.5, 0]} material={MAT.gold}><boxGeometry args={[0.14, 0.05, 0.05]} /></mesh></group>; }

const GAMES: { id: string; icon: string; b: Bi; d: Bi; C: ComponentType<P> }[] = [
  { id: 'detective', icon: '🔎', b: 'Detective de animales|Կենդանիների խուզարկու', d: 'Tres pistas, un animal.|Երեք հուշում, մեկ կենդանի։', C: Detective }, { id: 'memory', icon: '🃏', b: 'Memory Challenge|Հիշողության մարտահրավեր', d: 'Une imágenes y palabras.|Միացրու պատկերներն ու բառերը։', C: Memory },
  { id: 'escape', icon: '🗝', b: 'Escape Room|Փախուստի սենյակ', d: 'Tres salas llenas de enigmas.|Երեք սենյակ՝ լի հանելուկներով։', C: Escape }, { id: 'quien', icon: '🎭', b: '¿Quién soy?|Ո՞վ եմ ես', d: 'Descripciones que hacen pensar.|Մտածել տվող նկարագրություններ։', C: Who },
  { id: 'secreta', icon: '🔤', b: 'La palabra secreta|Գաղտնի բառը', d: 'Descubre la palabra letra a letra.|Բացահայտիր բառը տառ առ տառ։', C: Secret }, { id: 'pasapalabra', icon: '⏱', b: 'Pasapalabra|Պասապալաբրա', d: '27 letras contra el reloj.|27 տառ ժամանակի դեմ։', C: Pasa },
  { id: 'precio', icon: '💶', b: 'El precio correcto|Ճիշտ գինը', d: 'Descuentos, totales y cambios.|Զեղչեր, գումարներ և մանր։', C: Price }, { id: 'ordena', icon: '💬', b: 'Ordena el diálogo|Դասավորիր երկխոսությունը', d: 'Reconstruye la conversación.|Վերականգնիր զրույցը։', C: OrderD },
  { id: 'error', icon: '🩹', b: 'Encuentra el error|Գտիր սխալը', d: 'Una palabra no encaja.|Մի բառ չի համապատասխանում։', C: FindErr }, { id: 'escucha', icon: '🎧', b: 'Escucha y responde|Լսիր և պատասխանիր', d: 'Entrena tu oído.|Մարզիր լսողությունդ։', C: Listen },
  { id: 'harias', icon: '⚖️', b: '¿Qué harías tú?|Ի՞նչ կանեիր դու', d: 'Decide y explica por qué.|Որոշիր և բացատրիր ինչու։', C: What }, { id: 'puzzle', icon: '🧩', b: 'Puzzle 3D|3D փազլ', d: 'Monta la imagen pieza a pieza.|Հավաքիր պատկերը մաս առ մաս։', C: Puzzle },
  { id: 'laberinto', icon: '🌿', b: 'El laberinto|Լաբիրինթոսը', d: 'Oriéntate con instrucciones.|Կողմնորոշվիր ցուցումներով։', C: MazeGame },
];
export default function Games({ onExit }: { onExit: () => void }) {
  const [id, set] = useState<string | null>(null), [k, setK] = useState(0), done = useGame((s) => s.done), g = GAMES.find((x) => x.id === id), won = useRef(-1);
  if (g) return <Page title={g.b} sub={g.d} onExit={() => set(null)} back="Juegos|Խաղեր"><g.C key={k} onExit={() => set(null)} again={() => setK(k + 1)} win={(st) => { if (won.current === k) return; won.current = k; complete('juego:' + g.id, st); count('juegos'); reward(st * 4, st * 12); }} /></Page>;
  return <Page title="Desafíos de inteligencia|Մտավոր մարտահրավերներ" sub="Trece juegos para pensar, escuchar y decidir en español.|Տասներեք խաղ՝ իսպաներեն մտածելու, լսելու և որոշելու համար։" onExit={onExit}><div className="grid cards">{GAMES.map((x) => <article className="card" key={x.id}><header><span className="bigico">{x.icon}</span><div><T b={x.b} as="h3" /><T b={x.d} as="p" /></div></header><footer><Stars n={done['juego:' + x.id] ?? 0} /><B b="Jugar|Խաղալ" className="primary small" onClick={() => { won.current = -1; setK((v) => v + 1); set(x.id); }} /></footer></article>)}</div></Page>;
}
