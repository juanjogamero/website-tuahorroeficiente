import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const get=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const about=get('pages/sobre-nosotros.astro');
const css=get('styles/pagina-nosotros.css');
const photoCatalog=get('scripts/descargar-fotografias.mjs');

test('presentación editorial sigue al hero y no duplica el bento de la portada',()=>{
  const hero=about.indexOf('<section class="ta-about-hero"');
  const story=about.indexOf('<section class="ta-about-story"');
  assert.ok(hero>=0 && story>hero);
  assert.equal((about.match(/<section\b/g)||[]).length,2);
  assert.doesNotMatch(about,/rf-bento-grid|rf-bento-lime|rf-kpi-grid/);
  assert.match(about,/aria-labelledby="ta-about-story-title"/);
});

test('presenta una misión concreta y tres principios con enlaces reales',()=>{
  for(const phrase of [
    'Ahorrar empieza por', 'lo que consume tu hogar', 'datos cotidianos',
    'Sin prometer ahorros garantizados', 'Empieza con tus números.',
    'Comprueba cada resultado.', 'Compara sin prisas.'
  ])assert.ok(about.includes(phrase),phrase);
  assert.equal((about.match(/class="ta-about-story-principle"/g)||[]).length,3);
  assert.match(about,/href="\/herramientas\/"/);
  assert.match(about,/href="\/metodologia\/"/);
  assert.match(about,/href="\/comparativas\/"/);
});

test('fotografía doméstica existente y panel editorial accesible',()=>{
  assert.match(photoCatalog,/agua-hogar\.webp/);
  assert.match(about,/src="\/images\/agua-hogar\.webp"/);
  assert.match(about,/alt="Una persona llena un vaso de agua en el grifo de su cocina"/);
  assert.match(about,/loading="lazy"/);
  assert.match(about,/<figcaption class="ta-about-story-note">/);
});

test('diseño propio de Nosotros con dos columnas y principios sin cajas',()=>{
  assert.match(css,/\.page-about \.ta-about-story/);
  assert.match(css,/grid-template-columns: minmax\(0, 1\.08fr\) minmax\(0, \.92fr\)/);
  assert.match(css,/grid-template-columns: repeat\(3, minmax\(0,1fr\)\)/);
  assert.match(css,/border-top: 1px solid #cad0cd/);
  assert.match(css,/background: linear-gradient\(transparent 75%, #e1ff57/);
  assert.doesNotMatch(css,/\.ta-about-story-principle\s*\{[^}]*background:/);
});

test('tablet y móvil evitan desbordamiento, mantienen CTA táctiles y prefieren movimiento reducido',()=>{
  assert.match(css,/@media \(max-width: 1050px\)/);
  assert.match(css,/@media \(max-width: 760px\)/);
  assert.match(css,/grid-template-columns: minmax\(0,1fr\)/);
  assert.match(css,/min-width: 0/);
  assert.match(css,/min-height: 50px/);
  assert.match(css,/@media \(prefers-reduced-motion: reduce\)/);
});
