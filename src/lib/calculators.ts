/** Pure arithmetic: all prices and usage assumptions are supplied, none fetched. */
export type Numbers = Record<string, number>;
export type Outcome = {
  primary: number; primaryLabel: string;
  secondary: { label: string; value: number; unit: 'eur'|'kwh'|'litres'|'m3' }[];
  difference?: number; differenceLabel?: string; note: string;
};
const requireRange=(label:string,v:number,min:number,max:number)=>{if(!Number.isFinite(v)||v<min||v>max)throw new RangeError(`${label}: introduce un valor entre ${min} y ${max}.`);return v;};
export function parseEs(raw: string): number {
  const v=raw.replace(/[\s\u00a0]/g,'');if(!/^[+-]?[\d.,]+$/.test(v))return NaN;
  let n=v;
  if(v.includes(',')&&v.includes('.')) {const decimal=v.lastIndexOf(',')>v.lastIndexOf('.')?',':'.';n=v.split(decimal==='.'?',':'.').join('').replace(decimal,'.');}
  else if(v.includes(','))n=v.replace(',','.');
  else if(/^\d{1,3}(?:\.\d{3}){1,}$/.test(v))n=v.replace(/\./g,'');
  if(!/^[+-]?\d+(?:\.\d+)?$/.test(n))return NaN;
  return Number(n);
}
export const money=(v:number)=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2}).format(v);
export const number=(v:number,digits=2)=>new Intl.NumberFormat('es-ES',{maximumFractionDigits:digits}).format(v);
export const sharedPrice=(x:Numbers)=>requireRange('Precio €/kWh',x.price,0,5);
export function calculate(type:string,x:Numbers):Outcome{
 switch(type){
  case 'electricidad': {
   const w=requireRange('Potencia W',x.watts,0,20000),h=requireRange('Horas por uso',x.hours,0,24),uses=requireRange('Usos/semana',x.uses,0,168),d=requireRange('Funcionamiento %',x.factor,0,100)/100,p=sharedPrice(x);
   const e=(w/1000)*h*d,annual=e*uses*52, cost=annual*p;
   return {primary:cost/12,primaryLabel:'Coste mensual medio',secondary:[{label:'Por uso',value:e*p,unit:'eur'},{label:'Consumo anual',value:annual,unit:'kwh'},{label:'Coste anual',value:cost,unit:'eur'}],note:'Promedio anualizado de 52 semanas y 12 meses. Solo término variable de energía; no es la factura total.'};
  }
  case 'radiador': {
   const w=requireRange('Potencia W',x.watts,0,5000),h=requireRange('Horas al día',x.hours,0,24),days=requireRange('Días por mes',x.days,0,31),months=requireRange('Meses de uso',x.months,0,12),factor=requireRange('Funcionamiento %',x.factor,0,100)/100,p=sharedPrice(x),alt=requireRange('Factor alternativo %',x.altFactor,0,100)/100;
   const monthly=w/1000*h*days*factor*p,year=monthly*months,altYear=w/1000*h*days*alt*months*p;
   return {primary:monthly,primaryLabel:'Coste por mes de uso',secondary:[{label:'kWh por mes de uso',value:w/1000*h*days*factor,unit:'kwh'},{label:'Temporada completa',value:year,unit:'eur'},{label:'Escenario alternativo',value:altYear,unit:'eur'}],difference:year-altYear,differenceLabel:'Diferencia por temporada',note:'El factor de funcionamiento depende del termostato y el aislamiento. La alternativa modifica el factor, no promete igual confort.'};
  }
  case 'aire': {
   const kw=requireRange('Potencia eléctrica kW',x.kw,0,8),h=requireRange('Horas al día',x.hours,0,24),days=requireRange('Días de uso',x.days,0,365),low=requireRange('Factor mínimo %',x.low,0,100)/100,high=requireRange('Factor máximo %',x.high,0,100)/100,p=sharedPrice(x);
   if(low>high)throw new RangeError('El factor mínimo debe ser menor o igual al máximo.');
   const eLow=kw*h*days*low,eHigh=kw*h*days*high;
   return {primary:eLow*p,primaryLabel:'Coste mínimo del escenario',secondary:[{label:'Coste máximo escenario',value:eHigh*p,unit:'eur'},{label:'Consumo mínimo',value:eLow,unit:'kwh'},{label:'Consumo máximo',value:eHigh,unit:'kwh'}],difference:eHigh*p-eLow*p,differenceLabel:'Anchura del rango estimado',note:'Rango de escenarios, no intervalo estadístico ni garantía. Utiliza kW eléctricos de entrada, nunca la potencia frigorífica.'};
  }
  case 'ducha': {
   const flow=requireRange('Caudal L/min',x.flow,0,40),min=requireRange('Minutos',x.minutes,0,120),uses=requireRange('Duchas/semana',x.uses,0,70),water=requireRange('Agua €/m³',x.water,0,30),sewer=requireRange('Saneamiento €/m³',x.sewer,0,30),dt=requireRange('Salto térmico °C',x.delta,0,70),eff=requireRange('Rendimiento %',x.eff,1,100)/100,p=sharedPrice(x),alt=requireRange('Minutos alternativa',x.altMinutes,0,120);
   const per=flow*min,annual=per*uses*52,pricePerL=(water+sewer)/1000+(dt*0.001163/eff)*p;
   return {primary:per*pricePerL,primaryLabel:'Coste variable por ducha',secondary:[{label:'Agua por ducha',value:per,unit:'litres'},{label:'Litros anuales',value:annual,unit:'litres'},{label:'Coste anual',value:annual*pricePerL,unit:'eur'}],difference:(min-alt)*flow*pricePerL*uses*52,differenceLabel:'Diferencia anual frente a la duración alternativa',note:'Suma consumo variable de agua, saneamiento y energía de calentamiento. Sin cuotas fijas, impuestos ni pérdidas en tuberías. Precio eléctrico de ejemplo; no sirve directamente para gas.'};
  }
  case 'termo': {
   const measured=requireRange('kWh al día',x.kwhDay,0,100),alt=requireRange('Alternativa kWh/día',x.altKwhDay,0,100),days=requireRange('Días al año',x.days,0,366),p=sharedPrice(x);
   return {primary:measured*p*days/12,primaryLabel:'Coste mensual medio',secondary:[{label:'Consumo anual',value:measured*days,unit:'kwh'},{label:'Coste anual',value:measured*p*days,unit:'eur'},{label:'Coste alternativa',value:alt*p*days,unit:'eur'}],difference:(measured-alt)*days*p,differenceLabel:'Diferencia anual estimada',note:'Introducir los kWh/día medidos o documentados; no inferimos consumo real del termo a partir de la potencia nominal.'};
  }
  case 'freidora': {
   const oven=requireRange('Horno kWh/ciclo',x.oven,0,15),air=requireRange('Freidora kWh/ciclo',x.air,0,15),uses=requireRange('Cocciones/semana',x.uses,0,35),p=sharedPrice(x);
   const annualA=oven*uses*52*p,annualB=air*uses*52*p;
   return {primary:annualA-annualB,primaryLabel:'Diferencia anual (horno menos freidora)',secondary:[{label:'Horno al año',value:annualA,unit:'eur'},{label:'Freidora al año',value:annualB,unit:'eur'},{label:'Por cocción',value:(oven-air)*p,unit:'eur'}],difference:annualA-annualB,differenceLabel:'Posible diferencia anual',note:'Solo compara preparaciones equivalentes: mismo alimento y número de raciones. Usa kWh/cocción, no potencias máximas nominales.'};
  }
  case 'standby': {
   const w=requireRange('Potencia en espera W',x.watts,0,300),h=requireRange('Horas al día',x.hours,0,24),n=requireRange('Número de aparatos',x.units,0,100),days=requireRange('Días al año',x.days,0,366),p=sharedPrice(x);
   const e=w/1000*h*n*days;
   return {primary:e*p,primaryLabel:'Coste anual en espera',secondary:[{label:'Consumo anual',value:e,unit:'kwh'},{label:'Coste mensual medio',value:e*p/12,unit:'eur'},{label:'Coste diario de uso',value:days?e*p/days:0,unit:'eur'}],note:'Supone potencia en espera constante durante las horas indicadas. Mide los W de standby con un medidor cuando sea posible.'};
  }
  case 'frigorifico': {
   const energy=requireRange('kWh al año',x.energyYear,0,3000),units=requireRange('Número de equipos',x.units,0,30),years=requireRange('Años',x.years,0,30),p=sharedPrice(x);
   const year=energy*units*p;
   return {primary:year,primaryLabel:'Coste variable anual',secondary:[{label:'Coste mensual medio',value:year/12,unit:'eur'},{label:'Consumo anual',value:energy*units,unit:'kwh'},{label:'Coste del periodo',value:year*years,unit:'eur'}],note:'La etiqueta de refrigeración muestra kWh/año en condiciones de ensayo. Uso real y tarifa pueden modificar el resultado.'};
  }
  case 'lavadora':
  case 'lavavajillas': {
   const energy100=requireRange('kWh por 100 ciclos',x.energy100,0,1500),litres=requireRange('Agua por ciclo L',x.litresCycle,0,250),cycles=requireRange('Ciclos por semana',x.cyclesWeek,0,35),water=requireRange('Agua €/m³',x.water,0,30),sewer=requireRange('Saneamiento €/m³',x.sewer,0,30),p=sharedPrice(x);
   const kwh=energy100/100, costEnergy=kwh*p, costWater=litres/1000*(water+sewer), uses=cycles*52;
   return {primary:costEnergy+costWater,primaryLabel:'Coste variable por ciclo',secondary:[{label:'Coste anual',value:(costEnergy+costWater)*uses,unit:'eur'},{label:'Consumo anual de energía',value:kwh*uses,unit:'kwh'},{label:'Agua al año',value:litres*uses,unit:'litres'}],note:'Modelo de etiqueta del programa eco: divide kWh/100 ciclos entre 100. No incluye detergentes, cuotas fijas o consumo de otros programas.'};
  }
  case 'secadora': {
   const e=requireRange('Secadora A kWh/100 ciclos',x.energy100,0,2000),alt=requireRange('Secadora B kWh/100 ciclos',x.alternative100,0,2000),cycles=requireRange('Ciclos por semana',x.cyclesWeek,0,35),p=sharedPrice(x);
   const yearly=cycles*52,annualA=e/100*yearly*p,annualB=alt/100*yearly*p;
   return {primary:annualA,primaryLabel:'Coste anual secadora A',secondary:[{label:'Coste anual secadora B',value:annualB,unit:'eur'},{label:'Coste por ciclo A',value:e/100*p,unit:'eur'},{label:'Consumo anual A',value:e/100*yearly,unit:'kwh'}],difference:annualA-annualB,differenceLabel:'Diferencia A menos B por año',note:'Compara datos de etiquetas nuevas compatibles (kWh/100 ciclos), sin costes de compra ni garantía de igual rendimiento.'};
  }
  case 'iluminacion': {
   const old=requireRange('Bombilla actual W',x.oldWatts,0,500),newW=requireRange('LED W',x.newWatts,0,500),n=requireRange('Número de puntos',x.units,0,300),hours=requireRange('Horas diarias',x.hours,0,24),days=requireRange('Días por año',x.days,0,366),p=sharedPrice(x),investment=requireRange('Coste adicional €',x.investment,0,100000);
   const base=hours*days*n/1000,eA=old*base,eB=newW*base,costA=eA*p,costB=eB*p,diff=costA-costB;
   const amort=diff>0 && investment>0 ? 'Retorno simple hipotético: '+number(investment/diff)+' años.' : diff<=0 ? 'No hay retorno positivo por consumo bajo estos supuestos.' : 'No se ha indicado una inversión adicional.';
   return {primary:costA,primaryLabel:'Coste anual iluminación actual',secondary:[{label:'Coste anual alternativa',value:costB,unit:'eur'},{label:'Consumo anual actual',value:eA,unit:'kwh'},{label:'Consumo anual alternativa',value:eB,unit:'kwh'}],difference:diff,differenceLabel:'Diferencia anual (actual menos alternativa)',note:amort+' Comprueba lúmenes equivalentes. No se modelan vida útil ni costes de mantenimiento.'};
  }
  case 'bomba-calor': {
   const heat=requireRange('Calor útil kWh térmicos',x.heat,0,100000),scop=requireRange('SCOP',x.scop,1,8),res=requireRange('Rendimiento %',x.resistance,1,100)/100,p=sharedPrice(x);
   const pump=heat/scop,resist=heat/res;
   return {primary:pump*p,primaryLabel:'Coste eléctrico de bomba de calor',secondary:[{label:'Radiador: coste variable',value:resist*p,unit:'eur'},{label:'Bomba: electricidad',value:pump,unit:'kwh'},{label:'Radiador: electricidad',value:resist,unit:'kwh'}],difference:(resist-pump)*p,differenceLabel:'Diferencia radiador menos bomba',note:'Supone la misma demanda térmica anual y SCOP elegido por ti. No incluye instalación, mantenimiento ni equivalencia de confort garantizada.'};
  }
  case 'fuga-agua': {
   const ml=requireRange('Caudal mL/min',x.mlMin,0,200000),hours=requireRange('Horas al día',x.hours,0,24),days=requireRange('Días',x.days,0,366),water=requireRange('Agua €/m³',x.water,0,30),sewer=requireRange('Saneamiento €/m³',x.sewer,0,30);
   const daily=ml/1000*60*hours,litres=daily*days,m3=litres/1000;
   return {primary:m3*(water+sewer),primaryLabel:'Coste variable de la fuga en el periodo',secondary:[{label:'Agua perdida',value:litres,unit:'litres'},{label:'Equivalente en m³',value:m3,unit:'m3'},{label:'Litros por día de fuga',value:daily,unit:'litres'}],note:'El caudal debe medirse en mL/min con un recipiente. Tarifa local variable: no incluye cuotas fijas, bloques ni daños.'};
  }
  case 'ventilador': {
   const w=requireRange('Potencia W',x.watts,0,1000),h=requireRange('Horas diarias',x.hours,0,24),days=requireRange('Días',x.days,0,366),units=requireRange('Equipos',x.units,0,30),p=sharedPrice(x);
   const e=w/1000*h*days*units;
   return {primary:e*p,primaryLabel:'Coste variable por temporada',secondary:[{label:'Consumo de temporada',value:e,unit:'kwh'},{label:'Coste por día de uso',value:days?e*p/days:0,unit:'eur'},{label:'Coste de una hora (todos)',value:w/1000*units*p,unit:'eur'}],note:'Potencia de ventiladores a velocidad seleccionada. Un ventilador y el aire acondicionado no aportan el mismo enfriamiento.'};
  }
  default: throw new Error('Herramienta desconocida');
 }
}
