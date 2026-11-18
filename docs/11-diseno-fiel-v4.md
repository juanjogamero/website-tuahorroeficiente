# ADR-011 — Reconstrucción basada directamente en captura del usuario

**Fecha:** 18/11/2026. **Estado:** implementada en archivos Astro y vista previa local; compilación Astro, aceptación visual final y despliegue aún pendientes.

## Base observada

La referencia entregada por el usuario tiene tamaño **736 × 1.039 píxeles** y representa un diseño de escritorio reducido. Se usa para preservar la posición relativa de componentes; no representa CSS obtenido del pack comercial.

Secuencia y proporciones reproducidas en la home:

1. Hero contenido en rectángulo con margen exterior y radios cortos; foto de renovables a toda el área.
2. Menú en cápsula flotante semitransparente centrada sobre el hero, logotipo a izquierda, CTA amarillo-lima a derecha y desplegables centrales.
3. H1 blanco de dos líneas al comienzo de la primera mitad; párrafo compacto; CTA lima.
4. Ficha flotante blanca con miniatura y resumen a izquierda, segunda ficha angosta con indicador numérico factual a su derecha.
5. Palabra gigante semitransparente anclada al borde inferior del hero.
6. Banda blanca de referencias en gris sin fingir socios ni avales.
7. Separación amplia; píldora de introducción lima; titular editorial de gran tamaño y bajo peso, con fotografía ovalada dentro de la línea.
8. Tres tarjetas equivalentes: lima, fotográfica y crema; cuatro métricas tipográficas debajo, separadas por líneas.
9. Continuación coherente: tarjetas numeradas de servicios, sección editorial fotográfica, categorías, ejemplos reproducibles, preguntas frecuentes, CTA y blog.

## Geometría contrastada en la vista previa a 1.440 px

- Hero: comienza aproximadamente en `y=22`, altura **855 px**.
- Banda de confianza: comienza en `y=877`, altura aproximada **159 px**.
- Bloque de introducción: comienza en `y=1036`, primera pastilla visual en torno a `y=1130`.
- Tres tarjetas: `y≈1468`, alto **330 px**.
- Métricas: `y≈1885`.

Estas posiciones guardan una relación muy próxima a las de la imagen de referencia escalada por un factor aproximado de dos. El contenido es diferente, de modo que **no se afirma equivalencia píxel a píxel**.

## Diseño interior

Todas las páginas comparten encabezado en cápsula, imagen de hero, tipografía DM Sans, acentos lima, tarjetas redondeadas, fondos crema, pie con columnas, bloques de fuentes y CTA. Las páginas de herramientas conservan el formulario y el resumen de cálculos con lectura y contraste mejorados. El blog ofrece índice y guías con encabezados fotográficos.

## Decisiones de honestidad

- `7` herramientas, `9` guías y `4` áreas describen contenido del propio repositorio, no usuarios ni tráfico.
- `18 €`, `2,4 m³` y `20,80 €` son resultados calculados de ejemplos declarados, no ahorros promedio.
- Las fuentes IDAE/CNMC/EPREL aparecen señaladas como *consultadas, no colaboradoras*.
- La foto del hero es original; no se reutilizan los archivos comerciales del pack ni datos/testimonios ficticios de su demostración.

## Verificaciones

- 10/10 pruebas de cálculo: correctas.
- `tsc --strict` con las librerías del motor y del cliente: sin errores.
- 32 documentos HTML de vista previa generados, con enlaces y recursos locales comprobados.
- Chromium en 1.440 y 390 píxeles: portada, blog, calculadora y guía sin desbordamiento horizontal.
- Previsualización en memoria con recursos WebP locales embebidos para verificar carga visual.
- Pendiente `npm install`, `astro build`, revisión de accesibilidad y QA en navegador externo/dispositivo real.

**Producción intacta:** sin commits, despliegues ni redirecciones.
