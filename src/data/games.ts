import type { Bi } from '../core/bi';
const rows = (s: string) => s.trim().split('\n').map((l) => l.split(';'));
/** Detective: pistas progresivas › respuesta › distractores */
export const DETECTIVE = rows(`
el erizo|ոզնի;Soy pequeño y salgo de noche.|Փոքր եմ և գիշերն եմ դուրս գալիս։;Como insectos y caracoles.|Ուտում եմ միջատներ և խխունջներ։;Cuando tengo miedo, me convierto en una bola con púas.|Երբ վախենում եմ, փշոտ գնդի եմ վերածվում։;la ardilla|սկյուռ;el zorro|աղվես;el ratón|մուկ
el búho|բու;Veo muy bien en la oscuridad.|Մթության մեջ շատ լավ եմ տեսնում։;Puedo girar la cabeza casi por completo.|Կարող եմ գլուխս գրեթե լրիվ պտտել։;Vuelo sin hacer ruido.|Թռչում եմ անաղմուկ։;el murciélago|չղջիկ;el loro|թութակ;el águila|արծիվ
el delfín|դելֆին;Vivo en el mar, pero no soy un pez.|Ծովում եմ ապրում, բայց ձուկ չեմ։;Respiro aire y cuido a mis crías.|Օդ եմ շնչում և խնամում եմ ձագերիս։;Me comunico con silbidos y me encanta saltar.|Հաղորդակցվում եմ սուլոցներով և սիրում եմ ցատկել։;el tiburón|շնաձուկ;el pulpo|ութոտնուկ;la tortuga|կրիա
el camaleón|քամելեոն;Mis ojos se mueven por separado.|Աչքերս առանձին են շարժվում։;Mi lengua es más larga que mi cuerpo.|Լեզուս մարմնիցս երկար է։;Cambio de color según mi estado de ánimo.|Գույնս փոխում եմ տրամադրությանս համաձայն։;la rana|գորտ;la serpiente|օձ;el cocodrilo|կոկորդիլոս
la abeja|մեղու;Vivo con miles de hermanas.|Ապրում եմ հազարավոր քույրերի հետ։;Bailo para explicar dónde hay flores.|Պարում եմ՝ բացատրելու, թե որտեղ ծաղիկներ կան։;Sin mí, habría mucha menos fruta.|Առանց ինձ շատ ավելի քիչ միրգ կլիներ։;la mariposa|թիթեռ;la hormiga|մրջյուն;la araña|սարդ
el pulpo|ութոտնուկ;Tengo tres corazones.|Երեք սիրտ ունեմ։;Si me persiguen, lanzo una nube de tinta.|Եթե հետապնդեն, թանաքի ամպ եմ բաց թողնում։;Uso mis ocho brazos para abrir conchas.|Ութ ձեռքերով խեցիներ եմ բացում։;el cangrejo|խեցգետին;la ballena|կետ;la medusa|մեդուզա
el murciélago|չղջիկ;Duermo boca abajo.|Գլխիվայր եմ քնում։;Me oriento gracias al eco.|Կողմնորոշվում եմ արձագանքի շնորհիվ։;Soy el único mamífero que vuela de verdad.|Միակ կաթնասունն եմ, որ իսկապես թռչում է։;el búho|բու;la ardilla|սկյուռ;la golondrina|ծիծեռնակ
el camello|ուղտ;Puedo pasar muchos días sin beber.|Կարող եմ շատ օրեր չխմել։;Guardo grasa en mi espalda.|Մեջքիս ճարպ եմ պահում։;Cruzo el desierto con personas y mercancías.|Անապատն եմ անցնում մարդկանց և ապրանքների հետ։;el caballo|ձի;la jirafa|ընձուղտ;la cabra|այծ
el pingüino|պինգվին;Soy un ave, pero no vuelo.|Թռչուն եմ, բայց չեմ թռչում։;El padre calienta el huevo con sus patas.|Հայրը ձուն տաքացնում է թաթերով։;Nado mejor que camino.|Ավելի լավ լողում եմ, քան քայլում։;el pato|բադ;la foca|փոկ;el avestruz|ջայլամ
la hormiga|մրջյուն;Levanto mucho más que mi propio peso.|Քաշիցս շատ ավելին եմ բարձրացնում։;Vivo en una ciudad bajo tierra.|Ստորգետնյա քաղաքում եմ ապրում։;Camino en fila siguiendo un olor.|Շարքով եմ քայլում՝ հոտի հետևելով։;la abeja|մեղու;el escarabajo|բզեզ;la araña|սարդ`).map((r) => ({ a: r[0], clues: r.slice(1, 4), d: r.slice(4) }));
export const WHOAMI = rows(`
el perro|շուն;Me llaman el mejor amigo del ser humano. Mi nariz sabe lo que tú ni imaginas, y mi cola no sabe mentir.|Ինձ մարդու լավագույն ընկեր են կոչում։ Քիթս գիտի այն, ինչ դու չես էլ պատկերացնում, իսկ պոչս ստել չգիտի։;el gato|կատու;el lobo|գայլ;el zorro|աղվես
el gato|կատու;Los egipcios me adoraban y creo que no lo he olvidado. Dicen que tengo siete vidas y, de noche, mis ojos brillan.|Եգիպտացիներն ինձ պաշտում էին, կարծես չեմ մոռացել։ Ասում են՝ յոթ կյանք ունեմ, գիշերն աչքերս փայլում են։;el búho|բու;el tigre|վագր;el conejo|ճագար
el hámster|գերմանամուկ;Mis mejillas son mi despensa y la noche es mi día. Recorro kilómetros sin salir de casa.|Այտերս իմ պահեստն են, գիշերն իմ օրն է։ Կիլոմետրեր եմ անցնում՝ տնից դուրս չգալով։;el ratón|մուկ;la ardilla|սկյուռ;el erizo|ոզնի
el caracol|խխունջ;Nunca pierdo las llaves, porque siempre llevo la casa encima. La lluvia es mi fiesta.|Երբեք բանալիներս չեմ կորցնում, քանի որ տունս միշտ վրաս է։ Անձրևն իմ տոնն է։;la tortuga|կրիա;el cangrejo|խեցգետին;la rana|գորտ
el loro|թութակ;Repito tus secretos sin entenderlos. Visto de verde y puedo vivir tanto como tú.|Կրկնում եմ քո գաղտնիքները՝ չհասկանալով։ Կանաչ եմ հագնում և կարող եմ քո չափ ապրել։;el canario|դեղձանիկ;el camaleón|քամելեոն;el mono|կապիկ
el elefante|փիղ;Lo recuerdo todo. Mi nariz bebe, huele, abraza y saluda. Temo más a las abejas que al león.|Ամեն ինչ հիշում եմ։ Քիթս խմում է, հոտոտում, գրկում և բարևում։ Առյուծից ավելի մեղուներից եմ վախենում։;la jirafa|ընձուղտ;el rinoceronte|ռնգեղջյուր;el oso|արջ
la mariposa|թիթեռ;Nací arrastrándome y un día desperté con alas. Pruebo las flores con las patas.|Ծնվեցի սողալով և մի օր արթնացա թևերով։ Ծաղիկները ոտքերով եմ համտեսում։;la abeja|մեղու;la libélula|ճպուռ;el gusano|որդ
el pez|ձուկ;Duermo con los ojos abiertos porque no tengo párpados. Si el agua está sucia, me falta el aire.|Բաց աչքերով եմ քնում, քանի որ կոպեր չունեմ։ Եթե ջուրը կեղտոտ է, օդն ինձ չի հերիքում։;la rana|գորտ;el delfín|դելֆին;la serpiente|օձ
la jirafa|ընձուղտ;Veo llegar al león antes que nadie. Mi cuello tiene siete huesos, los mismos que el tuyo.|Առյուծին բոլորից շուտ եմ տեսնում։ Վիզս յոթ ոսկոր ունի՝ այնքան, որքան քոնը։;el avestruz|ջայլամ;el camello|ուղտ;la cebra|զեբր
la tortuga|կրիա;Conocí a los dinosaurios y no tengo prisa. Vuelvo a la playa donde nací para dejar mis huevos.|Ճանաչել եմ դինոզավրերին և չեմ շտապում։ Վերադառնում եմ ծննդավայր լողափ՝ ձու դնելու։;el cocodrilo|կոկորդիլոս;el cangrejo|խեցգետին;el caracol|խխունջ`).map((r) => ({ a: r[0], q: r[1], d: r.slice(2) }));
export const SECRET = rows(`
VETERINARIA|անասնաբույժ;Cura a los animales y trabaja en una clínica.|Բուժում է կենդանիներին և աշխատում է կլինիկայում։
CACHORRO|լակոտ;Perro que todavía es muy joven.|Շուն, որը դեռ շատ փոքր է։
ACUARIO|ակվարիում;Casa de cristal llena de agua.|Ջրով լի ապակե տուն։
PRESUPUESTO|բյուջե;Dinero que puedes gastar.|Գումար, որ կարող ես ծախսել։
RONRONEAR|մռմռալ;Lo hace un gato contento.|Անում է գոհ կատուն։
ADOPTAR|որդեգրել;Dar un hogar a un animal.|Կենդանուն տուն տալ։
JUGUETE|խաղալիք;Sirve para divertirse.|Ծառայում է զվարճանալու համար։
CORREA|թոկ;La usas para pasear al perro.|Օգտագործում ես շանը զբոսանքի տանելիս։
PLUMAS|փետուրներ;Cubren el cuerpo de las aves.|Ծածկում են թռչունների մարմինը։
DESCUENTO|զեղչ;Con él, el precio baja.|Դրա շնորհիվ գինն իջնում է։
TRANSPORTÍN|տեղափոխման տուփ;Para llevar a tu gato de viaje.|Կատվիդ ճամփորդության տանելու համար։
ESCAPARATE|ցուցափեղկ;La ventana grande de una tienda.|Խանութի մեծ պատուհանը։
CARIÑOSO|քնքուշ;Le gusta dar y recibir amor.|Սիրում է սեր տալ և ստանալ։
BIGOTES|բեղեր;Ayudan al gato a orientarse.|Օգնում են կատվին կողմնորոշվել։
NOCTURNO|գիշերային;Que está activo por la noche.|Որ ակտիվ է գիշերը։
VACUNA|պատվաստում;Protege de las enfermedades.|Պաշտպանում է հիվանդություններից։`).map((r) => ({ w: r[0].split('|')[0], b: r[0], clue: r[1] }));
/** Pasapalabra: letra; "con"=empieza / contiene; definición; respuesta */
export const PASAPALABRA = rows(`
A;e;Dar un hogar a un animal abandonado.|Լքված կենդանուն տուն տալ։;adoptar|որդեգրել
A;e;Recipiente de cristal donde viven los peces.|Ապակե աման, որտեղ ձկներ են ապրում։;acuario|ակվարիում
B;e;Pelos largos que el gato tiene en la cara.|Երկար մազեր կատվի դեմքին։;bigotes|բեղեր
B;e;Lavar el cuerpo de la mascota con agua y champú.|Կենդանուն ջրով և շամպունով լվանալ։;bañar|լողացնել
C;e;Perro muy joven.|Շատ փոքր շուն։;cachorro|լակոտ
C;e;Tira que el perro lleva en el cuello.|Շան վզի ժապավեն։;collar|վզնոց
D;e;Rebaja en el precio de un producto.|Ապրանքի գնի իջեցում։;descuento|զեղչ
D;e;Lo contrario de despierto.|Արթունի հակառակը։;dormido|քնած
E;e;Animal muy grande con trompa.|Կնճիթով շատ մեծ կենդանի։;elefante|փիղ
E;e;Animal pequeño cubierto de púas.|Փշերով պատված փոքր կենդանի։;erizo|ոզնի
F;e;Aparato que limpia el agua del acuario.|Սարք, որ մաքրում է ակվարիումի ջուրը։;filtro|ֆիլտր
F;e;Temperatura alta cuando estás enfermo.|Բարձր ջերմություն հիվանդ ժամանակ։;fiebre|տենդ
G;e;Animal que maúlla y ronronea.|Կենդանի, որ մլավում և մռմռում է։;gato|կատու
G;e;Uñas afiladas de un animal.|Կենդանու սուր եղունգներ։;garras|ճանկեր
H;e;Sensación de necesitar comida.|Ուտելու կարիքի զգացում։;hambre|քաղց
H;e;Hierba seca que comen los conejos.|Չոր խոտ, որ ճագարներն են ուտում։;heno|խոտ
I;e;Capaz de aprender y comprender con facilidad.|Ունակ հեշտ սովորելու և հասկանալու։;inteligente|խելացի
I;e;Animal pequeño de seis patas.|Վեց ոտքով փոքր կենդանի։;insecto|միջատ
J;e;Lugar con rejas donde puede vivir un hámster.|Ճաղերով տեղ, որտեղ կարող է գերմանամուկ ապրել։;jaula|վանդակ
J;e;Animal africano de cuello muy largo.|Շատ երկար վզով աֆրիկյան կենդանի։;jirafa|ընձուղտ
K;e;Unidad de peso: mil gramos.|Քաշի միավոր՝ հազար գրամ։;kilo|կիլոգրամ
K;e;Marsupial gris de Australia que duerme en los eucaliptos.|Ավստրալիայի մոխրագույն պարկավոր, որ քնում է էվկալիպտի վրա։;koala|կոալա
L;e;Ave verde que puede repetir palabras.|Կանաչ թռչուն, որ կարող է բառեր կրկնել։;loro|թութակ
L;e;Sonido que hacen los perros.|Ձայն, որ հանում են շները։;ladrido|հաչոց
M;e;Animal que vive contigo en casa.|Կենդանի, որ ապրում է քեզ հետ տանը։;mascota|ընտանի կենդանի
M;e;Insecto con alas de colores.|Գունավոր թևերով միջատ։;mariposa|թիթեռ
N;e;Casa que construyen los pájaros.|Տուն, որ թռչուններն են կառուցում։;nido|բույն
N;e;Moverse dentro del agua.|Շարժվել ջրի մեջ։;nadar|լողալ
Ñ;c;Estación del año en que caen las hojas.|Տարվա եղանակ, երբ տերևներն են թափվում։;otoño|աշուն
Ñ;c;Cada una de las partes duras de los dedos del gato.|Կատվի մատների կոշտ մասերից յուրաքանչյուրը։;uña|եղունգ
O;e;Animal que nos da lana.|Կենդանի, որ բուրդ է տալիս մեզ։;oveja|ոչխար
O;e;Precio especial durante unos días.|Հատուկ գին մի քանի օր։;oferta|ակցիա
P;e;Comida seca para perros y gatos.|Չոր կեր շների և կատուների համար։;pienso|չոր կեր
P;e;Cubren el cuerpo de las aves.|Ծածկում են թռչունների մարմինը։;plumas|փետուրներ
Q;e;Alimento hecho con leche que, según los dibujos, adora el ratón.|Կաթից պատրաստված սնունդ, որ, ըստ մուլտֆիլմերի, մուկը պաշտում է։;queso|պանիր
Q;e;Reclamación de un cliente descontento.|Դժգոհ հաճախորդի բողոք։;queja|բողոք
R;e;Sonido suave de un gato feliz.|Երջանիկ կատվի մեղմ ձայն։;ronroneo|մռմռոց
R;e;Papel que te dan después de pagar.|Թուղթ, որ տալիս են վճարելուց հետո։;recibo|կտրոն
S;e;Necesidad de beber agua.|Ջուր խմելու կարիք։;sed|ծարավ
S;e;Reptil largo y sin patas.|Երկար և անոտք սողուն։;serpiente|օձ
T;e;Reptil con caparazón que camina despacio.|Պատյանով սողուն, որ դանդաղ է քայլում։;tortuga|կրիա
T;e;Plástico con el que pagas en una tienda.|Պլաստիկ, որով վճարում ես խանութում։;tarjeta|քարտ
U;e;Muy necesario e inmediato.|Շատ անհրաժեշտ և անհապաղ։;urgente|շտապ
U;e;Que solo existe uno.|Որ միայն մեկ հատ կա։;único|եզակի
V;e;Inyección que protege de enfermedades.|Ներարկում, որ պաշտպանում է հիվանդություններից։;vacuna|պատվաստում
V;e;Persona que trabaja atendiendo en una tienda.|Մարդ, որ սպասարկում է խանութում։;vendedor|վաճառող
W;c;Red inalámbrica para conectarse a internet en la tienda.|Անլար ցանց՝ խանութում համացանց մտնելու համար։;wifi|վայֆայ
W;c;Página de internet de la tienda: sitio…|Խանութի համացանցային էջ։;web|վեբ
X;c;Animal que se ha… de la Tierra, como los dinosaurios: está…|Երկրից անհետացած կենդանի, ինչպես դինոզավրը։;extinto|անհետացած
X;c;Persona que viene de otro país.|Մարդ, որ գալիս է այլ երկրից։;extranjero|օտարերկրացի
Y;c;Lo que haces cuando das apoyo a alguien: le das…|Այն, ինչ տալիս ես մեկին աջակցելիս։;ayuda|օգնություն
Y;c;Primera comida del día (contiene Y): el desa…|Օրվա առաջին ուտելիքը։;desayuno|նախաճաշ
Z;e;Verdura naranja.|Նարնջագույն բանջարեղեն։;zanahoria|գազար
Z;e;Animal salvaje de cola roja y peluda, muy astuto.|Կարմիր, փափուկ պոչով խորամանկ վայրի կենդանի։;zorro|աղվես`).map((r) => ({ l: r[0], con: r[1] === 'c', q: r[2], a: r[3] }));
export const ORDER: { t: Bi; lines: Bi[] }[] = [
  { t: 'Un collar nuevo|Նոր վզնոց', lines: ['Buenas tardes, ¿en qué puedo ayudarle?|Բարի օր, ինչո՞վ կարող եմ օգնել։', 'Busco un collar para mi perro.|Վզնոց եմ փնտրում շանս համար։', '¿De qué tamaño es su perro?|Ի՞նչ չափի է Ձեր շունը։', 'Es mediano y bastante fuerte.|Միջին է և բավական ուժեղ։', 'Entonces le recomiendo este de cuero.|Այդ դեպքում խորհուրդ եմ տալիս այս կաշվե վզնոցը։', 'Perfecto, me lo llevo.|Հիանալի, վերցնում եմ։'] },
  { t: 'Una devolución|Վերադարձ', lines: ['Hola, quería devolver esta correa.|Բարև, ուզում էի վերադարձնել այս թոկը։', '¿Qué problema tiene?|Ի՞նչ խնդիր ունի։', 'Se ha roto el cierre.|Ճարմանդը կոտրվել է։', 'Lo siento. ¿Ha traído el recibo?|Ցավում եմ։ Կտրոնը բերե՞լ եք։', 'Sí, aquí lo tiene.|Այո, խնդրեմ։', 'Gracias. Ahora mismo le devuelvo el dinero.|Շնորհակալություն։ Հիմա կվերադարձնեմ գումարը։'] },
  { t: 'Por teléfono|Հեռախոսով', lines: ['Clínica Mundo Animal, dígame.|«Կենդանական աշխարհ» կլինիկա, լսում եմ։', 'Buenos días, quisiera pedir una cita.|Բարի լույս, կուզենայի գրանցվել։', '¿Para qué animal es?|Ո՞ր կենդանու համար։', 'Para mi gata, necesita una vacuna.|Կատվիս համար, պատվաստում է պետք։', '¿Le viene bien el jueves a las cinco?|Հինգշաբթի ժամը հինգը հարմա՞ր է։', 'Sí, muchas gracias. Hasta el jueves.|Այո, շատ շնորհակալ եմ։ Մինչ հինգշաբթի։'] },
  { t: 'En la caja|Դրամարկղում', lines: ['¿Ha encontrado todo lo que buscaba?|Գտա՞ք այն ամենը, ինչ փնտրում էիք։', 'Sí, gracias. ¿Cuánto es?|Այո, շնորհակալություն։ Որքա՞ն է։', 'Son dieciocho euros. ¿Tarjeta o efectivo?|Տասնութ եվրո։ Քա՞րտ, թե՞ կանխիկ։', 'En efectivo. Aquí tiene veinte.|Կանխիկ։ Ահա քսան։', 'Y dos euros de cambio. ¿Quiere una bolsa?|Եվ երկու եվրո մանր։ Տոպրակ ուզո՞ւմ եք։', 'No hace falta, llevo mochila.|Պետք չէ, պայուսակ ունեմ։'] },
  { t: 'Adoptar un gato|Կատու որդեգրել', lines: ['Nos gustaría adoptar un gato.|Կուզենայինք կատու որդեգրել։', '¡Qué buena noticia! ¿Han tenido animales antes?|Ի՜նչ լավ լուր։ Նախկինում կենդանի ունեցե՞լ եք։', 'Sí, tuvimos una perra durante doce años.|Այո, տասներկու տարի շուն ենք ունեցել։', '¿Y quién cuidará del gato cuando viajen?|Իսկ ո՞վ կխնամի կատվին, երբ ճամփորդեք։', 'Lo cuidará mi madre, que vive cerca.|Մայրս, որ մոտ է ապրում։', 'Entonces, vengan: les presentaré a Luna.|Ուրեմն եկեք, կծանոթացնեմ Լունայի հետ։'] },
  { t: 'El acuario verde|Կանաչ ակվարիումը', lines: ['Perdone, el agua de mi acuario está verde.|Ներեցեք, ակվարիումիս ջուրը կանաչ է։', '¿Le da el sol directamente?|Ուղիղ արև ընկնո՞ւմ է։', 'Sí, está justo al lado de la ventana.|Այո, հենց պատուհանի կողքին է։', 'Ese es el motivo: crecen algas.|Պատճառը դա է․ ջրիմուռներ են աճում։', '¿Y qué debería hacer?|Իսկ ի՞նչ պետք է անեմ։', 'Cámbielo de sitio y limpie el filtro.|Տեղը փոխեք և մաքրեք ֆիլտրը։'] },
];
/** Error: palabras; índice de la palabra errónea; corrección; explicación */
export const ERRORS = rows(`
Los perros es muy cariñosos.;2;son;Sujeto plural: los perros son.|Հոգնակի ենթակա՝ son։;Շները շատ քնքուշ են։
Mi gata está tres años.;2;tiene;La edad se expresa con «tener».|Տարիքը՝ «tener»-ով։;Կատուս երեք տարեկան է։
A mi hermana le gustan el hámster.;4;gusta;El hámster es singular: le gusta.|Եզակի՝ le gusta։;Քրոջս դուր է գալիս գերմանամուկը։
Ayer compro dos pelotas.;1;compré;Con «ayer» usamos indefinido: compré.|«Ayer»-ի հետ՝ indefinido։;Երեկ երկու գնդակ գնեցի։
El agua está demasiado frío.;4;fría;«Agua» es femenino: fría.|«Agua»-ն իգական է։;Ջուրը չափազանց սառն է։
Esta correa es más larga de la azul.;5;que;Comparativo: más… que.|Համեմատական՝ más… que։;Այս թոկը կապույտից երկար է։
Quiero que vienes a la tienda.;2;vengas;Querer que + subjuntivo.|Querer que + subjuntivo։;Ուզում եմ, որ գաս խանութ։
Hay que bañando al perro.;2;bañar;Hay que + infinitivo.|Hay que + անորոշ դերբայ։;Պետք է լողացնել շանը։
El regalo es por mi amiga.;3;para;Destinatario: para.|Ստացող՝ para։;Նվերն ընկերուհուս համար է։
Los pezes nadan en el acuario.;1;peces;El plural de «pez» es «peces», con c.|«Pez»-ի հոգնակին «peces» է՝ c-ով։;Ձկները լողում են ակվարիումում։
Le lo daré mañana.;0;Se;«Le lo» → «se lo».|«Le lo» → «se lo»։;Վաղը կտամ նրան։
Si tendría tiempo, adoptaría un perro.;1;tuviera;Si + imperfecto de subjuntivo.|Si + imperfecto de subjuntivo։;Եթե ժամանակ ունենայի, շուն կորդեգրեի։
No creo que es caro.;3;sea;No creo que + subjuntivo.|No creo que + subjuntivo։;Չեմ կարծում, որ թանկ է։
Es importante que el gato bebe agua.;5;beba;Es importante que + subjuntivo.|Es importante que + subjuntivo։;Կարևոր է, որ կատուն ջուր խմի։
Cuando era niño, tuve miedo de los perros siempre.;3;tenía;Costumbre: imperfecto.|Սովորություն՝ imperfecto։;Փոքր ժամանակ միշտ վախենում էի շներից։
Me duele los pies después del paseo.;1;duelen;Los pies duelen (plural).|Հոգնակի՝ duelen։;Զբոսանքից հետո ոտքերս ցավում են։
¡No corres por la tienda, Nube!;1;corras;Imperativo negativo: no corras.|Ժխտական հրամայական՝ no corras։;Մի՛ վազիր խանութում, Նո՛ւբե։
Ella es la mejor vendedora en la tienda.;5;de;Superlativo + de.|Գերադրական + de։;Նա խանութի լավագույն վաճառողն է։`).map((r) => ({ s: r[0], i: Number(r[1]), fix: r[2], why: r[3], hy: r[4] }));
export const LISTEN = rows(`
Hola, soy Marta. Ayer dejé a mi perro en la peluquería y hoy paso a recogerlo a las seis y media.|Բարև, ես Մարտան եմ։ Երեկ շանս թողեցի վարսավիրանոցում, այսօր ժամը վեց անց կեսին կգամ վերցնելու։;¿A qué hora pasará Marta?|Ժամը քանիսի՞ն կգա Մարտան։;A las seis y media.|Վեց անց կեսին։;A las cinco y media.|Հինգ անց կեսին։;A las siete y cuarto.|Յոթն անց քառորդ։;A las seis en punto.|Ուղիղ վեցին։
Atención, clientes: hoy, en la sección de gatos, si compra tres latas, la cuarta es gratis.|Հարգելի հաճախորդներ, այսօր կատուների բաժնում երեք պահածո գնելիս չորրորդն անվճար է։;¿Cuántas latas hay que pagar para llevarse cuatro?|Քանի՞ պահածոյի համար պետք է վճարել՝ չորսը տանելու համար։;Tres.|Երեք։;Cuatro.|Չորս։;Dos.|Երկու։;Una.|Մեկ։
No encuentro a mi tortuga. Esta mañana estaba en el jardín, pero ahora no está ni debajo de las plantas ni al lado de la fuente.|Չեմ գտնում կրիաս։ Այս առավոտ պարտեզում էր, բայց հիմա ո՛չ բույսերի տակ է, ո՛չ շատրվանի մոտ։;¿Dónde estaba la tortuga por la mañana?|Որտե՞ղ էր կրիան առավոտյան։;En el jardín.|Պարտեզում։;En la fuente.|Շատրվանում։;En la cocina.|Խոհանոցում։;Debajo de la cama.|Մահճակալի տակ։
Compré una cama para mi gato, pero prefiere dormir en la caja de cartón en la que venía.|Անկողին գնեցի կատվիս համար, բայց նա նախընտրում է քնել դրա ստվարաթղթե տուփի մեջ։;¿Dónde duerme el gato?|Որտե՞ղ է քնում կատուն։;En la caja.|Տուփի մեջ։;En la cama nueva.|Նոր անկողնում։;En el sofá.|Բազմոցին։;En la ventana.|Պատուհանին։
El doctor me ha dicho que el conejo está sano, pero que debería comer más heno y menos fruta.|Բժիշկն ասաց, որ ճագարն առողջ է, բայց պետք է ավելի շատ խոտ և քիչ միրգ ուտի։;¿Qué debe comer menos el conejo?|Ի՞նչ պետք է քիչ ուտի ճագարը։;Fruta.|Միրգ։;Heno.|Խոտ։;Agua.|Ջուր։;Pienso.|Չոր կեր։
Si llueve, el paseo será el domingo y, si no, saldremos el sábado a las diez, como siempre.|Եթե անձրև գա, զբոսանքը կլինի կիրակի, եթե ոչ՝ շաբաթ ժամը տասին, ինչպես միշտ։;¿Qué pasa si no llueve?|Ի՞նչ կլինի, եթե անձրև չգա։;Salen el sábado.|Շաբաթ են դուրս գալիս։;Salen el domingo.|Կիրակի են դուրս գալիս։;No hay paseo.|Զբոսանք չկա։;Salen a las doce.|Տասներկուսին են դուրս գալիս։
Mi hermano quería un perro grande, mi madre uno pequeño, y al final adoptamos un gato.|Եղբայրս մեծ շուն էր ուզում, մայրս՝ փոքր, վերջում կատու որդեգրեցինք։;¿Qué animal adoptaron?|Ի՞նչ կենդանի որդեգրեցին։;Un gato.|Կատու։;Un perro grande.|Մեծ շուն։;Un perro pequeño.|Փոքր շուն։;Ninguno.|Ոչ մեկը։
El collar costaba doce euros, pero como tenía un descuento del cincuenta por ciento, pagué la mitad.|Վզնոցն արժեր տասներկու եվրո, բայց քանի որ հիսուն տոկոս զեղչ կար, կեսը վճարեցի։;¿Cuánto pagó?|Որքա՞ն վճարեց։;Seis euros.|Վեց եվրո։;Doce euros.|Տասներկու եվրո։;Cinco euros.|Հինգ եվրո։;Dieciocho euros.|Տասնութ եվրո։
Aunque los cachorros son adorables, yo adoptaría un perro mayor, porque casi nadie los elige.|Թեև լակոտները հմայիչ են, ես տարեց շուն կորդեգրեի, քանի որ գրեթե ոչ ոք նրանց չի ընտրում։;¿Por qué adoptaría un perro mayor?|Ինչո՞ւ տարեց շուն կորդեգրեր։;Porque casi nadie los elige.|Որովհետև գրեթե ոչ ոք չի ընտրում։;Porque son más baratos.|Որովհետև էժան են։;Porque no le gustan los cachorros.|Որովհետև լակոտներ չի սիրում։;Porque comen menos.|Որովհետև քիչ են ուտում։
De haber sabido que el loro hablaba tanto, no lo habríamos puesto en el dormitorio.|Եթե իմանայինք, որ թութակն այդքան է խոսում, ննջարանում չէինք դնի։;¿Qué problema tienen?|Ի՞նչ խնդիր ունեն։;El loro habla mucho en el dormitorio.|Թութակը շատ է խոսում ննջարանում։;El loro no quiere hablar.|Թութակը չի ուզում խոսել։;El loro se ha escapado.|Թութակը փախել է։;El dormitorio es pequeño.|Ննջարանը փոքր է։`).map((r) => ({ t: r[0], q: r[1], o: r.slice(2) }));
export interface Dilemma { q: Bi; o: { b: Bi; s: number; r: Bi }[]; keys: string[]; model: Bi }
export const DILEMMAS: Dilemma[] = [
  { q: 'Encuentras un perro sin collar en la calle. ¿Qué harías?|Փողոցում գտնում ես առանց վզնոցի շուն։ Ի՞նչ կանեիր։', o: [{ b: 'Lo llevaría a una clínica para leer el microchip.|Կտանեի կլինիկա՝ միկրոչիպը կարդալու։', s: 3, r: 'Excelente: así se puede encontrar a su familia.|Գերազանց է․ այդպես կարելի է գտնել ընտանիքին։' }, { b: 'Preguntaría a los vecinos si lo conocen.|Կհարցնեի հարևաններին՝ ճանաչում են արդյոք։', s: 2, r: 'Buena idea, y después convendría revisar el microchip.|Լավ միտք է, հետո էլ պետք է ստուգել միկրոչիպը։' }, { b: 'Me lo quedaría sin decir nada.|Կպահեի՝ ոչինչ չասելով։', s: 0, r: 'Piensa: quizá alguien lo está buscando con desesperación.|Մտածիր․ գուցե մեկը հուսահատ փնտրում է նրան։' }], keys: ['porque', 'para', 'familia', 'dueño', 'ayudar', 'buscar'], model: 'Lo llevaría a una clínica porque podría tener microchip y su familia lo estaría buscando.|Կտանեի կլինիկա, քանի որ կարող է միկրոչիպ ունենալ, և ընտանիքը կփնտրեր նրան։' },
  { q: 'Una amiga quiere comprar un conejo solo porque es bonito. ¿Qué le dirías?|Ընկերուհիդ ուզում է ճագար գնել միայն գեղեցիկ լինելու համար։ Ի՞նչ կասեիր։', o: [{ b: 'Le preguntaría si tiene tiempo y espacio.|Կհարցնեի՝ ժամանակ ու տեղ ունի՞։', s: 3, r: 'Muy bien: la ayudas a reflexionar sin ofenderla.|Շատ լավ․ օգնում ես մտածել՝ առանց վիրավորելու։' }, { b: 'Le diría que es una irresponsable.|Կասեի, որ անպատասխանատու է։', s: 1, r: 'Quizá tengas razón, pero con esas palabras no te escuchará.|Գուցե ճիշտ ես, բայց այդ խոսքերով քեզ չի լսի։' }, { b: 'No le diría nada.|Ոչինչ չէի ասի։', s: 0, r: 'Una buena amiga comparte lo que sabe.|Լավ ընկերը կիսվում է իր իմացածով։' }], keys: ['porque', 'tiempo', 'espacio', 'cuidar', 'responsabilidad', 'necesita'], model: 'Le diría que un conejo necesita tiempo y espacio, porque es una gran responsabilidad.|Կասեի, որ ճագարին ժամանակ և տեղ է պետք, քանի որ մեծ պատասխանատվություն է։' },
  { q: 'Un cliente te paga con cincuenta euros pensando que son veinte. ¿Qué harías?|Հաճախորդը վճարում է հիսուն եվրո՝ կարծելով, թե քսան է։ Ի՞նչ կանեիր։', o: [{ b: 'Se lo diría enseguida.|Անմիջապես կասեի։', s: 3, r: 'La honestidad vale más que cualquier propina.|Ազնվությունն ավելի արժե, քան ցանկացած թեյավճար։' }, { b: 'Esperaría a que se diera cuenta.|Կսպասեի, որ ինքը նկատի։', s: 1, r: 'Si no se da cuenta, perderá su dinero.|Եթե չնկատի, կկորցնի գումարը։' }, { b: 'Me quedaría con la diferencia.|Տարբերությունը կպահեի։', s: 0, r: 'Eso no sería honesto.|Դա ազնիվ չէր լինի։' }], keys: ['porque', 'honesto', 'honesta', 'dinero', 'justo', 'confianza'], model: 'Se lo diría enseguida porque me gustaría que hicieran lo mismo conmigo.|Անմիջապես կասեի, քանի որ կուզենայի՝ ինձ հետ էլ այդպես վարվեին։' },
  { q: 'Tu compañero ha olvidado dar agua a los hámsteres y tiene miedo de decirlo. ¿Qué harías?|Գործընկերդ մոռացել է գերմանամկներին ջուր տալ և վախենում է ասել։ Ի՞նչ կանեիր։', o: [{ b: 'Primero les daría agua y luego lo animaría a contarlo.|Նախ ջուր կտայի, հետո կքաջալերեի ասել։', s: 3, r: 'Perfecto: primero los animales, después la verdad.|Հիանալի է․ նախ կենդանիները, հետո ճշմարտությունը։' }, { b: 'Diría que he sido yo.|Կասեի՝ ես եմ եղել։', s: 1, r: 'Es generoso, pero él no aprendería.|Առատաձեռն է, բայց նա չէր սովորի։' }, { b: 'Se lo contaría a todos.|Բոլորին կպատմեի։', s: 0, r: 'Lo avergonzarías sin resolver el problema.|Կամաչեցնեիր՝ խնդիրը չլուծելով։' }], keys: ['porque', 'agua', 'primero', 'ayudar', 'error', 'verdad'], model: 'Primero les daría agua, porque lo importante es que los animales estén bien.|Նախ ջուր կտայի, քանի որ կարևորը կենդանիների լավ լինելն է։' },
  { q: 'En una red social ves un vídeo «gracioso» en el que un gato parece asustado. ¿Qué harías?|Սոցցանցում տեսնում ես «զվարճալի» տեսանյութ, որտեղ կատուն վախեցած է թվում։ Ի՞նչ կանեիր։', o: [{ b: 'No lo compartiría y avisaría a la plataforma.|Չէի կիսվի և կտեղեկացնեի հարթակին։', s: 3, r: 'Tu gesto puede evitar que se repita.|Քո քայլը կարող է կանխել կրկնությունը։' }, { b: 'Escribiría un comentario explicando el problema.|Կգրեի մեկնաբանություն՝ բացատրելով խնդիրը։', s: 2, r: 'Educar también ayuda.|Կրթելն էլ է օգնում։' }, { b: 'Me reiría y lo enviaría a mis amigos.|Կծիծաղեի և կուղարկեի ընկերներիս։', s: 0, r: 'El gato no se está divirtiendo.|Կատուն չի զվարճանում։' }], keys: ['porque', 'miedo', 'asustado', 'respeto', 'animal', 'sufrir'], model: 'No lo compartiría porque el gato tiene miedo y los animales merecen respeto.|Չէի կիսվի, քանի որ կատուն վախենում է, իսկ կենդանիները հարգանքի են արժանի։' },
  { q: 'Tu familia se va de vacaciones y no puede llevar al perro. ¿Qué propondrías?|Ընտանիքդ արձակուրդ է գնում և չի կարող շանը տանել։ Ի՞նչ կառաջարկեիր։', o: [{ b: 'Buscar una persona de confianza que lo cuide.|Վստահելի մարդ գտնել, որ խնամի։', s: 3, r: 'Así estará tranquilo y acompañado.|Այդպես հանգիստ և ընկերակցությամբ կլինի։' }, { b: 'Elegir otro destino al que pueda venir.|Ուրիշ վայր ընտրել, ուր նա էլ կարող է գալ։', s: 3, r: '¡Genial! Nadie se queda atrás.|Հիանալի՜, ոչ ոք հետ չի մնում։' }, { b: 'Dejarle mucha comida y cerrar la puerta.|Շատ կեր թողնել և դուռը փակել։', s: 0, r: 'Un perro no puede quedarse solo tantos días.|Շունը չի կարող այդքան օր մենակ մնալ։' }], keys: ['porque', 'solo', 'cuidar', 'cuide', 'vecina', 'familia'], model: 'Buscaría a alguien que lo cuide, porque un perro no puede quedarse solo.|Կգտնեի մեկին, որ խնամի, քանի որ շունը չի կարող մենակ մնալ։' },
];
/** Escape room: tres salas; cada objeto guarda una pista o un enigma. */
export interface EscObj { icon: string; x: number; y: number; name: Bi; clue?: Bi; q?: Bi; a?: string[]; hint?: Bi; gives?: Bi; needs?: number }
export const ESCAPE: { name: Bi; intro: Bi; objs: EscObj[] }[] = [
  { name: 'El almacén a oscuras|Մութ պահեստը', intro: 'La puerta se ha cerrado sola. Examina los objetos, reúne dos llaves y abre la puerta.|Դուռն ինքնիրեն փակվեց։ Զննիր առարկաները, հավաքիր երկու բանալի և բացիր դուռը։', objs: [
    { icon: 'cuadro', x: -2.4, y: 1.9, name: 'El cuadro|Նկարը', clue: 'En el cuadro hay tres gatos, dos perros y un loro. Debajo pone: «Cuenta todas las patas».|Նկարում երեք կատու, երկու շուն և մեկ թութակ կա։ Տակը գրված է․ «Հաշվիր բոլոր ոտքերը»։' },
    { icon: 'caja', x: -0.9, y: 0.5, name: 'La caja fuerte|Չհրկիզվող պահարանը', q: 'La caja pide un número de dos cifras. ¿Cuántas patas hay en el cuadro?|Պահարանը երկնիշ թիվ է պահանջում։ Քանի՞ ոտք կա նկարում։', a: ['22', 'veintidos'], hint: 'Tres gatos y dos perros tienen cuatro patas cada uno; el loro, dos.|Երեք կատուն և երկու շունը չորսական ոտք ունեն, թութակը՝ երկու։', gives: 'la llave plateada|արծաթե բանալին' },
    { icon: 'libro', x: 0.9, y: 1.2, name: 'El cuaderno|Տետրը', clue: 'Alguien ha escrito: «Lo que abre el cajón es lo contrario de SECO».|Մեկը գրել է․ «Դարակը բացում է ՉՈՐ բառի հականիշը»։' },
    { icon: 'cajon', x: 2.2, y: 0.6, name: 'El cajón|Դարակը', q: 'El cajón tiene un candado de letras. ¿Cuál es la palabra?|Դարակը տառային կողպեք ունի։ Ո՞րն է բառը։', a: ['humedo', 'mojado'], hint: 'La comida de lata no es seca, es…|Պահածոյի կերը չոր չէ, այլ…', gives: 'la llave dorada|ոսկե բանալին' },
    { icon: 'puerta', x: 3.6, y: 1.1, name: 'La puerta|Դուռը', needs: 2, q: 'Di la palabra mágica en imperativo (tú) del verbo «abrir» y añade «te».|Ասա կախարդական բառը՝ «abrir» բայի հրամայականը (tú)՝ ավելացնելով «te»։', a: ['abrete'], hint: 'Abre + te = …|Abre + te = …' } ] },
  { name: 'La sala de los acuarios|Ակվարիումների սրահը', intro: 'Las luces azules parpadean. Aquí, los números y las palabras nadan juntos.|Կապույտ լույսերն առկայծում են։ Այստեղ թվերն ու բառերը միասին են լողում։', objs: [
    { icon: 'acuario', x: -2.4, y: 1, name: 'El acuario|Ակվարիումը', clue: 'Nadan siete peces rojos, el doble de azules y ningún verde.|Լողում են յոթ կարմիր ձուկ, կրկնակի շատ կապույտ և ոչ մի կանաչ։' },
    { icon: 'caja', x: -0.8, y: 0.5, name: 'El cofre|Սնդուկը', q: '¿Cuántos peces hay en total?|Ընդհանուր քանի՞ ձուկ կա։', a: ['21', 'veintiuno'], hint: 'Siete más catorce.|Յոթ գումարած տասնչորս։', gives: 'la llave de coral|կորալե բանալին' },
    { icon: 'cuadro', x: 0.9, y: 1.9, name: 'El cartel|Ցուցանակը', clue: '«Si no me dan agua, ___ (morir, futuro, yo)». Alguien ha subrayado el verbo.|«Եթե ինձ ջուր չտան, ___»։ Մեկն ընդգծել է բայը (morir, ապառնի, ես)։' },
    { icon: 'cajon', x: 2.2, y: 0.6, name: 'El panel|Վահանակը', q: 'Escribe el verbo del cartel en futuro.|Գրիր ցուցանակի բայը ապառնիով։', a: ['morire'], hint: 'Infinitivo completo + é.|Լրիվ անորոշ դերբայ + é։', gives: 'la llave de cristal|ապակե բանալին' },
    { icon: 'puerta', x: 3.6, y: 1.1, name: 'La puerta|Դուռը', needs: 2, q: 'Plural de «pez».|«Pez» բառի հոգնակին։', a: ['peces', 'los peces'], hint: 'La z cambia a c.|Z-ն դառնում է c։' } ] },
  { name: 'El despacho secreto|Գաղտնի աշխատասենյակը', intro: 'Última sala. El antiguo dueño amaba los acertijos.|Վերջին սենյակը։ Նախկին տերը սիրում էր հանելուկներ։', objs: [
    { icon: 'reloj', x: -2.6, y: 2, name: 'El reloj|Ժամացույցը', clue: 'El reloj se paró a las nueve menos veinte de la noche.|Ժամացույցը կանգնել է երեկոյան իննին քսան պակաս։' },
    { icon: 'caja', x: -1, y: 0.5, name: 'La caja digital|Թվային պահարանը', q: 'Escribe la hora en formato de 24 horas, cuatro cifras.|Գրիր ժամը 24-ժամյա ձևաչափով՝ չորս թվանշան։', a: ['2040', '20 40'], hint: 'Nueve de la noche = 21:00. Resta veinte minutos.|Երեկոյան ինը = 21:00։ Հանիր քսան րոպե։', gives: 'la llave antigua|հնաոճ բանալին' },
    { icon: 'libro', x: 0.8, y: 1.2, name: 'El diario|Օրագիրը', clue: '«Ojalá mis animales ___ (ser) felices siempre». La tinta se ha borrado.|«Երանի կենդանիներս միշտ երջանիկ ___ (ser)»։ Թանաքը ջնջվել է։' },
    { icon: 'cajon', x: 2.2, y: 0.6, name: 'El escritorio|Գրասեղանը', q: '¿Qué palabra falta en el diario?|Ո՞ր բառն է պակասում օրագրում։', a: ['sean'], hint: 'Ojalá + presente de subjuntivo de «ser» (ellos).|Ojalá + «ser»-ի subjuntivo (ellos)։', gives: 'la llave de oro|ոսկե բանալին' },
    { icon: 'puerta', x: 3.7, y: 1.1, name: 'La puerta final|Վերջին դուռը', needs: 2, q: 'Tiene siete vidas, ama los tejados y empieza por G. ¿Quién es?|Յոթ կյանք ունի, սիրում է տանիքներ, սկսվում է G-ով։ Ո՞վ է։', a: ['gato', 'el gato', 'gata', 'la gata'], hint: 'Ronronea.|Մռմռում է։' } ] },
];
export const MAZE_Q = rows(`
¿Qué palabra es femenina?|Ո՞ր բառն է իգական։;la decisión|որոշումը;el mapa|քարտեզը;el problema|խնդիրը;el día|օրը
Completa: «Hay ___ agua en el cuenco».|Լրացրու՝ «Ամանի մեջ ___ ջուր կա»։;poca|քիչ (իգ.);poco|քիչ (ար.);pocos|քիչ (ար. հոգն.);pocas|քիչ (իգ. հոգն.)
Lo contrario de «barato» es…|«Barato»-ի հականիշն է…;caro|թանկ;nuevo|նոր;largo|երկար;limpio|մաքուր
Completa: «Mañana ___ al veterinario».|Լրացրու՝ «Վաղը ___ անասնաբույժի մոտ»։;iremos|կգնանք;fuimos|գնացինք;íbamos|գնում էինք;hemos ido|գնացել ենք
¿Qué dice un gato?|Ի՞նչ է ասում կատուն։;miau|մյաու;guau|հաֆ;pío|ծիվ;muu|մու`).map((r) => ({ q: r[0], o: r.slice(1) }));
