import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type Bi, euro, es, fill, shuffle } from '../core/bi';
import { A, ANIMALS, DEPT, P, PRODUCTS } from '../data/products';
import { CHECKOUT, DIALOGUES } from '../data/dialogues';
import { checkMission, type Mission } from '../data/missions';
import { NPCS } from '../data/npcs';
import { addInventory, collect, complete, count, lvlRank, right, reward, spend, toast, useGame, wrong } from '../core/store';
import { play, type Sfx } from '../core/audio';
import { speak } from '../core/speech';
import { B, T } from '../ui/T';
import { Clock, Dialogue, Panel, Portrait, Stars, useClock } from '../ui/kit';
import { ctl, pad } from '../three/world';
import { ShopMap, ShopScene } from '../three/ShopScene';
import { goodGroup } from '../three/goods';
import { Beast, Lights } from '../three/world';

/* Palanca táctil */
export function Joystick() {
  const [k, set] = useState({ x: 0, y: 0 }), ref = useRef<HTMLDivElement>(null), id = useRef(-1);
  const mv = (e: React.PointerEvent) => { if (e.pointerId !== id.current) return; const r = ref.current!.getBoundingClientRect(); let x = (e.clientX - r.left - r.width / 2) / (r.width / 2), y = (e.clientY - r.top - r.height / 2) / (r.height / 2); const l = Math.hypot(x, y); if (l > 1) { x /= l; y /= l; } pad.x = x; pad.y = y; set({ x, y }); };
  const end = () => { id.current = -1; pad.x = pad.y = 0; set({ x: 0, y: 0 }); };
  useEffect(() => () => { pad.x = pad.y = 0; }, []);
  return <div ref={ref} className="joy" onPointerDown={(e) => { id.current = e.pointerId; e.currentTarget.setPointerCapture(e.pointerId); mv(e); }} onPointerMove={mv} onPointerUp={end} onPointerCancel={end}><i style={{ transform: `translate(${k.x * 34}px,${k.y * 34}px)` }} /></div>;
}
export function CamToggle() {
  const [th, set] = useState(ctl.third);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.code === 'KeyV' && !/INPUT|TEXTAREA/.test((e.target as HTMLElement).tagName)) { ctl.third = !ctl.third; set(ctl.third); } }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return <B b={th ? 'Primera persona|Առաջին դեմքով' : 'Ver a Gayane|Տեսնել Գայանեին'} icon="🎥" className="small" onClick={() => { ctl.third = !ctl.third; set(ctl.third); }} />;
}
function Spin({ id, kind }: { id: string; kind: 'prod' | 'animal' }) {
  const g = useRef<THREE.Group>(null), drag = useRef({ on: false, x: 0, y: 0, vy: 0.5, rx: 0.1 });
  const obj = useMemo(() => {
    if (kind === 'animal') return null;
    const o = goodGroup(id), box = new THREE.Box3().setFromObject(o), c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3()), w = new THREE.Group(); o.position.sub(c); w.add(o); w.scale.setScalar(0.42 / Math.max(s.x, s.y, s.z)); return w;
  }, [id, kind]);
  useFrame((_, dt) => { if (!g.current) return; if (!drag.current.on) drag.current.vy += (0.35 - drag.current.vy) * dt; g.current.rotation.y += drag.current.vy * dt; g.current.rotation.x = drag.current.rx; });
  useEffect(() => {
    const d = drag.current, down = (e: PointerEvent) => { if ((e.target as HTMLElement).closest('.spin')) { d.on = true; d.x = e.clientX; d.y = e.clientY; d.vy = 0; } }, mv = (e: PointerEvent) => { if (!d.on || !g.current) return; g.current.rotation.y += (e.clientX - d.x) * 0.012; d.rx = THREE.MathUtils.clamp(d.rx + (e.clientY - d.y) * 0.008, -0.8, 0.9); d.x = e.clientX; d.y = e.clientY; }, up = () => { d.on = false; };
    window.addEventListener('pointerdown', down); window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
  }, []);
  const k = kind === 'animal' ? A[id].kind : '', sc = ({ perro: 0.52, gato: 0.8, conejo: 1.1, hamster: 2.2, pajaro: 1.15, pez: 1.9 } as Record<string, number>)[k] ?? 1, y = k === 'pez' ? 0 : -0.23;
  return <group ref={g} rotation-y={kind === 'animal' ? -0.5 : -0.3}>{obj ? <primitive object={obj} /> : <group position-y={y} scale={sc}><Beast id={id} shells={16} mood="happy" /></group>}</group>;
}
export function View3D({ id, kind }: { id: string; kind: 'prod' | 'animal' }) {
  return <div className="spin"><Canvas dpr={[1, 2]} camera={{ position: [0, 0.06, 0.95], fov: 36, near: 0.01 }} gl={{ antialias: true }}><color attach="background" args={['#f6e7ea']} /><Lights area={1} sun={[1, 2, 2]} intensity={2} /><Spin id={id} kind={kind} /></Canvas></div>;
}
export type Cart = Record<string, number>;
export const cartTotal = (c: Cart) => Math.round(Object.entries(c).reduce((s, [k, n]) => s + P[k].price * n, 0) * 100) / 100;
export function ProductPanel({ id, cart, setCart, onClose, canBuy = true }: { id: string; cart: Cart; setCart: (c: Cart) => void; onClose: () => void; canBuy?: boolean }) {
  const p = P[id], [n, setN] = useState(1);
  useEffect(() => { speak(es(p.name)); }, [p]);
  return (
    <Panel onClose={onClose} className="product">
      <View3D id={id} kind="prod" />
      <div>
        <T b={DEPT[p.dept].name} as="small" className="chip" />
        <T b={p.name} as="h2" say />
        <T b={p.desc} as="p" say />
        <p className="price">{euro(p.price)}</p>
        <div className="tags">{p.tags.filter((t) => TAGS[t]).map((t) => <T key={t} b={TAGS[t]} className="chip" />)}</div>
        {canBuy && <>
          <div className="qty"><button type="button" aria-label="Menos" onClick={() => setN(Math.max(1, n - 1))}>−</button><b>{n}</b><button type="button" aria-label="Más" onClick={() => setN(Math.min(9, n + 1))}>+</button><span>{euro(p.price * n)}</span></div>
          <B b="Añadir a la cesta|Ավելացնել զամբյուղ" icon="🧺" className="primary" onClick={() => { setCart({ ...cart, [id]: (cart[id] ?? 0) + n }); play('coin'); toast(fill('Has añadido: {x}|Ավելացրիր՝ {x}', { x: p.name }), '🧺'); onClose(); }} />
        </>}
        <B b="Dejar en el estante|Թողնել դարակին" onClick={onClose} />
      </div>
    </Panel>
  );
}
const TAGS: Record<string, Bi> = { perro: 'Para perros|Շների համար', gato: 'Para gatos|Կատուների համար', conejo: 'Para conejos|Ճագարների համար', hamster: 'Para hámsteres|Գերմանամկների համար', pajaro: 'Para pájaros|Թռչունների համար', pez: 'Para peces|Ձկների համար', humeda: 'Comida húmeda|Խոնավ կեր', azul: 'Azul|Կապույտ', rojo: 'Rojo|Կարմիր' };
function Aisle({ dept, onPick, onClose }: { dept: string; onPick: (id: string) => void; onClose: () => void }) {
  const d = DEPT[dept], [by, setBy] = useState<'todo' | 'precio'>('todo');
  const ps = PRODUCTS.filter((p) => p.dept === dept).sort((a, b) => (by === 'precio' ? a.price - b.price : 0));
  return (
    <Panel onClose={onClose}>
      <T b={d.name} as="h2" say /><T b={d.info} as="p" say />
      <div className="row"><B b="Comparar precios|Համեմատել գները" icon="⚖️" className="small" onClick={() => setBy(by === 'todo' ? 'precio' : 'todo')} /></div>
      <div className="grid prods">{ps.map((p) => <button type="button" key={p.id} className="pcard" data-es={es(p.name)} data-hy={p.name.split('|')[1]} onClick={() => onPick(p.id)}><Portrait k={`prod:${p.id}`} size={92} /><span>{es(p.name)}</span><b>{euro(p.price)}</b><i className="hydot">Ա</i></button>)}</div>
    </Panel>
  );
}
export function AnimalPanel({ dept, onClose }: { dept: string; onClose: () => void }) {
  const d = DEPT[dept], list = ANIMALS.filter((a) => d.animals!.includes(a.id)), [i, setI] = useState(0), a = list[i], owned = useGame((s) => s.animals).includes(a.id);
  useEffect(() => { play(d.sfx as Sfx); }, [i, d]);
  return (
    <Panel onClose={onClose} className="product">
      <View3D key={a.id} id={a.id} kind="animal" />
      <div>
        <T b={d.name} as="small" className="chip" />
        <T b={`${a.pet}: ${es(a.name)}|${a.pet}՝ ${a.name.split('|')[1]}`} as="h2" say />
        <T b={a.fact} as="p" say /><T b={d.info} as="p" say />
        <div className="row">
          <B b="Acariciar|Շոյել" icon="🤍" onClick={() => { play(dept === 'gatos' ? 'ronroneo' : (d.sfx as Sfx)); if (!owned) collect(a.id); else reward(0, 1); toast(fill('¡A {x} le encanta!|{x}ին շատ դուր եկավ։', { x: a.pet }), '🤍'); }} className="primary" />
          <B b="Escuchar su sonido|Լսել ձայնը" icon="🔊" onClick={() => play(d.sfx as Sfx)} />
        </div>
        <div className="row">{list.map((x, j) => <button type="button" key={x.id} className={`thumbbtn ${j === i ? 'on' : ''}`} onClick={() => setI(j)} aria-label={x.pet}><Portrait k={`animal:${x.id}`} size={62} /></button>)}</div>
      </div>
    </Panel>
  );
}
/** Pago: conversación con la cajera y, en efectivo, cálculo del cambio. */
export function Checkout({ cart, budget, onPaid, onClose }: { cart: Cart; budget?: number; onPaid: () => void; onClose: () => void }) {
  const total = cartTotal(cart), [step, setStep] = useState<'talk' | 'cash'>('talk'), [given, setGiven] = useState(0), [chg, setChg] = useState<string | null>(null);
  const bills = [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1], paid = given >= total - 0.001, change = Math.round((given - total) * 100) / 100;
  const opts = useMemo(() => shuffle([...new Set([change, change + 1, Math.abs(change - 0.5) === change ? change + 2 : Math.abs(change - 0.5), change + 0.1].map((x) => euro(x)))]), [change]);
  const [ask, setAsk] = useState(false);
  return (
    <Panel onClose={onClose}>
      {step === 'talk' ? (
        <Dialogue script={CHECKOUT} mode="Compras" vars={(b) => fill(b, { total: euro(total) })} onClose={onClose}
          onEnd={(_g, _e, i) => { if (CHECKOUT.nodes[i].label === 'efe') setStep('cash'); else { play('scan'); onPaid(); } }} />
      ) : (
        <div className="cash">
          <T b="Cuenta el dinero|Հաշվիր գումարը" as="h2" />
          <p className="big">{euro(total)}</p>
          {!ask ? <>
            <T b={fill('Has puesto {x} sobre el mostrador.|Վաճառասեղանին դրել ես {x}։', { x: euro(given) })} as="p" />
            <div className="bills">{bills.map((b) => <button type="button" key={b} className={b >= 5 ? 'bill' : 'coin'} onClick={() => { play('coin'); setGiven(Math.round((given + b) * 100) / 100); }}>{b >= 1 ? `${b} €` : `${b * 100} c`}</button>)}</div>
            <div className="row"><B b="Empezar de nuevo|Սկսել նորից" onClick={() => setGiven(0)} /><B b="Entregar el dinero|Տալ գումարը" className="primary" disabled={!paid || (budget !== undefined && given > Math.max(budget, 50) * 2)} onClick={() => (change === 0 ? onPaid() : setAsk(true))} /></div>
          </> : <>
            <T b={fill('Has entregado {x}. ¿Cuánto dinero te tiene que devolver Carmen?|Տվեցիր {x}։ Որքա՞ն պետք է վերադարձնի Կարմենը։', { x: euro(given) })} as="p" say />
            <div className="opts">{opts.map((o) => <button type="button" key={o} className={`opt ${chg === o ? 'ko' : ''}`} onClick={() => { if (o === euro(change)) { right('Compras'); play('good'); onPaid(); } else { play('bad'); setChg(o); wrong('Compras', fill('Total: {a}. Entregas {b}. ¿Cambio?|Ընդհանուր՝ {a}։ Տալիս ես {b}։ Մանրը՞', { a: euro(total), b: euro(given) }), o, euro(change), 'Resta el total de la cantidad entregada.|Տված գումարից հանիր ընդհանուրը։'); } }}>{o}</button>)}</div>
            {chg && <div className="fb ko"><T b={fill('Todavía no: {a} menos {b}.|Դեռ ոչ՝ {a} հանած {b}։', { a: euro(given), b: euro(total) })} /></div>}
          </>}
        </div>
      )}
    </Panel>
  );
}
export function CartPanel({ cart, setCart, onClose, onPay, coins, budget }: { cart: Cart; setCart: (c: Cart) => void; onClose: () => void; onPay?: () => void; coins?: number; budget?: number }) {
  const ids = Object.keys(cart).filter((k) => cart[k] > 0), t = cartTotal(cart), lim = budget ?? coins ?? Infinity;
  return (
    <Panel onClose={onClose}>
      <T b="Mi cesta|Իմ զամբյուղը" as="h2" />
      {!ids.length && <T b="La cesta está vacía. ¡Explora los estantes!|Զամբյուղը դատարկ է։ Զննիր դարակները։" as="p" />}
      {ids.map((k) => <div key={k} className="line"><Portrait k={`prod:${k}`} size={54} /><T b={P[k].name} /><div className="qty"><button type="button" aria-label="Menos" onClick={() => setCart({ ...cart, [k]: cart[k] - 1 })}>−</button><b>{cart[k]}</b><button type="button" aria-label="Más" onClick={() => setCart({ ...cart, [k]: cart[k] + 1 })}>+</button></div><b>{euro(P[k].price * cart[k])}</b></div>)}
      <p className="big">Total: {euro(t)} {lim < Infinity && <small className={t > lim ? 'neg' : ''}>/ {euro(lim)}</small>}</p>
      {onPay && ids.length > 0 && <B b="Ir a la caja|Գնալ դրամարկղ" className="primary" icon="💶" onClick={onPay} />}
    </Panel>
  );
}
/** Tienda 3D: exploración libre o misión de compras. */
export function Shop({ mission, onExit, onDone }: { mission?: Mission; onExit: () => void; onDone?: (stars: number, secs: number) => void }) {
  const [near, setNear] = useState<string | null>(null), [ui, setUi] = useState<{ k: string; id?: string } | null>(null), [cart, setCart] = useState<Cart>({}), [pos, setPos] = useState({ x: 0, z: 7, yaw: 0 }), coins = useGame((s) => s.coins), done = useGame((s) => s.done), [secs] = useClock(!ui || ui.k !== 'fin'), [tries, setTries] = useState(0), [stars, setStars] = useState(0);
  const last = useRef(0);
  useEffect(() => { ctl.locked = !!ui; pad.x = pad.y = 0; }, [ui]);
  useEffect(() => { if (mission) setUi({ k: 'brief' }); }, [mission]);
  const act = useCallback((id: string | null) => {
    if (!id) return;
    if (id.startsWith('npc:')) return setUi({ k: 'npc', id: id.slice(4) });
    if (id === 'caja') return setUi({ k: 'cart' });
    setUi({ k: DEPT[id].animals ? 'animal' : 'aisle', id });
  }, []);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.code === 'KeyE' && !ui && !/INPUT|TEXTAREA/.test((e.target as HTMLElement).tagName)) act(near); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [near, ui, act]);
  const onMove = useCallback((x: number, z: number, yaw: number) => { const t = performance.now(); if (t - last.current > 160) { last.current = t; setPos((p) => (Math.abs(p.x - x) + Math.abs(p.z - z) + Math.abs(p.yaw - yaw) > 0.02 ? { x, z, yaw } : p)); } }, []);
  const scene = useMemo(() => <ShopScene onNear={setNear} onProduct={(id) => setUi({ k: 'prod', id })} onNpc={(id) => setUi(id === 'carmen' ? { k: 'cart' } : { k: 'npc', id })} onAnimal={(id) => setUi({ k: 'animal', id })} onMove={onMove} />, [onMove]);
  const close = () => setUi(null), total = cartTotal(cart), nItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const label: Bi | null = near ? (near.startsWith('npc:') ? `Hablar con ${NPCS[near.slice(4)].name}|Խոսել՝ ${NPCS[near.slice(4)].name}` : DEPT[near].name) : null;
  const npcScripts = ui?.k === 'npc' ? DIALOGUES.filter((d) => d.npc === ui.id).sort((a, b) => Number(!!done[a.id]) - Number(!!done[b.id]) || lvlRank(a.lvl) - lvlRank(b.lvl)) : [];
  const script = ui?.k === 'talk' ? DIALOGUES.find((d) => d.id === ui.id) : undefined;
  const check = mission && checkMission(mission, cart);
  const pay = () => {
    if (mission) { if (!check!.ok) { setTries((t) => t + 1); play('bad'); setUi({ k: 'review' }); } else setUi({ k: 'pay' }); }
    else if (coins < total) { play('bad'); toast('No tienes suficiente dinero. Quita algún producto.|Բավական գումար չունես։ Որևէ ապրանք հանիր։', '💶'); } else setUi({ k: 'pay' });
  };
  const paid = () => {
    play('coin');
    if (mission) { const st = tries === 0 ? 3 : tries === 1 ? 2 : 1; setStars(st); complete('mision:' + mission.id, st); count('misiones'); right('Compras', 30, 12 * st); setUi({ k: 'fin' }); }
    else { spend(total); Object.entries(cart).forEach(([k, n]) => n && addInventory(k, n)); setCart({}); count('compras'); reward(0, 15); setUi({ k: 'thanks' }); }
  };
  return (
    <div className="mode3d">
      {scene}
      <div className="hud top"><B b="Menú|Մենյու" icon="‹" className="small" onClick={onExit} /><CamToggle />
        {mission && <><B b="Ver el encargo|Տեսնել հանձնարարությունը" icon="📜" className="small" onClick={() => setUi({ k: 'brief' })} /><Clock s={secs} /></>}
        <button type="button" className="btn small" data-es="Cesta" data-hy="Զամբյուղ" onClick={() => setUi({ k: 'basket' })}>🧺 {nItems} · {euro(total)}<i className="hydot">Ա</i></button>
        {!mission && <span className="chip coin">🪙 {euro(coins)}</span>}{mission && <span className={`chip ${total > mission.budget ? 'neg' : ''}`}>💶 {euro(mission.budget)}</span>}
      </div>
      <ShopMap pos={pos} /><Joystick />
      <div className="help"><T b="WASD o flechas: caminar · Arrastra: mirar · E: interactuar · Toca un producto para cogerlo|WASD կամ սլաքներ՝ քայլել · Քաշիր՝ նայել · E՝ փոխազդել · Դիպչիր ապրանքին՝ վերցնելու" /></div>
      {label && !ui && <div className="prompt"><T b={label} as="b" say /><B b="Interactuar|Փոխազդել" icon="E" className="primary" onClick={() => act(near)} /></div>}
      {ui?.k === 'prod' && <ProductPanel id={ui.id!} cart={cart} setCart={setCart} onClose={close} />}
      {ui?.k === 'aisle' && <Aisle dept={ui.id!} onPick={(id) => setUi({ k: 'prod', id })} onClose={close} />}
      {ui?.k === 'animal' && <AnimalPanel dept={ui.id!} onClose={close} />}
      {(ui?.k === 'cart' || ui?.k === 'basket') && <CartPanel cart={cart} setCart={setCart} onClose={close} onPay={ui.k === 'cart' ? pay : undefined} coins={mission ? undefined : coins} budget={mission?.budget} />}
      {ui?.k === 'npc' && <Panel onClose={close}><header className="npchead"><Portrait k={`npc:${ui.id}`} size={110} /><div><h2>{NPCS[ui.id!].name}</h2><T b={NPCS[ui.id!].role} as="p" /><T b="¿De qué quieres hablar, Gayane?|Ինչի՞ մասին ես ուզում խոսել, Գայանե՛։" as="p" say /></div></header>
        <div className="list">{npcScripts.map((d) => <button type="button" className="opt" key={d.id} data-es={es(d.title)} data-hy={d.title.split('|')[1]} onClick={() => setUi({ k: 'talk', id: d.id })}><span className="chip">{d.lvl}</span><span>{es(d.title)}</span>{done[d.id] ? <Stars n={done[d.id]} /> : null}<i className="hydot">Ա</i></button>)}</div></Panel>}
      {script && <Panel onClose={close}><Dialogue key={script.id} script={script} mode="Conversación" onClose={close} onEnd={(g, e) => { const st = e === 0 ? 3 : e < 3 ? 2 : 1; complete(script.id, Math.min(g, st)); count('dialogos'); reward(6, 20); close(); }} /></Panel>}
      {ui?.k === 'pay' && <Checkout cart={cart} budget={mission?.budget} onPaid={paid} onClose={close} />}
      {ui?.k === 'thanks' && <Panel onClose={close}><T b="¡Gracias por tu compra, Gayane!|Շնորհակալություն գնման համար, Գայանե՛։" as="h2" say /><T b="Los productos están ahora en tu inventario.|Ապրանքներն այժմ քո գույքացանկում են։" as="p" say /><B b="Seguir explorando|Շարունակել զննել" className="primary" onClick={close} /></Panel>}
      {ui?.k === 'brief' && mission && <Panel onClose={close}><header className="npchead"><Portrait k={`npc:${mission.npc}`} size={110} /><div><h2>{NPCS[mission.npc].name}</h2><span className="chip">{mission.lvl}</span></div></header><T b={mission.text} as="p" className="bubble" say /><p className="big">💶 {euro(mission.budget)}</p><B b="¡Entendido, voy a comprar!|Հասկացա, գնում եմ գնումների։" className="primary" onClick={close} /></Panel>}
      {ui?.k === 'review' && check && <Panel onClose={close}>
        <T b="Carmen revisa tu cesta: algo no coincide con el encargo.|Կարմենը ստուգում է զամբյուղը․ ինչ-որ բան չի համընկնում։" as="h2" say />
        {check.lines.map((l) => <div className="line" key={l.b}><span>{l.have === l.need ? '✅' : '❌'}</span><T b={l.b} /><b>{l.have} / {l.need}</b></div>)}
        {check.extra.map((k) => <div className="line" key={k}><span>❌</span><T b={fill('No te lo han pedido: {x}|Չեն խնդրել՝ {x}', { x: P[k].name })} /></div>)}
        {check.dup && <T b="Los dos juguetes deben ser distintos.|Երկու խաղալիքը պետք է տարբեր լինեն։" as="p" />}
        {check.over && <T b={fill('Has superado el presupuesto: {a} de {b}.|Գերազանցել ես բյուջեն՝ {a}, երբ ունես {b}։', { a: euro(check.total), b: euro(mission!.budget) })} as="p" className="neg" say />}
        <div className="row"><B b="Corregir la cesta|Ուղղել զամբյուղը" className="primary" onClick={() => setUi({ k: 'basket' })} /><B b="Leer el encargo|Կարդալ հանձնարարությունը" onClick={() => setUi({ k: 'brief' })} /></div></Panel>}
      {ui?.k === 'fin' && <Panel><div className="result"><Portrait k={`npc:${mission!.npc}`} size={120} /><Stars n={stars} /><T b="¡Misión cumplida! Has comprado justo lo que necesitaba.|Առաքելությունը կատարված է։ Գնել ես հենց այն, ինչ պետք էր։" as="h2" say /><p className="big">{euro(total)} · <Clock s={secs} /></p><B b="Continuar|Շարունակել" className="primary" onClick={() => onDone?.(stars, secs)} /></div></Panel>}
    </div>
  );
}
