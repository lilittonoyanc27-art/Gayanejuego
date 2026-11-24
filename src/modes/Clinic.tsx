import { useCallback, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { es } from '../core/bi';
import { A } from '../data/products';
import { VET, VET_ANIMAL, VET_Q } from '../data/vet';
import { collect, complete, count, lvlRank, reward, useGame } from '../core/store';
import { ambient, play, type Sfx } from '../core/audio';
import { B, T } from '../ui/T';
import { Choice, Dialogue, Panel, Portrait, Stars } from '../ui/kit';
import { Beast, Human, Lights, MAT, Player, Scene, Sign, bx, ctl, vc, woodTex, type Box, type Point } from '../three/world';
import { Plant, Tank } from '../three/ShopScene';
import { glassMat, merge, paint } from '../three/goods';
import { CamToggle, Joystick } from './Shop';

const BOXES: Box[] = [{ x: -3.2, z: 2.6, w: 2.8, d: 0.9 }, { x: 4, z: -2.8, w: 2.1, d: 1.1 }, { x: 0, z: -1.9, w: 0.2, d: 4.2 }, { x: -5, z: -3.2, w: 1, d: 3 }, { x: 6.6, z: -4.6, w: 2, d: 0.8 }, { x: -4, z: -4.6, w: 3, d: 0.8 }, { x: 4.2, z: -4, w: 0.5, d: 0.4 }, { x: -3.2, z: 3.7, w: 0.5, d: 0.5 }, { x: 5.8, z: 4.4, w: 3, d: 0.8 }];
function Building() {
  const floor = woodTex('clinic', '#e3d3c8', [5, 4]);
  const g = useMemo(() => merge([
    bx(15, 3.2, 0.12, 0, 1.6, -5.06, '#eaf2f1'), bx(0.12, 3.2, 10, -7.56, 1.6, 0, '#f3e6ee'), bx(0.12, 3.2, 10, 7.56, 1.6, 0, '#eaf2f1'), bx(15, 3.2, 0.12, 0, 1.6, 5.06, '#f3e6ee'), bx(15, 0.06, 0.04, 0, 1.1, -4.98, '#b8d4d0'), bx(0.14, 3.2, 4.2, 0, 1.6, -2.95, '#f6eef2'), bx(15, 0.12, 0.05, 0, 0.06, -4.97, '#fff'),
    bx(2.8, 1.05, 0.7, -3.2, 0.52, 2.6, '#f4e4e8'), bx(2.9, 0.06, 0.85, -3.2, 1.08, 2.6, '#c9a27e'), bx(0.5, 0.34, 0.05, -3.7, 1.36, 2.7, '#3b3640'), bx(0.06, 0.14, 0.06, -3.7, 1.15, 2.7, '#3b3640'), bx(0.34, 0.02, 0.24, -2.6, 1.12, 2.5, '#fff'),
    bx(2, 0.07, 1, 4, 0.92, -2.8, '#cfd6da'), bx(1.9, 0.02, 0.9, 4, 0.965, -2.8, '#a9cfc9'), bx(0.5, 0.9, 0.5, 4, 0.45, -2.8, '#dfe5e8'),
    bx(2, 0.9, 0.6, 6.6, 0.45, -4.6, '#fff'), bx(2, 0.05, 0.64, 6.6, 0.92, -4.6, '#9cc3bd'), bx(2, 0.7, 0.34, 6.4, 2, -4.82, '#fff'), ...[0, 1, 2, 3, 4, 5].map((i) => paint(new THREE.CylinderGeometry(0.05, 0.05, 0.16, 16), ['#d793ab', '#7fa6bf', '#8fbfae', '#e0b36a', '#b59ad6', '#e58a6f'][i], (x) => x.translate(5.9 + i * 0.25, 1.03, -4.6))),
    ...[0, 1, 2].map((i) => bx(0.9, 0.42, 0.75, 4.7 + i * 1.05, 0.28, 4.5, '#c9b3dd')), ...[0, 1, 2].map((i) => bx(0.9, 0.5, 0.16, 4.7 + i * 1.05, 0.7, 4.82, '#b9a0d2')),
    bx(3, 0.8, 0.7, -4, 0.4, -4.6, '#cbb8c9'), bx(1, 0.8, 3, -5, 0.4, -3.2, '#e8d9e2'),
    paint(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 10), '#cfd6da', (x) => x.translate(2.7, 2.6, -2.8)), paint(new THREE.CylinderGeometry(0.28, 0.34, 0.1, 32), '#f4f6f7', (x) => x.translate(4, 2.25, -2.8)), bx(1.4, 0.05, 0.05, 3.4, 2.4, -2.8, '#cfd6da'),
    bx(0.5, 0.36, 0.06, 2, 1.9, -4.98, '#2f3b44'), bx(0.9, 1.2, 0.03, 4, 1.95, -4.98, '#fff'), ...[0, 1, 2, 3].map((i) => bx(0.7 - i * 0.1, 0.05, 0.02, 4, 2.3 - i * 0.22, -4.95, '#7a6f80')),
  ]), []);
  return (<><mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[15, 10]} /><meshPhysicalMaterial map={floor} roughness={0.25} clearcoat={0.5} /></mesh><mesh rotation-x={Math.PI / 2} position-y={3.2}><planeGeometry args={[15, 10]} /><meshStandardMaterial color="#fdf8f5" emissive="#fff6f2" emissiveIntensity={0.42} /></mesh><mesh geometry={g} material={vc} castShadow receiveShadow />
    {[-4, 0.2, 4.5].flatMap((x) => [-2.5, 2.4].map((z) => <mesh key={`${x}${z}`} position={[x, 3.17, z]} material={MAT.glow}><boxGeometry args={[1.5, 0.04, 0.5]} /></mesh>))}<mesh position={[4, 2.19, -2.8]} material={MAT.glow}><cylinderGeometry args={[0.24, 0.24, 0.02, 24]} /></mesh><mesh position={[0, 1.6, 0.9]} material={glassMat}><planeGeometry args={[0.1, 0.1]} /></mesh>
    <Sign b="Recepción|Ընդունարան" color="#d8a3b5" position={[-3.2, 2.4, 2.9]} rotation={Math.PI} w={1.8} /><Sign b="Consulta|Ընդունելություն" color="#8fbfae" icon="🩺" position={[4, 2.75, -4.9]} w={2} /><Sign b="Clínica veterinaria|Անասնաբուժական կլինիկա" color="#9d86c4" position={[-3.6, 2.6, -4.95]} w={2.8} />
    <Tank w={1.7} h={0.7} d={0.6} position={[-4, 0.82, -4.55]} fish={['dorado', 'dorado']} /><Plant position={[-6.9, 0, 4.4]} s={1.3} /><Plant position={[7, 0, 3]} s={1.2} /><Plant position={[-6.9, 0, -1]} s={1.1} /><Plant position={[0.5, 0, -4.5]} />
    <Beast id="gris" position={[5.75, 0.5, 4.4]} rotation={3.1} mood="sleep" /></>);
}
export default function Clinic({ onExit }: { onExit: () => void }) {
  const [near, setNear] = useState<string | null>(null), [ui, setUi] = useState<string | null>('hola'), [cid, setCid] = useState<string | null>(null), [res, setRes] = useState(0), done = useGame((s) => s.done);
  const script = VET.find((v) => v.id === cid), an = cid ? VET_ANIMAL[cid] : null, kind = an ? A[an].kind : null;
  useEffect(() => { ambient('clinica'); return () => ambient(null); }, []);
  useEffect(() => { ctl.locked = !!ui; }, [ui]);
  const points = useMemo<Point[]>(() => [{ id: 'recep', x: -3.2, z: 1.5, r: 2 }, { id: 'vet', x: 4, z: -1.6, r: 1.9 }], []);
  const act = useCallback((id: string | null) => { if (id === 'recep') setUi('list'); if (id === 'vet') setUi(cid ? 'talk' : 'nocita'); }, [cid]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.code === 'KeyE' && !ui) act(near); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [near, ui, act]);
  const onNear = useCallback((x: string | null) => setNear(x), []);
  const scene = useMemo(() => (
    <Scene className="walk" fov={56} bg="#eef1f2"><Lights area={8} sun={[3, 8, 4]} intensity={1.3} /><pointLight position={[4, 2.4, -2]} intensity={5} color="#fff4e8" distance={6} /><pointLight position={[-3, 2.5, 1]} intensity={5} color="#ffe1ea" distance={6} />
      <Building /><Human id="pablo" position={[-3.2, 0, 3.6]} rotation={Math.PI} onClick={(e) => { if (e.delta < 6 && e.distance < 5) act('recep'); }} /><Human id="vet" position={[4.2, 0, -3.8]} rotation={0} mood={ui === 'talk' ? 'talk' : 'idle'} onClick={(e) => { if (e.delta < 6 && e.distance < 5) act('vet'); }} />
      {an && <Beast key={an} id={an} position={[4, 0.975, -2.75]} rotation={-0.7} scale={kind === 'perro' ? 0.85 : 1} mood="idle" />}
      <Player start={[-2.1, 0.5]} yaw={2.75} boxes={BOXES} bounds={[-7.5, 7.5, -5, 5]} points={points} onNear={onNear} />
    </Scene>), [an, kind, points, onNear, act, ui === 'talk']); // eslint-disable-line
  const close = () => setUi(null);
  return (
    <div className="mode3d">{scene}
      <div className="hud top"><B b="Menú|Մենյու" icon="‹" className="small" onClick={onExit} /><CamToggle />{script && <T b={script.title} className="chip" />}</div><Joystick />
      <div className="help"><T b={cid ? 'Lleva al animal a la consulta de la doctora Vega.|Տար կենդանուն դոկտոր Վեգայի մոտ։' : 'Habla con Pablo en la recepción.|Խոսիր Պաբլոյի հետ ընդունարանում։'} say /></div>
      {near && !ui && <div className="prompt"><T b={near === 'recep' ? 'Recepción: Pablo|Ընդունարան՝ Պաբլո' : 'Consulta: doctora Vega|Ընդունելություն՝ դոկտոր Վեգա'} as="b" /><B b="Interactuar|Փոխազդել" icon="E" className="primary" onClick={() => act(near)} /></div>}
      {ui === 'hola' && <Panel onClose={close}><T b="Bienvenida a la clínica veterinaria|Բարի գալուստ անասնաբուժական կլինիկա" as="h2" say /><T b="Pide cita en la recepción, acompaña al animal y ayuda a la doctora. Las decisiones médicas siempre las toma ella.|Գրանցվիր ընդունարանում, ուղեկցիր կենդանուն և օգնիր բժշկուհուն։ Բժշկական որոշումները միշտ նա է կայացնում։" as="p" say /><B b="Entrar|Մտնել" className="primary" onClick={close} /></Panel>}
      {ui === 'nocita' && <Panel onClose={close}><T b="Doctora Vega: «Primero pide cita en la recepción, por favor».|Դոկտոր Վեգա․ «Նախ գրանցվիր ընդունարանում, խնդրում եմ»։" as="h2" say /><B b="De acuerdo|Լավ" className="primary" onClick={close} /></Panel>}
      {ui === 'list' && <Panel onClose={close}><header className="npchead"><Portrait k="npc:pablo" size={100} /><div><h2>Pablo</h2><T b="¡Hola, Gayane! ¿A quién traes hoy a la consulta?|Բարև, Գայանե՛։ Այսօր ո՞ւմ ես բերել ընդունելության։" as="p" say /></div></header>
        <div className="grid prods">{[...VET].sort((a, b) => lvlRank(a.lvl) - lvlRank(b.lvl)).map((v) => <button type="button" key={v.id} className="pcard" data-es={es(v.title)} data-hy={v.title.split('|')[1]} onClick={() => { setCid(v.id); play(A[VET_ANIMAL[v.id]].kind as Sfx); close(); }}><Portrait k={`animal:${VET_ANIMAL[v.id]}`} size={92} /><span>{es(v.title)}</span><small>{v.lvl} <Stars n={done[v.id] ?? 0} /></small><i className="hydot">Ա</i></button>)}</div></Panel>}
      {ui === 'talk' && script && <Panel onClose={close} className="side"><Dialogue key={script.id} script={script} mode="Clínica" onClose={close} onEnd={(g, e) => { setRes(Math.min(g, e === 0 ? 3 : e < 3 ? 2 : 1)); setUi('q'); }} /></Panel>}
      {ui === 'q' && cid && <Panel><T b="¿Has comprendido la visita?|Հասկացա՞ր այցը։" as="h2" /><Choice q={VET_Q[cid].q} opts={VET_Q[cid].o} mode="Clínica" why="Repasa lo que explicó la doctora al final.|Վերհիշիր, թե ինչ բացատրեց բժշկուհին վերջում։" onDone={(ok) => { complete(cid, Math.max(1, ok ? res : res - 1)); count('clinica'); reward(8, 20); collect(VET_ANIMAL[cid]); setCid(null); close(); }} /></Panel>}
    </div>
  );
}
