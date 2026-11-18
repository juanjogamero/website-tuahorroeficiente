# Decisión visual 19 — Hero y franja de referencias conforme a la captura

**Fecha:** 18/11/2026  
**Ámbito:** solo cabecera/portada; sin cambios en calculadoras, rutas ni contenido SEO.  
**Estado:** implementado en CSS, verificación CI requerida tras cada commit.

## Referencia

La captura facilitada muestra un hero fotográfico con 20 px aproximadamente de margen lateral, 22 px superior, radio redondeado y una altura próxima a 750 px para una ventana de 860 px. Inmediatamente después aparece la cabecera centrada de referencias, sin un hueco vertical excesivo.

## Cambios

- Hero escritorio: `height: clamp(700px, calc(100svh - 84px), 780px)` y márgenes `22px 20px 0`, radio de 20 px.
- H1 y tarjetas centrados en una columna editorial de unos 960 px, sin comprometer la legibilidad.
- Menú cápsula translúcida alineado con el texto; se vuelve negro tras scroll como antes.
- Primera sección blanca: padding superior 42 px en escritorio, 38 px en tablet y 34 px en móvil; se conservan siete referencias documentadas con aclaración de ausencia de aval.
- El hero móvil continúa adaptable al contenido y el menú táctil se conserva.

## Verificación

Pruebas de regresión de CSS y HTML en `tests/escala-header-hero.test.mjs` y `tests/cabecera-referencias.test.mjs`. El workflow GitHub Pages comprueba el conjunto y el build Astro antes de desplegar.

## Nota de alcance

El contraste visual se basa en la captura del usuario, no en archivos originales del tema Divi. No representa una certificación píxel a píxel.
