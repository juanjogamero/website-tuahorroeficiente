import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const get=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const home=get('pages/index.astro');
const footer=get('components/Footer.astro');
const css=get('styles/banner-pie-final.css');
const layout=get('layouts/BaseLayout.astro');
test('banner inmediatamente después del FAQ y sin secciones entre banner y footer',()=>{
 const faq=home.indexOf('<section class="rf-faq rf-section rf-container rf-faq-modern"');
 const close=home.indexOf('</section>',faq);
 const banner=home.indexOf('<section class="rf-final-banner rf-section"');
 assert.ok(faq>=0&&close>faq&&banner>close);
 assert.equal(home.slice(close+'</section>'.length,banner).trim(),'');
 assert.equal(home.slice(home.indexOf('</section>',banner)+'</section>'.length).trim(),'</BaseLayout>');
 assert.doesNotMatch(home,/class="rf-topics rf-section|class="rf-blog rf-section|class="rf-cta rf-container"/);
});
test('banner ancho con imagen diferente del hero y dos accesos útiles',()=>{
 assert.match(home,/src="\/images\/vida-hogar\.webp"/);
 assert.match(home,/href="\/herramientas\/"/);
 assert.match(home,/href="\/comparativas\/"/);
 assert.match(css,/width:min\(1540px,calc\(100% - 48px\)\)/);
 assert.match(css,/\.rf-final-banner-shade/);
 assert.match(css,/@media\(max-width:680px\)/);
});
test('pie global con navegación real, sin newsletter ficticia ni datos inventados',()=>{
 assert.match(footer,/class="site-footer ta-footer"/);
 assert.match(footer,/href="\/contacto\/"/);
 assert.match(footer,/href="\/metodologia\/"/);
 assert.match(footer,/href="\/privacidad\/"/);
 assert.match(footer,/href="\/guias\/"/);
 assert.doesNotMatch(footer,/<form|type="email"|contact@example\.com|123 Business|\+34\s*\d{9}/i);
 assert.match(footer,/new Date\(\)\.getFullYear\(\)/);
});
test('texto gigante se desplaza derecha-izquierda con continuidad y control de movimiento reducido',()=>{
 assert.match(footer,/class="ta-footer-marquee" aria-hidden="true"/);
 assert.equal((footer.match(/Calcula con datos <i>✳<\/i>/g)||[]).length,2);
 assert.match(css,/@keyframes ta-footer-slide/);
 assert.match(css,/animation:ta-footer-slide 38s linear infinite/);
 assert.match(css,/to\{transform:translate3d\(-50%,0,0\)\}/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/animation:none;will-change:auto/);
 assert.match(css,/overflow:hidden/);
});
test('estilo nuevo se importa al final sin dependencias adicionales',()=>{
 assert.ok(layout.indexOf("banner-pie-final.css")>layout.indexOf("preguntas-frecuentes-portada.css"));
 assert.match(css,/\.site-footer\.ta-footer/);
 assert.match(css,/\.ta-footer-columns/);
 assert.match(css,/\.ta-footer-copyright/);
});
