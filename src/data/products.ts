import type { Bi } from '../core/bi';
export type Shape = 'bolsa' | 'lata' | 'caja' | 'bote' | 'pelota' | 'hueso' | 'raton' | 'collar' | 'correa' | 'cama' | 'cuenco' | 'jaula' | 'acuario' | 'cepillo' | 'cuerda' | 'planta' | 'rascador' | 'transportin' | 'rueda';
export interface Product { id: string; dept: string; tags: string[]; name: Bi; desc: Bi; price: number; shape: Shape; c: string; c2: string }
const RAW = `
pp1;alimentos;pienso-perro,perro,comida;Pienso para perros «Campo»|«Campo» չոր կեր շների համար;Pienso seco con pollo y arroz. Bolsa de dos kilos.|Չոր կեր հավի մսով և բրնձով։ Երկու կիլոգրամանոց տոպրակ։;11.90;bolsa;#c98b6b;#fff3e0
pp2;alimentos;pienso-perro,perro,comida;Pienso para perros «Prémium»|«Prémium» չոր կեր շների համար;Pienso de salmón sin cereales, para perros con el estómago delicado.|Սաղմոնով կեր առանց հացահատիկի՝ զգայուն ստամոքսով շների համար։;18.50;bolsa;#6f5a8c;#f7e9ff
pp3;alimentos;pienso-cachorro,perro,comida;Pienso para cachorros|Չոր կեր լակոտների համար;Con calcio para crecer sano. Los granos son más pequeños.|Կալցիումով՝ առողջ աճի համար։ Հատիկներն ավելի մանր են։;13.20;bolsa;#e3b3a0;#fff
pg1;alimentos;pienso-gato,gato,comida;Pienso para gatos|Չոր կեր կատուների համար;Comida seca de pavo para gatos adultos.|Հնդկահավով չոր կեր չափահաս կատուների համար։;9.80;bolsa;#9d86c4;#f7efff
lg1;alimentos;lata-gato,gato,comida,humeda;Lata de atún para gatos|Թունայի պահածո կատուների համար;Comida húmeda con trozos de atún. Muy sabrosa.|Խոնավ կեր թունայի կտորներով։ Շատ համեղ է։;1.80;lata;#7fa9c9;#eef8ff
lg2;alimentos;lata-gato,gato,comida,humeda;Lata de pollo para gatos|Հավի պահածո կատուների համար;Comida húmeda de pollo, sin azúcar ni colorantes.|Հավով խոնավ կեր՝ առանց շաքարի և ներկանյութերի։;1.50;lata;#e0b36a;#fff6e0
co1;alimentos;comida-conejo,conejo,comida;Heno fresco|Թարմ խոտ;Heno de hierba natural. Los conejos lo necesitan cada día.|Բնական խոտ։ Ճագարներին այն ամեն օր է պետք։;5.40;bolsa;#9db877;#f5ffe9
ha1;alimentos;comida-hamster,hamster,comida;Mezcla de semillas para hámster|Սերմերի խառնուրդ գերմանամկան համար;Semillas, cereales y verduras secas.|Սերմեր, հացահատիկ և չորացրած բանջարեղեն։;4.20;caja;#d9a25f;#fff4df
pa1;alimentos;comida-pajaro,pajaro,comida;Alpiste para pájaros|Սերմեր թռչունների համար;Semillas limpias para canarios y periquitos.|Մաքուր սերմեր դեղձանիկների և թութակների համար։;3.60;caja;#e8c75a;#fffbe6
pe1;alimentos;comida-pez,pez,comida;Escamas para peces|Փաթիլներ ձկների համար;Alimento en escamas para peces tropicales.|Փաթիլավոր կեր արևադարձային ձկների համար։;4.90;bote;#e58a6f;#fff0ea
sn1;alimentos;premio-perro,perro,comida;Galletas de premio|Խրախուսիչ թխվածքներ;Galletas crujientes para premiar a tu perro.|Խրթխրթան թխվածքներ՝ շանը խրախուսելու համար։;3.90;caja;#c77f93;#fff0f4
pl1;juguetes;pelota,juguete,perro;Pelota de goma|Ռետինե գնդակ;Rebota mucho y flota en el agua.|Լավ ցատկում է և լողում ջրի վրա։;4.50;pelota;#e0719a;#fff
pl2;juguetes;pelota,juguete,perro;Pelota sonora|Ձայնային գնդակ;Hace ruido cuando el perro la muerde.|Ձայն է հանում, երբ շունը կծում է։;6.90;pelota;#7d9fd1;#fff
hu1;juguetes;hueso,juguete,perro;Hueso de goma|Ռետինե ոսկոր;Resistente: ideal para perros que muerden mucho.|Ամուր է, հարմար է շատ կծող շների համար։;5.80;hueso;#f0e0c8;#fff
cu1;juguetes;cuerda,juguete,perro;Cuerda trenzada|Հյուսված պարան;Para tirar y jugar juntos. Limpia los dientes.|Քաշելու և միասին խաղալու համար։ Մաքրում է ատամները։;5.20;cuerda;#d98fa8;#8fb6d9
ra1;juguetes;raton,juguete,gato;Ratón de peluche|Փափուկ մկնիկ;Un ratón suave que huele a hierba gatera.|Փափուկ մկնիկ, որը կատվախոտի հոտ ունի։;3.20;raton;#a9a3b5;#f3c4d0
rs1;juguetes;rascador,juguete,gato;Rascador|Ճանկոց;Poste de cuerda para que el gato no arañe el sofá.|Պարանապատ սյուն, որ կատուն բազմոցը չճանկռի։;24.90;rascador;#d8c1a0;#e7d9ea
tu1;juguetes;tunel,juguete,conejo,hamster;Túnel de madera|Փայտե թունել;Un escondite natural para roedores y conejos.|Բնական թաքստոց կրծողների և ճագարների համար։;7.50;caja;#b98a5c;#fff
ru1;juguetes;rueda,juguete,hamster;Rueda silenciosa|Անաղմուկ անիվ;Tu hámster correrá de noche sin despertarte.|Գերմանամուկդ գիշերը կվազի՝ առանց քեզ արթնացնելու։;8.40;rueda;#b7a0dc;#fff
cp1;juguetes;columpio,juguete,pajaro;Columpio para pájaros|Ճոճանակ թռչունների համար;De madera, con campanilla.|Փայտե, զանգակով։;4.80;rueda;#d9a860;#f4e1c1
ca1;accesorios;collar,collar-azul,azul,perro;Collar azul|Կապույտ վզնոց;Collar de nailon ajustable para perro mediano.|Կարգավորվող նեյլոնե վզնոց միջին չափի շան համար։;7.90;collar;#4c74c9;#e6ecff
ca2;accesorios;collar,collar-rojo,rojo,perro;Collar rojo|Կարմիր վզնոց;Collar de cuero con placa para el nombre.|Կաշվե վզնոց անվան պիտակով։;12.50;collar;#c2424f;#f4d28a
ca3;accesorios;collar-gato,collar,gato;Collar rosa para gato|Վարդագույն վզնոց կատվի համար;Ligero, con cascabel y cierre de seguridad.|Թեթև, զանգակով և անվտանգ ճարմանդով։;5.50;collar;#e58fb5;#f4d28a
cr1;accesorios;correa,perro;Correa de paseo|Զբոսանքի թոկ;Mide un metro y medio y tiene el asa acolchada.|Մեկուկես մետր է, բռնակը՝ փափուկ։;9.90;correa;#8a6fb0;#fff
cr2;accesorios;correa,perro;Correa extensible|Երկարացվող թոկ;Se alarga hasta cinco metros.|Երկարում է մինչև հինգ մետր։;15.90;correa;#3f5e78;#fff
cm1;accesorios;cama,perro,gato;Cama suave|Փափուկ անկողին;Cama redonda y lavable para perros y gatos.|Կլոր, լվացվող անկողին շների և կատուների համար։;19.90;cama;#d9a7bd;#fbeef3
cn1;accesorios;cuenco,perro,gato;Cuenco de acero|Պողպատե աման;No se oxida y es fácil de lavar.|Չի ժանգոտում և հեշտ է լվացվում։;4.60;cuenco;#c5cbd3;#8f98a5
cn2;accesorios;cuenco,perro,gato;Cuenco de cerámica|Կերամիկական աման;Pesado y elegante: no se mueve mientras comen.|Ծանր և նրբագեղ․ չի շարժվում ուտելիս։;8.20;cuenco;#e9c7d3;#ffffff
tr1;accesorios;transportin,gato,perro;Transportín|Տեղափոխման տուփ;Para viajar con tu gato de forma segura.|Կատվիդ հետ անվտանգ ճամփորդելու համար։;22.50;transportin;#b6a5cf;#f5eefc
ja1;accesorios;jaula,hamster,pajaro;Jaula grande|Մեծ վանդակ;Con mucho espacio y una puerta amplia.|Շատ տարածքով և լայն դռնով։;34.90;jaula;#e2e2ea;#c9a6c9
ch1;higiene;champu,perro,gato;Champú para mascotas|Շամպուն ընտանի կենդանիների համար;Con avena. No irrita los ojos.|Վարսակով։ Չի գրգռում աչքերը։;6.80;bote;#a7c9b8;#f4fff8
ch2;higiene;champu,perro,gato;Champú suave prémium|Նուրբ պրեմիում շամպուն;Para pieles sensibles, con aloe.|Զգայուն մաշկի համար, ալոեով։;10.90;bote;#d4b5d9;#fff
cb1;higiene;cepillo,perro,gato;Cepillo para el pelo|Մազերի խոզանակ;Elimina el pelo muerto sin hacer daño.|Հեռացնում է թափված մազերը՝ առանց ցավեցնելու։;7.20;cepillo;#d58aa6;#fff
cd1;higiene;cepillo-dientes,perro;Cepillo de dientes|Ատամի խոզանակ;Para cuidar los dientes de tu perro.|Շանդ ատամները խնամելու համար։;3.50;cepillo;#7fb5c9;#fff
ar1;higiene;arena,gato;Arena para gatos|Ավազ կատուների համար;Absorbe bien y controla el olor. Cinco kilos.|Լավ ներծծում է և վերացնում հոտը։ Հինգ կիլոգրամ։;6.40;bolsa;#8ea5b8;#f1f7fb
vi1;higiene;viruta,hamster,conejo;Lecho de papel|Թղթե ցամքար;Suave y sin polvo, para jaulas.|Փափուկ և առանց փոշու՝ վանդակների համար։;5.10;bolsa;#e6d5c0;#fff
to1;higiene;toallitas,perro,gato;Toallitas limpiadoras|Մաքրող անձեռոցիկներ;Perfectas para limpiar las patas después del paseo.|Հիանալի են զբոսանքից հետո թաթերը մաքրելու համար։;3.30;caja;#b7d3e8;#fff
ac1;acuarios;acuario,pez;Acuario de 20 litros|20 լիտրանոց ակվարիում;Pequeño, con luz LED incluida.|Փոքր, LED լույսով։;39.90;acuario;#8ec6d8;#d5f0f5
ac2;acuarios;acuario,pez;Acuario de 60 litros|60 լիտրանոց ակվարիում;Grande, con filtro y tapa.|Մեծ, ֆիլտրով և կափարիչով։;74.90;acuario;#6ba9c4;#d5f0f5
fi1;acuarios;filtro,pez;Filtro de agua|Ջրի ֆիլտր;Mantiene el agua limpia y con oxígeno.|Ջուրը պահում է մաքուր և թթվածնով հարուստ։;14.50;bote;#4f6a80;#dfeaf2
pt1;acuarios;planta,pez;Planta acuática|Ջրային բույս;Planta natural que necesita poca luz.|Բնական բույս, որին քիչ լույս է պետք։;4.10;planta;#5f9e6b;#8a6a4a
gr1;acuarios;grava,pez;Grava de colores|Գունավոր խիճ;Un kilo de piedras pequeñas para decorar.|Մեկ կիլոգրամ մանր քարեր՝ զարդարելու համար։;5.60;bolsa;#c9a1d2;#fff
te1;acuarios;termometro,pez;Termómetro|Ջերմաչափ;Controla la temperatura del agua.|Հսկում է ջրի ջերմաստիճանը։;6.20;caja;#e88f8f;#fff
`;
export const PRODUCTS: Product[] = RAW.trim().split('\n').map((l) => {
  const [id, dept, tags, name, desc, price, shape, c, c2] = l.split(';');
  return { id, dept, tags: tags.split(','), name, desc, price: Number(price), shape: shape as Shape, c, c2 };
});
export const P: Record<string, Product> = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
export const withTag = (t: string) => PRODUCTS.filter((p) => p.tags.includes(t));
export interface Dept { id: string; name: Bi; info: Bi; npc?: string; animals?: string[]; sfx?: string; icon: string; color: string }
export const DEPTS: Dept[] = [
  { id: 'perros', icon: '🐕', color: '#d9a27e', npc: 'marcos', animals: ['golden', 'collie', 'labrador'], sfx: 'perro', name: 'Perros|Շներ', info: 'El perro es un animal social: necesita compañía, ejercicio y mucho cariño.|Շունը սոցիալական կենդանի է․ նրան պետք են ընկերակցություն, շարժում և շատ սեր։' },
  { id: 'gatos', icon: '🐈', color: '#d793ab', npc: 'elena', animals: ['tabby', 'gris', 'siames'], sfx: 'gato', name: 'Gatos|Կատուներ', info: 'El gato es independiente y muy limpio. Duerme hasta dieciséis horas al día.|Կատուն անկախ է և շատ մաքուր։ Օրական քնում է մինչև տասնվեց ժամ։' },
  { id: 'peces', icon: '🐠', color: '#7fa6bf', npc: 'diego', animals: ['dorado', 'betta'], sfx: 'pez', name: 'Peces|Ձկներ', info: 'Los peces respiran por las branquias y perciben las vibraciones del agua.|Ձկները շնչում են խռիկներով և զգում են ջրի թրթռումները։' },
  { id: 'pajaros', icon: '🦜', color: '#8fb58a', npc: 'ines', animals: ['loro', 'canario'], sfx: 'pajaro', name: 'Pájaros|Թռչուններ', info: 'Muchos pájaros cantan para comunicarse, y los loros pueden imitar palabras.|Շատ թռչուններ երգում են հաղորդակցվելու համար, իսկ թութակները կարող են բառեր կրկնել։' },
  { id: 'conejos', icon: '🐇', color: '#c9b3a0', npc: 'ines', animals: ['conejoblanco', 'conejomarron'], sfx: 'conejo', name: 'Conejos|Ճագարներ', info: 'Los conejos comen heno todo el día porque sus dientes nunca dejan de crecer.|Ճագարներն ամբողջ օրը խոտ են ուտում, քանի որ նրանց ատամները միշտ աճում են։' },
  { id: 'hamsteres', icon: '🐹', color: '#e0b36a', npc: 'ines', animals: ['hamster', 'hamstergris'], sfx: 'hamster', name: 'Hámsteres|Գերմանամկներ', info: 'El hámster es nocturno y guarda comida en las mejillas.|Գերմանամուկը գիշերային է և կերը պահում է այտերում։' },
  { id: 'alimentos', icon: '🥣', color: '#c98b6b', npc: 'lucia', name: 'Alimentos|Կերեր', info: 'Aquí encontrarás comida seca, comida húmeda y premios.|Այստեղ կգտնես չոր կեր, խոնավ կեր և խրախուսանքներ։' },
  { id: 'juguetes', icon: '🎾', color: '#e0719a', npc: 'lucia', name: 'Juguetes|Խաղալիքներ', info: 'Jugar mantiene a los animales sanos y felices.|Խաղը կենդանիներին պահում է առողջ և երջանիկ։' },
  { id: 'accesorios', icon: '🎀', color: '#9d86c4', npc: 'lucia', name: 'Accesorios|Պարագաներ', info: 'Collares, correas, camas, cuencos y todo lo que necesita tu mascota.|Վզնոցներ, թոկեր, անկողիններ, ամաններ և այն ամենը, ինչ պետք է քո կենդանուն։' },
  { id: 'higiene', icon: '🧴', color: '#8fbfae', npc: 'elena', name: 'Productos de higiene|Հիգիենայի միջոցներ', info: 'Una mascota limpia es una mascota sana.|Մաքուր կենդանին առողջ կենդանի է։' },
  { id: 'acuarios', icon: '🫧', color: '#6ba9c4', npc: 'diego', name: 'Acuarios|Ակվարիումներ', info: 'Un acuario necesita filtro, luz, plantas y agua a la temperatura adecuada.|Ակվարիումին պետք են ֆիլտր, լույս, բույսեր և համապատասխան ջերմաստիճանի ջուր։' },
  { id: 'caja', icon: '💶', color: '#d8a3b5', npc: 'carmen', name: 'Caja|Դրամարկղ', info: 'Aquí puedes pagar tus compras.|Այստեղ կարող ես վճարել գնումների համար։' },
];
export const DEPT: Record<string, Dept> = Object.fromEntries(DEPTS.map((d) => [d.id, d]));
export interface AnimalInfo { id: string; kind: 'perro' | 'gato' | 'conejo' | 'hamster' | 'pajaro' | 'pez'; name: Bi; pet: string; fact: Bi }
export const ANIMALS: AnimalInfo[] = [
  { id: 'golden', kind: 'perro', pet: 'Canela', name: 'Golden retriever|Գոլդեն ռետրիվեր', fact: 'Canela es una cachorra cariñosa a la que le encanta nadar.|Կանելան քնքուշ լակոտ է, որը սիրում է լողալ։' },
  { id: 'collie', kind: 'perro', pet: 'Nube', name: 'Border collie|Բորդեր կոլի', fact: 'Nube es muy inteligente: aprende una orden nueva cada semana.|Նուբեն շատ խելացի է․ ամեն շաբաթ նոր հրաման է սովորում։' },
  { id: 'labrador', kind: 'perro', pet: 'Moka', name: 'Labrador chocolate|Շոկոլադագույն լաբրադոր', fact: 'Moka fue adoptado el año pasado y ahora ayuda a personas mayores.|Մոկան որդեգրվել է անցյալ տարի և հիմա օգնում է տարեցներին։' },
  { id: 'tabby', kind: 'gato', pet: 'Tigre', name: 'Gato atigrado|Զոլավոր կատու', fact: 'Tigre ronronea cuando alguien le acaricia la cabeza.|Տիգրեն մռմռում է, երբ շոյում են նրա գլուխը։' },
  { id: 'gris', kind: 'gato', pet: 'Luna', name: 'Gata gris|Մոխրագույն կատու', fact: 'Luna prefiere los lugares altos para observarlo todo.|Լունան նախընտրում է բարձր տեղերը՝ ամեն ինչ դիտելու համար։' },
  { id: 'siames', kind: 'gato', pet: 'Cleo', name: 'Gata siamesa|Սիամական կատու', fact: 'Cleo tiene los ojos azules y es muy habladora.|Կլեոն կապույտ աչքեր ունի և շատ շատախոս է։' },
  { id: 'conejoblanco', kind: 'conejo', pet: 'Algodón', name: 'Conejo blanco|Սպիտակ ճագար', fact: 'Algodón salta de alegría cuando ve hierba fresca.|Ալգոդոնն ուրախությունից ցատկում է, երբ թարմ խոտ է տեսնում։' },
  { id: 'conejomarron', kind: 'conejo', pet: 'Avellana', name: 'Conejo marrón|Շագանակագույն ճագար', fact: 'Avellana mueve la nariz más de cien veces por minuto.|Ավելյանան րոպեում հարյուր անգամից ավելի շարժում է քիթը։' },
  { id: 'hamster', kind: 'hamster', pet: 'Pepito', name: 'Hámster dorado|Ոսկեգույն գերմանամուկ', fact: 'Pepito corre varios kilómetros cada noche en su rueda.|Պեպիտոն ամեն գիշեր մի քանի կիլոմետր է վազում իր անիվում։' },
  { id: 'hamstergris', kind: 'hamster', pet: 'Pizca', name: 'Hámster ruso|Ռուսական գերմանամուկ', fact: 'Pizca es tan pequeña que cabe en la palma de la mano.|Պիսկան այնքան փոքր է, որ տեղավորվում է ափի մեջ։' },
  { id: 'loro', kind: 'pajaro', pet: 'Kiwi', name: 'Loro verde|Կանաչ թութակ', fact: 'Kiwi sabe decir «buenos días» en tres idiomas.|Կիվին գիտի երեք լեզվով «բարի լույս» ասել։' },
  { id: 'canario', kind: 'pajaro', pet: 'Sol', name: 'Canario|Դեղձանիկ', fact: 'Sol canta mejor por la mañana, cuando hay luz.|Սոլն ավելի լավ է երգում առավոտյան, երբ լույս կա։' },
  { id: 'dorado', kind: 'pez', pet: 'Burbuja', name: 'Pez dorado|Ոսկե ձկնիկ', fact: 'Burbuja reconoce a la persona que le da de comer.|Բուրբուխան ճանաչում է իրեն կերակրողին։' },
  { id: 'betta', kind: 'pez', pet: 'Zafiro', name: 'Pez betta|Բետտա ձուկ', fact: 'Zafiro debe vivir solo porque es muy territorial.|Սաֆիրոն պետք է միայնակ ապրի, քանի որ շատ տարածքային է։' },
];
export const A: Record<string, AnimalInfo> = Object.fromEntries(ANIMALS.map((a) => [a.id, a]));
