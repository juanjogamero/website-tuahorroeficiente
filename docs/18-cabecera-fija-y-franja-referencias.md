# Decisión 18 — Header al hacer scroll y franja editorial de referencias

**Fecha:** 18 de noviembre de 2026  
**Ámbito:** Header compartido, hero de portada en escritorio y sección inmediatamente posterior.  
**Estado:** Código implementado; publicación sujeta a CI de GitHub Pages.

## Referencia proporcionada

Captura de 2047 × 302 px: cápsula negra centrada (aprox. 1080 px de ancho, 60 px dealto) junto al borde superior sobre una página blanca; título pequeño centrado y siete logotipos gris claro en una sola fila bajo el título. La imagen muestra el estado de la cabecera tras desplazarse; no acredita que las marcas originales sean colaboradores de nuestro proyecto.

## Decisiones

1. La cabecera pasa a `position: fixed` y cambia a fondo negro tras 48 px de desplazamiento; al regresar arriba recobra la transparencia. Se mantiene en toda la web, incluyendo interiores.
2. La cápsula de escritorio se limita a 1080 px y 62 px de alto. En móvil el menú táctil sigue siendo funcional.
3. El hero permanece a altura visible (`100svh`) con un máximo más contenido para el H1 (72 px) y tarjetas. Se adapta a pantallas de escritorio de baja altura sin solapar el rótulo decorativo.
4. La primera sección se compone de una cabecera editorial centrada y **siete marcas tipográficas grises**. Cuatro son fuentes públicas consultadas (IDAE, CNMC, EPREL, BOE), tres describenfuncionalidades de la web. No se fingen acuerdos, clientes o avales. Cada marca enlaza a la página real correspondiente.
5. En tablet y móvil la fila se convierte en cuadrícula de 4 y 2 columnas para evitar desplazamiento horizontal.
6. La hoja `cabecera-referencias.css` se importa en último lugar, sin cambiar los módulos de cálculo ni las URLs.

## Pruebas

- Pruebas unitarias de estructura y componentes en `tests/cabecera-referencias.test.mjs`.
- Comprobación de JS de scroll, menú móvil, ausencia de desbordamientos e interacción de enlaces mediante Chromium local.
- GitHub Actions valida compilación Astro, 33 páginas, `noindex` y rutas locales antes de publicar.

## Notas

Se conservará el esquema de commits `tipo(ámbito): descripción` en español. El entorno de pruebas permanece en github.io y no modifica `tuahorroeficiente.es`.
