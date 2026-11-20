/**
 * Casa virtual: modelos aritméticos puros, sin tarifas externas ni datos personales.
 * Todos los valores iniciales son ejemplos didácticos, no mediciones o precios de mercado.
 */
export type RoomId = 'salon'|'cocina'|'bano'|'dormitorio';
export type DeviceId = 'radiador'|'standby'|'frigorifico'|'horno'|'ducha'|'aire';
export type Field = {key:string;label:string;unit:string;defaultValue:number;min:number;max:number;step:number;hint:string};
export type VirtualDevice = {
 id:DeviceId; room:RoomId; label:string;short:string;icon:string;description:string;
 recommendation:string;assumptions:string[];formula:string;learnMore:string;fields:Field[];
};
export type ScenarioResult = {
 currentAnnual:number; alternativeAnnual:number; differenceAnnual:number;
 currentKwh?:number;alternativeKwh?:number;
 currentLitres?:number;alternativeLitres?:number;
 paybackYears?:number|null;
 explanation:string;
};
const f=(key:string,label:string,unit:string,defaultValue:number,min:number,max:number,step:number,hint:string):Field=>({key,label,unit,defaultValue,min,max,step,hint});
const price=f('price','Precio variable de la electricidad','€/kWh',0.20,0,3,.01,'Valor de ejemplo: introduce el de tu contrato.');
export const rooms:{id:RoomId;name:string;intro:string;number:string}[]=[
 {id:'salon',name:'Salón',intro:'Calefacción y consumos invisibles',number:'01'},
 {id:'cocina',name:'Cocina',intro:'Frío constante y preparación de alimentos',number:'02'},
 {id:'bano',name:'Baño',intro:'Agua y energía para calentarla',number:'03'},
 {id:'dormitorio',name:'Dormitorio',intro:'Confort y refrigeración estacional',number:'04'}
];
export const virtualDevices:VirtualDevice[]=[
 {
  id:'radiador',room:'salon',label:'Radiador eléctrico',short:'Calefacción',icon:'♨',
  description:'Comprueba el gasto variable de un radiador según potencia, horas y funcionamiento del termostato. La alternativa representa otro supuesto de funcionamiento, no el mismo confort asegurado.',
  recommendation:'Antes de reducir horas, revisa aislamiento, consigna y confort. Si cambias de sistema, compara siempre el mismo calor útil.',
  assumptions:['Los dos porcentajes son hipótesis de funcionamiento y no medidas reales.','La simulación no incluye potencia contratada ni impuestos.','Menor consumo puede significar menos calor aportado; no se garantiza mismo confort.'],
  formula:'Coste anual = (W ÷ 1.000) × h/día × días × factor de uso × €/kWh.',
  learnMore:'/herramientas/cuanto-gasta-radiador-electrico/',
  fields:[f('watts','Potencia eléctrica','W',1500,0,5000,100,'Potencia eléctrica nominal del equipo.'),f('hours','Uso diario','h/día',3,0,24,.5,'Horas en los días de calefacción.'),f('days','Días de calefacción','días/año',120,0,366,1,'No se supone el mismo uso durante todo el año.'),f('factor','Funcionamiento actual','%',80,0,100,5,'Tiempo equivalente a plena potencia.'),f('altFactor','Escenario alternativo','%',60,0,100,5,'Hipótesis alternativa, no ahorro garantizado.'),price]
 },
 {
  id:'standby',room:'salon',label:'Consumo en espera',short:'Aparatos en standby',icon:'◌',
  description:'Estima cuánto puede sumar el consumo en espera de varios dispositivos durante un año.',
  recommendation:'Mide los vatios reales con un medidor de enchufe y desconecta equipos solo cuando sea compatible con su funcionamiento.',
  assumptions:['Supone consumo constante durante las horas indicadas.','No se recomienda apagar equipos que necesiten funcionar de forma continua, como routers si se necesitan o equipos de seguridad.'],
  formula:'Coste anual = (W × aparatos ÷ 1.000) × h/día × días/año × €/kWh.',
  learnMore:'/herramientas/calculadora-consumo-standby/',
  fields:[f('watts','Consumo en espera actual','W/aparato',4,0,150,1,'Ejemplo por dispositivo; mide si es posible.'),f('altWatts','Consumo alternativo','W/aparato',1,0,150,1,'Escenario de menor consumo.'),f('units','Número de aparatos','ud.',3,1,30,1,'Equipos con consumo similar.'),f('hours','Horas diarias en espera','h/día',18,0,24,1,'No contabilices las horas de uso activo.'),f('days','Días al año','días',365,0,366,1,'Días en los que permanecen en espera.'),price]
 },
 {
  id:'frigorifico',room:'cocina',label:'Frigorífico antiguo o nuevo',short:'Cambio de aparato',icon:'❄',
  description:'Compara el consumo anual de dos frigoríficos y calcula un plazo simple de recuperación de una compra hipotética.',
  recommendation:'Busca kWh/año en la etiqueta del modelo nuevo y mide el consumo del antiguo cuando sea posible. La compra no compensa automáticamente.',
  assumptions:['Los kWh/año son escenarios editables: no representan marcas concretas.','La amortización simple no incluye reparación, financiación ni vida útil.','La energía de etiqueta se obtiene bajo condiciones de ensayo.'],
  formula:'Diferencia anual = (kWh/año anterior − nuevo) × €/kWh; retorno simple = precio de compra ÷ diferencia positiva.',
  learnMore:'/herramientas/cuanto-gasta-frigorifico/',
  fields:[f('oldKwh','Consumo actual','kWh/año',360,0,2000,10,'Prioriza un valor medido o una estimación documentada.'),f('newKwh','Consumo de la alternativa','kWh/año',180,0,2000,10,'Dato de etiqueta del modelo que estés considerando.'),f('purchase','Coste de adquirirla','€',600,0,10000,25,'Coste adicional asumido para el cambio.'),price]
 },
 {
  id:'horno',room:'cocina',label:'Horno o freidora de aire',short:'Cocina por raciones',icon:'◫',
  description:'Compara la energía de una preparación equivalente, incluyendo el número de tandas necesarias en la alternativa.',
  recommendation:'Para familias numerosas comprueba si necesitas varias tandas. Compara kWh por receta completa, no vatios de placa.',
  assumptions:['Los kWh por cocción son ejemplos, no ensayos propios.','No incluye precio de compra ni diferencias de capacidad.','Debe cocinarse la misma cantidad de alimentos con un resultado comparable.'],
  formula:'Coste anual = kWh/cocción × tandas × preparaciones/semana × 52 × €/kWh.',
  learnMore:'/comparativas/freidora-aire-vs-horno/',
  fields:[f('ovenKwh','Horno por preparación','kWh',1.2,0,10,.1,'Energía total medida o estimada de una preparación.'),f('airKwh','Freidora por tanda','kWh',.7,0,10,.1,'Incluye precalentamiento si es necesario.'),f('batches','Tandas de freidora','tandas',1,1,8,1,'Suma las tandas para cocinar la misma cantidad.'),f('uses','Preparaciones por semana','veces',3,0,28,1,'Frecuencia de esta receta a lo largo del año.'),price]
 },
 {
  id:'ducha',room:'bano',label:'Ducha y agua caliente',short:'Agua + calentamiento',icon:'◍',
  description:'Separa el coste variable del agua y saneamiento de la energía necesaria para calentarla; compara dos duraciones.',
  recommendation:'Mide tu caudal con un recipiente y compara dos duraciones realistas. Ajusta tarifas municipales, temperatura y rendimiento.',
  assumptions:['Cálculo aproximado para calentamiento eléctrico: con gas hay que modelar un coste energético adecuado.','No incluye cuotas fijas, bloques de consumo, impuestos ni pérdidas en tuberías.','La temperatura mezclada y el caudal pueden variar durante la ducha.'],
  formula:'Litros = L/min × minutos; €/ducha = litros × [(agua+saneamiento)/1.000 + (ΔT × 0,001163 ÷ rendimiento) × €/kWh].',
  learnMore:'/herramientas/calculadora-gasto-ducha/',
  fields:[f('flow','Caudal del cabezal','L/min',9,0,35,.5,'Mídelo en el ajuste que utilizas normalmente.'),f('minutes','Duración actual','minutos',8,0,60,1,'Minutos con el agua corriendo.'),f('altMinutes','Duración alternativa','minutos',5,0,60,1,'Comparación hipotética.'),f('uses','Duchas por semana','veces',7,0,70,1,'Suma las duchas del hogar incluidas en el escenario.'),f('water','Precio variable del agua','€/m³',1.5,0,30,.1,'Utiliza el importe variable de tu recibo local.'),f('sewer','Saneamiento variable','€/m³',.5,0,30,.1,'Introduce 0 si no corresponde.'),f('delta','Aumento de temperatura','°C',22,0,70,1,'Temperatura del agua de uso menos la de entrada.'),f('eff','Rendimiento calentamiento','%',90,1,100,5,'Para una resistencia eléctrica ideal sin pérdidas, 100 %.'),price]
 },
 {
  id:'aire',room:'dormitorio',label:'Aire acondicionado',short:'Refrigeración',icon:'✳',
  description:'Estudia el consumo variable de un equipo de aire acondicionado al variar la carga media de funcionamiento.',
  recommendation:'Busca la potencia eléctrica absorbida, no la potencia de refrigeración. La carga media depende de clima, consigna y aislamiento.',
  assumptions:['Porcentaje de funcionamiento equivalente, no un rendimiento SEER ni una predicción climática.','Modificar la carga puede implicar un nivel de confort diferente.','No incluye inversión, mantenimiento ni potencia contratada.'],
  formula:'Coste estacional = kW eléctricos × horas/día × días × factor de carga × €/kWh.',
  learnMore:'/herramientas/cuanto-gasta-aire-acondicionado/',
  fields:[f('kw','Potencia eléctrica de entrada','kW',1,0,8,.1,'No introduzcas capacidad frigorífica.'),f('hours','Uso diario','h/día',4,0,24,.5,'Media de los días con uso.'),f('days','Días de temporada','días',90,0,366,1,'Días de uso dentro del año.'),f('factor','Carga media actual','%',70,0,100,5,'Escenario de consumo medio equivalente.'),f('altFactor','Carga alternativa','%',50,0,100,5,'Escenario a contrastar; no presupone igual confort.'),price]
 }
];

export const deviceById=(id:string)=>virtualDevices.find(device=>device.id===id);
export const defaultValues=(device:VirtualDevice):Record<string,number>=>Object.fromEntries(device.fields.map(input=>[input.key,input.defaultValue]));
const num=(d:VirtualDevice,x:Record<string,number>,key:string):number=>{
 const field=d.fields.find(input=>input.key===key);
 if(!field)throw new Error('Campo desconocido: '+key);
 const value=x[key];
 if(typeof value!=='number'||!Number.isFinite(value)||value<field.min||value>field.max)throw new RangeError(field.label+': indica un valor entre '+field.min+' y '+field.max+'.');
 return value;
};
const rounded=(value:number)=>Math.round(value*1000000)/1000000;
export function evaluateVirtualDevice(id:DeviceId,x:Record<string,number>):ScenarioResult{
 const d=deviceById(id);
 if(!d)throw new Error('Escenario desconocido: '+id);
 // Validar TODOS los campos, incluidos los no empleados en un cálculo concreto.
 d.fields.forEach(field=>num(d,x,field.key));
 const v=(key:string)=>num(d,x,key);
 const p=v('price');
 let current=0, alternative=0, currentKwh:number|undefined,alternativeKwh:number|undefined;
 let currentLitres:number|undefined,alternativeLitres:number|undefined,paybackYears:number|null|undefined;
 let explanation='';
 switch(id){
 case 'radiador':{
  const base=v('watts')/1000*v('hours')*v('days');
  currentKwh=base*v('factor')/100;
  alternativeKwh=base*v('altFactor')/100;
  current=currentKwh*p;alternative=alternativeKwh*p;
  explanation='Diferencia entre dos hipótesis de uso del termostato. No se garantiza el mismo confort.';
  break;
 }
 case 'standby':{
  const base=v('units')*v('hours')*v('days')/1000;
  currentKwh=base*v('watts');
  alternativeKwh=base*v('altWatts');
  current=currentKwh*p; alternative=alternativeKwh*p;
  explanation='Escenario de potencia constante durante las horas declaradas.';
  break;
 }
 case 'frigorifico':{
  currentKwh=v('oldKwh');alternativeKwh=v('newKwh');
  current=currentKwh*p; alternative=alternativeKwh*p;
  const diff=current-alternative;
  paybackYears=diff>0?v('purchase')/diff:null;
  explanation='El plazo de retorno es simple y solo tiene sentido si los consumos y la compra son comparables.';
  break;
 }
 case 'horno':{
  currentKwh=v('ovenKwh')*v('uses')*52;
  alternativeKwh=v('airKwh')*v('batches')*v('uses')*52;
  current=currentKwh*p; alternative=alternativeKwh*p;
  explanation='El número de tandas puede cambiar qué opción gasta menos para la misma comida.';
  break;
 }
 case 'ducha':{
  const base=v('flow')*v('uses')*52;
  currentLitres=base*v('minutes');
  alternativeLitres=base*v('altMinutes');
  const euroPerL=(v('water')+v('sewer'))/1000+(v('delta')*.001163/(v('eff')/100))*p;
  current=currentLitres*euroPerL;
  alternative=alternativeLitres*euroPerL;
  currentKwh=currentLitres*v('delta')*.001163/(v('eff')/100);
  alternativeKwh=alternativeLitres*v('delta')*.001163/(v('eff')/100);
  explanation='Agua+saneamiento y calentamiento eléctrico; excluye cuotas e impuestos.';
  break;
 }
 case 'aire':{
  const base=v('kw')*v('hours')*v('days');
  currentKwh=base*v('factor')/100;
  alternativeKwh=base*v('altFactor')/100;
  current=currentKwh*p; alternative=alternativeKwh*p;
  explanation='Dos escenarios de carga de un compresor variable; no son ahorros asegurados.';
  break;
 }
 }
 return {
  currentAnnual:rounded(current),alternativeAnnual:rounded(alternative),
  differenceAnnual:rounded(current-alternative),currentKwh,alternativeKwh,
  currentLitres,alternativeLitres,paybackYears,explanation
 };
}
export const formatEur=(value:number)=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
export const formatNumber=(value:number,digits=1)=>new Intl.NumberFormat('es-ES',{maximumFractionDigits:digits}).format(value);
