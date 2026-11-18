# ADR 17 — Experiencia móvil prioritaria

Fecha: 18/11/2026. Estado: implementado; despliegue por GitHub Actions.

## Decisión

La web estática debe ser fácil de operar con una sola mano. Sin añadir frameworks, se mantiene el lenguaje visual de la portada y se mejoran interacciones.

- Menú nativo `<details>` con etiquetas y acciones claras: acceso inmediato a calculadoras, agrupación por temáticas y panel desplazable. Se cierra con Escape, toque exterior o selección; funciona sin JS para abrir y cerrar.
- Objetivos táctiles de al menos 44–52 px y tipografía accesible.
- Hero de altura mínima `100svh`, pero **sin recortar el contenido** en pantallas pequeñas. Dos tarjetas apiladas y cifra secundaria en banda horizontal.
- Páginas interiores simplificadas: formulario de una columna, entradas de 16 px (evita zoom automático en iPhone), botones amplios y resultado debajo del formulario.
- Tras enviar la calculadora en <=890 px, el resultado recibe foco y se desplaza a la vista, con respeto a `prefers-reduced-motion`. Los resultados anuncian cambios a tecnologías de asistencia.
- No se modifican fórmulas, rutas SEO ni la estructura de artículos de escritorio.

## Criterios de revisión

Aprobar: sin desplazamiento horizontal a 320, 360, 390, 430, 768 px; menú usable con teclado y dedo; tarjetas no se solapan; formularios visibles, teclados decimales y resultado identificado; GitHub Actions build y audit sin incidencias.

**Limitaciones:** las comprobaciones automatizadas no sustituyen las pruebas manuales en Safari de iPhone y Chrome de Android con teclado real y lector de pantalla.
