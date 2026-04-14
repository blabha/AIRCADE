export const INDUSTRIES = [
  "Architecture & Construction",
  "Art & Design",
  "Education",
  "Engineering",
  "Finance & Banking",
  "Government & Public Sector",
  "Healthcare & Medicine",
  "Hospitality & Tourism",
  "Legal",
  "Manufacturing",
  "Marketing & Advertising",
  "Media & Entertainment",
  "Non-profit & NGO",
  "Real Estate",
  "Research & Science",
  "Retail & E-commerce",
  "Technology & Software",
  "Transportation & Logistics",
  "Other",
];

export const INDUSTRIES_ES = [
  "Arquitectura y Construcción",
  "Arte y Diseño",
  "Educación",
  "Ingeniería",
  "Finanzas y Banca",
  "Gobierno y Sector Público",
  "Salud y Medicina",
  "Hospitalidad y Turismo",
  "Legal",
  "Manufactura",
  "Marketing y Publicidad",
  "Medios y Entretenimiento",
  "Sin Fines de Lucro / ONG",
  "Bienes Raíces",
  "Investigación y Ciencia",
  "Comercio Minorista",
  "Tecnología y Software",
  "Transporte y Logística",
  "Otro",
];

// Smart tips: [personaBand][industry] => { en, es }
// personaBand: "turbo" | "casual" | "mindful" | "green"
const TIPS = {
  "Technology & Software": {
    turbo: {
      en: "You're burning compute on every request. Try choosing smaller, task-specific models instead of GPT-4 for simple queries. Batch similar tasks to cut inference calls by up to 80%.",
      es: "Estás gastando recursos en cada solicitud. Usa modelos más pequeños y específicos para consultas simples. Agrupa tareas similares para reducir llamadas de inferencia hasta un 80%.",
    },
    casual: {
      en: "You're on the right track. Refine your prompts to get answers in one shot — fewer retries means less energy. Consider self-hosting lightweight models for repetitive tasks.",
      es: "Vas por buen camino. Afina tus prompts para obtener respuestas en un intento. Considera alojar modelos ligeros localmente para tareas repetitivas.",
    },
    mindful: {
      en: "Good habits. Go further by auditing which AI integrations in your stack are actually used vs. just running. Idle AI services still consume standby energy.",
      es: "Buenos hábitos. Ve más allá auditando qué integraciones de IA en tu stack se usan realmente. Los servicios de IA inactivos siguen consumiendo energía.",
    },
    green: {
      en: "You're a role model. Share your efficient-prompting practices with your team and document them. One policy doc can multiply your impact across an entire engineering org.",
      es: "Eres un modelo a seguir. Comparte tus prácticas de prompts eficientes con tu equipo. Un documento de política puede multiplicar tu impacto en toda la organización.",
    },
  },
  "Healthcare & Medicine": {
    turbo: {
      en: "AI diagnostic tools have a significant data footprint AND privacy risks. Limit AI queries to cases where clinical value is clear — not every chart review needs an AI pass.",
      es: "Las herramientas de IA diagnóstica tienen gran huella de datos Y riesgos de privacidad. Limita las consultas de IA a casos con valor clínico claro.",
    },
    casual: {
      en: "Use AI for drafting, not deciding. Reserve compute-heavy AI tools for high-stakes summarization, not routine notes. Your clinical judgment is still the greenest tool you have.",
      es: "Usa IA para redactar, no para decidir. Reserva herramientas de IA para resúmenes de alto impacto, no notas rutinarias.",
    },
    mindful: {
      en: "Smart usage. Advocate for on-premise or edge AI models in your facility — they reduce cloud energy costs and keep patient data local.",
      es: "Uso inteligente. Promueve modelos de IA locales en tu institución — reducen costos de energía en la nube y mantienen los datos del paciente en local.",
    },
    green: {
      en: "Excellent discipline. Push for your institution to publish an AI energy policy. Healthcare AI standards can lead the sector on responsible compute.",
      es: "Excelente disciplina. Impulsa que tu institución publique una política de energía IA. Los estándares de IA en salud pueden liderar el sector.",
    },
  },
  "Architecture & Construction": {
    turbo: {
      en: "AI rendering farms for architectural visualisations are energy-intensive. Reserve AI renders for client presentations — use hand sketches or quick Sketchup drafts for internal reviews.",
      es: "Las granjas de renderizado IA consumen mucha energía. Reserva los renders para presentaciones con clientes, usa bocetos para revisiones internas.",
    },
    casual: {
      en: "Good balance. Try reducing render resolution during iteration phases and only going full AI-render for final outputs. You'll cut energy use by ~60% mid-project.",
      es: "Buen equilibrio. Reduce la resolución de render durante la iteración y usa el render completo solo para las salidas finales. Reducirás el uso energético un 60%.",
    },
    mindful: {
      en: "Thoughtful approach. Push BIM teams to evaluate the carbon footprint of digital workflows alongside material choices — the design tool's energy is part of the building's lifecycle.",
      es: "Enfoque reflexivo. Impulsa a los equipos BIM a evaluar la huella de carbono de los flujos digitales junto con la selección de materiales.",
    },
    green: {
      en: "You're ahead of the curve. Document your low-AI workflow for your firm — a repeatable process for sustainable design practice is worth more than a single project win.",
      es: "Vas por delante. Documenta tu flujo de trabajo de bajo uso de IA para tu empresa — un proceso sostenible repetible vale más que un proyecto puntual.",
    },
  },
  "Education": {
    turbo: {
      en: "Heavy AI use in lesson planning trains students to outsource thinking. Model intentional use — show students WHEN you use AI and why, versus when you don't.",
      es: "El uso intensivo de IA en la planificación enseña a los estudiantes a externalizar el pensamiento. Modela el uso intencional — muestra cuándo usas IA y por qué.",
    },
    casual: {
      en: "Reasonable usage. Create an 'AI vs. no-AI' rubric for assignments — it helps students reflect on when AI adds vs. subtracts from their learning.",
      es: "Uso razonable. Crea una rúbrica 'IA vs. sin IA' para tareas — ayuda a los estudiantes a reflexionar sobre cuándo la IA suma o resta al aprendizaje.",
    },
    mindful: {
      en: "Great practice. Incorporate AI environmental literacy into your curriculum. Students who understand the cost of a query make better lifetime AI choices.",
      es: "Gran práctica. Incorpora la alfabetización ambiental de IA en tu currículo. Los estudiantes que entienden el costo de una consulta toman mejores decisiones.",
    },
    green: {
      en: "You're the model educator. Write up your AI-conscious classroom policy and share it — the education sector needs more examples like yours.",
      es: "Eres el educador modelo. Escribe tu política de IA consciente en el aula y compártela — el sector educativo necesita más ejemplos como el tuyo.",
    },
  },
  "Marketing & Advertising": {
    turbo: {
      en: "AI image generation at scale for campaigns adds up fast — 1,000 images can equal the energy of flying across a continent. Curate and reuse assets rather than regenerating.",
      es: "La generación de imágenes IA a escala suma rápido — 1.000 imágenes pueden equivaler a volar por un continente. Reutiliza activos en lugar de regenerar.",
    },
    casual: {
      en: "Moderate use is good. Establish a 'generate once, repurpose many' rule for AI content. Each repurpose of an existing asset offsets 10+ new generation calls.",
      es: "El uso moderado es bueno. Establece una regla de 'generar una vez, reutilizar muchas' para contenido IA. Cada reutilización compensa más de 10 nuevas generaciones.",
    },
    mindful: {
      en: "Solid habits. Calculate the carbon cost of your next AI-heavy campaign and include it in post-campaign reports. Transparency sets a new industry standard.",
      es: "Sólidos hábitos. Calcula el costo de carbono de tu próxima campaña con uso intensivo de IA e inclúyelo en los informes. La transparencia establece un nuevo estándar.",
    },
    green: {
      en: "Excellent practice. Pitch 'carbon-conscious creative' as a differentiator to clients — sustainability in process is becoming a procurement criterion for major brands.",
      es: "Excelente práctica. Presenta 'creativo consciente del carbono' como diferenciador — la sostenibilidad en el proceso es cada vez más criterio de compra de grandes marcas.",
    },
  },
  "Finance & Banking": {
    turbo: {
      en: "AI-generated financial reports replace analyst judgment with compute cost. Keep AI for anomaly detection and automation; keep humans writing the narrative and the strategy.",
      es: "Los informes financieros generados por IA reemplazan el juicio del analista con costo computacional. Usa IA para detección de anomalías; mantén a los humanos para narrativa y estrategia.",
    },
    casual: {
      en: "Reasonable balance. Audit which AI tools in your workflow run on renewable-powered data centers — many providers publish this data, and it's a simple switch.",
      es: "Balance razonable. Audita qué herramientas de IA en tu flujo usan centros de datos con energía renovable — muchos proveedores publican esto, y el cambio es sencillo.",
    },
    mindful: {
      en: "Good practice. Build an ESG metric for AI compute into your sustainability reporting. The finance sector has the tools to price externalities — use them on AI usage.",
      es: "Buena práctica. Incorpora una métrica ESG para el cómputo de IA en tus informes de sostenibilidad. El sector financiero tiene herramientas para valorar externalidades.",
    },
    green: {
      en: "You're ahead of regulation. Green AI practices will become mandatory disclosures — document your methodology now and you'll have a head start on compliance.",
      es: "Vas por delante de la regulación. Las prácticas de IA verde serán divulgaciones obligatorias — documenta tu metodología ahora y tendrás ventaja en cumplimiento.",
    },
  },
  "Media & Entertainment": {
    turbo: {
      en: "AI video and audio generation is the most energy-intensive creative use case. Reserve it for final deliverables, not drafts. A rough animatic sketch costs a fraction of a full AI render.",
      es: "La generación de video y audio con IA es el caso de uso creativo más intensivo en energía. Resérvalo para entregables finales, no borradores.",
    },
    casual: {
      en: "Good moderation. Consider a 'render budget' for productions — track AI compute the same way you track visual effects hours, and make tradeoffs intentionally.",
      es: "Buena moderación. Considera un 'presupuesto de render' para producciones — rastrea el cómputo de IA igual que las horas de efectos visuales, y haz compensaciones intencionalmente.",
    },
    mindful: {
      en: "Solid workflow. Advocate for your studio to prefer renewable-powered cloud rendering services. The post-production industry can drive enormous demand-side change.",
      es: "Flujo de trabajo sólido. Defiende que tu estudio prefiera servicios de renderizado en la nube con energía renovable. La industria de postproducción puede impulsar un gran cambio.",
    },
    green: {
      en: "Outstanding practice. Publish a behind-the-scenes look at your low-AI production process. Stories about sustainable creativity inspire the whole industry.",
      es: "Práctica sobresaliente. Publica un vistazo al proceso de producción con bajo uso de IA. Las historias sobre creatividad sostenible inspiran a toda la industria.",
    },
  },
};

const DEFAULT_TIPS = {
  turbo: {
    en: "You're using AI at a high rate. Start with one rule: only open an AI tool when no faster, lighter option exists. That one habit can cut your AI footprint by 40%.",
    es: "Estás usando IA a una tasa alta. Empieza con una regla: solo abre una herramienta de IA cuando no exista una opción más rápida y ligera. Ese hábito puede reducir tu huella un 40%.",
  },
  casual: {
    en: "You're in the middle — intentional enough to make a real difference. Pick one AI habit to improve this week: either batch your queries, or replace one daily AI task with a manual alternative.",
    es: "Estás en el medio — suficientemente intencional para marcar la diferencia. Elige un hábito de IA para mejorar esta semana: agrupa consultas o reemplaza una tarea de IA diaria con una alternativa manual.",
  },
  mindful: {
    en: "You think before you act — that's rare. Take it further by sharing your AI ethics with colleagues. Mindful use is most powerful when it becomes a team norm.",
    es: "Piensas antes de actuar — eso es poco común. Ve más allá compartiendo tu ética de IA con colegas. El uso consciente es más poderoso cuando se convierte en una norma del equipo.",
  },
  green: {
    en: "You're already making a difference. Your next challenge: influence others. One conversation about AI's environmental cost can ripple out further than any personal habit.",
    es: "Ya estás marcando la diferencia. Tu próximo desafío: influenciar a otros. Una conversación sobre el costo ambiental de la IA puede tener más impacto que cualquier hábito personal.",
  },
};

export function getSmartTip(industry, personaId, lang = "en") {
  const industryTips = TIPS[industry];
  if (industryTips && industryTips[personaId]) {
    return industryTips[personaId][lang] || industryTips[personaId]["en"];
  }
  return DEFAULT_TIPS[personaId][lang] || DEFAULT_TIPS[personaId]["en"];
}
