import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const src = path => readFileSync(new URL('../src/' + path, import.meta.url), 'utf8');
const home = src('pages/index.astro');
const css = src('styles/soluciones-oscuras.css');
const layout = src('layouts/BaseLayout.astro');

test('bloque oscuro aparece inmediatamente tras las cuatro herramientas', () => {
  const services=home.indexOf('class="rf-services rf-section rf-container"');
  const dark=home.indexOf('class="rf-dark-solutions rf-section"');
  const categories=home.indexOf('class="rf-topics rf-section rf-container"');
  assert.ok(services >= 0 && services < dark && dark < categories);
  assert.doesNotMatch(home, /<section class="rf-why rf-section"/);
});
test('cuatro tarjetas temáticas con fotos locales y enlaces de categorías existentes', () => {
  const section=home.split('<section class="rf-dark-solutions')[1].split('</section>')[0];
  assert.equal((section.match(/class="rf-dark-solutions-card"/g)??[]).length,4);
  for (const slug of ['electricidad','climatizacion','agua','electrodomesticos'])
    assert.ok(section.includes('href="/categorias/'+slug+'/";') || section.includes('href="/categorias/'+slug+'/"'));
  assert.equal((section.match(/loading="lazy"/g)??[]).length,4);
  for (const img of ['medidor-consumo.webp','radiador-hogar.webp','ducha-bano.webp','freidora-aire.jpg'])
    assert.ok(section.includes('/images/'+img));
});
test('sticky sin JavaScript y respetando el flujo en tablet y móvil', () => {
  assert.match(css, /@media \(min-width: 1101px\)/);
  assert.match(css, /position: sticky/);
  assert.match(css, /top: clamp\(100px, 13vh, 145px\)/);
  assert.match(css, /@media \(max-width: 1100px\)/);
  assert.match(css, /position: static/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(home, /12M\+|1000\+|\d+% de ahorro/);
});
test('estilos aislados cargados al final del layout sin backend ni nuevas dependencias', () => {
  assert.ok(layout.indexOf("soluciones-oscuras.css") > layout.indexOf("resumen-soluciones.css"));
  assert.match(css, /\.rf-dark-solutions\.rf-section/);
  assert.match(css, /\.rf-dark-solutions-card-body/);
});
