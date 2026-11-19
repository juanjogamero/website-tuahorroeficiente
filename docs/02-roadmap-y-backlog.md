# Roadmap vivo · Tu Ahorro Eficiente

Fecha: 18/11/2026. Los estados son: INVESTIGADO, ESPECIFICADO, IMPLEMENTADO, PROBADO, DESPLEGADO, MEDIDO. No confundirlos.

| Prioridad | Tarea | Estado | Evidencia / bloqueo |
|---|---|---|---|
| P0 | Revisión del Plan Maestro, alcance y fuentes | INVESTIGADO | Archivo maestro incorporado |
| P0 | Auditoría pública del dominio | INVESTIGADO PARCIAL | Sitemap 20 rutas, 3 legales y páginas principales; sin GSC/backlinks |
| P0 | Elegir arquitectura y diseño | IMPLEMENTADO | Astro estático, TypeScript, CSS responsive propio |
| P0 | Portada completa y navegación | IMPLEMENTADO | `src/pages/index.astro` y componentes |
| P0 | Calculadora eléctrica | PROBADO (lógica) | 10 tests matemáticos globales; UI no validada con navegador |
| P0 | Radiador eléctrico | PROBADO (lógica) | Caso 90 kWh / 18 € test |
| P0 | Aire acondicionado | PROBADO (lógica) | Escenarios min/max; no medidas externas |
| P0 | Ducha fría/caliente | PROBADO (lógica) | Balance energético y agua; sin tarifa local por defecto |
| P0 | Termo | PROBADO (lógica) | kWh/día y diferencia |
| P0 | Standby | PROBADO (lógica) | Potencia en espera y uso anual |
| P0 | Comparación horno vs airfryer | PROBADO (lógica) | 20,80 €/año de ejemplo |
| P0 | Blog inicial (9 guías, index y categorías) | IMPLEMENTADO | Markdown + Content Collections |
| P0 | Sitemap, canonical y JSON-LD | IMPLEMENTADO | `@astrojs/sitemap`, BaseLayout, breadcrumbs |
| P0 | Tests automáticos y despliegue Github Pages | IMPLEMENTADO | Workflows y gate de RELEASE_APPROVED |
| P0 | Generar package-lock y compilar Astro | PENDIENTE | Sin npm registry en entorno actual |
| P0 | QA responsive, accesibilidad, enlaces y Lighthouse | PENDIENTE | Requiere build y navegador conectado |
| P0 | Search Console propiedad de dominio | PENDIENTE | Falta token DNS o propiedad compartida |
| P0 | GSC 16 meses por URL/consulta, backlinks y migración | PENDIENTE | Acceso GSC y fuentes antiguas |
| P0 | Identidad del titular, contacto y avisos legales | PENDIENTE | Información empresarial verificable |
| P0 | Fotografías locales/licencia y Google Fonts local | PENDIENTE | Descargar/optimizar; temporalmente CDN externo |
| P0 | Backup y despliegue controlado | NO INICIADO | Bloqueado para no destruir señales |
| P1 | Keyword research cuantitativo España / es / móvil | PENDIENTE | GSC y herramienta con volúmenes/KD; no se inventan |
| P1 | Revisión SERP específica de 20–30 queries | INVESTIGADO PARCIAL | Competidores cualitativos, sin ranking medido |
| P1 | Añadir comparativas bomba de calor vs radiador | ESPECIFICADO | Validar equivalencia térmica antes de publicar |
| P1 | Modelar varias franjas horarias de kWh | ESPECIFICADO | Requiere tarifa y tratamiento del periodo de uso |
| P1 | Medición privacidad-respetuosa | ESPECIFICADO | Sin analytics ni tracking instalado |
| P2 | Contenido ampliado sobre frigorífico, lavadora, secadora | ESPECIFICADO | Priorizar según primeras impresiones GSC |

## Definición de terminado

Página funcional, render HTML completo, foco de intención, ejemplos auditables, disclaimers, pruebas, fuentes, revisión, title/meta/canonical, accesibilidad básica, enlaces internos, sin placeholders y sin promesas de ahorro. Despliegue además exige migración/legales/QA.

## Avance 18/11/2026 · Rediseño de referencia Divi solar
- **IMPLEMENTADO EN CÓDIGO:** nueva portada, cabecera, pie, tokens y estilos interiores, CSS responsive y 32 páginas de preview.
- **PROBADO:** 10/10 pruebas del motor, tsc selectivo, referencias internas 0 rotas, revisión visual en memoria en 5 URLs a dos tamaños sin overflow.
- **PENDIENTE:** build Astro con npm, QA con fotos reales, auditoría contraste WCAG, Search Console, revisión legal y validación de migración GitHub Pages.
- **NO DESPLEGADO:** ningún commit o cambio en producción.

## Actualización 19/11/2026 · Plataforma de calculadoras

- **IMPLEMENTADO Y DESPLEGADO EN STAGING:** índice /herramientas/ rediseñado, buscador progresivo, filtros de seis grupos, 15 herramientas enlazadas, tres destacadas y sección editorial de método.
- **IMPLEMENTADO Y PROBADO EN CI:** ocho modelos nuevos con ejemplos y unidades correctas, añadidos a las siete herramientas existentes. Novedades: frigorífico, lavadora, lavavajillas, secadora, LED, bomba de calor frente a radiador, fuga de grifo y ventilador. Las dos nuevas comparativas también aparecen en su índice.
- **VERIFICADO DOCUMENTALMENTE:** etiquetas de electrodomésticos (Comisión Europea y EPREL), suministro y saneamiento (INE). Los datos iniciales son ejemplos editables, no resultados medidos en equipos reales.
- **IMPLEMENTADO:** metadatos para nuevas páginas y CollectionPage+ItemList del catálogo, cálculos locales en navegador, mejor legibilidad del simulador en móvil y enlaces de portada actualizados al total dinámico.
- **PENDIENTE:** QA visual funcional en navegadores móviles reales, accesibilidad WCAG con tecnologías asistivas, validación cuantitativa SEO/GSC, rendimiento Core Web Vitals p75 y cumplimiento de requisitos legales para mover producción.
- **PRODUCCIÓN:** el dominio tuahorroeficiente.es no ha cambiado. No confundir el despliegue de prueba en GitHub Pages con un lanzamiento público indexable.

Detalles técnicos y fuentes en docs/37-calculadoras-ampliacion.md y docs/38-hub-calculadoras.md. La primera versión de las funciones puras está probada; no implica que el resultado real de un electrodoméstico pueda estimarse sin conocer los datos de su modelo.
