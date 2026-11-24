import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { es, euro, fill, join, pick, sample, shuffle, type Bi } from '../core/bi';
import { DEPT, P, PRODUCTS } from '../data/products';
import { DECOR, REQUESTS, UNLOCK, type Request } from '../data/shop';
import { CUSTOMERS, NPCS } from '../data/npcs';
import { count, reward, right, setOwn, toast, useGame, wrong } from '../core/store';
import { ambient, play } from '../core/audio';
import { speak } from '../core/speech';
import { B, T } from '../ui/T';
import { Choice, Panel, Portrait } from '../ui/kit';
import { Beast, Human, Lights, MAT, Scene, Shelf, Sign, bx, vc, woodTex } from '../three/world';
import { Plant } from '../three/ShopScene';
import { merge } from '../three/goods';

const cost = (id: string) => Math.round(P[id].price * 0.6 * 100) / 100;
function Cam({ serving }: { serving: boolean }) {
  const { camera, size } = useThree(), v = useMemo(() => new THREE.Vector3(), []), l = useRef(new THREE.Vector3(0, 1, -2)), tgt = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => { const t = clock.elapsedTime, n = size.width < size.height ? 1.35 : 1; v.set(serving ? 0.75 : Math.sin(t * 0.1) * 1.1, serving ? 1.62 : 2.1, serving ? 2.9 * n : 4.4 * n); camera.position.lerp(v, 0.03); l.current.lerp(tgt.set(serving ? -0.3 : 0, serving ? 1.18 : 0.95, serving ? 0 : -1.5), 0.04); camera.lookAt(l.current); });
  return null;
}
function Customer({ id }: { id: string }) {
  const g = useRef<THREE.Group>(null), [mood, setMood] = useState<'walk' | 'talk'>('walk'), t = useRef(0);
  useFrame((_, dt) => { if (!g.current) return; t.current = Math.min(1, t.current + dt * 0.45); const k = t.current; g.current.position.set(THREE.MathUtils.lerp(-4.4, -0.55, k), 0, THREE.MathUtils.lerp(2.2, 0.3, k)); g.current.rotation.y = k < 1 ? 2.0 : 0.35; if (k >= 1 && mood === 'walk') setMood('talk'); });
  return <Human id={id} groupRef={g} mood={mood} position={[-4.4, 0, 2.2]} path={undefined} />;
}
function Store3D({ who }: { who: string | null }) {
  const own = useGame((s) => s.own), floor = woodTex('own', '#d2ab8c', [3, 3]), D = (x: string) => own.decor.includes(x);
  const g = useMemo(() => merge([bx(9.4, 3.2, 0.12, 0, 1.6, -3.3, '#f4e2e6'), bx(0.12, 3.2, 8, -4.7, 1.6, 0, '#eadff1'), bx(0.12, 3.2, 8, 4.7, 1.6, 0, '#eadff1'), bx(9.4, 0.12, 0.05, 0, 0.06, -3.22, '#fff'), bx(1.8, 1, 0.6, 1.5, 0.5, 0.9, '#f3e3df'), bx(1.9, 0.06, 0.7, 1.5, 1.03, 0.9, '#c9a27e'), bx(0.4, 0.28, 0.05, 1.9, 1.28, 0.95, '#3c3440'), bx(1.7, 0.12, 0.02, 1.5, 0.75, 1.21, '#d8a3b5')]), []);
  const sofa = useMemo(() => merge([bx(0.8, 0.4, 1.7, -4.1, 0.25, 0.6, '#d9a7bd'), bx(0.2, 0.6, 1.7, -4.45, 0.6, 0.6, '#d298b1')]), []);
  const spots: [number, number, number][] = [[-3, -2.95, 0], [0, -2.95, 0], [3, -2.95, 0], [-4.4, -1.2, Math.PI / 2], [4.4, -1.2, -Math.PI / 2]];
  return (<><Lights area={5} sun={[2, 6, 5]} /><Cam serving={!!who} /><pointLight position={[0, 2.6, 0]} intensity={D('luces') ? 9 : 3} color="#ffdcb8" distance={8} />
    <mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[9.4, 10]} /><meshPhysicalMaterial map={floor} roughness={0.35} clearcoat={0.4} /></mesh><mesh geometry={g} material={vc} castShadow receiveShadow />
    {own.depts.map((d, i) => { const [x, z, r] = spots[i], c = PRODUCTS.filter((p) => p.dept === d).map((p) => p.id), dx = Math.sin(r) * 0.4, dz = Math.cos(r) * 0.4; return <group key={d}><Shelf pids={c} counts={own.shelf} w={2.8} position={[x, 0, z]} rotation={r} color={DEPT[d].color} /><Sign b={DEPT[d].name} color={DEPT[d].color} icon={DEPT[d].icon} position={[x + dx, 2.3, z + dz]} rotation={r} w={1.9} /></group>; })}
    {D('luces') && [-3, -1, 1, 3].map((x) => <mesh key={x} position={[x, 2.75 + Math.abs(x) * 0.05, -0.5]} material={MAT.glow}><sphereGeometry args={[0.09, 20, 16]} /></mesh>)}
    {D('plantas') && <><Plant position={[-4.2, 0, 2.3]} s={1.2} /><Plant position={[4.2, 0, 1.6]} s={1.3} /><Plant position={[1.5, 0, -2.9]} s={0.9} /></>}
    {D('sofa') && <mesh geometry={sofa} material={vc} castShadow />}
    {D('cuadros') && [-1.5, 1.5].map((x) => <group key={x} position={[x, 2.15, -3.2]}><mesh material={MAT.gold}><boxGeometry args={[0.62, 0.5, 0.04]} /></mesh><mesh position-z={0.025}><planeGeometry args={[0.54, 0.42]} /><meshStandardMaterial color={x < 0 ? '#c9b4dd' : '#eabccb'} /></mesh></group>)}
    {D('alfombra') && <mesh rotation-x={-Math.PI / 2} position={[-0.3, 0.006, 0.6]} receiveShadow><circleGeometry args={[1.5, 64]} /><meshStandardMaterial color="#e3a9be" roughness={1} /></mesh>}
    {D('gato') && <Beast id="tabby" position={[0.6, 0, 1.6]} wander={{ x: 0, z: 1.5, r: 1.1 }} />}
    <Human id="gayane" position={[1.5, 0, 0.15]} rotation={-0.6} mood={who ? 'talk' : 'idle'} />{who && <Customer key={who} id={who} />}
  </>);
}
const Row = ({ id, children }: { id: string; children: React.ReactNode }) => <div className="line"><Portrait k={`prod:${id}`} size={54} /><T b={P[id].name} />{children}</div>;
type Tab = 'pedido' | 'estantes' | 'precios' | 'mejoras' | 'cuentas' | 'encargos' | null;
export default function Own({ onExit }: { onExit: () => void }) {
  const own = useGame((s) => s.own), [tab, setTab] = useState<Tab>(null), [day, setDay] = useState<Request[] | null>(null), [ci, setCi] = useState(0), [sum, setSum] = useState<{ income: number; cost: number; served: number } | null>(null);
  useEffect(() => { ambient('tienda'); return () => ambient(null); }, []);
  const avail = PRODUCTS.filter((p) => own.depts.includes(p.dept)), onShelf = Object.values(own.shelf).reduce((a, b) => a + b, 0), priceOf = (id: string) => own.price[id] ?? P[id].price, st = useGame.getState;
  const open = () => {
    const ok = REQUESTS.filter((r) => PRODUCTS.some((p) => own.depts.includes(p.dept) && r.tags.some((t) => p.tags.includes(t))));
    // Se priorizan clientes a los que se puede atender, con alguna petición difícil.
    const can = ok.filter((r) => PRODUCTS.some((p) => (own.shelf[p.id] ?? 0) > 0 && r.tags.some((t) => p.tags.includes(t)))), n = 3 + Math.min(3, own.decor.length);
    setDay(shuffle([...sample(can, n - 1), ...sample(ok.filter((r) => !can.includes(r)), 1)]).slice(0, n)); setCi(0); play('door');
  };
  const order = (id: string, n: number) => { const c = Math.round(cost(id) * n * 100) / 100; if (own.cash < c) { play('bad'); toast('No hay suficiente dinero en la caja.|Դրամարկղում բավական գումար չկա։', '💶'); return; } play('scan'); setOwn({ cash: Math.round((own.cash - c) * 100) / 100, cost: own.cost + c, warehouse: { ...own.warehouse, [id]: (own.warehouse[id] ?? 0) + n } }); };
  const place = (id: string, n: number) => { const k = Math.min(n, own.warehouse[id] ?? 0); if (k <= 0) return; play('click'); setOwn({ warehouse: { ...own.warehouse, [id]: own.warehouse[id] - k }, shelf: { ...own.shelf, [id]: (own.shelf[id] ?? 0) + k } }); };
  const sell = (id: string, pr: number) => { const o = st().own; setOwn({ shelf: { ...o.shelf, [id]: o.shelf[id] - 1 }, cash: Math.round((o.cash + pr) * 100) / 100, income: o.income + pr, served: o.served + 1, rep: Math.min(100, o.rep + 3) }); count('clientes'); };
  const next = () => {
    if (ci + 1 < day!.length) { setCi(ci + 1); play('door'); return; }
    const o = st().own, rec = { day: o.day, income: Math.round(o.income * 100) / 100, cost: Math.round(o.cost * 100) / 100, served: day!.length };
    const no = sample(avail.map((p) => p.id), 2), orders = o.orders.length < 3 ? [...o.orders, { id: Date.now(), items: no, who: pick(CUSTOMERS) }] : o.orders;
    setOwn({ day: o.day + 1, income: 0, cost: 0, history: [...o.history, rec].slice(-14), orders }); setDay(null); setSum(rec); reward(10, 30); play('win');
  };
  return (
    <div className="mode3d">
      <Scene cam={[0, 2.1, 5]} fov={50} fog={false}><Store3D who={day ? day[ci].who : null} /></Scene>
      <div className="hud top"><B b="Menú|Մենյու" icon="‹" className="small" onClick={onExit} /><span className="chip coin">💶 {euro(own.cash)}</span><T b={fill('Día {n}|Օր {n}', { n: own.day })} className="chip" /><T b={fill('Reputación: {n} %|Համբավ՝ {n} %', { n: own.rep })} className="chip" /><span className="chip">📦 {onShelf}</span></div>
      {!day && <div className="dock"><div className="acts">
        <B b="Pedir productos|Պատվիրել ապրանք" icon="🚚" onClick={() => setTab('pedido')} /><B b="Colocar en estantes|Դասավորել դարակներում" icon="🗄️" onClick={() => setTab('estantes')} /><B b="Poner precios|Սահմանել գներ" icon="🏷️" onClick={() => setTab('precios')} /><B b={fill('Encargos ({n})|Պատվերներ ({n})', { n: own.orders.length })} icon="📋" onClick={() => setTab('encargos')} /><B b="Mejorar la tienda|Բարելավել խանութը" icon="🪴" onClick={() => setTab('mejoras')} /><B b="Cuentas|Հաշիվներ" icon="📊" onClick={() => setTab('cuentas')} />
        <B b="Abrir la tienda|Բացել խանութը" icon="🔑" className="primary" disabled={onShelf === 0} onClick={open} /></div>
        {onShelf === 0 && <T b="Los estantes están vacíos: pide productos y colócalos antes de abrir.|Դարակները դատարկ են․ պատվիրիր ապրանք և դասավորիր բացելուց առաջ։" as="p" className="bubble" say />}</div>}
      {day && <Serve key={ci} req={day[ci]} shelf={own.shelf} priceOf={priceOf} onSell={sell} onNext={next} n={`${ci + 1} / ${day.length}`} />}
      {tab === 'pedido' && <Panel onClose={() => setTab(null)}><T b="Pedir productos|Պատվիրել ապրանք" as="h2" say /><T b={fill('Dinero disponible: {x}|Առկա գումար՝ {x}', { x: euro(own.cash) })} as="p" />{avail.map((p) => <Row key={p.id} id={p.id}><T b={fill('Almacén: {n}|Պահեստ՝ {n}', { n: own.warehouse[p.id] ?? 0 })} as="small" /><b>{euro(cost(p.id))}</b><div className="qty"><button type="button" onClick={() => order(p.id, 1)}>+1</button><button type="button" onClick={() => order(p.id, 5)}>+5</button></div></Row>)}</Panel>}
      {tab === 'estantes' && <Panel onClose={() => setTab(null)}><T b="Colocar en estantes|Դասավորել դարակներում" as="h2" say /><B b="Colocarlo todo|Դասավորել ամբողջը" className="primary" onClick={() => { const sh = { ...own.shelf }; Object.entries(own.warehouse).forEach(([k, n]) => { sh[k] = (sh[k] ?? 0) + n; }); setOwn({ shelf: sh, warehouse: {} }); play('good'); }} />{avail.filter((p) => (own.warehouse[p.id] ?? 0) + (own.shelf[p.id] ?? 0) > 0).map((p) => <Row key={p.id} id={p.id}><T b={fill('Almacén: {a} · Estante: {b}|Պահեստ՝ {a} · Դարակ՝ {b}', { a: own.warehouse[p.id] ?? 0, b: own.shelf[p.id] ?? 0 })} as="small" /><div className="qty"><button type="button" onClick={() => place(p.id, 1)}>+1</button><button type="button" onClick={() => place(p.id, 5)}>+5</button></div></Row>)}{!Object.values(own.warehouse).some(Boolean) && <T b="El almacén está vacío.|Պահեստը դատարկ է։" as="p" />}</Panel>}
      {tab === 'precios' && <Panel onClose={() => setTab(null)}><T b="Poner precios|Սահմանել գներ" as="h2" say /><T b="Si el precio es demasiado alto, los clientes no comprarán.|Եթե գինը չափազանց բարձր է, հաճախորդները չեն գնի։" as="p" say />{avail.map((p) => <Row key={p.id} id={p.id}><T b={fill('Coste: {x}|Ինքնարժեք՝ {x}', { x: euro(cost(p.id)) })} as="small" /><div className="qty"><button type="button" onClick={() => setOwn({ price: { ...own.price, [p.id]: Math.max(cost(p.id), Math.round((priceOf(p.id) - 0.5) * 100) / 100) } })}>−</button><b>{euro(priceOf(p.id))}</b><button type="button" onClick={() => setOwn({ price: { ...own.price, [p.id]: Math.round((priceOf(p.id) + 0.5) * 100) / 100 } })}>+</button></div></Row>)}</Panel>}
      {tab === 'mejoras' && <Panel onClose={() => setTab(null)}><T b="Mejorar la tienda|Բարելավել խանութը" as="h2" say />{Object.entries(UNLOCK).map(([d, c]) => <div className="line" key={d}><span className="ico">{DEPT[d].icon}</span><T b={join('Nuevo departamento:|Նոր բաժին՝', DEPT[d].name)} />{own.depts.includes(d) ? <span>✅</span> : <B b={`Abrir · ${euro(c)}|Բացել · ${euro(c)}`} disabled={own.cash < c} onClick={() => { setOwn({ cash: own.cash - c, depts: [...own.depts, d] }); play('win'); }} />}</div>)}{DECOR.map((d) => <div className="line" key={d.id}><div><T b={d.b} as="b" /><T b={d.d} as="p" /></div>{own.decor.includes(d.id) ? <span>✅</span> : <B b={`Comprar · ${euro(d.price)}|Գնել · ${euro(d.price)}`} disabled={own.cash < d.price} onClick={() => { setOwn({ cash: own.cash - d.price, decor: [...own.decor, d.id], rep: Math.min(100, own.rep + 5) }); play('coin'); }} />}</div>)}</Panel>}
      {tab === 'encargos' && <Panel onClose={() => setTab(null)}><T b="Encargos de clientes|Հաճախորդների պատվերներ" as="h2" say />{!own.orders.length && <T b="Todavía no hay encargos. Llegarán al cerrar la tienda.|Դեռ պատվերներ չկան։ Կգան խանութը փակելիս։" as="p" />}{own.orders.map((o) => { const ok = o.items.every((i) => (own.shelf[i] ?? 0) + (own.warehouse[i] ?? 0) > 0), tot = o.items.reduce((s, i) => s + P[i].price, 0); return <div className="card" key={o.id}><header><Portrait k={`npc:${o.who}`} size={56} /><b>{NPCS[o.who].name}</b><b className="price">{euro(tot)}</b></header><T b={fill('Necesito que me prepares: {a} y {b}. ¡Gracias!|Խնդրում եմ պատրաստես՝ {a} և {b}։ Շնորհակալություն։', { a: P[o.items[0]].name, b: P[o.items[1] ?? o.items[0]].name })} as="p" say /><B b="Entregar el encargo|Հանձնել պատվերը" className="primary" disabled={!ok} onClick={() => { const sh = { ...own.shelf }, wh = { ...own.warehouse }; o.items.forEach((i) => { if (wh[i]) wh[i]--; else sh[i]--; }); setOwn({ shelf: sh, warehouse: wh, cash: Math.round((own.cash + tot) * 100) / 100, income: own.income + tot, orders: own.orders.filter((x) => x.id !== o.id), rep: Math.min(100, own.rep + 4) }); play('coin'); right('Mi tienda', 15, 5); }} /></div>; })}</Panel>}
      {tab === 'cuentas' && <Panel onClose={() => setTab(null)}><T b="Cuentas de la tienda|Խանութի հաշիվները" as="h2" say />{!own.history.length && <T b="Aún no has cerrado ningún día.|Դեռ ոչ մի օր չես փակել։" as="p" />}<table className="tbl"><thead><tr>{['Día|Օր', 'Ingresos|Եկամուտ', 'Gastos|Ծախսեր', 'Beneficio|Շահույթ', 'Clientes|Հաճախորդներ'].map((h) => <th key={h}><T b={h} /></th>)}</tr></thead><tbody>{own.history.map((h) => <tr key={h.day}><td>{h.day}</td><td>{euro(h.income)}</td><td>{euro(h.cost)}</td><td className={h.income - h.cost < 0 ? 'neg' : ''}>{euro(h.income - h.cost)}</td><td>{h.served}</td></tr>)}</tbody></table></Panel>}
      {sum && <Panel onClose={() => setSum(null)}><CloseDay s={sum} onDone={() => setSum(null)} /></Panel>}
    </div>
  );
}
function CloseDay({ s, onDone }: { s: { income: number; cost: number }; onDone: () => void }) {
  const p = Math.round((s.income - s.cost) * 100) / 100;
  const opts = useMemo(() => [...new Set([p, p + 5, s.income + s.cost + 1, p - 3.5].map((x) => euro(x)))], [p, s]);
  return <><T b="Cerramos la tienda. ¡Hora de contar!|Փակում ենք խանութը։ Հաշվելու ժամն է։" as="h2" say /><Choice q={fill('Los ingresos son {a} y los gastos, {b}. ¿Cuál es el beneficio?|Եկամուտը {a} է, ծախսերը՝ {b}։ Որքա՞ն է շահույթը։', { a: euro(s.income), b: euro(s.cost) })} opts={opts} mode="Mi tienda" why="Beneficio = ingresos − gastos.|Շահույթ = եկամուտ − ծախսեր։" onDone={onDone} /></>;
}
function Serve({ req, shelf, priceOf, onSell, onNext, n }: { req: Request; shelf: Record<string, number>; priceOf: (id: string) => number; onSell: (id: string, pr: number) => void; onNext: () => void; n: string }) {
  const [st, setSt] = useState<'pick' | 'why' | 'pay' | 'end'>('pick'), [sel, setSel] = useState<string | null>(null), [msg, setMsg] = useState<Bi | null>(null), [given] = useState(() => Math.random());
  const stock = PRODUCTS.filter((p) => (shelf[p.id] ?? 0) > 0), npc = NPCS[req.who], fits = (id: string) => req.tags.some((t) => P[id].tags.includes(t));
  useEffect(() => { speak(es(req.b), { male: npc.male }); }, [req, npc]);
  const pr = sel ? priceOf(sel) : 0, cash = [5, 10, 20, 50, 100].filter((x) => x > pr)[given > 0.6 ? 1 : 0] ?? 100, ch = Math.round((cash - pr) * 100) / 100;
  const payOpts = useMemo(() => [...new Set([ch, ch + 1, ch + 0.5, Math.max(0.2, ch - 1)].map((x) => euro(x)))], [ch]);
  const whyOpts = useMemo(() => [req.why[0], ...sample(req.why.slice(1), 3)], [req]);
  const say = (b: Bi) => { setMsg(b); speak(es(b), { male: npc.male }); };
  const choose = (id: string) => {
    if (!fits(id)) { play('bad'); wrong('Mi tienda', req.b, P[id].name, P[PRODUCTS.find((p) => fits(p.id))!.id].name, P[id].desc); say(fill('Gracias, pero «{x}» no es lo que necesito. ¿Tienes otra cosa?|Շնորհակալություն, բայց «{x}»-ն ինձ պետք չէ։ Ուրիշ բան ունե՞ս։', { x: P[id].name })); return; }
    if (priceOf(id) > req.max) { play('bad'); say(fill('Me gusta, pero {x} es demasiado caro. No quiero gastar más de {y}.|Հավանում եմ, բայց {x}-ն չափազանց թանկ է։ Չեմ ուզում {y}-ից ավելի ծախսել։', { x: euro(priceOf(id)), y: euro(req.max) })); return; }
    play('good'); setSel(id); setSt('why'); say('¡Qué interesante! ¿Por qué me lo recomiendas?|Հետաքրքիր է։ Ինչո՞ւ եք դա խորհուրդ տալիս։');
  };
  return (
    <div className="dock serve">
      <div className="orderbox"><Portrait k={`npc:${req.who}`} size={72} /><div><b>{npc.name} <small>{n}</small></b><T b={req.b} as="p" say />{msg && <T b={msg} as="p" className="reply" say />}</div></div>
      {st === 'pick' && <><div className="strip">{stock.map((p) => <button type="button" key={p.id} className="pcard" data-es={es(p.name)} data-hy={p.name.split('|')[1]} onClick={() => choose(p.id)}><Portrait k={`prod:${p.id}`} size={74} /><span>{es(p.name)}</span><b>{euro(priceOf(p.id))}</b><i className="hydot">Ա</i></button>)}</div>
        <B b="Lo siento, ahora no tenemos. Lo pediré para usted.|Ցավում եմ, հիմա չունենք։ Կպատվիրեմ Ձեզ համար։" onClick={() => { const any = stock.some((p) => fits(p.id) && priceOf(p.id) <= req.max); if (any) { play('bad'); say('¿Seguro? Creo que en los estantes hay algo para mí.|Հաստա՞տ։ Կարծում եմ՝ դարակներում ինձ համար բան կա։'); } else { play('good'); right('Mi tienda', 4, 1); say('De acuerdo, gracias por tu sinceridad. Volveré otro día.|Լավ, շնորհակալ եմ անկեղծության համար։ Մի ուրիշ օր կգամ։'); setSt('end'); } }} /></>}
      {st === 'why' && <Choice ctx={fill('Explica tu recomendación: {x}|Բացատրիր խորհուրդդ՝ {x}', { x: P[sel!].name })} opts={whyOpts} mode="Mi tienda" why="Relaciona la razón con la necesidad del cliente.|Պատճառը կապիր հաճախորդի կարիքի հետ։" onDone={() => { setSt('pay'); say('¡Me has convencido! Me lo llevo.|Համոզեցիր։ Վերցնում եմ։'); }} />}
      {st === 'pay' && <Choice q={fill('Cuesta {a}. El cliente te da {b}. ¿Cuánto cambio le devuelves?|Արժե {a}։ Հաճախորդը տալիս է {b}։ Որքա՞ն մանր ես վերադարձնում։', { a: euro(pr), b: euro(cash) })} opts={payOpts} mode="Mi tienda" why={fill('{b} − {a} = {c}|{b} − {a} = {c}', { a: euro(pr), b: euro(cash), c: euro(ch) })} onDone={(ok) => { play('coin'); onSell(sel!, pr); say(ok ? '¡Muchas gracias! Vuelvo pronto.|Շատ շնորհակալություն։ Շուտով կվերադառնամ։' : 'Creo que así está bien. ¡Gracias!|Կարծում եմ՝ այսպես ճիշտ է։ Շնորհակալություն։'); setSt('end'); }} />}
      {st === 'end' && <B b="Siguiente|Հաջորդը" className="primary" onClick={onNext} />}
    </div>
  );
}
