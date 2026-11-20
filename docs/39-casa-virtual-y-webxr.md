# ADR 39 — Casa virtual interactiva y WebXR
Fecha: 20/11/2026 · Estado: implementado en rama; validación CI y visual pendientes.

## Decisión de producto
Tu Ahorro Eficiente pasa de un catálogo como portada principal a una **experiencia de decisiones de ahorro doméstico**: casa virtual por estancias, selección de aparatos, comparación de un escenario actual con uno alternativo, supuestos y enlaces a la metodología.

**Se conserva la identidad existente:** DM Sans, azul petróleo, lima, cápsula de navegación y bloques editoriales. Los catálogos /herramientas/, /comparativas/, /guias/, /categorias/ y sus slugs no se eliminan. No se modifica el dominio de producción.

## Implementación
- /casa-virtual/ contiene cuatro estancias: salón, cocina, baño y dormitorio.
- Seis escenarios editables: radiador, standby, frigorífico, horno vs freidora, ducha y aire acondicionado.
- Modelos matemáticos puros en src/lib/casa-virtual.ts, sin API ni datos personales.
- Vista 3D WebGL isométrica en Three.js, cargada de manera diferida al acercarse a la sección. La escena se dibuja mediante geometrías originales, no fotografías sintéticas ni réplicas de domicilios privados.
- Navegación arrastrando, girando y acercando; hotspots con botones accesibles y selector de estancias fuera de la escena.
- Modo WebXR immersive-vr **solo** en HTTPS y si navigator.xr.isSessionSupported('immersive-vr') confirma compatibilidad. Se pide permiso únicamente por interacción expresa; el usuario puede salir cuando quiera.
- Fallback semántico con cuatro tarjetas de estancias y enlaces incluso si WebGL o WebXR no se ejecutan.
- Panel de resultados con valores editables, costes anuales y diferencias que pueden ser negativas, errores de entrada y restauración de valores.
- Plan local opcional sin registro, que solo agrega los escenarios que selecciona expresamente el usuario. La suma NO es una factura, ni una predicción de ahorro garantizado.

## Fórmulas
1. Radiador y aire: kW eléctricos × horas × días × factor medio × €/kWh, con factor hipotético alternativo.
2. Standby: vatios × unidades ÷ 1000 × horas en espera × días × €/kWh.
3. Frigorífico: kWh/año × €/kWh; plazo simple de compra = inversión / diferencia anual solo si es positiva.
4. Cocina: kWh por cocción × tandas × veces/semana × 52 × €/kWh.
5. Ducha: litros × [(agua+saneamiento)/1000 + ΔT × 0,001163 kWh/L/°C × €/kWh / eficiencia].

Todos los datos iniciales son **ejemplos didácticos**. Los consumos reales dependen del aparato, las condiciones y los hábitos. Cambiar una consigna o factor puede afectar el confort; no se asegura equivalencia de servicio.

## Seguridad, rendimiento y accesibilidad
- Three.js es la única dependencia de ejecución nueva. No hay servicios externos para la escena 3D.
- Se retrasa la descarga de Three.js al entrar en la experiencia; el resto de páginas no importa el motor.
- HTML prerenderizado para SEO y fallback. Sin cookies de seguimiento, cuenta, geolocalización, cámaras ni micrófono.
- Botones y campos HTML disponibles al margen de la representación 3D, en móvil y escritorio.
- Por verificar: rendimiento WebGL en dispositivos físicos, navegadores Safari/Firefox/Chrome, contraste y lector de pantalla, interacciones en visores WebXR compatibles y Core Web Vitals.
- WebXR es de disponibilidad limitada y depende de HTTPS, navegador y hardware (referencia: https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
- Mantener la demo GitHub Pages noindex. No publicar producción sin la auditoría de migración de URLs, GSC, titularidad y documentación legal.

## Estado de validación
No afirmar prueba física de RV ni disponibilidad universal. La compilación, pruebas de fórmulas y auditoría de enlaces deben pasar en GitHub Actions. El despliegue demo es distinto de producción.
