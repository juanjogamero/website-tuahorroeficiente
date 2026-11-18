# ADR 10: Reconstrucción visual dirigida por una referencia exacta (Solvion)

**Decisión:** 2026-11-18. **Estado:** implementada en código y vista previa, no validada píxel a píxel, no desplegada.

## Identificación verificada

- La URL objetivo es https://layouts.divi-templatespro.com/divi-solar-energy-layouts-pack/.
- El diseño es el **Solvion Solar Energy Divi Layout Pack** de Divi Templates Pro, compatible con Divi 5, y la web original funciona sobre WordPress/Divi. Ver https://www.elegantthemes.com/marketplace/solvion-solar-energy-divi-layout-pack/.
- Se inspeccionó la página pública (secciones, jerarquía, enlaces, fotografías enlazadas y páginas interiores). El servicio de captura y comparación visual del sitio original no estaba disponible: no se ha comprobado la CSS exacta de sus módulos.

## Mapa de diseño

| Componente de la portada Solvion | Componente Astro independiente | Estado |
|---|---|---|
| Menú principal y botón Get Started | Header.astro (`sv-header`, dropdowns, CTA) | Hecho |
| Hero de gran formato + fotografía + CTA | `sv-hero` | Hecho, composición aproximada |
| Solar projects & success stories | `sv-feature-strip` con imágenes y dato 100% gratis | Hecho |
| Logos de clientes | `sv-partners` con principios de confianza, **sin marcas inventadas** | Hecho |
| We are Sustainability-Driven | `sv-about`, foto, ejemplo medible | Hecho |
| Contadores de impacto y hashtags | `sv-ticker`, resultados verificables | Hecho |
| Smart Solar Solutions: 4 servicios | `sv-services` con cuatro herramientas | Hecho |
| Why Choose Us, 4 ventajas | `sv-why` | Hecho |
| 3 proyectos con fotografía | `sv-projects`, 3 categorías | Hecho |
| Testimonios | `sv-proof`, **ejemplos matemáticos, no opiniones inventadas** | Hecho |
| Starter/Basic pricing | `sv-options`, 2 rutas gratuitas | Hecho |
| FAQ acordeón | `sv-faq` | Hecho |
| CTA de consulta comercial | `sv-big-cta` sin captación | Hecho |
| Blog de 3 tarjetas | `sv-blog` | Hecho |
| Newsletter de empresa | Se omite (sin backend, email ni consentimiento configurado) | No aplicable |
| Footer oscuro | Footer.astro | Hecho |
| About, Service, Project, Blog, Contact etc. | Páginas Astro SEO de Nosotros, categorías, herramientas, comparativas, blog, contacto | No equivalentes 1:1: priorizan Tu Ahorro Eficiente |

## Paleta propia elegida

- Azul noche `#142A34` y base `#101E27`.
- Turquesa marino `#0C8E94`.
- Menta acento `#6EE5CD` (sustituye el verde-lima).
- Blanco `#FFFFFF` y marfil `#F5F8F4`.
- Tipografía web `Manrope` y `DM Sans` con sistemas de reserva.

## Diferencia crítica con v2

La versión v2 se basaba en una interpretación generalista: composición de hero distinta, imágenes enmarcadas decorativas, franja superior adicional y otras decisiones que no reproducían fielmente Solvion. La v3 recupera hero con foto a sangre, menú de franja única, bloques y orden visual del sitio real, proyecto/servicio/FAQ/blog.

## Imágenes

Los nombres de foto del sitio original indican origen PxHere (por ejemplo números 1707544, 1707546, 1707504, 1707490, 632202). PxHere declara licencia CC0 para fotos verificadas en su catálogo, pero no se han verificado las licencias de cada imagen de forma individual. `src/data/categories.ts` contiene URLs remotas del propio demo que deben sustituirse por archivos descargados legalmente y optimizados antes de publicar. No se incluyen logos de clientes ni elementos gráficos comerciales.

## Control de aceptación pendiente

1. **Necesario para clonación literal:** obtener fuentes del pack Divi con licencia adquirida o capturas de todas las secciones desktop y móvil y su CSS computado.
2. Capturar screenshot de referencia de 1440x900 y 390x844 y compararlo pixel a pixel con `preview/` y build real.
3. Conseguir y alojar localmente las fotografías verificadas con licencia, con versiones AVIF/WebP y `srcset`.
4. Ejecutar `npm install && npm run build` con red; aplicar revisión de accesibilidad y Lighthouse sobre servidor real.
5. Auditar URLs de producción y GSC; no desplegar sobre URLs antiguas antes de la migración aprobada.

**Conclusión:** hay código real y probado, pero no certificar «exactamente igual» hasta que lo demuestre una comparación visual de referencia versus build.
