# Decisión de diseño 25 — escala editorial en pantallas anchas

Fecha: 19/11/2026. Estado: implementado en código; build y despliegue requieren confirmación de Actions.

## Problema observado

Comparando las capturas de la referencia Divi y de nuestra vista de pruebas, la sección introductoria queda visualmente pequeña y demasiado centrada en monitores de escritorio muy anchos. El usuario solicita un aumento moderado sin perjudicar el móvil.

## Ajuste adoptado

- Contenedor editorial máximo: 1200 px (antes 968 px), con márgenes fluidos.
- Titular: hasta 54 px, con tipografía DM Sans y el mismo peso y ritmo; fotografía oval ampliada a 122×55 px.
- Tres tarjetas: altura adaptable de 292 a 358 px y espacio entre tarjetas de 24 px. Títulos y descripciones ligeramente mayores.
- Cuatro métricas: etiquetas 14 px y cantidades hasta 60 px, con retícula conservada.
- Tablet (721–980 px): mantiene la retícula anterior y adapta cifras a 36 px.
- Móvil (hasta 720 px): conserva una columna de tarjetas y dos columnas de indicadores; cifras de tarjetas a 36 px y entradas táctiles intactas.

## Fuera de alcance

No se cambian datos, cálculos, imágenes, enlaces, contenido SEO, cabecera ni dominio de producción.

## Validación

Pruebas de regresión ampliadas en `tests/presentacion-editorial.test.mjs` y `tests/resumen-soluciones.test.mjs`; validar build de Astro y publicación en GitHub Pages antes de marcar como desplegado.
