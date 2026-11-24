import type { Bi } from '../core/bi';
const RAW = `
1;Tres tristes tigres tragaban trigo en un trigal, y los tres tigres tristes se volvieron tres tigres alegres.|Երեք տխուր վագր ցորեն էին կուլ տալիս ցորենի արտում, և երեք տխուր վագրերը դարձան երեք ուրախ վագր։
1;Pepe Pecas pica papas con un pico. Con un pico pica papas Pepe Pecas.|Պեպե Պեկասը քլունգով կարտոֆիլ է մանրում։ Քլունգով կարտոֆիլ է մանրում Պեպե Պեկասը։
1;Mi gata Mimí mima a mi mamá, y mi mamá mima a Mimí cada mañana.|Կատուս՝ Միմին, փայփայում է մայրիկիս, և մայրիկս ամեն առավոտ փայփայում է Միմիին։
1;El perro de Rosa y Roque no tiene rabo, porque Ramón Ramírez nunca se lo ha dibujado.|Ռոսայի և Ռոկեի շունը պոչ չունի, որովհետև Ռամոն Ռամիրեսը երբեք չի նկարել այն։
1;Cuando cuentes cuentos, cuenta cuántos cuentos cuentas.|Երբ հեքիաթներ պատմես, հաշվիր, թե քանի հեքիաթ ես պատմում։
1;Pablito clavó un clavito. ¿Qué clavito clavó Pablito?|Պաբլիտոն մի փոքրիկ մեխ խփեց։ Ո՞ր փոքրիկ մեխը խփեց Պաբլիտոն։
1;Una pata con patitos pasea por el patio, y por el patio pasean los patitos con su pata.|Բադիկը ձագուկներով զբոսնում է բակում, և բակում ձագուկները զբոսնում են իրենց բադիկի հետ։
1;Lola la loba lava la lana, la lana lava la loba Lola.|Լոլա գայլը լվանում է բուրդը, բուրդը լվանում է գայլ Լոլան։
1;El pez que nada, nada y nada, nunca nada se cansa de nadar.|Ձուկը, որ լողում է, լողում ու լողում, երբեք բնավ չի հոգնում լողալուց։
1;Como poco coco como, poco coco compro.|Քանի որ քիչ կոկոս եմ ուտում, քիչ կոկոս եմ գնում։
2;El cielo está enladrillado. ¿Quién lo desenladrillará? El desenladrillador que lo desenladrille, buen desenladrillador será.|Երկինքը աղյուսապատ է։ Ո՞վ կհանի աղյուսները։ Ով հանի, լավ աղյուս հանող կլինի։
2;Erre con erre cigarro, erre con erre barril; rápido ruedan los carros, cargados de azúcar del ferrocarril.|Էռե՝ էռեով սիգար, էռե՝ էռեով տակառ․ արագ գլորվում են երկաթուղու՝ շաքարով բեռնված վագոնները։
2;El hipopótamo Hipo está con hipo. ¿Quién le quita el hipo al hipopótamo Hipo?|Գետաձի Իպոն զկռտում է։ Ո՞վ կվերացնի գետաձի Իպոյի զկռտոցը։
2;En la plaza de Constantinopla había una esquina; en la esquina, una casa; en la casa, un balcón, y en el balcón, un loro bribón.|Կոստանդնուպոլսի հրապարակում անկյուն կար, անկյունում՝ տուն, տանը՝ պատշգամբ, պատշգամբում՝ չարաճճի թութակ։
2;Si la sierva que te sirve no te sirve como sierva, ¿de qué sirve que te sirvas de una sierva que no sirve?|Եթե քեզ ծառայող սպասուհին չի ծառայում ինչպես պետք է, ինչի՞ն է պետք չծառայող սպասուհու ծառայությունը։
2;Parra tenía una perra y Guerra tenía una parra. La perra de Parra subió a la parra de Guerra.|Պառան շուն ուներ, իսկ Գեռան՝ որթատունկ։ Պառայի շունը բարձրացավ Գեռայի որթատունկը։
2;Compadre, cómpreme un coco. Compadre, coco no compro, porque el que poco coco come, poco coco compra.|Բարեկա՛մ, կոկոս գնիր ինձ համար։ Բարեկա՛մ, կոկոս չեմ գնում, քանզի ով քիչ կոկոս է ուտում, քիչ կոկոս է գնում։
2;Teresa trajo tizas hechas trizas, y trizas de tizas trajo Teresa a la tienda.|Տերեսան ջարդված կավիճներ բերեց, և կավճի կտորներ բերեց Տերեսան խանութ։
2;El gato garabato, sentado en un zapato, mira el plato del pato mientras el pato come un rato.|Խզբզան կատուն, կոշիկի վրա նստած, նայում է բադի ափսեին, մինչ բադը մի պահ ուտում է։
2;La rana Renata rema rápido en el río, y el ratón Ramiro corre por la ribera con frío.|Ռենատա գորտն արագ թիավարում է գետում, իսկ Ռամիրո մուկը մրսելով վազում է ափով։
3;El arzobispo de Constantinopla se quiere desarzobispoconstantinopolizar. Quien lo desarzobispoconstantinopolice, buen desarzobispoconstantinopolizador será.|Կոստանդնուպոլսի արքեպիսկոպոսն ուզում է հրաժարվել իր կոչումից։ Ով օգնի հրաժարվել, լավ օգնող կլինի։
3;Había una caracatrepa con tres caracatrepitos. Cuando la caracatrepa trepa, trepan los tres caracatrepitos.|Մի մագլցող խխունջ կար երեք մագլցող ձագով։ Երբ մայրը մագլցում է, մագլցում են նաև երեք ձագերը։
3;El otorrinolaringólogo de Parangaricutirimícuaro se quiere desotorrinolaringoparangaricutirimicuarizar.|Պարանգարիկուտիրիմիկուարոյի քիթ-կոկորդ-ականջաբանը ուզում է այլևս այդպիսին չլինել։
3;De generación en generación las generaciones se degeneran con mayor degeneración, pero los gatos guardan con generosidad su tradición.|Սերնդեսերունդ սերունդներն ավելի ու ավելի են փոխվում, բայց կատուներն առատաձեռնորեն պահում են իրենց ավանդույթը։
3;Me han dicho que has dicho un dicho que yo he dicho. Ese dicho que te han dicho que yo he dicho no lo he dicho; y si yo lo hubiera dicho, estaría muy bien dicho.|Ինձ ասել են, որ դու ասել ես մի խոսք, որ ես եմ ասել։ Այդ խոսքը, որ քեզ ասել են, թե ես եմ ասել, չեմ ասել, իսկ եթե ասած լինեի, շատ լավ ասված կլիներ։
3;Por la carretera de Guadarrama, un burro cargado de barro arrastra el carro de Curro, y Curro corre tras el burro con el barro y con el carro.|Գվադառամայի ճանապարհով ցեխով բեռնված էշը քարշ է տալիս Կուռոյի սայլը, և Կուռոն վազում է էշի հետևից՝ ցեխով ու սայլով։
3;Buscaba el bosque Francisco, un vasco bizco muy brusco; y, al verlo, le dijo un chusco: «¿Buscas el bosque, vasco bizco?».|Ֆրանսիսկոն՝ մի շիլ ու կոպիտ բասկ, անտառն էր փնտրում, և տեսնելով՝ մի կատակասեր ասաց. «Անտա՞ռն ես փնտրում, շի՛լ բասկ»։
3;Doña Panchívida se cortó un dívido con el cuchívido del zapatívido, y su marívido se puso brávido porque el cuchívido estaba afilávido.|Տիկին Պանչիվիդան մատը կտրեց կոշկակարի դանակով, և ամուսինը բարկացավ, որովհետև դանակը սուր էր (կատակային վերջավորություններով)։
3;Cuatro caballos cabalgan por cuatro caminos con cuatro canarios que cantan cuarenta canciones cuando cuatro campanas callan.|Չորս ձի արշավում են չորս ճանապարհով չորս դեղձանիկների հետ, որոնք քառասուն երգ են երգում, երբ չորս զանգեր լռում են։
3;Un tigre, dos tigres, tres tigres trotan por el trigal; tanto trotan los tres tigres que el trigo tiembla y el trigal truena al trotar.|Մեկ վագր, երկու վագր, երեք վագր վարգում են ցորենի արտով․ այնքան են վարգում երեք վագրերը, որ ցորենը դողում է, և արտը որոտում է վարգից։
`;
export const TONGUES: { id: string; lvl: number; b: Bi }[] = RAW.trim().split('\n').map((l, i) => ({ id: `t${i + 1}`, lvl: Number(l[0]), b: l.slice(2) }));
