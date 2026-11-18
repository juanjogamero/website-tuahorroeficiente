# ADR-009 — Rediseño inspirado en Divi Solar Energy Layouts Pack

**Fecha:** 18/11/2026

## Referencia y alcance observado
- Original: https://layouts.divi-templatespro.com/divi-solar-energy-layouts-pack/
- Se estudiaron la secuencia de portada y navegación pública, incluyendo `Home`, `About`, `Pages`, `Projects`, `Blog` y `Contact`, la jerarquía de hero, franja de confianza, bloque sobre el proyecto, servicios numerados, razones de elección, mosaico de proyectos, testimonios, precios, FAQ, CTA, blog y pie.
- Este producto no es una empresa instaladora: NO replicamos testimonios, logos de marcas, clientes, ahorros o planes comerciales ficticios del ejemplo Divi.
- El acceso remoto no permitió recuperar una captura cromática/pixel-perfect de la totalidad de las páginas ni los estilos exactos. Se replica la estructura de composición observada con CSS original, no los archivos, recursos de marca ni el código comercial de Divi.

## Cambios ejecutados
- Header de doble franja, menú desplegable y CTA; responsive.
- Hero editorial oscuro con titular gigante y collage de fotografías solapadas.
- Banda de atributos de confianza sin logotipos de terceros inventados.
- Story dos columnas, foto y datos verdaderos del producto (7 simuladores en el código), servicios numerados, beneficios, categorías en fotografías, escenarios numéricos verificables, tres rutas de uso gratuitas (en lugar de planes de pago), FAQ, CTA editorial, artículos y footer oscuro.
- Páginas interiores: mismo fondo de cabecera, tipografía, paleta, tarjetas, bordes y resultados.
- Paleta original de la marca: azul petróleo `#132b36`, verde azulado `#147d80`, coral `#f57659`, amarillo `#ffcf55`, blanco y crema `#f6f8f3`.

## Compatibilidad y límites
- Astro/TypeScript compilación estática para GitHub Pages.
- Sin dependencias JavaScript nuevas, cuentas, suscripciones, datos personales ni infraestructura adicional.
- Fotografías de Unsplash referenciadas por URL (sustituir por archivos optimizados locales antes de lanzamiento definitivo). No se empaquetan fotografías del tema Divi.
- El cambio de diseño NO autoriza borrar/redirigir URLs antiguas; cualquier despliegue en dominio queda bloqueado por migración SEO y legal.

## Validación
- Cálculos originales sin cambios; ejecutar `npm test`.
- Compilación de Astro con `npm run build` y auditoría en `npm run audit:dist` cuando existan dependencias npm.
- Inspección visual a 1440, 768 y 375 px en entorno de navegador para cerrar la reproducción fiel.
