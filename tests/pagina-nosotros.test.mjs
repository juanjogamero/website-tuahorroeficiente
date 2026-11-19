import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const about=src('pages/sobre-nosotros.astro');
const css=src('styles/pagina-nosotros.css');
const base=src('layouts/BaseLayout.astro');

test('Nosotros conserva su hero y suma la presentación editorial sin secciones antiguas',()=>{
  assert.match(about, /<BaseLayout/);
  assert.doesNotMatch(about, /<ContentLayout|feature-split|value-grid|PRINCIPIOS EDITORIALES|NUESTRO PUNTO DE PARTIDA/);
  assert.equal((about.match(/<section\b/g)||[]).length,2);
  assert.match(about, /<section class="ta-about-hero"/);
  assert.match(about, /<h1 id="ta-about-title">Nosotros<\/h1>/);
});
test('Breadcrumb semántico, accesible y sin enlaces rotos',()=>{
  assert.match(about,/aria-label="Ruta de navegación"/);
  assert.match(about,/href="\/"/);
  assert.match(about,/aria-current="page"/);
  assert.match(about,/class="ta-about-hero-rule"/);
  assert.match(about,/src="\/images\/nosotros-parque-eolico\.jpg"/);
  assert.doesNotMatch(about,/src="\/images\/aerogenerador\.webp"/);
  const photos=readFileSync(new URL('../scripts/descargar-fotografias.mjs',import.meta.url),'utf8');
  assert.match(photos,/nosotros-parque-eolico\.jpg/);
  assert.match(photos,/photos\/28652561\/pexels-photo-28652561\.jpeg\?auto=compress&dpr=1&w=2400/);
  const provenance=readFileSync(new URL('../docs/22-fotografia-editorial-y-licencias.md',import.meta.url),'utf8');
  assert.match(provenance,/Satvinder Ghotra/);
  assert.match(provenance,/28652561/);
  assert.match(about,/fetchpriority="high"/);
});
test('Hero se adapta a móvil y respeta cabecera de la plantilla',()=>{
  assert.match(css,/height: clamp\(380px, 19vw, 410px\)/);
  assert.match(css,/\.page-about \.rf-header:not\(\.is-scrolled\)/);
  assert.match(css,/@media \(max-width: 720px\)/);
  assert.match(css,/height: 332px/);
  assert.match(css,/object-fit: cover/);
  assert.match(css,/margin: 24px auto 0/);
  assert.match(css,/margin-top: 18px/);
  assert.match(css,/margin-top: 14px/);
  assert.match(css,/top: 40px !important/);
  assert.match(css,/top: 32px !important/);
  assert.match(css,/top: 28px !important/);
  assert.match(base,/const isAboutPage/);
  assert.match(base,/page-about/);
  assert.ok(base.indexOf("pagina-nosotros.css")>base.indexOf("banner-pie-final.css"));
});
test('Metadatos del proyecto preservados y no inventa contenido editorial',()=>{
  assert.match(about, /Sobre nosotros \| Tu Ahorro Eficiente/);
  assert.match(about, /calculadoras gratuitas y comparativas/);
  assert.doesNotMatch(about, /\b(?:clientes|testimonios|ahorros garantizados|premios)\b/i);
});
