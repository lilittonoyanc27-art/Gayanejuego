import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Bi, es, hy } from './bi';
import { ACHIEVEMENTS, DAILY_POOL } from '../data/meta';

export interface ErrorEntry { q: Bi; a: Bi; ok: Bi; why: Bi; mode: string; t: number }
export interface WordEntry { hy: string; n: number; known: boolean; t: number }
export interface OwnShop {
  day: number; cash: number; warehouse: Record<string, number>; shelf: Record<string, number>; price: Record<string, number>;
  depts: string[]; decor: string[]; rep: number; served: number; history: { day: number; income: number; cost: number; served: number }[];
  orders: { id: number; items: string[]; who: string }[]; income: number; cost: number;
}
export type Level = 'A2' | 'B1' | 'B2';
export interface Settings { rate: number; sound: boolean; ambient: boolean; quality: 'alta' | 'baja'; level: 'auto' | Level }
export interface State {
  coins: number; xp: number; correct: number; wrong: number; streak: number; bestStreak: number; seconds: number;
  words: Record<string, WordEntry>; errors: ErrorEntry[]; ach: string[]; animals: string[];
  done: Record<string, number>; modeStats: Record<string, { ok: number; ko: number }>;
  counters: Record<string, number>; inventory: Record<string, number>;
  daily: { date: string; ids: string[]; base: Record<string, number>; claimed: string[]; days: number };
  settings: Settings; own: OwnShop; greeted: boolean;
}
const ownInit = (): OwnShop => ({
  day: 1, cash: 150, warehouse: {}, shelf: {}, price: {}, depts: ['alimentos', 'juguetes'], decor: [], rep: 50, served: 0,
  history: [], orders: [], income: 0, cost: 0,
});
const init = (): State => ({
  coins: 80, xp: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0, seconds: 0, words: {}, errors: [], ach: [], animals: [], done: {},
  modeStats: {}, counters: {}, inventory: {}, daily: { date: '', ids: [], base: {}, claimed: [], days: 0 },
  settings: { rate: 0.95, sound: true, ambient: true, quality: 'alta', level: 'auto' }, own: ownInit(), greeted: false,
});
export interface Toast { id: number; b: Bi; icon: string }
export const useToasts = create<{ list: Toast[] }>(() => ({ list: [] }));
let toastId = 0;
export function toast(b: Bi, icon = '✨') {
  const id = ++toastId;
  useToasts.setState((s) => ({ list: [...s.list.slice(-2), { id, b, icon }] }));
  setTimeout(() => useToasts.setState((s) => ({ list: s.list.filter((x) => x.id !== id) })), 4200);
}
export const useGame = create<State>()(
  persist(() => init(), {
    name: 'gayane-mundo-animal-v1',
    merge: (p, c) => {
      const s = (p ?? {}) as Partial<State>;
      return { ...c, ...s, settings: { ...c.settings, ...s.settings }, own: { ...c.own, ...s.own }, daily: { ...c.daily, ...s.daily } };
    },
  }),
);
const set = useGame.setState, get = useGame.getState;

export const levelOf = (xp: number) => Math.floor(Math.sqrt(xp / 60)) + 1;
export const xpFor = (lvl: number) => 60 * (lvl - 1) ** 2;
export function cefr(s = get()): Level {
  if (s.settings.level !== 'auto') return s.settings.level;
  const l = levelOf(s.xp);
  return l >= 8 ? 'B2' : l >= 4 ? 'B1' : 'A2';
}
/** Ordena por cercanía al nivel actual: primero el nivel de la jugadora. */
export const lvlRank = (l: string) => {
  const o = ['A2', 'B1', 'B2'];
  const d = o.indexOf(l) - o.indexOf(cefr());
  return d <= 0 ? -d : d * 2;
};
export function reward(coins: number, xp: number) {
  const before = levelOf(get().xp);
  set((s) => ({ coins: Math.max(0, Math.round((s.coins + coins) * 100) / 100), xp: s.xp + xp }));
  const after = levelOf(get().xp);
  if (after > before) toast(`¡Has subido al nivel ${after}!|Դու բարձրացար ${after}-րդ մակարդակ։`, '🌟');
  checkAch();
}
export const spend = (n: number) => {
  if (get().coins < n) return false;
  set((s) => ({ coins: Math.round((s.coins - n) * 100) / 100 }));
  return true;
};
export function right(mode: string, xp = 8, coins = 2) {
  set((s) => {
    const m = s.modeStats[mode] ?? { ok: 0, ko: 0 }, streak = s.streak + 1;
    return { correct: s.correct + 1, streak, bestStreak: Math.max(s.bestStreak, streak), modeStats: { ...s.modeStats, [mode]: { ...m, ok: m.ok + 1 } } };
  });
  count('aciertos');
  reward(coins, xp);
}
export function wrong(mode: string, q: Bi, a: Bi, ok: Bi, why: Bi) {
  set((s) => {
    const m = s.modeStats[mode] ?? { ok: 0, ko: 0 };
    return {
      wrong: s.wrong + 1, streak: 0, modeStats: { ...s.modeStats, [mode]: { ...m, ko: m.ko + 1 } },
      errors: [{ q, a, ok, why, mode, t: Date.now() }, ...s.errors].slice(0, 200),
    };
  });
}
export function count(k: string, n = 1) {
  set((s) => ({ counters: { ...s.counters, [k]: (s.counters[k] ?? 0) + n } }));
  checkAch();
}
export function complete(id: string, stars = 1) {
  const first = !get().done[id];
  set((s) => ({ done: { ...s.done, [id]: Math.max(stars, s.done[id] ?? 0) } }));
  if (first) count('completados');
  return first;
}
export function collect(id: string) {
  if (get().animals.includes(id)) return false;
  set((s) => ({ animals: [...s.animals, id] }));
  toast('¡Nuevo animal en tu colección!|Նոր կենդանի քո հավաքածուում։', '🐾');
  reward(5, 10);
  return true;
}
export function learnWord(w: string, h: string, save = false) {
  set((s) => {
    const o = s.words[w];
    return { words: { ...s.words, [w]: { hy: h || o?.hy || '', n: (o?.n ?? 0) + 1, known: o?.known ?? false, t: o?.t ?? Date.now() } } };
  });
  if (save) toast('Palabra guardada en tu diccionario.|Բառը պահպանվեց քո բառարանում։', '📖');
  checkAch();
}
function checkAch() {
  const s = get();
  const fresh = ACHIEVEMENTS.filter((a) => !s.ach.includes(a.id) && a.test(s));
  if (!fresh.length) return;
  set((x) => ({ ach: [...x.ach, ...fresh.map((f) => f.id)], coins: x.coins + fresh.length * 15 }));
  fresh.forEach((f) => toast(`¡Logro conseguido! ${es(f.title)}|Նոր ձեռքբերում՝ ${hy(f.title)}`, f.icon));
}
const today = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
export function ensureDaily() {
  const s = get();
  if (s.daily.date === today()) return;
  const seed = new Date().getDate() + new Date().getMonth() * 31;
  const ids = [0, 1, 2].map((i) => DAILY_POOL[(seed * 3 + i) % DAILY_POOL.length].id);
  set({ daily: { date: today(), ids, base: { ...s.counters }, claimed: [], days: s.daily.days + 1 } });
}
export function claimDaily(id: string) {
  const s = get(), d = DAILY_POOL.find((x) => x.id === id);
  if (!d || s.daily.claimed.includes(id) || (s.counters[d.key] ?? 0) - (s.daily.base[d.key] ?? 0) < d.n) return;
  set({ daily: { ...s.daily, claimed: [...s.daily.claimed, id] } });
  reward(20, 40);
  toast('¡Misión diaria completada!|Օրվա առաքելությունը կատարված է։', '🎁');
}
export const setOwn = (p: Partial<OwnShop>) => set((s) => ({ own: { ...s.own, ...p } }));
export const setSettings = (p: Partial<Settings>) => set((s) => ({ settings: { ...s.settings, ...p } }));
export const resetAll = () => { set({ ...init(), settings: get().settings }, true); ensureDaily(); };
export const addInventory = (id: string, n: number) => set((s) => ({ inventory: { ...s.inventory, [id]: (s.inventory[id] ?? 0) + n } }));
