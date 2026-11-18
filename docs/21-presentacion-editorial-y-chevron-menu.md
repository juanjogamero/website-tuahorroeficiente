# Decisión 21: sección de presentación y flechas de navegación

**Fecha:** 18/11/2026. **Ámbito:** portada y menú de escritorio. **Estado:** implementado en código; la validación en GitHub Actions se registrará en el commit.

## Referencia y problema

El diseño de Divi Solar Energy muestra, después de la franja de marcas, un bloque centrado de aprox. 968 px con una etiqueta lima, un titular editorial grande y una fotografía oval incrustada, seguido de tres tarjetas en una cuadrícula simétrica. El margen visual es mucho menor que en la versión previa. Las flechas de los desplegables de Calculadoras, Comparativas y Blog se mostraban deformadas por usar el glifo tipográfico `⌄`.

## Ajustes

- Banda de fuentes: separación inferior de 8 px, seguida de 30 px de separación interior antes de la etiqueta; se conserva la aclaración de ausencia de aval institucional.
- Presentación: ancho máximo 968 px, titular de hasta 48 px, tarjetas de 292 px de alto y 22 px de separación.
- Tarjetas: ejemplos matemáticos verificables (18 € y 2,4 m³), sin estadísticas ficticias de clientes.
- Flechas del menú: tres chevrones CSS de 7 px, visibles también en la cabecera negra y con estado al pasar el ratón/teclado.
- Tablet/móvil: cuadrícula adaptable; en móvil las tarjetas mantienen una columna y tamaño táctil.

## Pruebas y reversibilidad

Se añade `tests/presentacion-editorial.test.mjs`; la hoja `src/styles/presentacion-editorial.css` se carga al final y se puede retirar sin modificar el motor de cálculo. La publicación solo se da por completada cuando GitHub Actions confirme build, tests y deploy.
