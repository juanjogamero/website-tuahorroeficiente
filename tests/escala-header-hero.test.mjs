import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const proportions = readFileSync(new URL('../src/styles/header-hero-proporciones.css', import.meta.url), 'utf8');
const home = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('la escala equilibrada se carga después del tema base', () => {
  const base = layout.indexOf("import '../styles/fidelidad.css';");
  const scale = layout.indexOf("import '../styles/header-hero-proporciones.css';");
  assert.ok(base !== -1 && scale > base);
});

test('el hero de escritorio tiene un máximo de altura y titular legible', () => {
  assert.match(proportions, /min-height:\s*clamp\(640px,\s*49vw,\s*730px\)/);
  assert.match(proportions, /font-size:\s*clamp\(43px,\s*3\.65vw,\s*58px\)/);
  assert.match(proportions, /height:\s*60px/);
  assert.match(proportions, /max-width:\s*565px/);
});

test('mantiene composición y contenido sin cambios, y adapta el móvil estrecho', () => {
  assert.match(home, /class="rf-hero-tiles"/);
  assert.match(home, /class="rf-hero-word" aria-hidden="true">AHORRO REAL/);
  assert.match(proportions, /@media \(max-width: 420px\)/);
  assert.match(proportions, /@media \(max-width: 350px\)/);
});
