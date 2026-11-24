import type { Bi } from '../core/bi';
export interface Request { who: string; lvl: string; b: Bi; tags: string[]; max: number; why: Bi[] }
/** Clientes de «Mi propio Pet Shop». why[0] es la explicación adecuada. */
const W = {
  jugar: 'Se lo recomiendo porque así su animal hará ejercicio y no se aburrirá.|Խորհուրդ եմ տալիս, որովհետև այսպես Ձեր կենդանին կշարժվի և չի ձանձրանա։',
  comer: 'Se lo recomiendo porque es un alimento adecuado para ese animal.|Խորհուրդ եմ տալիս, քանի որ այդ կենդանուն հարմար սնունդ է։',
  salir: 'Se lo recomiendo para que pasee de forma segura.|Խորհուրդ եմ տալիս, որպեսզի ապահով զբոսնի։',
  limpio: 'Se lo recomiendo para que esté limpio y sano.|Խորհուրդ եմ տալիս, որպեսզի մաքուր և առողջ լինի։',
  dormir: 'Se lo recomiendo para que descanse cómodamente.|Խորհուրդ եմ տալիս, որպեսզի հարմարավետ հանգստանա։',
  agua: 'Se lo recomiendo para que el agua del acuario esté en buen estado.|Խորհուրդ եմ տալիս, որպեսզի ակվարիումի ջուրը լավ վիճակում լինի։',
  viajar: 'Se lo recomiendo para que el viaje sea seguro y tranquilo.|Խորհուրդ եմ տալիս, որպեսզի ճամփորդությունն ապահով ու հանգիստ լինի։',
  casa: 'Se lo recomiendo porque necesita un espacio amplio para vivir.|Խորհուրդ եմ տալիս, քանի որ ապրելու ընդարձակ տեղ է պետք։',
};
export const REASONS = W;
const r = (who: string, lvl: string, tags: string, max: number, w: keyof typeof W, b: Bi): Request => ({ who, lvl, b, tags: tags.split(','), max, why: [W[w], ...Object.values(W).filter((x) => x !== W[w])] });
export const REQUESTS: Request[] = [
  r('rosa', 'A2', 'pienso-perro', 22, 'comer', 'Buenos días. Quiero comida seca para mi perro adulto.|Բարի լույս։ Չոր կեր եմ ուզում չափահաս շանս համար։'),
  r('sofia', 'A2', 'raton,rascador', 30, 'jugar', 'Busco un regalo para mi amiga. Tiene un gato, pero no sé qué comprarle. ¿Qué me recomiendas?|Նվեր եմ փնտրում ընկերուհուս համար։ Կատու ունի, բայց չգիտեմ՝ ինչ գնել։ Ի՞նչ խորհուրդ կտաս։'),
  r('andres', 'A2', 'pelota,cuerda,hueso', 10, 'jugar', 'Mi perro se aburre en casa. ¿Tienes algo para jugar?|Շունս տանը ձանձրանում է։ Խաղալու բան ունե՞ս։'),
  r('emma', 'A2', 'lata-gato', 3, 'comer', 'A mi gata solo le gusta la comida húmeda. ¿Qué tienes?|Կատուս միայն խոնավ կեր է սիրում։ Ի՞նչ ունես։'),
  r('hugo', 'A2', 'comida-hamster', 6, 'comer', 'Mi hámster ya no tiene semillas. ¿Me vendes una caja?|Գերմանամուկս այլևս սերմ չունի։ Տուփ կվաճառե՞ս։'),
  r('pablo', 'A2', 'rueda', 11, 'jugar', 'Mi hámster hace mucho ruido por la noche cuando corre. Necesito algo silencioso.|Գերմանամուկս գիշերը վազելիս շատ է աղմկում։ Անաղմուկ բան է պետք։'),
  r('rosa', 'A2', 'comida-pajaro', 5, 'comer', 'Tengo dos canarios que cantan mucho y comen aún más.|Երկու դեղձանիկ ունեմ, որ շատ են երգում և ավելի շատ ուտում։'),
  r('andres', 'A2', 'tunel', 10, 'jugar', 'Mi conejo quiere esconderse. ¿Qué me recomiendas?|Ճագարս ուզում է թաքնվել։ Ի՞նչ խորհուրդ կտաս։'),
  r('emma', 'B1', 'correa', 18, 'salir', 'Mi perra tira mucho cuando salimos. Ayer se me escapó. ¿Qué podría usar?|Շունս դուրս գալիս շատ է քաշում։ Երեկ փախավ։ Ի՞նչ կարող եմ օգտագործել։'),
  r('sofia', 'B1', 'cama', 24, 'dormir', 'Mi gato duerme encima de mi ropa. Ojalá tuviera su propio sitio.|Կատուս հագուստիս վրա է քնում։ Երանի իր տեղն ունենար։'),
  r('rosa', 'B1', 'transportin', 27, 'viajar', 'La semana que viene llevaré a mi gata en tren y no sé cómo transportarla.|Հաջորդ շաբաթ կատվիս գնացքով եմ տանելու, չգիտեմ՝ ինչպես։'),
  r('hugo', 'B1', 'cuenco', 11, 'comer', 'Mi perro empuja el plato de plástico por toda la cocina. Busco algo más pesado o resistente.|Շունս պլաստիկ ափսեն հրում է ամբողջ խոհանոցով։ Ավելի ծանր կամ ամուր բան եմ փնտրում։'),
  r('pablo', 'B1', 'champu', 13, 'limpio', 'Después de pasear por el barro, mi perro huele fatal.|Ցեխի միջով զբոսնելուց հետո շունս սարսափելի հոտ ունի։'),
  r('emma', 'B1', 'arena', 8, 'limpio', 'El baño de mi gato no huele bien. ¿Qué me aconsejas?|Կատվիս զուգարանը լավ չի բուրում։ Ի՞նչ խորհուրդ կտաս։'),
  r('andres', 'B1', 'cepillo-dientes', 5, 'limpio', 'El veterinario me ha dicho que le cuide los dientes al perro.|Անասնաբույժն ասել է շանս ատամները խնամել։'),
  r('sofia', 'B1', 'cepillo', 9, 'limpio', 'En primavera, mi gata lo llena todo de pelos.|Գարնանը կատուս ամեն ինչ մազով է լցնում։'),
  r('rosa', 'B1', 'toallitas', 5, 'limpio', 'Cada vez que volvemos del parque, mi perro me mancha el sofá con las patas.|Ամեն անգամ այգուց վերադառնալիս շունս թաթերով կեղտոտում է բազմոցը։'),
  r('pablo', 'B1', 'filtro', 18, 'agua', 'El agua de mi acuario se pone verde enseguida.|Ակվարիումիս ջուրը անմիջապես կանաչում է։'),
  r('diego', 'B2', 'termometro', 8, 'agua', 'Temo que el agua esté demasiado fría para mis peces, pero no tengo forma de comprobarlo.|Վախենում եմ՝ ջուրը ձկներիս համար շատ սառն է, բայց ստուգելու ձև չունեմ։'),
  r('emma', 'B2', 'acuario', 90, 'casa', 'Mi hija sueña con tener un betta. Me gustaría que viviera en un lugar digno.|Աղջիկս երազում է բետտա ունենալ։ Կուզենայի, որ արժանի տեղում ապրեր։'),
  r('andres', 'B2', 'jaula', 42, 'casa', 'Adoptaremos un hámster en cuanto tengamos dónde alojarlo.|Գերմանամուկ կորդեգրենք, հենց որ տեղ ունենանք։'),
  r('hugo', 'B2', 'pienso-cachorro', 17, 'comer', 'Nuestro cachorro crece rapidísimo y querríamos que sus huesos fueran fuertes.|Մեր լակոտը շատ արագ է մեծանում, կուզենայինք՝ ոսկորներն ամուր լինեին։'),
  r('rosa', 'B2', 'collar-gato', 8, 'salir', 'Quisiera oír a mi gata cuando sale al jardín; siempre desaparece sin hacer ruido.|Կուզենայի լսել կատվիս, երբ պարտեզ է դուրս գալիս․ միշտ անաղմուկ անհետանում է։'),
  r('sofia', 'B2', 'comida-conejo', 8, 'comer', 'Me han dicho que, sin fibra, los conejos enferman. ¿Qué debería darle cada día?|Ասել են, որ առանց բջջանյութի ճագարները հիվանդանում են։ Ի՞նչ պետք է տամ ամեն օր։'),
  r('pablo', 'A2', 'collar', 16, 'salir', 'Mi perro no lleva collar. Necesito uno hoy.|Շունս վզնոց չունի։ Այսօր մեկն է պետք։'),
  r('hugo', 'A2', 'premio-perro', 6, 'comer', 'Mi perra aprendió a sentarse. ¡Quiero darle un premio!|Շունս սովորեց նստել։ Ուզում եմ խրախուսել։'),
  r('rosa', 'A2', 'comida-pez', 7, 'comer', 'Mis peces tienen hambre.|Ձկներս քաղցած են։'),
  r('andres', 'A2', 'planta,grava', 8, 'agua', 'Quiero decorar mi acuario, pero está muy vacío.|Ուզում եմ զարդարել ակվարիումս, շատ դատարկ է։'),
];
export const DECOR: { id: string; price: number; b: Bi; d: Bi }[] = [
  { id: 'luces', price: 60, b: 'Luces cálidas|Ջերմ լույսեր', d: 'Los clientes se quedan más tiempo.|Հաճախորդներն ավելի երկար են մնում։' },
  { id: 'plantas', price: 45, b: 'Plantas naturales|Բնական բույսեր', d: 'Un ambiente fresco y tranquilo.|Թարմ և հանգիստ մթնոլորտ։' },
  { id: 'sofa', price: 80, b: 'Sofá de espera|Սպասասրահի բազմոց', d: 'Para descansar con las mascotas.|Կենդանիների հետ հանգստանալու համար։' },
  { id: 'cuadros', price: 35, b: 'Cuadros de animales|Կենդանիների նկարներ', d: 'Dan personalidad a la tienda.|Խանութին անհատականություն են տալիս։' },
  { id: 'alfombra', price: 50, b: 'Alfombra rosa|Վարդագույն գորգ', d: 'Suave y elegante.|Փափուկ և նրբագեղ։' },
  { id: 'gato', price: 120, b: 'Un gato anfitrión|Հյուրընկալ կատու', d: 'Adoptado del refugio: recibe a todos.|Որդեգրված է ապաստարանից, դիմավորում է բոլորին։' },
];
export const UNLOCK: Record<string, number> = { accesorios: 120, higiene: 160, acuarios: 220 };
