import { parseScripts } from './script';
export const DIALOGUES = parseScripts(String.raw`
## d1;lucia;A2;Comida para mi gato|Կեր իմ կատվի համար
> ¡Buenas tardes, Gayane! ¿En qué puedo ayudarte?|Բարի օր, Գայանե՛։ Ինչո՞վ կարող եմ օգնել։
+ Estoy buscando comida para mi gato.|Կեր եմ փնտրում իմ կատվի համար։
+ Necesito comida para un gato, por favor.|Ինձ կատվի կեր է պետք, խնդրում եմ։
- Estoy buscar comida para mi gato.|Փնտրում կեր կատվի համար (սխալ ձև)։ !! Después de «estar» usamos el gerundio: estoy buscando.|«Estar»-ից հետո օգտագործում ենք gerundio՝ estoy buscando։
> ¿Qué edad tiene tu gato?|Քանի՞ տարեկան է կատուդ։
+ Tiene dos años.|Երկու տարեկան է։
+ Es un cachorro: tiene tres meses.|Ձագ է, երեք ամսական։ => bebe
- Es dos años.|«Է երկու տարեկան» (սխալ բայ)։ !! La edad se expresa con «tener»: tiene dos años.|Տարիքն արտահայտում ենք «tener» բայով՝ tiene dos años։
> ¿Prefieres comida seca o húmeda?|Չո՞ր, թե՞ խոնավ կեր ես նախընտրում։
+ Prefiero comida húmeda.|Նախընտրում եմ խոնավ կեր։ => fin
+ Prefiero comida seca, porque dura más.|Նախընտրում եմ չոր կեր, քանի որ ավելի երկար է պահպանվում։ => fin
- Yo prefere comida húmeda.|Խոնավ կեր (սխալ ձև)։ !! «Preferir» cambia e→ie: yo prefiero.|«Preferir» բայում e→ie՝ yo prefiero։
:bebe
> ¡Qué pequeño! Entonces necesita comida especial para gatitos. ¿Come bien?|Ի՜նչ փոքրիկ է։ Ուրեմն նրան կատվիկների հատուկ կեր է պետք։ Լա՞վ է ուտում։
+ Sí, come cuatro veces al día.|Այո, օրական չորս անգամ է ուտում։ => fin
+ No mucho, come muy despacio.|Այնքան էլ չէ, շատ դանդաղ է ուտում։ => fin
- Sí, come cuatro vezes en el día.|Այո, չորս անգամ (սխալ գրություն)։ !! Se escribe «veces» y se dice «al día».|Գրվում է «veces», և ասում ենք «al día»։
:fin
> Tenemos varias opciones. ¿Cuánto quieres gastar?|Մի քանի տարբերակ ունենք։ Որքա՞ն ես ուզում ծախսել։
+ No más de diez euros.|Տասը եվրոյից ոչ ավելի։
+ Entre cinco y diez euros.|Հինգից տասը եվրո։
- No más que diez euros de dinero.|Տասը եվրոյից ավելի (անբնական)։ !! Con cantidades decimos «más de»: no más de diez euros.|Քանակների հետ ասում ենք «más de»։
= 3 ¡Perfecto! Las latas están en el primer estante. Has sido una clienta estupenda.|Հիանալի է։ Պահածոները առաջին դարակում են։ Դու հրաշալի հաճախորդ էիր։
## d2;lucia;A2;¿Dónde está?|Որտե՞ղ է
> Hola, pareces perdida. ¿Buscas algún departamento?|Բարև, կարծես մոլորվել ես։ Որևէ բաժի՞ն ես փնտրում։
+ Sí, ¿dónde están los juguetes?|Այո, որտե՞ղ են խաղալիքները։
+ Sí, quería ver los accesorios.|Այո, ուզում էի պարագաները տեսնել։
- Sí, ¿dónde hay los juguetes?|Այո, որտե՞ղ կա խաղալիքները (սխալ)։ !! Con «los juguetes» (algo concreto) usamos «estar»: ¿dónde están?|Որոշյալ առարկայի հետ օգտագործում ենք «estar»։
> Están en el centro de la tienda, al lado de los accesorios. ¿Es para tu mascota?|Խանութի կենտրոնում են, պարագաների կողքին։ Քո կենդանո՞ւ համար է։
+ Sí, es para mi perra.|Այո, իմ շան համար է։
+ No, es un regalo para mi prima.|Ոչ, նվեր է զարմուհուս համար։ => regalo
- Sí, es por mi perra.|Այո, իմ շան պատճառով է։ !! El destinatario se expresa con «para»: es para mi perra.|Ստացողին նշում ենք «para»-ով։
> ¡Qué bien! A las perras jóvenes les encantan las pelotas. ¿Es grande?|Հիանալի է։ Երիտասարդ շները շատ են սիրում գնդակներ։ Մե՞ծ է։
+ No, es bastante pequeña.|Ոչ, բավական փոքր է։ => fin
+ Sí, es más grande que yo.|Այո, ինձնից մեծ է։ => fin
- No, está pequeña.|Ոչ, փոքր է (սխալ բայ)։ !! El tamaño es una característica: usamos «ser».|Չափսը հատկանիշ է․ օգտագործում ենք «ser»։
:regalo
> ¡Qué detalle! ¿Qué mascota tiene tu prima?|Ի՜նչ հոգատար ես։ Զարմուհիդ ի՞նչ կենդանի ունի։
+ Tiene un hámster muy activo.|Շատ աշխույժ գերմանամուկ ունի։
+ Tiene dos conejos blancos.|Երկու սպիտակ ճագար ունի։
- Tiene dos conejos blanco.|Երկու սպիտակ ճագար (սխալ համաձայնություն)։ !! El adjetivo concuerda: conejos blancos.|Ածականը համաձայնում է՝ conejos blancos։
:fin
= 3 Ya sabes dónde buscar. ¡Disfruta de la tienda!|Արդեն գիտես, թե որտեղ փնտրել։ Վայելի՛ր խանութը։
## d3;marcos;A2;El perro ideal|Իդեալական շունը
> ¡Hola! Veo que miras a Canela. ¿Te gustan los perros?|Բարև։ Տեսնում եմ՝ Կանելային ես նայում։ Սիրո՞ւմ ես շներ։
+ Sí, me encantan los perros.|Այո, շատ եմ սիրում շներ։
+ Sí, pero me gustan más los perros pequeños.|Այո, բայց ավելի շատ փոքր շներ եմ սիրում։
- Sí, me encanta los perros.|Այո, շներ (սխալ թիվ)։ !! El verbo concuerda con «los perros»: me encantan.|Բայը համաձայնում է «los perros»-ի հետ՝ me encantan։
> ¿Vives en un piso o en una casa con jardín?|Բնակարանո՞ւմ ես ապրում, թե՞ այգիով տանը։
+ Vivo en un piso.|Բնակարանում եմ ապրում։ => piso
+ Vivo en una casa con jardín.|Այգիով տանն եմ ապրում։
- Vivo a un piso.|Ապրում եմ բնակարան (սխալ նախդիր)։ !! Para el lugar donde vivimos usamos «en».|Ապրելու վայրի հետ՝ «en»։
> Con jardín, un perro grande estará feliz, pero también debe pasear.|Այգիով մեծ շունը երջանիկ կլինի, բայց նաև պետք է զբոսնի։
=> tiempo
:piso
> En un piso, un perro tranquilo es mejor. Lo importante es el paseo.|Բնակարանում հանգիստ շունն ավելի լավ է։ Կարևորը զբոսանքն է։
:tiempo
> ¿Cuánto tiempo tienes para pasear cada día?|Ամեն օր որքա՞ն ժամանակ ունես զբոսնելու։
+ Puedo pasear una hora por la mañana y otra por la tarde.|Կարող եմ մեկ ժամ առավոտյան և մեկ ժամ երեկոյան զբոսնել։
+ Tengo poco tiempo, pero mi hermano me ayudará.|Քիչ ժամանակ ունեմ, բայց եղբայրս կօգնի ինձ։
- Puedo paseo una hora.|Կարող եմ զբոսանք մեկ ժամ (սխալ)։ !! Después de «poder» va el infinitivo: puedo pasear.|«Poder»-ից հետո անորոշ դերբայ՝ puedo pasear։
= 3 Eres muy responsable. ¡Cualquier perro tendría suerte contigo!|Շատ պատասխանատու ես։ Ցանկացած շուն կուրախանար քեզ հետ։
## d4;elena;A2;Una gata tímida|Ամաչկոտ կատուն
> Esta es Luna. Ayer llegó a la tienda y todavía tiene miedo.|Սա Լունան է։ Երեկ եկավ խանութ և դեռ վախենում է։
+ ¡Pobrecita! ¿Puedo acariciarla?|Խե՜ղճ։ Կարո՞ղ եմ շոյել նրան։
+ ¿Por qué tiene miedo?|Ինչո՞ւ է վախենում։ => miedo
- ¿Puedo acariciarle la?|Կարո՞ղ եմ շոյել (սխալ դերանուն)։ !! «Acariciar a Luna» → acariciarla: un solo pronombre.|«Acariciar a Luna» → acariciarla՝ միայն մեկ դերանուն։
> Sí, pero despacio. Primero deja que huela tu mano.|Այո, բայց դանդաղ։ Սկզբում թող հոտոտի ձեռքդ։
=> sigue
:miedo
> Porque hay muchos ruidos nuevos. Los gatos necesitan tiempo.|Որովհետև շատ նոր ձայներ կան։ Կատուներին ժամանակ է պետք։
:sigue
> ¿Qué crees que necesita Luna ahora?|Ի՞նչ ես կարծում, ի՞նչ է պետք Լունային հիմա։
+ Creo que necesita un lugar tranquilo.|Կարծում եմ՝ հանգիստ տեղ է պետք։
+ Necesita esconderse un rato en una caja.|Պետք է մի քիչ թաքնվի տուփի մեջ։
- Creo que necesita mucho ruido y luz.|Կարծում եմ՝ շատ աղմուկ ու լույս է պետք։ !! Está bien escrito, pero un gato con miedo necesita calma.|Ճիշտ է գրված, բայց վախեցած կատվին հանգստություն է պետք։
> Exacto. ¿Quieres ayudarme a cuidarla esta semana?|Ճիշտ է։ Ուզո՞ւմ ես այս շաբաթ օգնել ինձ խնամել նրան։
+ ¡Claro que sí! Vendré todas las tardes.|Իհարկե՜։ Կգամ ամեն երեկո։
+ Me gustaría, pero tengo exámenes.|Կուզենայի, բայց քննություններ ունեմ։
- Claro que sí, vendré todas las tarde.|Իհարկե, կգամ (սխալ հոգնակի)։ !! «Todas las» pide plural: todas las tardes.|«Todas las» պահանջում է հոգնակի։
= 3 Gracias, Gayane. Luna ya te mira con curiosidad.|Շնորհակալություն, Գայանե՛։ Լունան արդեն հետաքրքրությամբ է նայում քեզ։
## d5;diego;A2;Mi primer acuario|Իմ առաջին ակվարիումը
> ¡Buenas! ¿Es tu primer acuario?|Ողջո՜ւյն։ Սա քո առաջի՞ն ակվարիումն է։
+ Sí, nunca he tenido peces.|Այո, երբեք ձկներ չեմ ունեցել։
+ No, de pequeña tuve un pez dorado.|Ոչ, փոքր ժամանակ ոսկե ձկնիկ եմ ունեցել։
- Sí, nunca he tenido pezes.|Այո, երբեք ձկներ (սխալ գրություն)։ !! El plural de «pez» es «peces»: la z cambia a c.|«Pez»-ի հոգնակին «peces» է՝ z-ն դառնում է c։
> ¿Dónde vas a poner el acuario?|Որտե՞ղ ես դնելու ակվարիումը։
+ Voy a ponerlo en mi habitación.|Դնելու եմ սենյակումս։
+ En el salón, lejos de la ventana.|Հյուրասենյակում, պատուհանից հեռու։
- Voy ponerlo en mi habitación.|Դնելու եմ (բաց է թողնված նախդիրը)։ !! Futuro próximo: ir + a + infinitivo.|Մոտ ապառնի՝ ir + a + անորոշ դերբայ։
> Bien. El sol directo no es bueno. ¿Sabes qué debes preparar antes de traer los peces?|Լավ։ Ուղիղ արևը լավ չէ։ Գիտե՞ս՝ ինչ պետք է պատրաստել ձկներին բերելուց առաջ։
+ Tengo que instalar el filtro y preparar el agua.|Պետք է տեղադրեմ ֆիլտրը և պատրաստեմ ջուրը։
+ No lo sé. ¿Me lo puedes explicar?|Չգիտեմ։ Կարո՞ղ ես բացատրել ինձ։
- Nada, pongo los peces el primer día.|Ոչինչ, առաջին իսկ օրը կդնեմ ձկներին։ !! El agua necesita varios días para estar lista: primero filtro y plantas.|Ջրին մի քանի օր է պետք պատրաստ լինելու համար՝ նախ ֆիլտր և բույսեր։
= 3 Filtro, plantas y paciencia: en una semana podrás traer tus peces.|Ֆիլտր, բույսեր և համբերություն․ մեկ շաբաթից կարող ես բերել ձկներիդ։
## d6;ines;A2;El loro que habla|Խոսող թութակը
> ¡Cuidado! Kiwi repite todo lo que oye. ¿Le dices algo?|Զգո՜ւյշ, Կիվին կրկնում է ամեն լսածը։ Որևէ բան կասե՞ս նրան։
+ ¡Hola, Kiwi! ¿Cómo estás?|Բարև, Կի՛վի։ Ինչպե՞ս ես։
+ ¡Buenos días, guapo!|Բարի լույս, սիրունի՛կ։
- ¡Hola, Kiwi! ¿Cómo eres hoy?|Բարև, Կիվի։ Ինչպիսի՞ն ես այսօր։ !! Para el estado de ánimo usamos «estar»: ¿cómo estás?|Վիճակի համար օգտագործում ենք «estar»։
> «¡Hola, guapa!» ¿Ves? Aprendió esa frase el mes pasado.|«Բարև, սիրունի՛կ»։ Տեսնո՞ւմ ես, այդ նախադասությունը սովորեց անցյալ ամիս։
+ ¿Cómo se la enseñaste?|Ինչպե՞ս սովորեցրիր նրան։
+ ¡Es más inteligente de lo que pensaba!|Ավելի խելացի է, քան կարծում էի։
- ¿Cómo le la enseñaste?|Ինչպե՞ս սովորեցրիր (սխալ դերանուններ)։ !! «Le» + «la» se convierte en «se la».|«Le»+«la» դառնում է «se la»։
> Con paciencia y un premio cada vez. Los loros viven más de cuarenta años, ¿lo sabías?|Համբերությամբ և ամեն անգամ մի խրախուսանքով։ Թութակներն ապրում են քառասուն տարուց ավելի, գիտեի՞ր։
+ No lo sabía. Es una gran responsabilidad.|Չգիտեի։ Մեծ պատասխանատվություն է։
+ Sí, por eso hay que pensarlo bien.|Այո, դրա համար պետք է լավ մտածել։
- No lo sabía. Es un gran responsabilidad.|Չգիտեի (սխալ սեռ)։ !! «Responsabilidad» es femenino: una gran responsabilidad.|«Responsabilidad»-ը իգական է՝ una։
= 3 Kiwi dice: «¡Vuelve pronto, Gayane!»|Կիվին ասում է․ «Շուտ վերադարձի՛ր, Գայանե՛»։
## d7;carmen;A2;¿Necesitas bolsa?|Տոպրակ պե՞տք է
> Hola, guapa. ¿Has encontrado todo lo que buscabas?|Բարև, սիրունիկ։ Գտա՞ր այն ամենը, ինչ փնտրում էիր։
+ Sí, gracias. Lo he encontrado todo.|Այո, շնորհակալություն։ Ամեն ինչ գտա։
+ Casi todo. No he visto la arena para gatos.|Գրեթե ամեն ինչ։ Կատվի ավազ չտեսա։ => arena
- Sí, gracias. He encontrado lo todo.|Այո (սխալ շարադասություն)։ !! El pronombre va antes del verbo: lo he encontrado todo.|Դերանունը բայից առաջ է՝ lo he encontrado todo։
=> bolsa
:arena
> Está en higiene, en el estante de abajo. Te espero, no hay prisa.|Հիգիենայի բաժնում է, ներքևի դարակում։ Կսպասեմ, շտապելու բան չկա։
:bolsa
> ¿Necesitas una bolsa? Cuesta diez céntimos.|Տոպրակ պե՞տք է։ Արժե տասը ցենտ։
+ No, gracias, he traído la mía.|Ոչ, շնորհակալություն, իմն եմ բերել։
+ Sí, una bolsa de papel, por favor.|Այո, մեկ թղթե տոպրակ, խնդրում եմ։
- No, gracias, he traído la mi.|Ոչ, շնորհակալություն (սխալ դերանուն)։ !! Sin sustantivo usamos «la mía».|Առանց գոյականի՝ «la mía»։
> ¿Vas a pagar con tarjeta o en efectivo?|Քարտո՞վ, թե՞ կանխիկ ես վճարելու։
+ Con tarjeta, por favor.|Քարտով, խնդրում եմ։
+ En efectivo. Aquí tiene.|Կանխիկ։ Խնդրեմ։
- En tarjeta y con efectivo.|Սխալ նախդիրներ։ !! Se dice «con tarjeta» y «en efectivo».|Ասում ենք «con tarjeta» և «en efectivo»։
= 3 Aquí tienes tu recibo. ¡Que tengas un buen día!|Ահա կտրոնդ։ Բարի օր եմ մաղթում։
## d8;lucia;A2;Una oferta especial|Հատուկ առաջարկ
> Hoy tenemos una oferta: dos juguetes por el precio de uno. ¿Te interesa?|Այսօր առաջարկ ունենք՝ երկու խաղալիք մեկի գնով։ Հետաքրքրո՞ւմ է։
+ Sí, me interesa mucho.|Այո, շատ է հետաքրքրում։
+ Depende. ¿Qué juguetes entran en la oferta?|Կախված է։ Ո՞ր խաղալիքներն են մտնում առաջարկի մեջ։
- Sí, me intereso mucho.|Այո (սխալ կառուցվածք)։ !! «Interesar» funciona como «gustar»: me interesa.|«Interesar»-ը գործածվում է «gustar»-ի նման՝ me interesa։
> Son los del estante rojo. ¿Cuáles prefieres: los blandos o los duros?|Կարմիր դարակի խաղալիքներն են։ Որո՞նք ես նախընտրում՝ փափո՞ւկ, թե՞ կոշտ։
+ Prefiero los duros, porque mi perro lo rompe todo.|Կոշտերը, քանի որ շունս ամեն ինչ ջարդում է։
+ Los blandos, para una gata mayor.|Փափուկները՝ տարեց կատվի համար։
- Prefiero los duro.|Կոշտը (սխալ թիվ)։ !! Artículo y adjetivo en plural: los duros.|Հոդն ու ածականը հոգնակի՝ los duros։
> Buena elección. El más barato es gratis. Uno cuesta siete euros y el otro, cinco. ¿Cuánto pagas?|Լավ ընտրություն։ Ամենաէժանն անվճար է։ Մեկն արժե յոթ եվրո, մյուսը՝ հինգ։ Որքա՞ն ես վճարում։
+ Pago siete euros.|Վճարում եմ յոթ եվրո։
- Pago doce euros.|Վճարում եմ տասներկու եվրո։ !! El más barato (cinco euros) es gratis: solo pagas siete.|Ամենաէժանը (հինգ եվրո) անվճար է, վճարում ես միայն յոթ։
- Pago cinco euros.|Վճարում եմ հինգ եվրո։ !! Pagas el más caro, que cuesta siete.|Վճարում ես ավելի թանկի համար՝ յոթ եվրո։
= 3 ¡Exacto! Se te dan bien las cuentas.|Ճիշտ է։ Հաշիվը լավ է ստացվում քեզ մոտ։
## d9;marcos;A2;El collar adecuado|Համապատասխան վզնոցը
> ¿Para qué perro es el collar?|Ո՞ր շան համար է վզնոցը։
+ Es para un perro mediano de pelo corto.|Միջին չափի, կարճ մազով շան համար։
+ Es para una cachorra de cuatro meses.|Չորսամսական լակոտի համար։
- Es para un perro mediano de pelo corta.|Սխալ սեռ։ !! «Pelo» es masculino: pelo corto.|«Pelo»-ն արական է՝ pelo corto։
> ¿De qué color lo quieres?|Ի՞նչ գույնի ես ուզում։
+ Lo quiero azul, como mi mochila.|Կապույտ եմ ուզում, ինչպես պայուսակս։
+ Me da igual. El más resistente.|Միևնույն է։ Ամենաամուրը։
- La quiero azul.|Ուզում եմ կապույտ (սխալ սեռ)։ !! «El collar» es masculino: lo quiero azul.|«El collar»-ը արական է՝ lo quiero։
> Recuerda: entre el collar y el cuello deben caber dos dedos. ¿Por qué crees?|Հիշի՛ր՝ վզնոցի և վզի միջև պետք է երկու մատ տեղավորվի։ Ինչո՞ւ, քո կարծիքով։
+ Para que el perro respire bien.|Որպեսզի շունը լավ շնչի։
+ Porque si está muy apretado, le hace daño.|Որովհետև եթե շատ սեղմ է, ցավեցնում է։
- Para que el perro respira bien.|Որպեսզի (սխալ եղանակ)։ !! «Para que» + subjuntivo: para que respire.|«Para que» + subjuntivo՝ respire։
= 3 ¡Exacto! Tu perro irá cómodo y seguro.|Ճիշտ է։ Շունդ հարմար և ապահով կլինի։
## d10;ines;A2;Un conejo en casa|Ճագար տանը
> ¿Quieres saber cómo vive un conejo en casa?|Ուզո՞ւմ ես իմանալ՝ ինչպես է ճագարն ապրում տանը։
+ Sí, ¿qué comen los conejos?|Այո, ի՞նչ են ուտում ճագարները։
+ Sí, ¿necesitan una jaula grande?|Այո, մեծ վանդա՞կ է պետք նրանց։ => jaula
- Sí, ¿qué come los conejos?|Սխալ թիվ։ !! Sujeto plural: los conejos comen.|Ենթական հոգնակի է՝ comen։
> Sobre todo heno, y un poco de verdura. ¿Crees que comen muchas zanahorias?|Հիմնականում խոտ և մի քիչ բանջարեղեն։ Ի՞նչ ես կարծում, շատ գազա՞ր են ուտում։
+ Pienso que no, porque tienen mucho azúcar.|Կարծում եմ՝ ոչ, քանի որ շատ շաքար ունի։ => fin
+ ¡Creía que sí, como en los dibujos!|Կարծում էի՝ այո, ինչպես մուլտֆիլմերում։ => fin
- Creo que comen mucho zanahorias.|Սխալ համաձայնություն։ !! «Mucho» concuerda: muchas zanahorias.|«Mucho»-ն համաձայնում է՝ muchas։
:jaula
> Necesitan mucho espacio y salir a correr cada día. ¿Tienes sitio?|Նրանց շատ տարածք և ամեն օր վազել է պետք։ Տեղ ունե՞ս։
+ Sí, puede correr por mi habitación.|Այո, կարող է վազել իմ սենյակում։
+ No mucho, pero puedo organizarme.|Այնքան էլ չէ, բայց կարող եմ կազմակերպել։
- Sí, puede corre por mi habitación.|Սխալ ձև։ !! «Puede» + infinitivo: puede correr.|«Puede» + անորոշ դերբայ։
:fin
= 3 Algodón te ha escuchado y ha movido las orejas. ¡Le gustas!|Ալգոդոնը լսեց քեզ և շարժեց ականջները։ Դու նրան դուր ես գալիս։
## d11;elena;B1;¿Por qué araña el sofá?|Ինչո՞ւ է ճանկռում բազմոցը
> Cuéntame, ¿qué problema tienes con tu gato?|Պատմի՛ր, ի՞նչ խնդիր ունես կատվիդ հետ։
+ Desde que nos mudamos, araña el sofá.|Տեղափոխվելուց ի վեր ճանկռում է բազմոցը։
+ Últimamente no deja de arañar los muebles.|Վերջերս անընդհատ ճանկռում է կահույքը։
- Desde que nos mudamos, arañaba el sofá ahora.|Սխալ ժամանակ։ !! La acción continúa hoy: usa el presente, «araña».|Գործողությունը շարունակվում է՝ ներկա ժամանակ «araña»։
> Es normal. ¿Qué haces cuando lo ves?|Նորմալ է։ Ի՞նչ ես անում, երբ տեսնում ես։
+ Le digo que no con voz tranquila.|Հանգիստ ձայնով ասում եմ՝ ոչ։
+ A veces lo regaño, pero no sirve de nada.|Երբեմն նախատում եմ, բայց օգուտ չկա։ => reg
- Lo digo que no.|Սխալ դերանուն։ !! «Decir algo a alguien»: le digo.|«Decir a alguien»՝ le digo։
=> sol
:reg
> Regañarlo solo le da miedo. Es mejor ofrecerle una alternativa.|Նախատելը միայն վախեցնում է։ Ավելի լավ է այլընտրանք առաջարկել։
:sol
> Te recomiendo que pongas un rascador junto al sofá. ¿Qué te parece?|Խորհուրդ եմ տալիս բազմոցի մոտ ճանկոց դնել։ Ի՞նչ կասես։
+ Me parece buena idea. ¿Y si no lo usa?|Լավ միտք է։ Իսկ եթե չօգտագործի՞։
+ Perfecto, hoy mismo me llevo uno.|Հիանալի, հենց այսօր կտանեմ մեկը։ => fin
- Me parezco buena idea.|Սխալ ձև։ !! «Parecer» como «gustar»: me parece.|«Parecer»-ը «gustar»-ի պես՝ me parece։
> Entonces ponle un poco de hierba gatera para que se acerque. ¿Lo intentarás?|Այդ դեպքում մի քիչ կատվախոտ դիր, որ մոտենա։ Կփորձե՞ս։
+ Sí, lo intentaré y te contaré cómo va.|Այո, կփորձեմ և կպատմեմ։
+ Claro, espero que funcione.|Իհարկե, հուսով եմ կաշխատի։
- Claro, espero que funciona.|Սխալ եղանակ։ !! «Espero que» + subjuntivo: funcione.|«Espero que» + subjuntivo՝ funcione։
:fin
= 3 Con paciencia, tu sofá estará a salvo.|Համբերությամբ բազմոցդ փրկված կլինի։
## d12;lucia;B1;Quiero devolver un producto|Ուզում եմ ապրանք վերադարձնել
> Buenos días. ¿Hay algún problema con tu compra?|Բարի լույս։ Գնման հետ խնդի՞ր կա։
+ Sí, compré este collar ayer y está roto.|Այո, երեկ գնեցի այս վզնոցը, և այն փչացած է։
+ Sí, me equivoqué de talla.|Այո, չափսը սխալ եմ վերցրել։ => talla
- Sí, he comprado este collar ayer y es roto.|Սխալ ժամանակ և բայ։ !! Con «ayer»: compré. Resultado de un daño: está roto.|«Ayer»-ի հետ՝ compré, վնասի արդյունքը՝ está roto։
> Lo siento mucho. ¿Guardaste el recibo?|Շատ եմ ցավում։ Պահե՞լ ես կտրոնը։
=> rec
:talla
> No pasa nada, suele ocurrir. ¿Guardaste el recibo?|Ոչինչ, պատահում է։ Պահե՞լ ես կտրոնը։
:rec
* Lucía espera tu respuesta con una sonrisa.|Լուսիան ժպիտով սպասում է պատասխանիդ։
+ Sí, lo tengo aquí.|Այո, այստեղ է։
+ Me temo que lo he perdido.|Վախենամ՝ կորցրել եմ։ => sin
- Sí, la tengo aquí.|Սխալ սեռ։ !! «El recibo» es masculino: lo tengo.|«El recibo»-ն արական է՝ lo tengo։
> Perfecto. ¿Prefieres que te lo cambie o que te devuelva el dinero?|Հիանալի։ Ուզո՞ւմ ես փոխեմ, թե՞ գումարը վերադարձնեմ։
+ Prefiero que me lo cambie.|Նախընտրում եմ, որ փոխեք։
+ Preferiría recuperar el dinero.|Կնախընտրեի գումարը ետ ստանալ։
- Prefiero que me lo cambia.|Սխալ եղանակ։ !! «Prefiero que» + subjuntivo: cambie.|«Prefiero que» + subjuntivo։
= 3 Hecho. Gracias por explicarlo con tanta claridad.|Պատրաստ է։ Շնորհակալություն այդքան հստակ բացատրելու համար։
:sin
> Sin recibo no puedo devolverte el dinero, pero sí cambiarlo. ¿Estás de acuerdo?|Առանց կտրոնի գումարը չեմ կարող վերադարձնել, բայց կարող եմ փոխել։ Համաձա՞յն ես։
+ De acuerdo. Es una solución justa.|Համաձայն եմ։ Արդար լուծում է։
+ Está bien. La próxima vez lo guardaré.|Լավ։ Հաջորդ անգամ կպահեմ։
- Soy de acuerdo.|Սխալ բայ։ !! Se dice «estar de acuerdo».|Ասում ենք «estar de acuerdo»։
= 3 ¡Gracias por tu comprensión!|Շնորհակալ եմ ըմբռնումի համար։
## d13;diego;B1;El pez no se mueve|Ձուկը չի շարժվում
> Pareces preocupada. ¿Qué le pasa a tu pez?|Մտահոգ ես թվում։ Ի՞նչ է պատահել ձկանդ։
+ Está en el fondo y casi no se mueve.|Հատակին է և գրեթե չի շարժվում։
+ Ha dejado de comer.|Դադարել է ուտել։
- Es en el fondo y casi no mueve.|Սխալ բայեր։ !! Posición: está. Verbo reflexivo: se mueve.|Դիրքը՝ está, անդրադարձ բայ՝ se mueve։
> ¿Cuándo cambiaste el agua por última vez?|Վերջին անգամ ե՞րբ ես փոխել ջուրը։
+ La cambié hace tres semanas.|Երեք շաբաթ առաջ եմ փոխել։
+ Ayer la cambié toda de golpe.|Երեկ միանգամից ամբողջը փոխեցի։ => golpe
- La cambié desde tres semanas.|Սխալ կառուցվածք։ !! Para el pasado: hace + tiempo.|Անցյալի համար՝ hace + ժամանակ։
> Es mucho tiempo. Lo ideal es cambiar una parte cada semana.|Շատ երկար է։ Իդեալականը ամեն շաբաթ մի մասը փոխելն է։
=> temp
:golpe
> ¡Ay! Cambiarla toda es un choque para el pez. Solo hay que cambiar una cuarta parte.|Վա՜յ։ Ամբողջը փոխելը ցնցում է ձկան համար։ Միայն քառորդը պետք է փոխել։
:temp
> ¿Has medido la temperatura?|Չափե՞լ ես ջերմաստիճանը։
+ Todavía no, porque no tengo termómetro.|Դեռ ոչ, քանի որ ջերմաչափ չունեմ։
+ Sí, está a dieciocho grados.|Այո, տասնութ աստիճան է։
- Todavía no, no he medida.|Սխալ ձև։ !! El participio con «haber» no cambia: medido (la he medido).|«Haber»-ի հետ դերբայը չի փոխվում՝ medido։
= 3 Necesita agua tropical, a unos veinticinco grados. Si sigue igual, llama al veterinario.|Նրան մոտ քսանհինգ աստիճան ջուր է պետք։ Եթե չփոխվի, զանգի՛ր անասնաբույժին։
## d14;marcos;B1;Adoptar o comprar|Որդեգրել, թե գնել
> Mañana viene el refugio con seis perros. ¿Has pensado alguna vez en adoptar?|Վաղը ապաստարանը վեց շուն կբերի։ Երբևէ մտածե՞լ ես որդեգրելու մասին։
+ Sí, me gustaría darle un hogar a un perro adulto.|Այո, կուզենայի տուն տալ չափահաս շան։
+ Sí, aunque mis padres no están seguros.|Այո, թեև ծնողներս վստահ չեն։ => padres
- Sí, me gustaría que doy un hogar.|Սխալ կառուցվածք։ !! Mismo sujeto: me gustaría dar.|Նույն ենթակա՝ me gustaría dar։
> ¡Qué bonito! Muchos solo quieren cachorros. ¿Por qué un adulto?|Ի՜նչ գեղեցիկ է։ Շատերը միայն լակոտ են ուզում։ Ինչո՞ւ չափահաս։
+ Porque suele ser más tranquilo.|Որովհետև սովորաբար ավելի հանգիստ է։ => fin
+ Porque es más difícil que lo adopten.|Որովհետև ավելի դժվար է, որ նրան որդեգրեն։ => fin
- Porque es más difícil que lo adoptan.|Սխալ եղանակ։ !! «Es difícil que» + subjuntivo: adopten.|«Es difícil que» + subjuntivo։
:padres
> ¿Y qué les preocupa a tus padres?|Իսկ ի՞նչն է անհանգստացնում ծնողներիդ։
+ Les preocupa que no tenga tiempo.|Անհանգստանում են, որ ժամանակ չեմ ունենա։
+ Creen que es un gasto importante.|Կարծում են՝ մեծ ծախս է։
- Les preocupan que no tengo tiempo.|Սխալ ձևեր։ !! «Les preocupa que» + subjuntivo: tenga.|«Les preocupa que» + subjuntivo՝ tenga։
:fin
> Si un día adoptas, ¿cuál sería tu primera tarea?|Եթե մի օր որդեգրես, ո՞րը կլիներ առաջին գործդ։
+ Lo llevaría al veterinario para una revisión.|Կտանեի անասնաբույժի՝ զննման։
+ Le prepararía un rincón tranquilo.|Հանգիստ անկյուն կպատրաստեի նրա համար։
- Lo llevaré al veterinario si adoptaría.|Սխալ համադրություն։ !! Nunca condicional después de «si».|«Si»-ից հետո երբեք condicional չի դրվում։
= 3 Eres el tipo de persona que el refugio necesita.|Դու հենց այն մարդն ես, որ պետք է ապաստարանին։
## d15;ines;B1;El hámster ha escapado|Գերմանամուկը փախել է
> ¡Gayane, ayúdame! ¡Pepito se ha escapado!|Գայանե՛, օգնի՛ր, Պեպիտոն փախել է։
+ ¡Tranquila! ¿Dónde lo viste por última vez?|Հանգստացի՛ր։ Վերջին անգամ որտե՞ղ տեսար։
+ ¿Cuándo te diste cuenta?|Ե՞րբ նկատեցիր։
- ¿Dónde lo has visto la última vez ayer?|Սխալ ժամանակ։ !! Momento concreto del pasado: lo viste.|Անցյալի կոնկրետ պահ՝ lo viste։
> Estaba limpiando la jaula cuando sonó el teléfono. ¿Qué hacemos?|Վանդակն էի մաքրում, երբ հեռախոսը զանգեց։ Ի՞նչ անենք։
+ Primero, cerremos todas las puertas.|Նախ փակենք բոլոր դռները։
+ Pongamos semillas en el suelo y esperemos.|Հատակին սերմեր դնենք և սպասենք։ => sem
- Cerramos todas las puertas primero, cierre tú.|Անհստակ հրաման։ !! Para proponer juntas: «cerremos» o «vamos a cerrar».|Միասին առաջարկելու համար՝ «cerremos»։
> Buena idea. ¡Oigo un ruido debajo del estante!|Լավ միտք է։ Դարակի տակից ձայն եմ լսում։
=> fin
:sem
> ¡Funciona! Veo una naricita debajo del estante.|Ստացվեց։ Դարակի տակ փոքրիկ քիթ եմ տեսնում։
:fin
> ¿Cómo lo cogemos sin asustarlo?|Ինչպե՞ս բռնենք առանց վախեցնելու։
+ Con las dos manos, muy despacio.|Երկու ձեռքով, շատ դանդաղ։
+ Que entre solo en un túnel de cartón.|Թող ինքը մտնի ստվարաթղթե թունելի մեջ։
- Corriendo y gritando para que sale.|Վազելով ու գոռալով։ !! Asustarlo es peligroso; además, «para que salga».|Վախեցնելը վտանգավոր է, և պետք է՝ «para que salga»։
= 3 ¡Pepito está a salvo gracias a ti!|Պեպիտոն փրկված է քո շնորհիվ։
## d16;carmen;B1;El cambio equivocado|Սխալ մանրը
> Son doce euros con cincuenta. Me has dado veinte. Aquí tienes: cinco con cincuenta.|Տասներկու եվրո հիսուն ցենտ է։ Քսան տվեցիր։ Խնդրեմ՝ հինգ եվրո հիսուն։
+ Perdone, creo que faltan dos euros.|Ներեցեք, կարծում եմ երկու եվրո պակաս է։
+ Disculpe, ¿podría revisar el cambio?|Ներողություն, կարո՞ղ եք մանրը ստուգել։
- Perdone, creo que falta dos euros.|Սխալ թիվ։ !! «Faltar» concuerda con «dos euros»: faltan.|«Faltar»-ը համաձայնում է «dos euros»-ի հետ՝ faltan։
> ¡Ay, tienes razón! ¿Cuánto debería haberte dado?|Վա՜յ, ճիշտ ես։ Որքա՞ն պետք է տայի։
+ Siete euros con cincuenta.|Յոթ եվրո հիսուն ցենտ։
- Seis euros con cincuenta.|Վեց եվրո հիսուն ցենտ։ !! 20 − 12,50 = 7,50.|20 − 12,50 = 7,50։
- Ocho euros.|Ութ եվրո։ !! 20 − 12,50 = 7,50.|20 − 12,50 = 7,50։
> Perdóname, hoy estoy un poco despistada.|Ներիր, այսօր մի քիչ ցրված եմ։
+ No se preocupe, le puede pasar a cualquiera.|Մի անհանգստացեք, ցանկացածի հետ կարող է պատահել։
+ Tranquila, no tiene importancia.|Հանգիստ եղեք, կարևոր չէ։
- No te preocupas.|Սխալ ձև։ !! Imperativo negativo: no te preocupes.|Ժխտական հրամայական՝ no te preocupes։
= 3 Eres honesta y educada. ¡Gracias, cielo!|Ազնիվ և քաղաքավարի ես։ Շնորհակալություն, հոգի՛ս։
## d17;lucia;B1;Comparar dos piensos|Համեմատել երկու կեր
> Estás comparando dos bolsas. ¿Te ayudo?|Երկու տոպրակ ես համեմատում։ Օգնե՞մ։
+ Sí, ¿cuál es mejor para un perro delicado?|Այո, ո՞րն է ավելի լավ զգայուն շան համար։
+ Sí, ¿por qué este es más caro que el otro?|Այո, ինչո՞ւ է սա մյուսից թանկ։ => caro
- Sí, ¿cuál es más bueno de todos que?|Սխալ համեմատություն։ !! El comparativo de «bueno» es «mejor».|«Bueno»-ի համեմատականը «mejor» է։
> El de salmón, porque no lleva cereales.|Սաղմոնովը, քանի որ հացահատիկ չունի։
=> sig
:caro
> Porque tiene más proteína y menos cereales que el otro.|Որովհետև մյուսից ավելի շատ սպիտակուց և քիչ հացահատիկ ունի։
:sig
> Si el perro está sano, el más barato también es bueno. ¿Cuál te llevas?|Եթե շունն առողջ է, ավելի էժանն էլ է լավ։ Ո՞րն ես վերցնում։
+ Me llevo el más barato; mi perro está sanísimo.|Էժանը կվերցնեմ, շունս շատ առողջ է։
+ Me llevo el de salmón, aunque sea más caro.|Սաղմոնովը կվերցնեմ, թեկուզ թանկ լինի։
- Me llevo el más barato que de todos.|Սխալ գերադրական։ !! Superlativo: el más barato (de todos).|Գերադրական՝ el más barato (de todos)։
> Cámbialo poco a poco durante una semana. ¿Sabes por qué?|Փոխի՛ր աստիճանաբար մեկ շաբաթում։ Գիտե՞ս ինչու։
+ Para que no le duela el estómago.|Որպեսզի ստամոքսը չցավի։
+ Para que se acostumbre al sabor.|Որպեսզի վարժվի համին։
- Para que no le duele el estómago.|Սխալ եղանակ։ !! «Para que» + subjuntivo: duela.|«Para que» + subjuntivo՝ duela։
= 3 ¡Compras como una experta!|Փորձագետի պես ես գնումներ անում։
## d18;elena;B1;Un baño difícil|Դժվար լոգանք
> ¿Es verdad que tu perro odia el baño?|Ճի՞շտ է, որ շունդ ատում է լոգանքը։
+ Sí, cuando era cachorro se cayó en la bañera.|Այո, երբ լակոտ էր, ընկավ լոգարանի մեջ։
+ Sí, en cuanto oye el agua, se esconde.|Այո, հենց լսում է ջրի ձայնը, թաքնվում է։
- Sí, cuando fue cachorro se caía una vez.|Սխալ ժամանակներ։ !! Descripción: era. Hecho puntual: se cayó.|Նկարագրություն՝ era, միանգամյա՝ se cayó։
> ¿Qué agua usas?|Ինչպիսի՞ ջուր ես օգտագործում։
+ Agua templada, ni fría ni caliente.|Գոլ ջուր՝ ոչ սառը, ոչ տաք։
+ Fría, creo. ¿Está mal?|Սառը, կարծես։ Սխա՞լ է։ => fria
- Agua templado.|Սխալ սեռ։ !! «Agua» es femenino: agua templada.|«Agua»-ն իգական է՝ templada։
> Muy bien. Pon también una toalla en el suelo para que no resbale.|Շատ լավ։ Հատակին սրբիչ էլ դիր, որ չսայթաքի։
=> fin
:fria
> Mejor templada: el agua fría le asusta más.|Ավելի լավ է գոլ․ սառը ջուրն ավելի է վախեցնում։
:fin
> ¿Qué harás la próxima vez?|Ի՞նչ կանես հաջորդ անգամ։
+ Le daré un premio después del baño.|Լոգանքից հետո խրախուսանք կտամ։
+ Le hablaré con voz suave mientras lo lavo.|Մեղմ ձայնով կխոսեմ, մինչ լվանում եմ։
- Le doy un premio mañana pasado.|Սխալ ժամանակ։ !! Plan futuro: le daré un premio.|Ապագա պլան՝ le daré։
= 3 Verás cómo mejora. ¡Suerte!|Կտեսնես, կլավանա։ Հաջողությո՛ւն։
## d19;diego;B1;¿Cuántos peces caben?|Քանի՞ ձուկ է տեղավորվում
> ¿Cuántos peces quieres poner en veinte litros?|Քանի՞ ձուկ ես ուզում դնել քսան լիտրում։
+ Solo un betta, porque he leído que es territorial.|Միայն մեկ բետտա, քանի որ կարդացել եմ՝ տարածքային է։
+ Diez, si es posible.|Տասը, եթե հնարավոր է։ => diez
- Solo un betta, por qué es territorial.|Սխալ գրություն։ !! Para dar la causa: «porque», junto.|Պատճառի համար՝ «porque», միասին։
> Muy bien informada. Él será el rey.|Լավ տեղեկացված ես։ Նա թագավոր կլինի։
=> fin
:diez
> Son demasiados: sufrirían. Es mejor tener pocos y sanos.|Չափազանց շատ է, կտառապեն։ Ավելի լավ է քիչ, բայց առողջ։
:fin
> ¿Qué decoración te gustaría?|Ի՞նչ զարդարանք կուզենայիր։
+ Me gustaría que pareciera el fondo del mar.|Կուզենայի ծովի հատակի նմանվեր։
+ Plantas naturales y un poco de grava.|Բնական բույսեր և մի քիչ խիճ։
- Me gustaría que parece el mar.|Սխալ եղանակ։ !! «Me gustaría que» + imperfecto de subjuntivo: pareciera.|«Me gustaría que» + imperfecto de subjuntivo։
> ¿Y quién le dará de comer en vacaciones?|Իսկ արձակուրդին ո՞վ կկերակրի։
+ Se lo pediré a mi vecina.|Կխնդրեմ հարևանուհուս։
+ Compraré un alimentador automático.|Ավտոմատ կերակրիչ կգնեմ։
- Le lo pediré a mi vecina.|Սխալ դերանուններ։ !! «Le lo» → «se lo».|«Le lo» → «se lo»։
= 3 Piensas en todo. ¡Zafiro estaría encantado!|Ամեն ինչի մասին մտածում ես։ Սաֆիրոն հիացած կլիներ։
## d20;ines;B1;El canario ya no canta|Դեղձանիկն այլևս չի երգում
> Una clienta dice que su canario ha dejado de cantar. ¿Qué le preguntarías?|Հաճախորդուհին ասում է՝ դեղձանիկը դադարել է երգել։ Ի՞նչ կհարցնեիր։
+ Le preguntaría si ha cambiado la jaula de sitio.|Կհարցնեի՝ արդյոք վանդակի տեղը փոխե՞լ է։
+ Le preguntaría cuántas horas de luz recibe.|Կհարցնեի՝ քանի ժամ լույս է ստանում։ => luz
- Le preguntaría que si ha cambiado jaula el sitio.|Սխալ կառուցվածք։ !! Pregunta indirecta: preguntar si + verbo.|Անուղղակի հարց՝ preguntar si։
> Sí, la puso al lado de la cocina.|Այո, խոհանոցի կողքին է դրել։
=> sig
:luz
> Muy poca: está en un pasillo oscuro.|Շատ քիչ․ մութ միջանցքում է։
:sig
> ¿Qué le aconsejas?|Ի՞նչ խորհուրդ կտաս։
+ Que la ponga en un lugar luminoso y tranquilo.|Որ դնի լուսավոր ու հանգիստ տեղում։
+ Que, si no mejora, lo lleve al veterinario.|Որ, եթե չլավանա, տանի անասնաբույժի։
- Que la pone cerca de la ventana abierta en invierno.|Որ ձմռանը բաց պատուհանի մոտ դնի։ !! Las corrientes de aire son malas; además: «que la ponga».|Միջանցիկ քամին վնասակար է, և պետք է՝ «que la ponga»։
= 3 Excelente consejo. Sol está cantando para ti.|Հիանալի խորհուրդ։ Սոլը քեզ համար է երգում։
## d21;marcos;B1;Primer día de escuela canina|Շների դպրոցի առաջին օրը
> Nube debe aprender tres órdenes. ¿Por cuál empezamos?|Նուբեն պետք է երեք հրաման սովորի։ Որի՞ց սկսենք։
+ Empecemos por «siéntate».|Սկսենք «նստիր»-ից։
+ Yo empezaría por «ven aquí».|Ես կսկսեի «եկ այստեղ»-ից։
- Empezamos por «te sienta».|Սխալ հրամայական։ !! Imperativo afirmativo: siéntate.|Հաստատական հրամայական՝ siéntate։
> ¡Lo ha hecho! ¿Qué le dices?|Արեց։ Ի՞նչ ես ասում նրան։
+ ¡Muy bien, Nube! ¡Buena chica!|Շատ լավ, Նո՛ւբե։ Ապրե՛ս։
+ ¡Toma, te lo has ganado!|Վերցրո՛ւ, վաստակեցիր։
- ¡No hagas eso!|Մի՛ արա դա։ !! Si lo hace bien, hay que felicitarla.|Եթե լավ է անում, պետք է գովել։
> Ahora quiere saltar sobre ti. Dile que no lo haga.|Հիմա ուզում է թռնել քեզ վրա։ Ասա, որ չանի։
+ ¡No saltes, Nube!|Մի՛ թռիր, Նո՛ւբե։
+ ¡Quieta! No te subas.|Հանգիստ։ Մի՛ բարձրանա։
- ¡No salta, Nube!|Սխալ ձև։ !! Imperativo negativo: no saltes.|Ժխտական հրամայական՝ no saltes։
= 3 ¡Podrías ser entrenadora!|Կարող էիր մարզիչ լինել։
## d22;lucia;B1;Una entrevista de trabajo|Աշխատանքի հարցազրույց
> Busco una ayudante para el verano. ¿Por qué te interesa el puesto?|Ամռան համար օգնական եմ փնտրում։ Ինչո՞ւ է քեզ հետաքրքրում այս աշխատանքը։
+ Porque me interesan los animales y quiero aprender.|Որովհետև կենդանիներն ինձ հետաքրքրում են, և ուզում եմ սովորել։
+ Porque se me da bien atender a la gente.|Որովհետև լավ եմ շփվում մարդկանց հետ։
- Porque me interesa los animales.|Սխալ թիվ։ !! Me interesan los animales (plural).|Հոգնակի՝ me interesan։
> ¿Tienes experiencia?|Փորձ ունե՞ս։
+ He cuidado a los perros de mis vecinos.|Խնամել եմ հարևաններիս շներին։
+ Todavía no, pero aprendo rápido.|Դեռ ոչ, բայց արագ եմ սովորում։
- He cuidada los perros.|Սխալ ձև։ !! Participio invariable: he cuidado a los perros.|Անփոփոխ դերբայ՝ he cuidado a։
> ¿Qué harías si un cliente te hablara mal?|Ի՞նչ կանեիր, եթե հաճախորդը կոպիտ խոսեր։
+ Mantendría la calma y lo escucharía.|Հանգիստ կմնայի և կլսեի նրան։
+ Le pediría ayuda a mi compañera.|Օգնություն կխնդրեի գործընկերուհուցս։
- Le gritaría también.|Ես էլ կգոռայի։ !! Gramática correcta, pero no es una actitud profesional.|Քերականորեն ճիշտ է, բայց պրոֆեսիոնալ վերաբերմունք չէ։
= 3 ¡El puesto es tuyo! Empiezas el lunes.|Աշխատանքը քոնն է։ Երկուշաբթի կսկսես։
## d23;carmen;B2;La tarjeta no funciona|Քարտը չի աշխատում
> Lo siento, la máquina rechaza tu tarjeta.|Ցավում եմ, սարքը մերժում է քարտդ։
+ Qué raro, la usé esta mañana sin problemas.|Տարօրինակ է, այսօր առավոտյան առանց խնդրի օգտագործեցի։
+ ¿Le importaría intentarlo otra vez?|Դեմ չէի՞ք լինի նորից փորձել։ => otra
- ¿Le importaría que lo intenta?|Սխալ եղանակ։ !! ¿Le importaría intentarlo? (infinitivo).|¿Le importaría intentarlo?՝ անորոշ դերբայով։
> Quizás haya un problema con la conexión. ¿Qué prefieres hacer?|Գուցե կապի խնդիր կա։ Ի՞նչ կնախընտրես։
=> dec
:otra
> Nada, sigue igual. Puede que sea la conexión. ¿Qué hacemos?|Ոչ, նույնն է։ Հնարավոր է՝ կապն է։ Ի՞նչ անենք։
:dec
* Detrás de ti hay tres personas esperando.|Քո հետևում երեք մարդ է սպասում։
+ ¿Podría guardarme la compra mientras saco dinero?|Կարո՞ղ եք գնումներս պահել, մինչ գումար կհանեմ։
+ Pagaré una parte en efectivo y dejaré el resto.|Մի մասը կանխիկ կվճարեմ, մնացածը կթողնեմ։
- ¿Podría que me guarde la compra?|Սխալ կառուցվածք։ !! ¿Podría guardarme…? + infinitivo.|¿Podría + անորոշ դերբայ։
> Claro que sí. Tómate el tiempo que necesites.|Իհարկե։ Ինչքան պետք է ժամանակ տրամադրիր։
+ Muchas gracias por su paciencia.|Շատ շնորհակալ եմ համբերության համար։
+ Es usted muy amable. Vuelvo enseguida.|Շատ բարի եք։ Հիմա կվերադառնամ։
- Gracias para su paciencia.|Սխալ նախդիր։ !! Agradecemos con «por»: gracias por.|Շնորհակալություն հայտնում ենք «por»-ով։
= 3 Has resuelto un momento incómodo con mucha elegancia.|Անհարմար իրավիճակը շատ նրբագեղ լուծեցիր։
## d24;lucia;B2;Debate: ¿animales como regalo?|Բանավեճ․ կենդանին որպես նվե՞ր
> Mucha gente quiere regalar cachorros por Navidad. ¿Qué opinas tú?|Շատերն ուզում են Սուրբ Ծննդին լակոտ նվիրել։ Ի՞նչ ես կարծում։
+ No creo que sea buena idea si la familia no lo ha decidido.|Չեմ կարծում, որ լավ միտք է, եթե ընտանիքը չի որոշել։
+ Me parece bien siempre que todos estén de acuerdo.|Լավ է, եթե բոլորը համաձայն են։ => cond
- No creo que es buena idea.|Սխալ եղանակ։ !! «No creo que» + subjuntivo: sea.|«No creo que» + subjuntivo՝ sea։
> Estoy de acuerdo: un animal no es un objeto. ¿Qué alternativa propondrías?|Համաձայն եմ․ կենդանին իր չէ։ Ի՞նչ այլընտրանք կառաջարկեիր։
=> alt
:cond
> Es una condición razonable. Y si no lo están, ¿qué alternativa propondrías?|Խելամիտ պայման է։ Իսկ եթե համաձայն չեն, ի՞նչ կառաջարկեիր։
:alt
* Un par de clientes se acercan a escuchar el debate.|Մի քանի հաճախորդ մոտենում են լսելու։
+ Regalaría una visita al refugio para que conocieran a los animales.|Ապաստարան այցելություն կնվիրեի, որ ծանոթանային կենդանիներին։
+ Propondría que apadrinaran a un animal.|Կառաջարկեի հովանավորել մի կենդանու։
- Propondría que apadrinan un animal.|Սխալ եղանակ։ !! Condicional + que + imperfecto de subjuntivo: apadrinaran.|Condicional + imperfecto de subjuntivo։
> Última pregunta: ¿cómo convencerías a un niño que llora por un cachorro?|Վերջին հարցը՝ ինչպե՞ս կհամոզեիր երեխային, որ լակոտ է ուզում և լալիս է։
+ Le explicaría que el cachorro necesita a alguien que lo cuide siempre.|Կբացատրեի, որ լակոտին պետք է մեկը, որ միշտ խնամի։
+ Le diría que primero practicáramos juntos cuidando una planta.|Կասեի, որ նախ միասին բույս խնամենք։
- Le diría que deja de llorar ya.|Սխալ և կոպիտ։ !! Falta empatía y la forma sería «que dejara».|Կարեկցանք է պակասում, ձևը՝ «que dejara»։
= 3 Los clientes te aplauden. ¡Qué argumentos tan maduros!|Հաճախորդները ծափահարում են։ Ի՜նչ հասուն փաստարկներ։
## d25;elena;B2;La gata del vecino|Հարևանի կատուն
> Un cliente sospecha que su vecino no alimenta bien a su gata. ¿Qué le dirías?|Հաճախորդը կասկածում է, որ հարևանը լավ չի կերակրում կատվին։ Ի՞նչ կասեիր։
+ Que hablara primero con él, sin acusarlo.|Որ նախ խոսեր նրա հետ՝ առանց մեղադրելու։
+ Que se asegurara antes de sacar conclusiones.|Որ հավաստիանար նախքան եզրակացնելը։
- Que habla con él.|Սխալ եղանակ։ !! Consejo en pasado/condicional: que hablara.|Խորհուրդ պայմանականում՝ que hablara։
> ¿Y si el vecino se enfadara?|Իսկ եթե հարևանը բարկանա՞ր։
+ Le ofrecería ayuda: quizá esté pasando un mal momento.|Օգնություն կառաջարկեի․ գուցե դժվար շրջան է։
+ Llamaría a una protectora para pedir consejo.|Կզանգեի պաշտպանների կազմակերպություն՝ խորհուրդ հարցնելու։ => prot
- Si se enfadaría, me iría.|Սխալ համադրություն։ !! Después de «si» no va condicional: si se enfadara.|«Si»-ից հետո՝ si se enfadara։
> Qué empática eres. A veces, la gente necesita ayuda y no sabe pedirla.|Ի՜նչ կարեկից ես։ Երբեմն մարդկանց օգնություն է պետք, բայց չգիտեն՝ ինչպես խնդրել։
= 3 Elena va a compartir tu consejo con el cliente.|Էլենան քո խորհուրդը կփոխանցի հաճախորդին։
:prot
> Las protectoras saben actuar con discreción.|Կազմակերպությունները գիտեն զգուշորեն գործել։
= 3 Has encontrado el equilibrio entre ayudar y respetar.|Գտար օգնելու և հարգելու հավասարակշռությունը։
## d26;diego;B2;El acuario sostenible|Կայուն ակվարիումը
> Quiero que nuestra sección sea más ecológica. ¿Alguna sugerencia?|Ուզում եմ, որ մեր բաժինն ավելի էկոլոգիական լինի։ Առաջարկ ունե՞ս։
+ Podríais usar luces que consuman menos.|Կարող եք քիչ էներգիա սպառող լույսեր օգտագործել։
+ Sugiero que reutilicéis el agua para regar.|Առաջարկում եմ ջուրը նորից օգտագործել ոռոգման համար։ => agua
- Sugiero que reutilizáis el agua.|Սխալ եղանակ։ !! «Sugerir que» + subjuntivo: reutilicéis.|«Sugerir que» + subjuntivo։
> Cierto. Las LED duran más y gastan la mitad.|Ճիշտ է։ LED-երը երկար են ծառայում և կիսով չափ են ծախսում։
=> sig
:agua
> ¡Genial! El agua del acuario es un abono excelente.|Հիանալի՜։ Ակվարիումի ջուրը գերազանց պարարտանյութ է։
:sig
> ¿Y qué harías con los peces que la gente ya no quiere?|Իսկ ի՞նչ կանեիր ձկների հետ, որոնց մարդիկ այլևս չեն ուզում։
+ Crearía un programa de acogida.|Խնամակալության ծրագիր կստեղծեի։
+ Haría una campaña para que nadie los soltara en los ríos.|Արշավ կանեի, որ ոչ ոք գետ բաց չթողնի։
- Los soltaría en el río más cercano.|Բաց կթողնեի մոտակա գետը։ !! Es muy perjudicial para el ecosistema. ¡Nunca se sueltan!|Շատ վնասակար է էկոհամակարգի համար։
> Última: ¿cómo lo anunciarías?|Վերջինը․ ինչպե՞ս կհայտարարեիր։
+ Con un cartel: «Cada gota cuenta».|Ցուցանակով՝ «Ամեն կաթիլ կարևոր է»։
+ Con vídeos cortos que muestren el proceso.|Գործընթացը ցույց տվող կարճ տեսանյութերով։
- Con un cartel que dice la gente debe venga.|Սխալ կառուցվածք։ !! «Deber» + infinitivo: debe venir.|«Deber» + անորոշ դերբայ։
= 3 ¡Aprobado! Tu idea estará en el escaparate.|Հաստատված է։ Գաղափարդ ցուցափեղկում կլինի։
## d27;ines;B2;Una noticia falsa|Կեղծ լուր
> He leído en internet que los conejos pueden vivir sin agua. ¿Tú lo crees?|Համացանցում կարդացի, որ ճագարները կարող են ապրել առանց ջրի։ Հավատո՞ւմ ես։
+ Dudo que sea verdad. ¿Quién lo ha publicado?|Կասկածում եմ, որ ճիշտ է։ Ո՞վ է հրապարակել։
+ Es imposible que un animal viva sin agua.|Անհնար է, որ կենդանին ապրի առանց ջրի։
- Dudo que es verdad.|Սխալ եղանակ։ !! «Dudar que» + subjuntivo: sea.|«Dudar que» + subjuntivo։
> Era una página sin autor. ¿Cómo se comprueba una información?|Էջն առանց հեղինակի էր։ Ինչպե՞ս ստուգել տեղեկությունը։
+ Comparando varias fuentes fiables.|Համեմատելով մի քանի վստահելի աղբյուր։
+ Preguntándole a un veterinario.|Հարցնելով անասնաբույժին։
- Comparar varias fuentes fiable siempre.|Սխալ ձև։ !! «Comparando varias fuentes fiables»: gerundio y plural.|Gerundio և հոգնակի՝ comparando… fiables։
> Si hubiera hecho caso, Algodón habría enfermado.|Եթե լսեի, Ալգոդոնը կհիվանդանար։
+ Menos mal que preguntaste antes.|Լավ է՝ նախապես հարցրիր։
+ Por eso conviene desconfiar de lo que no tiene autor.|Դրա համար պետք է կասկածել անհեղինակ նյութերին։
- Menos mal que preguntarías antes.|Սխալ ժամանակ։ !! Hecho real del pasado: preguntaste.|Իրական անցյալ՝ preguntaste։
= 3 Tienes pensamiento crítico. ¡Bravo!|Քննադատական մտածողություն ունես։ Կեցցե՛ս։
## d28;marcos;B2;El perro de terapia|Թերապևտիկ շուն
> Moka visitará un hospital. ¿Qué cualidades debe tener un perro así?|Մոկան հիվանդանոց կայցելի։ Ի՞նչ հատկանիշներ պետք է ունենա այդպիսի շունը։
+ Es fundamental que sea tranquilo y paciente.|Կարևոր է, որ հանգիստ և համբերատար լինի։
+ Debe dejarse acariciar por desconocidos.|Պետք է թույլ տա, որ անծանոթները շոյեն։
- Es fundamental que es tranquilo.|Սխալ եղանակ։ !! «Es fundamental que» + subjuntivo: sea.|«Es fundamental que» + subjuntivo։
> ¿Y si un niño tuviera miedo?|Իսկ եթե երեխան վախենա՞ր։
+ No lo obligaría; dejaría que mirara desde lejos.|Չէի ստիպի, կթողնեի հեռվից նայի։
+ Le contaría cómo es Moka antes de acercarme.|Մոտենալուց առաջ կպատմեի Մոկայի մասին։
- Lo obligaría a tocarlo.|Կստիպեի դիպչել։ !! Nunca hay que forzar a nadie: se respeta su ritmo.|Երբեք չի կարելի ստիպել։
> Después de la visita, Moka estará agotado. ¿Qué haremos?|Այցից հետո Մոկան ուժասպառ կլինի։ Ի՞նչ կանենք։
+ Lo dejaremos descansar en cuanto lleguemos.|Հենց հասնենք, կթողնենք հանգստանա։
+ Le daremos agua y un paseo corto.|Ջուր կտանք և կարճ զբոսանք։
- Lo dejaremos descansar en cuanto llegaremos.|Սխալ եղանակ։ !! «En cuanto» + subjuntivo para el futuro: lleguemos.|Ապագայի համար «en cuanto» + subjuntivo։
= 3 Moka te lame la mano: quiere que lo acompañes.|Մոկան լիզում է ձեռքդ․ ուզում է, որ ուղեկցես իրեն։
## d29;carmen;B2;Una reseña injusta|Անարդար կարծիք
> Alguien ha escrito que somos maleducados. ¿Cómo responderías?|Մեկը գրել է, որ անքաղաքավարի ենք։ Ինչպե՞ս կպատասխանեիր։
+ Lamentaría lo ocurrido y pediría más detalles.|Կցավեի կատարվածի համար և մանրամասներ կխնդրեի։
+ Agradecería la crítica e invitaría a la persona a volver.|Շնորհակալ կլինեի քննադատության համար և կհրավիրեի նորից։
- Lamento que has tenido esta experiencia.|Սխալ եղանակ։ !! «Lamento que» + subjuntivo: hayas tenido.|«Lamento que» + subjuntivo՝ hayas tenido։
> Dice que esperó veinte minutos. Era sábado y había mucha gente.|Ասում է՝ քսան րոպե է սպասել։ Շաբաթ էր, և շատ մարդ կար։
+ Aun así, deberíamos haberle avisado.|Այնուամենայնիվ պետք է զգուշացնեինք։
+ Podemos poner números para ordenar la cola.|Կարող ենք համարներ դնել հերթի համար։
- Deberíamos haber avisado le.|Սխալ տեղ։ !! El pronombre se une: haberle avisado.|Դերանունը միանում է՝ haberle avisado։
> Me gusta. ¿Cómo cerramos el mensaje?|Հավանեցի։ Ինչպե՞ս ավարտենք նամակը։
+ «Esperamos que nos dé otra oportunidad».|«Հույս ունենք՝ մեզ ևս մեկ հնարավորություն կտաք»։
+ «Quedamos a su disposición».|«Մնում ենք Ձեր տրամադրության տակ»։
- «Esperamos que nos da otra oportunidad».|Սխալ եղանակ։ !! «Esperar que» + subjuntivo: dé.|«Esperar que» + subjuntivo՝ dé։
= 3 El cliente ha cambiado su opinión: ¡cinco estrellas!|Հաճախորդը փոխել է կարծիքը՝ հինգ աստղ։
## d30;lucia;B2;El futuro de la tienda|Խանութի ապագան
> Estoy pensando en ampliar la tienda. Si fueras la dueña, ¿qué añadirías?|Մտածում եմ խանութն ընդլայնել։ Եթե տիրուհին լինեիր, ի՞նչ կավելացնեիր։
+ Añadiría una cafetería donde se pudiera estar con los gatos.|Սրճարան կավելացնեի, որտեղ կարելի կլիներ կատուների հետ լինել։
+ Abriría un taller para enseñar a los niños.|Դասընթաց կբացեի երեխաներին սովորեցնելու համար։ => taller
- Si sería la dueña, añadiría un café.|Սխալ համադրություն։ !! Si + imperfecto de subjuntivo: si fuera.|Si + imperfecto de subjuntivo՝ si fuera։
> ¡Una cafetería de gatos! Necesitaríamos permisos y mucha limpieza.|Կատուների սրճարա՜ն։ Թույլտվություններ և շատ մաքրություն կպահանջվեր։
=> din
:taller
> Un taller... Los niños aprenderían a respetar a los animales.|Դասընթաց… Երեխաները կսովորեին հարգել կենդանիներին։
:din
> ¿Y de dónde sacaríamos el dinero?|Իսկ որտեղի՞ց գումար կգտնեինք։
+ Podríamos organizar un mercadillo solidario.|Կարող էինք բարեգործական տոնավաճառ կազմակերպել։
+ Pediríamos una ayuda para jóvenes emprendedores.|Կդիմեինք երիտասարդ ձեռներեցների աջակցության։
- Podríamos organizaríamos un mercadillo.|Սխալ կառուցվածք։ !! «Podríamos» + infinitivo: organizar.|«Podríamos» + անորոշ դերբայ։
> Me has convencido. ¿Trabajarías conmigo en el proyecto?|Համոզեցիր։ Կաշխատեի՞ր ինձ հետ նախագծի վրա։
+ Sería un honor, siempre que pueda compaginarlo con los estudios.|Պատիվ կլիներ, եթե կարողանամ համատեղել ուսման հետ։
+ ¡Por supuesto! ¿Cuándo empezamos?|Իհարկե՜։ Ե՞րբ ենք սկսում։
- Sería un honor, siempre que puedo.|Սխալ եղանակ։ !! «Siempre que» (condición) + subjuntivo: pueda.|«Siempre que» (պայման) + subjuntivo։
= 3 ¡Trato hecho, socia! El futuro empieza hoy.|Պայմանավորվեցինք, գործընկե՛ր։ Ապագան այսօր է սկսվում։
`);
export const CHECKOUT = parseScripts(String.raw`
## caja;carmen;A2;En la caja|Դրամարկղում
> ¡Hola, Gayane! ¿Has encontrado todo?|Բարև, Գայանե՛։ Ամեն ինչ գտա՞ր։
+ Sí, gracias. Me lo llevo todo.|Այո, շնորհակալություն։ Ամեն ինչ վերցնում եմ։
+ Sí, quería pagar, por favor.|Այո, ուզում էի վճարել, խնդրում եմ։
- Sí, quiero pago, por favor.|Այո (սխալ ձև)։ !! Después de «quiero» va el infinitivo: quiero pagar.|«Quiero»-ից հետո՝ անորոշ դերբայ։
> Muy bien. Son {total} en total. ¿Cómo quieres pagar?|Շատ լավ։ Ընդհանուր {total} է։ Ինչպե՞ս ես ուզում վճարել։
+ Con tarjeta, por favor.|Քարտով, խնդրում եմ։ => tar
+ En efectivo.|Կանխիկ։ => efe
- Pago de tarjeta.|Սխալ նախդիր։ !! Se dice «con tarjeta».|Ասում ենք «con tarjeta»։
:tar
= 3 Acerca la tarjeta... ¡Pago aceptado! Aquí tienes tu recibo.|Մոտեցրու քարտը… Վճարումն ընդունված է։ Ահա կտրոնդ։
:efe
= 3 Perfecto. Cuenta los billetes y las monedas con cuidado.|Հիանալի։ Ուշադիր հաշվիր թղթադրամներն ու մետաղադրամները։
`)[0];
