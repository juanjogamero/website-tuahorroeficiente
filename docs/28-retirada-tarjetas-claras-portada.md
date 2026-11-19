# ADR 28 — Retirar bloque redundante de tarjetas claras

**Fecha:** 19/11/2026  
**Decisión:** eliminar temporalmente de la portada la sección «Herramientas útiles para un hogar eficiente» (cuatro tarjetas con fotografías), situada entre los indicadores y la sección oscura.

## Motivo

La secuencia solicitada es: presentación editorial → cuatro indicadores → sección oscura con cuatro categorías y título sticky. El bloque claro intermedio rompe la secuencia visual de la referencia y duplica enlaces.

## Alcance ejecutado

- Eliminada únicamente esa sección del HTML de la portada.
- Eliminadas las reglas CSS exclusivas del bloque retirado, conservando los cuatro indicadores y sus estilos responsive.
- Actualizadas las pruebas para validar el orden y la ausencia del bloque redundante.
- Conservadas todas las herramientas, las páginas de categorías, las URLs y las fotografías del proyecto. No se cambia Search Console, DNS ni la web de producción.

## Verificación

Comprobar pruebas Node, compilación de Astro, auditoría de enlaces y resultado del despliegue mediante GitHub Actions.
