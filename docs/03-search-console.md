# Search Console · Procedimiento real para tuahorroeficiente.es

**Estado comprobado (18/11/2026):** las cuentas Google visibles a través del conector SEO no ofrecían la propiedad `tuahorroeficiente.es`. La nueva propiedad está por crear/verificar. No se ha creado ni verificado una propiedad en Google.

1. Inicia sesión en [Google Search Console](https://search.google.com/search-console/).
2. Elige «Añadir propiedad» → tipo **Dominio** → `tuahorroeficiente.es`.
3. Google entregará un TXT DNS de verificación único (`google-site-verification=...`). No uses un token inventado ni reutilices el de otra web.
4. Accede a la administración DNS del dominio e incorpora el TXT indicado. No borres entradas MX, A, AAAA, CNAME o TXT existentes. Comprueba propagación y pulsa «Verificar».
5. Alternativa: propiedad prefijo de URL `https://tuahorroeficiente.es/`, que permite métodos de archivo HTML/etiqueta, pero no sustituye una propiedad de dominio para ver todas las variantes.
6. **Antes de cambiar la web**: exporta Rendimiento por página y consulta, idealmente últimos 16 meses disponibles; páginas indexadas, inspección de URLs importantes y enlaces externos. Registra fecha/filtros/dispositivo.
7. Una vez desplegada una migración aprobada, envía `https://tuahorroeficiente.es/sitemap-index.xml` en Sitemaps. Comprueba que robots declara la misma URL; verifica páginas canónicas e indexación individual.
8. Inspecciona la portada, calculadoras y las URLs heredadas protegidas. Una solicitud de indexación no garantiza aparición en Google.
9. Revisa CTR, impresiones, consultas y errores técnicos a 28 y 90 días. No informes de tráfico sin datos reales.

## ¿Por qué no se configura desde el ZIP?

La verificación demuestra control real del DNS o del sitio y no puede generarse desde código de terceros sin acceso autorizado. El ZIP prepara metadatos y sitemap, no la titularidad de Google. Para este proyecto es imprescindible identificar y autorizar esa propiedad antes de la migración.

Fuentes: [Ayuda oficial de verificación de Search Console](https://support.google.com/webmasters/answer/9008080?hl=es) y [guía de Google sobre propiedades](https://support.google.com/webmasters/answer/34592?hl=es).
