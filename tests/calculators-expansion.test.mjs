import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,parseEs} from '../src/lib/calculators.ts';
import {tools,byId,pathOf,sources} from '../src/data/tools.ts';

const eq=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-7,actual+' != '+expected);
const find=(id)=>tools.find(t=>t.id===id);
const fromDefaults=(tool)=>Object.fromEntries(tool.fields.map(f=>[f.key,parseEs(f.value)]));

test('catálogo completo: 15 herramientas con 15 rutas SEO y ejemplos computables',()=>{
 assert.equal(tools.length,15);
 assert.equal(new Set(tools.map(t=>pathOf(t))).size,15);
 assert.equal(new Set(tools.map(t=>t.id)).size,15);
 for(const tool of tools){
   const out=calculate(tool.id,fromDefaults(tool));
   assert.ok(Number.isFinite(out.primary)&&out.primary>=0,'primario '+tool.id);
   assert.ok(out.secondary.every(s=>Number.isFinite(s.value)),'secundarios '+tool.id);
   assert.ok(tool.limits.length>=3&&tool.questions.length>=3&&tool.keyTakeaways.length>=3);
   assert.ok(tool.src.every(src=>Boolean(sources[src])),'fuentes '+tool.id);
   assert.equal(byId(tool.id),tool);
 }
});

test('frigorífico: kWh/año y coste según tarifa',()=>{
 const o=calculate('frigorifico',{energyYear:180,units:1,years:5,price:.20});
 eq(o.primary,36);eq(o.secondary[0].value,3);eq(o.secondary[2].value,180);
});
test('lavadora: dividir etiqueta por 100 y añadir agua y saneamiento',()=>{
 const x={energy100:50,litresCycle:45,cyclesWeek:4,price:.20,water:1.5,sewer:.7};
 const o=calculate('lavadora',x);
 eq(o.primary,.199);eq(o.secondary[0].value,.199*208);eq(o.secondary[1].value,104);
});
test('lavavajillas: precio por ciclo con dos suministros',()=>{
 const o=calculate('lavavajillas',{energy100:75,litresCycle:10,cyclesWeek:5,price:.20,water:1.5,sewer:.7});
 eq(o.primary,.172);eq(o.secondary[2].value,2600);
});
test('secadora: diferencia anual y consumo por 100 ciclos',()=>{
 const o=calculate('secadora',{energy100:175,alternative100:95,cyclesWeek:3,price:.20});
 eq(o.primary,54.6);eq(o.difference,24.96);
});
test('LED: diferencia anual y retorno simple condicionado',()=>{
 const o=calculate('iluminacion',{oldWatts:60,newWatts:8,units:5,hours:4,days:300,price:.2,investment:25});
 eq(o.primary,72);eq(o.difference,62.4);
 assert.match(o.note,/0,4 años/);
 const inverse=calculate('iluminacion',{oldWatts:6,newWatts:10,units:1,hours:4,days:200,price:.2,investment:30});
 assert.ok(inverse.difference<0);assert.match(inverse.note,/No hay retorno positivo/);
});
test('bomba de calor y radiador: misma demanda térmica, SCOP correcto',()=>{
 const o=calculate('bomba-calor',{heat:3000,scop:3,resistance:100,price:.2});
 eq(o.primary,200);eq(o.secondary[0].value,600);eq(o.difference,400);
});
test('fuga: mL/min convertidos en L y m³ anuales',()=>{
 const o=calculate('fuga-agua',{mlMin:30,hours:24,days:365,water:1.5,sewer:.7});
 eq(o.secondary[0].value,15768);eq(o.secondary[1].value,15.768);eq(o.primary,34.6896);
});
test('ventilador: coste en verano sin comparación de confort',()=>{
 const o=calculate('ventilador',{watts:55,hours:8,days:90,units:1,price:.2});
 eq(o.primary,7.92);eq(o.secondary[0].value,39.6);
 assert.match(o.note,/no aportan el mismo enfriamiento/);
});
test('errores de rango: no permitir consumos negativos, SCOP cero ni días fuera de límite',()=>{
 assert.throws(()=>calculate('lavadora',{energy100:-1,litresCycle:5,cyclesWeek:2,price:.2,water:1,sewer:1}),RangeError);
 assert.throws(()=>calculate('bomba-calor',{heat:1000,scop:0,resistance:100,price:.2}),RangeError);
 assert.throws(()=>calculate('fuga-agua',{mlMin:-20,hours:2,days:50,water:1,sewer:1}),RangeError);
 assert.throws(()=>calculate('ventilador',{watts:60,hours:25,days:90,units:1,price:.2}),RangeError);
});
