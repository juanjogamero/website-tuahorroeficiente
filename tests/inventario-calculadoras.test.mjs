import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tools} from '../src/data/tools.ts';
const file=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=file('pages/index.astro'),header=file('components/Header.astro'),comparison=file('pages/comparativas/index.astro'),comparisonDetail=file('pages/comparativas/[slug].astro'),editorialData=file('data/comparativas.ts');
test('portada refleja total de herramientas sin números fijos obsoletos',()=>{
 assert.equal(tools.length,15);
 assert.match(home,/import \{tools\} from '\.\.\/data\/tools'/);
 assert.match(home,/<strong>\{tools\.length\}<\/strong><small>herramientas gratis/);
 assert.match(home,/<span>Herramientas disponibles<\/span><strong>\{tools\.length\}<\/strong>/);
 assert.doesNotMatch(home,/<strong>7<\/strong><small>calculadoras gratis/);
});
test('cabecera añade rutas reales nuevas sin eliminar los enlaces principales',()=>{
 for(const url of ['/herramientas/calculadora-consumo-lavadora/','/herramientas/cuanto-gasta-frigorifico/','/comparativas/calculadora-ahorro-bombillas-led/','/comparativas/bomba-calor-vs-radiador-electrico/'])assert.ok(header.includes(url));
 assert.match(header,/href="\/herramientas\/"/);
});
test('las comparativas muestran guías editoriales sin formularios',()=>{
 assert.match(comparison,/cmp-cards/);
 assert.match(editorialData,/bomba de calor frente a radiador/i);
 assert.match(comparisonDetail,/cmp-reading-layout/);
 assert.doesNotMatch(comparison+comparisonDetail,/ToolCalculator|ToolCard|tools\\.filter/);
 assert.equal(tools.filter(t=>t.group==='comparativas').length,0);
});
