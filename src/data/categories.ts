export const categories=[
 {slug:'electricidad',name:'Electricidad',subtitle:'Comprende cada kWh que utilizas.',description:'Herramientas de gasto eléctrico, consumo en espera y guías para interpretar tu factura sin confundir potencia con energía.',icon:'zap',gradient:'lavender',photo:'energy'},
 {slug:'climatizacion',name:'Climatización',subtitle:'Confort sin cálculos a ciegas.',description:'Radiadores, aire acondicionado y escenarios estacionales con factores de uso editables.',icon:'thermometer',gradient:'ice',photo:'heating'},
 {slug:'agua',name:'Agua y ACS',subtitle:'Cada litro tiene dos costes.',description:'Calculadoras de agua corriente y caliente con precios locales y explicación de energía térmica.',icon:'droplets',gradient:'mint',photo:'water'},
 {slug:'electrodomesticos',name:'Electrodomésticos',subtitle:'Compara lo que cuesta utilizarlos.',description:'Decisiones de cocina, etiquetas energéticas y consumo por ciclo, no promesas de ahorro universales.',icon:'chef',gradient:'lime',photo:'kitchen'}
];
// Fotografía original realizada para este proyecto. Todos los archivos son locales para GitHub Pages.
export const photoUrls={
 hero:'/images/hero-renovables.webp',
 home:'/images/aerogenerador.webp',
 kitchen:'/images/paneles-solares.webp',
 solar:'/images/hero-renovables.webp',
 energy:'/images/paneles-solares.webp',
 heating:'/images/equipo-renovables.webp',
 cooling:'/images/equipo-renovables.webp',
 water:'/images/aerogenerador.webp'
} as const;
