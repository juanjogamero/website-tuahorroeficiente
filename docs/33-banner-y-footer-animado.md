# ADR 33 — Banner final y footer fotográfico con tipografía móvil

Fecha: 19/11/2026  
Estado: implementado; publicación confirmada únicamente por GitHub Actions.

## Objetivo y posición
La captura de referencia muestra un banner ancho de imagen con mensajes centrados y dos botones lima. Justo debajo aparece un pie fotográfico oscuro con navegación y una enorme línea de texto que se mueve de derecha a izquierda.

En portada se colocan en este orden: FAQ → banner → footer. Para no dejar contenido intermedio se eliminan **solo de la portada** las antiguas secciones de áreas de ahorro, CTA redundante y tres tarjetas del blog. Sus páginas, URLs, herramientas y guías siguen existiendo y son accesibles desde el menú y el nuevo footer.

## Decisiones
- Banner con ancho máximo de 1540 px, mayor que la referencia aportada, y márgenes adaptables. Fotografía local `vida-hogar.webp` con veladura oscura, texto de alta legibilidad y dos enlaces reales: /herramientas/ y /comparativas/.
- Footer presente en todas las páginas, situado bajo la portada y rediseñado en fotografía local diferente `placas-tejado.webp`, overlay oscuro, identidad, navegación, enlaces al proyecto y legales; no se inventan teléfono, dirección, clientes, servicios de consultoría ni correo de suscripción.
- No se incorpora newsletter porque GitHub Pages es estático y no hay servicio de email conectado. En su lugar, el encabezado del footer dirige a herramientas y guías, sin formulario decorativo que no funcione.
- Banda tipográfica gigante inferior con dos copias idénticas y animación CSS continua de derecha a izquierda. `aria-hidden="true"` para contenido decorativo, sin scroll horizontal por overflow de contenedor. `prefers-reduced-motion: reduce` cancela animación y oculta duplicado.
- Tablet y móvil: banner flexible, botones grandes, footer en una o dos columnas, tipografía adaptada, enlaces accesibles por teclado. Todo sin nuevas dependencias.

## Verificación
`tests/banner-pie-final.test.mjs` comprueba orden de secciones, navegación, duplicación de banda, reducción de movimiento, ausencia de formularios falsos e import CSS. Pruebas antiguas de orden actualizadas sin afectar cálculos. GitHub Actions compila Astro y audita Pages; revisión de animación visual en navegadores reales será independiente.
