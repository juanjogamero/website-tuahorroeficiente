import type { Tool, Field } from './tools';

type F = [key:string, label:string, unit:string, example:string, help:string];
type Extra = Omit<Tool,'fields'|'group'> & {fields:F[];group:'herramientas'|'comparativas'};
const field=([key,label,unit,value,help]:F):Field=>({key,label,unit,value,help});
const define=(value:Extra):Tool=>({...value,fields:value.fields.map(field)});

/**
 * Herramientas ampliadas — ejemplos de uso ficticios y editables.
 * Cada una calcula con los números del usuario y remite a metodología y fuente.
 * Ningún valor por defecto representa el consumo de un modelo concreto.
 */
export const extraTools:Tool[]=[
 define({
 id:'frigorifico',slug:'cuanto-gasta-frigorifico',group:'herramientas',category:'Electrodomésticos',categorySlug:'electrodomesticos',tag:'Etiqueta energética',
 title:'¿Cuánto consume un frigorífico al mes y al año?',
 short:'Pasa los kWh/año de la etiqueta europea a euros sin confundir potencia y consumo.',
 description:'Calculadora del coste anual y mensual de un frigorífico usando kWh/año de la etiqueta energética, número de equipos y precio editable del kWh.',
 intro:'La etiqueta energética de un frigorífico expresa un consumo anual de referencia en kWh. Introduce la cifra de tu equipo o una medición anualizada para estimar el coste variable de electricidad.',
 image:'kitchen',icon:'snowflake',reading:'3 min',
 fields:[
  ['energyYear','Consumo anual de etiqueta','kWh/año','180','Ejemplo didáctico. Sustituye por los kWh/año reales de tu etiqueta o medidor.'],
  ['units','Frigoríficos equivalentes','unidades','1','Número de equipos con ese mismo consumo anual.'],
  ['years','Periodo de comparación','años','5','Para simular varios años con uso y tarifa constantes.'],
  ['price','Precio de energía','€/kWh','0,20','Ejemplo editable; usa la parte de energía de tu tarifa.']
 ],
 formula:'kWh del periodo = kWh/año de etiqueta × número de frigoríficos × años. Coste anual = kWh/año × unidades × €/kWh.',
 model:'Se usa el consumo anual declarado en condiciones de prueba de la etiqueta o el medido por el usuario. No se calcula a partir de la potencia máxima del compresor.',
 limits:['Las condiciones de laboratorio de la etiqueta no predicen exactamente el consumo en tu cocina.','Temperatura ambiente, apertura de puertas, carga y mantenimiento pueden alterar el consumo.','Solo incluye el coste variable de energía, no cuotas fijas ni compra.'],
 example:'Ejemplo editable: 180 kWh/año, un frigorífico y 0,20 €/kWh ⇒ 36 € al año y 3 € al mes de media.',
 questions:[{q:'¿Dónde encuentro los kWh/año?',a:'En la etiqueta energética europea o en la ficha del modelo; EPREL ayuda a consultar fichas cuando estén disponibles.'},{q:'¿Por qué no usamos los vatios?',a:'Un compresor arranca y se detiene. La potencia nominal no equivale a un consumo continuo de 24 horas.'},{q:'¿Es lo mismo el coste mensual y el de cada mes?',a:'No. Mostramos una media anual entre doce, no un consumo exacto del mes concreto.'}],
 related:['electricidad','standby','lavadora'],src:['eprel','fridgeEU','cnmc'],
 keyTakeaways:['Introduce kWh/año de tu modelo.','No multipliques la potencia máxima por 24 horas.','La tarifa y las condiciones reales influyen en los euros.']
 }),
 define({
 id:'lavadora',slug:'calculadora-consumo-lavadora',group:'herramientas',category:'Electrodomésticos',categorySlug:'electrodomesticos',tag:'Agua y energía',
 title:'Calculadora del gasto de la lavadora por lavado',
 short:'Combina kWh/100 ciclos, litros por ciclo, agua, saneamiento y electricidad.',
 description:'Calcula el coste variable de usar la lavadora por ciclo y al año a partir de la etiqueta energética europea y los precios de tu hogar.',
 intro:'La etiqueta de la lavadora indica kWh por 100 ciclos del programa eco 40-60 y litros por ciclo. Con esos datos y tu frecuencia de lavado puedes calcular costes de electricidad, agua y saneamiento por separado.',
 image:'washing',icon:'droplets',reading:'4 min',
 fields:[
  ['energy100','Consumo de la etiqueta','kWh/100 ciclos','50','Ejemplo editable para eco 40-60; introduce el dato de tu modelo.'],
  ['litresCycle','Agua por lavado','L/ciclo','45','Dato de etiqueta para el mismo programa.'],
  ['cyclesWeek','Lavados por semana','ciclos/semana','4','Media de semanas de uso.'],
  ['price','Precio de electricidad','€/kWh','0,20','Tarifa de ejemplo, no precio en tiempo real.'],
  ['water','Precio variable del agua','€/m³','1,50','Ejemplo; depende de tu municipio, bloques y contrato.'],
  ['sewer','Precio variable de saneamiento','€/m³','0,70','Ejemplo editable; introduce tu tasa de saneamiento.']
 ],
 formula:'kWh/ciclo = kWh/100 ciclos ÷ 100. Agua m³/ciclo = litros/ciclo ÷ 1000. Coste/ciclo = kWh/ciclo × €/kWh + m³/ciclo × (agua + saneamiento).',
 model:'El cálculo emplea las magnitudes de etiqueta del programa eco 40-60; no asume que todos los programas, cargas o temperaturas consuman lo mismo.',
 limits:['No incluye detergente, suavizante, mantenimiento ni cuotas fijas de suministro.','El programa real y la carga pueden dar resultados distintos de la etiqueta.','La factura de agua puede tener tramos, mínimos e impuestos no modelados.'],
 example:'Ejemplo: 50 kWh/100 ciclos, 45 L/ciclo y precios 0,20 €/kWh, 1,50 €/m³ y 0,70 €/m³ ⇒ 0,199 € por lavado (sin detergente).',
 questions:[{q:'¿Por qué dividimos los kWh de la etiqueta entre 100?',a:'Porque la etiqueta europea indica energía ponderada de 100 ciclos del programa eco 40-60.'},{q:'¿Incluye el detergente?',a:'No. Solo los consumos variables de energía y agua/saneamiento.'},{q:'¿Se puede comparar un programa rápido?',a:'Solo si conoces su kWh/ciclo y litros/ciclo: los valores de etiqueta eco no representan automáticamente el programa rápido.'}],
 related:['lavavajillas','secadora','ducha'],src:['washingEU','eprel','cnmc'],
 keyTakeaways:['Lee kWh por 100 ciclos y litros por ciclo.','Suma agua y saneamiento por separado.','Usa el mismo programa para comparar con otro equipo.']
 }),
 define({
 id:'lavavajillas',slug:'calculadora-consumo-lavavajillas',group:'herramientas',category:'Electrodomésticos',categorySlug:'electrodomesticos',tag:'Ciclo de lavado',
 title:'¿Cuánto cuesta usar el lavavajillas por ciclo?',
 short:'Conoce el coste del programa eco: energía, litros y usos a lo largo del año.',
 description:'Calculadora del coste variable del lavavajillas por lavado y al año usando kWh/100 ciclos, litros por ciclo y tarifas editables.',
 intro:'El lavavajillas también muestra kWh por 100 ciclos y consumo de agua por ciclo en la etiqueta europea del programa eco. Convierte esas cifras en coste por lavado y gasto anual según tus hábitos.',
 image:'kitchen',icon:'calculator',reading:'4 min',
 fields:[
  ['energy100','Consumo de etiqueta','kWh/100 ciclos','75','Ejemplo didáctico para el programa eco; cambia por tu etiqueta.'],
  ['litresCycle','Agua por ciclo','L/ciclo','10','Dato de ejemplo; corresponde al programa eco de tu equipo.'],
  ['cyclesWeek','Lavados por semana','ciclos/semana','5','Ajusta las veces que realmente lo usas.'],
  ['price','Precio de electricidad','€/kWh','0,20','Precio de energía editable.'],
  ['water','Precio variable del agua','€/m³','1,50','Ejemplo municipal editable.'],
  ['sewer','Precio variable saneamiento','€/m³','0,70','Ejemplo editable; tarifa local.']
 ],
 formula:'Coste/ciclo = (kWh/100 ciclos ÷ 100) × €/kWh + (L/ciclo ÷ 1000) × (€/m³ agua + saneamiento). Coste anual = coste/ciclo × ciclos/semana × 52.',
 model:'Programa eco de etiqueta europea; no extrapolar esos datos a cualquier ciclo sin conocer sus consumos.',
 limits:['No incluye pastillas de detergente, abrillantador ni desgaste.','El consumo puede cambiar con cargas, programas y temperatura de entrada.','No se modelan bloques tarifarios ni cuotas de agua.'],
 example:'Ejemplo: 75 kWh/100 ciclos, 10 L/ciclo y tarifas 0,20 €/kWh, 1,50 €/m³ y 0,70 €/m³ ⇒ 0,172 € por ciclo.',
 questions:[{q:'¿Qué programa refleja la etiqueta?',a:'El programa eco utilizado en el ensayo de etiquetado, no todos los programas.'},{q:'¿Cómo introduzco el agua?',a:'En litros por ciclo: el programa eco aparece en la etiqueta del aparato.'},{q:'¿Sirve para decidir entre dos modelos?',a:'Sí, si empleas etiquetas comparables y el mismo número de ciclos; considera también el precio de compra y necesidades reales.'}],
 related:['lavadora','electricidad','freidora'],src:['dishwasherEU','eprel','cnmc'],
 keyTakeaways:['Convierte correctamente kWh/100 ciclos.','Incluye agua y saneamiento variables.','No confunde coste de uso con coste total de propiedad.']
 }),
 define({
 id:'secadora',slug:'cuanto-gasta-secadora',group:'herramientas',category:'Electrodomésticos',categorySlug:'electrodomesticos',tag:'Comparar consumos',
 title:'¿Cuánto consume una secadora por ciclo y al año?',
 short:'Introduce kWh/100 ciclos y compara dos secadoras con el mismo uso.',
 description:'Calculadora del gasto de secadora con etiqueta europea en kWh por 100 ciclos, frecuencia y comparación de alternativas sin promesas de ahorro.',
 intro:'Las etiquetas nuevas de secadoras en la UE indican kWh por 100 ciclos. Compara dos consumos ponderados para estimar su coste variable con igual número de secados.',
 image:'washing',icon:'thermometer',reading:'4 min',
 fields:[
  ['energy100','Secadora A: consumo de etiqueta','kWh/100 ciclos','175','Ejemplo ilustrativo; consulta los datos del modelo A.'],
  ['alternative100','Secadora B: consumo de etiqueta','kWh/100 ciclos','95','Ejemplo ilustrativo; consulta los datos del modelo B.'],
  ['cyclesWeek','Secados por semana','ciclos/semana','3','Mismo uso para ambas opciones.'],
  ['price','Precio de energía','€/kWh','0,20','Precio editable de tu contrato.']
 ],
 formula:'kWh/ciclo = kWh/100 ciclos ÷ 100. Coste anual A/B = kWh/ciclo × secados/semana × 52 × €/kWh.',
 model:'Comparación de consumo ponderado por ciclo declarado en la nueva etiqueta europea. No significa idéntico tiempo de secado o resultados en todas las cargas.',
 limits:['La normativa de etiqueta de secadoras cambió en julio de 2025: no mezcles cifras de etiquetas antiguas sin convertirlas.','No incluye mantenimiento, instalación ni compra de la máquina.','Compara equipos con capacidades y programas compatibles.'],
 example:'Ejemplo editable: 175 frente a 95 kWh/100 ciclos, 3 ciclos/semana y 0,20 €/kWh ⇒ diferencia estimada de 24,96 € al año.',
 questions:[{q:'¿La secadora etiqueta kWh/ciclo o kWh/100 ciclos?',a:'La nueva etiqueta europea utiliza kWh por 100 ciclos; revisa el formato y fecha de la etiqueta de tu aparato.'},{q:'¿La segunda opción garantiza ahorrar?',a:'No. La diferencia depende de los ciclos y precio introducidos. La carga y el programa pueden cambiar el resultado.'},{q:'¿Es suficiente para decidir una compra?',a:'No. Añade precio de compra, garantía, capacidad y mantenimiento antes de elegir.'}],
 related:['lavadora','lavavajillas','electricidad'],src:['dryerEU','eprel'],
 keyTakeaways:['Compara etiquetas del mismo formato.','Mide cada modelo en kWh por 100 ciclos.','No confundas ahorro energético con amortización de compra.']
 }),
 define({
 id:'iluminacion',slug:'calculadora-ahorro-bombillas-led',group:'comparativas',category:'Electricidad',categorySlug:'electricidad',tag:'Amortización simple',
 title:'Calculadora de ahorro al cambiar bombillas por LED',
 short:'Compara vatios, horas, puntos de luz y coste de compra para estimar el retorno.',
 description:'Comparador de iluminación LED frente a bombillas antiguas: kWh anuales, euros y amortización simple con tus vatios, horas y precio.',
 intro:'Dos bombillas con potencias diferentes pueden proporcionar luz comparable, pero debes comprobar lúmenes y temperatura de color. Esta simulación compara solo electricidad y un coste de inversión añadido.',
 image:'home',icon:'zap',reading:'5 min',
 fields:[
  ['oldWatts','Bombilla actual','W','60','Potencia eléctrica real de la bombilla actual.'],
  ['newWatts','Bombilla alternativa','W','8','Ejemplo LED, comprueba lúmenes equivalentes.'],
  ['units','Puntos de luz iguales','unidades','5','Cuántas bombillas vas a sustituir.'],
  ['hours','Horas encendidas por día','h/día','4','Horas diarias de iluminación en los días indicados.'],
  ['days','Días de uso al año','días','300','Usa 365 si enciendes cada día.'],
  ['price','Precio de energía','€/kWh','0,20','Precio editable del kWh.'],
  ['investment','Coste adicional del cambio','€','25','Diferencia de compra total de las bombillas. No incluye mano de obra.']
 ],
 formula:'kWh/año por opción = W × unidades × horas/día × días ÷ 1000. Diferencia €/año = (kWh actual − kWh alternativa) × €/kWh. Amortización simple = inversión adicional ÷ diferencia anual positiva.',
 model:'Supone las mismas horas de uso y una iluminación satisfactoria para ambos escenarios; la equivalencia luminosa debe comprobarse en lúmenes.',
 limits:['La potencia no dice por sí sola cuánta luz recibe la estancia: compara lúmenes y distribución.','La amortización simple ignora vida útil, inflación, mantenimiento y valor temporal del dinero.','Si el coste variable de la alternativa no es menor, no hay retorno positivo por electricidad.'],
 example:'Ejemplo: 5 bombillas de 60 W frente a 8 W, 4 h/día y 300 días, 0,20 €/kWh ⇒ diferencia de 62,40 €/año; si el cambio cuesta 25 € extra, retorno simple de unos 0,40 años.',
 questions:[{q:'¿Una LED de 8 W ilumina como una de 60 W?',a:'No se puede saber solo con los W; compara lúmenes y distribución de la luz.'},{q:'¿Qué significa amortización simple?',a:'Años necesarios para compensar la inversión adicional con el ahorro variable estimado, sin finanzas ni mantenimiento.'},{q:'¿Se amortiza siempre?',a:'No. Si el consumo o precio no justifican el cambio, no hay amortización positiva.'}],
 related:['electricidad','standby','frigorifico'],src:['idae','cnmc'],
 keyTakeaways:['Compara lúmenes antes que vatios.','Introduce horas de uso reales.','Un retorno simple no es una garantía financiera.']
 }),
 define({
 id:'bomba-calor',slug:'bomba-calor-vs-radiador-electrico',group:'comparativas',category:'Climatización',categorySlug:'climatizacion',tag:'Igual demanda térmica',
 title:'Bomba de calor vs radiador eléctrico: compara el coste',
 short:'Calcula kWh eléctricos para aportar igual cantidad de calor con SCOP editable.',
 description:'Comparador de coste eléctrico de bomba de calor frente a radiador resistivo, con demanda térmica, SCOP y rendimiento eléctrico configurables.',
 intro:'Para comparar tecnologías de calefacción no basta con las potencias de placa. Modelamos la misma demanda anual de calor útil: una bomba de calor con SCOP hipotético y un radiador con rendimiento eléctrico equivalente.',
 image:'heating',icon:'thermometer',reading:'5 min',
 fields:[
  ['heat','Calor útil necesario en la temporada','kWh térmicos','3000','Demanda térmica hipotética. Si no la conoces, trata el resultado como escenario.'],
  ['scop','SCOP de la bomba de calor','coeficiente','3','Valor de ejemplo, no rendimiento garantizado en tu instalación.'],
  ['resistance','Rendimiento útil del radiador','%','100','Para resistencia eléctrica directa suele aproximarse a 100 % en el local.'],
  ['price','Precio de energía','€/kWh','0,20','Ejemplo editable para ambas opciones.']
 ],
 formula:'Electricidad bomba = kWh térmicos ÷ SCOP. Electricidad radiador = kWh térmicos ÷ (rendimiento/100). Diferencia = (electricidad radiador − bomba) × €/kWh.',
 model:'Compara energía eléctrica para igual calor útil anual aportado. SCOP resume rendimiento estacional teórico del sistema y puede no reflejar una vivienda concreta.',
 limits:['No compara calidad de confort, radiación, distribución, capacidad o potencia puntual.','No incluye inversión, instalación, revisiones ni vida útil; no estima amortización de compra.','Un SCOP de etiqueta depende de condiciones de referencia; el rendimiento real varía con clima, impulsión y uso.'],
 example:'Ejemplo: 3000 kWh de calor útil, SCOP 3, radiador al 100 % y 0,20 €/kWh ⇒ 200 € bomba y 600 € radiador, diferencia variable de 400 € para ese escenario.',
 questions:[{q:'¿Es lo mismo SCOP que potencia térmica?',a:'No. SCOP es una relación estacional entre calor entregado y electricidad consumida en condiciones específicas.'},{q:'¿La bomba de calor cuesta siempre menos?',a:'Depende del SCOP obtenido, de la demanda, del precio y de los costes no modelados.'},{q:'¿Sirve para calcular la amortización de instalar aerotermia?',a:'No. Esta herramienta solo compara el coste variable de electricidad para la misma cantidad de calor útil.'}],
 related:['radiador','aire','electricidad'],src:['idae','eprel','cnmc'],
 keyTakeaways:['Mismo calor útil como base de comparación.','SCOP editable, no porcentaje universal.','No incluir compras o instalación en el resultado energético.']
 }),
 define({
 id:'fuga-agua',slug:'calculadora-fuga-agua-grifo',group:'herramientas',category:'Agua',categorySlug:'agua',tag:'Pérdidas de agua',
 title:'¿Cuánta agua se pierde por un grifo que gotea?',
 short:'Mide mililitros por minuto y estima litros, m³ y coste variable anual.',
 description:'Calcula los litros y euros de una fuga de agua doméstica a partir de mililitros por minuto, horas, días y tarifas locales editables.',
 intro:'El tamaño de cada gota varía: no existe un volumen universal fiable por goteo. Mide con un vaso graduado cuántos mililitros recoge el grifo en un minuto y obtén un escenario anual.',
 image:'tap',icon:'droplets',reading:'3 min',
 fields:[
  ['mlMin','Agua recogida en un minuto','mL/min','30','Mide durante un minuto con un recipiente graduado.'],
  ['hours','Horas al día con la fuga','h/día','24','Solo las horas en que realmente gotea.'],
  ['days','Días en el periodo','días','365','Periodo que quieres simular.'],
  ['water','Precio variable del agua','€/m³','1,50','Introduce tu tarifa del agua local.'],
  ['sewer','Saneamiento variable','€/m³','0,70','Puede variar según ayuntamiento y contrato.']
 ],
 formula:'Litros perdidos = (mL/min ÷ 1000) × 60 × horas/día × días. m³ = L ÷ 1000. Coste variable = m³ × (agua + saneamiento).',
 model:'Caudal medido constante durante las horas indicadas; si cambia el goteo, haz varias mediciones para estimar el promedio.',
 limits:['No uses un número fijo de gotas por litro sin medir el volumen: el tamaño de cada gota cambia.','No incluye mínimos de consumo, bloques, cuotas fijas ni impuestos municipales.','Una fuga en una tubería puede tener caudal muy superior y causar daños: busca ayuda técnica si procede.'],
 example:'Ejemplo: 30 mL/min todo el día durante 365 días ⇒ 15.768 litros (15,768 m³); con 1,50 + 0,70 €/m³, 34,69 € variables.',
 questions:[{q:'¿Cómo mido un grifo que gotea?',a:'Coloca un recipiente graduado y mide los mililitros durante uno o varios minutos, sin desperdiciar agua adicional.'},{q:'¿Incluye toda mi factura de agua?',a:'No: las cuotas fijas y bloques de facturación suelen depender del municipio.'},{q:'¿Y si la fuga no es constante?',a:'Usa un periodo representativo o compara varias mediciones para no extrapolar una excepción.'}],
 related:['ducha','lavadora','lavavajillas'],src:['cnmc'],
 keyTakeaways:['Mide caudal, no «gotas universales».','Separa agua y saneamiento.','Las tarifas municipales son distintas.']
 }),
 define({
 id:'ventilador',slug:'cuanto-gasta-ventilador',group:'herramientas',category:'Climatización',categorySlug:'climatizacion',tag:'Ventilación',
 title:'¿Cuánto consume un ventilador por hora y al verano?',
 short:'Estima el gasto eléctrico de uno o varios ventiladores durante la temporada.',
 description:'Calculadora gratuita del gasto de un ventilador de pie, torre o techo, usando W, horas diarias, días, equipos y precio del kWh.',
 intro:'Un ventilador mueve aire, pero no enfría una estancia igual que un aire acondicionado. Conoce su coste eléctrico con los vatios y horas de uso de tu equipo, sin equiparar tecnologías que ofrecen diferente confort.',
 image:'cooling',icon:'power',reading:'3 min',
 fields:[
  ['watts','Potencia eléctrica del ventilador','W','55','Etiqueta o consumo medido; no la velocidad del aire.'],
  ['hours','Horas de uso diarias','h/día','8','Media de los días que lo utilizas.'],
  ['days','Días por temporada','días','90','Número de días reales de uso.'],
  ['units','Ventiladores equivalentes','unidades','1','Equipos con la misma potencia y tiempo de uso.'],
  ['price','Precio de energía','€/kWh','0,20','Ejemplo editable de tu factura.']
 ],
 formula:'kWh temporada = W ÷ 1000 × h/día × días × número de ventiladores. Euros = kWh × €/kWh.',
 model:'Potencia eléctrica constante durante las horas introducidas, sin contar variación por velocidad o temporizador.',
 limits:['Un ventilador no sustituye el efecto frigorífico de un equipo de aire acondicionado; no prometemos confort equivalente.','El consumo puede variar con velocidad y modo de oscilación.','No incluye precio de compra, mantenimiento o cuotas de la factura.'],
 example:'Ejemplo: ventilador de 55 W durante 8 h/día y 90 días a 0,20 €/kWh ⇒ 39,6 kWh y 7,92 € por temporada.',
 questions:[{q:'¿Un ventilador gasta lo mismo a todas las velocidades?',a:'No necesariamente. Si tienes un medidor, introduce los vatios de la velocidad que utilizas.'},{q:'¿Es mejor que el aire acondicionado?',a:'El gasto eléctrico suele diferir, pero no ofrecen el mismo servicio de enfriamiento: compara también temperatura y confort.'},{q:'¿Qué precio del kWh introduzco?',a:'El término de energía de la tarifa que se aplique en el horario de uso.'}],
 related:['aire','electricidad','bomba-calor'],src:['idae','cnmc'],
 keyTakeaways:['Introduce vatios eléctricos medidos.','Los días de temporada dependen de tu uso.','No compares ventilador y aire como confort equivalente.']
 })
];
