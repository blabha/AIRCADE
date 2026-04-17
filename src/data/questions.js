// ── Industry grouping ─────────────────────────────────────────────────────────
// Maps each selectable industry to one of six content groups used for
// personalising question scenario text.
export const INDUSTRY_GROUP_MAP = {
  "Art & Design":              "creative",
  "Marketing & Advertising":   "creative",
  "Media & Entertainment":     "creative",
  "Technology & Software":     "tech",
  "Engineering":               "tech",
  "Healthcare & Medicine":     "health",
  "Education":                 "edu",
  "Research & Science":        "edu",
  "Architecture & Construction":"architecture",
  "Finance & Banking":         "professional",
  "Legal":                     "professional",
  "Government & Public Sector":"professional",
};

// ── Industry-specific question contexts ──────────────────────────────────────
// Keyed by `q${question.id}` then by group name.
// Returns null for industries not in INDUSTRY_GROUP_MAP → falls back to default text.
const INDUSTRY_CONTEXTS = {
  q1: { // "need a quick image"
    creative: {
      en: "You're designing assets for a client project and need a key visual. You…",
      es: "Estás diseñando material para un proyecto de cliente y necesitas un visual clave. Tú…",
      ca: "Estàs dissenyant material per a un projecte de client i necessites un visual clau. Tu…",
    },
    tech: {
      en: "You need a diagram or UI asset for a product spec or dev presentation. You…",
      es: "Necesitas un diagrama o activo de UI para una especificación de producto. Tú…",
      ca: "Necessites un diagrama o actiu d'UI per a una especificació de producte. Tu…",
    },
    health: {
      en: "You need an illustration for a patient brochure or clinical slide. You…",
      es: "Necesitas una ilustración para un folleto de paciente o presentación clínica. Tú…",
      ca: "Necessites una il·lustració per a un fullet de pacient o presentació clínica. Tu…",
    },
    edu: {
      en: "You need a visual aid for a lesson plan or academic poster. You…",
      es: "Necesitas un apoyo visual para un plan de lección o póster académico. Tú…",
      ca: "Necessites un suport visual per a un pla de lliçó o pòster acadèmic. Tu…",
    },
    architecture: {
      en: "You need a concept image for a client proposal or design review. You…",
      es: "Necesitas una imagen conceptual para una propuesta de cliente o revisión de diseño. Tú…",
      ca: "Necessites una imatge conceptual per a una proposta de client o revisió de disseny. Tu…",
    },
    professional: {
      en: "You need a graphic for a board presentation or official document. You…",
      es: "Necesitas un gráfico para una presentación directiva o documento oficial. Tú…",
      ca: "Necessites un gràfic per a una presentació directiva o document oficial. Tu…",
    },
  },
  q2: { // "have a question"
    creative: {
      en: "You're stuck on a creative decision and need a quick answer. You…",
      es: "Estás atascado en una decisión creativa y necesitas una respuesta rápida. Tú…",
      ca: "Estàs encallat en una decisió creativa i necessites una resposta ràpida. Tu…",
    },
    tech: {
      en: "You hit a wall while coding and need a quick technical answer. You…",
      es: "Te bloqueaste mientras programabas y necesitas una respuesta técnica rápida. Tú…",
      ca: "T'has bloquejat mentre programaves i necessites una resposta tècnica ràpida. Tu…",
    },
    health: {
      en: "You need to quickly look up a clinical reference or drug interaction. You…",
      es: "Necesitas buscar rápidamente una referencia clínica o interacción de medicamentos. Tú…",
      ca: "Necessites buscar ràpidament una referència clínica o interacció de medicaments. Tu…",
    },
    edu: {
      en: "You have a curriculum or research question while preparing a session. You…",
      es: "Tienes una duda curricular o de investigación mientras preparas una sesión. Tú…",
      ca: "Tens un dubte curricular o de recerca mentre prepares una sessió. Tu…",
    },
    architecture: {
      en: "You need a quick answer about a building code or material specification. You…",
      es: "Necesitas una respuesta rápida sobre un código de construcción o especificación. Tú…",
      ca: "Necessites una resposta ràpida sobre un codi de construcció o especificació. Tu…",
    },
    professional: {
      en: "You need to quickly clarify a regulatory clause or legal term. You…",
      es: "Necesitas clarificar rápidamente una cláusula normativa o término legal. Tú…",
      ca: "Necessites clarificar ràpidament una clàusula normativa o terme legal. Tu…",
    },
  },
  q3: { // "writing a report"
    creative: {
      en: "You need to write a campaign brief or creative strategy document. You…",
      es: "Necesitas escribir un brief de campaña o documento de estrategia creativa. Tú…",
      ca: "Necessites escriure un brief de campanya o document d'estratègia creativa. Tu…",
    },
    tech: {
      en: "You need to write technical documentation or an engineering status update. You…",
      es: "Necesitas escribir documentación técnica o una actualización de estado de ingeniería. Tú…",
      ca: "Necessites escriure documentació tècnica o una actualització d'estat d'enginyeria. Tu…",
    },
    health: {
      en: "You need to write a patient summary or clinical case report. You…",
      es: "Necesitas escribir un resumen de paciente o informe de caso clínico. Tú…",
      ca: "Necessites escriure un resum de pacient o informe de cas clínic. Tu…",
    },
    edu: {
      en: "You need to write a lesson plan, research paper, or student progress report. You…",
      es: "Necesitas escribir un plan de lección, trabajo de investigación o informe de progreso. Tú…",
      ca: "Necessites escriure un pla de lliçó, treball de recerca o informe de progrés. Tu…",
    },
    architecture: {
      en: "You need to write a project specification or design rationale document. You…",
      es: "Necesitas escribir una especificación de proyecto o justificación de diseño. Tú…",
      ca: "Necessites escriure una especificació de projecte o justificació de disseny. Tu…",
    },
    professional: {
      en: "You need to write a compliance filing or regulatory analysis. You…",
      es: "Necesitas escribir un informe de cumplimiento o análisis regulatorio. Tú…",
      ca: "Necessites escriure un informe de compliment o anàlisi regulatòria. Tu…",
    },
  },
  q4: { // "50 photos / assets to process"
    creative: {
      en: "A photoshoot produced 50 campaign or product images that need processing. You…",
      es: "Una sesión de fotos produjo 50 imágenes de campaña o producto que necesitan procesarse. Tú…",
      ca: "Una sessió de fotos ha produït 50 imatges de campanya o producte que cal processar. Tu…",
    },
    tech: {
      en: "50 UI screenshots need to be standardised for technical documentation. You…",
      es: "50 capturas de pantalla de UI deben estandarizarse para la documentación técnica. Tú…",
      ca: "50 captures de pantalla de la UI s'han d'estandarditzar per a la documentació tècnica. Tu…",
    },
    health: {
      en: "50 clinical or research images need standardised processing for records. You…",
      es: "50 imágenes clínicas o de investigación necesitan procesamiento estándar para los registros. Tú…",
      ca: "50 imatges clíniques o de recerca necessiten processament estandarditzat per als registres. Tu…",
    },
    edu: {
      en: "50 photos from a field trip or event need editing for school records. You…",
      es: "50 fotos de una excursión o evento necesitan editarse para los registros escolares. Tú…",
      ca: "50 fotos d'una excursió o esdeveniment s'han d'editar per als registres escolars. Tu…",
    },
    architecture: {
      en: "50 site survey or progress photos need processing for a client report. You…",
      es: "50 fotos de inspección de obra o avance deben procesarse para un informe de cliente. Tú…",
      ca: "50 fotos d'inspecció d'obra o avenç s'han de processar per a un informe de client. Tu…",
    },
    professional: {
      en: "50 scanned documents or evidence images need standardised formatting. You…",
      es: "50 documentos escaneados o imágenes de evidencia necesitan formato estándar. Tú…",
      ca: "50 documents escanejats o imatges d'evidència necessiten format estandarditzat. Tu…",
    },
  },
  q5: { // "new AI tool drops"
    creative: {
      en: "A new AI tool just launched — it generates copy, images, and videos instantly. You…",
      es: "Acaba de lanzarse una herramienta IA que genera textos, imágenes y vídeos al instante. Tú…",
      ca: "Acaba de llançar-se una eina d'IA que genera textos, imatges i vídeos a l'instant. Tu…",
    },
    tech: {
      en: "A new AI coding assistant promises 10× dev speed with zero configuration. You…",
      es: "Un nuevo asistente de código IA promete 10× velocidad de desarrollo sin configuración. Tú…",
      ca: "Un nou assistent de codi IA promet 10× velocitat de desenvolupament sense configuració. Tu…",
    },
    health: {
      en: "A new AI clinical decision-support tool just launched in your specialty. You…",
      es: "Una nueva herramienta de apoyo clínico IA acaba de lanzarse en tu especialidad. Tú…",
      ca: "Una nova eina d'IA de suport clínic acaba de llançar-se en la teva especialitat. Tu…",
    },
    edu: {
      en: "A new AI tutoring and curriculum platform just launched for educators. You…",
      es: "Acaba de lanzarse una nueva plataforma de tutoría IA para educadores. Tú…",
      ca: "Acaba de llançar-se una nova plataforma d'IA de tutoria per a educadors. Tu…",
    },
    architecture: {
      en: "A new AI generative design tool just launched for architects and planners. You…",
      es: "Acaba de lanzarse una nueva herramienta de diseño generativo IA para arquitectos. Tú…",
      ca: "Acaba de llançar-se una nova eina de disseny generatiu IA per a arquitectes. Tu…",
    },
    professional: {
      en: "A new AI document analysis and compliance checker just launched in your field. You…",
      es: "Acaba de lanzarse un nuevo analizador IA de documentos y verificador de cumplimiento. Tú…",
      ca: "Acaba de llançar-se un nou analitzador d'IA de documents i verificador de compliment. Tu…",
    },
  },
};

/**
 * Returns industry-personalised question text, or null if no variant exists.
 * Falls back to question.en / .es / .ca in the caller.
 */
export function getQuestionText(questionId, industry, lang) {
  const group = INDUSTRY_GROUP_MAP[industry];
  const ctx   = group && INDUSTRY_CONTEXTS[`q${questionId}`]?.[group];
  if (!ctx) return null;
  return ctx[lang] || ctx.en;
}

// ── Questions ─────────────────────────────────────────────────────────────────
// moralScore: 0 = pure convenience / no consideration of alternatives
//             1 = practical choice, some thought applied
//             2 = conscious choice, environmental/ethical awareness
export const QUESTIONS = [
  {
    id: 1,
    en: "You need a quick image. You…",
    es: "Necesitas una imagen rápida. Tú…",
    ca: "Necessites una imatge ràpida. Tu…",
    options: [
      {
        label: "A",
        en: "Generate it with AI",
        es: "La generas con IA",
        ca: "La generes amb IA",
        energyWh: 10,
        waterMl: 120,
        co2g: 8,
        weight: 1,
        moralScore: 0,
        impactLabel: "High-energy AI generation — no alternatives considered",
      },
      {
        label: "B",
        en: "Search stock photos",
        es: "Buscas fotos de stock",
        ca: "Busques fotos d'estoc",
        energyWh: 0.3,
        waterMl: 2,
        co2g: 0.2,
        weight: 4,
        moralScore: 1,
        impactLabel: "Smart reuse of existing resources",
      },
      {
        label: "C",
        en: "Sketch it yourself",
        es: "Lo dibujas tú mismo",
        ca: "Ho dibuixes tu mateix",
        energyWh: 0,
        waterMl: 0,
        co2g: 0,
        weight: 6,
        moralScore: 2,
        impactLabel: "Zero footprint — human skill over compute",
      },
    ],
  },
  {
    id: 2,
    en: "You have a question. You…",
    es: "Tienes una pregunta. Tú…",
    ca: "Tens una pregunta. Tu…",
    options: [
      {
        label: "A",
        en: "Ask ChatGPT",
        es: "Le preguntas a ChatGPT",
        ca: "Preguntes al ChatGPT",
        energyWh: 0.003,
        waterMl: 15,
        co2g: 1.2,
        weight: 2,
        moralScore: 0,
        impactLabel: "Default reflex — no lighter alternative considered",
      },
      {
        label: "B",
        en: "Google it",
        es: "Lo buscas en Google",
        ca: "Ho busques a Google",
        energyWh: 0.0003,
        waterMl: 1,
        co2g: 0.1,
        weight: 5,
        moralScore: 1,
        impactLabel: "Right tool for the job — ~10× less energy than AI",
      },
      {
        label: "C",
        en: "Ask a colleague",
        es: "Le preguntas a un colega",
        ca: "Preguntes a un company",
        energyWh: 0,
        waterMl: 0,
        co2g: 0,
        weight: 6,
        moralScore: 2,
        impactLabel: "Human-first — zero footprint, builds relationships",
      },
    ],
  },
  {
    id: 3,
    en: "You're writing a report. You…",
    es: "Estás escribiendo un informe. Tú…",
    ca: "Estàs escrivint un informe. Tu…",
    options: [
      {
        label: "A",
        en: "Use AI to write the whole thing",
        es: "Usas IA para escribirlo todo",
        ca: "Uses IA per escriure-ho tot",
        energyWh: 0.01,
        waterMl: 50,
        co2g: 3,
        weight: 1,
        moralScore: 0,
        impactLabel: "Full AI delegation — authorship and energy outsourced",
      },
      {
        label: "B",
        en: "Use AI for outline only",
        es: "Usas IA solo para el esquema",
        ca: "Uses IA només per a l'esquema",
        energyWh: 0.003,
        waterMl: 15,
        co2g: 1,
        weight: 3,
        moralScore: 1,
        impactLabel: "AI as a scaffold — you do the thinking",
      },
      {
        label: "C",
        en: "Write it yourself",
        es: "Lo escribes tú mismo",
        ca: "L'escrius tu mateix",
        energyWh: 0,
        waterMl: 0,
        co2g: 0,
        weight: 6,
        moralScore: 2,
        impactLabel: "Zero footprint — authentic, full-ownership writing",
      },
    ],
  },
  {
    id: 4,
    en: "You need to process 50 assets. You…",
    es: "Necesitas procesar 50 elementos. Tú…",
    ca: "Necessites processar 50 elements. Tu…",
    options: [
      {
        label: "A",
        en: "AI batch-process all of them",
        es: "IA procesa todos en lote",
        ca: "IA processa tots en lot",
        energyWh: 50,
        waterMl: 600,
        co2g: 40,
        weight: 1,
        moralScore: 0,
        impactLabel: "Maximum AI throughput — energy cost not considered",
      },
      {
        label: "B",
        en: "AI handles 5, do the rest manually",
        es: "IA maneja 5, el resto manual",
        ca: "IA gestiona 5, la resta manual",
        energyWh: 5,
        waterMl: 60,
        co2g: 4,
        weight: 3,
        moralScore: 1,
        impactLabel: "Selective use — AI where it genuinely helps",
      },
      {
        label: "C",
        en: "Use a lightweight preset tool",
        es: "Usar una herramienta de presets ligera",
        ca: "Fer servir una eina de presets lleugera",
        energyWh: 0.5,
        waterMl: 3,
        co2g: 0.3,
        weight: 5,
        moralScore: 2,
        impactLabel: "Right tool chosen — efficient, low footprint",
      },
    ],
  },
  {
    id: 5,
    en: "New AI tool drops. You…",
    es: "Sale una nueva herramienta IA. Tú…",
    ca: "Apareix una nova eina d'IA. Tu…",
    options: [
      {
        label: "A",
        en: "Sign up and try everything",
        es: "Te registras y pruebas todo",
        ca: "Et registres i ho proves tot",
        energyWh: 0.05,
        waterMl: 80,
        co2g: 5,
        weight: 1,
        moralScore: 0,
        impactLabel: "FOMO-driven — high use, no evaluation of actual need",
      },
      {
        label: "B",
        en: "Try only what solves a real need",
        es: "Solo pruebas lo que resuelve algo real",
        ca: "Proves només el que resol una necessitat real",
        energyWh: 0.01,
        waterMl: 20,
        co2g: 1.5,
        weight: 4,
        moralScore: 1,
        impactLabel: "Needs-based — intentional, focused adoption",
      },
      {
        label: "C",
        en: "Research the impact before adopting",
        es: "Investigas el impacto antes de adoptarla",
        ca: "Investigues l'impacte abans d'adoptar-la",
        energyWh: 0,
        waterMl: 0,
        co2g: 0,
        weight: 6,
        moralScore: 2,
        impactLabel: "Full ethical consideration before any use",
      },
    ],
  },
];
