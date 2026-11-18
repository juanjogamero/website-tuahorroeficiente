# Control de calidad y criterios pendientes

## Comprobado en esta elaboración

- Funciones TypeScript de cálculos puros: `npm test` completado correctamente, **10 pruebas / 10 exitosas**.
- Tipos del motor, catálogo y JS cliente: `tsc --noEmit --target ES2022 --module esnext --lib es2022,dom --skipLibCheck ...` sin errores.
- En vista previa: 32 HTML con referencias locales comprobadas (0 enlaces/recursos locales inexistentes).
- Rutas Astro definidas: home, hubs de herramientas, comparativas y categorías, páginas dinámicas, blog, metodología, fuentes, contacto, 3 legales, 404.
- HTML inicial de resultados renderizado en servidor por los componentes Astro (pendiente confirmar build).
- Rediseño estructural en cabecera, portada, pie y CSS interior; vista previa de 32 páginas con cero enlaces relativos rotos.
- Tests visuales en memoria sin navegación externa de portada, calculadora, blog, guía y categoría, en escritorio/móvil: cero desbordamientos horizontales.

## No comprobado; pruebas reales obligatorias

- `npm install` y `npm run build` (registro npm inaccesible desde esta sesión).
- `npm run audit:dist` en el resultado real.
- Interactividad en Chrome/Safari/Firefox y dispositivos físicos, teclado, lector de pantalla. La navegación directa a `file://` fue bloqueada, pero se pudieron realizar pruebas de renderización con HTML y CSS en memoria (Chromium/Playwright) para cinco URLs de vista previa a 1440 y 390 px. En las 10 combinaciones comprobadas no hubo desbordamiento horizontal. No se ha completado el QA funcional real con imágenes, fuentes y redes.
- Integridad de imágenes WebP locales y caché de GitHub Pages en despliegue real.
- Foco visible, contraste WCAG 2.2 AA y Core Web Vitals p75 reales.
- Acceso real de Google Search Console y propiedad DNS.
- Continuidad/301 de 23 URLs antiguas y datos de enlace externo.
- Datos verificados del titular, privacidad/cookies y canal de correcciones.
- Publicación en GitHub Pages y cualquier métrica SEO de tráfico/indexación.

**No cambiar estado de tarea de IMPLEMENTADO a PROBADO sin evidencia.** Un motor matemático con pruebas correctas no implica que la interfaz completa esté verificada. Un script de CI preparado no implica que un deploy haya ocurrido.

## Actualización v4 (18/11/2026)

La reconstrucción v4 usa fotografía propia local y CSS basado directamente en la última captura del usuario. Ver `11-diseno-fiel-v4.md`. El estado de compilación Astro continúa pendiente. La preview HTML no demuestra un build exitoso.
