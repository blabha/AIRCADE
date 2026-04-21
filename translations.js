/* ═══════════════════════════════════════════
   A(I)RCADE — Translations
   Supported: en | es | ca
═══════════════════════════════════════════ */

let currentLang = 'en';

function t(path) {
  const keys = path.split('.');
  let obj = TRANSLATIONS[currentLang];
  for (const k of keys) {
    if (obj == null) return path;
    obj = obj[k];
  }
  // Fall back to English if key missing in target language
  if (obj == null) {
    obj = TRANSLATIONS['en'];
    for (const k of keys) {
      if (obj == null) return path;
      obj = obj[k];
    }
  }
  return obj ?? path;
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  const sel = document.getElementById('lang-select');
  if (sel) sel.value = lang;
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val && val !== key) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = t(key);
    if (val && val !== key) el.placeholder = val;
  });
  // Update select options
  document.querySelectorAll('[data-i18n-options]').forEach(sel => {
    const prefix = sel.dataset.i18nOptions;
    sel.querySelectorAll('option[data-i18n-opt]').forEach(opt => {
      const key = prefix + '.' + opt.dataset.i18nOpt;
      const val = t(key);
      if (val && val !== key) opt.textContent = val;
    });
  });
}

const TRANSLATIONS = {

/* ─────────────────────────── ENGLISH ─────────────────────────── */
en: {
  ui: {
    insertCoin:     'INSERT COIN TO PLAY',
    tagline:        'Every prompt has a footprint.',
    pressStart:     '▶ PRESS START',
    freePlay:       '☁ FREE PLAY ☁',
    credits:        '© (AI)RCADE 2025',
    howToPlay:      'HOW TO PLAY',
    step1title:     'Tell us about you',
    step1desc:      'Quick optional profile to personalize your experience',
    step2title:     'Pick a task',
    step2desc:      'Choose what you want AI to create',
    step3title:     'Answer 5 ethics questions',
    step3desc:      'Shape your AI profile & watch your Stamina bar',
    step4title:     'See the footprint',
    step4desc:      'Find out water, energy & CO₂ used',
    step5title:     'Go greener!',
    step5desc:      'Get your personalized tips & grab your card',
    letsGo:         "LET'S GO! →",
    welcomeTitle:   'Welcome, Player!',
    welcomeSub:     'Tell us about yourself to personalize your experience',
    nameLabel:      'Your name (optional)',
    namePlaceholder:'Enter your name...',
    ageLabel:          'Your age',
    ageDefault:        'Select age range...',
    expertiseLabel:    'AI Expertise Level',
    expertiseDefault:  'Select expertise level...',
    genderLabel:       'Gender (optional)',
    privacyNote:    '🔒 Your information is used only for this session and is not stored or shared.',
    continueBtn:    'CONTINUE →',
    inputTitle:     'What should AI create for you?',
    inputSub:       'Pick one — your choice affects your AI Stamina!',
    ethicsTitle:    'AI ETHICS CHECK',
    ethicsSub:      'Answer 5 questions. Your choices shape your AI profile!',
    staminaLabel:   'AI STAMINA:',
    staminaScore:   'AI Stamina Score:',
    createBtn:      '🚀 CREATE IT!',
    loadingText:    'Byte is working! ⚡',
    impactTitle:    'WHAT IT COST THE PLANET',
    aiCreated:      'AI CREATED:',
    badgeImage:     '🎨 IMAGE',
    badgeLong:      '📝 LONG TEXT',
    badgeShort:     '✍️ SHORT TEXT',
    waterLabel:     'Water',
    energyLabel:    'Electricity',
    co2Label:       'Pollution',
    dykLabel:       '💡 DID YOU KNOW?',
    greenerBtn:     'HOW CAN I DO BETTER? →',
    greenerTitle:   'GO GREENER! 🌱',
    greenerSub:     "Here's how to get the same stuff using less water & electricity:",
    byteGreen:      "You've got this! Smart choices add up! 🌱",
    printBtn:       '📄 PRINT MY CARD →',
    printTitle:     'YOUR CARD IS READY! 🖨️',
    downloadBtn:    '⬇ DOWNLOAD AS IMAGE',
    downloadDone:   '✅ Downloaded!',
    downloading:    '⏳ Generating...',
    playAgainBtn:   '↩ PLAY AGAIN',
    receiptPlayer:  'PLAYER:',
    receiptCreated: 'YOU CREATED:',
    receiptFootprint:'YOUR FOOTPRINT:',
    receiptTip:     'YOUR SMART TIP:',
    receiptQuote:   '"Every prompt has a footprint. Leave a positive one."',
  },
  ageOpts: {
    under18: 'Under 18', r1825: '18-25', r2635: '26-35',
    r3650: '36-50', r5165: '51-65', r66: '66+'
  },
  genderOpts: {
    prefer: 'Prefer not to say', female: 'Female',
    male: 'Male', nonbinary: 'Non-binary'
  },
  byte: {
    idle:       ["Hi! I'm Byte! ⚡", "Ready to play? 🎮", "Every prompt has a footprint!"],
    generating: ["On it! ⚡", "Almost there... ⚡", "Thinking hard! 🧠", "Using energy right now!"],
    impact:     ["That's what I used! 🌍", "Interesting, right? 🤔", "Knowledge is power! 💡"],
    greener:    ["Smart choices add up! 🌱", "You've got this! ✨", "Is there a smarter way? 🔍"],
    print:      ["Great job today! 👋", "See you next time! 🌱", "Share your card! 📄"]
  },
  personas: {
    'guardian':           { name: 'THE AI GUARDIAN',        tagline: 'Thoughtful, responsible, planet-aware',       description: "You are literally the AI saint we did not know we needed. Privacy protected. Planet considered. Bias challenged. We would put you on a poster — if we could print it without using too much energy." },
    'conscious-creator':  { name: 'THE CONSCIOUS CREATOR',  tagline: 'Creative and growing in awareness',           description: "You are out here composting your prompts. Metaphorically. You think about the planet, you get creative with fewer resources, and you somehow still get things done. Honestly a bit impressive." },
    'fairness-advocate':  { name: 'THE FAIRNESS ADVOCATE',  tagline: 'Champion of equal and fair AI',               description: "You noticed the algorithm has a problem and you are not just shrugging about it. Respect. You are the kind of person who reads the terms of service and actually cares what they say. Rare." },
    'privacy-champion':   { name: 'THE PRIVACY CHAMPION',   tagline: 'Data-savvy and rights-aware',                 description: "You hand out your personal data like it is a limited-edition collector's item — which, honestly, it is. Your info is precious and you treat it that way. Now if only everyone else did too." },
    'pragmatic-explorer': { name: 'THE PRAGMATIC EXPLORER', tagline: 'Practical, curious, finding the way',         description: 'You are the "it depends" person of AI ethics. Sometimes green, sometimes not, always weighing the angles. A perfectly reasonable stance — just a few more green choices and you will be running the ethics committee.' },
    'speed-seeker':       { name: 'THE SPEED SEEKER',       tagline: 'Full throttle and loving it',                 description: "You and AI are basically inseparable — fast, frequent, no questions asked. Totally understandable, honestly. Now that you have seen the receipts though... maybe just one tiny pause before the next prompt? Just one." }
  },
  tips: {
    1:  { title: 'Smart Sharing Saves Energy',        description: 'When AI creates something you like, share it with others instead of having them generate the same thing.',                                              savingsLabel: 'Saves 100% of energy for duplicate requests' },
    2:  { title: 'Try Text Before Pictures',          description: 'Ask AI to describe your idea in words first. If you like it, then make the picture. You might not even need the image!',                              savingsLabel: 'Uses 50× less energy than going straight to images' },
    3:  { title: 'Good Enough is Great',              description: 'When AI gives you something that works, use it! Clicking "try again" over and over uses a lot of extra energy for small improvements.',               savingsLabel: 'Each retry doubles your energy use' },
    4:  { title: 'Be Specific From the Start',        description: "The clearer you are in your first request, the better AI's first answer will be. Add details like size, style, or purpose right away.",               savingsLabel: 'Reduces retries by 60–80%' },
    5:  { title: 'Bundle Your Questions',             description: 'Got several questions? Ask them all together in one conversation instead of starting fresh each time.',                                                savingsLabel: 'Cuts "startup" energy by 70%' },
    6:  { title: "Reuse Yesterday's Answers",         description: "If you asked AI something before, look back at that answer instead of asking again. Save your AI conversations!",                                     savingsLabel: 'Reusing costs almost zero energy' },
    7:  { title: 'Use AI at Night',                   description: 'When possible, use AI in the evening or on weekends. The electricity grid uses more wind and solar power during these times.',                        savingsLabel: 'Reduces carbon by 20–50%' },
    8:  { title: 'Check If It Already Exists',        description: 'Before asking AI to create something (especially images), do a quick search online. It might already exist!',                                         savingsLabel: 'Finding existing content uses 95% less energy' },
    9:  { title: 'Start Small, Add More Later',       description: "Ask for a short answer first. If you need more details, you can always ask AI to expand. Don't start with \"tell me everything!\"",                  savingsLabel: 'Short responses use 60% less energy' },
    10: { title: 'Make One, Edit Many',               description: 'If you need similar things (like birthday cards for different people), create one with AI and then edit the details yourself for the others.',        savingsLabel: 'Saves 80% compared to generating each separately' },
    11: { title: 'Your Brain Can Do Simple Stuff',    description: "Save AI for things that are actually hard! Simple math, spelling checks, or basic lists don't need AI — you've got this.",                           savingsLabel: 'Reserves AI energy for tasks that truly need it' },
    12: { title: 'Keep Your Data Private',            description: "Before sharing personal info with AI, ask yourself: does it really need to know this? Less data shared = more privacy protected.",                    savingsLabel: 'Protects your personal information' },
    13: { title: 'Double-Check Important Stuff',      description: "AI is smart but not perfect. For health, safety, or important decisions, always verify with real experts or trusted sources.",                        savingsLabel: 'Prevents mistakes and keeps you safe' },
    14: { title: "Learn, Don't Just Copy",            description: "When AI helps with homework or learning, use it to understand the topic better — not just to copy answers. You'll remember it longer!",              savingsLabel: 'Real learning stays with you' },
    15: { title: "Give Credit Where It's Due",        description: 'If AI helped you create something, be honest about it! Saying "I made this with AI" shows integrity.',                                               savingsLabel: 'Builds trust and transparency' },
    16: { title: "Respect Artists' Styles",           description: "When using AI to create art, avoid copying specific artists' unique styles. Instead, describe what you want in general terms.",                      savingsLabel: 'Supports creative communities' },
    17: { title: 'Write Like You, Not a Robot',       description: 'If AI writes something for you, rewrite it in your own voice. People want to hear from you, not a computer!',                                       savingsLabel: 'Keeps your authentic voice' },
    18: { title: "Protect Others' Privacy Too",       description: "Before sharing your contacts, photos with others in them, or any info about friends with AI — remember, that's their privacy too.",                  savingsLabel: "Respects friends' and family's information" },
    19: { title: 'Think Before You Share AI Content', description: 'AI can make realistic fake images and videos. Always make it clear when something is AI-generated to avoid spreading confusion.',                    savingsLabel: 'Prevents misinformation' },
    20: { title: 'Choose Your AI Tools Wisely',       description: "If you use AI regularly for sensitive stuff, consider paying for a version that respects your privacy. Free isn't always best.",                     savingsLabel: 'Better privacy protection for your data' },
    21: { title: 'Help Others Learn About AI',        description: 'Share what you learned today! Help friends and family understand how to use AI responsibly and sustainably.',                                         savingsLabel: 'Multiplies positive impact across your community' }
  },
  dyk: {
    1:  "Making a picture with AI uses 50 times more electricity than writing words because the computer has to think about millions of tiny details — every color, shadow, and shape!",
    2:  "AI data centers use water to keep their computers cool. Creating one image can use as much water as flushing a toilet! That's why choosing text first can make a big difference.",
    3:  "Searching for an existing photo online uses 100 times less energy than making a new image with AI. A quick Google Images search can save a ton of resources!",
    4:  "Smart move: Ask AI to describe your image idea first. If you like the description, then make the picture. Many times, the words are all you need!",
    5:  "Writing is the lightest thing AI can do! The computer reads your question, finds patterns in language, and writes back super fast without using much energy at all.",
    6:  "You chose wisely! Text uses about as much energy as turning on a light bulb for a few seconds, while pictures are more like running a microwave.",
    7:  "When AI writes longer things — like detailed ideas or stories — it has to think harder and check more options. That takes a bit more juice, but it's still way easier than making pictures!",
    8:  "Here's a tip: If your friend needs the same thing, share what AI just made for you! Sharing costs zero energy, while generating it twice doubles the impact.",
    9:  "Every time you use AI, it's like taking a car trip. Reusing yesterday's answer is like carpooling — way better than everyone driving separately!",
    10: "The more specific you are in your first request, the better AI's first answer will be. Being clear saves you from clicking 'try again' over and over — and that saves energy!",
    11: "AI runs in huge buildings called data centers that are the size of football fields! They need tons of electricity and water to work, so every smart choice you make really adds up.",
    12: "Using AI at night or on weekends can be greener! That's when the electricity grid uses more wind and solar power instead of coal and gas.",
    13: "Perfectionism costs the planet! Each time you click 'try again,' AI uses all that energy over from scratch. 'Good enough' is actually great for the environment.",
    14: "Your brain is amazing and uses way less energy than AI! For simple stuff like basic math or short lists, you can do it yourself and save all that electricity.",
    15: "Got several questions? Ask them all together! It's like taking one bus trip instead of five separate taxi rides — way more efficient.",
    16: "Protecting your privacy also helps the planet! When you share less personal data, AI companies store and process less information, which saves energy.",
    17: "When you use AI to learn instead of just copy, you remember things better AND you won't need AI to help you next time. That's better for you and the planet!",
    18: "AI makes mistakes sometimes! A quick Google search to double-check uses way less energy than asking AI multiple times to get it right.",
    19: "Adding your own words to what AI creates makes it better AND uses less energy! AI does the heavy lifting, you add the personal touch. Perfect teamwork!",
    20: "You're one of millions using AI every day! If everyone made just one smarter choice, we'd save enough energy to power thousands of homes. Your choices really matter!",
    21: "Scientists are working hard to make AI use less energy! Your smart choices today help the planet while we wait for even greener AI technology tomorrow."
  },
},

/* ─────────────────────────── ESPAÑOL ─────────────────────────── */
es: {
  ui: {
    insertCoin:     'INSERTA UNA MONEDA PARA JUGAR',
    tagline:        'Cada prompt deja huella.',
    pressStart:     '▶ PULSA START',
    freePlay:       '☁ JUEGO LIBRE ☁',
    credits:        '© (AI)RCADE 2025',
    howToPlay:      'CÓMO JUGAR',
    step1title:     'Cuéntanos sobre ti',
    step1desc:      'Perfil rápido y opcional para personalizar tu experiencia',
    step2title:     'Elige una tarea',
    step2desc:      'Escoge qué quieres que cree la IA',
    step3title:     'Responde 5 preguntas de ética',
    step3desc:      'Define tu perfil de IA y observa tu barra de Energía',
    step4title:     'Ve la huella ambiental',
    step4desc:      'Descubre el agua, la energía y el CO₂ utilizados',
    step5title:     '¡Hazlo más verde!',
    step5desc:      'Obtén tus consejos personalizados y descarga tu tarjeta',
    letsGo:         '¡VAMOS! →',
    welcomeTitle:   '¡Bienvenido/a, Jugador/a!',
    welcomeSub:     'Cuéntanos sobre ti para personalizar tu experiencia',
    nameLabel:      'Tu nombre (opcional)',
    namePlaceholder:'Escribe tu nombre...',
    ageLabel:          'Tu edad',
    ageDefault:        'Selecciona tu rango de edad...',
    expertiseLabel:    'Nivel de experiencia con IA',
    expertiseDefault:  'Selecciona tu nivel...',
    genderLabel:       'Género (opcional)',
    privacyNote:    '🔒 Tu información solo se usa en esta sesión y no se guarda ni comparte.',
    continueBtn:    'CONTINUAR →',
    inputTitle:     '¿Qué debería crear la IA para ti?',
    inputSub:       '¡Elige una opción — tu elección afecta tu Energía de IA!',
    ethicsTitle:    'CONTROL DE ÉTICA DE IA',
    ethicsSub:      '¡Responde 5 preguntas. Tus respuestas definen tu perfil de IA!',
    staminaLabel:   'ENERGÍA DE IA:',
    staminaScore:   'Puntuación de Energía de IA:',
    createBtn:      '🚀 ¡CREAR!',
    loadingText:    '¡Byte está trabajando! ⚡',
    impactTitle:    'LO QUE LE COSTÓ AL PLANETA',
    aiCreated:      'LA IA CREÓ:',
    badgeImage:     '🎨 IMAGEN',
    badgeLong:      '📝 TEXTO LARGO',
    badgeShort:     '✍️ TEXTO CORTO',
    waterLabel:     'Agua',
    energyLabel:    'Electricidad',
    co2Label:       'Contaminación',
    dykLabel:       '💡 ¿SABÍAS QUE?',
    greenerBtn:     '¿CÓMO PUEDO HACERLO MEJOR? →',
    greenerTitle:   '¡HAZLO MÁS VERDE! 🌱',
    greenerSub:     'Así puedes conseguir lo mismo usando menos agua y electricidad:',
    byteGreen:      '¡Tú puedes! Las decisiones inteligentes suman. 🌱',
    printBtn:       '📄 IMPRIMIR MI TARJETA →',
    printTitle:     '¡TU TARJETA ESTÁ LISTA! 🖨️',
    downloadBtn:    '⬇ DESCARGAR COMO IMAGEN',
    downloadDone:   '✅ ¡Descargado!',
    downloading:    '⏳ Generando...',
    playAgainBtn:   '↩ JUGAR DE NUEVO',
    receiptPlayer:  'JUGADOR/A:',
    receiptCreated: 'HAS CREADO:',
    receiptFootprint:'TU HUELLA AMBIENTAL:',
    receiptTip:     'TU CONSEJO INTELIGENTE:',
    receiptQuote:   '"Cada prompt deja huella. Deja una positiva."',
  },
  ageOpts: {
    under18: 'Menos de 18', r1825: '18-25', r2635: '26-35',
    r3650: '36-50', r5165: '51-65', r66: '66+'
  },
  genderOpts: {
    prefer: 'Prefiero no decirlo', female: 'Mujer',
    male: 'Hombre', nonbinary: 'No binario/a'
  },
  byte: {
    idle:       ["¡Hola! Soy Byte! ⚡", "¿Listo/a para jugar? 🎮", "¡Cada prompt deja huella!"],
    generating: ["¡En ello! ⚡", "Casi listo... ⚡", "¡Pensando fuerte! 🧠", "¡Usando energía ahora mismo!"],
    impact:     ["¡Esto es lo que usé! 🌍", "Interesante, ¿verdad? 🤔", "¡El saber es poder! 💡"],
    greener:    ["¡Las decisiones inteligentes suman! 🌱", "¡Tú puedes! ✨", "¿Hay una forma más inteligente? 🔍"],
    print:      ["¡Gran trabajo hoy! 👋", "¡Hasta la próxima! 🌱", "¡Comparte tu tarjeta! 📄"]
  },
  personas: {
    'guardian':           { name: 'EL/LA GUARDIÁN/A DE LA IA',   tagline: 'Reflexivo/a, responsable, consciente del planeta', description: "Eres literalmente el santo/la santa de la IA que no sabíamos que necesitábamos. Privacidad protegida. Planeta considerado. Sesgos cuestionados. Te pondríamos en un póster — si pudiéramos imprimirlo sin usar demasiada energía." },
    'conscious-creator':  { name: 'EL/LA CREADOR/A CONSCIENTE',  tagline: 'Creativo/a y cada vez más concienciado/a',          description: "Aquí estás, haciendo compostaje de tus prompts. Metafóricamente. Piensas en el planeta, eres creativo/a con menos recursos y, aun así, sacas las cosas adelante. Honestamente, bastante impresionante." },
    'fairness-advocate':  { name: 'EL/LA DEFENSOR/A DE LA EQUIDAD', tagline: 'Campeón/a de una IA justa e igualitaria',      description: "Te diste cuenta de que el algoritmo tiene un problema y no te quedaste de brazos cruzados. Respeto. Eres de las personas que lee los términos de servicio y realmente le importa lo que dicen. Raro/a." },
    'privacy-champion':   { name: 'EL/LA CAMPEÓN/A DE LA PRIVACIDAD', tagline: 'Experto/a en datos y consciente de tus derechos', description: "Entregas tus datos personales como si fueran una edición limitada de coleccionista — que, seamos honestos, lo son. Tu información es valiosa y la tratas como tal. Ojalá todos hicieran lo mismo." },
    'pragmatic-explorer': { name: 'EL/LA EXPLORADOR/A PRAGMÁTICO/A', tagline: 'Práctico/a, curioso/a, buscando el camino',     description: "Eres la persona del 'depende' en ética de IA. A veces verde, a veces no, siempre sopesando los ángulos. Una postura totalmente razonable — con unas pocas decisiones más verdes, podrías dirigir el comité de ética." },
    'speed-seeker':       { name: 'EL/LA BUSCADOR/A DE VELOCIDAD', tagline: 'A todo gas y disfrutándolo',                      description: "Tú y la IA sois prácticamente inseparables — rápido/a, frecuente, sin preguntas. Totalmente comprensible, la verdad. Pero ahora que has visto las facturas... ¿quizás una pequeña pausa antes del próximo prompt? Solo una." }
  },
  tips: {
    1:  { title: 'Compartir es ahorrar energía',          description: 'Cuando la IA crea algo que te gusta, compártelo con otros en vez de que cada uno lo genere por separado.',                                           savingsLabel: 'Ahorra el 100% de energía en duplicados' },
    2:  { title: 'Prueba el texto antes que las imágenes', description: 'Pide a la IA que describa tu idea con palabras primero. Si te gusta, entonces crea la imagen. ¡Puede que ni la necesites!',                      savingsLabel: 'Usa 50× menos energía que ir directo a imágenes' },
    3:  { title: 'Suficientemente bueno es genial',        description: 'Cuando la IA te da algo que funciona, ¡úsalo! Hacer clic en "intentar de nuevo" una y otra vez gasta mucha energía extra para mejoras pequeñas.', savingsLabel: 'Cada reintento dobla tu gasto energético' },
    4:  { title: 'Sé específico/a desde el principio',     description: 'Cuanto más claro/a seas en tu primera petición, mejor será la primera respuesta de la IA. Añade detalles como tamaño, estilo o propósito desde el principio.', savingsLabel: 'Reduce los reintentos un 60–80%' },
    5:  { title: 'Agrupa tus preguntas',                   description: '¿Tienes varias preguntas? ¡Hazlas todas juntas en una sola conversación en vez de empezar de cero cada vez!',                                       savingsLabel: 'Reduce la energía de "inicio" un 70%' },
    6:  { title: 'Reutiliza las respuestas anteriores',    description: 'Si ya le preguntaste algo a la IA antes, revisa esa respuesta en vez de preguntar de nuevo. ¡Guarda tus conversaciones con la IA!',              savingsLabel: 'Reutilizar cuesta casi cero energía' },
    7:  { title: 'Usa la IA de noche',                     description: 'Si puedes, usa la IA por las noches o los fines de semana. La red eléctrica usa más energía eólica y solar en esos momentos.',                   savingsLabel: 'Reduce el carbono un 20–50%' },
    8:  { title: 'Comprueba si ya existe',                 description: 'Antes de pedir a la IA que cree algo (especialmente imágenes), haz una búsqueda rápida en internet. ¡Puede que ya exista!',                      savingsLabel: 'Encontrar contenido existente usa un 95% menos de energía' },
    9:  { title: 'Empieza pequeño, amplía después',        description: 'Pide primero una respuesta corta. Si necesitas más detalles, siempre puedes pedir a la IA que amplíe. ¡No empieces con "cuéntame todo"!',        savingsLabel: 'Las respuestas cortas usan un 60% menos de energía' },
    10: { title: 'Crea uno, edita muchos',                  description: 'Si necesitas cosas similares (como tarjetas de cumpleaños para diferentes personas), crea una con IA y luego edita los detalles tú mismo/a.', savingsLabel: 'Ahorra un 80% respecto a generarlos por separado' },
    11: { title: 'Tu cerebro puede hacer cosas sencillas', description: '¡Reserva la IA para lo que realmente es difícil! Para matemáticas simples, revisar la ortografía o listas básicas, no necesitas IA.',            savingsLabel: 'Reserva la energía de la IA para tareas que la necesitan de verdad' },
    12: { title: 'Mantén tus datos privados',              description: 'Antes de compartir información personal con la IA, pregúntate: ¿realmente necesita saber esto? Menos datos compartidos = más privacidad.',         savingsLabel: 'Protege tu información personal' },
    13: { title: 'Verifica lo importante',                  description: 'La IA es inteligente pero no perfecta. Para decisiones de salud, seguridad o importancia, verifica siempre con expertos reales.',               savingsLabel: 'Evita errores y te mantiene seguro/a' },
    14: { title: 'Aprende, no solo copies',                 description: 'Cuando la IA te ayuda con los deberes o el aprendizaje, úsala para entender mejor el tema, no solo para copiar respuestas. ¡Lo recordarás más!', savingsLabel: 'El aprendizaje real se queda contigo' },
    15: { title: 'Da crédito donde corresponde',            description: '¡Si la IA te ayudó a crear algo, sé honesto/a al respecto! Decir "lo hice con IA" demuestra integridad.',                                        savingsLabel: 'Genera confianza y transparencia' },
    16: { title: 'Respeta los estilos de los artistas',     description: 'Al usar la IA para crear arte, evita copiar los estilos únicos de artistas específicos. Describe lo que quieres en términos generales.',         savingsLabel: 'Apoya a las comunidades creativas' },
    17: { title: 'Escribe como tú, no como un robot',       description: 'Si la IA escribe algo por ti, reescríbelo con tu propia voz. ¡La gente quiere escucharte a ti, no a una máquina!',                              savingsLabel: 'Mantiene tu voz auténtica' },
    18: { title: 'Protege también la privacidad de otros',  description: 'Antes de compartir tus contactos, fotos con otras personas o información sobre amigos con la IA, recuerda: esa también es su privacidad.',        savingsLabel: 'Respeta la información de amigos y familia' },
    19: { title: 'Piensa antes de compartir contenido de IA', description: 'La IA puede crear imágenes y vídeos falsos muy realistas. Indica siempre cuando algo está generado por IA para evitar confusiones.',           savingsLabel: 'Previene la desinformación' },
    20: { title: 'Elige bien tus herramientas de IA',        description: 'Si usas la IA regularmente para cosas sensibles, considera pagar por una versión que respete tu privacidad. Lo gratuito no siempre es lo mejor.', savingsLabel: 'Mejor protección de tus datos' },
    21: { title: 'Ayuda a otros a aprender sobre IA',        description: '¡Comparte lo que has aprendido hoy! Ayuda a amigos y familia a entender cómo usar la IA de forma responsable y sostenible.',                    savingsLabel: 'Multiplica el impacto positivo en tu comunidad' }
  },
  dyk: {
    1:  "¡Hacer una imagen con IA usa 50 veces más electricidad que escribir palabras! El ordenador tiene que pensar en millones de detalles: cada color, sombra y forma.",
    2:  "Los centros de datos de IA usan agua para enfriar sus ordenadores. ¡Crear una imagen puede usar tanta agua como tirar de la cadena! Por eso, elegir texto primero marca la diferencia.",
    3:  "Buscar una foto ya existente en internet usa 100 veces menos energía que crear una nueva imagen con IA. ¡Una búsqueda rápida en Google Imágenes puede ahorrar muchos recursos!",
    4:  "Jugada inteligente: pide a la IA que describa tu idea con palabras primero. Si te gusta la descripción, entonces crea la imagen. ¡Muchas veces las palabras son todo lo que necesitas!",
    5:  "¡Escribir es lo más ligero que puede hacer la IA! El ordenador lee tu pregunta, encuentra patrones en el lenguaje y te responde muy rápido sin usar apenas energía.",
    6:  "¡Elegiste bien! El texto usa aproximadamente la misma energía que encender una bombilla unos segundos, mientras que las imágenes son más como poner el microondas.",
    7:  "Cuando la IA escribe cosas largas — como ideas detalladas o historias — tiene que pensar más y comprobar más opciones. Gasta un poco más, ¡pero sigue siendo mucho más fácil que hacer imágenes!",
    8:  "Un consejo: si tu amigo/a necesita lo mismo, ¡comparte lo que la IA acaba de crear para ti! Compartir no cuesta energía, pero generarlo dos veces duplica el impacto.",
    9:  "Cada vez que usas la IA, es como hacer un viaje en coche. Reutilizar la respuesta de ayer es como compartir coche — ¡mucho mejor que ir cada uno por separado!",
    10: "Cuanto más específico/a seas en tu primera petición, mejor será la primera respuesta de la IA. Ser claro/a te evita hacer clic en 'reintentar' una y otra vez, ¡y eso ahorra energía!",
    11: "¡La IA funciona en enormes edificios llamados centros de datos que son del tamaño de campos de fútbol! Necesitan toneladas de electricidad y agua, por lo que cada decisión inteligente cuenta.",
    12: "¡Usar la IA de noche o los fines de semana puede ser más ecológico! Es cuando la red eléctrica usa más energía eólica y solar en lugar de carbón y gas.",
    13: "¡El perfeccionismo le cuesta al planeta! Cada vez que haces clic en 'reintentar', la IA usa toda esa energía de nuevo desde cero. 'Suficientemente bueno' es genial para el medioambiente.",
    14: "¡Tu cerebro es increíble y usa mucha menos energía que la IA! Para cosas sencillas como matemáticas básicas o listas cortas, puedes hacerlo tú mismo/a y ahorrar electricidad.",
    15: "¿Tienes varias preguntas? ¡Hazlas todas juntas! Es como coger un autobús en lugar de cinco taxis distintos — mucho más eficiente.",
    16: "¡Proteger tu privacidad también ayuda al planeta! Cuando compartes menos datos personales, las empresas de IA almacenan y procesan menos información, lo que ahorra energía.",
    17: "Cuando usas la IA para aprender en lugar de solo copiar, recuerdas las cosas mejor Y no necesitarás la IA para ayudarte la próxima vez. ¡Eso es mejor para ti y el planeta!",
    18: "¡La IA comete errores a veces! Una búsqueda rápida en Google para verificar usa mucha menos energía que preguntarle a la IA varias veces para que acierte.",
    19: "¡Añadir tus propias palabras a lo que crea la IA lo mejora Y usa menos energía! La IA hace el trabajo pesado, tú añades el toque personal. ¡Trabajo en equipo perfecto!",
    20: "¡Eres uno/a de los millones que usa la IA cada día! Si todos tomáramos solo una decisión más inteligente, ahorraríamos suficiente energía para alimentar miles de hogares. ¡Tus elecciones importan!",
    21: "¡Los científicos trabajan duro para que la IA use menos energía! Tus decisiones inteligentes de hoy ayudan al planeta mientras esperamos una tecnología de IA aún más verde."
  },
},

/* ─────────────────────────── CATALÀ ─────────────────────────── */
ca: {
  ui: {
    insertCoin:     'INSEREIX UNA MONEDA PER JUGAR',
    tagline:        'Cada prompt deixa petjada.',
    pressStart:     '▶ PREM START',
    freePlay:       '☁ JOC LLIURE ☁',
    credits:        '© (AI)RCADE 2025',
    howToPlay:      'COM ES JUGA',
    step1title:     "Explica'ns qui ets",
    step1desc:      'Perfil ràpid i opcional per personalitzar la teva experiència',
    step2title:     'Tria una tasca',
    step2desc:      "Escull què vols que creï la IA",
    step3title:     "Respon 5 preguntes d'ètica",
    step3desc:      "Defineix el teu perfil de IA i observa la barra d'Energia",
    step4title:     'Veu la petjada ambiental',
    step4desc:      "Descobreix l'aigua, l'energia i el CO₂ utilitzats",
    step5title:     'Fes-ho més verd!',
    step5desc:      'Obtén els teus consells personalitzats i descarrega la teva targeta',
    letsGo:         "ANEM! →",
    welcomeTitle:   'Benvingut/da, Jugador/a!',
    welcomeSub:     'Explica\'ns sobre tu per personalitzar la teva experiència',
    nameLabel:      'El teu nom (opcional)',
    namePlaceholder:'Escriu el teu nom...',
    ageLabel:          'La teva edat',
    ageDefault:        "Selecciona el teu rang d'edat...",
    expertiseLabel:    'Nivell d\'experiència amb IA',
    expertiseDefault:  'Selecciona el teu nivell...',
    genderLabel:       'Gènere (opcional)',
    privacyNote:    "🔒 La teva informació només s'utilitza durant aquesta sessió i no es guarda ni es comparteix.",
    continueBtn:    'CONTINUAR →',
    inputTitle:     'Què hauria de crear la IA per a tu?',
    inputSub:       "Tria una opció — la teva elecció afecta la teva Energia de IA!",
    ethicsTitle:    "CONTROL D'ÈTICA DE IA",
    ethicsSub:      "Respon 5 preguntes. Les teves respostes defineixen el teu perfil de IA!",
    staminaLabel:   'ENERGIA DE IA:',
    staminaScore:   "Puntuació d'Energia de IA:",
    createBtn:      '🚀 CREAR!',
    loadingText:    'El Byte està treballant! ⚡',
    impactTitle:    'EL QUE LI HA COSTAT AL PLANETA',
    aiCreated:      'LA IA HA CREAT:',
    badgeImage:     '🎨 IMATGE',
    badgeLong:      '📝 TEXT LLARG',
    badgeShort:     '✍️ TEXT CURT',
    waterLabel:     'Aigua',
    energyLabel:    'Electricitat',
    co2Label:       'Contaminació',
    dykLabel:       '💡 SABIES QUE?',
    greenerBtn:     'COM HO PUC FER MILLOR? →',
    greenerTitle:   'FES-HO MÉS VERD! 🌱',
    greenerSub:     "Així pots aconseguir el mateix usant menys aigua i electricitat:",
    byteGreen:      'Tu pots! Les decisions intel·ligents sumen. 🌱',
    printBtn:       '📄 IMPRIMEIX LA MEVA TARGETA →',
    printTitle:     'LA TEVA TARGETA ÉS A PUNT! 🖨️',
    downloadBtn:    '⬇ DESCARREGAR COM A IMATGE',
    downloadDone:   '✅ Descarregat!',
    downloading:    '⏳ Generant...',
    playAgainBtn:   '↩ JUGAR DE NOU',
    receiptPlayer:  'JUGADOR/A:',
    receiptCreated: 'HAS CREAT:',
    receiptFootprint:'LA TEVA PETJADA AMBIENTAL:',
    receiptTip:     'EL TEU CONSELL INTEL·LIGENT:',
    receiptQuote:   '"Cada prompt deixa petjada. Deixa\'n una de positiva."',
  },
  ageOpts: {
    under18: 'Menys de 18', r1825: '18-25', r2635: '26-35',
    r3650: '36-50', r5165: '51-65', r66: '66+'
  },
  genderOpts: {
    prefer: 'Prefereixo no dir-ho', female: 'Dona',
    male: 'Home', nonbinary: 'No binari/ària'
  },
  byte: {
    idle:       ["Hola! Soc el Byte! ⚡", "Llest/a per jugar? 🎮", "Cada prompt deixa petjada!"],
    generating: ["Hi estic! ⚡", "Gairebé llest... ⚡", "Pensant fort! 🧠", "Usant energia ara mateix!"],
    impact:     ["Això és el que vaig usar! 🌍", "Interessant, oi? 🤔", "El saber és poder! 💡"],
    greener:    ["Les decisions intel·ligents sumen! 🌱", "Tu pots! ✨", "Hi ha una manera més intel·ligent? 🔍"],
    print:      ["Bon treball avui! 👋", "Fins aviat! 🌱", "Comparteix la teva targeta! 📄"]
  },
  personas: {
    'guardian':           { name: 'EL/LA GUARDIÀ/ANA DE LA IA',    tagline: 'Reflexiu/iva, responsable, conscient del planeta', description: "Ets literalment el sant/la santa de la IA que no sabíem que necessitàvem. Privacitat protegida. Planeta considerat. Biaixos qüestionats. Et posaríem en un pòster — si poguéssim imprimir-lo sense usar massa energia." },
    'conscious-creator':  { name: 'EL/LA CREADOR/A CONSCIENT',     tagline: 'Creatiu/iva i cada cop més conscienciat/ada',       description: "Aquí estàs, fent compostatge dels teus prompts. Metafòricament. Penses en el planeta, ets creatiu/iva amb menys recursos i, tot i així, fas les coses. Honestament, bastant impressionant." },
    'fairness-advocate':  { name: 'EL/LA DEFENSOR/A DE L\'EQUITAT', tagline: 'Campió/a d\'una IA justa i igualitària',           description: "Has vist que l'algorisme té un problema i no t'has quedat quiet/a. Respecte. Ets de les persones que llegeix els termes de servei i realment li importa el que diuen. Rar/a." },
    'privacy-champion':   { name: 'EL/LA CAMPIÓ/ONA DE LA PRIVACITAT', tagline: 'Expert/a en dades i conscient dels teus drets',  description: "Reparteixes les teves dades personals com si fossin una edició limitada de col·leccionista — que, siguem honestos/es, ho són. La teva informació és valuosa i la tractes com a tal. Tant de bo tothom fes el mateix." },
    'pragmatic-explorer': { name: 'EL/LA EXPLORADOR/A PRAGMÀTIC/A', tagline: 'Pràctic/a, curiós/a, buscant el camí',             description: "Ets la persona del 'depèn' en l'ètica de la IA. De vegades verd/a, de vegades no, sempre sopesant els angles. Una postura totalment raonable — amb unes quantes decisions més verdes, podries dirigir el comitè d'ètica." },
    'speed-seeker':       { name: 'EL/LA BUSCADOR/A DE VELOCITAT',  tagline: 'A tota velocitat i gaudint-ne',                    description: "Tu i la IA sou pràcticament inseparables — ràpid/a, freqüent, sense preguntes. Totalment comprensible, la veritat. Però ara que has vist les factures... potser una petita pausa abans del proper prompt? Només una." }
  },
  tips: {
    1:  { title: 'Compartir és estalviar energia',          description: "Quan la IA crea alguna cosa que t'agrada, comparteix-la amb els altres en lloc que cadascú ho generi per separat.",                                        savingsLabel: "Estalvia el 100% d'energia en duplicats" },
    2:  { title: 'Prova el text abans que les imatges',     description: "Demana a la IA que descrigui la teva idea amb paraules primer. Si t'agrada, llavors crea la imatge. Potser ni la necessites!",                           savingsLabel: "Usa 50× menys energia que anar directament a imatges" },
    3:  { title: 'Prou bé és genial',                       description: 'Quan la IA et dona alguna cosa que funciona, utilitza-la! Fer clic a "torna-ho a intentar" una i altra vegada gasta molta energia extra per millores petites.', savingsLabel: "Cada reintent dobla el teu consum energètic" },
    4:  { title: 'Sigues específic/a des del principi',     description: "Com més clar/a siguis en la teva primera petició, millor serà la primera resposta de la IA. Afegeix detalls com la mida, l'estil o el propòsit des del principi.", savingsLabel: "Redueix els reintents un 60–80%" },
    5:  { title: 'Agrupa les teves preguntes',              description: "Tens diverses preguntes? Fes-les totes juntes en una sola conversa en lloc de començar de zero cada vegada!",                                              savingsLabel: 'Redueix l\'energia d\'inici un 70%' },
    6:  { title: 'Reutilitza les respostes anteriors',      description: "Si ja has preguntat alguna cosa a la IA abans, revisa aquella resposta en lloc de preguntar de nou. Guarda les teves converses amb la IA!",               savingsLabel: 'Reutilitzar costa gairebé zero energia' },
    7:  { title: 'Usa la IA de nit',                        description: "Si pots, usa la IA pels vespres o els caps de setmana. La xarxa elèctrica fa servir més energia eòlica i solar en aquests moments.",                       savingsLabel: 'Redueix el carboni un 20–50%' },
    8:  { title: 'Comprova si ja existeix',                 description: "Abans de demanar a la IA que creï alguna cosa (especialment imatges), fes una cerca ràpida a internet. Potser ja existeix!",                              savingsLabel: "Trobar contingut existent usa un 95% menys d'energia" },
    9:  { title: 'Comença petit, amplia després',           description: 'Demana primer una resposta curta. Si necessites més detalls, sempre pots demanar a la IA que ampliï. No comencis amb "explica-m\'ho tot"!',              savingsLabel: "Les respostes curtes usen un 60% menys d'energia" },
    10: { title: 'Crea un, edita molts',                    description: "Si necessites coses similars (com targetes d'aniversari per a persones diferents), crea'n una amb la IA i edita els detalls tu mateix/a per als altres.", savingsLabel: 'Estalvia un 80% respecte a generar-los per separat' },
    11: { title: 'El teu cervell pot fer coses senzilles',  description: "Reserva la IA per al que és realment difícil! Per a matemàtiques simples, revisar l'ortografia o llistes bàsiques, no necessites IA.",                   savingsLabel: "Reserva l'energia de la IA per a tasques que la necessiten de debò" },
    12: { title: 'Mantén les teves dades privades',         description: "Abans de compartir informació personal amb la IA, pregunta't: realment necessita saber-ho? Menys dades compartides = més privacitat.",                    savingsLabel: 'Protegeix la teva informació personal' },
    13: { title: 'Verifica el que és important',            description: "La IA és intel·ligent però no perfecta. Per a decisions de salut, seguretat o importància, verifica sempre amb experts reals.",                           savingsLabel: 'Evita errors i et manté segur/a' },
    14: { title: "Aprèn, no només copiïs",                  description: "Quan la IA t'ajuda amb els deures o l'aprenentatge, utilitza-la per entendre millor el tema, no només per copiar respostes. Ho recordaràs més temps!",    savingsLabel: "L'aprenentatge real es queda amb tu" },
    15: { title: 'Dona crèdit on correspon',                description: 'Si la IA t\'ha ajudat a crear alguna cosa, sigues honest/a! Dir "ho he fet amb la IA" demostra integritat.',                                             savingsLabel: 'Genera confiança i transparència' },
    16: { title: "Respecta els estils dels artistes",       description: "Quan uses la IA per crear art, evita copiar els estils únics d'artistes específics. Descriu el que vols en termes generals.",                            savingsLabel: 'Dóna suport a les comunitats creatives' },
    17: { title: 'Escriu com tu, no com un robot',          description: "Si la IA escriu alguna cosa per a tu, reescriu-ho amb la teva pròpia veu. La gent vol escoltar-te a tu, no a una màquina!",                              savingsLabel: 'Manté la teva veu autèntica' },
    18: { title: "Protegeix també la privacitat dels altres", description: "Abans de compartir els teus contactes, fotos amb altres persones o informació sobre amics amb la IA, recorda: aquella és la seva privacitat.",           savingsLabel: "Respecta la informació d'amics i família" },
    19: { title: 'Pensa abans de compartir contingut de IA', description: "La IA pot crear imatges i vídeos falsos molt realistes. Indica sempre quan alguna cosa ha estat generada per IA per evitar confusions.",                  savingsLabel: 'Prevé la desinformació' },
    20: { title: 'Tria bé les teves eines de IA',           description: "Si uses la IA regularment per a coses sensibles, considera pagar per una versió que respecti la teva privacitat. El gratuït no sempre és el millor.",    savingsLabel: 'Millor protecció de les teves dades' },
    21: { title: 'Ajuda els altres a aprendre sobre IA',    description: "Comparteix el que has après avui! Ajuda amics i família a entendre com usar la IA de manera responsable i sostenible.",                                  savingsLabel: 'Multiplica l\'impacte positiu a la teva comunitat' }
  },
  dyk: {
    1:  "Fer una imatge amb IA usa 50 vegades més electricitat que escriure paraules! L'ordinador ha de pensar en milions de detalls: cada color, ombra i forma.",
    2:  "Els centres de dades de IA utilitzen aigua per refredar els seus ordinadors. Crear una imatge pot usar tanta aigua com tirar de la cadena! Per això, triar text primer marca la diferència.",
    3:  "Cercar una foto ja existent a internet usa 100 vegades menys energia que crear una nova imatge amb IA. Una cerca ràpida a Google Imatges pot estalviar molts recursos!",
    4:  "Jugada intel·ligent: demana a la IA que descrigui la teva idea amb paraules primer. Si t'agrada la descripció, llavors crea la imatge. Moltes vegades les paraules són tot el que necessites!",
    5:  "Escriure és el més lleuger que pot fer la IA! L'ordinador llegeix la teva pregunta, troba patrons en el llenguatge i et respon molt ràpid sense usar gairebé energia.",
    6:  "Vas triar bé! El text usa aproximadament la mateixa energia que encendre una bombeta uns segons, mentre que les imatges s'assemblen més a posar el microones.",
    7:  "Quan la IA escriu coses llargues — com idees detallades o històries — ha de pensar més i comprovar més opcions. Gasta una mica més, però és molt més fàcil que fer imatges!",
    8:  "Un consell: si el teu amic/a necessita el mateix, comparteix el que la IA acaba de crear per a tu! Compartir no costa energia, però generar-ho dues vegades duplica l'impacte.",
    9:  "Cada vegada que uses la IA, és com fer un viatge en cotxe. Reutilitzar la resposta d'ahir és com compartir cotxe — molt millor que anar cadascú per separat!",
    10: "Com més específic/a siguis en la teva primera petició, millor serà la primera resposta de la IA. Ser clar/a t'evita fer clic a 'torna-ho a intentar' una i altra vegada, i això estalvia energia!",
    11: "La IA funciona en enormes edificis anomenats centres de dades que són de la mida de camps de futbol! Necessiten tones d'electricitat i aigua, de manera que cada decisió intel·ligent compta.",
    12: "Usar la IA de nit o els caps de setmana pot ser més ecològic! És quan la xarxa elèctrica utilitza més energia eòlica i solar en lloc de carbó i gas.",
    13: "El perfeccionisme li costa al planeta! Cada vegada que fas clic a 'torna-ho a intentar', la IA usa tota aquella energia de nou des de zero. 'Prou bé' és genial per al medi ambient.",
    14: "El teu cervell és increïble i usa molt menys energia que la IA! Per a coses senzilles com matemàtiques bàsiques o llistes curtes, pots fer-ho tu mateix/a i estalviar electricitat.",
    15: "Tens diverses preguntes? Fes-les totes juntes! És com agafar un autobús en lloc de cinc taxis separats — molt més eficient.",
    16: "Protegir la teva privacitat també ajuda el planeta! Quan comparteixes menys dades personals, les empreses de IA emmagatzemen i processen menys informació, la qual cosa estalvia energia.",
    17: "Quan uses la IA per aprendre en lloc de només copiar, recordes les coses millor I no necessitaràs la IA per ajudar-te el proper cop. Això és millor per a tu i el planeta!",
    18: "La IA de vegades comet errors! Una cerca ràpida a Google per verificar usa molt menys energia que preguntar a la IA diverses vegades perquè encertin.",
    19: "Afegir les teves pròpies paraules al que crea la IA ho millora I usa menys energia! La IA fa la feina pesada, tu afegeixes el toc personal. Treball en equip perfecte!",
    20: "Ets un/a dels milions que usa la IA cada dia! Si tothom prengués només una decisió més intel·ligent, estalviaríem prou energia per alimentar milers de llars. Les teves eleccions importen!",
    21: "Els científics treballen molt per fer que la IA usi menys energia! Les teves decisions intel·ligents d'avui ajuden el planeta mentre esperem una tecnologia de IA encara més verda."
  },
}

}; // end TRANSLATIONS
