# ADR 32 — Preguntas frecuentes editoriales bajo las dos rutas de inicio

**Fecha:** 19/11/2026  
**Estado:** implementado. El workflow de GitHub debe confirmar el despliegue.

## Decisión
La plantilla de referencia muestra una sección limpia con etiqueta lima, titular y CTA negro a la izquierda, y un acordeón de preguntas a la derecha. No presenta fondos de tarjetas. Se traslada el FAQ ya existente al lugar correcto —después de "Calcula tu consumo / Compara alternativas" y antes de las áreas—, evitando tener dos secciones redundantes.

## Adaptación a Tu Ahorro Eficiente
Se conservan y precisan cuatro preguntas actuales y se amplían a seis sobre:
- datos para el cálculo de un aparato,
- diferencia entre gasto variable y factura,
- precio por kWh,
- cálculo del coste de una ducha,
- comparativas bajo condiciones equivalentes,
- acceso gratuito sin cuenta.

Respuestas fundamentadas en los modelos actualmente implementados en `src/data/tools.ts` y en la información de la web; no se utilizan valores de mercado no verificados, promesas de ahorro ni datos ficticios.

## Implementación
Acordeón nativo con `<details name="faq-portada">`, primer ítem abierto y `<summary>` accesible. Iconos +/− mediante CSS y ocultos al lector de pantalla. CSS aislado cargado después de los estilos existentes. Dos columnas en escritorio, una columna desde 1000 px y controles táctiles amplios en móvil. Sin JS, backend, datos personales ni nuevas dependencias.

## Pruebas y publicación
`tests/preguntas-frecuentes-portada.test.mjs` comprueba ubicación, unicidad, seis preguntas, apertura inicial, afirmaciones coherentes, CSS y responsive. CI/CD con compilación Astro y auditoría Pages. La comprobación manual de interacción real en Safari iOS/Android queda pendiente.
