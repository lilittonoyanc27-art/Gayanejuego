import { useState } from 'react';
import { es, euro } from '../core/bi';
import { MISSIONS } from '../data/missions';
import { NPCS } from '../data/npcs';
import { lvlRank, useGame } from '../core/store';
import { B, T } from '../ui/T';
import { Portrait, Stars } from '../ui/kit';
import { Page } from './Page';
import { Shop } from './Shop';
export default function Missions({ onExit }: { onExit: () => void }) {
  const [id, set] = useState<string | null>(null), done = useGame((s) => s.done), m = MISSIONS.find((x) => x.id === id);
  if (m) return <Shop key={m.id} mission={m} onExit={() => set(null)} onDone={() => set(null)} />;
  return (
    <Page title="Misión de compras|Գնումների առաքելություն" sub="Lee el encargo, encuentra los productos y no superes el presupuesto.|Կարդա հանձնարարությունը, գտիր ապրանքները և մի՛ գերազանցիր բյուջեն։" onExit={onExit}>
      <div className="grid cards">{[...MISSIONS].sort((a, b) => lvlRank(a.lvl) - lvlRank(b.lvl)).map((x) => (
        <article className="card" key={x.id}><header><Portrait k={`npc:${x.npc}`} size={68} /><div><b>{NPCS[x.npc].name}</b><span className="chip">{x.lvl}</span></div><b className="price">{euro(x.budget)}</b></header>
          <p className="clip t" data-es={es(x.text)} data-hy={x.text.split('|')[1]}>{es(x.text)}</p><footer><Stars n={done['mision:' + x.id] ?? 0} /><B b="Aceptar|Ընդունել" className="primary small" onClick={() => set(x.id)} /></footer></article>))}</div>
    </Page>
  );
}
export { T };
