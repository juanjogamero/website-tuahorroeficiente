import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = path => readFileSync(new URL('../src/' + path, import.meta.url), 'utf8');
const home = source('pages/index.astro');
const styles = source('styles/resumen-soluciones.css');
const layout = source('layouts/BaseLayout.astro');

test('cuatro indicadores reales se sitúan tras las tres tarjetas editoriales', () => {
  const cards = home.indexOf('class="rf-bento-grid"');
  const stats = home.indexOf('class="rf-kpi-grid"');
  const services = home.indexOf('class="rf-services rf-section rf-container"');
  assert.ok(cards >= 0 && cards < stats && stats < services);
  for (const value of ['Calculadoras disponibles','Guías editoriales','Áreas de consumo','Gratis']) assert.ok(home.includes(value));
});
test('el bloque de servicios conserva cuatro herramientas con enlaces internos', () => {
  const services = home.split('<section class="rf-services')[1].split('</section>')[0];
  assert.equal((services.match(/class="rf-service-card"/g)??[]).length, 4);
  assert.equal((services.match(/class="rf-service-link"/g)??[]).length, 4);
  assert.match(services,/\/comparativas\/freidora-aire-vs-horno\//);
});
test('las imágenes editoriales se corresponden con las temáticas', () => {
  assert.match(home,/\/images\/medidor-consumo\.webp/);
  assert.match(home,/\/images\/aire-acondicionado\.webp/);
  assert.match(home,/\/images\/grifo-agua\.webp/);
  assert.match(home,/\/images\/freidora-aire\.jpg/);
});
test('las estadísticas y tarjetas son responsive sin scroll horizontal', () => {
  assert.match(styles,/grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles,/grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles,/grid-template-columns:\s*1fr/);
  assert.match(styles,/min-width:\s*0/);
});
test('la hoja de la sección se aplica al final, después de las capas anteriores', () => {
  assert.ok(layout.indexOf('resumen-soluciones.css')>layout.indexOf('presentacion-editorial.css'));
});

test('los indicadores aumentan su lectura en escritorio y conservan escala móvil', () => {
  assert.match(styles, /font-size: clamp\(40px, 3\.8vw, 60px\)/);
  assert.match(styles, /min-height: 23px;\n  font-size: 14px;/);
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.match(styles, /font-size: 12px; min-height: 36px/);
});
