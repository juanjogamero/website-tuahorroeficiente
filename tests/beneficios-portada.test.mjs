import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const get=(p)=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=get('pages/index.astro');
const css=get('styles/beneficios-portada.css');
const layout=get('layouts/BaseLayout.astro');

test('beneficios se ubica justo después del bloque oscuro y antes de categorías',()=>{
 const dark=home.indexOf('class="rf-dark-solutions rf-section"');
 const benefits=home.indexOf('<section class="rf-benefits rf-section"');
 const cases=home.indexOf('<section class="rf-showcase rf-section"');
 assert.ok(dark>=0&&benefits>dark&&cases>benefits);
 const between=home.slice(dark,benefits);
 assert.equal((between.match(/<\/section>/g)??[]).length,1);
 assert.match(home,/aria-labelledby="rf-benefits-title"/);
});
test('fotografía temática del catálogo local y cuatro valores verificables',()=>{
 const block=home.split('<section class="rf-benefits')[1].split('</section>')[0];
 assert.match(block,/src="\/images\/lavanderia\.webp"/);
 assert.match(block,/loading="lazy"/);
 assert.equal((block.match(/class="rf-benefits-item"/g)??[]).length,4);
 assert.equal((block.match(/class="rf-benefits-icon"/g)??[]).length,4);
 for(const heading of ['Datos a tu medida','Fórmulas transparentes','Comparativas útiles','Gratis y sin registro'])
   assert.ok(block.includes(heading));
 assert.doesNotMatch(block,/\b(\d+% de ahorro|clientes satisfechos|ahorros garantizados)\b/i);
});
test('composición visual dos columnas superiores y cuatro ventajas inferiores',()=>{
 assert.match(css,/\.rf-benefits-intro\s*\{[\s\S]*?grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1fr\)/);
 assert.match(css,/\.rf-benefits-grid\s*\{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
 assert.match(css,/aspect-ratio: 2\.05 \/ 1/);
 assert.match(css,/\.rf-benefits-icon\s*\{/);
});
test('adaptación móvil de lectura sencilla y sin animaciones de scroll',()=>{
 assert.match(css,/@media \(max-width: 1050px\)/);
 assert.match(css,/@media \(max-width: 720px\)/);
 assert.match(css,/@media \(max-width: 560px\)/);
 assert.match(css,/grid-template-columns: minmax\(0, 1fr\);/);
 assert.doesNotMatch(css,/animation:|position:\s*sticky|transform:\s*translateY/i);
 assert.ok(layout.indexOf("beneficios-portada.css")>layout.indexOf("soluciones-oscuras.css"));
});
