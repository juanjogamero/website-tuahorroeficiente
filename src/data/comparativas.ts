/**
 * Contenido editorial propio. Las URLs existentes se conservan hasta auditar
 * Search Console; las calculadoras de los mismos temas viven en /herramientas/.
 * Ninguna cifra de los ejemplos representa una tarifa vigente ni una media nacional.
 */
export interface ComparisonArticle {
  slug: string;
  toolId: string;
  category: string;
  title: string;
  cardTitle: string;
  description: string;
  lead: string;
  verdict: string;
  verdictDetail: string;
  readTime: string;
  matrix: [string, string, string][];
  sections: { heading: string; paragraphs: string[] }[];
  exampleTitle: string;
  exampleLead: string;
  conditions: string[];
}

export const comparisons: ComparisonArticle[] = [
  {
    slug: 'freidora-aire-vs-horno',
    toolId: 'freidora',
    category: 'Cocina',
    title: 'Freidora de aire o horno: ¿qué gasta menos y cuál conviene?',
    cardTitle: 'Freidora de aire frente a horno',
    description: 'Analizamos cuándo consume menos una freidora de aire que un horno: raciones, tandas, precalentamiento, costes de uso y límites de la comparación.',
    lead: 'Para una ración pequeña preparada en una sola tanda, la freidora de aire puede gastar menos electricidad. Si hay que cocinar para muchas personas y repetir ciclos, un horno completo puede resultar más práctico e incluso reducir la ventaja de consumo.',
    verdict: 'La cantidad de comida y el número de tandas importan más que comparar los vatios de la etiqueta.',
    verdictDetail: 'Una comparación justa exige preparar la misma comida, con resultados culinarios equivalentes, y contar toda la electricidad usada, incluido el precalentamiento.',
    readTime: '7 min de lectura',
    matrix: [
      ['Preparaciones pequeñas', 'Suele adaptarse bien a una o dos raciones.', 'Puede requerir calentar un espacio mayor.'],
      ['Comidas de gran volumen', 'Puede exigir varias tandas consecutivas.', 'Permite cocinar más cantidad a la vez.'],
      ['Precalentamiento', 'Según equipo y receta, puede ser breve o prescindible.', 'Puede suponer una parte relevante del consumo.'],
      ['Consumo que debes medir', 'kWh totales para una receta completa.', 'kWh totales de la misma receta y cantidad.'],
      ['Coste de compra', 'Solo compensa incluirlo al evaluar una adquisición.', 'Si ya lo tienes, su coste de compra es hundido.']
    ],
    sections: [
      {
        heading: 'Cuándo suele interesar una freidora de aire',
        paragraphs: [
          'Es especialmente interesante cuando cocinas pequeñas cantidades y puedes terminar toda la preparación en un único ciclo. El recipiente suele ser más compacto, pero eso por sí solo no demuestra un ahorro determinado: influyen la potencia media, el tiempo, la receta y la temperatura.',
          'Si la freidora necesita tres tandas para terminar la comida, compara la energía de las tres con la energía de una bandeja equivalente en el horno. La capacidad es parte de la eficiencia práctica, no una cuestión secundaria.'
        ]
      },
      {
        heading: 'Cuándo puede convenir más el horno',
        paragraphs: [
          'El horno permite cocinar bandejas grandes y varias preparaciones a la vez. Si ya vas a encenderlo, aprovechar el calor para más de una receta puede cambiar el resultado por ración.',
          'No confundas una potencia máxima elevada con un consumo igual de elevado durante cada minuto. Un termostato puede apagar resistencias durante parte del ciclo. Para comparar, el dato más fiable es la energía total medida en kWh por cocción.'
        ]
      },
      {
        heading: 'Qué mirar antes de comprar otro aparato',
        paragraphs: [
          'Además de la factura eléctrica, considera el espacio, la facilidad de limpieza, la capacidad útil, el tipo de alimentos y la frecuencia de uso. Una pequeña diferencia de céntimos por cocción puede tardar años en compensar una nueva compra.',
          'Si ya tienes un horno funcional, reducir el tiempo de precalentamiento cuando la receta lo permita y cocinar varias raciones puede ser más razonable que adquirir otro equipo exclusivamente para ahorrar.'
        ]
      }
    ],
    exampleTitle: 'Ejemplo reproducible: cuatro preparaciones semanales',
    exampleLead: 'Supongamos, sin atribuir estos datos a equipos concretos, 1,2 kWh por cocción de horno frente a 0,7 kWh de freidora de aire. A 0,20 €/kWh y cuatro preparaciones semanales: (1,2 − 0,7) × 0,20 = 0,10 € por preparación, es decir, 20,80 € en 52 semanas. La comparación dejaría de ser equivalente si la freidora necesitara varias tandas.',
    conditions: ['Compara la misma cantidad de alimento y el mismo punto de cocción.', 'Incluye precalentamiento y tandas adicionales.', 'Usa tu precio variable de energía y, si puedes, consumos medidos.', 'No presentes la diferencia eléctrica como amortización de compra.']
  },
  {
    slug: 'calculadora-ahorro-bombillas-led',
    toolId: 'iluminacion',
    category: 'Iluminación',
    title: 'Bombillas LED frente a tradicionales: ¿cuándo compensa cambiarlas?',
    cardTitle: 'LED frente a bombillas tradicionales',
    description: 'Diferencias entre bombillas LED y tradicionales: consumo, lúmenes, horas de uso, temperatura de color y cuándo puede compensar su sustitución.',
    lead: 'Una LED que proporciona una iluminación comparable suele necesitar menos electricidad que una bombilla incandescente antigua. Pero no basta con fijarse en los vatios: comprueba los lúmenes, la distribución de luz, el tipo de casquillo y las horas reales de uso.',
    verdict: 'El ahorro eléctrico debe evaluarse con la misma luz útil, no con bombillas de la misma potencia.',
    verdictDetail: 'La decisión depende de cuántas horas se encienden, qué bombillas sustituyes y cuánto cuesta el cambio completo. No todas las tecnologías tradicionales consumen lo mismo.',
    readTime: '6 min de lectura',
    matrix: [
      ['Electricidad consumida', 'Potencia normalmente menor a igual luz útil.', 'Varía mucho entre incandescente, halógena y otras tecnologías.'],
      ['Luz útil', 'Se expresa en lúmenes; consulta también distribución y temperatura de color.', 'Los vatios tampoco indican por sí solos la iluminación que recibe el espacio.'],
      ['Compatibilidad', 'Revisa casquillo, luminaria, regulación y dimensiones.', 'La bombilla existente puede funcionar sin adaptar la luminaria.'],
      ['Coste de sustitución', 'Precio de compra y posible compatibilidad de reguladores.', 'Sin desembolso nuevo si sigue funcionando.'],
      ['Uso recomendado', 'Especialmente relevante en puntos de luz encendidos muchas horas.', 'En espacios de uso excepcional, el retorno puede ser lento.']
    ],
    sections: [
      {
        heading: 'Por qué los lúmenes son la comparación correcta',
        paragraphs: [
          'El vatio expresa potencia eléctrica; el lumen es una medida de flujo luminoso. Dos bombillas de 8 W y 60 W no tienen por qué proporcionar una luz equivalente. Debes comparar primero los lúmenes y después comprobar temperatura de color, ángulo de apertura y reproducción cromática.',
          'Si sustituyes una bombilla regulable, revisa que la LED y el regulador sean compatibles. Una incompatibilidad puede ocasionar parpadeos o un funcionamiento insatisfactorio, independientemente del consumo.'
        ]
      },
      {
        heading: 'Cuándo merece más la pena sustituir una bombilla',
        paragraphs: [
          'La sustitución tiene más impacto económico en habitaciones, pasillos o zonas de trabajo donde la iluminación permanece encendida muchas horas. En una estancia que se usa cinco minutos por semana, una diferencia grande de potencia puede traducirse en pocos euros al año.',
          'La decisión de reemplazar una bombilla que todavía funciona también debe considerar materiales, residuos y coste de compra. No es adecuado prometer que toda sustitución se amortiza en un número fijo de meses.'
        ]
      },
      {
        heading: 'Qué comprobar en la etiqueta y en tu instalación',
        paragraphs: [
          'Busca potencia, lúmenes, temperatura de color, vida útil declarada y compatibilidad con regulación. En luminarias cerradas, comprueba también las condiciones térmicas recomendadas por el fabricante.',
          'Utiliza el precio variable por kWh de tu contrato para calcular el coste eléctrico. No confundas ese componente con la factura completa, que incluye otros conceptos.'
        ]
      }
    ],
    exampleTitle: 'Ejemplo reproducible: cinco puntos de luz',
    exampleLead: 'Como escenario didáctico, cinco bombillas de 60 W se sustituyen por cinco de 8 W, con cuatro horas diarias durante 300 días y una energía a 0,20 €/kWh. La diferencia es (60 − 8) × 5 × 4 × 300 ÷ 1000 = 312 kWh al año, equivalentes a 62,40 € de energía variable. Solo sería una comparación válida de compra si ambas opciones aportaran luz útil comparable y si se incorpora el coste de sustitución.',
    conditions: ['Compara lúmenes y luz percibida, no solo W.', 'Distingue tecnologías tradicionales; halógena e incandescente no son idénticas.', 'Calcula horas reales de encendido y coste de compra.', 'Consulta la ficha de la bombilla y el regulador, si existe.']
  },
  {
    slug: 'bomba-calor-vs-radiador-electrico',
    toolId: 'bomba-calor',
    category: 'Climatización',
    title: 'Bomba de calor o radiador eléctrico: ¿qué conviene para calefacción?',
    cardTitle: 'Bomba de calor frente a radiador eléctrico',
    description: 'Comparamos bomba de calor y radiador eléctrico para una misma demanda de calefacción: SCOP, gasto eléctrico, instalación y limitaciones.',
    lead: 'Para aportar una misma cantidad de calor útil, una bomba de calor con rendimiento estacional superior a 1 puede consumir menos electricidad que un radiador resistivo. Sin embargo, el coste de instalarla, la vivienda y el clima pueden cambiar la decisión económica.',
    verdict: 'Para comparar consumo, primero iguala el calor útil entregado a la vivienda.',
    verdictDetail: 'Un radiador resistivo y una bomba de calor no se deben comparar solo por los vatios eléctricos que anuncian. El SCOP describe la relación estacional entre calor aportado y electricidad consumida en condiciones de referencia.',
    readTime: '8 min de lectura',
    matrix: [
      ['Principio', 'Traslada calor del exterior al interior.', 'Transforma electricidad en calor por resistencia.'],
      ['Consumo para igual calor útil', 'Depende del rendimiento estacional real (SCOP).', 'Aproximadamente 1 kWh eléctrico por 1 kWh térmico en el local.'],
      ['Inversión', 'Equipo e instalación suelen ser más complejos.', 'Entrada más sencilla para soluciones portátiles.'],
      ['Confort y distribución', 'Dependen de terminales, potencia y configuración.', 'Calor localizado y distribución diferente según el emisor.'],
      ['Mantenimiento y uso', 'Requiere instalación adecuada y revisiones según equipo.', 'El coste total depende del aparato y las condiciones.']
    ],
    sections: [
      {
        heading: 'Por qué una bomba de calor puede usar menos electricidad',
        paragraphs: [
          'Una bomba de calor no se limita a convertir electricidad en calor: emplea trabajo eléctrico para transportar energía térmica. Por eso puede entregar varios kWh térmicos por cada kWh eléctrico. El valor estacional real depende del clima, la temperatura de impulsión, el aislamiento y las condiciones de uso.',
          'El SCOP publicado en la documentación de un equipo es un indicador en condiciones definidas. No debe presentarse como el rendimiento exacto que obtendrás en tu casa.'
        ]
      },
      {
        heading: 'Cuándo tiene sentido un radiador eléctrico',
        paragraphs: [
          'En una habitación usada ocasionalmente, un radiador pequeño puede resolver una necesidad puntual sin acometer una instalación. El coste inicial y la flexibilidad pueden pesar más que el coste de energía si el uso total es escaso.',
          'Para calentar una vivienda durante muchas horas en una temporada larga, el consumo variable adquiere más importancia. Aun así, la comparación debe considerar inversión, mantenimiento y vida útil, no solo kWh.'
        ]
      },
      {
        heading: 'Qué datos hacen falta para elegir con criterio',
        paragraphs: [
          'Necesitas estimar la demanda real de calor de la vivienda, conocer el rendimiento de la solución propuesta y separar inversión inicial, mantenimiento y precio del suministro. Compara siempre el mismo confort razonablemente esperado.',
          'El aislamiento puede reducir la demanda en ambas opciones y modificar el periodo de recuperación de una inversión. Una estimación basada solo en metros cuadrados o en potencia de placa no es un presupuesto energético suficiente.'
        ]
      }
    ],
    exampleTitle: 'Ejemplo reproducible: 3.000 kWh de calor útil',
    exampleLead: 'Con una demanda hipotética de 3.000 kWh térmicos, SCOP 3 y precio de energía 0,20 €/kWh: la bomba consume 3.000 ÷ 3 = 1.000 kWh (200 €), frente a aproximadamente 3.000 kWh (600 €) de un radiador idealmente resistivo. La diferencia variable sería 400 € para ese escenario, pero no incluye instalación, mantenimiento ni financiación.',
    conditions: ['Iguala la energía térmica útil y el nivel de confort.', 'No confundas SCOP con potencia térmica nominal.', 'Incluye inversión e instalación al evaluar una compra.', 'Revisa las condiciones de clima, aislamiento y temperatura de uso.']
  }
];

export const comparisonBySlug = (slug: string) => comparisons.find(article => article.slug === slug);
