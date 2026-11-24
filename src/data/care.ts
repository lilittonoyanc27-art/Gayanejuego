import type { Bi } from '../core/bi';
export type Act = 'comer' | 'agua' | 'banar' | 'cepillar' | 'pasear' | 'jugar' | 'limpiar' | 'cama';
export const ACTS: { id: Act; icon: string; b: Bi; how: Bi }[] = [
  { id: 'comer', icon: '🥣', b: 'Dar de comer|Կերակրել', how: 'Mantén pulsado para llenar el cuenco y suelta en la zona verde.|Սեղմած պահիր՝ ամանը լցնելու համար, և բաց թող կանաչ գոտում։' },
  { id: 'agua', icon: '💧', b: 'Dar agua|Ջուր տալ', how: 'Mantén pulsado para servir agua y suelta en la zona verde.|Սեղմած պահիր՝ ջուր լցնելու համար, և բաց թող կանաչ գոտում։' },
  { id: 'banar', icon: '🛁', b: 'Bañar|Լողացնել', how: 'Frota al animal con el dedo o el ratón hasta cubrirlo de espuma.|Շփիր կենդանուն մատով կամ մկնիկով, մինչև փրփրի։' },
  { id: 'cepillar', icon: '🪮', b: 'Cepillar|Խոզանակել', how: 'Pasa el cepillo suavemente sobre el animal.|Խոզանակը մեղմ անցկացրու կենդանու վրայով։' },
  { id: 'pasear', icon: '🦮', b: 'Pasear|Զբոսանքի տանել', how: 'Sigue las indicaciones durante el paseo.|Հետևիր ցուցումներին զբոսանքի ընթացքում։' },
  { id: 'jugar', icon: '🎾', b: 'Jugar|Խաղալ', how: 'Toca el suelo para lanzar la pelota tres veces.|Դիպչիր հատակին՝ գնդակը երեք անգամ նետելու համար։' },
  { id: 'limpiar', icon: '🧹', b: 'Limpiar la jaula|Մաքրել վանդակը', how: 'Toca todas las manchas para limpiarlas.|Դիպչիր բոլոր բծերին՝ մաքրելու համար։' },
  { id: 'cama', icon: '🛏️', b: 'Preparar la cama|Պատրաստել անկողինը', how: 'Coloca los objetos en el orden indicado.|Դասավորիր իրերը նշված հերթականությամբ։' },
];
export const ORDERS: Record<Act, Bi[]> = {
  comer: ['Gayane, {n} tiene hambre. Busca su comida y llena el cuenco.|Գայանե՛, {n}ն քաղցած է։ Գտիր կերը և լցրու ամանը։', 'Es la hora de la comida y {n} te está esperando.|Ուտելու ժամն է, {n}ն քեզ է սպասում։'],
  agua: ['Hace calor y {n} tiene mucha sed. Dale agua fresca.|Շոգ է, {n}ն շատ ծարավ է։ Զով ջուր տուր նրան։', 'El cuenco del agua está vacío. Es importante que {n} beba.|Ջրի ամանը դատարկ է։ Կարևոր է, որ {n}ն խմի։'],
  banar: ['{n} se ha revolcado en el barro. ¡Necesita un buen baño!|{n}ն ցեխի մեջ է թավալվել։ Լավ լոգանք է պետք։', '{n} huele un poco mal. Prepara agua templada y champú.|{n}ն մի քիչ վատ է բուրում։ Պատրաստիր գոլ ջուր և շամպուն։'],
  cepillar: ['El pelo de {n} está lleno de nudos. Péinalo con cuidado.|{n}ի մազերը խճճված են։ Զգուշորեն սանրիր։', 'Para que {n} esté guapo, usa el cepillo suavemente.|Որպեսզի {n}ն գեղեցիկ լինի, մեղմ օգտագործիր խոզանակը։'],
  pasear: ['{n} mira la puerta y mueve la cola. Quiere salir.|{n}ն դռանն է նայում և պոչը շարժում։ Ուզում է դուրս գալ։', '{n} lleva todo el día en casa. Le vendría bien tomar el aire.|{n}ն ամբողջ օրը տանն է։ Լավ կլիներ օդ շնչեր։'],
  jugar: ['{n} está aburrido. Lánzale la pelota.|{n}ն ձանձրանում է։ Գնդակը նետիր նրան։', '{n} tiene mucha energía. ¡Diviértete con él!|{n}ն շատ եռանդ ունի։ Զվարճացիր նրա հետ։'],
  limpiar: ['El suelo donde vive {n} está sucio. Déjalo reluciente.|{n}ի ապրելու տեղը կեղտոտ է։ Փայլեցրու։', 'No quiero que {n} enferme: hay que limpiar su espacio.|Չեմ ուզում, որ {n}ն հիվանդանա․ պետք է մաքրել տեղը։'],
  cama: ['{n} necesita descansar. Prepara un lugar cómodo para dormir.|{n}ին հանգստանալ է պետք։ Քնելու հարմար տեղ պատրաստիր։', 'Ya es de noche y {n} bosteza. Busca algo blando.|Արդեն գիշեր է, {n}ն հորանջում է։ Փափուկ բան գտիր։'],
};
export const FOODS: Record<string, { ok: string; bad: string[] }> = {
  perro: { ok: 'pp1', bad: ['ha1', 'pe1'] }, gato: { ok: 'lg1', bad: ['co1', 'pa1'] }, conejo: { ok: 'co1', bad: ['lg2', 'sn1'] },
  hamster: { ok: 'ha1', bad: ['pg1', 'pe1'] }, pajaro: { ok: 'pa1', bad: ['pp1', 'lg1'] }, pez: { ok: 'pe1', bad: ['co1', 'sn1'] },
};
/** Acciones que tienen sentido para cada especie. */
export const CAN: Record<string, Act[]> = {
  perro: ['comer', 'agua', 'banar', 'cepillar', 'pasear', 'jugar', 'limpiar', 'cama'], gato: ['comer', 'agua', 'cepillar', 'banar', 'jugar', 'limpiar', 'cama'],
  conejo: ['comer', 'agua', 'cepillar', 'jugar', 'limpiar', 'cama'], hamster: ['comer', 'agua', 'jugar', 'limpiar', 'cama'], pajaro: ['comer', 'agua', 'banar', 'jugar', 'limpiar', 'cama'],
};
export const WALK: { b: Bi; ok: string }[] = [
  { b: 'Sigue recto hasta el semáforo.|Ուղիղ գնա մինչև լուսացույցը։', ok: 'recto' }, { b: 'El semáforo está en rojo. Espera.|Լուսացույցը կարմիր է։ Սպասիր։', ok: 'esperar' }, { b: 'Ahora, gira a la izquierda.|Հիմա թեքվիր ձախ։', ok: 'izquierda' },
  { b: 'Toma el camino de la derecha, donde hay sombra.|Գնա աջ ճանապարհով, որտեղ ստվեր է։', ok: 'derecha' }, { b: 'Hay una bicicleta. No cruces todavía.|Հեծանիվ կա։ Դեռ մի՛ անցիր։', ok: 'esperar' }, { b: 'Continúa por la calle sin girar.|Շարունակիր փողոցով՝ առանց թեքվելու։', ok: 'recto' },
  { b: 'Deja el parque a tu derecha y dobla hacia el otro lado.|Այգին թող աջ կողմում և թեքվիր մյուս կողմ։', ok: 'izquierda' }, { b: 'La fuente está a la derecha. ¡Vamos a verla!|Շատրվանը աջ կողմում է։ Գնանք տեսնենք։', ok: 'derecha' },
];
export const BED: { order: string[]; b: Bi }[] = [
  { order: ['cojin', 'manta', 'juguete'], b: 'Primero pon el cojín, luego la manta y, por último, el juguete.|Նախ դիր բարձիկը, հետո՝ ծածկոցը, վերջում՝ խաղալիքը։' },
  { order: ['manta', 'cojin', 'juguete'], b: 'Antes de poner el cojín, coloca la manta. Después añade el juguete.|Բարձիկը դնելուց առաջ դիր ծածկոցը։ Հետո ավելացրու խաղալիքը։' },
  { order: ['cojin', 'juguete', 'manta'], b: 'Cuando hayas puesto el cojín, deja el juguete encima y tápalo con la manta.|Երբ բարձիկը դնես, վրան թող խաղալիքը և ծածկիր ծածկոցով։' },
];
