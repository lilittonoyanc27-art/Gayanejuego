import type { ReactNode } from 'react';
import type { Bi } from '../core/bi';
import { B, T } from '../ui/T';
export function Page({ title, sub, onExit, children, right, back }: { title: Bi; sub?: Bi; onExit: () => void; children: ReactNode; right?: ReactNode; back?: Bi }) {
  return (
    <main className="page">
      <header className="phead"><B b={back ?? 'Menú|Մենյու'} icon="‹" className="small" onClick={onExit} /><div><T b={title} as="h1" say />{sub && <T b={sub} as="p" />}</div><div className="pright">{right}</div></header>
      {children}
    </main>
  );
}
