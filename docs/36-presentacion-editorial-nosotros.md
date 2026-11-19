# ADR 36 — Presentación «Nosotros» diferenciada de la portada

**Fecha:** 19/11/2026 · **Estado:** implementado en la rama principal; CI/CD por confirmar.

## Referencia visual y objetivo
El usuario proporciona la presentación de Divi con título en cuerpo grande, chip lima, una imagen ovalada y tres tarjetas (lima, fotográfica, crema). Pide colocar la siguiente sección en Nosotros, cambiando algo el diseño para **no repetir el mismo bloque de la home**.

## Propuesta implementada
Se mantienen el sistema visual (DM Sans, verde lima, titulares amplios, fotografía gratuita local, esquinas redondeadas), pero se sustituye la composición de tres tarjetas por una **presentación asimétrica**:

1. Columna izquierda: chip «Nuestro propósito», H2 de misión, dos párrafos explicativos y CTA a metodología; subrayado lima integrado en una palabra.
2. Columna derecha: fotografía doméstica `/images/agua-hogar.webp` ya licenciada y preparada por el prebuild. Sobre ella, nota breve sobre la trazabilidad de los cálculos.
3. Franja inferior: tres principios editoriales sobre fondo blanco, separados por líneas finas superiores y numerados 01, 02, 03. Cada principio lleva a un recurso real.

Se diferencia sustancialmente de las tres tarjetas rellenas de la home, sin romper identidad.

## Exactitud y SEO
No se afirman resultados de clientes, porcentajes de ahorro o años de experiencia. Los textos explican entrada de variables, fórmulas y límites de las estimaciones; los enlaces internos conducen a `/herramientas/`, `/metodologia/` y `/comparativas/`. La página mantiene un H1 único en el hero y utiliza H2/H3 semánticos; se conserva el metatítulo y la canonical del entorno de pruebas.

## Responsive y accesibilidad
Dos columnas en escritorio, una debajo de 760px. Tres principios en fila pasan a lista vertical móvil. El botón principal tiene altura mínima 48–50px; enlaces con foco visible. Imagen lazy y con texto alternativo contextual; el fondo de la nota tiene contraste y no se requieren nuevas dependencias.

## Estado de validación
Pruebas estructurales añadidas en `tests/seccion-nosotros-identidad.test.mjs` y test previo del hero actualizado. El resultado final del workflow y QA visual deben confirmarse antes de dar por desplegado.
