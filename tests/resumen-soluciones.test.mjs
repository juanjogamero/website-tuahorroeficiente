import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = path => readFileSync(new URL('../src/' + path, import.meta.url), 'utf8');
const home = source('pages/index.astro');
const styles = source('styles/resumen-soluciones.css');
const layout = source('layouts/BaseLayout.astro');

test('cuatro indicadores reales siguen después de la presentación editorial', () => {
  const cards = home.indexOf('class="rf-bento-grid"');
  const stats = home.indexOf('class="rf-kpi-grid"');
  const dark = home.indexOf('class="rf-dark-solutions rf-section"');
  assert.ok(cards >= 0 && cards < stats && stats < dark);
  for (const value of ['Calculadoras disponibles','Guías editoriales','Áreas de consumo','Gratis'])
    assert.ok(home.includes(value));
});

test('se retiran exclusivamente las cuatro tarjetas claras redundantes de la portada', () => {
  assert.doesNotMatch(home, /class="rf-services rf-section rf-container"/);
  assert.doesNotMatch(home, /class="rf-service-card"/);
  assert.doesNotMatch(styles, /\.rf-services/);
  assert.match(home, /class="rf-dark-solutions rf-section"/);
  assert.match(home, /href="\/herramientas\/"/);
});

test('los indicadores conservan cuatro columnas en escritorio y dos en móvil', () => {
  assert.match(styles,/grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles,/grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles,/min-width:\s*0/);
  assert.match(styles, /font-size: clamp\(40px, 3\.8vw, 60px\)/);
  assert.match(styles, /font-size: 12px; min-height: 36px/);
});

test('la hoja de indicadores sigue aplicada después de la capa editorial', () => {
  assert.ok(layout.indexOf('resumen-soluciones.css') > layout.indexOf('presentacion-editorial.css'));
});
