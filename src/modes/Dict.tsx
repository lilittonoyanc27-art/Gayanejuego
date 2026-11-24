import { useMemo, useState } from 'react';
import { bi, norm, sample, shuffle } from '../core/bi';
import { GLOSS, TOPICS } from '../core/glossary';
import { learnWord, useGame } from '../core/store';
import { B, Say, T } from '../ui/T';
import { Choice, Result } from '../ui/kit';
import { Page } from './Page';
export default function Dict({ onExit }: { onExit: () => void }) {
  const words = useGame((s) => s.words), [tab, setTab] = useState('mias'), [q, setQ] = useState(''), [game, setGame] = useState(0);
  const mine = Object.entries(words).sort((a, b) => b[1].t - a[1].t), list = (tab === 'mias' ? mine.map(([e, w]) => ({ es: e, hy: w.hy, known: w.known })) : GLOSS.filter((g) => g.topic === tab).map((g) => ({ es: g.es, hy: g.hy, known: !!words[g.es]?.known }))).filter((w) => !q || norm(w.es).includes(norm(q)) || w.hy.includes(q));
  if (game) return <Page title="Mi diccionario|Իմ բառարանը" onExit={() => setGame(0)} back="Diccionario|Բառարան"><Cards key={game} onExit={() => setGame(0)} onAgain={() => setGame(game + 1)} /></Page>;
  return (
    <Page title="Mi diccionario|Իմ բառարանը" sub="Cada palabra que tocas se guarda aquí. Toca una para ver su traducción.|Քո դիպչած ամեն բառ պահվում է այստեղ։ Դիպչիր՝ թարգմանությունը տեսնելու։" onExit={onExit} right={<B b="Practicar|Վարժվել" icon="🃏" className="primary" onClick={() => setGame(1)} />}>
      <div className="row tabs"><B b={`Mis palabras (${mine.length})|Իմ բառերը (${mine.length})`} className={tab === 'mias' ? 'primary' : ''} onClick={() => setTab('mias')} />{TOPICS.map((t) => <B key={t.id} b={t.name} className={tab === t.id ? 'primary' : ''} onClick={() => setTab(t.id)} />)}</div>
      <label className="search"><T b="Buscar|Որոնել" /><input value={q} onChange={(e) => setQ(e.target.value)} /></label>
      {!list.length && <T b="Aún no hay palabras. Toca cualquier palabra española durante el juego.|Դեռ բառեր չկան։ Խաղի ընթացքում դիպչիր ցանկացած իսպաներեն բառի։" as="p" className="bubble" />}
      <div className="grid words">{list.map((w) => <div key={w.es} className={`word ${w.known ? 'known' : ''}`}><span className="t" data-es={w.es} data-hy={w.hy}>{w.es}</span><Say text={w.es} /><button type="button" className="mini" aria-label="Marcar como aprendida" data-es="Marcar como aprendida" data-hy="Նշել որպես սովորած" onClick={() => { learnWord(w.es, w.hy); useGame.setState((s) => ({ words: { ...s.words, [w.es]: { ...s.words[w.es], known: !w.known } } })); }}>{w.known ? '✓' : '○'}</button></div>)}</div>
    </Page>
  );
}
function Cards({ onExit, onAgain }: { onExit: () => void; onAgain: () => void }) {
  const mine = useGame.getState().words;
  const qs = useMemo(() => { const m = Object.entries(mine).filter(([, w]) => !w.known).map(([es, w]) => ({ es, hy: w.hy })); const rest = GLOSS.filter((g) => g.topic !== 'gramatica'); return shuffle([...sample(m, 7), ...sample(rest, 10 - Math.min(7, m.length))]).map((w) => ({ w, d: sample(rest.filter((r) => r.hy !== w.hy), 3) })); }, []); // eslint-disable-line
  const [i, setI] = useState(0), [ok, setOk] = useState(0), q = qs[i];
  if (!q) return <Result ok={ok} total={qs.length} onAgain={onAgain} onExit={onExit} />;
  return <div className="stagebox"><span className="chip">{i + 1} / {qs.length}</span><div className="flash" lang="hy">{q.w.hy}</div><Choice key={i} q="¿Cómo se dice en español?|Ինչպե՞ս է իսպաներեն։" sayQ={false} opts={[bi(q.w.es, q.w.hy), ...q.d.map((x) => bi(x.es, x.hy))]} mode="Diccionario" why={bi(`«${q.w.es}» es la palabra correcta.`, `«${q.w.es}» = ${q.w.hy}`)} onDone={(g) => { learnWord(q.w.es, q.w.hy); if (g) { setOk(ok + 1); const w = useGame.getState().words[q.w.es]; if (w.n >= 3) useGame.setState((s) => ({ words: { ...s.words, [q.w.es]: { ...w, known: true } } })); } setI(i + 1); }} /></div>;
}
