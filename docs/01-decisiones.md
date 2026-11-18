# Registro ADR · 18/11/2026

| ID | Estado | Decisión | Razón | Consecuencias |
|---|---|---|---|---|
| ADR-001 | Adoptada | Portal gratuito sin registro, calculadoras y blog editorial | Producto útil, SEO y GEO; no CRM/SaaS inicial | No backend ni datos de usuario |
| ADR-002 | Adoptada | Astro estático + TypeScript puro | HTML indexable, rendimiento, despliegue sin servidor | Requiere compilación en CI |
| ADR-003 | Adoptada | Hosting GitHub Pages con dominio propio | Restricción del propietario, coste simple | No SSR, redirecciones 301 de host limitadas |
| ADR-004 | Adoptada | CSS propio, Manrope, gradientes azul hielo/lima/violeta, tarjetas bento | Adaptación visual de la captura de referencia; sistema coherente en interiores | Fuentes externas deben revisarse en privacidad |
| ADR-005 | Adoptada | Sustituida en v4: fotografía original local optimizada | Fotografía real para portada y blog | Ver docs/05-imagenes-y-licencias.md; WebP local |
| ADR-006 | Adoptada | 7 calculadoras con metodología diferenciada | Evita placeholders y producto meramente informativo | Pruebas puras y UI reutilizada |
| ADR-007 | Adoptada | Blog inicial pequeño, profundo y conectado | Evita thin content masivo | 8 artículos y 4 hubs; ampliar con datos GSC |
| ADR-008 | Adoptada | Precios de ejemplo editables, jamás afirmaciones de ahorro garantizado | Exactitud y credibilidad | No precios en tiempo real |
| ADR-009 | Adoptada | Guardarraíl RELEASE_APPROVED=false | La web pública anterior tiene 23 rutas inventariadas y no hay datos GSC del dominio | Build permitido, sustitución no automática |
| ADR-010 | Pendiente | Conservación de URLs .html antiguas | GitHub Pages no ofrece reglas 301 arbitrarias | Decidir por valor SEO con GSC y hosting actual |
| ADR-011 | Pendiente | Titularidad y contacto legal | No inventar identidad ni email | Legal y producción bloqueados |
| ADR-012 | Pendiente | Fotografía y tipografía locales | Reducir terceros, privacidad y dependencia CDN | Documentado para completar |

## ADR-009 · Rediseño visual de referencia solar (18/11/2026)
Se sustituye la identidad bento previa por un sistema visual de doble cabecera, hero fotográfico, secciones numeradas y footer oscuro, inspirado en la composición de la demo Divi Solar Energy Layouts Pack. Se conserva Astro y la arquitectura estática, funciones y URLs. Paleta azul petróleo, verde azulado, coral y amarillo. La referencia comercial no se copia como código ni se reproducen sus testimonios, socios o precios. Detalle en `09-redisenio-divi-solar.md`.

| ADR-011 | Implementada, validación externa pendiente | Replicar geometría del screenshot de Solvion en Astro propio | Home fiel en composición, cabeceras interiores relacionadas, imágenes locales | Ver docs/11-diseno-fiel-v4.md |
