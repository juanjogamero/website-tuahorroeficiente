import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const header = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
const home = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles/fidelidad.css', import.meta.url), 'utf8');

test('portada: un H1 descriptivo y metadatos para consumo doméstico', () => {
  assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
  assert.match(home, /Calcula cuánto gastas<br\/>en luz, agua y calefacción/);
  assert.match(home, /Calculadoras de consumo eléctrico y ahorro en casa/);
  assert.match(home, /description="Calcula el gasto de luz/);
});

test('hero: CTA y tarjeta enlazan a una calculadora real', () => {
  assert.match(home, /class="rf-button" href="\/herramientas\/"/);
  assert.match(home, /class="rf-feature-tile" href="\/herramientas\/calculadora-consumo-electrico\/"/);
  assert.match(home, /class="rf-hero-word" aria-hidden="true">AHORRO REAL/);
});

test('cabecera: seis enlaces principales, desplegables y navegación móvil accesible', () => {
  const nav = header.match(/<nav class="rf-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, 'La cabecera debe tener un nav principal');
  assert.equal((nav.match(/<a href=/g) ?? []).length >= 6, true);
  assert.equal((nav.match(/class="rf-menu"/g) ?? []).length, 3);
  assert.match(header, /<details class="rf-mobile-menu">/);
  assert.match(header, /aria-label="Abrir o cerrar el menú de navegación"/);
});

test('hero: fotografía local, tipografía original y respuesta móvil', () => {
  assert.match(home, /src="\/images\/hero-renovables.webp"/);
  assert.match(styles, /font-family:'DM Sans'/);
  assert.match(styles, /@media\(max-width:720px\)/);
  assert.doesNotMatch(home.split('class="rf-trust')[0], /12M\+|1000\+|\d+% de ahorro/i);
});
