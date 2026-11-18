# 23 · Indicadores y soluciones de portada

**Estado:** implementado en código; GitHub Pages se verifica por CI.

## Referencia visual

Se reproduce el siguiente tramo de la plantilla de referencia tras las tres tarjetas de presentación: franja de cuatro estadísticas con etiquetas pequeñas, cifras grandes y líneas inferiores, y bloque de soluciones con etiqueta lima, titular editorial, texto a la derecha y cuatro tarjetas numeradas con fotografías en la parte inferior.

## Adaptación de contenido

La plantilla original contiene métricas comerciales como clientes, megavatios instalados y experiencia. No se trasladan: Tu Ahorro Eficiente no presta ese servicio ni dispone de esas cifras. Se muestran recuentos verificables del propio portal: **7 calculadoras, 9 guías, 4 áreas y acceso gratuito**. Las tarjetas enlazan a electricidad, climatización, agua y comparativa horno/freidora.

## Decisiones de maquetación

- Estadísticas bajo las tres tarjetas, con separación editorial proporcionada.
- Servicios en cuatro columnas en escritorio, dos en tablet y una en móvil.
- Fotografía específica por temática; los archivos son locales tras el paso de compilación.
- No se cargan librerías ni componentes interactivos nuevos.
- El enlace ocupa toda la tarjeta, y las tarjetas mantienen indicador visible de foco.
- No se modifican fórmulas, rutas, contenido legal ni SEO de producción.

## Verificación

`npm test`, `npm run build`, `npm run audit:dist` en GitHub Actions, más revisión visual responsive donde esté disponible. No confundir tests de estructura con auditoría visual real de dispositivos.
