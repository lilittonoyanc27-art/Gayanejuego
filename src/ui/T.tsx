import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { create } from 'zustand';
import { type Bi, es, hy } from '../core/bi';
import { speak } from '../core/speech';
import { lookup } from '../core/glossary';
import { learnWord, useToasts } from '../core/store';
import { play } from '../core/audio';

interface Pop { es: string; hy: string; word?: string; wordHy?: string; x: number; y: number }
const usePop = create<{ pop: Pop | null; mode: boolean }>(() => ({ pop: null, mode: false }));
export const useTrMode = () => usePop((s) => s.mode);
export const toggleTrMode = () => usePop.setState((s) => ({ mode: !s.mode, pop: null }));

/** Texto español; al hacer clic aparece la traducción armenia. */
export function T({ b, as: Tag = 'span', say, className = '', style }: { b: Bi; as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'b' | 'small' | 'li'; say?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <Tag className={`t ${className}`} data-es={es(b)} data-hy={hy(b)} style={style}>
      {es(b)}
      {say && <Say text={es(b)} />}
    </Tag>
  );
}
export function Say({ text, slow }: { text: string; slow?: boolean }) {
  return (
    <span role="button" tabIndex={0} className="say" aria-label="Escuchar" data-es="Escuchar" data-hy="Լսել"
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); speak(text, slow ? { rate: 0.65 } : {}); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); e.preventDefault(); speak(text); } }}>
      {slow ? '🐢' : <svg viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4 4 0 0 0-2.2-3.6v7.2a4 4 0 0 0 2.2-3.6zM14.3 4.2v2.1a6 6 0 0 1 0 11.4v2.1a8 8 0 0 0 0-15.6z" /></svg>}
    </span>
  );
}
/** Botón con distintivo «Ա» para traducir sin activar la acción. */
export function B({ b, onClick, className = '', icon, disabled, children, title }: { b: Bi; onClick?: () => void; className?: string; icon?: ReactNode; disabled?: boolean; children?: ReactNode; title?: string }) {
  return (
    <button type="button" title={title} className={`btn ${className}`} aria-disabled={disabled} data-es={es(b)} data-hy={hy(b)}
      onClick={() => { if (!disabled) { play('click'); onClick?.(); } }}>
      {icon && <span className="ico">{icon}</span>}
      <span className="lbl">{es(b)}</span>
      {children}
      <i className="hydot" aria-label="Traducir">Ա</i>
    </button>
  );
}
function wordAt(x: number, y: number): string | undefined {
  const d = document as Document & { caretPositionFromPoint?: (x: number, y: number) => { offsetNode: globalThis.Node; offset: number } | null };
  let node: globalThis.Node | undefined, off = 0;
  const p = d.caretPositionFromPoint?.(x, y);
  if (p) { node = p.offsetNode; off = p.offset; }
  else { const r = d.caretRangeFromPoint?.(x, y); if (r) { node = r.startContainer; off = r.startOffset; } }
  if (!node || node.nodeType !== 3) return;
  const s = node.textContent ?? '', L = /[\p{L}]/u;
  let a = off, z = off;
  while (a > 0 && L.test(s[a - 1])) a--;
  while (z < s.length && L.test(s[z])) z++;
  return a === z ? undefined : s.slice(a, z);
}
export function TranslateLayer() {
  const { pop, mode } = usePop();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  useEffect(() => {
    const open = (el: HTMLElement, x: number, y: number) => {
      const w = wordAt(x, y);
      const g = w ? lookup(w) : undefined;
      if (g) learnWord(g.es, g.hy);
      usePop.setState({ pop: { es: el.dataset.es ?? '', hy: el.dataset.hy ?? '', word: g?.es, wordHy: g?.hy, x, y } });
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.('.trpop') && !usePop.getState().mode) return;
      const el = t.closest?.<HTMLElement>('[data-hy]');
      const inTr = t.closest?.('[data-trtoggle]');
      if (!el || !el.dataset.hy || inTr) { if (usePop.getState().pop && !t.closest?.('.trpop')) usePop.setState({ pop: null }); return; }
      if (t.closest('.trpop')) return;
      const act = t.closest('button,.say,a');
      if (act && !usePop.getState().mode && !t.closest('.hydot')) { usePop.setState({ pop: null }); return; }
      e.preventDefault(); e.stopPropagation();
      open(el, e.clientX, e.clientY);
    };
    const onCtx = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.<HTMLElement>('[data-hy]');
      if (el?.dataset.hy) { e.preventDefault(); open(el, e.clientX, e.clientY); }
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('contextmenu', onCtx, true);
    return () => { document.removeEventListener('click', onClick, true); document.removeEventListener('contextmenu', onCtx, true); };
  }, []);
  useLayoutEffect(() => {
    if (!pop || !ref.current) return;
    const r = ref.current.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight;
    const top = pop.y + 18 + r.height > H - 8 ? Math.max(8, pop.y - r.height - 16) : pop.y + 18;
    setPos({ left: Math.min(Math.max(8, pop.x - r.width / 2), W - r.width - 8), top });
  }, [pop]);
  useEffect(() => { document.body.classList.toggle('trmode', mode); }, [mode]);
  if (!pop) return null;
  return (
    <div ref={ref} className="trpop" style={pos} role="dialog" aria-label="Traducción">
      {pop.word && (
        <div className="trword">
          <b>{pop.word}</b><span lang="hy">{pop.wordHy}</span><Say text={pop.word} />
          <button type="button" className="mini" title="Guardar" onClick={() => learnWord(pop.word!, pop.wordHy!, true)}>＋</button>
        </div>
      )}
      <div className="trhy" lang="hy">{pop.hy}</div>
      <div className="trfoot"><em>{pop.es}</em><Say text={pop.es} /><Say text={pop.es} slow /></div>
    </div>
  );
}
export function Toasts() {
  const l = useToasts((s) => s.list);
  return <div className="toasts" aria-live="polite">{l.map((x) => <div className="toast" key={x.id}><span>{x.icon}</span><T b={x.b} /></div>)}</div>;
}
