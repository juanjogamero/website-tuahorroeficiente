import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const proportions = readFileSync(new URL('../src/styles/header-hero-proporciones.css', import.meta.url), 'utf8');
const home = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('las proporciones del hero se cargan después del CSS base', () => {
  assert.ok(layout.indexOf("import '../styles/header-hero-proporciones.css';") > layout.indexOf("import '../styles/fidelidad.css';"));
});

test('hero de escritorio proporcionado a la referencia, con márgenes y esquinas redondeadas', () => {
  assert.match(proportions, /height:\s*clamp\(780px,\s*calc\(100svh - 84px\),\s*840px\)/);
  assert.match(proportions, /margin:\s*22px 20px 0/);
  assert.match(proportions, /border-radius:\s*20px/);
  assert.match(proportions, /font-size:\s*clamp\(58px,\s*3\.8vw,\s*70px\)/);
  assert.match(proportions, /max-width:\s*560px/);
  assert.match(proportions, /max-width:\s*950px/);
  assert.match(proportions, /font-size:\s*clamp\(96px,\s*8\.5vw,\s*155px\)/);
});

test('el texto grande nace visible arriba y se desvanece por abajo', () => {
  assert.match(proportions, /background:\s*linear-gradient\(\s*to bottom,/);
  assert.match(proportions, /rgba\(255, 255, 255, 0\) 100%/);
  assert.match(proportions, /background-clip:\s*text/);
  assert.match(home, /class="rf-hero-word" aria-hidden="true">AHORRO REAL/);
});

test('se conserva el contenido y se adapta a pantallas estrechas', () => {
  assert.match(home, /class="rf-hero-tiles"/);
  assert.match(proportions, /@media \(max-width: 420px\)/);
  assert.match(proportions, /@media \(max-width: 350px\)/);
});
