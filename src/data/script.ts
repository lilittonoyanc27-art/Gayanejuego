import type { Bi } from '../core/bi';
export interface Opt { b: Bi; to?: string }
export interface Node { label?: string; who?: string; narr: boolean; line: Bi; opts: Opt[]; bad: { b: Bi; why: Bi }[]; goto?: string; end?: number }
export interface Script { id: string; npc: string; lvl: string; title: Bi; nodes: Node[] }
/** Formato: ## id;npc;nivel;título · :etiqueta · > PNJ (o >npc> otro) · * narración · + respuesta => etiqueta · - error !! explicación · => salto · = estrellas final */
export function parseScripts(src: string): Script[] {
  const out: Script[] = [];
  let s: Script | undefined, n: Node | undefined, label: string | undefined;
  const push = (line: Bi, narr: boolean, who?: string) => {
    n = { label, who, narr, line, opts: [], bad: [] };
    label = undefined;
    s!.nodes.push(n);
  };
  for (const raw of src.split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    if (l.startsWith('## ')) {
      const [id, npc, lvl, ...t] = l.slice(3).split(';');
      s = { id: id.trim(), npc: npc.trim(), lvl: lvl.trim(), title: t.join(';').trim(), nodes: [] };
      out.push(s); n = undefined; label = undefined;
    } else if (l[0] === ':') label = l.slice(1).trim();
    else if (l.startsWith('=>')) n!.goto = l.slice(2).trim();
    else if (l[0] === '=') { push(l.slice(3).trim(), true); n!.end = Number(l[2]); }
    else if (l[0] === '>') { const m = /^>(\w+)>(.*)$/.exec(l); push((m ? m[2] : l.slice(1)).trim(), false, m?.[1]); }
    else if (l[0] === '*') push(l.slice(1).trim(), true);
    else if (l[0] === '+') { const [b, to] = l.slice(1).split('=>'); n!.opts.push({ b: b.trim(), to: to?.trim() }); }
    else if (l[0] === '-') { const [b, why] = l.slice(1).split('!!'); n!.bad.push({ b: b.trim(), why: (why ?? '').trim() }); }
  }
  return out;
}
export const OFFTOPIC: Bi[] = [
  'Mi abuela vive en una casa amarilla.|Տատիկս ապրում է դեղին տանը։', 'El tren sale a las siete y media.|Գնացքը մեկնում է յոթն անց կեսին։',
  'Ayer llovió en la montaña.|Երեկ սարերում անձրև եկավ։', 'Prefiero las matemáticas a la historia.|Մաթեմատիկան նախընտրում եմ պատմությունից։',
  'Mi hermano toca la guitarra.|Եղբայրս կիթառ է նվագում։', 'La sopa está demasiado salada.|Ապուրը չափազանց աղի է։',
  'El cine está al lado del museo.|Կինոթատրոնը թանգարանի կողքին է։', 'Mañana tengo un examen de física.|Վաղը ֆիզիկայի քննություն ունեմ։',
  'Las ventanas de mi clase son enormes.|Դասարանիս պատուհանները հսկայական են։', 'En agosto fuimos a la playa en autobús.|Օգոստոսին ավտոբուսով լողափ գնացինք։',
  'El avión aterrizó con dos horas de retraso.|Ինքնաթիռը վայրէջք կատարեց երկու ժամ ուշացումով։', 'Me duele la muñeca de tanto escribir.|Շատ գրելուց դաստակս ցավում է։',
  'Los martes nado en la piscina municipal.|Երեքշաբթի օրերին լողում եմ քաղաքային լողավազանում։', 'El reloj de la torre está roto.|Աշտարակի ժամացույցը փչացած է։',
];
export const OFFTOPIC_WHY: Bi = 'La frase es correcta, pero no responde a lo que te han dicho. Escucha otra vez la pregunta.|Նախադասությունը ճիշտ է, բայց չի պատասխանում քեզ ասվածին։ Նորից լսիր հարցը։';
