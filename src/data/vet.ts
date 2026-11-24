import { parseScripts } from './script';
/** animal visible en cada caso */
export const VET_ANIMAL: Record<string, string> = { v1: 'golden', v2: 'gris', v3: 'conejoblanco', v4: 'loro', v5: 'hamster', v6: 'collie', v7: 'siames', v8: 'labrador', v9: 'tabby', v10: 'conejomarron' };
export const VET = parseScripts(String.raw`
## v1;vet;A2;Canela está cansada|Կանելան հոգնած է
> Buenos días, Gayane. ¿Qué le pasa a tu perra?|Բարի լույս, Գայանե՛։ Ի՞նչ է պատահել շանդ։
+ Está cansada y no quiere comer.|Հոգնած է և չի ուզում ուտել։
+ No tiene ganas de jugar.|Խաղալու ցանկություն չունի։
- Es cansada y no quiere comer.|Սխալ բայ։ !! Estado temporal: está cansada.|Ժամանակավոր վիճակ՝ está։
> ¿Desde cuándo se encuentra así?|Ե՞րբվանից է այսպես։
+ Desde ayer por la tarde.|Երեկ երեկոյից։
+ Desde hace dos días.|Երկու օրից ի վեր։
- Desde dos días.|Սխալ կառուցվածք։ !! Con una cantidad de tiempo: desde hace dos días.|Ժամանակի քանակով՝ desde hace։
> ¿Ha bebido suficiente agua?|Բավական ջուր խմե՞լ է։
+ Sí, ha bebido un poco esta mañana.|Այո, այս առավոտ մի քիչ խմել է։
+ No, casi no ha bebido.|Ոչ, գրեթե չի խմել։
- Sí, ha bebida un poco.|Սխալ ձև։ !! Participio con «haber»: ha bebido.|Դերբայը «haber»-ի հետ՝ bebido։
> Voy a tomarle la temperatura. ¿Puedes tranquilizarla?|Հիմա ջերմությունը կչափեմ։ Կարո՞ղ ես հանգստացնել նրան։
+ Sí, la acaricio y le hablo despacio.|Այո, կշոյեմ և դանդաղ կխոսեմ։
+ Tranquila, Canela, estoy contigo.|Հանգիստ, Կանե՛լա, քեզ հետ եմ։
- Sí, le acaricio fuerte y grito.|Այո, ուժեղ և գոռալով։ !! Para calmarla, voz suave y caricias lentas.|Հանգստացնելու համար՝ մեղմ ձայն և դանդաղ շոյանք։
= 3 No es grave: hacía mucho calor. La doctora recomienda agua fresca, sombra y descanso.|Լուրջ չէ․ շատ շոգ էր։ Բժշկուհին խորհուրդ է տալիս զով ջուր, ստվեր և հանգիստ։
## v2;vet;A2;La vacuna de Luna|Լունայի պատվաստումը
> Hola. ¿Luna viene para la vacuna?|Բարև։ Լունան պատվաստմա՞ն է եկել։
+ Sí, tenemos cita a las cinco.|Այո, ժամը հինգին գրանցված ենք։
+ Sí, es su primera vacuna.|Այո, առաջին պատվաստումն է։
- Sí, tenemos cita en las cinco.|Սխալ նախդիր։ !! La hora: a las cinco.|Ժամի համար՝ a las cinco։
> ¿Has traído su cartilla?|Բերե՞լ ես գրքույկը։
+ Sí, aquí la tiene.|Այո, խնդրեմ։
+ Lo siento, la he dejado en casa.|Ներեցեք, տանն եմ թողել։
- Sí, aquí lo tiene.|Սխալ սեռ։ !! «La cartilla»: aquí la tiene.|«La cartilla» իգական է՝ la։
> Ya está. ¿Qué ha hecho Luna durante la vacuna?|Վերջ։ Ի՞նչ արեց Լունան պատվաստման ընթացքում։
+ No se ha movido. ¡Qué valiente!|Չշարժվեց։ Ի՜նչ քաջ է։
+ Ha maullado un poquito.|Մի փոքր մլավեց։
- No se ha moviendo.|Սխալ ձև։ !! Haber + participio: no se ha movido.|Haber + դերբայ՝ movido։
= 3 La doctora anota la fecha de la próxima vacuna: dentro de un año.|Բժշկուհին գրում է հաջորդ պատվաստման ամսաթիվը՝ մեկ տարի անց։
## v3;vet;A2;Algodón no come heno|Ալգոդոնը խոտ չի ուտում
> Cuéntame, ¿qué come Algodón normalmente?|Պատմի՛ր, ի՞նչ է սովորաբար ուտում Ալգոդոնը։
+ Normalmente come heno y verduras.|Սովորաբար խոտ և բանջարեղեն։
+ Come mucha fruta, porque le encanta.|Շատ միրգ է ուտում, քանի որ սիրում է։
- Normalmente comes heno.|Սխալ դեմք։ !! Tercera persona: Algodón come.|Երրորդ դեմք՝ come։
> ¿Le has mirado los dientes?|Նայե՞լ ես ատամներին։
+ Sí, parecen muy largos.|Այո, շատ երկար են թվում։
+ No, no sé cómo hacerlo.|Ոչ, չգիտեմ՝ ինչպես։
- Sí, parece muy largos.|Սխալ թիվ։ !! Los dientes parecen (plural).|Los dientes parecen՝ հոգնակի։
> Los dientes de los conejos crecen siempre. Voy a revisarlos. ¿Puedes sujetarlo con cuidado?|Ճագարի ատամները միշտ աճում են։ Կստուգեմ։ Կարո՞ղ ես զգույշ պահել։
+ Claro, lo sujeto con las dos manos.|Իհարկե, երկու ձեռքով եմ պահում։
+ Sí, dígame cómo tengo que hacerlo.|Այո, ասեք՝ ինչպես անեմ։
- Claro, lo cojo por las orejas.|Իհարկե, ականջներից կբռնեմ։ !! ¡Nunca por las orejas! Se sujeta el cuerpo entero.|Երբեք ականջներից։ Պահում են ամբողջ մարմինը։
= 3 La doctora lima los dientes sin dolor y recomienda más heno.|Բժշկուհին առանց ցավի հղկում է ատամները և ավելի շատ խոտ է խորհուրդ տալիս։
## v4;vet;A2;Kiwi pierde plumas|Կիվին փետուր է կորցնում
> ¿Cuándo empezó Kiwi a perder plumas?|Ե՞րբ սկսեց Կիվին փետուր կորցնել։
+ Empezó la semana pasada.|Անցյալ շաբաթ սկսեց։
+ Hace unos diez días.|Մոտ տասը օր առաջ։
- Empieza la semana pasada.|Սխալ ժամանակ։ !! «La semana pasada» pide indefinido: empezó.|«La semana pasada»-ն պահանջում է indefinido։
> ¿Ha cambiado algo en casa?|Տանը որևէ բան փոխվե՞լ է։
+ Sí, ha llegado un gato nuevo.|Այո, նոր կատու է եկել։
+ Mi hermana se ha ido a estudiar fuera.|Քույրս գնացել է ուրիշ տեղ սովորելու։
- Sí, ha llegado uno gato nuevo.|Սխալ հոդ։ !! Delante del sustantivo: un gato.|Գոյականից առաջ՝ un։
> Puede ser estrés. ¿Qué podrías hacer para ayudarlo?|Կարող է սթրես լինել։ Ի՞նչ կարող ես անել։
+ Puedo poner la jaula en un lugar tranquilo.|Կարող եմ վանդակը հանգիստ տեղում դնել։
+ Puedo pasar más tiempo con él.|Կարող եմ ավելի շատ ժամանակ անցկացնել նրա հետ։
- Puedo dejarlo solo todo el día.|Կարող եմ ամբողջ օրը միայնակ թողնել։ !! Los loros son muy sociales: necesitan compañía.|Թութակները շատ սոցիալական են։
= 3 La doctora dice que es estrés y que con calma le volverán a salir las plumas.|Բժշկուհին ասում է, որ սթրես է, և հանգստության դեպքում փետուրները նորից կաճեն։
## v5;vet;B1;Pepito duerme demasiado|Պեպիտոն շատ է քնում
> Dices que Pepito duerme de día. ¿Te preocupa?|Ասում ես՝ Պեպիտոն ցերեկը քնում է։ Անհանգստանո՞ւմ ես։
+ Sí, me preocupa que esté enfermo.|Այո, անհանգստանում եմ, որ հիվանդ է։
+ Un poco, aunque por la noche corre mucho.|Մի քիչ, թեև գիշերը շատ է վազում։
- Sí, me preocupa que está enfermo.|Սխալ եղանակ։ !! «Me preocupa que» + subjuntivo: esté.|«Me preocupa que» + subjuntivo։
> ¿Sabías que los hámsteres son nocturnos?|Գիտեի՞ր, որ գերմանամկները գիշերային են։
+ ¡Ah! Entonces es normal que duerma de día.|Ա՜հ։ Ուրեմն նորմալ է, որ ցերեկը քնում է։
+ Lo había leído, pero no estaba segura.|Կարդացել էի, բայց վստահ չէի։
- Entonces es normal que duerme.|Սխալ եղանակ։ !! «Es normal que» + subjuntivo: duerma.|«Es normal que» + subjuntivo։
> En invierno la temperatura es importante. ¿Dónde está su jaula?|Ձմռանը ջերմաստիճանը կարևոր է։ Որտե՞ղ է վանդակը։
+ Estaba junto a la ventana, pero la he movido.|Պատուհանի մոտ էր, բայց տեղափոխել եմ։
+ En mi cuarto, lejos de las corrientes de aire.|Սենյակումս, միջանցիկ քամուց հեռու։
- Estuvo junto la ventana siempre.|Սխալ ձև։ !! Situación habitual: estaba; y «junto a».|Սովորական վիճակ՝ estaba, և «junto a»։
= 3 Pepito está sano. La doctora te felicita por observarlo tan bien.|Պեպիտոն առողջ է։ Բժշկուհին շնորհավորում է քեզ ուշադիր լինելու համար։
## v6;vet;B1;Nube cojea|Նուբեն կաղում է
> ¿Cómo se hizo daño Nube?|Ինչպե՞ս վնասվեց Նուբեն։
+ Estaba corriendo y pisó algo.|Վազում էր և ինչ-որ բանի վրա կանգնեց։
+ No lo vi, pero oí un llanto.|Չտեսա, բայց լացի ձայն լսեցի։
- Estuvo corriendo y pisaba algo.|Սխալ ժամանակներ։ !! Acción en desarrollo: estaba corriendo; interrupción: pisó.|Ընթացքը՝ estaba corriendo, ընդհատումը՝ pisó։
> ¿Qué pata le duele?|Ո՞ր թաթն է ցավում։
+ Le duele la pata delantera derecha.|Առջևի աջ թաթն է ցավում։
+ Creo que la izquierda: no la apoya.|Կարծում եմ ձախը․ չի հենվում դրա վրա։
- Se duele la pata derecha.|Սխալ դերանուն։ !! A ella le duele: usa «le».|A ella le duele՝ «le»։
> Tiene una espina pequeña. Yo la sacaré. ¿Me pasas el algodón?|Փոքր փուշ կա։ Ես կհանեմ։ Բամբակը կփոխանցե՞ս։
+ Sí, se lo paso ahora mismo.|Այո, հիմա կփոխանցեմ Ձեզ։
+ Aquí lo tiene, doctora.|Խնդրեմ, բժշկուհի։
- Sí, le lo paso.|Սխալ դերանուններ։ !! «Le lo» → «se lo».|«Le lo» → «se lo»։
> Listo. Durante tres días, paseos cortos. ¿Lo has entendido?|Պատրաստ է։ Երեք օր կարճ զբոսանքներ։ Հասկացա՞ր։
+ Sí: que pasee poco y que no corra.|Այո՝ քիչ զբոսնի և չվազի։
+ Sí, la llevaré con correa y despacio.|Այո, թոկով և դանդաղ կտանեմ։
- Sí: mañana hacemos una carrera.|Այո, վաղը մրցավազք կանենք։ !! La doctora ha pedido paseos cortos y tranquilos.|Բժշկուհին խնդրեց կարճ, հանգիստ զբոսանքներ։
= 3 Nube mueve la cola: ¡ya no le molesta!|Նուբեն շարժում է պոչը․ այլևս չի անհանգստացնում։
## v7;vet;B1;Cleo se rasca|Կլեոն քորվում է
> ¿Desde cuándo se rasca Cleo?|Ե՞րբվանից է Կլեոն քորվում։
+ Lleva cinco días rascándose.|Հինգ օր է՝ քորվում է։
+ Se rasca desde que cambiamos la arena.|Քորվում է ավազը փոխելուց ի վեր։ => arena
- Lleva cinco días a rascarse.|Սխալ կառուցվածք։ !! Llevar + tiempo + gerundio: rascándose.|Llevar + ժամանակ + gerundio։
> ¿Habéis cambiado de comida o de productos?|Կերը կամ միջոցները փոխե՞լ եք։
+ Hemos comprado una arena con perfume.|Բույրով ավազ ենք գնել։
+ No, pero sale más a la terraza.|Ոչ, բայց ավելի շատ է պատշգամբ դուրս գալիս։
- Hemos comprado un arena con perfume.|Սխալ սեռ։ !! «Arena» es femenino: una arena.|«Arena»-ն իգական է։
=> sig
:arena
> Buena observación. El perfume puede irritar la piel.|Լավ դիտարկում է։ Բույրը կարող է գրգռել մաշկը։
:sig
> Le haré una prueba de alergia. Mientras tanto, ¿qué conviene hacer?|Ալերգիայի թեստ կանեմ։ Մինչ այդ ի՞նչ է պետք անել։
+ Usar arena sin perfume hasta tener los resultados.|Առանց բույրի ավազ օգտագործել մինչև արդյունքները։
+ Apuntar cuándo se rasca más.|Գրանցել, թե երբ է ավելի շատ քորվում։
- Darle una medicina de mi abuela.|Տալ տատիկիս դեղը։ !! Las medicinas las decide siempre la veterinaria.|Դեղերը միշտ անասնաբույժն է որոշում։
= 3 Era la arena perfumada. La doctora elige el tratamiento y Cleo ronronea.|Պատճառը բուրավետ ավազն էր։ Բժշկուհին ընտրում է բուժումը, Կլեոն մռմռում է։
## v8;vet;B1;Moka ha engordado|Մոկան գիրացել է
> Moka pesa treinta y cuatro kilos. El año pasado pesaba veintinueve. ¿Qué ha pasado?|Մոկան երեսունչորս կիլոգրամ է։ Անցյալ տարի քսանինն էր։ Ի՞նչ է պատահել։
+ Mi abuelo le da comida a escondidas.|Պապիկս գաղտնի ուտելիք է տալիս նրան։
+ Este invierno hemos paseado menos.|Այս ձմեռ քիչ ենք զբոսնել։
- Mi abuelo da le comida.|Սխալ տեղ։ !! El pronombre va delante: le da comida.|Դերանունը բայից առաջ՝ le da։
> ¿Cuántos kilos ha ganado?|Քանի՞ կիլոգրամ է ավելացել։
+ Cinco kilos.|Հինգ կիլոգրամ։
- Seis kilos.|Վեց կիլոգրամ։ !! 34 − 29 = 5 kilos.|34 − 29 = 5 կիլոգրամ։
- Cuatro kilos.|Չորս կիլոգրամ։ !! 34 − 29 = 5 kilos.|34 − 29 = 5 կիլոգրամ։
> Os prepararé un plan. ¿Cómo convencerás a tu abuelo?|Պլան կկազմեմ։ Ինչպե՞ս կհամոզես պապիկիդ։
+ Le diré que Moka se siente mejor con menos peso.|Կասեմ, որ Մոկան ավելի լավ է զգում քիչ քաշով։
+ Le propondré que lo acompañe en los paseos.|Կառաջարկեմ ուղեկցել զբոսանքներին։
- Le diré que da menos comida.|Սխալ եղանակ։ !! Petición: que dé menos comida.|Խնդրանք՝ que dé։
= 3 La doctora prepara un plan de paseos. ¡Moka ya quiere empezar!|Բժշկուհին զբոսանքների պլան է կազմում։ Մոկան արդեն ուզում է սկսել։
## v9;vet;B2;El microchip de Tigre|Տիգրեի միկրոչիպը
> Encontraron a Tigre en la calle. Si llevara microchip, ¿qué sabríamos?|Տիգրեին փողոցում գտան։ Եթե միկրոչիպ ունենար, ի՞նչ կիմանայինք։
+ Sabríamos quién es su dueño.|Կիմանայինք՝ ով է տերը։
+ Podríamos llamar a su familia.|Կկարողանայինք զանգել ընտանիքին։
- Sabremos quién sería su dueño si llevaría.|Սխալ համադրություն։ !! Si llevara…, sabríamos.|Si llevara…, sabríamos։
> El lector no encuentra nada. ¿Qué me aconsejas mientras buscamos?|Սարքը ոչինչ չի գտնում։ Ի՞նչ խորհուրդ կտաս, մինչ փնտրում ենք։
+ Que publiquemos una foto en el barrio.|Որ լուսանկար հրապարակենք թաղամասում։
+ Que preguntemos en el refugio.|Որ հարցնենք ապաստարանում։
- Que publicamos una foto.|Սխալ եղանակ։ !! Consejo: que publiquemos (subjuntivo).|Խորհուրդ՝ subjuntivo։
> ¡Ha llamado una señora! Dice que el gato tiene una mancha en la pata. ¿Cómo lo comprobarías?|Մի տիկին զանգեց։ Ասում է՝ կատվի թաթին բիծ կա։ Ինչպե՞ս կստուգեիր։
+ Le pediría que describiera la mancha con detalle.|Կխնդրեի մանրամասն նկարագրել բիծը։
+ Le preguntaría si tiene fotos antiguas.|Կհարցնեի՝ հին լուսանկարներ ունի՞։
- Le daría el gato sin preguntar.|Կատուն կտայի առանց հարցնելու։ !! Hay que comprobar que realmente es su familia.|Պետք է ստուգել, որ իրոք նրա ընտանիքն է։
= 3 ¡Es su familia! Tigre vuelve a casa, esta vez con microchip.|Նրա ընտանիքն է։ Տիգրեն տուն է վերադառնում՝ այս անգամ միկրոչիպով։
## v10;vet;B2;Una operación sencilla|Պարզ վիրահատություն
> Avellana necesita una pequeña intervención que haré yo. ¿Tienes alguna duda?|Ավելյանային փոքր միջամտություն է պետք, ես կանեմ։ Հարցեր ունե՞ս։
+ ¿Es necesario que esté en ayunas?|Անհրաժե՞շտ է, որ քաղցած լինի։ => ayunas
+ ¿Cuánto tardará en recuperarse?|Որքա՞ն ժամանակում կապաքինվի։
- ¿Es necesario que está en ayunas?|Սխալ եղանակ։ !! «Es necesario que» + subjuntivo: esté.|«Es necesario que» + subjuntivo։
> En una semana estará como nueva, siempre que descanse.|Մեկ շաբաթից նորի պես կլինի, եթե հանգստանա։
=> sig
:ayunas
> ¡Buena pregunta! Los perros sí, pero los conejos no deben dejar de comer.|Լավ հարց է։ Շները՝ այո, բայց ճագարները չպետք է դադարեն ուտել։
:sig
> Cuando vuelva a casa, ¿qué harás?|Երբ տուն վերադառնա, ի՞նչ կանես։
+ Le prepararé un sitio tranquilo para que descanse.|Հանգիստ տեղ կպատրաստեմ, որ հանգստանա։
+ En cuanto note algo raro, la llamaré.|Հենց տարօրինակ բան նկատեմ, կզանգեմ Ձեզ։
- Cuando volverá, le prepararé un sitio.|Սխալ ձև։ !! «Cuando» + futuro → subjuntivo: cuando vuelva.|Ապագա «cuando»-ից հետո՝ subjuntivo։
= 3 Todo ha salido bien. La doctora te da las gracias por tus preguntas.|Ամեն ինչ լավ անցավ։ Բժշկուհին շնորհակալ է հարցերիդ համար։
`);
/** Comprensión tras cada visita: pregunta y opciones (la primera es correcta). */
export const VET_Q: Record<string, { q: string; o: string[] }> = {
  v1: { q: '¿Por qué estaba cansada Canela?|Ինչո՞ւ էր հոգնած Կանելան։', o: ['Porque hacía mucho calor.|Որովհետև շատ շոգ էր։', 'Porque había corrido demasiado.|Որովհետև չափից շատ էր վազել։', 'Porque tenía una espina.|Որովհետև փուշ ուներ։', 'Porque no había dormido.|Որովհետև չէր քնել։'] },
  v2: { q: '¿Cuándo será la próxima vacuna?|Ե՞րբ կլինի հաջորդ պատվաստումը։', o: ['Dentro de un año.|Մեկ տարի անց։', 'Dentro de un mes.|Մեկ ամիս անց։', 'La semana que viene.|Հաջորդ շաբաթ։', 'Nunca más.|Այլևս երբեք։'] },
  v3: { q: '¿Qué necesita comer más Algodón?|Ի՞նչ պետք է ավելի շատ ուտի Ալգոդոնը։', o: ['Heno.|Խոտ։', 'Fruta.|Միրգ։', 'Zanahorias.|Գազար։', 'Galletas.|Թխվածք։'] },
  v4: { q: '¿Qué tiene Kiwi?|Ի՞նչ ունի Կիվին։', o: ['Estrés.|Սթրես։', 'Una alergia.|Ալերգիա։', 'Una herida.|Վերք։', 'Frío.|Ցուրտ։'] },
  v5: { q: '¿Por qué duerme Pepito de día?|Ինչո՞ւ է Պեպիտոն ցերեկը քնում։', o: ['Porque es un animal nocturno.|Որովհետև գիշերային կենդանի է։', 'Porque está enfermo.|Որովհետև հիվանդ է։', 'Porque es muy viejo.|Որովհետև շատ ծեր է։', 'Porque no tiene rueda.|Որովհետև անիվ չունի։'] },
  v6: { q: '¿Qué tenía Nube en la pata?|Ի՞նչ ուներ Նուբեն թաթում։', o: ['Una espina.|Փուշ։', 'Una pulga.|Լու։', 'Un cristal.|Ապակի։', 'Una quemadura.|Այրվածք։'] },
  v7: { q: '¿Cuál era la causa del picor?|Ո՞րն էր քորի պատճառը։', o: ['La arena perfumada.|Բուրավետ ավազը։', 'La comida nueva.|Նոր կերը։', 'Las pulgas.|Լուերը։', 'El calor.|Շոգը։'] },
  v8: { q: '¿Cuál es la solución de la doctora?|Ո՞րն է բժշկուհու լուծումը։', o: ['Un plan de paseos.|Զբոսանքների պլան։', 'Una operación.|Վիրահատություն։', 'Una vacuna.|Պատվաստում։', 'Más galletas.|Ավելի շատ թխվածք։'] },
  v9: { q: '¿Cómo vuelve Tigre a casa?|Ինչպե՞ս է Տիգրեն վերադառնում տուն։', o: ['Con microchip.|Միկրոչիպով։', 'Con una venda.|Վիրակապով։', 'Con un collar rojo.|Կարմիր վզնոցով։', 'Solo, por la calle.|Միայնակ, փողոցով։'] },
  v10: { q: '¿Qué animales no deben estar en ayunas?|Ո՞ր կենդանիները չպետք է քաղցած մնան։', o: ['Los conejos.|Ճագարները։', 'Los perros.|Շները։', 'Los gatos.|Կատուները։', 'Todos.|Բոլորը։'] },
};
