from pathlib import Path
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import base64,mimetypes
root=Path(__file__).resolve().parents[1]
css=(root/'preview/assets/style.css').read_text()
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-background-networking'])
    for path,width,height,file in [
        ('',1440,1000,'portada-1440.png'),('',390,844,'portada-390.png'),('guias/',1440,950,'blog-1440.png'),('herramientas/calculadora-consumo-electrico/',1440,950,'calculadora-1440.png'),('guias/que-es-kwh/',390,844,'guia-390.png')]:
        page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
        fp=(root/'preview'/path/'index.html').resolve()
        soup=BeautifulSoup(fp.read_text(),'html.parser')
        for link in soup.select('link[rel=stylesheet]'):link.decompose()
        for s in soup.select('script[src]'):s.decompose()
        style=soup.new_tag('style');style.string=css;soup.head.append(style)
        for im in soup.select('img[src]'):
            src=im.get('src','')
            if src.startswith(('http','data:')):continue
            source=(fp.parent/src).resolve()
            if source.exists() and source.is_file():
                data=base64.b64encode(source.read_bytes()).decode()
                mime=mimetypes.guess_type(source.name)[0] or 'image/webp'
                im['src']='data:'+mime+';base64,'+data
        page.route('**/*',lambda route: route.abort() if route.request.url.startswith('http') else route.continue_())
        page.set_content(str(soup),wait_until='domcontentloaded',timeout=20000)
        page.screenshot(path=str(root/'evidence'/file),full_page=False)
        print(file,'overflow?',page.evaluate('document.documentElement.scrollWidth > innerWidth'), 'hero height=',page.evaluate('Math.floor(document.querySelector("main > section").getBoundingClientRect().height)'))
        print('images',page.eval_on_selector_all('img','els=>els.map(x=>x.complete && x.naturalWidth>0).slice(0,6)'))
        page.close()
    browser.close()
