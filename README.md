# Tu Ahorro Eficiente — web de pruebas Astro

> Sitio de desarrollo público. **No es el dominio de producción** ni se ha migrado `tuahorroeficiente.es`.

![Imagen de portada](public/images/hero-renovables.webp)

**Demo prevista:** [juanjogamero.github.io/website-tuahorroeficiente/](https://juanjogamero.github.io/website-tuahorroeficiente/)

Portal gratuito sobre costes de consumo eléctrico, climatización, electrodomésticos y agua en hogares españoles. Astro 5 + TypeScript puro, HTML estático, sin usuarios, servidor ni base de datos. La identidad visual se basa en la referencia editorial facilitada para la portada y se extiende a guías y simuladores.

## Trabajar en local

Requiere Node.js 22.

```bash
npm install
npm test
npm run dev
# Abra http://localhost:4321/website-tuahorroeficiente/
npm run build
npm run audit:dist
```

## GitHub Pages

La rama `main` publica con `.github/workflows/deploy.yml`: instala dependencias, verifica cálculos, genera HTML con el prefijo `/website-tuahorroeficiente/`, audita los enlaces y despliega `dist/` a Pages. En **Settings → Pages** configura **Build and deployment → Source → GitHub Actions**, si aún no está activado.

El sitio de pruebas incorpora metadatos `noindex`, `robots.txt` de pruebas y **no incluye `CNAME`**. La web actual `tuahorroeficiente.es` no se sustituye ni redirige desde aquí.

## Organización

- `src/pages` — portada, herramientas, guías, categorías, comparativas, información.
- `src/components` y `src/layouts` — navegación y maquetaciones compartidas.
- `src/lib/calculators.ts` — fórmulas reproducibles.
- `src/data` y `src/content` — fichas y artículos originales.
- `public/images` — imágenes WebP del proyecto.
- `tests` — pruebas unitarias.
- `docs` — metodología, inventario, SEO, decisiones y pendientes.

**Antes de producción:** comprobar build/QA visual, conectar Search Console del dominio, contrastar los contenidos sensibles y validar la migración de todas las URLs heredadas. Revisar los documentos legales y datos de autoría antes de publicar bajo el dominio principal.
