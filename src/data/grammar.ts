import type { Bi } from '../core/bi';
/** Cada desafío es un turno en la tienda: cliente › situación con hueco › opciones (1.ª correcta) › explicación. */
export interface GItem { who: string; ctx: Bi; q: Bi; o: string[]; why: Bi }
export interface GTopic { id: string; lvl: string; name: Bi; place: Bi; tip: Bi; items: GItem[] }
const RAW = `
# g1;A2;Presente de indicativo|Ներկա ժամանակ;La apertura de la tienda|Խանութի բացումը;El presente habla de lo que pasa ahora o cada día.|Ներկան պատմում է այն մասին, ինչ կատարվում է հիմա կամ ամեն օր։
lucia;Son las nueve.|Ժամը իննն է։;Yo ___ la tienda todos los días a las nueve.|Ես ամեն օր ժամը իննին ___ խանութը։;abro/abre/abrió/abrir;Yo abro: primera persona.|Yo abro՝ առաջին դեմք։
marcos;Los cachorros te miran.|Լակոտները քեզ են նայում։;Los perros ___ el desayuno.|Շները ___ նախաճաշը։;piden/pedís/pide/pedieron;Pedir: e→i. Ellos piden.|Pedir՝ e→i։
sofia;Sofía entra.|Սոֆիան ներս է մտնում։;Hola, ___ a comprar arena.|Բարև, ___ ավազ գնելու։;vengo/viene/veno/vine mañana;Venir: yo vengo.|Venir՝ yo vengo։
elena;Luna está en la caja.|Լունան տուփի մեջ է։;Luna ___ dieciséis horas al día.|Լունան օրական տասնվեց ժամ ___։;duerme/dorme/duermen/durmió ahora;Dormir: o→ue.|Dormir՝ o→ue։
ines;Kiwi canta.|Կիվին երգում է։;Nosotras ___ música con Kiwi.|Մենք Կիվիի հետ երաժշտություն ենք ___։;oímos/oyen/oyo/oís;Oír: nosotros oímos.|Oír՝ nosotros oímos։
# g2;A2;Pretérito perfecto|Pretérito perfecto;El informe del día|Օրվա հաշվետվությունը;Haber + participio: hoy, esta semana, ya, todavía no.|Haber + դերբայ՝ այսօր, այս շաբաթ, արդեն, դեռ ոչ։
lucia;Lucía cierra la caja.|Լուսիան փակում է դրամարկղը։;Hoy ___ veinte bolsas de pienso.|Այսօր քսան տոպրակ կեր ենք ___։;hemos vendido/vendimos mañana/hemos vender/han vendida;Hoy + hemos vendido.|Hoy + hemos vendido։
diego;Falta agua en el acuario.|Ակվարիումում ջուր է պակաս։;¿Ya ___ el filtro?|Արդեն ___ ֆիլտրը։;has limpiado/has limpiando/limpias ayer/has limpio;Haber + participio regular: limpiado.|Haber + կանոնավոր դերբայ։
marcos;Nube está contenta.|Նուբեն գոհ է։;Nube ___ una pelota nueva.|Նուբեն նոր գնդակ է ___։;ha roto/ha rompido/has roto/ha roteado;Participio irregular: roto.|Անկանոն դերբայ՝ roto։
elena;Un cliente pregunta.|Հաճախորդը հարցնում է։;Todavía no ___ al veterinario.|Դեռ ___ անասնաբույժի մոտ։;hemos ido/hemos vamos/fuimos ya/hemos iendo;Ir → ido.|Ir → ido։
carmen;Buscas el recibo.|Կտրոնն ես փնտրում։;¿Dónde ___ el recibo?|Որտե՞ղ ես ___ կտրոնը։;has puesto/has ponido/has puso/pones ayer;Poner → puesto.|Poner → puesto։
# g3;A2;Pretérito indefinido|Pretérito indefinido;Lo que pasó ayer|Ինչ եղավ երեկ;Acciones terminadas: ayer, el lunes, en 2020.|Ավարտված գործողություններ՝ երեկ, երկուշաբթի, 2020-ին։
hugo;Hugo cuenta su primer día.|Ուգոն պատմում է առաջին օրը։;Ayer ___ mi primer día aquí.|Երեկ իմ առաջին օրն ___ այստեղ։;fue/es/era siempre/ha ser;Ser → fue.|Ser → fue։
rosa;Doña Rosa sonríe.|Տիկին Ռոսան ժպտում է։;El lunes mi perro ___ once años.|Երկուշաբթի շունս ___ տասնմեկ տարեկան։;cumplió/cumple ayer/cumplía/cumplo;Hecho puntual: cumplió.|Միանգամյա փաստ՝ cumplió։
andres;Moka se perdió.|Մոկան կորել էր։;Lo ___ en el parque después de una hora.|Մեկ ժամ անց այգում ___։;encontré/encuentro ayer/encontraba un día/encontrar;Yo encontré.|Yo encontré։
ines;Pepito se escapó.|Պեպիտոն փախավ։;Nosotras ___ debajo del estante.|Մենք ___ դարակի տակ։;miramos/miran/mirábamos una vez/mirasteis;Nosotras miramos.|Nosotras miramos։
sofia;El regalo de Mimí.|Միմիի նվերը։;¿Qué le ___ tú ayer?|Դու երեկ նրան ի՞նչ ___։;diste/dabas/diste tú das/distes;Dar → tú diste, sin s final.|Dar → tú diste՝ առանց վերջին s-ի։
# g4;B1;Pretérito imperfecto|Pretérito imperfecto;Recuerdos de la infancia|Մանկության հուշեր;Costumbres y descripciones del pasado.|Անցյալի սովորություններ և նկարագրություններ։
rosa;Doña Rosa recuerda.|Տիկին Ռոսան հիշում է։;De niña, ___ en una granja con caballos.|Փոքր ժամանակ ___ ձիերով ֆերմայում։;vivía/viví una vez/vivo/viviría;Costumbre en el pasado: vivía.|Անցյալի սովորույթ՝ vivía։
marcos;Marcos habla de su perro.|Մարկոսը պատմում է իր շան մասին։;Mi perro ___ negro y muy alegre.|Շունս սև ___ և շատ ուրախ։;era/fue ayer/estuvo/es entonces;Descripción: era.|Նկարագրություն՝ era։
elena;Cuando llegaste…|Երբ դու եկար…;Luna ___ cuando entró el cliente.|Լունան ___, երբ հաճախորդը մտավ։;dormía/durmió siempre/duerme/dormirá;Acción en desarrollo: dormía.|Ընթացող գործողություն՝ dormía։
ines;Antes de la reforma.|Վերանորոգումից առաջ։;Aquí ___ muchas jaulas pequeñas.|Այստեղ շատ փոքր վանդակներ ___։;había/habían/hubieron/haya;«Haber» impersonal, en singular: había.|Անդեմ «haber»՝ եզակի։
diego;De pequeño.|Փոքր ժամանակ։;Mis hermanos y yo ___ al río a ver peces.|Եղբայրներս և ես ___ գետ՝ ձուկ տեսնելու։;íbamos/fuimos una vez/íbais/vamos antes;Ir → íbamos.|Ir → íbamos։
# g5;A2;Futuro simple|Պարզ ապառնի;Planes para la tienda|Խանութի պլանները;Planes, promesas y predicciones.|Պլաններ, խոստումներ և կանխատեսումներ։
lucia;Lucía planea.|Լուսիան պլանավորում է։;El mes que viene ___ una sección nueva.|Հաջորդ ամիս նոր բաժին ___։;abriremos/abrimos ayer/abriríamos/abrieremos;Futuro: abrir + emos.|Ապառնի՝ abrir + emos։
hugo;Hugo promete.|Ուգոն խոստանում է։;Mañana ___ más temprano.|Վաղը ավելի շուտ ___։;vendré/veniré/vengo ayer/vendría;Venir → vendré.|Venir → vendré։
vet;La doctora predice.|Բժշկուհին կանխատեսում է։;En dos días, el gato ___ bien.|Երկու օրից կատուն լավ ___։;estará/estuvo/estaré/estaría ayer;Él estará.|Él estará։
sofia;Sofía pregunta.|Սոֆիան հարցնում է։;¿Qué ___ el sábado?|Ի՞նչ ___ շաբաթ օրը։;harás/hacerás/hiciste/harías tú ayer;Hacer → harás.|Hacer → harás։
marcos;Los perros y el paseo.|Շները և զբոսանքը։;Si hace sol, los perros ___ salir.|Եթե արև լինի, շները ___ դուրս գալ։;podrán/poderán/pudieron/podrían ayer;Poder → podrán.|Poder → podrán։
# g6;B1;Condicional|Պայմանական;¿Qué harías tú?|Ի՞նչ կանեիր դու;Consejos, cortesía y situaciones imaginarias.|Խորհուրդներ, քաղաքավարություն և երևակայական իրավիճակներ։
carmen;Un pago amable.|Քաղաքավարի վճարում։;¿___ ayudarme, por favor?|___ օգնել ինձ, խնդրում եմ։;Podría/Puedo/Pudo/Poderías;Cortesía: ¿podría…?|Քաղաքավարություն՝ ¿podría…?։
sofia;Sofía duda.|Սոֆիան կասկածում է։;Yo que tú, ___ el rascador.|Քո տեղը ես ___ ճանկոցը։;compraría/compro/compré/comprara;Yo que tú + condicional.|Yo que tú + condicional։
diego;El acuario ideal.|Իդեալական ակվարիում։;Con más espacio, los peces ___ mejor.|Ավելի շատ տարածքով ձկները ավելի լավ ___։;vivirían/viven ayer/vivieron/vivirán antes;Hipótesis: vivirían.|Ենթադրություն՝ vivirían։
lucia;Un deseo.|Ցանկություն։;Me ___ tener un jardín para los conejos.|Ինձ ___ ճագարների համար այգի ունենալ։;gustaría/gusto/gustaba mañana/gustara;Deseo: me gustaría.|Ցանկություն՝ me gustaría։
vet;Un consejo.|Խորհուրդ։;___ llevarlo a una revisión.|___ նրան զննման տանել։;Deberías/Deberás ayer/Debes que/Debistes;Consejo suave: deberías.|Մեղմ խորհուրդ՝ deberías։
# g7;B1;Presente de subjuntivo|Ըղձական ներկա;Deseos y consejos|Ցանկություններ և խորհուրդներ;Después de querer que, es necesario que, ojalá, cuando (futuro).|Querer que, es necesario que, ojalá, cuando (ապագա) բառերից հետո։
vet;La doctora aconseja.|Բժշկուհին խորհուրդ է տալիս։;Es necesario que el perro ___ más agua.|Անհրաժեշտ է, որ շունն ավելի շատ ջուր ___։;beba/bebe/bebió/beberá;Es necesario que + subjuntivo.|Es necesario que + subjuntivo։
elena;Elena desea.|Էլենան ցանկանում է։;Ojalá Luna ___ una familia.|Երանի Լունան ընտանիք ___։;encuentre/encuentra/encontrar/encontrará;Ojalá + subjuntivo.|Ojalá + subjuntivo։
lucia;Lucía pide.|Լուսիան խնդրում է։;Quiero que ___ los estantes.|Ուզում եմ, որ ___ դարակները։;ordenes/ordenas/ordenar/ordenarás;Querer que + subjuntivo.|Querer que + subjuntivo։
marcos;Marcos avisa.|Մարկոսը զգուշացնում է։;Cuando ___ a casa, dale agua.|Երբ ___ տուն, ջուր տուր նրան։;llegues/llegas/llegarás/llegaste;Cuando (futuro) + subjuntivo.|Cuando (ապագա) + subjuntivo։
ines;Inés duda.|Ինեսը կասկածում է։;No creo que el conejo ___ hambre.|Չեմ կարծում, որ ճագարը քաղցած ___։;tenga/tiene/tendrá/tener;No creo que + subjuntivo.|No creo que + subjuntivo։
# g8;A2;Imperativo|Հրամայական;Escuela canina|Շների դպրոց;Órdenes, instrucciones y consejos.|Հրամաններ, ցուցումներ և խորհուրդներ։
marcos;Nube corre hacia la calle.|Նուբեն վազում է դեպի փողոց։;¡Nube, ___ aquí!|Նո՛ւբե, ___ այստեղ։;ven/vienes/venir/venga tú;Venir → ven (tú).|Venir → ven։
marcos;Nube muerde un zapato.|Նուբեն կոշիկ է կծում։;¡No ___ eso!|Մի՛ ___ դա։;muerdas/muerdes/muerde/morder;Negativo: no muerdas.|Ժխտական՝ no muerdas։
vet;La doctora explica.|Բժշկուհին բացատրում է։;Doña Rosa, ___ el cepillo despacio.|Տիկի՛ն Ռոսա, դանդաղ ___ խոզանակը։;use/usa/usas/usar;Usted: use.|Usted՝ use։
elena;Las toallitas.|Անձեռոցիկները։;Toma las toallitas y ___ a Sofía.|Վերցրու անձեռոցիկները և ___ Սոֆիային։;dáselas/dálelas/las da/dase las;Da + se + las: dáselas.|Da + se + las։
lucia;La puerta está abierta.|Դուռը բաց է։;Chicos, ___ la puerta, por favor.|Երեխանե՛ր, ___ դուռը, խնդրում եմ։;cerrad/cerráis/cierra/cerrar vosotros;Vosotros: cerrad.|Vosotros՝ cerrad։
# g9;A2;Ser, estar y tener|Ser, estar և tener;Fichas de animales|Կենդանիների քարտեր;Ser: cómo es. Estar: cómo o dónde se encuentra. Tener: edad, hambre, sed.|Ser՝ ինչպիսին է, estar՝ վիճակ կամ տեղ, tener՝ տարիք, քաղց, ծարավ։
elena;La ficha de Cleo.|Կլեոյի քարտը։;Cleo ___ muy habladora.|Կլեոն շատ շատախոս ___։;es/está/tiene/hay;Carácter: ser.|Բնավորություն՝ ser։
diego;Zafiro.|Սաֆիրո։;El betta ___ en el acuario pequeño.|Բետտան փոքր ակվարիումում ___։;está/es/tiene/hay;Lugar: estar.|Տեղ՝ estar։
marcos;Canela mira el cuenco.|Կանելան ամանին է նայում։;Canela ___ hambre.|Կանելան քաղցած ___։;tiene/es/está/hace;Tener hambre.|Tener hambre։
ines;Algodón.|Ալգոդոն։;Algodón ___ tres años.|Ալգոդոնը երեք տարեկան ___։;tiene/es/está/cumple de;Edad: tener.|Տարիք՝ tener։
vet;Nube después de correr.|Նուբեն վազելուց հետո։;Nube ___ cansada.|Նուբեն հոգնած ___։;está/es/tiene/hace;Estado: estar.|Վիճակ՝ estar։
# g10;B1;Por y para|Por և para;Entregas y regalos|Առաքումներ և նվերներ;Para: destino, finalidad, plazo. Por: causa, precio, medio, duración.|Para՝ նպատակ, ստացող, ժամկետ։ Por՝ պատճառ, գին, միջոց։
sofia;El regalo.|Նվերը։;Este ratón es ___ Mimí.|Այս մկնիկը Միմիի ___ է։;para/por/a por/en;Destinatario: para.|Ստացող՝ para։
carmen;Un buen precio.|Լավ գին։;Compré la cama ___ quince euros.|Անկողինը գնեցի տասնհինգ եվրո___։;por/para/a/de;Precio: por.|Գին՝ por։
lucia;Un pedido.|Պատվեր։;El pedido debe estar listo ___ el viernes.|Պատվերը պետք է պատրաստ լինի ուրբաթ ___։;para/por/desde/de;Plazo: para.|Ժամկետ՝ para։
andres;Gracias.|Շնորհակալություն։;Gracias ___ encontrar a Moka.|Շնորհակալ եմ Մոկային գտնելու ___։;por/para/de/con;Gracias por.|Gracias por։
marcos;El paseo.|Զբոսանք։;Salgo con Nube ___ que corra un poco.|Դուրս եմ գալիս Նուբեի հետ, ___ մի քիչ վազի։;para/por/a/sin;Finalidad: para que.|Նպատակ՝ para que։
# g11;A2;Comparativos y superlativos|Համեմատական և գերադրական;Comparamos productos|Համեմատում ենք ապրանքները;Más… que, menos… que, tan… como, el más… de.|Más… que, menos… que, tan… como, el más… de։
lucia;Dos correas: 9,90 € y 15,90 €.|Երկու թոկ՝ 9,90 € և 15,90 €։;La correa extensible es ___ la otra.|Երկարացվող թոկը մյուսից ___ է։;más cara que/más caro de/tan cara que/la más cara que;Más + adjetivo + que.|Más + ածական + que։
diego;Dos acuarios iguales.|Երկու հավասար ակվարիում։;Este acuario es ___ grande como aquel.|Այս ակվարիումն այնի ___ մեծ է։;tan/tanto/más/muy;Igualdad: tan… como.|Հավասարություն՝ tan… como։
marcos;Nube gana todos los concursos.|Նուբեն հաղթում է բոլոր մրցույթներում։;Nube es la perra ___ inteligente de la tienda.|Նուբեն խանութի ___ խելացի շունն է։;más/mejor/tan/muy que;Superlativo: la más… de.|Գերադրական՝ la más… de։
elena;Dos champús.|Երկու շամպուն։;Este es bueno, pero el otro es ___.|Սա լավն է, բայց մյուսն ___ է։;mejor/más bueno que/buenísimo que/el más mejor;Bueno → mejor.|Bueno → mejor։
ines;Pepito y Pizca.|Պեպիտոն և Պիսկան։;Pizca es ___: cabe en una mano.|Պիսկան ___ է, տեղավորվում է ափի մեջ։;pequeñísima/muy pequeñísima/la pequeña que/más pequeñísima;Superlativo absoluto: -ísima.|Բացարձակ գերադրական՝ -ísima։
# g12;B1;Pronombres de objeto|Խնդրի դերանուններ;Encargos rápidos|Արագ հանձնարարություններ;Lo, la, los, las; le, les → se lo, se la.|Lo, la, los, las; le, les → se lo, se la։
lucia;Las latas están en el suelo.|Պահածոները հատակին են։;¿Puedes poner___ en el estante?|Կարո՞ղ ես ___ դնել դարակին։;las/los/les/la;Las latas → las.|Las latas → las։
marcos;Canela tiene sed.|Կանելան ծարավ է։;¿___ has dado agua?|___ ջուր տվե՞լ ես։;Le/La/Lo/Se;A Canela → le.|A Canela → le։
sofia;El regalo está listo.|Նվերը պատրաստ է։;Mañana ___ doy a Mimí.|Վաղը ___ կտամ Միմիին։;se lo/le lo/lo le/se le;Le + lo → se lo.|Le + lo → se lo։
diego;Los peces.|Ձկները։;Yo ___ cuido todos los días.|Ես ___ խնամում եմ ամեն օր։;los/les/le/lo;Los peces (OD) → los.|Los peces (ուղիղ խնդիր) → los։
carmen;Los clientes preguntan el precio.|Հաճախորդները գինն են հարցնում։;___ digo el precio enseguida.|___ անմիջապես ասում եմ գինը։;Les/Los/Le/Se;A los clientes → les.|A los clientes → les։
# g13;A2;Gustar, encantar, interesar|Gustar, encantar, interesar;Los gustos de los clientes|Հաճախորդների ճաշակը;A mí me gusta + singular / me gustan + plural.|A mí me gusta + եզակի / me gustan + հոգնակի։
emma;Emma mira los loros.|Էմման թութակներին է նայում։;A mí ___ los loros.|Ինձ ___ թութակները։;me encantan/me encanta/yo encanto/me encanto;Los loros (plural): me encantan.|Հոգնակի՝ me encantan։
andres;Andrés y Moka.|Անդրեսը և Մոկան։;A Moka ___ nadar.|Մոկային ___ լողալ։;le gusta/se gusta/le gustan/gusta;Infinitivo → singular: le gusta.|Անորոշ դերբայ → եզակի։
lucia;Una encuesta.|Հարցում։;¿A vosotros ___ los acuarios?|Ձեզ ___ ակվարիումները։;os interesan/vos interesan/os interesa/interesáis;A vosotros os + plural.|A vosotros os + հոգնակի։
rosa;Doña Rosa.|Տիկին Ռոսա։;A mi gata no ___ el ruido.|Կատվիս ___ աղմուկը։;le gusta/la gusta/le gustan/gusta a;A mi gata le gusta.|A mi gata le gusta։
sofia;Sofía y tú.|Սոֆիան և դու։;A nosotras ___ los gatitos.|Մեզ ___ կատվիկները։;nos encantan/nos encanta/encantamos/nosotras encantan;Nos encantan (plural).|Nos encantan՝ հոգնակի։
# g14;A2;Querer, poder, necesitar, recomendar|Querer, poder, necesitar, recomendar;El mostrador|Վաճառասեղան;Verbo + infinitivo; recomendar que + subjuntivo.|Բայ + անորոշ դերբայ; recomendar que + subjuntivo։
andres;Andrés pregunta.|Անդրեսը հարցնում է։;___ comprar un collar.|___ վզնոց գնել։;Quiero/Quero/Quiere yo/Quiera;Querer: yo quiero.|Querer՝ yo quiero։
emma;Emma y su perro.|Էմման և իր շունը։;¿Mi perro ___ entrar?|Շունս ___ ներս մտնել։;puede/pode/pueden/poder;Poder: él puede.|Poder՝ él puede։
diego;Los peces.|Ձկները։;Los peces ___ agua limpia.|Ձկներին մաքուր ջուր ___ ։;necesitan/necesita/necesitan de/necesitamos;Ellos necesitan.|Ellos necesitan։
lucia;Tu consejo.|Քո խորհուրդը։;Te recomiendo que ___ los precios.|Խորհուրդ եմ տալիս ___ գները։;compares/comparas/comparar tú/comparaste;Recomendar que + subjuntivo.|Recomendar que + subjuntivo։
hugo;Hugo aprende.|Ուգոն սովորում է։;Necesito ___ más sobre los gatos.|Պետք է ավելի շատ ___ կատուների մասին։;aprender/aprendo/que aprendo/aprendiendo;Necesitar + infinitivo.|Necesitar + անորոշ դերբայ։
`;
export const GRAMMAR: GTopic[] = [];
for (const l of RAW.trim().split('\n')) {
  if (l.startsWith('# ')) {
    const [id, lvl, name, place, tip] = l.slice(2).split(';');
    GRAMMAR.push({ id, lvl, name, place, tip, items: [] });
  } else {
    const [who, ctx, q, o, why] = l.split(';');
    GRAMMAR[GRAMMAR.length - 1].items.push({ who, ctx, q, o: o.split('/'), why });
  }
}
