import test from 'node:test';
import assert from 'node:assert/strict';
import {prefixRootUrl,rewriteHtml,rewriteCss} from '../scripts/prepare-pages.mjs';

test('reescribe enlaces, imágenes y scripts absolutos para Pages',()=>{
  const html='<head></head><a href="/">Inicio</a><a href="/herramientas/">Herramientas</a><img src="/images/hero.webp"><script src="/_astro/app.js"></script>';
  const out=rewriteHtml(html);
  assert.match(out,/href="\/website-tuahorroeficiente\/"/);
  assert.match(out,/href="\/website-tuahorroeficiente\/herramientas\/"/);
  assert.match(out,/src="\/website-tuahorroeficiente\/images\/hero.webp"/);
  assert.match(out,/src="\/website-tuahorroeficiente\/_astro\/app.js"/);
  assert.match(out,/<meta name="robots" content="noindex,follow"/);
});
test('respeta enlaces externos, anclas y URLs ya adaptadas',()=>{
  assert.equal(prefixRootUrl('https://example.com'), 'https://example.com');
  assert.equal(prefixRootUrl('#contenido'), '#contenido');
  assert.equal(prefixRootUrl('/website-tuahorroeficiente/herramientas/'),'/website-tuahorroeficiente/herramientas/');
  assert.equal(prefixRootUrl('//cdn.example.com/x'),'//cdn.example.com/x');
});
test('adapta urls de CSS sin duplicar prefijo',()=>{
  const css=`background:url('/images/hero.webp');mask:url('/website-tuahorroeficiente/icon.svg')`;
  assert.equal(rewriteCss(css),`background:url('/website-tuahorroeficiente/images/hero.webp');mask:url('/website-tuahorroeficiente/icon.svg')`);
});
test('reescribe srcset y JSON-LD que apuntan al dominio de producción',()=>{
 const html='<head></head><img srcset="/images/a.webp 480w, /images/b.webp 900w"><script type="application/ld+json">{"url":"https://tuahorroeficiente.es/guias/"}</script>';
 const out=rewriteHtml(html);
 assert.match(out,/\/website-tuahorroeficiente\/images\/a.webp 480w, \/website-tuahorroeficiente\/images\/b.webp 900w/);
 assert.match(out,/https:\/\/juanjogamero.github.io\/website-tuahorroeficiente\/guias\//);
});
