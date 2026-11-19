import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=src('pages/index.astro');
const css=src('styles/preguntas-frecuentes-portada.css');
const layout=src('layouts/BaseLayout.astro');
const faq=home.split('<section class="rf-faq rf-section rf-container rf-faq-modern"')[1]?.split('</section>')[0]??'';

test('un único FAQ tras las rutas de entrada y antes de categorías',()=>{
 const routes=home.indexOf('<section class="rf-pathways rf-section"');
 const faqs=home.indexOf('<section class="rf-faq rf-section rf-container rf-faq-modern"');
 const topics=home.indexOf('<section class="rf-topics rf-section rf-container"');
 assert.ok(routes>=0 && faqs>routes && topics>faqs);
 assert.equal((home.match(/<section class="rf-faq /g)||[]).length,1);
 assert.equal(home.slice(home.indexOf('</section>',routes)+'</section>'.length,faqs).trim(),'');
});

test('seis preguntas concretas, primera abierta, acordeón nativo accesible',()=>{
 assert.equal((faq.match(/<details name="faq-portada"/g)||[]).length,6);
 assert.equal((faq.match(/<summary>/g)||[]).length,6);
 assert.equal((faq.match(/<details name="faq-portada" open>/g)||[]).length,1);
 assert.equal((faq.match(/class="rf-faq-toggle" aria-hidden="true"/g)||[]).length,6);
 for(const keyword of ['gasto de un aparato','toda mi factura','precio del kWh','coste de una ducha','dos electrodomésticos','sin registro'])
   assert.ok(faq.includes(keyword),keyword);
 assert.match(faq,/href="\/guias\/"/);
});

test('contenido real: estimaciones, tarifas editables y sin promesas de ahorro',()=>{
 for(const phrase of ['potencia contratada','contrato o factura','coste variable del agua','condiciones equivalentes','sin crear una cuenta'])
  assert.ok(faq.includes(phrase),phrase);
 assert.doesNotMatch(faq,/\b(\d+\s*% de ahorro|clientes satisfechos|precios garantizados)\b/i);
});

test('diseño de referencia sin cajas: dos columnas, separadores y responsive',()=>{
 assert.match(css,/grid-template-columns: minmax\(0, \.94fr\) minmax\(0, 1\.06fr\)/);
 assert.match(css,/border-bottom: 1px solid #d7dbda/);
 assert.match(css,/background: transparent/);
 assert.match(css,/\.rf-faq-toggle::before \{ content: '\+'; \}/);
 assert.match(css,/details\[open\] \.rf-faq-toggle::before/);
 assert.match(css,/@media \(max-width: 1000px\)/);
 assert.match(css,/@media \(max-width: 720px\)/);
 assert.match(css,/summary:focus-visible/);
 assert.ok(layout.indexOf("preguntas-frecuentes-portada.css")>layout.indexOf("primeros-pasos.css"));
});
