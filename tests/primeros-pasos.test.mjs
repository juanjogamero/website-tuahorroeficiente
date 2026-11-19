import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=src('pages/index.astro');
const css=src('styles/primeros-pasos.css');
const layout=src('layouts/BaseLayout.astro');

test('dos rutas gratuitas entre los casos fotográficos y las categorías',()=>{
 const photos=home.indexOf('<section class="rf-showcase rf-section"');
 const routes=home.indexOf('<section class="rf-pathways rf-section"');
 const faq=home.indexOf('<section class="rf-faq rf-section');
 assert.ok(photos>=0&&routes>photos&&faq>routes);
 assert.equal((home.slice(photos,routes).match(/<\/section>/g)||[]).length,1);
 assert.match(home,/aria-labelledby="rf-pathways-title"/);
});
test('existen solo dos tarjetas y enlazan a directorios publicados',()=>{
 const s=home.split('<section class="rf-pathways')[1].split('</section>')[0];
 assert.equal((s.match(/class="rf-pathways-card"/g)||[]).length,2);
 assert.match(s,/href="\/herramientas\/"/);
 assert.match(s,/href="\/comparativas\/"/);
 assert.match(s,/CALCULA TU CONSUMO/);
 assert.match(s,/COMPARA ALTERNATIVAS/);
 assert.match(s,/Gratis|contratar nada/i);
 assert.doesNotMatch(s, /(?:€\s*\d+|\$\s*\d+|plan de pago|suscri(?:pción|bir))/i);
});
test('la maqueta contiene retícula 3 columnas y adapata a 2 y 1 sin overflow',()=>{
 assert.match(css,/grid-template-columns: minmax\(0, \.95fr\) minmax\(0, 1\.04fr\) minmax\(0, 1\.04fr\)/);
 assert.match(css,/@media \(max-width: 1080px\)/);
 assert.match(css,/grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
 assert.match(css,/@media \(max-width: 680px\)/);
 assert.match(css,/grid-template-columns: minmax\(0, 1fr\)/);
 assert.match(css,/min-width: 0/);
 assert.match(css,/min-height: 48px/);
});
test('hoja aislada tras estilos de casos y botones accesibles',()=>{
 assert.ok(layout.indexOf("primeros-pasos.css")>layout.indexOf("casos-fotograficos.css"));
 assert.match(css,/:focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
});
