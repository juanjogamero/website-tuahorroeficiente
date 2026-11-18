# Cambio 01 — Cabecera y hero según captura de referencia

Fecha: 18/11/2026. Alcance: únicamente `Header.astro`, la sección hero de `index.astro`, estilos de ambos y metadatos de la portada.

## Objetivo
- Respetar la geometría de la referencia Divi facilitada: cápsula translúcida, menú horizontal, fotografía a ancho completo, H1 blanco de dos líneas, CTA lima, dos tarjetas y titular sobredimensionado superpuesto.
- Mantener tipografía DM Sans y la paleta existente. No copiar la marca ni el logotipo de Divi.
- Usar contenido original, verificable y centrado en la intención de búsqueda del proyecto.

## Redacción
- H1: «Calcula cuánto gastas en luz, agua y calefacción».
- Descripción: variables que el usuario efectivamente introduce: potencia, horas, precios; resultados en kWh, litros y euros.
- CTA principal: «Calcular gratis» (enlace al índice de herramientas).
- Tarjeta principal: coste por aparato y acceso a calculadora de consumo eléctrico.
- Tarjeta secundaria: 7 calculadoras; cifra obtenida del inventario de herramientas y comparativas del código (6 individuales + 1 comparativa).
- Rótulo: «AHORRO REAL», recurso visual, sin afirmar ahorros promedio ni ofrecer garantías.

## Fuentes consultadas
- CNMC — Comercialización y suministro eléctrico: https://www.cnmc.es/facil-para-ti/que-hace-la-cnmc-para-consumidores/comercializacion-y-suministro-electrico
- IDAE — Guía de la energía: https://www.idae.es/guia-de-la-energia

La CNMC diferencia términos fijos de potencia y términos variables de energía: nuestras estimaciones de aparatos no equivalen a una predicción integral del recibo. El texto principal presenta cálculos, no ahorros garantizados ni rankings SEO.

## Verificación y despliegue
Pruebas locales realizadas (antes de subir): 18/18 pruebas Node correctas; vista previa con Chromium a 320, 375, 390, 720, 768, 980, 1024, 1100, 1200, 1280, 1300, 1366, 1440, 1733 y 2048 px, sin scroll horizontal; menú móvil abre correctamente. A 1733 px: cápsula x=273, y=18, titular x=273 y≈189, CTA y≈470, tarjetas y≈541 y rótulo y≈780. La vista previa local no sustituye al build Astro.

Pendiente de completar tras el commit: GitHub Actions, auditoría de 33 páginas, revisión de la URL de GitHub Pages. La demo se mantiene en `noindex`.
