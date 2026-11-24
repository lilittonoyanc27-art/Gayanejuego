/** Texto bilingüe compacto: "español|հայերեն". El armenio solo se muestra cuando la jugadora lo pide. */
export type Bi = string;
export const es = (b: Bi) => b.split('|')[0].trim();
export const hy = (b: Bi) => (b.split('|')[1] ?? '').trim();
export const bi = (a: string, b: string): Bi => `${a}|${b}`;
export const join = (...xs: Bi[]): Bi => bi(xs.map(es).join(' '), xs.map(hy).join(' '));
export const list = (xs: Bi[], sep = ', '): Bi => bi(xs.map(es).join(sep), xs.map(hy).join(sep));
export function fill(b: Bi, vars: Record<string, string | number>): Bi {
  const put = (s: string, pick: (x: Bi) => string) =>
    s.replace(/\{(\w+)\}/g, (_, k: string) => {
      const v = vars[k];
      return v === undefined ? '' : typeof v === 'number' ? String(v) : v.includes('|') ? pick(v) : v;
    });
  return bi(put(es(b), es), put(hy(b), hy));
}
export const euro = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
export const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
export function shuffle<T>(xs: readonly T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(Math.random() * xs.length)];
export const sample = <T,>(xs: readonly T[], n: number) => shuffle(xs).slice(0, n);
/** Semejanza 0..1 entre dos frases, por palabras, con tolerancia de una letra. */
export function similarity(a: string, b: string) {
  const A = norm(a).split(' ').filter(Boolean), B = norm(b).split(' ').filter(Boolean);
  if (!A.length || !B.length) return 0;
  const near = (x: string, y: string) => {
    if (x === y) return true;
    if (x.length < 5 || Math.abs(x.length - y.length) > 1) return false;
    let i = 0, j = 0, d = 0;
    while (i < x.length && j < y.length) {
      if (x[i] === y[j]) { i++; j++; continue; }
      if (++d > 1) return false;
      if (x.length >= y.length) i++;
      if (y.length >= x.length) j++;
    }
    return true;
  };
  const hit = (X: string[], Y: string[]) => X.filter((x) => Y.some((y) => near(x, y))).length / X.length;
  return (hit(A, B) + hit(B, A)) / 2;
}
