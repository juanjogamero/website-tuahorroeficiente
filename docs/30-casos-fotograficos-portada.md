# ADR 30 — Tres escenarios fotográficos en portada

**Fecha:** 19 de noviembre de 2026
**Estado:** implementado en rama main; verificar GitHub Actions.

## Referencia
La captura compartida presenta una etiqueta lima centrada, titular de gran formato en dos líneas, tres imágenes verticales alineadas, botones circulares lima con flecha diagonal arriba a la derecha y paneles translúcidos de cristal superpuestos en la base.

## Adaptación editorial
Se sustituyen las referencias a supuestos proyectos de instalaciones solares, testimonios de clientes o direcciones inventadas por **tres situaciones calculables**: aire acondicionado, gasto de una ducha y horno frente a freidora de aire. Toda la tarjeta es un enlace accesible a la calculadora o comparativa existente.

Las imágenes locales y gratuitas están documentadas en `docs/22-fotografia-editorial-y-licencias.md`: climatización exterior, grifo y horno. Son fotografías diferentes de las mostradas en la sección oscura inmediatamente anterior.

## Ubicación y eliminación de duplicados
La sección va justo después de los beneficios (foto de lavandería y cuatro ventajas), antes de las tarjetas de áreas de ahorro. El bloque anterior de escenarios numéricos se elimina, porque duplicaba el propósito editorial de los nuevos casos.

## Diseño y accesibilidad
Máximo 1175px, 3 columnas escritorio, 2 tablet y 1 móvil; fondo blanco, card ratio aproximado 1:1, filtro blur en ficha inferior con contraste oscuro. Fotografías lazy y locales. Cada enlace tiene nombre accesible; el icono visual no duplica el texto de lectura.

## Alcance
No se modifican motores de cálculo, URLs, SEO, Search Console ni dominio principal. Las pruebas automatizadas y el workflow validan estructura y publicación; revisión visual manual final recomendada.
