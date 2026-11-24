import { useEffect, useRef, useState } from 'react';
import { es, norm, similarity } from '../core/bi';
import { TONGUES } from '../data/tongue';
import { complete, count, reward, toast, useGame } from '../core/store';
import { hasVoice, makeRecognizer, speak, stopSpeech } from '../core/speech';
import { play } from '../core/audio';
import { B, T } from '../ui/T';
import { Stars } from '../ui/kit';
import { Page } from './Page';
export default function Tongue({ onExit }: { onExit: () => void }) {
  const [lvl, setLvl] = useState(1), [id, set] = useState<string | null>(null), done = useGame((s) => s.done), t = TONGUES.find((x) => x.id === id);
  return (
    <Page title="Trabalenguas|Շուտասելուկներ" sub="Escucha, repite y acelera.|Լսիր, կրկնիր և արագացրու։" onExit={t ? () => { stopSpeech(); set(null); } : onExit} back={t ? 'Trabalenguas|Շուտասելուկներ' : undefined}>
      {t ? <One key={t.id} t={t} onNext={() => { const l = TONGUES.filter((x) => x.lvl === t.lvl), i = l.indexOf(t); set(l[(i + 1) % l.length].id); }} /> : <>
        <div className="row tabs">{[['Fácil|Հեշտ', 1], ['Intermedio|Միջին', 2], ['Difícil|Դժվար', 3]].map(([b, n]) => <B key={n} b={b as string} className={lvl === n ? 'primary' : ''} onClick={() => setLvl(n as number)} />)}</div>
        <div className="grid cards">{TONGUES.filter((x) => x.lvl === lvl).map((x) => <article className="card" key={x.id}><T b={x.b} as="p" className="clip" say /><footer><Stars n={done[x.id] ?? 0} /><B b="Practicar|Վարժվել" className="primary small" onClick={() => set(x.id)} /></footer></article>)}</div></>}
    </Page>
  );
}
function One({ t, onNext }: { t: (typeof TONGUES)[number]; onNext: () => void }) {
  const [ms, setMs] = useState(0), [run, setRun] = useState(false), [reps, setReps] = useState(0), [best, setBest] = useState<number | null>(null), [heard, setHeard] = useState<string | null>(null), [rec, setRec] = useState(false), r = useRef<ReturnType<typeof makeRecognizer>>(null), can = useRef(!!makeRecognizer());
  useEffect(() => { if (!run) return; const t0 = performance.now(), i = setInterval(() => setMs(performance.now() - t0), 50); return () => clearInterval(i); }, [run]);
  useEffect(() => () => { r.current?.stop(); stopSpeech(); }, []);
  const text = es(t.b), stop = () => { setRun(false); if (ms < 1200) return; setReps((n) => n + 1); setBest((b) => (b === null ? ms : Math.min(b, ms))); const s = Math.min(3, reps + 1); if (complete(t.id, s)) count('trabalenguas'); reward(2, 8); play('good'); };
  const listen = () => { const k = makeRecognizer(); if (!k) return; stopSpeech(); r.current = k; setRec(true); setHeard(null); k.onresult = (e) => { const h = e.results[0][0].transcript; setHeard(h); const sc = similarity(h, text); if (sc > 0.7) { play('win'); if (complete(t.id, 3)) count('trabalenguas'); reward(5, 15); } else play('good'); }; k.onerror = () => { setRec(false); toast('No he podido escucharte. Comprueba el micrófono.|Չկարողացա լսել։ Ստուգիր խոսափողը։', '🎙️'); }; k.onend = () => setRec(false); k.start(); };
  const H = heard ? norm(heard).split(' ') : null;
  return (
    <div className="stagebox tongue"><T b={t.b} as="h2" className="bigtext" />
      <div className="row"><B b="Escuchar lento|Լսել դանդաղ" icon="🐢" onClick={() => speak(text, { rate: 0.6 })} /><B b="Escuchar normal|Լսել սովորական" icon="▶" onClick={() => speak(text, { rate: 0.9 })} /><B b="Escuchar rápido|Լսել արագ" icon="⚡" onClick={() => speak(text, { rate: 1.3 })} /></div>
      {!hasVoice() && <T b="Este navegador no tiene voz española instalada.|Այս դիտարկիչում իսպաներեն ձայն տեղադրված չէ։" as="p" className="neg" />}
      <p className="chrono">{(ms / 1000).toFixed(1)} s</p>
      <div className="row">{run ? <B b="He terminado|Ավարտեցի" className="primary" icon="■" onClick={stop} /> : <B b="Decirlo en voz alta|Ասել բարձրաձայն" className="primary" icon="⏱" onClick={() => { stopSpeech(); setMs(0); setRun(true); }} />}{can.current && <B b={rec ? 'Te escucho…|Լսում եմ քեզ…' : 'Comprobar con el micrófono|Ստուգել խոսափողով'} icon="🎙️" disabled={rec} onClick={listen} />}<B b="Siguiente|Հաջորդը" onClick={onNext} /></div>
      <div className="row"><T b={`Repeticiones: ${reps}|Կրկնություններ՝ ${reps}`} className="chip" />{best && <T b={`Mejor tiempo: ${(best / 1000).toFixed(1)} s|Լավագույն ժամանակ՝ ${(best / 1000).toFixed(1)} վ`} className="chip" />}</div>
      {H && <div className="fb ok"><p>{text.split(' ').map((w, i) => <span key={i} className={H.includes(norm(w)) ? 'hit' : 'miss'}>{w} </span>)}</p><b>{Math.round(similarity(heard!, text) * 100)} %</b></div>}
    </div>
  );
}
