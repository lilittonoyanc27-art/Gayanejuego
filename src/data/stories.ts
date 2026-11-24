import { parseScripts } from './script';
export const STORIES = parseScripts(String.raw`
## s1;lucia;A2;Gayane elige una mascota|Գայանեն կենդանի է ընտրում
* Es sábado. Tus padres por fin han dicho que sí: puedes tener una mascota. En la tienda, Lucía te espera.|Շաբաթ է։ Ծնողներդ վերջապես համաձայնեցին՝ կարող ես կենդանի ունենալ։ Խանութում Լուսիան սպասում է քեզ։
> ¡Gayane! Hoy es el gran día. ¿Qué animal has pensado?|Գայանե՛, այսօր մեծ օր է։ Ի՞նչ կենդանի ես մտածել։
+ Quiero un perro para pasear conmigo.|Ուզում եմ շուն՝ հետս զբոսնելու։ => perro
+ Prefiero un gato tranquilo.|Նախընտրում եմ հանգիստ կատու։ => gato
+ Me gustaría tener un conejo.|Կուզենայի ճագար ունենալ։ => conejo
- Quiero que un perro pasear.|Սխալ կառուցվածք։ !! «Quiero un perro» o «quiero pasear con un perro».|«Quiero un perro» կամ «quiero pasear con un perro»։
:perro
>marcos> Canela tiene cinco meses. Pero un perro necesita tres paseos al día, también cuando llueve.|Կանելան հինգ ամսական է։ Բայց շանը օրական երեք զբոսանք է պետք, նաև անձրևին։
+ Me levantaré media hora antes cada día.|Ամեն օր կես ժամ շուտ կարթնանամ։ => perrook
+ ¿También cuando llueve? Entonces prefiero pensarlo.|Անձրևի՞ն էլ։ Այդ դեպքում կմտածեմ։ => pensar
- Me levanto mañana media hora antes ayer.|Անհամատեղելի բառեր։ !! «Mañana» y «ayer» se contradicen. Para una promesa, usa el futuro.|«Mañana»-ն և «ayer»-ը հակասում են։ Խոստման համար՝ ապառնի։
:gato
>elena> Luna es independiente, pero también necesita juegos y limpieza. ¿Quién cambiará la arena?|Լունան անկախ է, բայց նրան էլ խաղ ու մաքրություն է պետք։ Ո՞վ կփոխի ավազը։
+ Yo la cambiaré todos los días.|Ես կփոխեմ ամեն օր։ => gatook
+ Puede hacerlo mi madre, ¿no?|Մայրս կարող է անել, չէ՞։ => gatomal
- Yo lo cambiaré todas los días.|Սխալ համաձայնություն։ !! «La arena» → la; «los días» → todos los días.|«La arena» → la, «todos los días»։
:conejo
>ines> Algodón es muy dulce, pero se asusta con los ruidos. ¿Tu casa es tranquila?|Ալգոդոնը շատ քնքուշ է, բայց վախենում է աղմուկից։ Տունդ հանգի՞ստ է։
+ Sí, y le prepararé un rincón silencioso.|Այո, և լուռ անկյուն կպատրաստեմ։ => conejook
+ No mucho: mi hermano toca la batería.|Այնքան էլ չէ․ եղբայրս հարվածային է նվագում։ => pensar
- Sí, es tranquilo mi casa.|Սխալ սեռ։ !! «Casa» es femenino: tranquila.|«Casa»-ն իգական է՝ tranquila։
:gatomal
>elena> Si la mascota es tuya, la responsabilidad también. ¿Qué dices?|Եթե կենդանին քոնն է, պատասխանատվությունն էլ։ Ի՞նչ կասես։
+ Tiene razón. Lo haré yo.|Ճիշտ եք։ Ես կանեմ։ => gatook
+ Entonces todavía no estoy preparada.|Այդ դեպքում դեռ պատրաստ չեմ։ => pensar
- Tiene razón. Haré lo.|Սխալ տեղ։ !! El pronombre va delante: lo haré.|Դերանունն առաջ՝ lo haré։
:perrook
= 3 Final «Amiga fiel»: Canela duerme esa noche al lado de tu cama. Cada paseo es una aventura.|Ավարտ «Հավատարիմ ընկեր»․ Կանելան այդ գիշեր քնում է մահճակալիդ կողքին։ Ամեն զբոսանք արկած է։
:gatook
= 3 Final «Luna llena»: Luna se sube a tu ventana y ronronea mientras haces los deberes.|Ավարտ «Լիալուսին»․ Լունան բարձրանում է պատուհանագոգին և մռմռում, մինչ դասերդ ես անում։
:conejook
= 3 Final «Suave como el algodón»: Algodón come hierba de tu mano. Habéis aprendido a confiar.|Ավարտ «Փափուկ ինչպես բամբակ»․ Ալգոդոնը ձեռքիցդ խոտ է ուտում։ Սովորել եք վստահել իրար։
:pensar
= 2 Final «Voluntaria»: decides esperar y ayudar en el refugio los domingos. Es una decisión muy madura.|Ավարտ «Կամավոր»․ որոշում ես սպասել և կիրակի օրերին օգնել ապաստարանին։ Շատ հասուն որոշում է։
## s2;sofia;A2;Un regalo para Mimí|Նվեր Միմիի համար
> ¡Gayane! El cumpleaños de mi gata es mañana y no sé qué comprarle. ¿Me ayudas?|Գայանե՛, կատվիս ծնունդը վաղն է, չգիտեմ՝ ինչ գնել։ Կօգնե՞ս։
+ ¡Claro! ¿Qué le gusta hacer?|Իհարկե։ Ի՞նչ է սիրում անել։
+ Por supuesto. ¿Cuánto quieres gastar?|Անշուշտ։ Որքա՞ն ես ուզում ծախսել։ => dinero
- ¡Claro! ¿Qué la gusta hacer?|Սխալ դերանուն։ !! Con «gustar»: le gusta.|«Gustar»-ի հետ՝ le։
> Le encanta cazar moscas y dormir en sitios altos.|Սիրում է ճանճ որսալ և բարձր տեղերում քնել։
=> elegir
:dinero
> Tengo quince euros. Y le encanta cazar moscas.|Տասնհինգ եվրո ունեմ։ Եվ սիրում է ճանճ որսալ։
:elegir
> He visto tres cosas: un ratón de peluche, un collar con cascabel y un rascador de veinticinco euros. ¿Cuál me recomiendas?|Երեք բան եմ տեսել՝ փափուկ մկնիկ, զանգակով վզնոց և քսանհինգ եվրոյի ճանկոց։ Ո՞րն ես խորհուրդ տալիս։
+ Te recomiendo el ratón, porque le gusta cazar.|Մկնիկը, քանի որ սիրում է որսալ։ => raton
+ Te recomiendo el collar: es muy elegante.|Վզնոցը․ շատ նրբագեղ է։ => collar
+ Compremos el rascador entre las dos.|Ճանկոցը միասին գնենք։ => juntas
- Te recomiendo que compras el ratón.|Սխալ եղանակ։ !! «Recomendar que» + subjuntivo: compres.|«Recomendar que» + subjuntivo։
:collar
> Pero Mimí odia llevar cosas en el cuello…|Բայց Միմին ատում է վզին բան կրել…
+ Entonces, mejor el ratón.|Այդ դեպքում ավելի լավ է մկնիկը։ => raton
+ Llévaselo; si no le gusta, lo cambiamos.|Տար, եթե չհավանի, կփոխենք։ => cambio
- Entonces, más bueno el ratón.|Սխալ համեմատական։ !! «Más bueno» → mejor.|«Más bueno» → mejor։
:juntas
> ¿De verdad? ¡Eres la mejor amiga del mundo!|Իսկապե՞ս։ Աշխարհի լավագույն ընկերն ես։
+ Ahorré dinero el mes pasado. Me hace ilusión.|Անցյալ ամիս փող խնայեցի։ Ուրախ եմ։ => jfin
+ Tú siempre me ayudas a mí.|Դու էլ միշտ ինձ ես օգնում։ => jfin
- Yo ahorraba dinero el mes pasado un día.|Սխալ ժամանակ։ !! Acción terminada: ahorré.|Ավարտված գործողություն՝ ahorré։
:raton
= 3 Final «Cazadora feliz»: Mimí no suelta el ratón ni para dormir.|Ավարտ «Երջանիկ որսորդ»․ Միմին մկնիկը բաց չի թողնում անգամ քնելիս։
:cambio
= 2 Final «Plan B»: al día siguiente cambiáis el collar por una pelota. ¡Todo tiene solución!|Ավարտ «Պլան Բ»․ հաջորդ օրը վզնոցը գնդակով եք փոխում։ Ամեն ինչ լուծում ունի։
:jfin
= 3 Final «Amistad de altura»: Mimí duerme en lo alto del rascador y Sofía te abraza.|Ավարտ «Բարձր ընկերություն»․ Միմին քնում է ճանկոցի գագաթին, Սոֆիան գրկում է քեզ։
## s3;andres;B1;El perro perdido|Կորած շունը
* Un hombre entra corriendo en la tienda. Está muy nervioso.|Մի տղամարդ վազելով ներս է մտնում։ Շատ նյարդային է։
> ¡Por favor, ayúdenme! ¡Mi perro ha desaparecido!|Խնդրում եմ, օգնե՛ք։ Շունս անհետացել է։
+ Tranquilo. ¿Cómo es su perro?|Հանգստացեք։ Ինչպիսի՞ն է Ձեր շունը։
+ ¿Dónde lo ha visto por última vez?|Որտե՞ղ եք վերջին անգամ տեսել։ => lugar
- ¿Cómo está su perro de color?|Սխալ բայ։ !! Para describir: ¿cómo es?|Նկարագրելու համար՝ ¿cómo es?։
> Es marrón, grande y lleva un collar rojo. Se llama Moka.|Շագանակագույն է, մեծ, կարմիր վզնոցով։ Անունը Մոկա է։
=> plan
:lugar
> Estábamos en el parque. Estalló un petardo, se asustó y echó a correr. Es marrón y lleva un collar rojo.|Այգում էինք։ Հրավառություն պայթեց, վախեցավ և փախավ։ Շագանակագույն է, կարմիր վզնոցով։
:plan
> ¿Qué hacemos primero?|Ի՞նչ անենք նախ։
+ Vamos al parque a buscarlo ahora mismo.|Հենց հիմա գնանք այգի փնտրելու։ => parque
+ Hagamos carteles con su foto.|Լուսանկարով ցուցանակներ պատրաստենք։ => cartel
+ Llamemos a la policía local y al refugio.|Զանգենք ոստիկանություն և ապաստարան։ => llamar
- Hacemos que carteles con foto suyo.|Սխալ ձև։ !! Propuesta: hagamos carteles; «foto» es femenino.|Առաջարկ՝ hagamos, «foto»-ն իգական է։
:parque
* En el parque, una niña dice que ha visto un perro marrón cerca del lago.|Այգում մի աղջնակ ասում է՝ լճի մոտ շագանակագույն շուն է տեսել։
+ ¿Hacia dónde iba?|Դեպի ո՞ւր էր գնում։ => lago
+ ¿Llevaba un collar rojo?|Կարմիր վզնո՞ց ուներ։ => lago
- ¿Dónde iba a?|Սխալ նախդիր։ !! Dirección: ¿adónde iba? / ¿hacia dónde iba?|Ուղղություն՝ ¿adónde? / ¿hacia dónde?։
:lago
* Detrás de un árbol, Moka tiembla de miedo.|Ծառի հետևում Մոկան վախից դողում է։
+ Siéntate y llámalo con voz suave.|Նստիր և մեղմ ձայնով կանչիր։ => feliz
+ No corra hacia él; déjele un premio en el suelo.|Մի՛ վազեք դեպի նա, խրախուսանք թողեք գետնին։ => feliz
- ¡Corre tras él y grita fuerte!|Վազի՛ր հետևից և գոռա՛։ !! Un perro asustado huiría más lejos.|Վախեցած շունն ավելի հեռու կփախչեր։
:cartel
> Los carteles han quedado muy bien. ¿Qué ponemos debajo de la foto?|Ցուցանակները լավն են։ Ի՞նչ գրենք լուսանկարի տակ։
+ «Se busca perro marrón. Llame a este teléfono».|«Փնտրվում է շագանակագույն շուն։ Զանգեք այս համարով»։ => vecina
+ «Moka es cariñoso, pero tiene miedo. No lo persigan».|«Մոկան քնքուշ է, բայց վախենում է։ Մի՛ հետապնդեք»։ => vecina
- «Se buscan perro marrón».|Սխալ թիվ։ !! Un solo perro: se busca.|Մեկ շուն՝ se busca։
:llamar
* En el refugio contestan: «Acaba de llegar un perro marrón, pero no lleva collar».|Ապաստարանում պատասխանում են․ «Հենց նոր շագանակագույն շուն եկավ, բայց վզնոց չունի»։
+ Puede que lo haya perdido. ¡Vamos a verlo!|Գուցե կորցրել է։ Գնանք տեսնենք։ => refugio
+ ¿Podrían leerle el microchip?|Կարո՞ղ եք կարդալ միկրոչիպը։ => chip
- Puede que lo ha perdido.|Սխալ եղանակ։ !! «Puede que» + subjuntivo: haya perdido.|«Puede que» + subjuntivo։
:feliz
= 3 Final «Reencuentro en el lago»: Moka corre hacia los brazos de Andrés. La niña aplaude.|Ավարտ «Հանդիպում լճի մոտ»․ Մոկան վազում է Անդրեսի գիրկը։ Աղջնակը ծափահարում է։
:vecina
= 3 Final «El barrio unido»: en dos horas, una vecina llama. ¡Moka estaba en su portal!|Ավարտ «Միասնական թաղամաս»․ երկու ժամից հարևանուհին զանգում է։ Մոկան նրա մուտքում էր։
:refugio
= 2 Final «El collar perdido»: era Moka. El collar se enganchó en una rama. ¡Qué susto!|Ավարտ «Կորած վզնոցը»․ Մոկան էր։ Վզնոցը մնացել էր ճյուղին։ Ի՜նչ վախ։
:chip
= 3 Final «Gracias, microchip»: el número coincide. Andrés llora de alegría.|Ավարտ «Շնորհակալ ենք, միկրոչիպ»․ համարը համընկնում է։ Անդրեսը լալիս է ուրախությունից։
## s4;hugo;A2;El nuevo empleado|Նոր աշխատակիցը
> Hola… Soy Hugo. Hoy es mi primer día y estoy un poco nervioso.|Բարև… Ես Ուգոն եմ։ Առաջին օրս է, մի քիչ նյարդային եմ։
+ ¡Bienvenido! Te enseño la tienda.|Բարի գալուստ։ Ցույց կտամ խանութը։ => tour
+ Yo también estaba nerviosa el primer día.|Ես էլ էի նյարդային առաջին օրը։ => animo
- ¡Bienvenida, Hugo! Eres nervioso.|Սխալ սեռ և բայ։ !! «Bienvenido» y estado temporal: estás nervioso.|«Bienvenido» և ժամանակավոր վիճակ՝ estás։
:animo
> ¿De verdad? ¿Y qué hiciste?|Իսկապե՞ս։ Եվ ի՞նչ արեցիր։
+ Hice muchas preguntas y apunté todo.|Շատ հարցեր տվեցի և ամեն ինչ գրեցի։
+ Pedí ayuda a Lucía.|Լուսիայից օգնություն խնդրեցի։
- Hací muchas preguntas.|Սխալ ձև։ !! Indefinido irregular de «hacer»: hice.|«Hacer»-ի անկանոն անցյալ՝ hice։
:tour
> Ya ha entrado un cliente. ¿Lo atiendo yo?|Հաճախորդ մտավ։ Ե՞ս սպասարկեմ։
+ Sí, yo me quedo a tu lado.|Այո, ես կողքիդ կմնամ։ => solo
+ Mira cómo lo hago yo primero.|Նախ նայիր՝ ինչպես եմ անում։ => mira
- Sí, yo quédome a tu lado.|Սխալ տեղ։ !! Verbo conjugado: me quedo.|Խոնարհված բայի հետ՝ me quedo։
:solo
* Hugo se confunde y le da comida de perro a un señor que tiene un gato.|Ուգոն շփոթվում է և շան կեր է տալիս կատու ունեցող մարդուն։
+ Disculpe, es su primer día. Ahora se la cambiamos.|Ներեցեք, առաջին օրն է։ Հիմա կփոխենք։ => equipo
+ Hugo, tranquilo: revisa la etiqueta.|Ուգո՛, հանգիստ, ստուգիր պիտակը։ => aprende
- ¡Qué mal lo haces, Hugo!|Ի՜նչ վատ ես անում, Ուգո՛։ !! Delante del cliente, es mejor ayudar que criticar.|Հաճախորդի մոտ ավելի լավ է օգնել, քան քննադատել։
:mira
* Atiendes al cliente con una sonrisa. Hugo lo apunta todo en su cuaderno.|Ժպիտով սպասարկում ես։ Ուգոն ամեն ինչ գրում է։
> ¡Parece fácil cuando lo haces tú! ¿Me das un consejo?|Երբ դու ես անում, հեշտ է թվում։ Խորհուրդ կտա՞ս։
+ Escucha primero y recomienda después.|Նախ լսիր, հետո խորհուրդ տուր։ => aprende
+ Sonríe y no tengas miedo de preguntar.|Ժպտա և մի՛ վախեցիր հարցնել։ => aprende
- No tienes miedo de preguntar.|Սխալ եղանակ։ !! Consejo negativo: no tengas miedo.|Ժխտական խորհուրդ՝ no tengas։
:equipo
= 3 Final «Buen equipo»: el cliente sonríe y felicita a los dos.|Ավարտ «Լավ թիմ»․ հաճախորդը ժպտում և շնորհավորում է երկուսիդ։
:aprende
= 3 Final «Aprendiz brillante»: al final del día, Hugo vende tres acuarios él solo.|Ավարտ «Փայլուն աշակերտ»․ օրվա վերջում Ուգոն միայնակ երեք ակվարիում է վաճառում։
## s5;lucia;B1;La fiesta de adopción|Որդեգրման տոնը
> Gayane, quiero organizar una jornada de adopción responsable. ¿Me ayudas a prepararla?|Գայանե՛, ուզում եմ պատասխանատու որդեգրման օր կազմակերպել։ Կօգնե՞ս։
+ Sí. Propongo hacerla en el parque.|Այո։ Առաջարկում եմ այգում անել։ => parque
+ Sí, hagámosla aquí, en la tienda.|Այո, անենք այստեղ՝ խանութում։ => tienda
- Sí. Propongo que la hacemos en el parque.|Սխալ եղանակ։ !! «Proponer que» + subjuntivo: hagamos.|«Proponer que» + subjuntivo։
:parque
* El día anterior, el pronóstico anuncia lluvia.|Նախորդ օրը եղանակի տեսությունն անձրև է խոստանում։
+ Pongamos carpas por si llueve.|Վրաններ դնենք, եթե անձրև գա։ => familias
+ Cambiémosla de lugar y avisemos a todos.|Տեղը փոխենք և բոլորին տեղեկացնենք։ => tienda
- Si lloverá, ponemos carpas.|Սխալ ժամանակ։ !! Después de «si», presente: si llueve.|«Si»-ից հետո ներկա՝ si llueve։
:tienda
* La tienda es pequeña y podrían venir cien personas.|Խանութը փոքր է, և կարող է հարյուր մարդ գալ։
+ Organicemos turnos de veinte personas.|Քսանական մարդով հերթեր կազմակերպենք։ => familias
+ Que vengan solo quienes se apunten antes.|Թող գան միայն նախապես գրանցվածները։ => familias
- Que vienen solo quien se apunta.|Սխալ եղանակ։ !! Deseo u orden: que vengan.|Ցանկություն կամ հրաման՝ que vengan։
:familias
* Llega una pareja con prisa. Quieren llevarse un cachorro en cinco minutos.|Շտապող զույգ է գալիս։ Ուզում են հինգ րոպեում լակոտ տանել։
+ Antes tienen que hablar con la responsable del refugio.|Նախ պետք է խոսեն ապաստարանի պատասխանատուի հետ։ => resp
+ ¿Cuánto tiempo pasarían con él cada día?|Ամեն օր որքա՞ն ժամանակ կանցկացնեին նրա հետ։ => resp
+ Claro, lléveselo, no hay problema.|Իհարկե, տարե՛ք, խնդիր չկա։ => prisa
- Antes tienen hablar con la responsable.|Բաց թողնված բառ։ !! «Tener que» + infinitivo.|«Tener que» + անորոշ դերբայ։
:resp
* La pareja escucha, hace preguntas y decide conocer a un perro adulto.|Զույգը լսում է, հարցնում և որոշում ծանոթանալ չափահաս շան հետ։
+ Es una decisión excelente: ya está educado.|Գերազանց որոշում է, արդեն կրթված է։ => exito
+ Les llamaremos en una semana para ver cómo va.|Մեկ շաբաթից կզանգենք՝ իմանալու։ => exito
- Es un decisión excelente.|Սխալ սեռ։ !! «Decisión» es femenino: una.|«Decisión»-ն իգական է։
:exito
= 3 Final «Ocho hogares»: ocho animales encuentran familia y el periódico publica tu foto.|Ավարտ «Ութ տուն»․ ութ կենդանի ընտանիք է գտնում, թերթը տպում է լուսանկարդ։
:prisa
= 1 Final «Vuelta al refugio»: a los tres días devuelven al cachorro. Has aprendido que adoptar exige tiempo.|Ավարտ «Վերադարձ ապաստարան»․ երեք օրից լակոտին հետ են բերում։ Սովորեցիր, որ որդեգրումը ժամանակ է պահանջում։
## s6;rosa;B1;La clienta descontenta|Դժգոհ հաճախորդը
> ¡Esto es un escándalo! Compré esta correa hace tres días y ya se ha roto.|Խայտառակությո՛ւն է։ Երեք օր առաջ գնեցի այս թոկը, արդեն կտրվել է։
+ Lo siento mucho, señora. ¿Me permite verla?|Շատ եմ ցավում, տիկի՛ն։ Թույլ կտա՞ք տեսնել։ => ver
+ Entiendo su enfado. ¿Qué ha ocurrido exactamente?|Հասկանում եմ Ձեր բարկությունը։ Կոնկրետ ի՞նչ է պատահել։ => que
+ Seguro que su perro la ha mordido.|Հաստատ շունը կծել է։ => culpa
- Lo siento mucha, señora.|Սխալ ձև։ !! Con el verbo: mucho (adverbio).|Բայի հետ՝ mucho (մակբայ)։
:ver
* El cierre está defectuoso: no es culpa de la clienta.|Ճարմանդը թերի է․ հաճախորդի մեղքը չէ։
=> sol
:que
> Estaba paseando, el perro tiró un poco y el cierre saltó. ¡Podría haberse escapado!|Զբոսնում էի, շունը մի քիչ քաշեց, ճարմանդը բացվեց։ Կարող էր փախչել։
=> sol
:culpa
> ¡¿Cómo se atreve?! ¡Mi perro tiene catorce años y casi no tiene dientes!|Ինչպե՞ս եք համարձակվում։ Շունս տասնչորս տարեկան է, գրեթե ատամ չունի։
+ Perdone, no debería haber dicho eso.|Ներեցեք, չպետք է դա ասեի։ => sol
+ Tiene razón, he hablado sin pensar.|Ճիշտ եք, առանց մտածելու խոսեցի։ => sol
- Perdone, no debería decido eso.|Սխալ ձև։ !! No debería haber dicho.|No debería haber dicho։
:sol
> ¿Y ahora qué piensa hacer?|Եվ հիմա ի՞նչ եք մտածում անել։
+ Le ofrezco una correa nueva o el dinero, como prefiera.|Առաջարկում եմ նոր թոկ կամ գումարը՝ ինչպես նախընտրեք։ => final
+ Se la cambio por otra más resistente sin coste.|Կփոխեմ ավելի ամուրով՝ անվճար։ => final
+ Sin recibo no puedo hacer nada.|Առանց կտրոնի ոչինչ չեմ կարող։ => mal
- Le ofrezco una correa nueva como prefiere.|Սխալ եղանակ։ !! Cortesía e indeterminación: como prefiera.|Քաղաքավարություն՝ como prefiera։
:final
= 3 Final «Clienta para siempre»: doña Rosa vuelve al día siguiente… ¡con un pastel!|Ավարտ «Հավիտյան հաճախորդ»․ տիկին Ռոսան հաջորդ օրը վերադառնում է… տորթով։
:mal
= 1 Final «Una estrella»: doña Rosa se va enfadada. Lucía te explica que un producto defectuoso siempre se cambia.|Ավարտ «Մեկ աստղ»․ տիկին Ռոսան բարկացած գնում է։ Լուսիան բացատրում է, որ թերի ապրանքը միշտ փոխվում է։
## s7;emma;A2;Una turista en apuros|Զբոսաշրջիկը նեղության մեջ
> Hello… perdón, hola. Yo hablo poco español. Mi perro… ¿comida?|Hello… ներողություն, բարև։ Քիչ իսպաներեն եմ խոսում։ Շունս… կե՞ր։
+ No se preocupe, hablaré despacio.|Մի անհանգստացեք, դանդաղ կխոսեմ։
+ ¿Quiere comida para su perro? Sígame.|Շան կե՞ր եք ուզում։ Հետևեք ինձ։
- No se preocupa, hablo despacio.|Սխալ եղանակ։ !! Imperativo con usted: no se preocupe.|Հրամայական «usted»-ով՝ no se preocupe։
> Gracias. Mi perro no come pollo. Come… ¿fish?|Շնորհակալություն։ Շունս հավ չի ուտում։ Ուտում է… fish։
+ ¿Pescado? Tenemos pienso de salmón.|Ձո՞ւկ։ Սաղմոնով չոր կեր ունենք։ => salmon
+ Entonces, ¿es alérgico al pollo?|Ուրեմն ալերգի՞կ է հավից։ => alergia
- ¿Pez? Tenemos pienso de pez.|Սխալ բառ։ !! Pez = animal vivo; pescado = comida.|Pez = կենդանի ձուկ, pescado = ուտելիք։
:alergia
> ¡Sí! Alérgico. Gracias por la palabra nueva.|Այո։ Ալերգիկ։ Շնորհակալ եմ նոր բառի համար։
:salmon
> ¡Perfecto! Y… ¿dónde parque para perros?|Հիանալի։ Եվ… որտե՞ղ այգի շների։
+ Siga recto y gire a la izquierda en la fuente.|Ուղիղ գնացեք և շատրվանի մոտ ձախ թեքվեք։ => fin
+ Le dibujo un plano, es más fácil.|Քարտեզ կնկարեմ, ավելի հեշտ է։ => plano
+ Si quiere, la acompaño.|Եթե ուզում եք, կուղեկցեմ։ => acomp
- Sigue recto y gire a izquierda, usted.|Սխալ ձևեր։ !! Con usted: siga; y «a la izquierda».|«Usted»-ով՝ siga, և «a la izquierda»։
:fin
= 2 Final «Buen camino»: Emma encuentra el parque y te manda una foto.|Ավարտ «Բարի ճանապարհ»․ Էմման գտնում է այգին և լուսանկար ուղարկում։
:plano
= 3 Final «La mapa… ¡el mapa!»: Emma guarda tu plano como recuerdo y aprende que «mapa» es masculino.|Ավարտ «Քարտեզը»․ Էմման պահում է քարտեզդ որպես հուշ և սովորում, որ «mapa»-ն արական է։
:acomp
= 3 Final «Amiga internacional»: paseáis juntas y Emma te invita a visitar su país.|Ավարտ «Միջազգային ընկեր»․ միասին զբոսնում եք, Էմման հրավիրում է իր երկիր։
## s8;lucia;B2;Mi tienda en España|Իմ խանութը Իսպանիայում
* Han pasado los años. Gayane llega a Valencia con un sueño: abrir su propia tienda de animales, «El mundo de Gayane».|Տարիներ են անցել։ Գայանեն Վալենսիա է գալիս երազանքով՝ բացել սեփական խանութը՝ «Գայանեի աշխարհը»։
>pablo> He encontrado dos locales: uno céntrico y caro, y otro más barato cerca de un parque. ¿Cuál alquilarías?|Երկու տարածք եմ գտել՝ մեկը կենտրոնական ու թանկ, մյուսը՝ էժան, այգու մոտ։ Ո՞րը կվարձեիր։
+ El del parque: allí pasea mucha gente con perros.|Այգու մոտինը․ այնտեղ շատ են շներով զբոսնում։ => parque
+ El céntrico: cuanta más gente, más ventas.|Կենտրոնականը․ որքան շատ մարդ, այնքան շատ վաճառք։ => centro
- El céntrico: cuanto más gente, mejor ventas.|Սխալ համաձայնություն։ !! Cuanta más gente (fem.), más ventas.|Cuanta más gente՝ իգական։
:parque
>rosa> Los vecinos temen que haya ruido y malos olores.|Հարևանները վախենում են աղմուկից և վատ հոտից։
+ Los invitaría a la inauguración para que vieran cómo trabajamos.|Կհրավիրեի բացմանը, որ տեսնեին՝ ինչպես ենք աշխատում։ => abierto
+ Les aseguraría que cumpliremos todas las normas.|Կհավաստիացնեի, որ բոլոր կանոնները կպահպանենք։ => abierto
- Les aseguro que cumpliríamos si ellos quisieran que vienen.|Սխալ համադրություն։ !! «Quisieran que» + subjuntivo: que viniéramos.|«Quisieran que» + subjuntivo։
:centro
>pablo> El alquiler es altísimo. A los dos meses, casi no quedan ahorros.|Վարձը շատ բարձր է։ Երկու ամսից խնայողություն գրեթե չի մնացել։
+ Buscaré una socia que comparta los gastos.|Գործընկեր կփնտրեմ, որ ծախսերը կիսի։ => socia
+ Venderé también por internet.|Նաև համացանցով կվաճառեմ։ => online
- Buscaré una socia que comparte los gastos, si existe.|Սխալ եղանակ։ !! Persona no conocida: que comparta.|Անծանոթ անձ՝ subjuntivo։
:abierto
* El día de la inauguración no cabe ni un alfiler. Un periodista te pregunta por tu secreto.|Բացման օրը ասեղ գցելու տեղ չկա։ Լրագրողը հարցնում է գաղտնիքդ։
+ Mi secreto es escuchar a las personas y respetar a los animales.|Գաղտնիքս՝ լսել մարդկանց և հարգել կենդանիներին։ => final
+ No lo habría conseguido sin el apoyo de mi familia.|Առանց ընտանիքիս աջակցության չէի հասնի։ => final
- No lo habré conseguido sin mi familia ayer.|Սխալ ժամանակ։ !! Hipótesis del pasado: no lo habría conseguido.|Անցյալի ենթադրություն՝ habría conseguido։
:final
= 3 Final «La tienda del parque»: cinco años después, «El mundo de Gayane» es el lugar favorito del barrio.|Ավարտ «Այգու խանութը»․ հինգ տարի անց «Գայանեի աշխարհը» թաղամասի սիրելի վայրն է։
:socia
= 3 Final «Dos socias»: Sofía se une al proyecto. Juntas abrís una segunda tienda.|Ավարտ «Երկու գործընկեր»․ Սոֆիան միանում է։ Միասին երկրորդ խանութն եք բացում։
:online
= 3 Final «Sin fronteras»: tus pedidos llegan hasta Ereván. ¡Qué orgullo!|Ավարտ «Առանց սահմանների»․ պատվերներդ հասնում են մինչև Երևան։ Ի՜նչ հպարտություն։
## s9;carmen;B1;Navidad en la tienda|Սուրբ Ծնունդը խանութում
> Faltan tres semanas para Navidad. ¿Qué ambiente te gustaría crear?|Երեք շաբաթ է մնացել Սուրբ Ծննդին։ Ի՞նչ մթնոլորտ կուզենայիր։
+ Me encantaría un bosque nevado con luces suaves.|Շատ կուզենայի ձյունոտ անտառ՝ մեղմ լույսերով։ => bosque
+ Prefiero algo solidario: un árbol de deseos para el refugio.|Բարեգործական բան եմ նախընտրում՝ ցանկությունների ծառ ապաստարանի համար։ => arbol
- Me encantaría que hay un bosque.|Սխալ եղանակ։ !! Me encantaría que hubiera.|Me encantaría que hubiera։
:bosque
* Los adornos de cristal están muy bajos. Un gatito los mira con mucho interés.|Ապակե զարդերը շատ ցածր են։ Կատվիկը մեծ հետաքրքրությամբ նայում է։
+ Pongámoslos más arriba: podrían romperse.|Ավելի վերև դնենք, կարող են կոտրվել։ => listo
+ Cambiemos el cristal por madera.|Ապակին փայտով փոխենք։ => listo
+ Qué mono, déjalo jugar.|Ի՜նչ սիրուն է, թող խաղա։ => roto
- Pongámolos más arriba.|Սխալ ձև։ !! Pongamos + los = pongámoslos.|Pongamos + los = pongámoslos։
:arbol
* Cada cliente cuelga un deseo y dona una lata. En dos días hay cien latas.|Ամեն հաճախորդ ցանկություն է կախում և պահածո նվիրում։ Երկու օրում հարյուր պահածո կա։
+ ¡Hagamos también una rifa!|Նաև վիճակախաղ անենք։ => soli
+ Llevémoslas al refugio el día veinticuatro.|Տանենք ապաստարան ամսի քսանչորսին։ => soli
- Llevémoslos al refugio las latas.|Սխալ սեռ։ !! «Las latas» → llevémoslas.|«Las latas» → llevémoslas։
:roto
> ¡Crac! Se ha roto una bola. Por suerte, nadie se ha hecho daño.|Ճրը՜թ։ Մի գունդ կոտրվեց։ Բարեբախտաբար ոչ ոք չի վնասվել։
+ Lo recojo yo. Debí haberlo pensado antes.|Ես կհավաքեմ։ Պետք է նախապես մտածեի։ => aprend
+ Aparta al gatito mientras yo barro.|Հեռացրու կատվիկին, մինչ ավլեմ։ => aprend
- Lo recojo yo. Debo pensarlo antes ayer.|Սխալ ժամանակ։ !! Crítica al pasado: debí haberlo pensado.|Անցյալի քննադատություն՝ debí haberlo pensado։
:listo
= 3 Final «Bosque encantado»: ganáis el premio al mejor escaparate del barrio.|Ավարտ «Կախարդված անտառ»․ շահում եք թաղամասի լավագույն ցուցափեղկի մրցանակը։
:soli
= 3 Final «Estrella solidaria»: el refugio celebra la mejor Navidad de su historia.|Ավարտ «Բարեգործության աստղ»․ ապաստարանը տոնում է իր լավագույն Սուրբ Ծնունդը։
:aprend
= 2 Final «Navidad sin cristales»: decoráis todo con galletas y cintas. ¡Es aún más bonito!|Ավարտ «Սուրբ Ծնունդ առանց ապակու»․ ամեն ինչ զարդարում եք թխվածքներով և ժապավեններով։ Ավելի գեղեցիկ է։
## s10;vet;B2;Presupuesto limitado|Սահմանափակ բյուջե
> Hemos rescatado a tres animales: una perra, un conejo y un canario. Solo disponemos de cuarenta euros para la primera semana. ¿Por dónde empezarías?|Երեք կենդանի ենք փրկել՝ շուն, ճագար և դեղձանիկ։ Առաջին շաբաթվա համար ընդամենը քառասուն եվրո ունենք։ Որտեղի՞ց կսկսեիր։
+ Empezaría por la comida: es lo más urgente.|Կերից․ ամենաշտապն է։ => comida
+ Haría una lista de prioridades con precios.|Առաջնահերթությունների ցանկ կանեի՝ գներով։ => lista
+ Compraría camas bonitas para los tres.|Երեքի համար գեղեցիկ անկողին կգնեի։ => camas
- Empezaría para la comida.|Սխալ նախդիր։ !! «Empezar por» algo.|«Empezar por»։
:camas
> Una cama cuesta veinte euros. Si compras dos, no quedará dinero para comer.|Անկողինը քսան եվրո է։ Եթե երկուսը գնես, կերի փող չի մնա։
+ Es cierto. Usaré mantas viejas y compraré comida.|Ճիշտ է։ Հին ծածկոցներ կօգտագործեմ և կեր կգնեմ։ => comida
+ Entonces pediré donaciones de mantas.|Այդ դեպքում ծածկոցների նվիրատվություն կխնդրեմ։ => dona
- Es cierto. Si comprara camas, no queda dinero.|Սխալ համադրություն։ !! Si comprara…, no quedaría dinero.|Si comprara…, no quedaría։
:lista
> Muy profesional. Pienso, 11,90; heno, 5,40; alpiste, 3,60. ¿Cuánto es en total?|Շատ պրոֆեսիոնալ։ Չոր կեր՝ 11,90, խոտ՝ 5,40, սերմեր՝ 3,60։ Ընդհանուր որքա՞ն է։
+ Veinte euros con noventa.|Քսան եվրո իննսուն ցենտ։ => resto
- Veintiún euros con noventa.|Քսանմեկ եվրո իննսուն։ !! 11,90 + 5,40 + 3,60 = 20,90.|11,90 + 5,40 + 3,60 = 20,90։
- Diecinueve euros con noventa.|Տասնինը եվրո իննսուն։ !! 11,90 + 5,40 + 3,60 = 20,90.|11,90 + 5,40 + 3,60 = 20,90։
:comida
> De acuerdo. La comida de los tres cuesta 20,90 euros. Nos quedan 19,10.|Լավ։ Երեքի կերը 20,90 է։ Մնում է 19,10։
:resto
> ¿Qué harías con el dinero restante?|Ի՞նչ կանեիր մնացած գումարով։
+ Lo guardaría por si surgiera una urgencia.|Կպահեի, եթե շտապ դեպք լինի։ => ahorro
+ Compraría lecho de papel y un cuenco.|Թղթե ցամքար և աման կգնեի։ => equil
- Lo guardaría por si surge una urgencia ayer.|Սխալ ժամանակ։ !! Es una hipótesis futura: por si surgiera.|Ապագայի ենթադրություն՝ por si surgiera։
:dona
= 3 Final «La red de mantas»: llegan treinta mantas y los tres duermen calentitos.|Ավարտ «Ծածկոցների ցանցը»․ երեսուն ծածկոց է գալիս, երեքն էլ տաք քնում են։
:ahorro
= 3 Final «Previsora»: el jueves la perra necesita un análisis, y gracias a ti se puede pagar.|Ավարտ «Հեռատես»․ հինգշաբթի շանը անալիզ է պետք, և քո շնորհիվ կարելի է վճարել։
:equil
= 2 Final «Todo en orden»: los animales están cómodos, aunque no quedan ahorros.|Ավարտ «Ամեն ինչ կարգին է»․ կենդանիները հարմարավետ են, թեև խնայողություն չմնաց։
`);
