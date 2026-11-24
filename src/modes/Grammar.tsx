import { useMemo, useState } from 'react';
import { bi, es, hy, fill, shuffle } from '../core/bi';
import { GRAMMAR, type GTopic } from '../data/grammar';
import { lookup } from '../core/glossary';
import { NPCS } from '../data/npcs';
import { complete, count, lvlRank, useGame } from '../core/store';
import { B, T } from '../ui/T';
import { Choice, Clock, Portrait, Result, Stars, useClock } from '../ui/kit';
import { Page } from './Page';
/** Una jornada de la tienda: cada cliente espera que Gayane complete lo que quiere decir. */
function Round({ t, onExit, onAgain }: { t: GTopic; onExit: () => void; onAgain: () => void }) {
  const items = useMemo(() => shuffle(t.items), [t]), [i, setI] = useState(0), [ok, setOk] = useState(0), [secs] = useClock(i < items.length), [build, setBuild] = useState<string[] | null>(null);
  const it = items[i];
  const next = (good: boolean) => { const o = ok + (good ? 1 : 0); setOk(o); setBuild(null); if (i + 1 >= items.length) { complete(t.id, o === items.length ? 3 : o >= items.length * 0.6 ? 2 : 1); count('gramatica'); } setI(i + 1); };
  if (!it) return <Result ok={ok} total={items.length} secs={secs} onExit={onExit} onAgain={onAgain}><T b={t.tip} as="p" say /></Result>;
  const full = es(it.q).replace('___ ', it.o[0] + ' ').replace('___', it.o[0]);
  return (
    <div className="stagebox"><div className="row between"><Clock s={secs} /><span className="chip">{i + 1} / {items.length}</span><span className="faces">{items.map((x, j) => <span key={j} className={j < i ? 'in' : ''}>{j < i ? '🤍' : '·'}{x.who === '' ? '' : ''}</span>)}</span></div>
      <header className="npchead"><Portrait k={`npc:${it.who}`} size={120} /><div><b>{NPCS[it.who].name}</b><T b={NPCS[it.who].role} as="small" /><T b={it.ctx} as="p" className="bubble" say /></div></header>
      {build === null ? <Choice key={i} q={it.q} sayQ={false} opts={it.o.map((o) => bi(o, lookup(o)?.hy ?? hy(it.q)))} why={it.why} mode="Gramática" onDone={(g) => (g ? setBuild([]) : next(false))} />
        : <Order key={'b' + i} sentence={full} hyText={hy(it.q)} onDone={() => next(true)} />}
    </div>
  );
}
function Order({ sentence, hyText, onDone }: { sentence: string; hyText: string; onDone: () => void }) {
  const words = useMemo(() => sentence.split(' '), [sentence]), pool = useMemo(() => shuffle(words.map((w, i) => ({ w, i }))), [words]), [sel, setSel] = useState<number[]>([]), [bad, setBad] = useState(false);
  const done = sel.length === words.length && sel.map((i) => words[i]).join(' ') === sentence;
  return <div className="choice"><T b="Ahora dilo tú: ordena la frase.|Հիմա դու ասա՝ դասավորիր նախադասությունը։" as="h3" /><div className="built">{sel.map((i) => <button type="button" key={i} onClick={() => setSel(sel.filter((x) => x !== i))}>{words[i]}</button>)}</div><div className="pool">{pool.filter((p) => !sel.includes(p.i)).map((p) => <button type="button" key={p.i} onClick={() => { const n = [...sel, p.i]; setSel(n); setBad(n.length === words.length && n.map((x) => words[x]).join(' ') !== sentence); }}>{p.w}</button>)}</div>{bad && !done && <T b="Casi. Toca una palabra para devolverla.|Գրեթե։ Դիպչիր բառին՝ վերադարձնելու համար։" as="p" className="neg" />}{done && <div className="fb ok"><T b={bi(sentence, hyText)} as="p" say /></div>}<div className="row">{done ? <B b="Siguiente cliente|Հաջորդ հաճախորդը" className="primary" onClick={onDone} /> : <B b="Saltar|Բաց թողնել" onClick={onDone} />}</div></div>;
}
export default function Grammar({ onExit }: { onExit: () => void }) {
  const [id, set] = useState<string | null>(null), [k, setK] = useState(0), done = useGame((s) => s.done), t = GRAMMAR.find((x) => x.id === id);
  if (t) return <Page title={t.place} sub={t.name} onExit={() => set(null)} back="Desafíos|Մարտահրավերներ"><Round key={k} t={t} onExit={() => set(null)} onAgain={() => setK(k + 1)} /></Page>;
  return <Page title="Desafíos de español|Իսպաներենի մարտահրավերներ" sub="Escenas cortas de la tienda en las que cada palabra cuenta.|Խանութի կարճ տեսարաններ, որտեղ ամեն բառ կարևոր է։" onExit={onExit}><div className="grid cards">{[...GRAMMAR].sort((a, b) => lvlRank(a.lvl) - lvlRank(b.lvl)).map((x) => <article className="card" key={x.id}><header><Portrait k={`npc:${x.items[0].who}`} size={72} /><div><T b={x.place} as="h3" /><T b={x.name} as="p" /></div><span className="chip">{x.lvl}</span></header><T b={x.tip} as="p" /><footer><Stars n={done[x.id] ?? 0} /><B b="Empezar|Սկսել" className="primary small" onClick={() => set(x.id)} /></footer><T b={fill('{n} clientes|{n} հաճախորդ', { n: x.items.length })} as="small" /></article>)}</div></Page>;
}
