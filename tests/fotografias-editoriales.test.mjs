import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { images } from '../scripts/descargar-fotografias.mjs';

const root = new URL('../', import.meta.url);
const get = (path) => readFileSync(new URL(path, root), 'utf8');
const homepage = get('src/pages/index.astro');
const categories = get('src/data/categories.ts');
const guideDir = new URL('src/content/guias/', root);

test('el catálogo tiene fotografías variadas de bancos con licencia identificada', () => {
 assert.ok(images.length >= 10);
 assert.equal(new Set(images.map(x=>x[0])).size,images.length);
 assert.equal(new Set(images.map(x=>x[1])).size,images.length);
 for(const [name,url,format] of images){
  assert.match(url,/^https:\/\/(?:images\.unsplash\.com|images\.pexels\.com)\//);
  assert.match(name,/\.(?:webp|jpg)$/);
  assert.match(format,/^image\/(?:webp|jpeg)$/);
 }
 const docs=get('docs/22-fotografia-editorial-y-licencias.md');
 assert.match(docs,/https:\/\/unsplash\.com\/license/);
 assert.match(docs,/https:\/\/www\.pexels\.com\/license/);
 for(const [name] of images)assert.ok(docs.includes(name),`No documentada ${name}`);
});

test('la portada utiliza fotografías vinculadas a cada tema, no aerogeneradores genéricos',()=>{
 assert.match(homepage,/rf-bento rf-bento-image[^\n]+\/images\/ducha-bano\.webp/);
 assert.match(homepage,/\/images\/grifo-agua\.webp/);
 const dark=homepage.split('<section class="rf-dark-solutions')[1]?.split('</section>')[0] ?? '';
 assert.ok(dark, 'La sección oscura debe mantenerse');
 for (const photo of ['medidor-consumo.webp','radiador-hogar.webp','ducha-bano.webp','freidora-aire.jpg']) {
  assert.ok(dark.includes('/images/'+photo), 'Falta fotografía temática '+photo);
 }
 assert.doesNotMatch(homepage, /class="rf-service-card"/);
 assert.match(homepage,/\/images\/freidora-aire\.jpg/);
 assert.match(homepage,/\/images\/medidor-consumo\.webp/);
 assert.match(homepage,/\/images\/radiador-hogar\.webp/);
 assert.doesNotMatch(homepage,/\/images\/aerogenerador\.webp/);
 assert.doesNotMatch(homepage,/\/images\/equipo-renovables\.webp/);
});

test('cada guía presenta su propio tema visual y un texto alternativo específico',()=>{
 const files=readdirSync(guideDir).filter(x=>x.endsWith('.md'));
 const keys=new Set();
 for(const f of files){
  const md=get(`src/content/guias/${f}`);
  const key=md.match(/^imageName:\s*"([^"]+)"/m)?.[1];
  const alt=md.match(/^imageAlt:\s*"([^"]+)"/m)?.[1];
  assert.ok(key,`${f} sin imagen`);
  assert.ok(alt && alt.length>=30,`${f} sin alt adecuado`);
  assert.ok(categories.includes(`${key}:'`),`${f} usa un identificador no registrado: ${key}`);
  assert.doesNotMatch(alt,/ilustrativa sobre energías renovables/i);
  keys.add(key);
 }
 assert.ok(keys.size>=7,`Las guías solo usan ${keys.size} fotos`);
});

test('el blog y las comparativas consumen fotos locales del catálogo y no hotlinks',()=>{
 assert.match(get('src/pages/guias/[slug].astro'), /photoUrls\[post\.data\.imageName\]/);
 assert.match(get('src/pages/comparativas/[slug].astro'), /photoUrls\[tool\.image/);
 assert.match(get('src/layouts/ContentLayout.astro'), /src=\{heroImage\}/);
 assert.match(get('package.json'), /"prebuild": "node scripts\/descargar-fotografias\.mjs"/);
});
