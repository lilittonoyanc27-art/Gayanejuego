import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { es, euro, type Bi } from './core/bi';
import { ensureDaily, levelOf, useGame, xpFor } from './core/store';
import { play } from './core/audio';
import { speak, stopSpeech } from './core/speech';
import { B, T, Toasts, TranslateLayer, toggleTrMode, useTrMode } from './ui/T';
import { Panel, Portrait } from './ui/kit';
import { DailyBox } from './modes/Daily';
const Shop = lazy(() => import('./modes/Shop').then((m) => ({ default: m.Shop })));
const MODES = { own: lazy(() => import('./modes/Own')), missions: lazy(() => import('./modes/Missions')), care: lazy(() => import('./modes/Care')), clinic: lazy(() => import('./modes/Clinic')), stories: lazy(() => import('./modes/Stories')), games: lazy(() => import('./modes/Games')), grammar: lazy(() => import('./modes/Grammar')), tongue: lazy(() => import('./modes/Tongue')), dict: lazy(() => import('./modes/Dict')), progress: lazy(() => import('./modes/Progress')) };
const Hero = lazy(() => import('./modes/Hero'));
type Mode = 'menu' | 'shop' | keyof typeof MODES;
const CARDS: { id: Mode; b: Bi; d: Bi; k: string; c: string }[] = [
  { id: 'shop', b: 'Pet Shop 3D|3D կենդանիների խանութ', d: 'Pasea, toca, pregunta y compra.|Զբոսնիր, դիպչիր, հարցրու և գնիր։', k: 'animal:golden', c: '#f1c9d8' }, { id: 'own', b: 'Mi propio Pet Shop|Իմ սեփական խանութը', d: 'Dirige tu negocio.|Ղեկավարիր քո բիզնեսը։', k: 'npc:gayane', c: '#dccdf0' },
  { id: 'missions', b: 'Misión de compras|Գնումների առաքելություն', d: 'Veinte encargos con presupuesto.|Քսան հանձնարարություն բյուջեով։', k: 'prod:pp1', c: '#f6dfc9' }, { id: 'care', b: 'Cuida a tu mascota|Խնամիր քո կենդանուն', d: 'Aliméntala, báñala y juega.|Կերակրիր, լողացրու և խաղա։', k: 'animal:tabby', c: '#f3d3d0' },
  { id: 'clinic', b: 'Clínica veterinaria|Անասնաբուժական կլինիկա', d: 'Ayuda a la doctora Vega.|Օգնիր դոկտոր Վեգային։', k: 'npc:vet', c: '#cfe6e2' }, { id: 'stories', b: 'Historias interactivas|Ինտերակտիվ պատմություններ', d: 'Tú decides el final.|Դու ես որոշում ավարտը։', k: 'npc:sofia', c: '#e6d6f0' },
  { id: 'games', b: 'Juegos de inteligencia|Մտավոր խաղեր', d: 'Trece retos para tu mente.|Տասներեք մարտահրավեր մտքիդ։', k: 'animal:siames', c: '#d6dff2' }, { id: 'grammar', b: 'Desafíos de español|Իսպաներենի մարտահրավերներ', d: 'Atiende a los clientes sin errores.|Սպասարկիր հաճախորդներին առանց սխալի։', k: 'npc:lucia', c: '#f7dbe4' },
  { id: 'tongue', b: 'Trabalenguas|Շուտասելուկներ', d: 'Pronuncia como una nativa.|Արտասանիր բնիկի պես։', k: 'animal:loro', c: '#d9ead2' }, { id: 'dict', b: 'Mi diccionario|Իմ բառարանը', d: 'Todas tus palabras.|Քո բոլոր բառերը։', k: 'animal:conejoblanco', c: '#f4e8d4' }, { id: 'progress', b: 'Mi progreso|Իմ առաջընթացը', d: 'Logros, errores e informe.|Ձեռքբերումներ, սխալներ և հաշվետվություն։', k: 'animal:hamster', c: '#ecdcea' },
];
const HELLO: Bi = '¡Hola, Gayane! ¡Bienvenida a tu aventura en el mundo de los animales! ¿Estás lista para empezar?|Բարև, Գայանե՛։ Բարի գալուստ քո արկածը կենդանիների աշխարհում։ Պատրա՞ստ ես սկսել։';
class Safe extends Component<{ children: ReactNode; onBack: () => void }, { e: boolean }> {
  state = { e: false };
  static getDerivedStateFromError() { return { e: true }; }
  render() { return this.state.e ? <div className="loading"><T b="Algo no ha funcionado. Vuelve al menú e inténtalo otra vez.|Ինչ-որ բան չաշխատեց։ Վերադարձիր մենյու և նորից փորձիր։" as="h2" /><B b="Menú|Մենյու" className="primary" onClick={() => { this.setState({ e: false }); this.props.onBack(); }} /></div> : this.props.children; }
}
const Loading = () => <div className="loading"><span className="paw">🐾</span><T b="Preparando la aventura…|Պատրաստում ենք արկածը…" /></div>;
export default function App() {
  const [mode, setMode] = useState<Mode>('menu'), [hello, setHello] = useState(true), tr = useTrMode();
  useEffect(() => { ensureDaily(); const i = setInterval(() => { if (!document.hidden) useGame.setState((s) => ({ seconds: s.seconds + 10 })); ensureDaily(); }, 10000); return () => clearInterval(i); }, []);
  const exit = () => { stopSpeech(); setMode('menu'); window.scrollTo(0, 0); };
  const open = (m: Mode) => { play('door'); setMode(m); window.scrollTo(0, 0); };
  const M = mode !== 'menu' && mode !== 'shop' ? MODES[mode] : null;
  return (
    <>
      <Safe onBack={exit}><Suspense fallback={<Loading />}><div key={mode} className="fadein">{mode === 'menu' ? <Menu open={open} /> : M ? <M onExit={exit} /> : <Shop onExit={exit} />}</div></Suspense></Safe>
      <button type="button" data-trtoggle className={`trtoggle ${tr ? 'on' : ''}`} aria-pressed={tr} title="Traducir" onClick={toggleTrMode}>Ա</button>
      {hello && mode === 'menu' && <Panel className="hello"><Portrait k="npc:lucia" size={150} /><T b={HELLO} as="h2" say /><div className="row center"><B b="¡Sí, estoy lista!|Այո, պատրաստ եմ։" className="primary big" onClick={() => { speak(es(HELLO)); setHello(false); useGame.setState({ greeted: true }); }} /></div><T b="Toca cualquier palabra para ver su traducción. En los botones, usa la letra Ա.|Դիպչիր ցանկացած բառի՝ թարգմանությունը տեսնելու։ Կոճակների վրա օգտագործիր Ա տառը։" as="small" /></Panel>}
      <TranslateLayer /><Toasts />
    </>
  );
}
function Menu({ open }: { open: (m: Mode) => void }) {
  const coins = useGame((s) => s.coins), xp = useGame((s) => s.xp), lv = levelOf(xp), n = useGame((s) => s.animals.length), w = useGame((s) => Object.keys(s.words).length);
  return (
    <main className="menu">
      <section className="hero"><Suspense fallback={null}><Hero /></Suspense><div className="herotext"><small className="eyebrow">Gayane: Pet Shop Adventure — Mundo Animal</small><T b="El maravilloso mundo de Gayane|Գայանեի հրաշալի աշխարհը" as="h1" /><T b="Aprende, explora, juega y descubre un mundo lleno de aventuras.|Սովորիր, բացահայտիր, խաղա և գտիր արկածներով լի աշխարհ։" as="p" say /><div className="row"><B b="Entrar en la tienda|Մտնել խանութ" className="primary big" onClick={() => open('shop')} /></div>
        <div className="row meta"><span className="chip coin">🪙 {euro(coins)}</span><T b={`Nivel ${lv}|Մակարդակ ${lv}`} className="chip" /><span className="chip">⭐ {xp} / {xpFor(lv + 1)}</span><span className="chip">🐾 {n} / 14</span><span className="chip">📖 {w}</span></div></div></section>
      <section className="cards-menu">{CARDS.map((c, i) => <button type="button" key={c.id} className={`mcardx ${i === 0 ? 'wide' : ''}`} style={{ ['--c' as string]: c.c }} data-es={es(c.b)} data-hy={c.b.split('|')[1]} onClick={() => open(c.id)}><Portrait k={c.k} size={i === 0 ? 190 : 132} /><span className="txt"><b>{es(c.b)}</b><small data-es={es(c.d)} data-hy={c.d.split('|')[1]}>{es(c.d)}</small></span><i className="hydot">Ա</i></button>)}</section>
      <div className="menufoot"><DailyBox /></div>
    </main>
  );
}
