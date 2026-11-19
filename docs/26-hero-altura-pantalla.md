# ADR 26 · Hero hasta el borde inferior visible

**Fecha:** 19 de noviembre de 2026  
**Estado:** implementado; validación y despliegue registrados en GitHub Actions.

## Contexto

En la captura de escritorio el hero termina antes del borde inferior de la ventana y ya se ve parte de la franja de referencias. La regla `clamp(780px, calc(100svh - 84px), 840px)` imponía un techo a la altura incluso en monitores más altos.

## Decisión

- Escritorio a partir de 1151 px: `height: max(780px, calc(100svh - 22px))`, compensando los 22 px de margen superior.
- Portátiles entre 981 y 1150 px: `height: max(720px, calc(100svh - 18px))` y margen superior de 18 px.
- Tablet entre 721 y 980 px: `min-height: max(760px, calc(100svh - 14px))` y altura flexible, evitando recortar contenido.
- Móvil hasta 720 px: mantener altura ajustable al contenido y mínimos adaptados para garantizar legibilidad y navegación táctil.
- `AHORRO REAL` continúa anclado al borde inferior del hero, sin ampliar fuentes, tarjetas ni romper su separación.

## Alcance

Solo dimensiones del hero. Se conservan foto, menú fijo y estado negro al hacer scroll, textos y enlaces, franja de fuentes, SEO, calculadoras y la configuración noindex de Pages.
