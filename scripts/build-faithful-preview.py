#!/usr/bin/env python3
"""Genera vista previa navegable sin Astro (no equivale a astro build)."""
from pathlib import Path
from bs4 import BeautifulSoup
import copy,re,shutil,html
R=Path(__file__).resolve().parents[1]
P=R/'preview'
assert P.exists(), 'La vista previa inicial debe estar incluida en este ZIP: para regenerarla desde cero utiliza Astro.'
shutil.copytree(R/'public/images',P/'images',dirs_exist_ok=True)
shutil.copy2(R/'public/favicon.svg',P/'favicon.svg')
ICONS=dict(re.findall(r"\b(\w+):'([^']+)'",(R/'src/components/Icon.astro').read_text()))
def svg(name,size=20):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS.get(name,ICONS.get("leaf",""))}</svg>'
def replace_icons(s):
    return re.sub(r'<Icon name="(\w+)" size=\{(\d+)\}/>',lambda m:svg(m[1],m[2]),s)
H=replace_icons((R/'src/components/Header.astro').read_text().split('---',2)[-1])
F=replace_icons((R/'src/components/Footer.astro').read_text().split('---',2)[-1]).replace('© {new Date().getFullYear()}','© 2026')
h=BeautifulSoup(H,'html.parser').find('header');f=BeautifulSoup(F,'html.parser').find('footer')
S=(R/'src/pages/index.astro').read_text();S=S[S.index('<section class="rf-hero"'):S.index('</BaseLayout>')]
m=BeautifulSoup('<main id="contenido">'+S+'</main>','html.parser').find('main')
mapimgs={
    'installation-rooftop-solar':'hero-renovables.webp',
    'windmill-turbine-field':'aerogenerador.webp',
    'wind-turbine-wind-energy':'aerogenerador.webp',
    'energy-solar-man-power':'equipo-renovables.webp',
    'landscape-sky-field':'aerogenerador.webp',
    'solar-engineer':'equipo-renovables.webp',
}
count=0
for path in sorted(P.rglob('index.html')):
    page=BeautifulSoup(path.read_text(),'html.parser')
    for strip in page.select('.sv-top,.utility-strip'):
        strip.decompose()
    if page.header:page.header.replace_with(copy.deepcopy(h))
    if page.footer:page.footer.replace_with(copy.deepcopy(f))
    if path==P/'index.html':
        page.main.replace_with(copy.deepcopy(m))
        page.title.string='Tu Ahorro Eficiente — Calcula lo que gastas. Ahorra con criterio'
    else:
        # Antiguo HTML pre-renderizado: sustituir cabecera genérica por la nueva estructura real.
        old=page.select_one('main .interior-hero')
        if old:
            heading=old.find('h1');desc=old.select_one('.lead');crumb=old.select_one('.breadcrumbs')
            crumb_html=str(crumb) if crumb else ''
            tag=old.select_one('.eyebrow')
            eyebrow=tag.get_text(' ',strip=True) if tag else 'TU AHORRO EFICIENTE'
            repl=f'''<section class="rf-innerhero"><img class="rf-inner-bgimage" src="/images/hero-renovables.webp" alt="" aria-hidden="true"/><div class="rf-innerhero-backdrop"></div><div class="rf-container rf-innerhero-content">{crumb_html}<span class="rf-overline rf-overline-white">✦ {html.escape(eyebrow)}</span><h1>{html.escape(heading.get_text(' ',strip=True)) if heading else ''}</h1><p>{html.escape(desc.get_text(' ',strip=True)) if desc else ''}</p><div class="rf-innerhero-info"><span>Sin registro</span><span>España</span><span>Información verificable</span></div></div><span class="rf-innerhero-mark" aria-hidden="true">AHORRA CON CRITERIO</span></section>'''
            old.replace_with(BeautifulSoup(repl,'html.parser').section)
    # Imagen de fondo para cabeceras de herramientas y guías (solo en vista previa heredada).
    inner=page.select_one("main > .tool-hero, main > .article-hero")
    if inner and not inner.select_one(".rf-inner-bgimage"):
        bg=page.new_tag("img",attrs={"class":"rf-inner-bgimage","src":"/images/hero-renovables.webp","alt":"","aria-hidden":"true"})
        inner.insert(0,bg)
    # Las imágenes que antiguamente eran enlaces remotos ahora se cargan localmente.
    for img in page.find_all('img',src=True):
        orig=img['src']
        if orig.startswith('https://'):
            selected=next((val for key,val in mapimgs.items() if key in orig),'hero-renovables.webp')
            img['src']='/images/'+selected
            img.attrs.pop('onerror',None)
    # No reutilizar hojas de estilo v3; se aplica CSS original del proyecto + fiel v4.
    for link in page.find_all('link',href=re.compile('fonts.googleapis.com/css2')):
        link['href']='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap'
    depth=len(path.relative_to(P).parts)-1;base='../'*depth
    for el in page.find_all(['a','img','link','script']):
        for att in ('href','src'):
            u=el.get(att)
            if not u or not u.startswith('/') or u.startswith('//'):continue
            pathpart,sep,frag=u.partition('#')
            if pathpart=='/':target=base+'index.html'
            elif pathpart.endswith('/'):target=base+pathpart.lstrip('/')+'index.html'
            else:target=base+pathpart.lstrip('/')
            if sep:target+='#'+frag
            el[att]=target
    path.write_text('<!doctype html>\n'+str(page))
    count+=1
(P/'assets/style.css').write_text((R/'src/styles/global.css').read_text()+'\n\n'+(R/'src/styles/fidelidad.css').read_text())
(P/'INSTRUCCIONES-VISTA-PREVIA.txt').write_text('ABRE index.html: versión estática navegable para revisión de diseño.\n'
    'ESTA PREVIEW NO ES UN BUILD DE ASTRO: al desplegar, ejecutar npm install, npm test, npm run build, npm run audit:dist.\n'
    'Imágenes generadas para Tu Ahorro Eficiente y alojadas localmente.\n')
print('Preview regenerada:',count,'páginas')
