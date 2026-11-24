import { useGame } from './store';
let voices: SpeechSynthesisVoice[] = [];
const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
const load = () => { voices = (synth?.getVoices() ?? []).filter((v) => /^es/i.test(v.lang)); };
load();
synth?.addEventListener?.('voiceschanged', load);
const score = (v: SpeechSynthesisVoice) =>
  (/natural|neural|enhanced|premium|mejorad/i.test(v.name) ? 8 : 0) + (/google/i.test(v.name) ? 5 : 0) +
  (/m[oó]nica|marisol|elvira|paulina|helena|laura/i.test(v.name) ? 4 : 0) + (/es[-_]ES/i.test(v.lang) ? 6 : 0) -
  (/eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley/i.test(v.name) ? 9 : 0);
const male = /jorge|juan|diego|pablo|alvaro|álvaro|carlos/i;
export const hasVoice = () => voices.length > 0;
export function speak(text: string, opt: { rate?: number; male?: boolean; onEnd?: () => void } = {}) {
  if (!synth) { opt.onEnd?.(); return; }
  synth.cancel();
  if (!voices.length) load();
  const u = new SpeechSynthesisUtterance(text.replace(/[_*«»]/g, ' '));
  const sorted = [...voices].sort((a, b) => score(b) - score(a));
  const v = (opt.male && sorted.find((x) => male.test(x.name))) || sorted[0];
  if (v) u.voice = v;
  u.lang = v?.lang ?? 'es-ES';
  u.rate = opt.rate ?? useGame.getState().settings.rate;
  u.pitch = opt.male && !(v && male.test(v.name)) ? 0.8 : 1.03;
  if (opt.onEnd) { u.onend = opt.onEnd; u.onerror = opt.onEnd; }
  synth.speak(u);
}
export const stopSpeech = () => synth?.cancel();

interface Rec { lang: string; interimResults: boolean; maxAlternatives: number; start(): void; stop(): void;
  onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null; onerror: (() => void) | null; onend: (() => void) | null }
export function makeRecognizer(): Rec | null {
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  const C = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!C) return null;
  const r = new C();
  r.lang = 'es-ES'; r.interimResults = false; r.maxAlternatives = 1;
  return r;
}
