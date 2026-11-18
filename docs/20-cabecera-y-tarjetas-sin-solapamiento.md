# Decisión 20 — Cabecera contenida y hero sin solapamientos

**Fecha:** 18/11/2026  
**Estado:** Implementado y verificado localmente; CI y despliegue se comprueban después del commit.

## Problema observado

En la captura comparativa proporcionada por el usuario, la cápsula de navegación aparecía unos píxeles por encima del borde superior del hero. El H1 ocupaba tres líneas en escritorio, empujando las tarjetas inferiores sobre el rótulo decorativo «AHORRO REAL». No es un fallo de z-index: el contenido y el rótulo ocupaban el mismo espacio vertical.

## Solución

- Declarar `page-home` solamente en la ruta de portada; posicionar la cabecera 16 px dentro de la foto (`hero` con margen 22 px y cabecera `top:38px`) al inicio. En desplazamiento, la cabecera conserva el estado negro y sube a `top:14px`.
- Ensanchar el área del titular a 950 px y equilibrar su tamaño para mantener dos líneas a resoluciones habituales, sin reducir la tipografía a tamaños diminutos.
- Reservar altura mínima de 780 px en escritorio y moderar el tamaño del rótulo; las tarjetas deben terminar al menos 32 px antes de empezar «AHORRO REAL».
- En tablet y móvil la cabecera comienza 13–15 px dentro del hero y se contrae al desplazarse. No se altera el formulario ni las funciones de cálculo.

## Control de calidad

Verificación ejecutada con Chromium en 16 combinaciones de viewport entre 320 y 1920 px, incluyendo escritorios de 700 px de alto. No se detecta scroll horizontal; la cabecera queda al menos 13 px dentro del hero y la distancia tarjeta-rótulo es ≥35 px en escritorio (1791 × 864: 48,2 px). En 1791 px el H1 ocupa dos líneas. `npm test`: 31/31 pruebas correctas. La verificación de Astro y el despliegue definitivo se ejecutan en GitHub Actions. Ningún dato SEO ni fórmula se modifica.

## Reversibilidad

Revertir el commit elimina la clase de portada y recupera las proporciones anteriores. La capa de CSS de referencia mantiene la franja editorial.
