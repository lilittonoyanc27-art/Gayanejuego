import { useMemo, useState } from 'react';
import { es, hy, type Bi } from '../core/bi';
import { ACHIEVEMENTS } from '../data/meta';
import { ANIMALS, P } from '../data/products';
import { cefr, levelOf, resetAll, setSettings, toast, useGame, xpFor, type Settings } from '../core/store';
import { ambient, play } from '../core/audio';
import { speak } from '../core/speech';
import { B, Say, T } from '../ui/T';
import { Bar, Panel, Portrait, mmss } from '../ui/kit';
import { Page } from './Page';
import { GRAMMAR } from '../data/grammar';
import { DailyBox } from './Daily';

export function report() {
  const s = useGame.getState(), tot = s.correct + s.wrong, L: string[] = [];
  L.push('INFORME PARA EL PROFESORADO', 'Gayane: Pet Shop Adventure — Mundo Animal', `Fecha: ${new Date().toLocaleDateString('es-ES')}`, '');
  L.push(`Nivel de juego: ${levelOf(s.xp)} (${s.xp} puntos) · Nivel de español estimado por el juego: ${cefr()}`, `Tiempo total de juego: ${Math.floor(s.seconds / 3600)} h ${Math.floor((s.seconds % 3600) / 60)} min`, `Respuestas correctas: ${s.correct} · Errores: ${s.wrong} · Precisión: ${tot ? Math.round((s.correct / tot) * 100) : 0} %`, `Mejor racha: ${s.bestStreak} · Días de juego: ${s.daily.days}`, '');
  L.push('RESULTADOS POR SECCIÓN'); Object.entries(s.modeStats).forEach(([k, v]) => L.push(`- ${k}: ${v.ok} aciertos, ${v.ko} errores (${Math.round((v.ok / Math.max(1, v.ok + v.ko)) * 100)} %)`)); if (!Object.keys(s.modeStats).length) L.push('- Todavía no hay datos.');
  L.push('', 'ACTIVIDADES TERMINADAS', `- Conversaciones: ${s.counters.dialogos ?? 0}`, `- Misiones de compras: ${s.counters.misiones ?? 0}`, `- Cuidados: ${s.counters.cuidados ?? 0}`, `- Visitas a la clínica: ${s.counters.clinica ?? 0}`, `- Historias: ${s.counters.historias ?? 0}`, `- Juegos de inteligencia ganados: ${s.counters.juegos ?? 0}`, `- Trabalenguas: ${s.counters.trabalenguas ?? 0}`, `- Clientes atendidos en su tienda: ${s.own.served}`, '');
  L.push('GRAMÁTICA'); GRAMMAR.forEach((g) => L.push(`- ${es(g.name)}: ${s.done[g.id] ? '★'.repeat(s.done[g.id]) : 'sin practicar'}`));
  const ws = Object.entries(s.words); L.push('', `VOCABULARIO: ${ws.length} palabras consultadas, ${ws.filter(([, w]) => w.known).length} aprendidas`, ws.map(([w]) => w).join(', '), '', `ÚLTIMOS ERRORES (${Math.min(25, s.errors.length)})`);
  s.errors.slice(0, 25).forEach((e, i) => L.push(`${i + 1}. [${e.mode}] ${es(e.q)}`, `   Respondió: ${es(e.a)}`, `   Correcto: ${es(e.ok)}`, `   Explicación: ${es(e.why)}`));
  return L.join('\n');
}
type Tab = 'resumen' | 'logros' | 'coleccion' | 'errores' | 'informe' | 'ajustes';
export default function Progress({ onExit }: { onExit: () => void }) {
  const s = useGame(), [tab, setTab] = useState<Tab>('resumen'), [ask, setAsk] = useState(false), lv = levelOf(s.xp), tot = s.correct + s.wrong;
  const txt = useMemo(() => (tab === 'informe' ? report() : ''), [tab, s]); // eslint-disable-line
  const stat = (b: Bi, v: string | number) => <div className="stat"><b>{v}</b><T b={b} /></div>;
  const modes = Object.entries(s.modeStats), max = Math.max(1, ...modes.map(([, v]) => v.ok + v.ko));
  const MODE: Record<string, Bi> = { Conversación: 'Conversación|Զրույց', Compras: 'Compras|Գնումներ', Cuidados: 'Cuidados|Խնամք', Clínica: 'Clínica|Կլինիկա', Historias: 'Historias|Պատմություններ', Gramática: 'Gramática|Քերականություն', Inteligencia: 'Inteligencia|Մտավոր խաղեր', 'Mi tienda': 'Mi tienda|Իմ խանութը', Diccionario: 'Diccionario|Բառարան' };
  const tg = (k: keyof Settings, b: Bi) => <B b={b} icon={s.settings[k] ? '✓' : '○'} className={s.settings[k] ? 'primary' : ''} onClick={() => { setSettings({ [k]: !s.settings[k] }); if (k !== 'quality') ambient(null); }} />;
  return (
    <Page title="Mi progreso|Իմ առաջընթացը" onExit={onExit}>
      <div className="row tabs">{([['resumen', 'Resumen|Ամփոփում'], ['logros', 'Logros|Ձեռքբերումներ'], ['coleccion', 'Colección|Հավաքածու'], ['errores', 'Mis errores|Իմ սխալները'], ['informe', 'Informe para el profesor|Հաշվետվություն ուսուցչի համար'], ['ajustes', 'Ajustes|Կարգավորումներ']] as [Tab, Bi][]).map(([k, b]) => <B key={k} b={b} className={tab === k ? 'primary' : ''} onClick={() => setTab(k)} />)}</div>
      {tab === 'resumen' && <><div className="stats">{stat('Nivel|Մակարդակ', lv)}{stat('Monedas|Մետաղադրամներ', Math.round(s.coins))}{stat('Respuestas correctas|Ճիշտ պատասխաններ', s.correct)}{stat('Precisión|Ճշգրտություն', `${tot ? Math.round((s.correct / tot) * 100) : 0} %`)}{stat('Mejor racha|Լավագույն շարք', s.bestStreak)}{stat('Palabras descubiertas|Բացահայտված բառեր', Object.keys(s.words).length)}{stat('Tiempo de juego|Խաղի ժամանակ', mmss(s.seconds))}{stat('Nivel de español|Իսպաներենի մակարդակ', cefr())}</div>
        <Bar v={((s.xp - xpFor(lv)) / (xpFor(lv + 1) - xpFor(lv))) * 100} label={`Faltan ${xpFor(lv + 1) - s.xp} puntos para el nivel ${lv + 1}|${lv + 1}-րդ մակարդակին մնացել է ${xpFor(lv + 1) - s.xp} միավոր`} />
        <DailyBox />
        <div className="stagebox"><T b="Aciertos y errores por sección|Ճիշտ և սխալ պատասխաններ ըստ բաժնի" as="h3" />{!modes.length && <T b="Juega un poco para ver tus estadísticas.|Մի քիչ խաղա՝ վիճակագրությունդ տեսնելու։" as="p" />}{modes.map(([k, v]) => <div key={k} className="mrow"><T b={MODE[k] ?? k} /><div className="mbar"><i style={{ width: `${(v.ok / max) * 100}%` }} /><em style={{ width: `${(v.ko / max) * 100}%` }} /></div><span>{v.ok} / {v.ok + v.ko}</span></div>)}</div>
        <div className="stagebox"><T b="Mi inventario|Իմ գույքացանկը" as="h3" /><div className="row">{Object.entries(s.inventory).map(([k, n]) => <span key={k} className="inv"><Portrait k={`prod:${k}`} size={58} /><b>×{n}</b><T b={P[k].name} as="small" /></span>)}{!Object.keys(s.inventory).length && <T b="Compra productos en la tienda 3D.|Գնիր ապրանքներ 3D խանութում։" as="p" />}</div></div></>}
      {tab === 'logros' && <div className="grid cards">{ACHIEVEMENTS.map((a) => <article key={a.id} className={`card ach ${s.ach.includes(a.id) ? 'on' : ''}`}><span className="bigico">{a.icon}</span><div><T b={a.title} as="h3" /><T b={a.desc} as="p" /></div></article>)}</div>}
      {tab === 'coleccion' && <><T b={`Has encontrado ${s.animals.length} de ${ANIMALS.length} animales. Acarícialos en la tienda o cuídalos.|Գտել ես ${s.animals.length} կենդանի ${ANIMALS.length}-ից։ Շոյիր նրանց խանութում կամ խնամիր։`} as="p" /><div className="grid cards">{ANIMALS.map((a) => { const on = s.animals.includes(a.id); return <article key={a.id} className={`card pick ${on ? '' : 'locked'}`}><Portrait k={`animal:${a.id}`} size={150} /><h3>{on ? a.pet : '¿?'}</h3><T b={a.name} as="p" />{on && <T b={a.fact} as="small" say />}</article>; })}</div></>}
      {tab === 'errores' && <div className="list">{!s.errors.length && <T b="¡Todavía no tienes errores!|Դեռ սխալներ չունես։" as="p" className="bubble" />}{s.errors.slice(0, 80).map((e, i) => <article className="card err" key={i}><small className="chip">{e.mode}</small><T b={e.q} as="p" say /><p className="neg">✗ <T b={e.a} /></p><p className="pos">✓ <T b={e.ok} /><Say text={es(e.ok)} /></p><T b={e.why} as="p" className="why" /></article>)}{s.errors.length > 0 && <B b="Vaciar el historial|Մաքրել պատմությունը" onClick={() => useGame.setState({ errors: [] })} />}</div>}
      {tab === 'informe' && <div className="stagebox"><div className="row"><B b="Copiar el informe|Պատճենել հաշվետվությունը" icon="📋" className="primary" onClick={() => { navigator.clipboard.writeText(txt).then(() => toast('Informe copiado.|Հաշվետվությունը պատճենված է։', '📋'), () => toast('No se ha podido copiar. Selecciona el texto manualmente.|Չհաջողվեց պատճենել։ Ընտրիր տեքստը ձեռքով։', '⚠️')); }} /><B b="Descargar el informe|Ներբեռնել հաշվետվությունը" icon="⬇" onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + txt], { type: 'text/plain;charset=utf-8' })); a.download = 'informe-gayane.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }} /></div><pre className="report">{txt}</pre></div>}
      {tab === 'ajustes' && <div className="stagebox"><T b="Sonido e imagen|Ձայն և պատկեր" as="h3" /><div className="row">{tg('sound', 'Efectos de sonido|Ձայնային էֆեկտներ')}{tg('ambient', 'Música y ambiente|Երաժշտություն և մթնոլորտ')}<B b={s.settings.quality === 'alta' ? 'Gráficos: alta calidad|Գրաֆիկա՝ բարձր որակ' : 'Gráficos: modo rápido|Գրաֆիկա՝ արագ ռեժիմ'} icon="🎮" onClick={() => setSettings({ quality: s.settings.quality === 'alta' ? 'baja' : 'alta' })} /></div>
        <T b="Velocidad de la voz|Ձայնի արագություն" as="h3" /><div className="row">{([[0.75, 'Lenta|Դանդաղ'], [0.95, 'Normal|Սովորական'], [1.15, 'Rápida|Արագ']] as [number, Bi][]).map(([r, b]) => <B key={r} b={b} className={s.settings.rate === r ? 'primary' : ''} onClick={() => { setSettings({ rate: r }); speak('¡Hola, Gayane! ¿Lista para jugar?', { rate: r }); }} />)}</div>
        <T b="Nivel de dificultad|Դժվարության մակարդակ" as="h3" /><div className="row">{([['auto', 'Automático|Ավտոմատ'], ['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2']] as [Settings['level'], Bi][]).map(([r, b]) => <B key={r} b={b} className={s.settings.level === r ? 'primary' : ''} onClick={() => setSettings({ level: r })} />)}</div>
        <T b="Zona peligrosa|Վտանգավոր գոտի" as="h3" /><B b="Borrar todo el progreso|Ջնջել ամբողջ առաջընթացը" icon="🗑" className="danger" onClick={() => setAsk(true)} /><p hidden>{hy('')}</p></div>}
      {ask && <Panel onClose={() => setAsk(false)}><T b="¿Seguro que quieres borrar todo tu progreso?|Վստա՞հ ես, որ ուզում ես ջնջել ամբողջ առաջընթացդ։" as="h2" say /><T b="Perderás monedas, logros, palabras, animales y tu tienda. No se puede deshacer.|Կկորցնես մետաղադրամները, ձեռքբերումները, բառերը, կենդանիներին և խանութդ։ Հնարավոր չէ հետարկել։" as="p" say /><div className="row"><B b="No, conservar mi progreso|Ոչ, պահպանել առաջընթացը" className="primary" onClick={() => setAsk(false)} /><B b="Sí, borrarlo todo|Այո, ջնջել ամբողջը" className="danger" onClick={() => { resetAll(); play('bad'); setAsk(false); toast('Progreso borrado. ¡Empieza una nueva aventura!|Առաջընթացը ջնջված է։ Սկսիր նոր արկած։', '🌱'); onExit(); }} /></div></Panel>}
    </Page>
  );
}
