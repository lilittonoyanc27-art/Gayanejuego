import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { type Bi, es, shuffle, similarity } from '../core/bi';
import { B, Say, T } from './T';
import { speak, stopSpeech } from '../core/speech';
import { play } from '../core/audio';
import { right, wrong } from '../core/store';
import { type Node, type Script, OFFTOPIC, OFFTOPIC_WHY } from '../data/script';
import { NPCS } from '../data/npcs';
import { thumb } from '../three/thumbs';

export function Panel({ children, className = '', onClose }: { children: ReactNode; className?: string; onClose?: () => void }) {
  useEffect(() => {
    if (!onClose) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="overlay">
      <div className={`panel ${className}`}>
        {onClose && <button type="button" className="x" aria-label="Cerrar" data-es="Cerrar" data-hy="Փակել" onClick={() => { play('click'); onClose(); }}>✕</button>}
        {children}
      </div>
    </div>
  );
}
export function useClock(run = true) {
  const [s, set] = useState(0);
  useEffect(() => {
    if (!run) return;
    const i = setInterval(() => set((x) => x + 1), 1000);
    return () => clearInterval(i);
  }, [run]);
  return [s, () => set(0)] as const;
}
export const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
export const Clock = ({ s, warn }: { s: number; warn?: boolean }) => <span className={`clock ${warn ? 'warn' : ''}`}>⏱ {mmss(Math.max(0, s))}</span>;
export const Stars = ({ n, of = 3 }: { n: number; of?: number }) => <span className="stars">{Array.from({ length: of }, (_, i) => <i key={i} className={i < n ? 'on' : ''}>★</i>)}</span>;
export const Bar = ({ v, label, color }: { v: number; label?: Bi; color?: string }) => (
  <div className="bar">{label && <T b={label} as="small" />}<div><i style={{ width: `${Math.max(0, Math.min(100, v))}%`, background: color }} /></div></div>
);
/** Pregunta con opciones barajadas (la primera de `opts` es la correcta). */
export function Choice({ q, opts, why, mode, onDone, children, sayQ, ctx }: { q?: Bi; ctx?: Bi; opts: Bi[]; why?: Bi; mode: string; onDone: (ok: boolean) => void; children?: ReactNode; sayQ?: boolean }) {
  const order = useMemo(() => shuffle(opts), [opts]);
  const [sel, setSel] = useState<Bi | null>(null);
  const ok = sel === opts[0];
  const choose = (o: Bi) => {
    if (sel) return;
    setSel(o);
    if (o === opts[0]) { play('good'); right(mode); } else { play('bad'); wrong(mode, q ?? ctx ?? '', o, opts[0], why ?? ''); }
  };
  return (
    <div className="choice">
      {ctx && <T b={ctx} as="p" className="ctx" say />}
      {q && <T b={q} as="h3" say={sayQ ?? true} />}
      {children}
      <div className="opts">
        {order.map((o) => (
          <button type="button" key={o} data-es={es(o)} data-hy={o.split('|')[1]} className={`opt ${sel ? (o === opts[0] ? 'ok' : o === sel ? 'ko' : 'dim') : ''}`} onClick={() => choose(o)}>
            <span>{es(o)}</span>{o.includes('|') && <i className="hydot">Ա</i>}{sel && <Say text={es(o)} />}
          </button>
        ))}
      </div>
      {sel && (
        <div className={`fb ${ok ? 'ok' : 'ko'}`}>
          <T b={ok ? '¡Muy bien, Gayane!|Շատ լավ է, Գայանե՛։' : 'Todavía no. Fíjate bien:|Դեռ ոչ։ Ուշադիր նայիր․'} as="b" />
          {!ok && <T b={opts[0]} as="p" say />}
          {why && <T b={why} as="p" />}
          <B b="Continuar|Շարունակել" className="primary" onClick={() => onDone(ok)} />
        </div>
      )}
    </div>
  );
}
export function Result({ ok, total, secs, onAgain, onExit, children, title }: { ok: number; total: number; secs?: number; onAgain?: () => void; onExit: () => void; children?: ReactNode; title?: Bi }) {
  const p = total ? ok / total : 1, n = p >= 0.9 ? 3 : p >= 0.6 ? 2 : p >= 0.3 ? 1 : 0;
  useEffect(() => { if (n) play('win'); }, [n]);
  return (
    <div className="result">
      <Stars n={n} />
      <T b={title ?? (n === 3 ? '¡Impresionante!|Տպավորիչ է։' : n === 2 ? '¡Muy buen trabajo!|Շատ լավ աշխատանք։' : 'Cada intento cuenta. ¡Otra vez!|Յուրաքանչյուր փորձ կարևոր է։ Եվս մեկ անգամ։')} as="h2" />
      <p className="big">{ok} / {total}{secs !== undefined && <> · <Clock s={secs} /></>}</p>
      {children}
      <div className="row">{onAgain && <B b="Jugar otra vez|Խաղալ նորից" onClick={onAgain} className="primary" />}<B b="Volver|Վերադառնալ" onClick={onExit} /></div>
    </div>
  );
}
export function Portrait({ k, size = 88 }: { k: string; size?: number }) {
  const [src, set] = useState('');
  useEffect(() => { let on = true; void thumb(k).then((u) => on && set(u)); return () => { on = false; }; }, [k]);
  return <span className="portrait" style={{ width: size, height: size }}>{src && <img src={src} alt="" width={size} height={size} />}</span>;
}
/** Motor de conversación: ramas, cuatro opciones, escritura libre, explicación de errores. */
export function Dialogue({ script, mode, vars, onEnd, onClose, onNode }: { script: Script; mode: string; vars?: (b: Bi) => Bi; onEnd: (grade: number, errors: number, endIndex: number) => void; onClose?: () => void; onNode?: (n: Node) => void }) {
  const [i, setI] = useState(0);
  const [errs, setErrs] = useState(0);
  const [tried, setTried] = useState<Bi[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; b: Bi } | null>(null);
  const [text, setText] = useState('');
  const [write, setWrite] = useState(false);
  const [log, setLog] = useState<{ me: boolean; b: Bi }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const n = script.nodes[i];
  const v = vars ?? ((b: Bi) => b);
  const who = NPCS[n.who ?? script.npc] ?? NPCS.lucia;
  const line = v(n.line);
  useEffect(() => {
    onNode?.(n);
    speak(es(line), { male: !n.narr && who.male });
    return stopSpeech;
    // eslint-disable-next-line
  }, [i, script]);
  useEffect(() => { logRef.current?.scrollTo({ top: 9e5 }); }, [log, i, msg]);
  const options = useMemo(() => {
    if (!n.opts.length) return [];
    const bad = n.bad.map((x) => ({ b: x.b, why: x.why, ok: false, to: undefined as string | undefined }));
    const good = n.opts.map((x) => ({ b: x.b, why: '', ok: true, to: x.to }));
    const off = shuffle(OFFTOPIC).slice(0, Math.max(0, 4 - bad.length - good.length)).map((b) => ({ b, why: OFFTOPIC_WHY, ok: false, to: undefined }));
    return shuffle([...good, ...bad, ...off]);
  }, [n]);
  const go = (to?: string) => {
    setMsg(null); setTried([]); setText('');
    const j = to ? script.nodes.findIndex((x) => x.label === to) : i + 1;
    if (j < 0 || j >= script.nodes.length) onEnd(errs ? 2 : 3, errs, i);
    else setI(j);
  };
  const choose = (o: (typeof options)[number]) => {
    if (o.ok) {
      if (!tried.length) right(mode);
      play('good');
      setLog((l) => [...l, { me: false, b: line }, { me: true, b: o.b }]);
      go(o.to ?? n.goto);
    } else {
      play('bad');
      setErrs((e) => e + 1); setTried((t) => [...t, o.b]);
      setMsg({ ok: false, b: o.why });
      wrong(mode, line, o.b, n.opts[0].b, o.why);
      speak(es(o.why), { male: who.male });
    }
  };
  const submit = () => {
    if (!text.trim()) return;
    const r = options.map((o) => ({ o, s: similarity(text, es(o.b)) })).sort((a, b) => b.s - a.s)[0];
    if (r && r.s >= 0.62) { setText(''); choose(r.o.ok || r.s > 0.9 ? r.o : options.find((o) => o.ok && similarity(text, es(o.b)) >= 0.62) ?? r.o); }
    else {
      const hint = es(n.opts[0].b).split(' ').slice(0, 3).join(' ');
      setMsg({ ok: false, b: `Perdona, no te he entendido bien. Puedes empezar así: «${hint}…»|Կներես, լավ չհասկացա։ Կարող ես այսպես սկսել՝ «${hint}…»` });
    }
  };
  const end = n.end !== undefined;
  return (
    <div className="dlg">
      <header><Portrait k={`npc:${n.who ?? script.npc}`} /><div><b className="npcname">{n.narr ? es(v(script.title)) : who.name}</b>{!n.narr && <T b={who.role} as="small" />}</div><span className="chip">{script.lvl}</span></header>
      <div className="log" ref={logRef}>
        {log.slice(-6).map((l, k) => <T key={k} b={l.b} as="p" className={l.me ? 'me' : 'old'} />)}
        <T b={line} as="p" className={`bubble ${n.narr ? 'narr' : ''}`} say />
        {msg && <div className="fb ko"><T b={msg.b} as="p" say /></div>}
      </div>
      {end ? (
        <div className="row"><Stars n={Math.max(1, n.end! - (errs > 4 ? 1 : 0))} /><B b="Terminar|Ավարտել" className="primary" onClick={() => onEnd(Math.max(1, n.end! - (errs > 4 ? 1 : 0)), errs, i)} /></div>
      ) : !options.length ? (
        <div className="row"><B b="Continuar|Շարունակել" className="primary" onClick={() => { setLog((l) => [...l, { me: false, b: line }]); go(n.goto); }} /></div>
      ) : (
        <>
          <div className="opts">
            {options.map((o) => (
              <button type="button" key={o.b} data-es={es(o.b)} data-hy={o.b.split('|')[1]} className={`opt ${tried.includes(o.b) ? 'ko' : ''}`} onClick={() => !tried.includes(o.b) && choose(o)}>
                <span>{es(o.b)}</span><i className="hydot">Ա</i><Say text={es(o.b)} />
              </button>
            ))}
          </div>
          <div className="row write">
            {write ? (
              <><input autoFocus value={text} lang="es" aria-label="Tu respuesta en español" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter') submit(); }} /><B b="Responder|Պատասխանել" className="primary" onClick={submit} /></>
            ) : <B b="Escribir mi respuesta|Գրել իմ պատասխանը" icon="✍️" onClick={() => setWrite(true)} />}
            {onClose && <B b="Salir|Դուրս գալ" onClick={onClose} />}
          </div>
        </>
      )}
    </div>
  );
}
