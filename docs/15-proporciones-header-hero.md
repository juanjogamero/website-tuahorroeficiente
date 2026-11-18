# Decisión de diseño 15 — Escala equilibrada del header y el hero

**Fecha:** 18/11/2026  
**Estado:** Implementado en la rama `main` de pruebas; sujeto a CI antes de darse por desplegado.  
**Ámbito:** Cabecera y primera sección de la portada. No afecta a herramientas ni artículos.

## Problema

La captura de referencia estaba mostrada a gran tamaño para inspeccionar sus elementos, pero su escala se trasladó literalmente. En escritorio, el hero de la versión anterior alcanzaba una altura mínima de 840 px; el H1 llegaba a 86 px y el rótulo decorativo, a 250 px. Esa relación dificultaba ver la siguiente sección sin hacer scroll y resultaba desproporcionada.

## Decisión

Mantener la estructura de referencia: barra translúcida, foto de fondo, titular y descripción a la izquierda, CTA lima, dos tarjetas y el gran texto `AHORRO REAL` en la base. Ajustar únicamente **escala y espaciados** mediante un archivo independiente `src/styles/header-hero-proporciones.css`, cargado después del tema existente.

| Componente | Nueva medida para escritorio (orientativa) |
| --- | --- |
| Hero | 640–730 px de altura mínima según ancho |
| Barra de navegación | 60 px de alto, máximo 1180 px de ancho |
| H1 | Entre 43 y 58 px |
| Texto descriptivo | 14 px, interlineado 1,65, ancho máximo 730 px |
| CTA | 42 px de alto |
| Tarjetas flotantes | Unos 113 px de alto, 565 px en conjunto |
| Rótulo inferior | Entre 74 y 155 px; decorativo, no semántico |

En móvil los títulos, tarjetas y margen se reducen aún más, manteniendo el menú accesible. No se ha sustituido la tipografía **DM Sans** ni la paleta aprobada.

## Comprobaciones locales

- CSS verificado en Chromium en 15 anchuras entre 320 y 2048 px: sin overflow horizontal.
- A 1440 px, hero de 706 px y encabezado de 60 px; a 390 px, hero de 700 px y barra de 56 px.
- Se conserva un único `h1`, el CTA a calculadoras, las tarjetas y el menú móvil.
- Se ejecuta `npm test`. El build real y auditoría de producción se comprueban mediante GitHub Actions tras el commit.

## Reversibilidad

Para revertir los nuevos tamaños basta con retirar la importación de `header-hero-proporciones.css` en `BaseLayout.astro`. No se han modificado datos ni fórmulas.
