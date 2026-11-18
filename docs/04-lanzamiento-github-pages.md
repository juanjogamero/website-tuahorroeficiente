> **Documento histórico para una posible migración posterior a producción. No se aplica a la demo en GitHub Pages.** Para el entorno de pruebas, consultar `12-staging-github-pages.md`. No activar `CNAME` ni apuntar a `tuahorroeficiente.es`.

# GitHub Pages · Lanzamiento sin servidor

La publicación será por GitHub Actions y dominio `tuahorroeficiente.es`, no como subruta de repositorio. No requiere Cloudflare, Workers, API, BBDD ni servidor propio.

## Configuración técnica

- El repositorio debe tener la rama `main`.
- Páginas: Settings → Pages → Build and deployment → Source = GitHub Actions.
- Con cada push se ejecutan `npm install`, `npm test`, `npm run build`, `npm run audit:dist`, y se genera el artefacto Pages.
- La etapa `deploy` **solo se ejecuta cuando exista la variable de Actions** `RELEASE_APPROVED=true`. Hasta entonces: ningún reemplazo de la web pública por este workflow.
- Configurar dominio custom, HTTPS y registros DNS de acuerdo con [GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
- El proyecto ya lleva `public/CNAME` con `tuahorroeficiente.es`.
- No añadir `base: '/nombre-repo'` si se publica directamente en el dominio propio.

## Revisión previa imprescindible

- Confirmar `npm run build` y salida de `audit:dist` sin errores. Generar y subir `package-lock.json` para reproducibilidad (`npm install` en equipo con red, commit del lockfile, cambiar workflow a `npm ci` si conviene).
- QA visual en móvil real/desktop (al menos 360, 768, 1440 px), comprobar menú, formularios, teclado, `aria` y errores.
- Comprobar si se cargan imágenes remotas y tipografía; sustituir por recursos locales optimizados para evitar dependencias externas.
- Revisar estados HTTP, canonical, sitemap, robots, metadatos Open Graph, Schema.org y enlaces.
- Resolver información de titular y contacto de páginas legales. No publicar placeholders legales.
- Ejecutar copia de seguridad completa de la web actual y construir un mapa por cada una de sus URLs.
- Revisar GSC/backlinks: **GitHub Pages no soporta redirecciones 301 arbitrarias en `.htaccess`**. Si una URL existente debe conservarse, publicar la ruta equivalente funcional conservando la URL o definir infraestructura de redirects que el propietario apruebe; nunca 301 masivos hacia home.
- Revisar privacidad, cookies y recursos externos.

## Activación final

Solo después de validar todos los puntos: `Settings > Secrets and variables > Actions > Variables > New repository variable` con nombre `RELEASE_APPROVED`, valor `true`. Ejecutar workflow mediante push autorizado a `main` o `workflow_dispatch`. Registrar fecha y resultados. Verificar site en dominio y seguimiento GSC.

## Fuentes técnicas

- [Astro en GitHub Pages](https://docs.astro.build/es/guides/deploy/github/)
- [GitHub Pages personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
