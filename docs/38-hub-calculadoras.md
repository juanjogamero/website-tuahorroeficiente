# ADR 38 — Nuevo hub de calculadoras

**Fecha:** 19/11/2026. **Estado:** implementado; validar build y publicación.

Se sustituye el listado genérico de calculadoras por un catálogo visual dentro de la identidad Tu Ahorro Eficiente: hero azul profundo con fotografía local, titulares blancos y lima, tres cálculos de inicio, buscador con normalización de acentos, seis filtros por área, quince tarjetas enlazadas y una explicación del proceso en tres pasos.

**Usabilidad:** los 15 enlaces aparecen en el HTML aunque no cargue JavaScript. Filtrado local, botones aria-pressed, buscador accesible, contador de resultados con aria-live, estado vacío y opción de limpiar. Móvil: tarjetas individuales en columna, filtros horizontales desplazables y botones táctiles. El formulario de cada herramienta también aumenta sus etiquetas a 13/14px y sus entradas a 17px y altura mínima de 53px.

**SEO y privacidad:** contenido indexable prerenderizado, título y descripción propios, CollectionPage+ItemList sin reseñas ni afirmaciones de resultados comerciales. Sin backend, analítica de entradas, precios de mercado inventados ni dependencias nuevas.

**Pendiente:** comprobar en GitHub Actions los 15 modelos y sus pruebas; QA visual real en móviles y escritorio y resultados Search Console aún no disponibles. Producción intacta.
