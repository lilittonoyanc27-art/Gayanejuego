import { DAILY_POOL } from '../data/meta';
import { claimDaily, useGame } from '../core/store';
import { B, T } from '../ui/T';
import { Bar } from '../ui/kit';
export function DailyBox() {
  const d = useGame((s) => s.daily), c = useGame((s) => s.counters);
  return <section className="stagebox daily"><T b="Misiones diarias|Օրվա առաքելություններ" as="h3" />{d.ids.map((id) => { const m = DAILY_POOL.find((x) => x.id === id)!, v = Math.min(m.n, (c[m.key] ?? 0) - (d.base[m.key] ?? 0)); return <div className="line" key={id}><T b={m.b} /><Bar v={(v / m.n) * 100} /><span>{v} / {m.n}</span>{d.claimed.includes(id) ? <span>✅</span> : <B b="Recoger|Ստանալ" icon="🎁" className={`small ${v >= m.n ? 'primary' : ''}`} disabled={v < m.n} onClick={() => claimDaily(id)} />}</div>; })}</section>;
}
