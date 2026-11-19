# ADR 31 — Dos rutas para empezar, sin precios ficticios

**Fecha:** 19/11/2026. **Estado:** implementado; confirmar CI/CD.

## Decisión
La referencia muestra una sección de precios con tres columnas: texto editorial a la izquierda, dos tarjetas crema a la derecha, importe destacado y botones negros. Tu Ahorro Eficiente no vende planes ni suscripciones; copiar precios falsearía el producto y perjudicaría la confianza.

Se conserva el lenguaje visual, pero se sustituye la función comercial por **dos recorridos de entrada**: calcular consumo y comparar alternativas.

## Contenido
- **Calcula tu consumo:** datos editables de potencia o consumo, duración y precio; enlaza al catálogo `/herramientas/`.
- **Compara alternativas:** consumos, coste por uso, frecuencia y supuestos; enlaza a `/comparativas/`.
- Los números 01 y 02 son **identificadores de rutas**, no cantidades de ahorro ni precios. La sección explica explícitamente que no hay contratación.
- No se anuncian ahorros garantizados. Los directorios de destino existen en Astro y contienen herramientas reales.

## Composición y UX
Grid 3 columnas en escritorio, 2 tarjetas tras intro a ancho intermedio, 1 columna móvil. Tarjetas de fondo crema, separador gris, checklist con cuatro ítems y botones negros con mínimo 46–48 px. Foco accesible; sin dependencias ni animaciones.
Se inserta **después de los tres casos fotográficos** y antes de categorías.

## Alcance y pruebas
No se modifican fórmulas, rutas, metadatos SEO, catálogo fotográfico ni producción. Pruebas `tests/primeros-pasos.test.mjs` + compilación y auditoría de GitHub Actions.
