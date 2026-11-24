import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { es, fill, pick, sample, shuffle, type Bi } from '../core/bi';
import { A, ANIMALS, P } from '../data/products';
import { ACTS, BED, CAN, FOODS, ORDERS, WALK, type Act } from '../data/care';
import { NPCS } from '../data/npcs';
import { collect, complete, count, right, toast, useGame, wrong } from '../core/store';
import { ambient, play, type Sfx } from '../core/audio';
import { speak } from '../core/speech';
import { B, T } from '../ui/T';
import { Bar, Panel, Portrait, Stars } from '../ui/kit';
import { Beast, Human, Lights, MAT, Scene, bx, canvasTex, vc, woodTex } from '../three/world';
import { Plant } from '../three/ShopScene';
import { good, goodMat, merge, paint } from '../three/goods';
import type { Mood } from '../three/animals';
import { Page } from './Page';

interface W { mood: Mood; scrub: number; fill: number; spots: boolean[]; bed: string[]; act: Act | null; ball: [number, number] | null }
function Rig({ walk, size }: { walk: boolean; size: number }) {
  const { camera, size: vp } = useThree(), v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => { const t = clock.elapsedTime, k = vp.width < vp.height ? 1.45 : 1, d = (0.32 + size * 2) * k; v.set(Math.sin(t * 0.12) * 0.22 + (walk ? 1.1 : 0.35), 0.14 + size * 1, d); camera.position.lerp(v, 0.04); camera.lookAt(0, size * 0.2, 0); });
  return null;
}
function Room({ w, id, walk, onSpot, onFloor, onScrub, beast }: { w: W; id: string; walk: boolean; onSpot: (i: number) => void; onFloor: (x: number, z: number) => void; onScrub: (p: THREE.Vector3) => void; beast: RefObject<THREE.Group | null> }) {
  const kind = A[id].kind, size = { perro: 0.85, gato: 0.6, conejo: 0.45, hamster: 0.22, pajaro: 0.4, pez: 0.3 }[kind], u = size / 0.6;
  const floor = woodTex('home', '#d7b294', [3, 3]), ball = useRef<THREE.Mesh>(null), bubs = useRef<THREE.InstancedMesh>(null), pts = useRef<THREE.Vector3[]>([]), gr = useRef<THREE.Group>(null), m4 = useMemo(() => new THREE.Matrix4(), []);
  const furn = useMemo(() => merge([bx(7, 3.4, 0.1, 0, 1.7, -2.4, '#f3dfe4'), bx(0.1, 3.4, 6, -3.2, 1.7, 0, '#eadff0'), bx(7, 0.14, 0.06, 0, 0.07, -2.33, '#fffaf6'), bx(1.8, 0.4, 0.7, -2, 0.22, -1.9, '#d298b1'), bx(1.8, 0.5, 0.2, -2, 0.6, -2.2, '#cb8ca7'), bx(1.1, 1.3, 0.35, 2.1, 0.65, -2.1, '#c9a27e'), bx(1, 0.03, 0.36, 2.1, 0.9, -2.08, '#8d6549'), ...[0, 1, 2, 3, 4, 5].map((i) => bx(0.07, 0.26, 0.2, 1.75 + i * 0.1, 1.05, -2, ['#d793ab', '#9d86c4', '#8fbfae', '#e0b36a', '#7fa6bf', '#c98b6b'][i])), bx(1.7, 1.4, 0.05, 0.2, 1.75, -2.36, '#fffaf6')]), []);
  const park = canvasTex('park', 1024, 512, (g) => { const s = g.createLinearGradient(0, 0, 0, 512); s.addColorStop(0, '#a9d5f2'); s.addColorStop(0.62, '#fdeee0'); s.addColorStop(0.63, '#a9c98a'); s.addColorStop(1, '#8bb571'); g.fillStyle = s; g.fillRect(0, 0, 1024, 512); for (let i = 0; i < 40; i++) { g.fillStyle = `rgb(${86 + ((i * 13) % 50)},${130 + ((i * 7) % 40)},88)`; g.beginPath(); g.arc((i * 131) % 1024, 285 - (i % 4) * 22, 30 + (i % 5) * 9, 0, 7); g.fill(); } });
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime, b = ball.current, g = beast.current;
    if (b) { b.visible = w.act === 'jugar'; if (w.ball) { const d = Math.hypot(w.ball[0] - b.position.x, w.ball[1] - b.position.z); b.position.x += (w.ball[0] - b.position.x) * 0.09; b.position.z += (w.ball[1] - b.position.z) * 0.09; b.position.y = 0.06 * u + Math.abs(Math.sin(t * 9)) * Math.min(0.5, d); b.rotation.x += dt * 8; } }
    if (g) { const tx = w.act === 'jugar' && w.ball ? w.ball[0] * 0.85 : 0, tz = w.act === 'jugar' && w.ball ? w.ball[1] - 0.15 * u : 0, dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz); if (d > 0.04) { const s = Math.min(d, dt * 1.5); g.position.x += (dx / d) * s; g.position.z += (dz / d) * s; let r = Math.atan2(dx, dz) - g.rotation.y; r = Math.atan2(Math.sin(r), Math.cos(r)); g.rotation.y += r * 0.12; } else { const tr = walk ? 0.9 : w.mood === 'eat' ? 0.5 : 0.35; let r = tr - g.rotation.y; r = Math.atan2(Math.sin(r), Math.cos(r)); g.rotation.y += r * 0.05; } }
    const im = bubs.current; if (im) { for (let i = 0; i < 90; i++) { const p = pts.current[i]; if (p && w.act === 'banar') m4.makeScale(1, 1, 1).setPosition(p.x, p.y + Math.sin(t + i) * 0.006, p.z); else m4.makeScale(0, 0, 0); im.setMatrixAt(i, m4); } im.instanceMatrix.needsUpdate = true; if (w.act !== 'banar') pts.current = []; }
    if (gr.current && walk) gr.current.position.z = -((t * 0.6) % 2);
  });
  return (<>
    <Lights area={2.5} sun={[2, 4, 3]} intensity={1.7} every />
    <Rig walk={walk} size={size} />
    {walk ? <group key="parque"><mesh position={[0, 2.2, -6]}><planeGeometry args={[20, 9]} /><meshBasicMaterial map={park} /></mesh><mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[20, 14]} /><meshStandardMaterial color="#9dbb7c" roughness={1} /></mesh><mesh rotation-x={-Math.PI / 2} rotation-z={0.9} position-y={0.004} receiveShadow><planeGeometry args={[1.6, 14]} /><meshStandardMaterial color="#dccbb5" roughness={1} /></mesh>
      <group rotation-y={0.9}><group ref={gr}>{[-4, -2, 0, 2, 4].flatMap((z) => [-1, 1].map((s) => <Plant key={`${z}${s}`} position={[s * 1.3, -0.28, z]} s={0.8} />))}</group></group><Human id="gayane" position={[-0.55, 0, -0.25]} rotation={0.9} mood="walk" /></group>
      : <group key="casa"><mesh rotation-x={-Math.PI / 2} receiveShadow onClick={(e) => onFloor(e.point.x, e.point.z)}><planeGeometry args={[8, 7]} /><meshPhysicalMaterial map={floor} roughness={0.4} clearcoat={0.3} /></mesh><mesh geometry={furn} material={vc} receiveShadow castShadow /><mesh position={[0.2, 1.75, -2.33]}><planeGeometry args={[1.55, 1.25]} /><meshBasicMaterial map={park} /></mesh><mesh rotation-x={-Math.PI / 2} position-y={0.004} receiveShadow><circleGeometry args={[1.25, 64]} /><meshStandardMaterial color="#ecd3dd" roughness={1} /></mesh><Plant position={[-2.8, 0, -0.9]} /><Plant position={[2.9, 0, -1.4]} s={1.2} /></group>}
    <Beast id={id} groupRef={beast} mood={walk ? 'walk' : w.mood} rotation={0.35} shells={16} onPointerMove={(e) => { if (w.act !== 'banar' && w.act !== 'cepillar') return; e.stopPropagation(); if (pts.current.length < 90) pts.current.push(e.point.clone()); else pts.current[Math.floor(Math.random() * 90)] = e.point.clone(); onScrub(e.point); }} />
    {!walk && [0, 1].map((k) => <group key={k} position={[(k ? 0.24 : -0.02) * u + 0.1 * u, 0, 0.62 * u]} scale={Math.max(0.4, u * 0.85)}><mesh geometry={good(k ? 'cn2' : 'cn1').body} material={goodMat} castShadow />{(w.act === (k ? 'agua' : 'comer') || w.fill > 0) && w.act === (k ? 'agua' : 'comer') && <mesh position-y={0.012 + w.fill * 0.04} rotation-x={-Math.PI / 2}><circleGeometry args={[0.05 + w.fill * 0.02, 32]} /><meshPhysicalMaterial color={k ? '#a8d8ea' : '#8b5a38'} roughness={k ? 0.05 : 0.95} /></mesh>}</group>)}
    <mesh ref={ball} position={[0.4, 0.06, 0.6]} castShadow scale={Math.max(0.6, u * 0.8)}><sphereGeometry args={[0.07, 32, 24]} /><meshPhysicalMaterial color="#e0719a" roughness={0.4} clearcoat={0.5} /></mesh>
    <instancedMesh ref={bubs} args={[undefined, undefined, 90]} frustumCulled={false} raycast={() => null}><sphereGeometry args={[0.02 * u, 12, 10]} /><meshPhysicalMaterial color="#fff" transparent opacity={0.75} roughness={0.05} iridescence={1} /></instancedMesh>
    {w.act === 'limpiar' && w.spots.map((on, i) => on && <mesh key={i} position={[Math.cos(i * 1.05 + 0.4) * 0.6 * u, 0.012, 0.12 + Math.sin(i * 1.05 + 0.4) * 0.3 * u]} rotation-x={-Math.PI / 2} onClick={(e) => { e.stopPropagation(); onSpot(i); }}><circleGeometry args={[0.075 * u, 24]} /><meshStandardMaterial color="#7a5a3f" roughness={0.6} transparent opacity={0.85} polygonOffset polygonOffsetFactor={-2} /></mesh>)}
    {w.act === 'cama' && <group position={[0.75 * u, 0, 0.1]} scale={u * 1.2}>{w.bed.map((b, i) => b === 'cojin' ? <mesh key={b} geometry={good('cm1').body} material={goodMat} position-y={i * 0.03} castShadow /> : b === 'manta' ? <mesh key={b} position-y={0.075 + i * 0.02} castShadow><cylinderGeometry args={[0.17, 0.18, 0.03, 40]} /><meshStandardMaterial color="#b9a2dd" roughness={1} /></mesh> : <mesh key={b} geometry={good('ra1').body} material={goodMat} position-y={0.1} castShadow />)}</group>}
    {w.act === 'limpiar' && <mesh geometry={paint(new THREE.BoxGeometry(0.01, 0.01, 0.01), '#fff')} material={MAT.white} visible={false} />}
  </>);
}
export default function Care({ onExit }: { onExit: () => void }) {
  const [id, setId] = useState<string | null>(null);
  if (id) return <Home id={id} onExit={() => setId(null)} />;
  return (
    <Page title="Cuida a tu mascota|Խնամիր քո կենդանուն" sub="Elige un animal y atiende sus necesidades en el orden correcto.|Ընտրիր կենդանի և հոգա նրա կարիքները ճիշտ հերթականությամբ։" onExit={onExit}>
      <div className="grid cards">{ANIMALS.filter((a) => CAN[a.kind]).map((a) => <article className="card pick" key={a.id}><Portrait k={`animal:${a.id}`} size={190} /><h3>{a.pet}</h3><T b={a.name} as="p" /><B b="Cuidar|Խնամել" className="primary" onClick={() => setId(a.id)} /></article>)}</div>
    </Page>
  );
}
function Home({ id, onExit }: { id: string; onExit: () => void }) {
  const a = A[id], can = CAN[a.kind], acts = useMemo(() => ACTS.filter((x) => can.includes(x.id)), [can]);
  const [queue] = useState<Act[]>(() => { const must: Act[] = sample(can.filter((x) => x !== 'cama'), 5); return [...must, 'cama']; });
  const [step, setStep] = useState(0), [errs, setErrs] = useState(0), [active, setActive] = useState<Act | null>(null), [msg, setMsg] = useState<Bi | null>(null), [over, setOver] = useState(false);
  const [needs, setNeeds] = useState({ hambre: 45, higiene: 40, energia: 50, alegria: 40 });
  const [w, setW] = useState<W>({ mood: 'idle', scrub: 0, fill: 0, spots: [true, true, true, true, true, true], bed: [], act: null, ball: null });
  const [food, setFood] = useState<string | null>(null), [pour, setPour] = useState(false), [throws, setThrows] = useState(0), [walk, setWalk] = useState<typeof WALK>([]), [wi, setWi] = useState(0), [bed, setBed] = useState(BED[0]);
  const beast = useRef<THREE.Group>(null), foods = useMemo(() => shuffle([FOODS[a.kind].ok, ...FOODS[a.kind].bad]), [a, step]); // eslint-disable-line
  const npc = { perro: 'marcos', gato: 'elena', pajaro: 'ines', conejo: 'ines', hamster: 'ines', pez: 'diego' }[a.kind], sfx = a.kind as Sfx;
  const order = useMemo(() => (step < queue.length ? fill(pick(ORDERS[queue[step]]), { n: a.pet }) : ''), [step, queue, a]);
  useEffect(() => { ambient(active === 'pasear' ? 'parque' : 'tienda'); return () => ambient(null); }, [active === 'pasear']); // eslint-disable-line
  useEffect(() => { collect(id); play(sfx); }, [id, sfx]);
  useEffect(() => { if (order) speak(es(order), { male: NPCS[npc].male }); }, [order, npc]);
  useEffect(() => { if (!pour) return; const i = setInterval(() => { play(active === 'agua' ? 'agua' : 'pienso'); setW((x) => ({ ...x, fill: Math.min(1.15, x.fill + 0.045) })); }, 110); return () => clearInterval(i); }, [pour, active]);
  const finish = () => {
    const act = active!; play('good'); play(a.kind === 'gato' ? 'ronroneo' : sfx); right('Cuidados', 12, 4); count('cuidados');
    setNeeds((n) => ({ hambre: n.hambre + (act === 'comer' || act === 'agua' ? 25 : 0), higiene: n.higiene + (act === 'banar' || act === 'limpiar' || act === 'cepillar' ? 22 : 0), energia: n.energia + (act === 'cama' ? 50 : act === 'comer' ? 15 : 0), alegria: n.alegria + (act === 'jugar' || act === 'pasear' ? 28 : 10) }));
    setW((x) => ({ ...x, mood: act === 'comer' || act === 'agua' ? 'eat' : act === 'cama' ? 'sleep' : 'happy' }));
    toast(fill('¡{x} está feliz!|{x}ն երջանիկ է։', { x: a.pet }), '🤍'); setMsg(null);
    setTimeout(() => { setActive(null); setW((x) => ({ ...x, act: null, mood: 'idle', fill: 0, ball: null })); setFood(null); setStep((s) => { if (s + 1 >= queue.length) { setOver(true); complete('cuidado:' + id, errs === 0 ? 3 : errs < 3 ? 2 : 1); right('Cuidados', 25, 12); } return s + 1; }); }, 2600);
  };
  const choose = (act: Act) => {
    if (active) return;
    if (act !== queue[step]) {
      setErrs((e) => e + 1); play('bad'); const ok = ACTS.find((x) => x.id === queue[step])!.b, b = ACTS.find((x) => x.id === act)!.b;
      wrong('Cuidados', order, b, ok, 'Lee otra vez la instrucción y fíjate en la necesidad del animal.|Նորից կարդա ցուցումը և ուշադիր եղիր կենդանու կարիքին։'); setMsg('Eso no es lo que necesita ahora. Escucha otra vez la instrucción.|Հիմա դա չէ նրան պետք։ Նորից լսիր ցուցումը։'); return;
    }
    setMsg(null); setActive(act); setW({ mood: 'idle', scrub: 0, fill: 0, spots: [true, true, true, true, true, true], bed: [], act, ball: null }); setThrows(0); setWalk(sample(WALK, 4)); setWi(0); setBed(pick(BED));
    speak(es(ACTS.find((x) => x.id === act)!.how));
  };
  const busy = w.mood !== 'idle' && active !== null;
  const release = () => { if (!pour) return; setPour(false); setW((x) => { if (x.fill >= 0.7 && x.fill <= 0.95) setTimeout(finish, 50); else { setMsg(x.fill < 0.7 ? 'Es poco. Añade un poco más.|Քիչ է։ Մի քիչ էլ ավելացրու։' : '¡Es demasiado! Vacía el cuenco e inténtalo de nuevo.|Չափազանց շատ է։ Դատարկիր ամանը և նորից փորձիր։'); if (x.fill > 0.95) { play('bad'); return { ...x, fill: 0 }; } } return x; }); };
  const scrub = () => { if (busy) return; if (Math.random() < 0.2) play(active === 'banar' ? 'burbuja' : 'cepillo'); setW((x) => { const s = x.scrub + 0.9; if (x.scrub < 100 && s >= 100) setTimeout(finish, 50); return { ...x, scrub: Math.min(100, s) }; }); };
  const dir = (d: string) => { if (busy) return; if (walk[wi].ok === d) { play('good'); right('Cuidados', 4, 1); if (wi + 1 >= walk.length) finish(); else { setWi(wi + 1); speak(es(walk[wi + 1].b)); } } else { play('bad'); setErrs((e) => e + 1); const n: Record<string, Bi> = { recto: 'Seguir recto|Ուղիղ գնալ', izquierda: 'Girar a la izquierda|Թեքվել ձախ', derecha: 'Girar a la derecha|Թեքվել աջ', esperar: 'Esperar|Սպասել' }; wrong('Cuidados', walk[wi].b, n[d], n[walk[wi].ok], 'Vuelve a leer la indicación.|Նորից կարդա ցուցումը։'); setMsg('Cuidado, esa no era la indicación. Léela otra vez.|Զգույշ, ցուցումը դա չէր։ Նորից կարդա։'); } };
  const cur = ACTS.find((x) => x.id === active);
  return (
    <div className="mode3d">
      <Scene cam={[0.4, 0.9, 2]} fov={42} fog={false} bg="#f4dfe5"><Room w={w} id={id} walk={active === 'pasear'} beast={beast} onSpot={(i) => { play('cepillo'); setW((x) => { const s = x.spots.map((v, j) => (j === i ? false : v)); if (!s.some(Boolean)) setTimeout(finish, 50); return { ...x, spots: s }; }); }} onFloor={(x, z) => { if (active !== 'jugar' || busy || z < -1.2) return; play('click'); setW((q) => ({ ...q, ball: [x, Math.max(-0.6, Math.min(0.9, z))] })); setThrows((t) => { if (t + 1 === 3) setTimeout(finish, 1500); return t + 1; }); }} onScrub={scrub} /></Scene>
      <div className="hud top"><B b="Volver|Վերադառնալ" icon="‹" className="small" onClick={onExit} /><b className="chip">{a.pet}</b><span className="chip">{Math.min(step + 1, queue.length)} / {queue.length}</span></div>
      <div className="needs"><Bar v={needs.hambre} label="Comida|Սնունդ" color="#d99a6c" /><Bar v={needs.higiene} label="Higiene|Հիգիենա" color="#7fb5a6" /><Bar v={needs.energia} label="Energía|Եռանդ" color="#d7b24a" /><Bar v={needs.alegria} label="Alegría|Ուրախություն" color="#d9739b" /></div>
      <div className="dock">
        {!over && <div className="orderbox"><Portrait k={`npc:${npc}`} size={64} /><div><b>{NPCS[npc].name}</b>{!active ? <T b={order} as="p" say /> : active === 'pasear' && walk[wi] ? <T b={walk[wi].b} as="p" say /> : active === 'cama' ? <T b={bed.b} as="p" say /> : <T b={cur!.how} as="p" say />}{msg && <T b={msg} as="p" className="neg" say />}</div></div>}
        {!active && !over && <div className="acts">{acts.map((x) => <B key={x.id} b={x.b} icon={x.icon} onClick={() => choose(x.id)} />)}</div>}
        {(active === 'comer' && !food) && <div className="acts">{foods.map((f) => <B key={f} b={P[f].name} onClick={() => { if (f === FOODS[a.kind].ok) { setFood(f); setMsg(null); play('good'); } else { play('bad'); setErrs((e) => e + 1); setMsg(fill('{x}: ese alimento no es para este animal.|{x}՝ այդ կերն այս կենդանու համար չէ։', { x: P[f].name })); wrong('Cuidados', order, P[f].name, P[FOODS[a.kind].ok].name, P[FOODS[a.kind].ok].desc); } }} />)}</div>}
        {((active === 'comer' && food) || active === 'agua') && !busy && <div className="pour"><div className="gauge"><i style={{ width: `${Math.min(100, w.fill * 100)}%` }} /><em /></div><button type="button" className="btn primary" data-es="Mantén pulsado" data-hy="Սեղմած պահիր" onPointerDown={() => setPour(true)} onPointerUp={release} onPointerLeave={release} onContextMenu={(e) => e.preventDefault()}><span className="lbl">Mantén pulsado</span></button></div>}
        {(active === 'banar' || active === 'cepillar') && <Bar v={w.scrub} />}
        {active === 'jugar' && <p className="big">🎾 {throws} / 3</p>}
        {active === 'limpiar' && <p className="big">🧹 {w.spots.filter((x) => !x).length} / 6</p>}
        {active === 'pasear' && !busy && <div className="acts"><B b="Izquierda|Ձախ" icon="⬅" onClick={() => dir('izquierda')} /><B b="Recto|Ուղիղ" icon="⬆" onClick={() => dir('recto')} /><B b="Derecha|Աջ" icon="➡" onClick={() => dir('derecha')} /><B b="Esperar|Սպասել" icon="✋" onClick={() => dir('esperar')} /></div>}
        {active === 'cama' && !busy && <div className="acts">{([['cojin', '🛋️', 'El cojín|Բարձիկը'], ['manta', '🧣', 'La manta|Ծածկոցը'], ['juguete', '🐭', 'El juguete|Խաղալիքը']] as const).filter(([k]) => !w.bed.includes(k)).map(([k, i, b]) => <B key={k} b={b} icon={i} onClick={() => { if (bed.order[w.bed.length] === k) { play('good'); setMsg(null); setW((x) => { const nb = [...x.bed, k]; if (nb.length === 3) setTimeout(finish, 400); return { ...x, bed: nb }; }); } else { play('bad'); setErrs((e) => e + 1); wrong('Cuidados', bed.b, b, bed.order[w.bed.length], 'Fíjate en: primero, antes de, después, cuando.|Ուշադիր եղիր՝ primero, antes de, después, cuando։'); setMsg('Ese objeto no va ahora. Lee el orden con atención.|Այդ իրը հիմա չէ։ Ուշադիր կարդա հերթականությունը։'); } }} />)}</div>}
      </div>
      {over && <Panel><div className="result"><Portrait k={`animal:${id}`} size={170} /><Stars n={errs === 0 ? 3 : errs < 3 ? 2 : 1} /><T b={fill('{x} ha tenido un día maravilloso contigo.|{x}ն հրաշալի օր անցկացրեց քեզ հետ։', { x: a.pet })} as="h2" say /><B b="Continuar|Շարունակել" className="primary" onClick={onExit} /></div></Panel>}
    </div>
  );
}
export const usePets = () => useGame((s) => s.animals);
