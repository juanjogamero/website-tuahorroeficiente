# ADR 27 — Servicios temáticos en sección oscura con título sticky

**Fecha:** 19 de noviembre de 2026

## Objetivo

Reproducir la composición proporcionada como referencia: bloque oscuro redondeado a ancho de página, columna izquierda con chip, titular grande y CTA, columna derecha con tarjetas blancas numeradas, separador, descripción, botón negro y fotografía relacionada.

## Decisión técnica

- Reemplazar la sección clara anterior ("Menos promesas. Más transparencia.") por la nueva sección oscura, inmediatamente después de las tarjetas de herramientas de la portada.
- Mantener el encabezado izquierdo con CSS `position: sticky` en escritorio a partir de 1101 px; el título acompaña visualmente el desplazamiento de las tarjetas hacia arriba y hacia abajo mientras está dentro de la sección.
- No utilizar JS de scroll, scroll-jacking, animaciones forzadas ni dependencias, para preservar el desplazamiento nativo, rendimiento y accesibilidad.
- En tablet y móvil, desactivar el sticky y usar una única columna con botones táctiles de al menos 44 px.
- Mostrar las cuatro áreas reales del portal: electricidad, climatización, agua y electrodomésticos. Fotografías existentes y verificadas en `/images/`.
- Mantener enlaces internos a hubs existentes y mensajes sin cifras de ahorro inventadas.

## Validación

Pruebas estructurales `tests/soluciones-sticky.test.mjs` y pipeline de GitHub Actions. Comparación visual manual y pruebas de scroll en dispositivos reales siguen siendo recomendables.

## Alcance

No se modifican calculadoras, metadatos SEO, rutas publicadas, cabecera ni sitio de producción.
