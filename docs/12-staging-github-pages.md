# Despliegue de pruebas en GitHub Pages · 18/11/2026

## Objetivo

Repositorio público independiente: `juanjogamero/website-tuahorroeficiente`, rama `main`.
Vista de pruebas prevista: `https://juanjogamero.github.io/website-tuahorroeficiente/`.
**No despliega a `tuahorroeficiente.es`; no cambia su DNS y no incluye `CNAME`.**

## Estado real

- Código y workflow **preparados localmente**, no hay repositorio nuevo creado todavía.
- El conector GitHub accesible permite gestionar repositorios existentes, pero **no expone una acción para crear repositorios**.
- No se ha instalado `astro` ni compilado el sitio en esta máquina por un fallo de DNS al acceder al registro de npm. GitHub Actions hará la compilación cuando exista el repositorio.
- 10 tests de calculadoras y 4 tests de adaptación de rutas GitHub Pages pasan en Node 22.
- No existe aún URL pública de esta demo. Verificar tras desplegar antes de compartirla.

## Paso único necesario en la cuenta GitHub

1. Abre `https://github.com/new` autenticado y crea un repositorio **público** con nombre exacto `tuahorroeficiente` y rama predeterminada `main`. No lo conectes a dominio personalizado.
2. En `Settings > Pages > Build and deployment`, selecciona **GitHub Actions** como fuente, si aún no aparece seleccionada.
3. Si el conector GitHub no detecta el repositorio recién creado, autoriza su acceso desde los ajustes de la aplicación GitHub conectada.

## Primer push (si se usa consola local)

Desde la carpeta del proyecto descargado (no subas el ZIP como único archivo):

```bash
git init -b main
git add .
git commit -m "feat: primera demo Astro de Tu Ahorro Eficiente"
git remote add origin https://github.com/juanjogamero/website-tuahorroeficiente.git
git push -u origin main
```

El flujo `Publicar demo de Tu Ahorro Eficiente en GitHub Pages` ejecuta tests, compila Astro, valida enlaces, genera el artefacto y lo despliega.
Puede tardar varios minutos tras crear el repositorio. Comprueba en la pestaña **Actions** que los trabajos `build` y `deploy` terminan correctamente.

## Por qué es seguro para producción

- `site` y `base` apuntan al subdirectorio de GitHub Pages.
- No hay archivo `public/CNAME`.
- Las páginas tienen `noindex,follow` en el HTML mientras estén en demo.
- El archivo `/robots.txt` está configurado como disallow; en una URL de proyecto de GitHub Pages, este `robots.txt` **no es el archivo de la raíz del host** y, por sí solo, no es una protección contra indexación. La protección principal es el `meta robots`.
- No se publica ni se modifica el antiguo sitio del dominio principal.
- Se reescriben URLs locales absolutas (`/herramientas/`, `/images/...`) para que no apunten accidentalmente a la raíz del usuario `github.io`.

## Validación obligatoria de la primera publicación

1. Abrir la URL, clicar menú principal y comprobar enlaces de páginas interiores.
2. Ejecutar la calculadora eléctrica y la del radiador, probar errores y restaurar formulario.
3. Revisar CSS, fotos y JS en móvil y ordenador (sin errores 404).
4. Ver fuente HTML: `meta robots noindex`, canonical al entorno demo y sitemap propio.
5. Comprobar que no existe ningún dominio personalizado en `Settings > Pages`.

En la migración futura a `tuahorroeficiente.es` habrá que definir otra configuración y proteger las URLs heredadas con inventario SEO y Search Console. No se ha programado ni autorizado ese cambio.
