import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tools,pathOf} from '../src/data/tools.ts';
const get=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const page=get('pages/herramientas/index.astro');
const layout=get('layouts/BaseLayout.astro');
const script=get('scripts/tools-catalog-client.ts');
const css=get('styles/catalogo-calculadoras.css');

test('hub: hero editorial, tres destacadas, catálogo completo y método',()=>{
 for(const part of ['ta-tools-hero','ta-tools-featured','ta-tools-catalog','ta-tools-how','data-tools-catalog','data-catalog-item'])assert.ok(page.includes(part),part);
 assert.equal(tools.length,15);
 assert.match(page,/tools\.map\(\(tool,i\)=>/);
 assert.match(page,/mainEntity:/);
 assert.match(page,/href="\/metodologia\/"/);
});
test('cada nuevo simulador tiene una ruta única a la que enlaza el catálogo',()=>{
 assert.equal(new Set(tools.map(pathOf)).size,15);
 for(const tool of tools)assert.match(pathOf(tool),/^\/(herramientas|comparativas)\/[-a-z]+\/$/);
 assert.match(page,/data-search=\{\[tool\.title,tool\.short/);
});
test('filtros accesibles con reseteo y visualización completa sin JS',()=>{
 for(const x of ['data-tool-search','data-catalog-filter','data-catalog-empty','data-catalog-empty-reset'])assert.ok(page.includes(x));
 assert.match(script,/aria-pressed/);
 assert.match(script,/item\.hidden=/);
 assert.match(script,/toLocaleLowerCase\('es-ES'\)/);
 assert.doesNotMatch(script,/fetch\(|localStorage|sessionStorage|sendBeacon/);
});
test('diseño móvil usable y controles de detalle más legibles',()=>{
 assert.match(css,/@media\(max-width:680px\)/);
 assert.match(css,/\.ta-tools-filter-list\{flex-wrap:nowrap;overflow-x:auto/);
 assert.match(css,/\.ta-tools-catalog-card\[hidden\]\{display:none!important\}/);
 assert.match(css,/\.page-calculator \.field input\{font-size:17px;min-height:53px/);
 assert.match(css,/\.page-calculator \.field label\{font-size:13px/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.ok(layout.indexOf("catalogo-calculadoras.css")>layout.indexOf("pagina-nosotros.css"));
 assert.match(layout,/const isCalculatorPage/);
});
