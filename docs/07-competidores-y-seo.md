# Investigación cualitativa SEO/GEO · 18/11/2026

**Mercado: España / español.** No se ha utilizado ninguna herramienta de volumen de búsqueda/KD/CPC en esta iteración. Todos los términos son hipótesis de demanda hasta consultar métricas verificables. No atribuir posicionamientos, tráfico ni autoridad medida.

## Competidores observados directamente

| Sitio | Evidencia pública revisada | Decisión de producto |
|---|---|---|
| https://www.costeenergia.es/calculadora-consumo | Herramienta completa con viviendas, aparatos, catálogo de modelos, tramos y comparador de tarifas | No competir con una tabla genérica; hacer herramientas especializadas con interpretación y metodología |
| https://pvpc.es/calculadora | Cálculo por electrodoméstico y hora usando el PVPC del día consultado | En MVP no duplicar integración horaria ni depender de precios en vivo |
| https://quegasto.es/agua/ducha/ | Respuesta explícita sobre agua y calentamiento, con caudales y ejemplo por ducha | Mejorar personalización de precio local, saneamiento, eficiencia y duración alternativa |
| https://www.cuentasdecasa.com/herramientas/consumo-electrodomesticos/ | Datos y explicaciones sobre consumo, etiquetas y gastos de aparatos | Diferenciación por verificación de unidades, no por cifras de ahorro genéricas |

Fuentes de referencia utilizadas: IDAE, CNMC y Comisión Europea EPREL. Se ha consultado la documentación de Astro para GitHub Pages y la licencia Unsplash.

## Intenciones priorizadas, sin volúmenes

1. **Cálculo personalizado:** calcular consumo eléctrico, pasar W a € por hora, conocer coste de un radiador.
2. **Consulta por contexto:** cuánto consume aire acondicionado de entrada real, cómo medir un termo.
3. **Comparar una decisión:** airfryer vs horno con mismo número de raciones.
4. **Agua doméstica:** cuánto cuesta una ducha separando agua y calentamiento.
5. **Soporte informativo:** diferencia kW/kWh, lectura de factura, medidas reales y etiquetas.

## Hipótesis de arquitectura

- Home `/` como acceso a categorías y herramientas.
- Hub `/herramientas/` para intención transaccional de cálculo, sin venta.
- Hubs `/categorias/{tema}/` para conectar herramientas y guías por necesidad.
- Hub `/comparativas/` con comparadores reales, no fichas pendientes.
- Blog `/guias/` con artículos únicos que resuelven preguntas y enlazan a herramientas cuando el siguiente paso es calcular.
- Landing individual por cada herramienta con HTML legible, formularios, explicación, fórmula, ejemplos, FAQ y fuentes.

## Qué se medirá al tener acceso

- Volumen medio mensual, dificultad, CPC y tendencia 12 meses para España / español / móvil, fuente y fecha.
- SERP orgánica top 10 por cada consulta prioritaria y aparición de AI Overviews sin inventar rankings.
- Search Console: impresiones, clics, CTR, posición, consultas por URL y coverage.
- Backlinks por URL actual antes de decidir una migración.
- Canibalización entre guías y herramientas: intención, consultas compartidas y enlaces.

No atribuir causalidad a un cambio SEO si no hay mediciones comparables antes y después.
