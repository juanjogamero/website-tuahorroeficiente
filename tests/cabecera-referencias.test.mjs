import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const src = file => readFileSync(new URL('../src/' + file, import.meta.url), 'utf8');
const header = src('components/Header.astro');
const home = src('pages/index.astro');
const css = src('styles/cabecera-referencias.css');
const layout =src('layouts/BaseLayout.astro');

test('header fijo y negro al desplazarse, con estado inicial actualizado', () => {
 assert.match(css, /position: fixed !important/);
 assert.match(css, /\.rf-header\.is-scrolled \.rf-header-pill/);
 assert.match(css, /background: #08090a !important/);
 assert.match(header, /classList\.toggle\('is-scrolled', window\.scrollY > 48\)/);
 assert.match(header, /window\.addEventListener\('scroll', syncHeader, \{ passive: true \}\)/);
 assert.match(header, /window\.addEventListener\('pageshow', syncHeader\)/);
});
test('el estilo final se importa después del móvil, sin alterar sus calculadoras', () => {
 assert.ok(layout.indexOf("import '../styles/cabecera-referencias.css';") > layout.indexOf("import '../styles/mobile-ux.css';"));
});
test('franja editorial posterior al hero con siete marcas tipográficas enlazadas', () => {
 const trust = home.match(/<section class="rf-trust[\s\S]*?<\/section>/)?.[0];
 assert.ok(trust);
assert.equal((trust.match(/class="rf-trust-logo /g) || []).length, 7);
 assert.match(trust, /IDAE/);assert.match(trust, /CNMC/);assert.match(trust, /EPREL/);
 assert.match(trust, /sin acuerdos ni avales/i);
 assert.match(trust, /sin patrocinio|sin vinculación|No existe patrocinio/i);
});
test('hero de escritorio con escala moderada y altura de viewport', () => {
 assert.match(css, /height: 100svh/);
 assert.match(css, /font-size: clamp\(55px, 4vw, 72px\)/);
 assert.match(css, /min-height: 720px/);
});
