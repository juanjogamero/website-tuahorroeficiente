import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const path = new URL('../src/', import.meta.url);
const source = file => readFileSync(new URL(file, path), 'utf8');
const header=source('components/Header.astro'), styles=source('styles/mobile-ux.css'), layout=source('layouts/BaseLayout.astro');
const calculator=source('components/ToolCalculator.astro'), script=source('scripts/tools-client.ts');

test('el CSS móvil prevalece sobre las proporciones del hero',()=>{
 assert.ok(layout.indexOf("import '../styles/mobile-ux.css';") > layout.indexOf("import '../styles/header-hero-proporciones.css';"));
});
test('menú móvil: acceso directo a calculadoras y agrupación por temática',()=>{
 assert.match(header,/class="rf-mobile-menu-cta" href="\/herramientas\/"/);
 assert.match(header,/Calcula por temática/);
 assert.match(header,/aria-label="Abrir o cerrar el menú de navegación"/);
 assert.match(header,/event.key === 'Escape'/);
});
test('hero móvil: tarjetas sin compresión y altura adaptable al contenido',()=>{
 assert.match(styles,/grid-template-columns: minmax\(0,1fr\)/);
 assert.match(styles,/min-height: 100svh/);
 assert.match(styles,/height: auto; min-height: 100svh/);
});
test('calculadora móvil: entradas legibles y resultado accesible',()=>{
 assert.match(styles,/font-size: 16px; border-radius: 12px/);
 assert.match(styles,/min-height: 52px/);
 assert.match(calculator,/aria-live="polite"/);
 assert.match(calculator,/tabindex="-1"/);
 assert.match(script,/result\.focus\(\{preventScroll:true\}\)/);
 assert.match(script,/prefers-reduced-motion/);
});
