import fs from 'node:fs';
import path from 'node:path';

/**
 * Corrige href/src escritos para el dominio raíz y los encierra en el subdirectorio
 * del proyecto de GitHub Pages. También impide que el demo herede el CNAME real.
 */
export function prefixRootUrl(url, base='/website-tuahorroeficiente/') {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  if (base === '/') return url;
  if (url === base.slice(0,-1) || url.startsWith(base)) return url;
  return base + url.slice(1);
}

export function rewriteHtml(html, base='/website-tuahorroeficiente/', preview=true) {
  let result=html.replace(/\b(href|src|action|poster)=(['"])(\/(?!\/)[^'"<>]*)\2/gi,
    (_,attribute,q,value)=> `${attribute}=${q}${prefixRootUrl(value,base)}${q}`);
  result=result.replace(/\bsrcset=(['"])([^'"<>]*)\1/gi, (_whole,q,value)=>{
    const updated=value.split(',').map(part=>part.replace(/^(\s*)(\/(?!\/)[^\s]+)/,
      (_,spaces,url)=>spaces+prefixRootUrl(url,base))).join(',');
    return `srcset=${q}${updated}${q}`;
  });
  result=rewriteCss(result,base);
  if(preview){
    const demoRoot='https://juanjogamero.github.io'+base.replace(/\/$/,'');
    result=result.replaceAll('https://tuahorroeficiente.es',demoRoot);
    if (!/<meta\s+name=["']robots["'][^>]*noindex/i.test(result)) {
      result=result.replace(/<\/head>/i,'<meta name="robots" content="noindex,follow" />\n</head>');
    }
  }
  return result;
}
export function rewriteCss(css,base='/website-tuahorroeficiente/') {
  return css.replace(/url\(\s*(['"]?)(\/(?!\/)[^)'"\s]+)\1\s*\)/gi,
    (_,q,value)=>`url(${q}${prefixRootUrl(value,base)}${q})`);
}

function walk(folder){return fs.readdirSync(folder,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(folder,e.name)):[path.join(folder,e.name)]);}
export function preparePages(dir,base='/website-tuahorroeficiente/',preview=true){
  if(!fs.existsSync(dir))throw new Error(`Carpeta de compilación no encontrada: ${dir}`);
  let htmlCount=0, cssCount=0;
  for(const name of walk(dir)){
    if(name.endsWith('.html')){fs.writeFileSync(name,rewriteHtml(fs.readFileSync(name,'utf8'),base,preview));htmlCount++}
    else if(name.endsWith('.css')){fs.writeFileSync(name,rewriteCss(fs.readFileSync(name,'utf8'),base));cssCount++}
  }
  fs.rmSync(path.join(dir,'CNAME'),{force:true});
  if(preview){
    fs.writeFileSync(path.join(dir,'robots.txt'),'User-agent: *\nDisallow: /\n# La proteccion efectiva de esta demo usa las etiquetas meta noindex.\n');
  }else{
    fs.writeFileSync(path.join(dir,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://tuahorroeficiente.es/sitemap-index.xml\n');
  }
  console.log(`Páginas adaptadas para ${base}: ${htmlCount} HTML, ${cssCount} CSS. CNAME de producción ausente.`);
  return {htmlCount,cssCount};
}

if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname)){
  const preview=process.env.PUBLICATION_MODE !== 'production';
  const base=preview?'/website-tuahorroeficiente/':'/';
  preparePages(path.resolve('dist'),base,preview);
}
