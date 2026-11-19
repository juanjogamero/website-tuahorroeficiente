# ADR 29 — Beneficios tras la sección oscura

**Fecha:** 19/11/2026  
**Estado:** Implementado en código. La publicación se confirma mediante GitHub Actions.

## Referencia de diseño
Captura proporcionada por el usuario: imagen horizontal a la izquierda, etiqueta lima y titular amplio a la derecha; a continuación cuatro mensajes en una sola fila, cada uno con icono circular lima, título y descripción gris. No se añaden tarjetas con fondo ni sombras.

## Adaptación al portal
La imagen elegida es `/images/lavanderia.webp`, fotografía del catálogo gratuito ya documentado, no repetida en otros bloques grandes de la portada. Se adapta a la vida doméstica, no a servicios de instalación de aerogeneradores.

Mensajes centrados en utilidades reales, sin cifras no verificadas:
- Datos a tu medida: potencia, horas y tarifas editables.
- Fórmulas transparentes: operaciones y supuestos visibles.
- Comparativas útiles: escenarios con condiciones consistentes.
- Gratis y sin registro: acceso sin cuenta.

## Composición
Contenedor máximo 1220px, primer bloque 2 columnas, imagen 2.05:1, segundo bloque 4 columnas. Tablet: ventajas 2×2. Móvil: foto, título y ventajas apiladas; iconos a la izquierda para mejorar la lectura.

## Alcance
Se inserta inmediatamente después del bloque oscuro y antes de categorías. No modifica fórmulas, URLs, blog, SEO, cabecera, producción ni dependencias. Accesibilidad: encabezado asociado, imágenes con alt, iconos decorativos ocultos a lectores de pantalla.

## Pruebas
`tests/beneficios-portada.test.mjs` verifica orden, contenido, imagen, retícula y reglas responsive. Tras el commit, validar el workflow de compilación y Pages.
