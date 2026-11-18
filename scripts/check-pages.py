from playwright.sync_api import sync_playwright
from pathlib import Path
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]/'preview'
css=(ROOT/'assets/style.css').read_text()
paths=['index.html','herramientas/calculadora-consumo-electrico/index.html','guias/index.html','guias/que-es-kwh/index.html','categorias/agua/index.html']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--disable-background-networking','--disable-gpu'])
 for path in paths:
  pathfile=ROOT/path
  if not pathfile.exists():continue
  raw=pathfile.read_text()
  soup=BeautifulSoup(raw,'html.parser')
  for link in soup.select('link[rel=stylesheet]'):link.decompose()
  for s in soup.select('script[src]'):s.decompose()
  style=soup.new_tag('style');style.string=css;soup.head.append(style)
  for size in ((1440,950),(390,850)):
   page=b.new_page(viewport={'width':size[0],'height':size[1]})
   page.route('**/*',lambda route:route.abort() if route.request.url.startswith('http') else route.continue_())
   page.set_content(str(soup),wait_until='domcontentloaded',timeout=12000)
   d={"width":page.evaluate('document.documentElement.scrollWidth'),"viewport":size[0],"h1":page.locator('h1').first.inner_text()[:70],"overflow":page.evaluate('document.documentElement.scrollWidth>innerWidth')}
   print(path,size,d)
   if path.startswith('herramientas/') and size[0]==1440:
     page.screenshot(path=str(ROOT.parent/'evidence-calculator.png'),full_page=False)
   if path=='guias/index.html' and size[0]==1440:
     page.screenshot(path=str(ROOT.parent/'evidence-blog.png'),full_page=False)
   page.close()
 b.close()
