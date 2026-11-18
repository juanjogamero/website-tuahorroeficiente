import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
if(!fs.existsSync(root))throw new Error('No existe dist/: ejecuta npm run build antes.');
const preview=process.env.PUBLICATION_MODE!=='production';
const base=preview?'/website-tuahorroeficiente/':'/';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(root),htmls=files.filter(p=>p.endsWith('.html'));
const extract=(html,re)=>html.match(re)?.[1]??null;
const titles=new Map(),issues=[];
for(const file of htmls){
 const html=fs.readFileSync(file,'utf8'),rel='/'+path.relative(root,file).replaceAll(path.sep,'/');
 const title=extract(html,/<title>([^<]+)<\/title>/i),
       descr=extract(html,/<meta\s+name="description"\s+content="([^"]+)"/i),
       canonical=extract(html,/<link\s+rel="canonical"\s+href="([^"]+)"/i);
 if(!title)issues.push(`${rel}: falta title`);
 if(!descr)issues.push(`${rel}: falta meta description`);
 if(!canonical)issues.push(`${rel}: falta canonical`);
 if(title&&titles.has(title)&&!rel.includes('/404'))issues.push(`${rel}: título duplicado de ${titles.get(title)}`);
 if(title)titles.set(title,rel);
 if(preview&&!/<meta\s+name="robots"\s+content="noindex/i.test(html))issues.push(`${rel}: falta noindex en demo`);
 const tags=html.matchAll(/<(a|img|link|script)\b[^>]*?\b(href|src)="([^"]+)"/gi);
 for(const [,tag,attr,href] of tags){
  if(!href.startsWith('/')||href.startsWith('//'))continue;
  if(preview&&!href.startsWith(base)){
   issues.push(`${rel}: ruta sin base de proyecto: ${href}`);continue;
  }
  const local=preview?href.slice(base.length):href.slice(1);
  const u=decodeURIComponent(local.split(/[?#]/)[0]);
  if(!u)continue;
  const target=path.join(root,u);
  if(tag.toLowerCase()==='a'){
   const candidate=u.endsWith('/')?path.join(target,'index.html'):target;
   if(!fs.existsSync(candidate)&&!fs.existsSync(path.join(target,'index.html')))issues.push(`${rel}: enlace roto ${href}`);
  }else if(!fs.existsSync(target)){
   issues.push(`${rel}: recurso ausente ${href}`);
  }
 }
}
for(const f of ['robots.txt','sitemap-index.xml'])if(!fs.existsSync(path.join(root,f)))issues.push(`Archivo requerido ausente: ${f}`);
if(preview&&fs.existsSync(path.join(root,'CNAME')))issues.push('CNAME de producción detectado en demo');
console.log(`Auditoría GitHub Pages: ${htmls.length} páginas, ${titles.size} títulos, ${issues.length} incidencias.`);
if(issues.length){console.error(issues.slice(0,75).join('\n'));process.exitCode=1}
