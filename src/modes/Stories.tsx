import { useState } from 'react';
import { fill } from '../core/bi';
import { STORIES } from '../data/stories';
import { NPCS } from '../data/npcs';
import { complete, count, lvlRank, reward, useGame } from '../core/store';
import { B, T } from '../ui/T';
import { Dialogue, Portrait, Stars } from '../ui/kit';
import { Beast, Human, Lights, Scene, vc, bx, woodTex, MAT } from '../three/world';
import { merge } from '../three/goods';
import { Plant } from '../three/ShopScene';
import { Page } from './Page';
import { useMemo } from 'react';
const PET: Record<string, string> = { s1: 'golden', s2: 'tabby', s3: 'labrador', s4: 'siames', s5: 'collie', s6: 'labrador', s7: 'golden', s8: 'loro', s9: 'gris', s10: 'conejoblanco' };
function Stage({ who, pet, xmas }: { who: string; pet: string; xmas: boolean }) {
  const floor = woodTex('story', '#cfa98a', [3, 2]);
  const g = useMemo(() => merge([bx(9, 3.4, 0.1, 0, 1.7, -2.6, '#f2dde4'), bx(9, 0.14, 0.05, 0, 0.07, -2.53, '#fff'), bx(2.2, 1.5, 0.35, -2.4, 0.75, -2.3, '#c9a27e'), ...Array.from({ length: 14 }, (_, i) => bx(0.1, 0.3, 0.2, -3.3 + (i % 7) * 0.28, i < 7 ? 1.66 : 0.9, -2.2, ['#d793ab', '#9d86c4', '#8fbfae', '#e0b36a', '#7fa6bf'][i % 5])), bx(1.8, 1.3, 0.04, 1.9, 1.8, -2.55, '#fffaf6'), bx(1.65, 1.15, 0.05, 1.9, 1.8, -2.54, '#c8e2f2')]), []);
  return (<><Lights area={4} sun={[2, 5, 4]} every /><pointLight position={[-1, 2.4, 1]} intensity={6} color="#ffd9c4" distance={6} /><mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[12, 10]} /><meshPhysicalMaterial map={floor} roughness={0.35} clearcoat={0.4} /></mesh><mesh geometry={g} material={vc} castShadow receiveShadow /><Plant position={[3.4, 0, -1.9]} s={1.3} /><Plant position={[-3.9, 0, -1.4]} />
    {xmas && [-3, -1.5, 0, 1.5, 3].map((x, i) => <mesh key={x} position={[x, 2.9 - (i % 2) * 0.12, -2.4]}><sphereGeometry args={[0.1, 20, 16]} /><meshPhysicalMaterial color={['#c2424f', '#d9b36c', '#6f9f68'][i % 3]} metalness={0.6} roughness={0.2} /></mesh>)}
    <Human key={who} id={who} position={[-0.45, 0, -0.2]} rotation={0.3} mood="talk" /><Human id="gayane" position={[0.55, 0, 0]} rotation={-0.4} /><group scale={0.9}><Beast id={pet} position={[0.1, PET.s8 === pet ? 0 : 0, 0.75]} rotation={0.2} mood="happy" /></group><mesh visible={false} material={MAT.white} /></>);
}
export default function Stories({ onExit }: { onExit: () => void }) {
  const [id, set] = useState<string | null>(null), [who, setWho] = useState('lucia'), done = useGame((s) => s.done), s = STORIES.find((x) => x.id === id);
  if (s) return (
    <div className="mode3d"><Scene cam={[0.5, 1.4, 3.3]} look={[window.innerWidth > 900 ? 0.62 : 0.05, window.innerWidth > 900 ? 0.98 : 0.6, 0]} fov={42} fog={false}><Stage who={NPCS[who] && who !== 'gayane' ? who : s.npc} pet={PET[s.id]} xmas={s.id === 's9'} /></Scene>
      <div className="hud top"><B b="Historias|Պատմություններ" icon="‹" className="small" onClick={() => set(null)} /></div>
      <div className="overlay clear"><div className="panel side"><Dialogue key={s.id} script={s} mode="Historias" onNode={(n) => setWho(n.who ?? s.npc)} onClose={() => set(null)} onEnd={(g, _e, i) => { complete(s.id, g); complete(`${s.id}:${s.nodes[i].label ?? i}`, 1); count('historias'); reward(g * 5, g * 15); set(null); }} /></div></div></div>
  );
  return (
    <Page title="Historias interactivas|Ինտերակտիվ պատմություններ" sub="Tus decisiones cambian el final. ¡Descúbrelos todos!|Քո որոշումները փոխում են ավարտը։ Բացահայտիր բոլորը։" onExit={onExit}>
      <div className="grid cards">{[...STORIES].sort((a, b) => lvlRank(a.lvl) - lvlRank(b.lvl)).map((x) => { const ends = x.nodes.filter((n) => n.end !== undefined), got = x.nodes.filter((n, i) => n.end !== undefined && done[`${x.id}:${n.label ?? i}`]).length; return <article className="card" key={x.id}><header><Portrait k={`animal:${PET[x.id]}`} size={84} /><div><T b={x.title} as="h3" /><span className="chip">{x.lvl}</span></div></header><T b={fill('Finales descubiertos: {a} de {b}|Բացահայտված ավարտներ՝ {a} / {b}', { a: got, b: ends.length })} as="p" /><footer><Stars n={done[x.id] ?? 0} /><B b="Vivir la historia|Ապրել պատմությունը" className="primary small" onClick={() => { setWho(x.npc); set(x.id); }} /></footer></article>; })}</div>
    </Page>
  );
}
