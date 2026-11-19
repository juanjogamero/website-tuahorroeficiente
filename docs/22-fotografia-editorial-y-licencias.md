# Decisión editorial 22 — Fotografías específicas para cada temática

Fecha: 18 de noviembre de 2026. Estado: **implementación en revisión (la publicación depende del build de GitHub Pages)**.

## Motivación

La web reutilizaba una misma fotografía de aerogenerador o instalaciones solares en un contenido que hablaba de una ducha, una cocina o un aparato de climatización. Esto no ayuda a comprender el servicio y debilita la correspondencia entre imagen, titular y texto alternativo.

## Decisión

- Mantener la fotografía original propia del **hero de portada** (es un recurso de identidad de marca).
- Sustituir las fotografías de bloques de contenido, guías y comparativas por otras pertinentes: ducha para agua, radiador para calefacción, unidad AC para aire acondicionado, horno/freidora para cocina, contador/medidor para electricidad, etc.
- En la compilación se descargan a `public/images/` mediante `scripts/descargar-fotografias.mjs`. El navegador **no conecta con bancos de imágenes**: se sirven desde GitHub Pages como archivos estáticos.
- La descarga se realiza en GitHub Actions o con `npm run fotos:sync`. Se comprueba el formato y la longitud antes de guardarlas, y una descarga fallida no se publica como foto vacía.
- Los pies numéricos representan ejemplos didácticos; ninguna fotografía representa un cliente, colaborador o resultado real.
- No comprar fotografías, no utilizar material premium de bancos ni reutilizar recursos comerciales de Divi.

## Licencias

**Unsplash:** https://unsplash.com/license — permite reproducción y modificación gratuita, también comercial, sin atribución obligatoria. La atribución sigue siendo recomendable. Las imágenes con marcas o personas no deben usarse para implicar aval o colaboración.

**Pexels:** https://www.pexels.com/license/ — permite utilización gratuita comercial y no comercial; no exige crédito. Se mantiene esta relación por trazabilidad y reconocimiento.

## Catálogo y procedencia

| Archivo generado | Asunto editorial | Autor / plataforma | Ficha original |
| --- | --- | --- | --- |
| `medidor-consumo.webp` | Monitor de consumo doméstico | Siân Wynn-Jones · Unsplash | https://unsplash.com/photos/graphical-user-interface-website-YTG6kkQweck |
| `ducha-bano.webp` | Cabina de ducha | Mayur Roxan · Unsplash | https://unsplash.com/photos/a-bathroom-with-tiled-walls-and-a-shower-su0bkpknYpU |
| `grifo-agua.webp` | Grifo con caudal | Aditya Sethia · Unsplash | https://unsplash.com/photos/a-close-up-of-a-faucet-with-water-coming-out-of-it-Ys3o5dAiUA0 |
| `radiador-hogar.webp` | Radiador doméstico | e24 · Unsplash | https://unsplash.com/photos/a-white-radiator-in-a-room-N6KVqGA44ZI |
| `aire-acondicionado.webp` | Unidad de aire acondicionado | Zulfugar Karimov · Unsplash | https://unsplash.com/photos/white-air-conditioner-unit-displaying-22-degrees-mM0vW68NY0g |
| `climatizacion-exterior.webp` | Unidad exterior de climatización | Vlad Zaytsev · Unsplash | https://unsplash.com/photos/a-wall-mounted-air-conditioner-next-to-a-door-mp9TweXYUMQ |
| `horno-cocina.webp` | Horno empotrado en vivienda | Franco Debartolo · Unsplash | https://unsplash.com/photos/modern-kitchen-with-built-in-oven-and-microwave-DzTnCH27iAA |
| `freidora-aire.jpg` | Freidora de aire y tostadora | Lisa from Pexels · Pexels | https://www.pexels.com/photo/modern-kitchen-with-air-fryer-and-toaster-29461935/ |
| `lavanderia.webp` | Lavadora y cesta de ropa | Annie Spratt · Unsplash | https://unsplash.com/photos/white-washing-machine-with-laundry-basket-and-sock-Bpz3PG_v9ks |
| `vida-hogar.webp` | Actividad familiar en la cocina | F aint · Unsplash | https://unsplash.com/photos/two-people-in-a-modern-kitchen-setting-Gb-0qjnOSAM |
| `placas-tejado.webp` | Placas solares sobre tejado | Rafael Moreno · Unsplash | https://unsplash.com/photos/solar-panels-are-installed-on-a-rooftop-73JOOymZQTQ |
| `agua-hogar.webp` | Uso cotidiano de agua | Centre for Ageing Better · Unsplash (también dominio público según ficha) | https://unsplash.com/photos/woman-filling-a-glass-with-water-from-a-kitchen-faucet-EFr2VO8st2U |
| `nosotros-parque-eolico.jpg` | Aerogeneradores en un paisaje abierto y cielo azul (hero «Nosotros», resolución de descarga 2400 px) | Satvinder Ghotra · Pexels | https://www.pexels.com/photo/wind-turbines-against-blue-sky-in-open-landscape-28652561/ |

## Validación de publicación

- [x] Procedencia y licencias revisadas en fichas del banco.
- [x] Fotografías asignadas según intención de página.
- [x] Textos alternativos de las nueve guías revisados.
- [x] Estrategia 100 % estática sin hotlinking durante la visita.
- [ ] Confirmar descarga de 12 imágenes en GitHub Actions.
- [ ] Confirmar compilación Astro y auditoría de imágenes enlazadas.
- [ ] Inspección visual final con fotos cargadas en la web publicada.

### Actualización 35 — imagen del hero «Nosotros»

Se sustituye `aerogenerador.webp` como imagen de esta página, porque su resolución aparente resulta insuficiente para un banner panorámico a pantalla ancha. La nueva fotografía del banco Pexels (original 3520 × 1980 px) se descarga a 2400 px de ancho durante el build y se entrega localmente desde GitHub Pages. Se conserva la fotografía antigua en el repositorio por si la necesita otro bloque; no se declara como fotografía propia ni se atribuyen proyectos al portal.
