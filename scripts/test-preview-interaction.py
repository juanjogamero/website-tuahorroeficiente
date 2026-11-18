"""QA parcial de formulario y navegación móvil en Chromium en memoria.
No sustituye al navegador del sitio Astro desplegado."""
from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]/'preview'
css=(ROOT/'assets/style.css').read_text()
js=(ROOT/'assets/calculator.js').read_text()

def html(path):
  soup=BeautifulSoup((ROOT/path).read_text(),'html.parser')
  for e in soup.select('link[rel=stylesheet],script[src]'):e.decompose()
  s=soup.new_tag('style');s.string=css;soup.head.append(s)
  return str(soup)

with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-background-networking','--disable-dev-shm-usage'])
  page=b.new_page(viewport={'width':1440,'height':940})
  page.route('**/*',lambda route:route.abort() if route.request.url.startswith('http') else route.continue_())
  page.set_content(html('herramientas/calculadora-consumo-electrico/index.html'))
  page.add_script_tag(content=js)
  before=page.locator('[data-primary]').inner_text()
  assert '19,50' in before,before
  page.locator('[name="watts"]').fill('2000')
  page.locator('button[type=submit]').first.click()
  after=page.locator('[data-primary]').inner_text()
  assert '26,00' in after,(before,after)
  page.locator('[name="watts"]').fill('-2')
  page.locator('button[type=submit]').first.click()
  assert page.locator('[data-error]').is_visible(),'No muestra error de validación'
  page.locator('button[data-reset]').click()
  assert '19,50' in page.locator('[data-primary]').inner_text()
  page.close()
  mobile=b.new_page(viewport={'width':390,'height':844})
  mobile.set_content(html('index.html'))
  mobile.locator('.rf-mobile-menu summary').click()
  assert mobile.locator('.rf-mobile-menu nav a').first.is_visible(),'Menú móvil no visible'
  mobile.close()
  blog=b.new_page(viewport={'width':1440,'height':940})
  blog.set_content(html('guias/index.html'))
  field=blog.locator('[data-guide-search]')
  if field.count():
    # El buscador está presente y no depende de backend.
    assert field.get_attribute('type')=='search'
  blog.close();b.close()
print('QA Chromium: cálculo recalculado (19,50→26,00), validación negativa, reset y menú móvil OK')
