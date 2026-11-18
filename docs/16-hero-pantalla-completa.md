# Decisión de diseño 16 — Hero a altura de pantalla y rótulo degradado

**Fecha:** 18 de noviembre de 2026  
**Estado:** Implementado para revisión en la demo de GitHub Pages  
**Ámbito:** Solo cabecera y hero de portada; el resto de páginas y los cálculos permanecen intactos.

## Problema detectado

El cambio anterior limitaba el hero a 640–730 px, el H1 a 43–58 px y las tarjetas a 113 px. En monitores grandes, quedaba una gran porción de la sección siguiente a la vista y el bloque principal parecía pequeño. El usuario ha solicitado que el hero ocupe la pantalla y que el texto «AHORRO REAL» se apoye en el límite inferior con un degradado de opacidad.

## Decisión

- Altura del hero en escritorio: `100svh`, con mínimo de 710 px por legibilidad. Así ocupa la altura visual de pantalla sin cortar el contenido en monitores bajos.
- Titular escritorio: de 56 a 76 px, descripción 16 px, CTA 48 px; tarjetas 130 px.
- Barra: 64 px, con ancho máximo de 1250 px.
- El rótulo se ancla al borde inferior y su texto pasa de opaco arriba a totalmente transparente abajo, usando `background-clip:text` y un degradado vertical.
- Tablet y móvil: también usan `100svh`, pero su altura mínima permite que el contenido no se recorte por cambios de tamaño de la interfaz del navegador.
- Se conservan DM Sans, la foto original, los enlaces funcionales y la paleta.

## Verificaciones exigidas

1. Las pruebas de regresión de cabecera, contenido y fórmulas deben pasar.
2. La compilación Astro debe generar todas las páginas sin incidentes de rutas y recursos.
3. La vista previa responsive no debe mostrar desbordamiento horizontal, colisión de CTA/tarjetas ni texto esencial recortado.
4. El workflow de GitHub Pages debe terminar con éxito.

## Reversibilidad

El ajuste está aislado en `src/styles/header-hero-proporciones.css`. Una nueva iteración puede modificar las dimensiones sin tocar textos, plantilla o calculadoras.
