import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const get=path=>readFileSync(new URL('../src/'+path,import.meta.url),'utf8');
const page=get('pages/guias/index.astro');
const layout=get('layouts/BaseLayout.astro');
const styles=get('styles/blog-editorial.css');

test('el blog usa guías reales y conserva sus URLs actuales',()=>{
 assert.match(page,/getCollection\('guias'\)/);
 assert.match(page,/posts\.find\(post=>post\.id==='como-leer-factura-luz'\)/);
 assert.match(page,/href=\{'\/guias\/'\+post\.id\+'\/'\}/);
 assert.match(page,/photoUrls\[post\.data\.imageName\]/);
 assert.match(page,/post\.data\.title/);
 assert.match(page,/post\.data\.published|featured\.data\.published/);
 assert.doesNotMatch(page,/https:\/\/(?:images\.unsplash\.com|images\.pexels\.com)/);
});

test('composición de la referencia: título, principal horizontal, seis tarjetas, paginación y firma',()=>{
 for(const item of ['ta-blog-panel','ta-blog-masthead','ta-blog-featured','ta-blog-cards','ta-blog-card','ta-blog-pagination','ta-blog-signature']) assert.ok(page.includes(item),item);
 assert.match(page,/<h1 id="ta-blog-heading">BLOG<\/h1>/);
 assert.match(page,/const pageSize=6/);
 assert.match(styles,/grid-template-columns: minmax\(0, 52%\) minmax\(0, 48%\)/);
 assert.match(styles,/grid-template-columns: repeat\(3, minmax\(0,1fr\)\)/);
 assert.match(styles,/@media \(max-width: 500px\)/);
 assert.match(styles,/grid-template-columns: repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(styles,/@media \(max-width: 340px\)/);
});

test('paginador accesible, funcional, con URLs navegables y sin dependencias externas',()=>{
 for(const token of ['data-blog-prev','data-blog-next','data-blog-page','aria-current','aria-live="polite"','list.forEach','history.pushState','popstate','prefers-reduced-motion']) assert.ok(page.includes(token),token);
 assert.match(page,/pager\.hidden=false/);
 assert.match(page,/if\(active===1\)url\.searchParams\.delete\('pagina'\)/);
 assert.match(styles,/\.ta-blog-card\[hidden\] \{ display: none !important; \}/);
 assert.doesNotMatch(page,/fetch\(|localStorage|sessionStorage/);
});

test('estilos aislados del blog y cabecera integrada en su panel',()=>{
 assert.match(layout,/const isBlogIndex = \['guias','guias\/'/);
 assert.match(layout,/isBlogIndex \? 'page-blog'/);
 assert.ok(layout.indexOf("blog-editorial.css")>layout.indexOf("comparativas-editoriales.css"));
 assert.match(styles,/\.page-blog \.rf-header:not\(\.is-scrolled\)/);
 assert.match(styles,/background: #f2f4f2/);
 assert.match(styles,/font-family: 'DM Sans'/);
 assert.match(styles,/--blog-lime: #e1ff57/);
});
