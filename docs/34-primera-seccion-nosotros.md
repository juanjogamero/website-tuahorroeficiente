# ADR 34 — Reinicio de la página Nosotros

**Fecha:** 19 de noviembre de 2026
**Estado:** implementado (CI/CD pendiente de verificar)

## Instrucción editorial

Eliminar las secciones actuales de la página Nosotros y construir únicamente la primera sección de la referencia enviada: cabecera de navegación sobre fotografía, titular grande a la izquierda, ruta de navegación con icono de inicio y separador horizontal.

## Decisión

- Sustituir el uso anterior de `ContentLayout` por `BaseLayout` para retirar los bloques duplicados y el encabezado interior genérico. La página contiene solo **una** sección.
- Texto del H1 «Nosotros», enlace de migas «Inicio › Nosotros» y metadatos descriptivos verídicos del proyecto.
- Reutilizar la fotografía local `public/images/aerogenerador.webp` con degradado suave, sin nuevos bancos ni descarga. Encabezado de cápsula global, con anchura específica en escritorio para replicar la referencia; sigue siendo negro al desplazarse.
- Usar altura visual cercana a la captura de 380–410px en escritorio y 332px en móvil. No añadir contenido, estadísticas ni llamadas a la acción.
- Mantener footer global y páginas de herramientas, guías, categorías y contacto intactas. Dejar el resto del área principal en blanco para incorporar posteriormente más secciones.
- Estilos encapsulados en `src/styles/pagina-nosotros.css`, etiqueta `page-about` calculada por ruta en BaseLayout. No hay JS nuevo ni dependencias.

## Verificación

Tests de estructura de la página, ruta de migas, fotografía local, breakpoint móvil y aislamiento del layout. GitHub Actions confirma compilación Astro y auditoría de URLs; validación manual de aspecto en navegador tras el despliegue.
