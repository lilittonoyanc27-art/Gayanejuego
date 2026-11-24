import type { Bi } from '../core/bi';
import { P } from './products';
export interface Mission { id: string; npc: string; lvl: string; budget: number; need: { tag: string; n: number; b: Bi }[]; text: Bi }
/** id;pnj;nivel;presupuesto;etiqueta*n…;texto */
const RAW = `
m1;sofia;A2;20;pienso-gato*1,raton*1;Gayane, mi gato no tiene comida. Compra una bolsa de pienso para gatos y un ratón de peluche. Tienes veinte euros.|Գայանե՛, կատուս կեր չունի։ Գնիր մեկ տոպրակ կատվի չոր կեր և մեկ փափուկ մկնիկ։ Քսան եվրո ունես։
m2;rosa;A2;50;pienso-perro*1,collar-azul*1,juguete&perro*2,champu*1;Gayane, necesito una bolsa de pienso para perros, un collar azul, dos juguetes para perros y un champú para mascotas. No gastes más de cincuenta euros.|Գայանե՛, ինձ պետք է մեկ տոպրակ շան չոր կեր, մեկ կապույտ վզնոց, երկու շան խաղալիք և մեկ շամպուն։ Հիսուն եվրոյից ավելի մի՛ ծախսիր։
m3;hugo;A2;12;comida-pajaro*2,columpio*1;Mis dos canarios quieren alpiste: compra dos cajas. Y también un columpio. Solo tengo doce euros.|Իմ երկու դեղձանիկին սերմեր են պետք՝ գնիր երկու տուփ։ Նաև մեկ ճոճանակ։ Միայն տասներկու եվրո ունեմ։
m4;emma;A2;12;lata-gato*4,cuenco*1;Busco cuatro latas de comida húmeda para mi gata y un cuenco. No quiero gastar más de doce euros.|Ինձ պետք է չորս խոնավ կերի պահածո կատվիս համար և մեկ աման։ Չեմ ուզում տասներկու եվրոյից ավելի ծախսել։
m5;andres;A2;25;correa*1,toallitas*2;Voy a pasear a mi perro por el campo. Necesito una correa y dos paquetes de toallitas para limpiarle las patas. Máximo, veinticinco euros.|Շանս դաշտ եմ տանելու։ Թոկ է պետք և երկու տուփ անձեռոցիկ՝ թաթերը մաքրելու։ Առավելագույնը քսանհինգ եվրո։
m6;sofia;A2;25;comida-conejo*1,tunel*1,viruta*2;Mi conejo se llama Bigotes. Le hacen falta heno, un túnel de madera y dos bolsas de lecho de papel. Tengo veinticinco euros.|Ճագարիս անունը Բիգոտես է։ Նրան պետք են խոտ, փայտե թունել և երկու տոպրակ թղթե ցամքար։ Քսանհինգ եվրո ունեմ։
m7;pablo;A2;20;comida-hamster*1,rueda*1,viruta*1;El hámster de la clínica necesita semillas, una rueda que no haga ruido y lecho limpio. Aquí tienes veinte euros.|Կլինիկայի գերմանամկանը պետք են սերմեր, անաղմուկ անիվ և մաքուր ցամքար։ Ահա քսան եվրո։
m8;marcos;B1;18;premio-perro*2,cuerda*1,pelota*1;Para la clase de hoy necesito dos cajas de galletas, una cuerda y la pelota más barata que encuentres. No podemos pasar de dieciocho euros.|Այսօրվա դասի համար պետք է երկու տուփ թխվածք, մեկ պարան և ամենաէժան գնդակը, որ կգտնես։ Տասնութ եվրոյից չպետք է անցնենք։
m9;diego;B1;65;acuario*1,filtro*1,planta*2;Un cliente empieza su primer acuario: quiere el más pequeño, un filtro y dos plantas. Dispone de sesenta y cinco euros.|Հաճախորդն առաջին ակվարիումն է սկսում․ ուզում է ամենափոքրը, մեկ ֆիլտր և երկու բույս։ Վաթսունհինգ եվրո ունի։
m10;elena;B1;35;rascador*1,raton*1,collar-gato*1;Tigre está destrozando las cortinas. Compra algo donde pueda arañar, un ratón y un collar con cascabel. Intenta no superar los treinta y cinco euros.|Տիգրեն վարագույրներն է քանդում։ Գնիր մի բան, որտեղ կարողանա ճանկռել, մի մկնիկ և զանգակով վզնոց։ Աշխատիր չգերազանցել երեսունհինգ եվրոն։
m11;vet;B1;30;pienso-perro*1,champu*1;He visto a un perro con el estómago y la piel delicados. Compra el pienso de salmón sin cereales y el champú para pieles sensibles. Con treinta euros es suficiente.|Մի շուն եմ տեսել՝ զգայուն ստամոքսով ու մաշկով։ Գնիր առանց հացահատիկի սաղմոնով կերը և զգայուն մաշկի շամպունը։ Երեսուն եվրոն բավական է։
m12;rosa;B1;30;cama*1,lata-gato*3,arena*0;Mi gata ya es mayor y duerme mucho: quiero que tenga una cama blanda. Cómprale también tres latas. Todavía me queda arena, así que no hace falta. Tienes treinta euros.|Կատուս արդեն տարեց է և շատ է քնում․ ուզում եմ փափուկ անկողին ունենա։ Գնիր նաև երեք պահածո։ Ավազ դեռ ունեմ, պետք չէ։ Երեսուն եվրո ունես։
m13;sofia;B1;16;regalo;Es el cumpleaños de mi perro y quiero regalarle dos juguetes distintos y unas galletas. He ahorrado dieciséis euros. ¡Sorpréndeme!|Շանս ծննդյան օրն է, ուզում եմ նվիրել երկու տարբեր խաղալիք և թխվածք։ Տասնվեց եվրո եմ խնայել։ Զարմացրո՛ւ ինձ։
m14;andres;B1;45;transportin*1,cuenco*1,pienso-gato*1;El sábado viajaremos en tren con el gato. Nos falta un transportín, un cuenco que no se oxide y comida seca. Contamos con cuarenta y cinco euros.|Շաբաթ օրը կատվի հետ գնացքով ենք գնալու։ Պետք են տեղափոխման տուփ, չժանգոտվող աման և չոր կեր։ Քառասունհինգ եվրո ունենք։
m15;hugo;B1;25;pienso-cachorro*1,cepillo-dientes*1,hueso*1;Acabamos de adoptar un cachorro. Nos han recomendado comida que lo ayude a crecer, algo para cuidarle los dientes y un hueso resistente. Veinticinco euros como máximo.|Նոր լակոտ ենք որդեգրել։ Խորհուրդ են տվել կեր, որ օգնի աճել, ատամները խնամելու միջոց և ամուր ոսկոր։ Առավելագույնը քսանհինգ եվրո։
m16;emma;B2;55;jaula*1,comida-hamster*1,tunel*1;Ojalá encuentres todo: quiero que mi hámster viva en un lugar espacioso, que coma bien y que tenga un escondite de madera. Mi presupuesto es de cincuenta y cinco euros.|Երանի ամեն ինչ գտնես․ ուզում եմ, որ գերմանամուկս ընդարձակ տեղում ապրի, լավ սնվի և փայտե թաքստոց ունենա։ Բյուջես հիսունհինգ եվրո է։
m17;diego;B2;30;grava*2,termometro*1,planta*2,comida-pez*1;Si no me equivoco, hacen falta dos bolsas de grava, un aparato que mida la temperatura, un par de plantas y escamas. No deberías gastar más de treinta y un euros.|Եթե չեմ սխալվում, պետք է երկու տոպրակ խիճ, ջերմաստիճան չափող սարք, մի զույգ բույս և փաթիլներ։ Չպետք է երեսունմեկ եվրոյից ավելի ծախսես։
m18;lucia;B2;40;pienso-perro*1,pienso-gato*1,comida-conejo*1,comida-pajaro*1;El refugio nos ha pedido ayuda. Elige un alimento para cada uno: perro, gato, conejo y pájaro. Cuanto menos gastes, más podremos donar: como mucho, cuarenta euros.|Ապաստարանը օգնություն է խնդրել։ Ընտրիր մեկական կեր շան, կատվի, ճագարի և թռչնի համար։ Որքան քիչ ծախսես, այնքան շատ կնվիրենք․ առավելագույնը քառասուն եվրո։
m19;rosa;B2;35;cepillo*1,champu*1,toallitas*1,correa*1;Antes de que venga mi nieta, quiero que el perro esté limpio, cepillado y listo para pasear. Compra lo imprescindible sin que la cuenta pase de treinta y cinco euros.|Մինչ թոռնիկս կգա, ուզում եմ, որ շունը մաքուր լինի, խոզանակված և պատրաստ զբոսանքի։ Գնիր անհրաժեշտը, որ հաշիվը չանցնի երեսունհինգ եվրոն։
m20;vet;B2;100;acuario*1,filtro*0,termometro*1,planta*3;La sala de espera quedaría preciosa con un acuario grande. Como el de sesenta litros ya lleva filtro, solo necesitarás un termómetro y tres plantas. No superes los cien euros.|Սպասասրահը հիանալի կլիներ մեծ ակվարիումով։ Քանի որ վաթսուն լիտրանոցն արդեն ֆիլտր ունի, պետք կլինեն միայն ջերմաչափ և երեք բույս։ Մի՛ գերազանցիր հարյուր եվրոն։
`;
const NAMES: Record<string, Bi> = {
  'pienso-gato': 'pienso para gatos|կատվի չոր կեր', raton: 'ratón de peluche|փափուկ մկնիկ', 'pienso-perro': 'pienso para perros|շան չոր կեր', 'collar-azul': 'collar azul|կապույտ վզնոց',
  'juguete&perro': 'juguetes para perros|շան խաղալիքներ', champu: 'champú|շամպուն', 'comida-pajaro': 'alpiste|թռչնի սերմեր', columpio: 'columpio|ճոճանակ', 'lata-gato': 'latas para gatos|կատվի պահածոներ', cuenco: 'cuenco|աման',
  correa: 'correa|թոկ', toallitas: 'toallitas|անձեռոցիկներ', 'comida-conejo': 'heno|խոտ', tunel: 'túnel de madera|փայտե թունել', viruta: 'lecho de papel|թղթե ցամքար', 'comida-hamster': 'semillas para hámster|գերմանամկան սերմեր', rueda: 'rueda silenciosa|անաղմուկ անիվ',
  'premio-perro': 'galletas de premio|խրախուսիչ թխվածքներ', cuerda: 'cuerda|պարան', pelota: 'pelota|գնդակ', acuario: 'acuario|ակվարիում', filtro: 'filtro|ֆիլտր', planta: 'planta acuática|ջրային բույս', rascador: 'rascador|ճանկոց', 'collar-gato': 'collar para gato|կատվի վզնոց',
  cama: 'cama suave|փափուկ անկողին', arena: 'arena|ավազ', transportin: 'transportín|տեղափոխման տուփ', 'pienso-cachorro': 'pienso para cachorros|լակոտների կեր', 'cepillo-dientes': 'cepillo de dientes|ատամի խոզանակ', hueso: 'hueso de goma|ռետինե ոսկոր',
  jaula: 'jaula grande|մեծ վանդակ', grava: 'grava|խիճ', termometro: 'termómetro|ջերմաչափ', 'comida-pez': 'escamas para peces|ձկան փաթիլներ', cepillo: 'cepillo para el pelo|մազերի խոզանակ',
};
/** Producto exacto exigido por la descripción del encargo. */
const EXACT: Record<string, Record<string, string>> = { m8: { pelota: 'pl1' }, m9: { acuario: 'ac1' }, m11: { 'pienso-perro': 'pp2', champu: 'ch2' }, m14: { cuenco: 'cn1' }, m19: { cepillo: 'cb1' }, m20: { acuario: 'ac2' } };
export const MISSIONS: Mission[] = RAW.trim().split('\n').map((l) => {
  const [id, npc, lvl, budget, items, text] = l.split(';');
  const src = items === 'regalo' ? 'juguete&perro*2,premio-perro*1' : items;
  return {
    id, npc, lvl, budget: id === 'm17' ? 31 : Number(budget), text,
    need: src.split(',').map((x) => { const [tag, n] = x.split('*'); return { tag, n: Number(n), b: NAMES[tag] ?? tag }; }).filter((x) => x.n > 0),
  };
});
export const matches = (pid: string, tag: string, mid: string) => {
  const ex = EXACT[mid]?.[tag];
  return ex ? pid === ex : tag.split('&').every((t) => P[pid].tags.includes(t));
};
export interface Check { ok: boolean; total: number; over: boolean; lines: { b: Bi; need: number; have: number }[]; extra: string[]; dup: boolean }
export function checkMission(m: Mission, cart: Record<string, number>): Check {
  const ids = Object.keys(cart).filter((k) => cart[k] > 0);
  const total = ids.reduce((s, k) => s + P[k].price * cart[k], 0);
  const lines = m.need.map((n) => ({ b: n.b, need: n.n, have: ids.filter((k) => matches(k, n.tag, m.id)).reduce((s, k) => s + cart[k], 0) }));
  const extra = ids.filter((k) => !m.need.some((n) => matches(k, n.tag, m.id)));
  const dup = m.id === 'm13' && ids.some((k) => P[k].tags.includes('juguete') && cart[k] > 1);
  const over = total > m.budget + 0.001;
  return { ok: !over && !dup && !extra.length && lines.every((l) => l.need === l.have), total, over, lines, extra, dup };
}
