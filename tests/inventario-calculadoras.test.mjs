import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tools} from '../src/data/tools.ts';
const file=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=file('pages/index.astro'),header=file('components/Header.astro'),comparison=file('pages/comparativas/index.astro');
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
test('índice de comparativas no conserva afirmaciones obsoletas',()=>{
 assert.doesNotMatch(comparison,/están en investigación|modelos de bomba de calor frente a radiadores.*investigación/);
 assert.match(comparison,/bomba de calor frente a radiador/);
 assert.match(comparison,/tools\.filter\(t=>t\.group==='comparativas'\)/);
});
