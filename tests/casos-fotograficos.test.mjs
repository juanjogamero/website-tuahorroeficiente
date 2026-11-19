import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const file=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=file('pages/index.astro');
const css=file('styles/casos-fotograficos.css');
const layout=file('layouts/BaseLayout.astro');

test('sección fotográfica inmediatamente después de beneficios, antes de categorías',()=>{
 const benefits=home.indexOf('<section class="rf-benefits rf-section"');
 const cases=home.indexOf('<section class="rf-showcase rf-section"');
 const routes=home.indexOf('<section class="rf-pathways rf-section"');
 assert.ok(benefits>=0&&cases>benefits&&routes>cases);
 const between=home.slice(benefits,cases);
 assert.equal((between.match(/<\/section>/g)||[]).length,1);
 assert.doesNotMatch(home,/class="rf-cases rf-section"/);
});
test('tres tarjetas completas enlazan a herramientas existentes, sin clientes ficticios',()=>{
 const cardSection=home.split('<section class="rf-showcase')[1].split('</section>')[0];
 assert.equal((cardSection.match(/class="rf-showcase-card"/g)||[]).length,3);
 for(const link of ['/herramientas/cuanto-gasta-aire-acondicionado/','/herramientas/calculadora-gasto-ducha/','/comparativas/freidora-aire-vs-horno/'])assert.ok(cardSection.includes('href="'+link+'"'));
 for(const img of ['climatizacion-exterior.webp','grifo-agua.webp','horno-cocina.webp'])assert.ok(cardSection.includes('/images/'+img));
 assert.equal((cardSection.match(/class="rf-showcase-arrow"/g)||[]).length,3);
 assert.equal((cardSection.match(/class="rf-showcase-glass"/g)||[]).length,3);
 assert.doesNotMatch(cardSection,/New York|testimonial|clientes satisfechos|\d+% de ahorro/i);
});
test('diseño de tres columnas, cristales y flechas lima con variantes móvil',()=>{
 assert.match(css,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
 assert.match(css,/-webkit-backdrop-filter:blur\(14px\)/);
 assert.match(css,/border-radius:50%/);
 assert.match(css,/@media\(max-width:980px\)/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.match(css,/grid-template-columns:minmax\(0,1fr\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.ok(layout.indexOf("casos-fotograficos.css")>layout.indexOf("beneficios-portada.css"));
});
