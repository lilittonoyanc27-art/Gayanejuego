import { useGame } from './store';
/** Todos los sonidos se sintetizan con Web Audio: no hay archivos que descargar. */
let ctx: AudioContext | null = null, noiseBuf: AudioBuffer | null = null, amb: { stop(): void } | null = null;
function ac() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}
function noise() {
  const c = ac();
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = c.createBufferSource();
  s.buffer = noiseBuf; s.loop = true;
  return s;
}
function env(v: number, at: number, dur: number, att = 0.01) {
  const g = ac().createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(v, at + att);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  g.connect(ac().destination);
  return g;
}
function tone(f: number[], dur: number, type: OscillatorType = 'sine', v = 0.12, delay = 0, filter?: number) {
  const c = ac(), t = c.currentTime + delay, o = c.createOscillator();
  o.type = type; o.frequency.setValueAtTime(f[0], t);
  f.slice(1).forEach((x, i) => o.frequency.linearRampToValueAtTime(x, t + (dur * (i + 1)) / (f.length - 1)));
  const g = env(v, t, dur, Math.min(0.03, dur / 3));
  if (filter) { const b = c.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = filter; b.Q.value = 1.4; o.connect(b).connect(g); } else o.connect(g);
  o.start(t); o.stop(t + dur + 0.05);
}
function hiss(f: number, dur: number, v = 0.1, delay = 0, q = 1) {
  const c = ac(), t = c.currentTime + delay, n = noise(), b = c.createBiquadFilter();
  b.type = 'bandpass'; b.frequency.value = f; b.Q.value = q;
  n.connect(b).connect(env(v, t, dur)); n.start(t); n.stop(t + dur + 0.05);
}
export const SFX = {
  click: () => tone([620, 820], 0.07, 'sine', 0.05),
  good: () => [523, 659, 784].forEach((f, i) => tone([f, f], 0.28, 'triangle', 0.1, i * 0.08)),
  bad: () => { tone([300, 230], 0.3, 'triangle', 0.1); },
  coin: () => { tone([1180, 1180], 0.09, 'triangle', 0.08); tone([1560, 1560], 0.3, 'triangle', 0.09, 0.08); },
  win: () => [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone([f, f], 0.35, 'triangle', 0.09, i * 0.11)),
  door: () => { tone([880, 870], 0.7, 'sine', 0.08); tone([660, 655], 0.9, 'sine', 0.08, 0.28); },
  scan: () => tone([1400, 1400], 0.1, 'square', 0.03),
  step: () => hiss(240, 0.07, 0.05),
  perro: () => [0, 0.24].forEach((d) => { tone([420, 620, 300], 0.15, 'sawtooth', 0.16, d, 700); hiss(900, 0.1, 0.06, d); }),
  gato: () => { tone([480, 820, 760, 520], 0.75, 'sawtooth', 0.12, 0, 1300); tone([960, 1640, 1500, 1040], 0.7, 'sine', 0.025); },
  ronroneo: () => { for (let i = 0; i < 22; i++) hiss(110, 0.07, 0.16, i * 0.06, 2); },
  pajaro: () => [0, 0.14, 0.3, 0.42].forEach((d, i) => tone([2600 + i * 180, 3500, 2500], 0.11, 'sine', 0.07, d)),
  conejo: () => [0, 0.12].forEach((d) => hiss(1500, 0.06, 0.05, d, 4)),
  hamster: () => [0, 0.11, 0.2].forEach((d) => tone([2300, 2900, 2200], 0.07, 'triangle', 0.05, d)),
  pez: () => [0, 0.15, 0.27, 0.43].forEach((d) => tone([320 + Math.random() * 250, 900], 0.1, 'sine', 0.06, d)),
  agua: () => { hiss(700, 0.5, 0.08); tone([300, 620], 0.16, 'sine', 0.04, 0.1); },
  pienso: () => { for (let i = 0; i < 5; i++) hiss(2600, 0.05, 0.06, i * 0.06, 3); },
  cepillo: () => hiss(3400, 0.18, 0.05, 0, 0.6),
  burbuja: () => tone([400 + Math.random() * 500, 1200], 0.09, 'sine', 0.04),
};
export type Sfx = keyof typeof SFX;
export function play(k: Sfx) {
  if (!useGame.getState().settings.sound) return;
  try { SFX[k](); } catch { /* audio no disponible */ }
}
/** Ambiente suave: aire de la tienda, acordes lentos y algún pájaro o burbuja. */
export function ambient(kind: 'tienda' | 'clinica' | 'parque' | null) {
  amb?.stop(); amb = null;
  const { sound, ambient: on } = useGame.getState().settings;
  if (!kind || !sound || !on) return;
  try {
    const c = ac(), out = c.createGain(), n = noise(), lp = c.createBiquadFilter();
    out.gain.setValueAtTime(0, c.currentTime); out.gain.linearRampToValueAtTime(1, c.currentTime + 2); out.connect(c.destination);
    lp.type = 'lowpass'; lp.frequency.value = kind === 'parque' ? 900 : 350;
    const ng = c.createGain(); ng.gain.value = 0.012; n.connect(lp).connect(ng).connect(out); n.start();
    const chords = [[261.6, 329.6, 392], [220, 261.6, 329.6], [174.6, 220, 261.6], [196, 246.9, 293.7]];
    let i = 0;
    const chord = () => {
      const t = c.currentTime;
      chords[i++ % 4].forEach((f, k) => {
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.011, t + 1.6 + k * 0.4); g.gain.linearRampToValueAtTime(0.0001, t + 6.8);
        o.connect(g).connect(out); o.start(t); o.stop(t + 7);
      });
    };
    chord();
    const a = window.setInterval(chord, 5600);
    const b = window.setInterval(() => {
      const r = Math.random();
      if (kind === 'parque' || r < 0.4) play('pajaro'); else if (r < 0.75 && kind === 'tienda') play('pez'); else if (r < 0.82) play('perro');
    }, 14000);
    amb = { stop() { clearInterval(a); clearInterval(b); out.gain.linearRampToValueAtTime(0, c.currentTime + 0.5); setTimeout(() => { n.stop(); out.disconnect(); }, 700); } };
  } catch { /* audio no disponible */ }
}
