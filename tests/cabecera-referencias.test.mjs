import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const src = file => readFileSync(new URL('../src/' + file, import.meta.url), 'utf8');
const header = src('components/Header.astro');
const home = src('pages/index.astro');
const css = src('styles/cabecera-referencias.css');
const layout = src('layouts/BaseLayout.astro');

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
test('franja de referencias situada inmediatamente después del hero con poco margen', () => {
 assert.match(css, /padding: 42px 0 62px/);
 assert.match(css, /margin: 0 0 26px/);
 assert.match(css, /padding: 34px 0 50px/);
 assert.match(css, /width: min\(950px, calc\(100% - 120px\)\)/);
});

test('en portada la cápsula empieza dentro del hero y se fija arriba tras scroll', () => {
 assert.match(layout, /const isHomePage = localPath === '' \|\| localPath === 'index.html'/);
 assert.match(layout, /const isAboutPage = \['sobre-nosotros'/);
 assert.match(layout, /<body class=\{isHomePage \? 'page-home' : isAboutPage \? 'page-about' : undefined\}>/);
 assert.match(css, /\.page-home \.rf-header:not\(\.is-scrolled\) \{ top: 38px !important; \}/);
 assert.match(css, /\.page-home \.rf-header.is-scrolled \{ top: 14px !important; \}/);
 assert.match(css, /\.page-home \.rf-header:not\(\.is-scrolled\) \{ top: 27px !important; \}/);
});
