export const categories=[
 {slug:'electricidad',name:'Electricidad',subtitle:'Comprende cada kWh que utilizas.',description:'Herramientas de gasto eléctrico, consumo en espera y guías para interpretar tu factura sin confundir potencia con energía.',icon:'zap',gradient:'lavender',photo:'energy'},
 {slug:'climatizacion',name:'Climatización',subtitle:'Confort sin cálculos a ciegas.',description:'Radiadores, aire acondicionado y escenarios estacionales con factores de uso editables.',icon:'thermometer',gradient:'ice',photo:'heating'},
 {slug:'agua',name:'Agua y ACS',subtitle:'Cada litro tiene dos costes.',description:'Calculadoras de agua corriente y caliente con precios locales y explicación de energía térmica.',icon:'droplets',gradient:'mint',photo:'water'},
 {slug:'electrodomesticos',name:'Electrodomésticos',subtitle:'Compara lo que cuesta utilizarlos.',description:'Decisiones de cocina, etiquetas energéticas y consumo por ciclo, no promesas de ahorro universales.',icon:'chef',gradient:'lime',photo:'kitchen'}
];
// Catálogo editorial: fotografías gratuitas de Unsplash y Pexels,
// optimizadas en la compilación y servidas localmente desde GitHub Pages.
// Autores, URL original y licencias: docs/22-fotografia-editorial-y-licencias.md
export const photoUrls={
 hero:'/images/hero-renovables.webp',
 home:'/images/vida-hogar.webp',
 kitchen:'/images/horno-cocina.webp',
 solar:'/images/placas-tejado.webp',
 energy:'/images/medidor-consumo.webp',
 heating:'/images/radiador-hogar.webp',
 cooling:'/images/aire-acondicionado.webp',
 water:'/images/ducha-bano.webp',
 shower:'/images/ducha-bano.webp',
 tap:'/images/grifo-agua.webp',
 radiator:'/images/radiador-hogar.webp',
 outsideCooling:'/images/climatizacion-exterior.webp',
 oven:'/images/horno-cocina.webp',
 fryer:'/images/freidora-aire.jpg',
 washing:'/images/lavanderia.webp',
 solarRoof:'/images/placas-tejado.webp',
 meter:'/images/medidor-consumo.webp',
 waterHome:'/images/agua-hogar.webp',
 homeLiving:'/images/vida-hogar.webp'
} as const;
