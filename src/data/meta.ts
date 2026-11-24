import type { Bi } from '../core/bi';
import type { State } from '../core/store';
export const ACHIEVEMENTS: { id: string; icon: string; title: Bi; desc: Bi; test: (s: State) => boolean }[] = [
  { id: 'a1', icon: '🌱', title: 'Primeros pasos|Առաջին քայլեր', desc: 'Consigue 10 respuestas correctas.|Տուր 10 ճիշտ պատասխան։', test: (s) => s.correct >= 10 },
  { id: 'a2', icon: '🌷', title: 'Buena conversadora|Լավ զրուցակից', desc: 'Termina 5 conversaciones.|Ավարտիր 5 զրույց։', test: (s) => (s.counters.dialogos ?? 0) >= 5 },
  { id: 'a3', icon: '🗣️', title: 'Voz de la tienda|Խանութի ձայնը', desc: 'Termina 20 conversaciones.|Ավարտիր 20 զրույց։', test: (s) => (s.counters.dialogos ?? 0) >= 20 },
  { id: 'a4', icon: '🛍️', title: 'Compra inteligente|Խելացի գնում', desc: 'Completa 3 misiones de compras.|Կատարիր 3 գնումների առաքելություն։', test: (s) => (s.counters.misiones ?? 0) >= 3 },
  { id: 'a5', icon: '💶', title: 'Experta en presupuestos|Բյուջեի փորձագետ', desc: 'Completa 12 misiones de compras.|Կատարիր 12 գնումների առաքելություն։', test: (s) => (s.counters.misiones ?? 0) >= 12 },
  { id: 'a6', icon: '🐾', title: 'Amiga de los animales|Կենդանիների ընկեր', desc: 'Colecciona 6 animales.|Հավաքիր 6 կենդանի։', test: (s) => s.animals.length >= 6 },
  { id: 'a7', icon: '🦜', title: 'Mundo animal|Կենդանական աշխարհ', desc: 'Colecciona todos los animales.|Հավաքիր բոլոր կենդանիներին։', test: (s) => s.animals.length >= 14 },
  { id: 'a8', icon: '🛁', title: 'Manos cariñosas|Հոգատար ձեռքեր', desc: 'Realiza 10 cuidados.|Կատարիր խնամքի 10 գործողություն։', test: (s) => (s.counters.cuidados ?? 0) >= 10 },
  { id: 'a9', icon: '🩺', title: 'Ayudante de clínica|Կլինիկայի օգնական', desc: 'Termina 4 visitas al veterinario.|Ավարտիր 4 այց անասնաբույժի մոտ։', test: (s) => (s.counters.clinica ?? 0) >= 4 },
  { id: 'a10', icon: '🏪', title: 'Empresaria|Գործարար', desc: 'Atiende a 10 clientes en tu tienda.|Սպասարկիր 10 հաճախորդ քո խանութում։', test: (s) => s.own.served >= 10 },
  { id: 'a11', icon: '🎭', title: 'Dueña de su historia|Իր պատմության տերը', desc: 'Termina 5 historias.|Ավարտիր 5 պատմություն։', test: (s) => (s.counters.historias ?? 0) >= 5 },
  { id: 'a12', icon: '🧠', title: 'Mente brillante|Փայլուն միտք', desc: 'Gana 10 juegos de inteligencia.|Հաղթիր 10 մտավոր խաղում։', test: (s) => (s.counters.juegos ?? 0) >= 10 },
  { id: 'a13', icon: '👅', title: 'Lengua de oro|Ոսկե լեզու', desc: 'Practica 10 trabalenguas.|Կրկնիր 10 շուտասելուկ։', test: (s) => (s.counters.trabalenguas ?? 0) >= 10 },
  { id: 'a14', icon: '📖', title: 'Cazadora de palabras|Բառերի որսորդ', desc: 'Descubre 40 palabras.|Բացահայտիր 40 բառ։', test: (s) => Object.keys(s.words).length >= 40 },
  { id: 'a15', icon: '🔥', title: 'Racha imparable|Անկասելի շարք', desc: 'Acierta 15 respuestas seguidas.|Տուր 15 ճիշտ պատասխան անընդմեջ։', test: (s) => s.bestStreak >= 15 },
  { id: 'a16', icon: '👑', title: 'Leyenda del Mundo Animal|Կենդանական աշխարհի լեգենդ', desc: 'Llega al nivel 10.|Հասիր 10-րդ մակարդակին։', test: (s) => s.xp >= 60 * 81 },
];
export const DAILY_POOL: { id: string; key: string; n: number; b: Bi }[] = [
  { id: 'd1', key: 'aciertos', n: 15, b: 'Consigue 15 respuestas correctas.|Տուր 15 ճիշտ պատասխան։' },
  { id: 'd2', key: 'dialogos', n: 2, b: 'Termina dos conversaciones.|Ավարտիր երկու զրույց։' },
  { id: 'd3', key: 'misiones', n: 1, b: 'Completa una misión de compras.|Կատարիր գնումների մեկ առաքելություն։' },
  { id: 'd4', key: 'cuidados', n: 4, b: 'Cuida a tu mascota cuatro veces.|Չորս անգամ խնամիր քո կենդանուն։' },
  { id: 'd5', key: 'juegos', n: 2, b: 'Gana dos juegos de inteligencia.|Հաղթիր երկու մտավոր խաղում։' },
  { id: 'd6', key: 'trabalenguas', n: 2, b: 'Practica dos trabalenguas.|Կրկնիր երկու շուտասելուկ։' },
  { id: 'd7', key: 'clientes', n: 3, b: 'Atiende a tres clientes en tu tienda.|Սպասարկիր երեք հաճախորդ քո խանութում։' },
  { id: 'd8', key: 'clinica', n: 1, b: 'Visita la clínica veterinaria.|Այցելիր անասնաբուժական կլինիկա։' },
  { id: 'd9', key: 'gramatica', n: 1, b: 'Supera un desafío de español.|Հաղթահարիր իսպաներենի մեկ մարտահրավեր։' },
  { id: 'd10', key: 'historias', n: 1, b: 'Vive una historia hasta el final.|Ապրիր մեկ պատմություն մինչև վերջ։' },
];
