# ADR 37 — Nuevas calculadoras: prioridad a consumos medibles

**Fecha:** 19 de noviembre de 2026. **Estado:** implementado en código; las verificaciones y el despliegue se registrarán al cerrar CI.

## Objetivo
Ampliar el catálogo de 7 a 15 herramientas sin backend, precios dinámicos ni cuentas. Cada herramienta tiene entradas editables, ejemplos declarados como tales, una fórmula comprobable, límites, preguntas frecuentes y fuentes donde se verifica el formato del dato. El término €/kWh nunca es «precio actual» por defecto.

## Nuevas URLs
- /herramientas/cuanto-gasta-frigorifico/ — kWh/año de etiqueta.
- /herramientas/calculadora-consumo-lavadora/ — kWh/100 ciclos, L/ciclo, tarifas de agua y luz.
- /herramientas/calculadora-consumo-lavavajillas/ — mismas unidades, programa eco.
- /herramientas/cuanto-gasta-secadora/ — kWh/100 ciclos, comparación A/B.
- /comparativas/calculadora-ahorro-bombillas-led/ — vatios, horas, unidades, inversión incremental y retorno simple condicionado.
- /comparativas/bomba-calor-vs-radiador-electrico/ — misma demanda térmica y SCOP configurable.
- /herramientas/calculadora-fuga-agua-grifo/ — medición en mL/min, L y m³.
- /herramientas/cuanto-gasta-ventilador/ — kWh de temporada, sin equiparar confort de ventilador y aire acondicionado.

## Fuentes consultadas 19/11/2026
Comisión Europea: [frigoríficos](https://energy-efficient-products.ec.europa.eu/product-list/fridges-and-freezers_en), [lavadoras](https://energy-efficient-products.ec.europa.eu/product-list/washing-machines_en), [lavavajillas](https://energy-efficient-products.ec.europa.eu/product-list/dishwashers_en), [secadoras](https://energy-efficient-products.ec.europa.eu/product-list/tumble-dryers_en). El nuevo etiquetado de secadoras desde julio de 2025 utiliza kWh por 100 ciclos; evitar mezclar etiquetas antiguas. [IDAE, ahorrar energía](https://www.idae.es/ahorra-energia) aporta contexto general, no valores de aparatos concretos.

## Modelo matemático y cautelas
- Frigorífico: €/año = kWh/año etiqueta × unidades × precio.
- Lavadora/lavavajillas: €/ciclo = (kWh/100 ciclos ÷ 100) × precio kWh + (L/ciclo ÷ 1000) × (agua+saneamiento por m³).
- Secadora: €/año por opción = (kWh/100 ciclos ÷ 100) × ciclos/semana × 52 × precio.
- LED: kWh/año = W × unidades × h/día × días/1000; amortización = inversión/diferencia positiva (sin garantía de lúmenes equivalentes).
- Bomba: kWh electricidad = kWh térmicos útiles/SCOP; radiador = demanda útil/rendimiento.
- Fuga: litros = mL/min / 1000 × 60 × horas/día × días.
- Ventilador: kWh = W/1000 × horas × días × unidades.
- No se calculan automáticamente cuotas fijas ni impuestos; los precios de suministro pueden incluir bloques y variación temporal. No se guardan los datos del usuario.

## Calidad
Funciones puras añadidas en `src/lib/calculators.ts`, herramientas en `src/data/extra-tools.ts`, tests y metadatos con fuentes. El hub/rediseño del catálogo es un commit independiente. Pendiente QA funcional real en móvil/teclado y métricas de Search Console.
