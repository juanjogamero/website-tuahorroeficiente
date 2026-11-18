import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const file = rel => readFileSync(new URL('../src/' + rel, import.meta.url), 'utf8');
const header = file('components/Header.astro');
const home = file('pages/index.astro');
const css = file('styles/presentacion-editorial.css');
const layout = file('layouts/BaseLayout.astro');

test('el header usa tres flechas CSS que no dependen de glifos del navegador', () => {
  assert.equal((header.match(/class="rf-chevron" aria-hidden="true"/g) ?? []).length, 3);
  assert.doesNotMatch(header, /⌄/);
  assert.match(css, /border-right: 1\.6px solid currentColor/);
  assert.match(css, /border-bottom: 1\.6px solid currentColor/);
});
test('la sección editorial sigue inmediatamente a las referencias con margen controlado', () => {
  assert.ok(home.indexOf('class="rf-trust rf-container"') < home.indexOf('class="rf-intro rf-container"'));
  assert.match(css, /\.rf-trust\.rf-container \{ padding-bottom: 8px; \}/);
  assert.match(css, /padding-top: 30px/);
  assert.match(css, /width: min\(968px, calc\(100% - 56px\)\)/);
});
test('tres tarjetas y datos reales del proyecto se conservan', () => {
  const intro = home.split('<section class="rf-intro')[1].split('</section>')[0];
  assert.match(intro, /18 €/);
  assert.match(intro, /2,4 m³/);
  assert.equal((intro.match(/class="rf-bento /g) ?? []).length, 3);
  assert.match(css, /min-height: 292px/);
  assert.match(css, /grid-template-columns: 1fr/);
});
test('el CSS editorial se carga al final, sobre los estilos históricos', () => {
  assert.ok(layout.indexOf('presentacion-editorial.css') > layout.indexOf('cabecera-referencias.css'));
});
