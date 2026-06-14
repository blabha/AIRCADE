/* ═══════════════════════════════════════════
   A(I)RCADE — Data Module
   Environmental metrics, tips, facts, questions
═══════════════════════════════════════════ */

// ── Resource Bar Thresholds (4-tier, from questions-database.json metadata) ───
const RESOURCE_THRESHOLDS = {
  energy: { green: 15, yellow: 50, orange: 120 },  // Wh
  water:  { green: 75, yellow: 300, orange: 800 }, // ml
  co2:    { green: 5,  yellow: 20,  orange: 60  }  // g
};

// Labels matching each tier
const RESOURCE_LABELS = {
  green:  'Light footprint',
  yellow: 'Notable usage',
  orange: 'Heavy usage',
  red:    'Very heavy usage'
};

// Max display scale for bar fill %
const RESOURCE_MAX_DISPLAY = { energy: 250, water: 1500, co2: 75 };

// Reference comparisons for post-quiz summary
const REFERENCE_COMPARISONS = {
  energy: [
    { value: 5,    comparison: 'charging your phone once' },
    { value: 15,   comparison: 'charging your phone 3 times' },
    { value: 30,   comparison: 'running a laptop for an hour' },
    { value: 100,  comparison: 'running a TV for an hour' },
    { value: 1000, comparison: 'running a fridge for a day' }
  ],
  water: [
    { value: 10,   comparison: 'a small sip' },
    { value: 250,  comparison: 'one glass of water' },
    { value: 500,  comparison: 'a water bottle' },
    { value: 1500, comparison: 'filling a kettle' }
  ],
  co2: [
    { value: 1,    comparison: 'one human breath' },
    { value: 5,    comparison: 'charging your phone' },
    { value: 150,  comparison: 'driving 1 km' },
    { value: 1000, comparison: 'a short domestic flight' }
  ]
};

function getResourceComparison(key, value) {
  const refs = REFERENCE_COMPARISONS[key];
  let best = null;
  for (const ref of refs) {
    if (value >= ref.value) best = ref;
  }
  return best ? 'like ' + best.comparison : 'less than a phone charge';
}

function getResourceColorLabel(key, value) {
  const t = RESOURCE_THRESHOLDS[key];
  if (value > t.orange) return { color: 'red',    label: RESOURCE_LABELS.red    };
  if (value > t.yellow) return { color: 'orange', label: RESOURCE_LABELS.orange };
  if (value > t.green)  return { color: 'yellow', label: RESOURCE_LABELS.yellow };
  return                       { color: 'green',  label: RESOURCE_LABELS.green  };
}

function getResourceLevel(resources) {
  const e = getResourceColorLabel('energy', resources.energy).color;
  const w = getResourceColorLabel('water',  resources.water).color;
  const c = getResourceColorLabel('co2',    resources.co2).color;
  const rank = { green: 0, yellow: 1, orange: 2, red: 3 };
  const worst = Math.max(rank[e], rank[w], rank[c]);
  if (worst >= 2) return 'low';
  if (worst >= 1) return 'medium';
  return 'high';
}

// Age group mapping
function ageToGroup(userAge) {
  const map = {
    'Under 18': 'under_18', '18-25': '18-25', '26-35': '26-35',
    '36-50': '36-50', '51-65': '51-65', '66+': '66+'
  };
  return map[userAge] || null;
}

// ── Environmental Metrics ────────────────────
// Sources: Ren et al. 2024, Luccioni et al. 2022, Strubell et al. 2019

const METRICS = {
  image: {
    water: 0.5,   // liters
    energy: 35,   // Wh
    co2: 15       // grams
  },
  'text-short': {
    water: 0.01,
    energy: 2,
    co2: 0.8
  },
  'text-long': {
    water: 0.05,
    energy: 8,
    co2: 3.5
  }
};

// ── Meter fill percentages (relative to image = worst case = 100%) ────
const METER_PERCENTS = {
  image:        { water: 95, energy: 95, co2: 95 },
  'text-short': { water: 12, energy: 18, co2: 15 },
  'text-long':  { water: 28, energy: 40, co2: 35 }
};

// ── Comparison functions ─────────────────────

function getWaterComparison(liters) {
  const glasses = liters / 0.25;
  const kettles = liters / 1.5;

  if (liters < 0.05) {
    return `About ${(liters * 1000).toFixed(0)} ml — barely a sip!`;
  } else if (liters < 0.3) {
    return `About ${glasses.toFixed(1)} glass${glasses < 1.5 ? '' : 'es'} of water`;
  } else {
    return `About ${glasses.toFixed(0)} glasses (${kettles.toFixed(1)} kettles)`;
  }
}

function getEnergyComparison(wh) {
  if (wh < 3) {
    return `Less than charging your phone (${Math.round(wh / 0.015)}% of a charge)`;
  } else if (wh < 12) {
    return `Like running a phone for ~${Math.round(wh * 4)} minutes`;
  } else if (wh < 40) {
    return `Like ${(wh / 15).toFixed(1)} phone charges`;
  } else {
    return `Like ${(wh / 50).toFixed(1)} hours of laptop use`;
  }
}

function getCo2Comparison(grams) {
  const meters = Math.round(grams * 6.5);
  const breaths = (grams / 0.8).toFixed(1);

  if (grams < 1) {
    return `About ${breaths} breath${breaths < 1.5 ? '' : 's'} worth`;
  } else if (grams < 5) {
    return `Like driving ${meters} meters (${breaths} breaths)`;
  } else {
    return `Like driving ${(meters / 1000).toFixed(2)} km by car`;
  }
}

// ── "Did You Know?" facts ────────────────────

// ── Did You Know? Facts (from did-you-know-database.json) ────────────

const DYK_FACTS = {
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
};

function selectDidYouKnow(taskType, resources, ethicsAnswers) {
  const greenCats = ethicsAnswers.filter(a => a.color === 'green').map(a => a.category);
  const redCount  = ethicsAnswers.filter(a => a.color === 'red').length;

  let pool;
  if (greenCats.includes('privacy'))
    pool = [16, 12, 20];
  else if (greenCats.includes('environmental'))
    pool = [20, 12, 21];
  else if (greenCats.includes('critical_thinking'))
    pool = [17, 14, 18];
  else if (greenCats.includes('social_ethics') || greenCats.includes('everyday_use'))
    pool = [19, 8, 15];
  else if (redCount >= 3)
    pool = [13, 9, 10];
  else {
    const level = getResourceLevel(resources);  // 'high'=low impact, 'medium', 'low'=high impact
    const matrix = {
      image:        { high: [1, 4, 20],  medium: [1, 3, 11],  low: [2, 3, 13]  },
      'text-short': { high: [6, 12, 20], medium: [5, 8, 15],  low: [5, 9, 14]  },
      'text-long':  { high: [7, 12, 21], medium: [7, 10, 15], low: [7, 9, 13]  }
    };
    pool = (matrix[taskType] || matrix['text-short'])[level];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Question Database (60 questions, age-filtered, from questions-database.json) ──

const QUESTIONS_DB = [
  { id:1, category:'everyday_use', ageGroup:'under_18',
    question:'Geography test tomorrow. Study your notes for 2 hours, or let AI quiz you for 30 minutes?',
    A: { text:'AI quiz — it targets what I don\'t know', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:2, why:'Efficient learning but builds AI dependency. The 8 Wh is like half a phone charge.' },
    B: { text:'Study my notes — writing things out helps me remember', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero energy. Handwriting aids memory, but if your notes have gaps, you\'ll study the wrong things.' },
    C: { text:'Get AI to make a cheat sheet, then memorize it', energy_wh:4, water_ml:20, co2_g:1.2, mindfulness:1, why:'Quick and light, but memorizing a summary isn\'t understanding the material.' },
  },
  { id:2, category:'everyday_use', ageGroup:'under_18',
    question:'Your club needs a logo. A friend can draw one in a week. AI makes one in 10 seconds. What do you pick?',
    A: { text:'Let my friend draw it — it\'ll actually mean something', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Zero resources and supports your friend. But the club launch gets delayed.' },
    B: { text:'AI draft now, friend refines it later', energy_wh:35, water_ml:220, co2_g:11, mindfulness:2, why:'Image generation = one hour of TV energy. Saves time but might sideline your friend.' },
    C: { text:'AI — we need it now, we can always change it later', energy_wh:35, water_ml:220, co2_g:11, mindfulness:1, why:'Same energy as B, but \'change it later\' rarely happens.' },
  },
  { id:3, category:'everyday_use', ageGroup:'18-25',
    question:'Applying to 30 jobs. One strong cover letter tweaked manually, or AI-custom letters for each?',
    A: { text:'One letter, manually tweaked each time', energy_wh:3, water_ml:15, co2_g:1, mindfulness:2, why:'Low energy, but a generic letter might get filtered out instantly.' },
    B: { text:'AI-custom for each — personalization gets more callbacks', energy_wh:60, water_ml:300, co2_g:18, mindfulness:1, why:'30 generations = charging your laptop twice. Better results, bigger footprint.' },
    C: { text:'AI makes 5 templates by industry, I adapt from there', energy_wh:12, water_ml:60, co2_g:4, mindfulness:3, why:'Smart middle ground. You stay involved with a fraction of the energy.' },
  },
  { id:4, category:'everyday_use', ageGroup:'18-25',
    question:'You\'re terrible at cooking. AI can guide you step-by-step. Your mom offered to teach you this weekend. Pick one.',
    A: { text:'AI — I can learn anytime without bothering anyone', energy_wh:15, water_ml:75, co2_g:5, mindfulness:1, why:'Convenient but you miss the instinct only a person can teach.' },
    B: { text:'Mom — real technique beats text instructions', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero energy, irreplaceable knowledge. But you\'re limited to her schedule.' },
    C: { text:'Mom this weekend, AI on weeknights when I\'m alone', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Best of both. Moderate energy, but you might default to AI over time.' },
  },
  { id:5, category:'everyday_use', ageGroup:'26-35',
    question:'Tight deadline. AI writes a decent report draft in 5 minutes. Doing it yourself takes 3 hours. Client meeting is tomorrow.',
    A: { text:'AI draft, then 1 hour of my own editing', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Pragmatic. But rushed review might miss AI errors.' },
    B: { text:'Write it myself — I\'ll own every word in that meeting', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero AI. Full command, but exhaustion affects your presentation.' },
    C: { text:'AI draft, send as-is — nobody reads reports that carefully', energy_wh:6, water_ml:30, co2_g:2, mindfulness:1, why:'Least effort. But if the client asks about a detail AI made up, you\'re exposed.' },
  },
  { id:6, category:'everyday_use', ageGroup:'26-35',
    question:'Remote team across 3 time zones. AI can translate messages live, but some team members feel uncomfortable being monitored.',
    A: { text:'Use it — better communication outweighs the discomfort', energy_wh:12, water_ml:60, co2_g:4, mindfulness:1, why:'Ongoing processing of all messages. Solves one problem, creates a trust issue.' },
    B: { text:'AI for official docs only, not casual chat', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'Respects boundaries with moderate energy. Casual miscommunications persist though.' },
    C: { text:'Skip AI, hire a part-time human translator', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero AI energy. Builds trust but costs real money.' },
  },
  { id:7, category:'everyday_use', ageGroup:'36-50',
    question:'Your 12-year-old wants an AI tutor app. Grades are slipping, but you\'re unsure about data privacy.',
    A: { text:'Allow it after researching the app\'s data practices', energy_wh:10, water_ml:50, co2_g:3, mindfulness:3, why:'Regular AI sessions add up. Helps grades, but a company now has your child\'s learning data.' },
    B: { text:'Hire a human tutor instead', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero energy. Real mentorship, but the budget might not last.' },
    C: { text:'Help them myself — we\'ll spend time together', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero resources, great bonding. But if you struggle with the material, you might teach wrong.' },
  },
  { id:8, category:'everyday_use', ageGroup:'36-50',
    question:'Renovating your kitchen. AI generates photorealistic mockups. A designer charges €200 for the same with real expertise.',
    A: { text:'AI — generate 20 options and narrow it down', energy_wh:250, water_ml:1500, co2_g:75, mindfulness:1, why:'20 images = running your fridge for 6 hours. You\'ll know what you want, but at a cost.' },
    B: { text:'Designer — they know what works structurally', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero AI. Expert guidance, but fewer options and €200 upfront.' },
    C: { text:'3 AI mockups to find my style, then bring those to the designer', energy_wh:45, water_ml:280, co2_g:14, mindfulness:3, why:'Combo approach. 3 images = 3 phone charges. You get exploration AND expertise.' },
  },
  { id:9, category:'everyday_use', ageGroup:'51-65',
    question:'You\'re too emotional to write a eulogy for a close friend. AI could help structure your thoughts. But this is deeply personal.',
    A: { text:'Share my memories with AI, let it organize them', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'Helps when grief clouds your thinking. But your most intimate words sit on a server.' },
    B: { text:'Write it myself, however messy — raw emotion is honest', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero energy. Authentic, but grief might make you forget things you wanted to say.' },
    C: { text:'Ask a mutual friend to help me write it together', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Zero resources. Shared grief is healing, but coordinating adds stress.' },
  },
  { id:10, category:'everyday_use', ageGroup:'51-65',
    question:'Diagnosed with a rare condition. Your doctor explained it, but you want to understand more. AI answers instantly. Medical journals are hard to read.',
    A: { text:'AI explains it simply, I bring questions to my doctor', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'AI as a bridge to better doctor conversations. But AI sometimes gets conditions wrong.' },
    B: { text:'Read patient forums — real people with the same condition', energy_wh:0.5, water_ml:3, co2_g:0.1, mindfulness:2, why:'Minimal energy, real experience. But forums mix good advice with dangerous info.' },
    C: { text:'Have AI summarize 10 medical papers on my condition', energy_wh:25, water_ml:125, co2_g:8, mindfulness:1, why:'Heavy processing. Thorough, but AI may misread the medical nuances that matter for you.' },
  },
  { id:11, category:'everyday_use', ageGroup:'66+',
    question:'Your bank replaced humans with an AI phone system. It keeps misunderstanding your accent. You need to dispute a charge.',
    A: { text:'Keep trying — I\'ll avoid the 45-min wait for a human', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:1, why:'Extended AI voice processing. Saves time IF it works. Each failed attempt wastes energy.' },
    B: { text:'Go to the physical branch — I want a real person', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero AI energy. Problem solved, but costs you half a day.' },
    C: { text:'Ask a family member to call — they\'re better with these systems', energy_wh:3, water_ml:15, co2_g:1, mindfulness:2, why:'Practical. But you\'re losing the ability to manage your own finances.' },
  },
  { id:12, category:'everyday_use', ageGroup:'66+',
    question:'You live alone and feel lonely evenings. An AI chatbot is always available. Your neighbor also wants to chat more.',
    A: { text:'AI companion — it\'s always there, no need to bother anyone', energy_wh:15, water_ml:75, co2_g:5, mindfulness:1, why:'Daily AI chats add up. Eases loneliness tonight, may reduce real connection motivation.' },
    B: { text:'Knock on my neighbor\'s door', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero energy, genuine connection. But they might be busy.' },
    C: { text:'Both — AI when it\'s late, neighbor during the day', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Balanced approach. But AI might gradually replace the effort of real friendships.' },
  },
  { id:13, category:'privacy', ageGroup:'under_18',
    question:'A homework app gives better answers if you share your browser history. Your grades need help.',
    A: { text:'Allow it — my history is mostly YouTube and school stuff', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:1, why:'Continuous processing of your browsing. Harmless now, but it builds a profile that follows you.' },
    B: { text:'Use the app without browser access', energy_wh:3, water_ml:15, co2_g:1, mindfulness:2, why:'Less exposure. Decent help without giving away your digital habits.' },
    C: { text:'Create a separate browser just for schoolwork, share only that', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'Clever workaround. Personalization without exposing your real life.' },
  },
  { id:14, category:'privacy', ageGroup:'under_18',
    question:'Your friend group uses an AI that reads all your messages to suggest activities. You\'re the only one bothered by this.',
    A: { text:'Go along with it — I don\'t want to be difficult', energy_wh:10, water_ml:50, co2_g:3, mindfulness:1, why:'Your entire friend group\'s conversations become training data.' },
    B: { text:'Leave and create a separate chat without the AI', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Protects privacy but risks social isolation. Being \'the privacy person\' is lonely at 15.' },
    C: { text:'Speak up — maybe others feel the same but haven\'t said it', energy_wh:10, water_ml:50, co2_g:3, mindfulness:3, why:'Takes courage. Even if they agree, actually changing behavior is harder.' },
  },
  { id:15, category:'privacy', ageGroup:'18-25',
    question:'Dream job interview. AI can scrape the interviewer\'s social media to prep personalized talking points. Thorough prep, or digital stalking?',
    A: { text:'Do it — they posted publicly, fair game', energy_wh:12, water_ml:60, co2_g:4, mindfulness:1, why:'If they find out you AI-analyzed their socials, the good impression reverses.' },
    B: { text:'Just read their LinkedIn myself — that\'s normal research', energy_wh:0.5, water_ml:3, co2_g:0.1, mindfulness:2, why:'Normal professional behavior. Less prep but no ethical grey area.' },
    C: { text:'AI suggests questions based on the company, not the person', energy_wh:4, water_ml:20, co2_g:1.2, mindfulness:3, why:'Clear ethical line. You show interest in the role without personal surveillance.' },
  },
  { id:16, category:'privacy', ageGroup:'18-25',
    question:'A dating app analyzes ALL your messages to find better matches. Better love life, but every flirty or awkward text gets processed.',
    A: { text:'Allow it — dating is hard, this could find someone real', energy_wh:20, water_ml:100, co2_g:7, mindfulness:1, why:'Your most personal messages become training data. You might find love though.' },
    B: { text:'Hard no — my private conversations aren\'t data points', energy_wh:1, water_ml:5, co2_g:0.3, mindfulness:2, why:'Maximum privacy, but worse matches on a platform built around this feature.' },
    C: { text:'Start fresh — don\'t import old chats, let it learn from new ones only', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Controlled exposure. Smart boundary, but your new chats gradually build the same profile.' },
  },
  { id:17, category:'privacy', ageGroup:'26-35',
    question:'Your company offers \'productivity AI\' that monitors your screen all day. Top scorers get bonuses. Bottom scorers get reviewed.',
    A: { text:'Opt in — I work hard and want the bonus', energy_wh:25, water_ml:125, co2_g:8, mindfulness:1, why:'Every bathroom break and slow afternoon is now data.' },
    B: { text:'Push back with coworkers — this is surveillance', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Zero processing. Protects everyone\'s dignity, but risks political capital.' },
    C: { text:'Opt in but learn to game the metrics', energy_wh:25, water_ml:125, co2_g:8, mindfulness:1, why:'Same energy, feeding a broken system that wastes resources measuring performance theater.' },
  },
  { id:18, category:'privacy', ageGroup:'26-35',
    question:'Client wants you to use their AI invoicing tool. It scans your work folder — including other clients\' files.',
    A: { text:'Create a separate folder with only their files', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'Smart isolation. You need to maintain this discipline for every future client.' },
    B: { text:'Decline — 10 extra minutes of manual invoicing per month', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Protects all clients. But this client might see you as outdated.' },
    C: { text:'Use it — the AI probably only reads file names, not content', energy_wh:10, water_ml:50, co2_g:3, mindfulness:1, why:'\'Probably\' is doing a lot of work. Your other clients didn\'t consent to this.' },
  },
  { id:19, category:'privacy', ageGroup:'36-50',
    question:'School wants to opt your child into AI \'wellness monitoring\' that reads their writing for signs of distress. It caught a real crisis last year.',
    A: { text:'Opt in — if it catches my child in crisis, it\'s worth it', energy_wh:15, water_ml:75, co2_g:5, mindfulness:2, why:'Might save a life. But your child\'s emotional world becomes algorithmic data.' },
    B: { text:'Opt out — I know my child, they can talk to me', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero processing. Trusts human relationships. But kids don\'t always tell parents.' },
    C: { text:'Ask exactly what\'s monitored and who sees the data first', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Informed consent. The school may not have clear answers themselves.' },
  },
  { id:20, category:'privacy', ageGroup:'36-50',
    question:'Your spouse uses an AI financial advisor with access to your joint accounts. Good results. But you never agreed to share your data.',
    A: { text:'Ask them to disconnect it — joint finances need joint consent', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Clear principle. But it might start a conflict, and the advice was helping.' },
    B: { text:'Review the privacy policy together and agree on boundaries', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'Diplomatic. But privacy policies are designed to be hard to understand.' },
    C: { text:'Let it continue — gains outweigh abstract privacy concerns', energy_wh:10, water_ml:50, co2_g:3, mindfulness:1, why:'Practical, but one breach exposes your entire financial life.' },
  },
  { id:21, category:'privacy', ageGroup:'51-65',
    question:'Your doctor now uses AI to transcribe appointments. Data goes to a company\'s servers for 30 days. Doctor says it helps them focus on you.',
    A: { text:'Accept — my doctor\'s full attention matters more', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:2, why:'Better care today. But your health conversations travel through commercial servers.' },
    B: { text:'Opt out — I\'ll accept slower hand-written notes', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Medical conversations stay in the room. But appointment quality may drop.' },
    C: { text:'Accept but ask them to skip certain sensitive topics', energy_wh:6, water_ml:30, co2_g:2, mindfulness:3, why:'Compromise. But self-censoring with your doctor defeats the purpose of the visit.' },
  },
  { id:22, category:'privacy', ageGroup:'51-65',
    question:'Selling your old laptop. You deleted files but AI assistants may have cached personal data locally. Buyer asks if it\'s wiped.',
    A: { text:'Full factory reset — better safe than sorry', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Takes an hour but ensures nothing personal remains.' },
    B: { text:'Delete the AI apps and clear the browser', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'AI tools often store data in hidden folders uninstalling doesn\'t touch.' },
    C: { text:'I deleted my files — AI stuff is all in the cloud anyway', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Wrong. Many AI tools cache locally. Your personal info could be recoverable.' },
  },
  { id:23, category:'privacy', ageGroup:'66+',
    question:'Pharmacy offers AI medication reminders that track your pills, side effects, and auto-reorder. Just needs your full health profile.',
    A: { text:'Sign up — forgetting meds is a real risk at my age', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'Genuine safety benefit. But your complete health profile is now commercial data.' },
    B: { text:'Simple alarm app — reminds me without knowing what I take', energy_wh:0.1, water_ml:0.5, co2_g:0.05, mindfulness:3, why:'Does the core job without sharing health data. No side-effect tracking though.' },
    C: { text:'My family checks in daily — they can help track it', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Real human care. But it puts responsibility on them and reduces your independence.' },
  },
  { id:24, category:'privacy', ageGroup:'66+',
    question:'Company offers AI cameras in your home to detect falls and auto-call help. Your kids love the idea. You feel watched.',
    A: { text:'Accept — a fall when living alone could be fatal', energy_wh:20, water_ml:100, co2_g:7, mindfulness:2, why:'Potentially life-saving. But every moment at home is analyzed by AI.' },
    B: { text:'Wearable fall detector instead — works without cameras', energy_wh:2, water_ml:10, co2_g:0.5, mindfulness:3, why:'Same safety goal, much less intrusion. But you have to wear it.' },
    C: { text:'Decline all monitoring — I value my dignity', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Full autonomy. But falls are a leading cause of serious injury for older adults.' },
  },
  { id:25, category:'environmental', ageGroup:'under_18',
    question:'Need a background image for a school presentation. Stock photo, draw it yourself, or AI-generate the perfect one?',
    A: { text:'AI — it\'ll match my topic exactly', energy_wh:35, water_ml:220, co2_g:11, mindfulness:1, why:'One image = 2 phone charges. Looks great, but it\'s just a background.' },
    B: { text:'Stock photo — millions already exist', energy_wh:0.3, water_ml:2, co2_g:0.1, mindfulness:2, why:'Near-zero energy. Good enough for a background.' },
    C: { text:'Draw it — shows original effort', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Zero energy, maximum character. Quality depends on your skills though.' },
  },
  { id:26, category:'environmental', ageGroup:'under_18',
    question:'Arguing with friends about whether a movie is good. Someone wants to ask AI for \'an objective analysis.\' Is AI the right tool?',
    A: { text:'Sure — AI can judge filmmaking quality without hype bias', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:1, why:'Real processing power for a matter of taste. AI can\'t have genuine opinions on art.' },
    B: { text:'No — the argument IS the fun part, don\'t settle it with a machine', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Zero energy. The debate is more valuable than resolving it.' },
    C: { text:'Read actual critic reviews instead', energy_wh:0.3, water_ml:2, co2_g:0.1, mindfulness:2, why:'Human perspectives from people who watched the movie. Minimal energy.' },
  },
  { id:27, category:'environmental', ageGroup:'18-25',
    question:'You run a small shop. AI product descriptions get 15% more clicks than your templates. You have 200 products.',
    A: { text:'AI-generate all 200 — 15% more clicks means real income', energy_wh:50, water_ml:250, co2_g:16, mindfulness:1, why:'Like running your laptop for 2 hours. But 15% more revenue funds your livelihood.' },
    B: { text:'Templates — the click boost won\'t last as people spot AI text', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Zero energy. Authentic voice builds loyalty. But you\'re gambling against data.' },
    C: { text:'AI for top 50 products, templates for the rest', energy_wh:15, water_ml:75, co2_g:5, mindfulness:3, why:'Focus resources where revenue is highest. Smart prioritization.' },
  },
  { id:28, category:'environmental', ageGroup:'18-25',
    question:'2 AM, can\'t sleep. You\'ve been chatting with AI about life for 2 hours. Each message reprocesses the entire conversation.',
    A: { text:'It helps me process my thoughts — worth the energy', energy_wh:30, water_ml:150, co2_g:10, mindfulness:2, why:'Real benefit for wellbeing. But the energy stacks with every message.' },
    B: { text:'I should journal instead — pen and paper, zero electricity', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Evidence-based for anxiety. But at 2 AM the blank page feels harder than a chatbot.' },
    C: { text:'Set a 20-minute limit — enough to unload without a marathon', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Discipline meets need. Cutting off mid-thought isn\'t always realistic though.' },
  },
  { id:29, category:'environmental', ageGroup:'26-35',
    question:'Startup needs branding: logo, colors, fonts. Designer quotes €3,000. AI can do it in an afternoon.',
    A: { text:'AI — €3,000 funds 2 months of operations instead', energy_wh:120, water_ml:750, co2_g:38, mindfulness:1, why:'Real savings, but your brand may look like every other AI startup.' },
    B: { text:'Designer — brand identity is worth investing in early', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Unique result. But €3,000 is real money for a startup.' },
    C: { text:'AI to explore 50 directions, then hire a designer to execute the best one', energy_wh:80, water_ml:500, co2_g:25, mindfulness:2, why:'Heavy exploration plus designer cost. Speeds creativity but doubles the spending.' },
  },
  { id:30, category:'environmental', ageGroup:'26-35',
    question:'Your company sends AI-generated summary emails to 500 employees daily. Someone asks: is this necessary?',
    A: { text:'Yes — saves 30 min per person daily, that\'s 250 hours collective', energy_wh:2500, water_ml:12500, co2_g:750, mindfulness:1, why:'Energy of running 2 homes for a day. Every day. Genuine time savings though.' },
    B: { text:'Switch to weekly digests — most changes don\'t need daily attention', energy_wh:360, water_ml:1800, co2_g:108, mindfulness:3, why:'85% energy reduction. Forces better prioritization.' },
    C: { text:'Make it opt-in, not default', energy_wh:500, water_ml:2500, co2_g:150, mindfulness:2, why:'Probably 80% reduction. Respects choice, but people might miss important updates.' },
  },
  { id:31, category:'environmental', ageGroup:'36-50',
    question:'You coach your kid\'s recreational soccer team. AI can analyze game footage for tactical insights. The kids are 10.',
    A: { text:'Analyze it — even kids benefit from tactics', energy_wh:80, water_ml:500, co2_g:25, mindfulness:1, why:'Video analysis is energy-heavy. Professional tools for a rec league. The kids just want fun.' },
    B: { text:'Skip it — at this age, fun matters more than tactics', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Zero energy. Let kids be kids.' },
    C: { text:'Just record highlights for parents — no AI needed', energy_wh:0.5, water_ml:3, co2_g:0.1, mindfulness:2, why:'Parents love it, kids love it, almost no energy.' },
  },
  { id:32, category:'environmental', ageGroup:'36-50',
    question:'You spent a week using AI heavily to research solar panels for your house. The AI research itself used significant energy. Worth it?',
    A: { text:'Yes — 20 years of solar savings dwarfs one week of AI use', energy_wh:40, water_ml:200, co2_g:13, mindfulness:2, why:'Mathematically correct. The long-term offset is huge.' },
    B: { text:'I could\'ve used solar companies\' free calculators instead', energy_wh:2, water_ml:10, co2_g:0.5, mindfulness:3, why:'Existing tools built for this purpose. Less customized but way less energy.' },
    C: { text:'Any AI use for green decisions justifies itself', energy_wh:40, water_ml:200, co2_g:13, mindfulness:1, why:'Sounds right but could justify unlimited AI for any \'green\' purpose.' },
  },
  { id:33, category:'environmental', ageGroup:'51-65',
    question:'You\'re retired and blog about gardening. AI writes faster, but writing is your hobby.',
    A: { text:'Write it myself — retirement is for doing things I enjoy', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'The process IS the reward. Your authentic voice is what readers connect with.' },
    B: { text:'AI for SEO and formatting, I write the actual content', energy_wh:3, water_ml:15, co2_g:1, mindfulness:2, why:'Light AI for the boring parts. Your voice stays, posts get found.' },
    C: { text:'AI drafts posts when I\'m tired — keeps the blog active', energy_wh:10, water_ml:50, co2_g:3, mindfulness:1, why:'Your readers subscribed for YOUR perspective, not AI\'s.' },
  },
  { id:34, category:'environmental', ageGroup:'51-65',
    question:'Energy company offers AI smart-home optimization: 15% savings on bills. But the AI runs on cloud servers 24/7.',
    A: { text:'Sign up — 15% home savings far exceeds the cloud cost', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'Net positive for the planet. But dependent on their servers and data collection.' },
    B: { text:'Program a thermostat schedule myself — gets 10% without cloud', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Nearly as effective, zero data concerns. Adjust it seasonally yourself.' },
    C: { text:'Better insulation and efficient appliances matter more than software', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Hardware fixes are permanent. But they require upfront investment.' },
  },
  { id:35, category:'environmental', ageGroup:'66+',
    question:'Grandkids want AI face filters on your weekly video call. It makes them laugh. It also uses a lot of processing power.',
    A: { text:'Sure — making my grandkids laugh is worth it once a week', energy_wh:25, water_ml:125, co2_g:8, mindfulness:2, why:'Video processing is heavy. But connection with grandkids is priceless and weekly is bounded.' },
    B: { text:'Simple built-in filters — almost as fun, way less energy', energy_wh:2, water_ml:10, co2_g:0.5, mindfulness:3, why:'Kids might not notice the difference. The fun is being together.' },
    C: { text:'No filters — seeing real faces is what matters', energy_wh:0.5, water_ml:3, co2_g:0.1, mindfulness:1, why:'Genuine. But kids might find plain calls less exciting over time.' },
  },
  { id:36, category:'environmental', ageGroup:'66+',
    question:'Library replaced the storytelling librarian with AI-generated personalized stories due to budget cuts. AI or nothing.',
    A: { text:'AI story time — better than no story time at all', energy_wh:15, water_ml:75, co2_g:5, mindfulness:2, why:'Keeps kids coming to the library. But replaces a community role with a machine.' },
    B: { text:'Organize volunteers to tell stories instead', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Builds community. Beautiful but volunteer programs are hard to sustain.' },
    C: { text:'Fundraise to keep the librarian — some things shouldn\'t be automated', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Preserves the human role. May not succeed, leaving kids with nothing.' },
  },
  { id:37, category:'critical_thinking', ageGroup:'under_18',
    question:'AI helped you prep debate arguments on climate change. Opponent asks: \'Where\'d you get that?\' You say \'I researched it.\' True?',
    A: { text:'Yes — AI summarized research, that counts as researching', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Technically defensible. But you can\'t defend the arguments under pressure.' },
    B: { text:'No — I should say AI helped, even if it feels embarrassing', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Honest. Might weaken your position if others view AI as less credible.' },
    C: { text:'Doesn\'t matter — what matters is whether the arguments are correct', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Logical. But \'correct\' is exactly what you can\'t verify without the original sources.' },
  },
  { id:38, category:'critical_thinking', ageGroup:'under_18',
    question:'AI wrote you an A+ essay. But in class discussion about the same book, you can\'t contribute. What\'s the lesson?',
    A: { text:'Use AI to understand the book first, then write myself', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'AI as learning aid. Uses some energy but builds real understanding.' },
    B: { text:'The grade matters for my future — I\'ll catch up later', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'This pattern creates a growing gap between grades and actual knowledge.' },
    C: { text:'The grading system isn\'t designed for AI yet — it\'s a system problem', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Valid critique. But doesn\'t solve YOUR learning gap right now.' },
  },
  { id:39, category:'critical_thinking', ageGroup:'18-25',
    question:'Your university allows AI with disclosure. Nobody actually discloses. You used AI for your thesis. Do you disclose?',
    A: { text:'Yes — I\'d rather be honest whatever the judgment', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Integrity. But being the only one who discloses feels like self-sabotage.' },
    B: { text:'No — I shouldn\'t disadvantage myself when nobody else does', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Game theory logic. Individually rational, collectively degrades everyone\'s degree.' },
    C: { text:'Raise it anonymously with the department — the policy needs enforcement', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Systemic fix. Most responsible, but institutional change is slow.' },
  },
  { id:40, category:'critical_thinking', ageGroup:'18-25',
    question:'You fact-check AI with Google. Top 5 results agree with it. But all 5 might be AI-generated content themselves.',
    A: { text:'5 sources agree — probably correct regardless of who wrote them', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'AI-generated pages can all trace to the same flawed training data.' },
    B: { text:'Find a pre-AI source: textbook, government database, peer-reviewed paper', energy_wh:0.5, water_ml:3, co2_g:0.1, mindfulness:3, why:'Harder to find but much more reliable.' },
    C: { text:'Ask an expert in person — the internet is becoming unreliable', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Gold standard, but access to experts is a privilege.' },
  },
  { id:41, category:'critical_thinking', ageGroup:'26-35',
    question:'AI flags a job candidate as \'high risk\' with no explanation. Their CV and interview were both excellent. What do you do?',
    A: { text:'Override it and hire them — interview matters more', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Trusts human judgment. But if something goes wrong, you\'re accountable.' },
    B: { text:'Investigate what the flag means before deciding', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'Due diligence. But now you\'re deep in an AI rabbit hole for a human decision.' },
    C: { text:'Move to the next candidate — plenty of applicants, why risk it', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'You just let an opaque algorithm decide someone\'s career.' },
  },
  { id:42, category:'critical_thinking', ageGroup:'26-35',
    question:'Company AI scores your emails for \'professionalism.\' Your real writing style scores low. AI-rewritten emails score high. Manager notices.',
    A: { text:'Let AI rewrite my emails — the metric is what counts', energy_wh:10, water_ml:50, co2_g:3, mindfulness:1, why:'You survive the system, but your real voice disappears from work.' },
    B: { text:'Push back — grading humans by AI preference is backwards', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Might change culture. Or might get you labeled as not a team player.' },
    C: { text:'AI for external emails, own style for internal — pick battles', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'Pragmatic. But you\'re still letting AI define \'professional.\'' },
  },
  { id:43, category:'critical_thinking', ageGroup:'36-50',
    question:'AI suggests a medical treatment your doctor hasn\'t heard of, with studies to back it up. Who do you trust?',
    A: { text:'My doctor — AI sometimes fabricates studies', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Trusts expertise. But doctors don\'t know everything and medicine evolves.' },
    B: { text:'Verify if those studies actually exist, bring real ones to my doctor', energy_wh:3, water_ml:15, co2_g:1, mindfulness:3, why:'Most thorough. Requires medical literacy to evaluate what you find.' },
    C: { text:'Get a second opinion from another human doctor', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Expert vs expert. Best of both, but takes weeks and may cost money.' },
  },
  { id:44, category:'critical_thinking', ageGroup:'36-50',
    question:'Your teen shows you an AI deepfake of a politician saying something outrageous. Millions of views. They ask if it\'s real.',
    A: { text:'Walk through how to check: find the original source, look for news coverage', energy_wh:1, water_ml:5, co2_g:0.3, mindfulness:3, why:'Teaches verification skills for life. Takes time though.' },
    B: { text:'Use an AI deepfake detector — fight fire with fire', energy_wh:15, water_ml:75, co2_g:5, mindfulness:2, why:'Detection tools are in an arms race with generation tools.' },
    C: { text:'Tell them it\'s definitely fake — be skeptical of everything online', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'\'Assume everything is fake\' leads to dismissing real things too.' },
  },
  { id:45, category:'critical_thinking', ageGroup:'51-65',
    question:'You\'re on a jury. Defense presents AI analysis contradicting the prosecution\'s expert witness. Should AI evidence carry equal weight?',
    A: { text:'Consider it, but not equally — AI can\'t be cross-examined', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Balanced view. Though an imperfect human might be less accurate than good AI.' },
    B: { text:'Judge the analysis quality, not who produced it', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Rational. But most jurors can\'t evaluate AI analysis quality.' },
    C: { text:'AI shouldn\'t be admitted — justice is a human institution', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Principled, but DNA analysis was once considered too impersonal for courts too.' },
  },
  { id:46, category:'critical_thinking', ageGroup:'51-65',
    question:'AI manages your investments — 4% better returns than your old advisor. Last month it made a move you can\'t understand.',
    A: { text:'Stay — 4% matters more than understanding every move', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:1, why:'You\'re trusting your retirement to decisions you can\'t evaluate.' },
    B: { text:'Switch back to a human — I need to understand my money', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Understanding brings peace of mind, even at 4% lower returns.' },
    C: { text:'Keep AI but set hard limits that need my manual approval', energy_wh:4, water_ml:20, co2_g:1.2, mindfulness:3, why:'Guardrails. Control over the big moves, AI handles the rest.' },
  },
  { id:47, category:'critical_thinking', ageGroup:'66+',
    question:'AI translates your letters to English for your grandchild\'s friends. But it modernizes your expressions, losing cultural nuance.',
    A: { text:'Ask my grandchild to translate instead — they\'ll learn my language', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Preserves culture. But they might not be fluent enough.' },
    B: { text:'AI translates, we review and fix cultural parts together', energy_wh:3, water_ml:15, co2_g:1, mindfulness:3, why:'Teaching moment about what AI misses. Takes time though.' },
    C: { text:'Accept it — the core message gets through, that\'s enough', energy_wh:3, water_ml:15, co2_g:1, mindfulness:1, why:'Pragmatic. But each simplified translation erodes cultural connection.' },
  },
  { id:48, category:'critical_thinking', ageGroup:'66+',
    question:'You\'ve played chess your whole life. Your grandson says learning chess is pointless because AI already \'solved it.\'',
    A: { text:'Chess is about thinking and joy between people, not beating machines', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Defends human pursuits regardless of AI capability.' },
    B: { text:'AI engines actually make learning chess better — they show brilliant moves', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'AI as teacher, not replacement. Dependency question remains.' },
    C: { text:'He has a point — maybe learn something AI can\'t do yet', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Strategic thinking. But what AI \'can\'t do\' keeps shrinking.' },
  },
  { id:49, category:'social_ethics', ageGroup:'under_18',
    question:'School bans AI for assignments. But you have dyslexia and AI is the only tool that helps you organize your thoughts.',
    A: { text:'Talk to school about an exception — blanket bans ignore accessibility', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Advocates for fair rules. But the process is slow and you have homework due now.' },
    B: { text:'Use AI anyway — it\'s accessibility for me, not cheating', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:2, why:'Valid reasoning. But breaking rules secretly sets a difficult precedent.' },
    C: { text:'Follow the rules and struggle — not worth the risk', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Avoids conflict. But you\'re accepting an unfair disadvantage.' },
  },
  { id:50, category:'social_ethics', ageGroup:'under_18',
    question:'Friend makes a realistic AI fake of a teacher in a funny situation. Group chat thinks it\'s hilarious. They want to post it.',
    A: { text:'Laugh privately but tell my friend not to post it', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Protects the teacher. But group pressure is still there.' },
    B: { text:'Say in the group chat it\'s funny but wrong to post', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Braver stance. But being the \'buzzkill\' has real social cost at your age.' },
    C: { text:'Stay quiet — it\'s not my creation, not my responsibility', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Avoids confrontation. But silence is what lets these things escalate.' },
  },
  { id:51, category:'social_ethics', ageGroup:'18-25',
    question:'You\'re a teaching assistant. Half the class is using AI for assignments. Reporting them could hurt friends\' scholarships.',
    A: { text:'Tell the professor — academic integrity matters', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Upholds the system. Your friendships in the program may not survive.' },
    B: { text:'Suggest the professor redesign assignments to be AI-proof', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Systemic solution. Existing cheating goes unaddressed though.' },
    C: { text:'Look the other way — everyone does it, the system hasn\'t adapted', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Self-preservation. But you accepted a role that includes this responsibility.' },
  },
  { id:52, category:'social_ethics', ageGroup:'18-25',
    question:'AI can generate a fake professional portfolio — case studies, testimonials, results you never achieved. Looks identical to real work.',
    A: { text:'Use it — the job market is brutal, I\'ll learn once hired', energy_wh:15, water_ml:75, co2_g:5, mindfulness:1, why:'When real skills don\'t match the portfolio, the fallout is career-ending.' },
    B: { text:'Never — this is fraud that devalues real portfolios', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Moral clarity. But you\'re competing against people who might be doing this.' },
    C: { text:'Use AI to polish my REAL work — enhance presentation, not content', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Ethical line maintained. Levels the playing field without lying.' },
  },
  { id:53, category:'social_ethics', ageGroup:'26-35',
    question:'Your company\'s AI customer service gives worse answers to people with non-standard English. Fixing it costs €50K. Boss says overall metrics are great.',
    A: { text:'Escalate it — \'overall\' metrics hide real discrimination', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Right thing to do. Puts you against your boss and the budget.' },
    B: { text:'Document it and propose a phased fix with a business case', energy_wh:3, water_ml:15, co2_g:1, mindfulness:2, why:'Strategic. Might get funded. Affected customers wait during the \'phases.\'' },
    C: { text:'We serve thousands — a few edge cases don\'t justify €50K', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'\'Edge cases\' are real people getting worse service because of how they speak.' },
  },
  { id:54, category:'social_ethics', ageGroup:'26-35',
    question:'Journalist friend wants help using AI to write more articles daily. Used to do deep investigations. Newsroom now rewards quantity.',
    A: { text:'Help them — the industry changed, adapt or lose the job', energy_wh:15, water_ml:75, co2_g:5, mindfulness:1, why:'Keeps them employed. Contributes to journalism\'s decline though.' },
    B: { text:'AI for routine pieces, save energy for one deep investigation monthly', energy_wh:10, water_ml:50, co2_g:3, mindfulness:3, why:'Best of both. Newsroom incentives still reward the quantity metrics though.' },
    C: { text:'Their investigative skills are what makes them irreplaceable', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Principled. Doesn\'t pay rent if the newsroom penalizes lower output.' },
  },
  { id:55, category:'social_ethics', ageGroup:'36-50',
    question:'Neighborhood AI cameras flag \'suspicious activity.\' Caught 3 real thefts, but disproportionately flags delivery workers of certain backgrounds.',
    A: { text:'Raise it at the neighborhood meeting — biased surveillance is harmful', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Confronts the problem. Neighbors who feel safer might see you as the troublemaker.' },
    B: { text:'Report the bias to the app company and ask for updates', energy_wh:2, water_ml:10, co2_g:0.5, mindfulness:2, why:'Works within the system. Tech companies rarely prioritize individual bias reports.' },
    C: { text:'Keep using it — 3 real thefts stopped, false positives are just notifications', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:1, why:'The false positives you \'ignore\' shape how neighbors view the flagged people.' },
  },
  { id:56, category:'social_ethics', ageGroup:'36-50',
    question:'AI replaced 40 colleagues. Now they want YOU to train the AI system that replaced them, using your knowledge.',
    A: { text:'Do it — those jobs aren\'t coming back, refusing just delays things', energy_wh:20, water_ml:100, co2_g:7, mindfulness:1, why:'You\'re personally building the tool that took your colleagues\' livelihoods.' },
    B: { text:'Refuse — I won\'t help replace people I worked alongside', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Moral stand. Might cost you your own position.' },
    C: { text:'Agree only if the company funds retraining for displaced workers', energy_wh:10, water_ml:50, co2_g:3, mindfulness:3, why:'Uses your leverage for good. Company may agree on paper and underdeliver.' },
  },
  { id:57, category:'social_ethics', ageGroup:'51-65',
    question:'Government wants AI to allocate social services (housing, food programs). More \'fair\' than caseworkers, they say. But data reflects past inequities.',
    A: { text:'Support it — removes human bias and favoritism', energy_wh:10, water_ml:50, co2_g:3, mindfulness:1, why:'Data reflects historical inequity, not future needs.' },
    B: { text:'Oppose — social services need understanding, not data points', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Defends dignity. Human caseworkers have their own biases though.' },
    C: { text:'AI flags who needs help, human makes the final call', energy_wh:5, water_ml:25, co2_g:1.5, mindfulness:3, why:'Hybrid. In practice the human often rubber-stamps the AI recommendation.' },
  },
  { id:58, category:'social_ethics', ageGroup:'51-65',
    question:'Church newsletter was always written by volunteers. New chair wants AI because it\'s \'more professional.\' Volunteers feel pushed out.',
    A: { text:'Keep the volunteers — personal voices are the whole point', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Preserves community. Writing quality might not attract new members.' },
    B: { text:'Volunteers write personal pieces, AI handles announcements', energy_wh:3, water_ml:15, co2_g:1, mindfulness:2, why:'Keeps both community voice and a polished look.' },
    C: { text:'The chair\'s right — looking modern helps us grow', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:1, why:'Trading authentic voices for polish may attract the wrong audience.' },
  },
  { id:59, category:'social_ethics', ageGroup:'66+',
    question:'Retirement home gets an AI companion robot for residents who never have visitors. Some are forming real emotional bonds with it.',
    A: { text:'Better than nothing — loneliness is a health crisis', energy_wh:15, water_ml:75, co2_g:5, mindfulness:2, why:'Real suffering addressed. But normalizes isolation as solvable by machine.' },
    B: { text:'Build a volunteer visitor program — real connection can\'t be replaced', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Ideal. But volunteer programs are unreliable and hard to sustain.' },
    C: { text:'Robot daily, volunteer visits weekly — both, not either-or', energy_wh:8, water_ml:40, co2_g:2.5, mindfulness:3, why:'Pragmatic layering. Limited budgets usually mean the robot replaces the program.' },
  },
  { id:60, category:'social_ethics', ageGroup:'66+',
    question:'AI pension system made an error giving you MORE money. Nobody noticed. Correcting it reduces your income. What do you do?',
    A: { text:'Report it — that money affects others who need it', energy_wh:0, water_ml:0, co2_g:0, mindfulness:3, why:'Integrity. Costs you personally.' },
    B: { text:'Keep quiet — AI errors are the system\'s problem', energy_wh:0, water_ml:0, co2_g:0, mindfulness:1, why:'Self-interest. If it affects a shared pool, others receive less.' },
    C: { text:'Hint at it: \'What if the AI miscalculated?\' — let them catch it', energy_wh:0, water_ml:0, co2_g:0, mindfulness:2, why:'Points toward truth without directly sacrificing your income.' },
  },
];
// ── Question Selector (5 questions, 1 per category, filtered by age group) ──

function selectQuestions(userAge) {
  const ageGroup = ageToGroup(userAge);
  const categories = ['everyday_use', 'privacy', 'environmental', 'critical_thinking', 'social_ethics'];
  const selected = categories.map(cat => {
    const pool = ageGroup
      ? QUESTIONS_DB.filter(q => q.category === cat && q.ageGroup === ageGroup)
      : QUESTIONS_DB.filter(q => q.category === cat);
    return pool[Math.floor(Math.random() * pool.length)];
  });
  return selected.sort(() => Math.random() - 0.5);
}

// ── Tips Pool (21 tips, indexed by ID) ────────────────────────

const TIPS_POOL = {
  1:  { icon: '🔄', title: 'Smart Sharing Saves Energy',       description: 'When AI creates something you like, share it with others instead of having them generate the same thing.',                                                         savingsLabel: 'Saves 100% of energy for duplicate requests' },
  2:  { icon: '📝', title: 'Try Text Before Pictures',         description: 'Ask AI to describe your idea in words first. If you like it, then make the picture. You might not even need the image!',                                               savingsLabel: 'Uses 50× less energy than going straight to images' },
  3:  { icon: '✓',  title: 'Good Enough is Great',             description: 'When AI gives you something that works, use it! Clicking "try again" over and over uses a lot of extra energy for small improvements.',                                savingsLabel: 'Each retry doubles your energy use' },
  4:  { icon: '🎯', title: 'Be Specific From the Start',       description: 'The clearer you are in your first request, the better AI\'s first answer will be. Add details like size, style, or purpose right away.',                             savingsLabel: 'Reduces retries by 60–80%' },
  5:  { icon: '📦', title: 'Bundle Your Questions',            description: 'Got several questions? Ask them all together in one conversation instead of starting fresh each time.',                                                                 savingsLabel: 'Cuts "startup" energy by 70%' },
  6:  { icon: '♻️', title: 'Reuse Yesterday\'s Answers',       description: 'If you asked AI something before, look back at that answer instead of asking again. Save your AI conversations!',                                                     savingsLabel: 'Reusing costs almost zero energy' },
  7:  { icon: '🌙', title: 'Use AI at Night',                  description: 'When possible, use AI in the evening or on weekends. The electricity grid uses more wind and solar power during these times.',                                         savingsLabel: 'Reduces carbon by 20–50%' },
  8:  { icon: '🔍', title: 'Check If It Already Exists',       description: 'Before asking AI to create something (especially images), do a quick search online. It might already exist!',                                                          savingsLabel: 'Finding existing content uses 95% less energy' },
  9:  { icon: '📏', title: 'Start Small, Add More Later',      description: 'Ask for a short answer first. If you need more details, you can always ask AI to expand. Don\'t start with "tell me everything!"',                                    savingsLabel: 'Short responses use 60% less energy' },
  10: { icon: '✏️', title: 'Make One, Edit Many',              description: 'If you need similar things (like birthday cards for different people), create one with AI and then edit the details yourself for the others.',                         savingsLabel: 'Saves 80% compared to generating each separately' },
  11: { icon: '🧠', title: 'Your Brain Can Do Simple Stuff',   description: 'Save AI for things that are actually hard! Simple math, spelling checks, or basic lists don\'t need AI — you\'ve got this.',                                          savingsLabel: 'Reserves AI energy for tasks that truly need it' },
  12: { icon: '🔒', title: 'Keep Your Data Private',           description: 'Before sharing personal info with AI, ask yourself: does it really need to know this? Less data shared = more privacy protected.',                                    savingsLabel: 'Protects your personal information' },
  13: { icon: '✔️', title: 'Double-Check Important Stuff',     description: 'AI is smart but not perfect. For health, safety, or important decisions, always verify with real experts or trusted sources.',                                         savingsLabel: 'Prevents mistakes and keeps you safe' },
  14: { icon: '📚', title: 'Learn, Don\'t Just Copy',          description: 'When AI helps with homework or learning, use it to understand the topic better — not just to copy answers. You\'ll remember it longer!',                             savingsLabel: 'Real learning stays with you' },
  15: { icon: '🤝', title: 'Give Credit Where It\'s Due',      description: 'If AI helped you create something, be honest about it! Saying "I made this with AI" shows integrity.',                                                                savingsLabel: 'Builds trust and transparency' },
  16: { icon: '🎨', title: 'Respect Artists\' Styles',         description: 'When using AI to create art, avoid copying specific artists\' unique styles. Instead, describe what you want in general terms.',                                       savingsLabel: 'Supports creative communities' },
  17: { icon: '💬', title: 'Write Like You, Not a Robot',      description: 'If AI writes something for you, rewrite it in your own voice. People want to hear from you, not a computer!',                                                         savingsLabel: 'Keeps your authentic voice' },
  18: { icon: '👥', title: 'Protect Others\' Privacy Too',     description: 'Before sharing your contacts, photos with others in them, or any info about friends with AI — remember, that\'s their privacy too.',                                  savingsLabel: "Respects friends' and family's information" },
  19: { icon: '⚠️', title: 'Think Before You Share AI Content',description: 'AI can make realistic fake images and videos. Always make it clear when something is AI-generated to avoid spreading confusion.',                                     savingsLabel: 'Prevents misinformation' },
  20: { icon: '🛡️', title: 'Choose Your AI Tools Wisely',      description: 'If you use AI regularly for sensitive stuff, consider paying for a version that respects your privacy. Free isn\'t always best.',                                    savingsLabel: 'Better privacy protection for your data' },
  21: { icon: '🌟', title: 'Help Others Learn About AI',       description: 'Share what you learned today! Help friends and family understand how to use AI responsibly and sustainably.',                                                          savingsLabel: 'Multiplies positive impact across your community' }
};

// ── Personalized Tip Selector ──────────────────

function selectPersonalizedTips(taskType, resources, ethicsAnswers) {
  const redByCategory = {};
  ethicsAnswers.forEach(a => {
    if (a.color === 'red') redByCategory[a.category] = (redByCategory[a.category] || 0) + 1;
  });

  let tipIds;

  // Priority: strong ethics pattern overrides prompt-type defaults
  if ((redByCategory['privacy'] || 0) >= 2) {
    tipIds = [12, 18, 20];
  } else if ((redByCategory['critical_thinking'] || 0) >= 2) {
    tipIds = [13, 14, 19];
  } else if ((redByCategory['social_ethics'] || 0) >= 2) {
    tipIds = [15, 18, 21];
  } else if ((redByCategory['environmental'] || 0) >= 2) {
    tipIds = [7, 8, 9];
  } else {
    const level = getResourceLevel(resources);  // 'high'=low impact, 'medium', 'low'=high impact
    const matrix = {
      image:        { high: [2, 4, 10], medium: [2, 3, 8],  low: [2, 8, 11]  },
      'text-short': { high: [5, 6, 9],  medium: [4, 6, 11], low: [3, 6, 11]  },
      'text-long':  { high: [5, 9, 10], medium: [4, 9, 11], low: [3, 9, 11]  }
    };
    tipIds = (matrix[taskType] || matrix['text-short'])[level];
  }

  return tipIds.map(id => ({ id, ...TIPS_POOL[id] }));
}

// ── AI User Personality System (Impact × Mindfulness axes) ──────
// Impact  = total energy_wh across 5 answers: low <20, medium 20-60, high >60
// Mindfulness = sum of mindfulness scores (range 5-15): low 5-8, high 9-15 (low impact) / 11-15 (med+high)

// Shared cloud base for all Byte persona SVGs
const _CLOUD = `
  <rect x="40" y="30" width="80" height="50" rx="6" fill="#c8e8f5"/>
  <rect x="28" y="42" width="104" height="30" rx="6" fill="#c8e8f5"/>
  <rect x="30" y="22" width="28" height="28" rx="4" fill="#daf0fa"/>
  <rect x="55" y="12" width="36" height="36" rx="4" fill="#eef8ff"/>
  <rect x="88" y="22" width="28" height="28" rx="4" fill="#daf0fa"/>
  <rect x="40" y="68" width="20" height="16" rx="3" fill="#c8e8f5"/>
  <rect x="100" y="68" width="20" height="16" rx="3" fill="#c8e8f5"/>`;
const _EYES = `
  <rect x="54" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
  <rect x="92" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
  <rect x="58" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>
  <rect x="96" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>`;
const _SMILE  = `<path d="M 62 64 Q 80 74 98 64" stroke="#1a1a2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
const _BIGSMILE = `<path d="M 57 64 Q 80 78 103 64" stroke="#1a1a2e" stroke-width="4" fill="none" stroke-linecap="round"/>`;

function _svg(body) {
  return `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

const PERSONALITY_TYPES = {
  'the_zen_prompter': {
    id: 'the_zen_prompter',
    title: 'The Zen Prompter',
    subtitle: 'Minimum input, maximum wisdom',
    description: 'You treat AI like a spice rack — a pinch here, a dash there, never the whole jar. You think before you prompt, you question before you trust, and you probably still handwrite thank-you cards. The internet doesn\'t deserve you.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Green tint overlay -->
      <rect x="28" y="12" width="104" height="72" rx="6" fill="#06d6a0" opacity="0.18"/>
      <!-- Closed serene eyes -->
      <path d="M 54 51 Q 61 46 68 51" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 92 51 Q 99 46 106 51" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Gentle smile -->
      <path d="M 65 64 Q 80 72 95 64" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Leaf growing on top -->
      <line x1="80" y1="12" x2="80" y2="22" stroke="#06d6a0" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="74" cy="9" rx="9" ry="5" fill="#06d6a0" transform="rotate(-25 74 9)"/>
      <ellipse cx="87" cy="8" rx="9" ry="5" fill="#06d6a0" transform="rotate(20 87 8)"/>`)
  },
  'the_balanced_byte': {
    id: 'the_balanced_byte',
    title: 'The Balanced Byte',
    subtitle: 'Thoughtful power user',
    description: 'You use AI like a good chef uses a blender — when it makes sense, not for everything. You\'ve thought about the trade-offs, you accept the costs when they\'re worth it, and you probably read the \'why\' explanations more carefully than most. Respect.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Blue tint overlay -->
      <rect x="28" y="12" width="104" height="72" rx="6" fill="#4cc9f0" opacity="0.20"/>
      <!-- Eyes with one raised eyebrow -->
      ${_EYES}
      <path d="M 92 41 Q 99 37 106 41" stroke="#1a1a2e" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Confident grin -->
      ${_BIGSMILE}
      <!-- Mini balance scale (top-right) -->
      <line x1="133" y1="18" x2="133" y2="44" stroke="#4cc9f0" stroke-width="2"/>
      <circle cx="133" cy="17" r="2.5" fill="#4cc9f0"/>
      <line x1="120" y1="26" x2="146" y2="26" stroke="#4cc9f0" stroke-width="2"/>
      <line x1="121" y1="26" x2="124" y2="35" stroke="#4cc9f0" stroke-width="1.5"/>
      <ellipse cx="124" cy="38" rx="5" ry="3" fill="none" stroke="#4cc9f0" stroke-width="1.5"/>
      <line x1="145" y1="26" x2="142" y2="35" stroke="#4cc9f0" stroke-width="1.5"/>
      <ellipse cx="142" cy="38" rx="5" ry="3" fill="none" stroke="#4cc9f0" stroke-width="1.5"/>`)
  },
  'the_abstainer': {
    id: 'the_abstainer',
    title: 'The Abstainer',
    subtitle: 'AI? No thank you, I have hands',
    description: 'You consistently chose the zero-energy option, which is great for the planet but... did you actually engage with the dilemmas? Sometimes the right answer IS using AI — just thoughtfully. You might be avoiding the tool instead of learning to use it wisely. The future is coming either way!',
    byteSvg: _svg(`${_CLOUD}
      <!-- Grey tint overlay -->
      <rect x="28" y="12" width="104" height="72" rx="6" fill="#888" opacity="0.22"/>
      <!-- Standard left eye, squinted right (side-eye) -->
      <rect x="54" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
      <rect x="58" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>
      <rect x="92" y="48" width="14" height="8" rx="2" fill="#1a1a2e"/>
      <rect x="96" y="50" width="4" height="3" rx="1" fill="white" opacity="0.6"/>
      <!-- Skeptical frown -->
      <path d="M 62 68 Q 80 62 98 68" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- No-WiFi symbol -->
      <circle cx="133" cy="30" r="14" fill="none" stroke="#888" stroke-width="2"/>
      <line x1="122" y1="19" x2="144" y2="41" stroke="#888" stroke-width="2.5"/>
      <path d="M 124 24 Q 133 17 142 24" fill="none" stroke="#888" stroke-width="2"/>
      <path d="M 127 29 Q 133 23 139 29" fill="none" stroke="#888" stroke-width="1.5"/>
      <circle cx="133" cy="36" r="2" fill="#888"/>`)
  },
  'the_sleepwalker': {
    id: 'the_sleepwalker',
    title: 'The Sleepwalker',
    subtitle: 'Using AI on autopilot',
    description: 'You\'re using AI, which is fine — but you\'re kind of just going with the flow without thinking too hard about it. Not great, not terrible, just... vibes. The resources add up when nobody\'s paying attention, like leaving the tap running while you brush your teeth. Wake up and smell the kilowatts!',
    byteSvg: _svg(`${_CLOUD}
      <!-- Yellow-orange tint overlay -->
      <rect x="28" y="12" width="104" height="72" rx="6" fill="#f77f00" opacity="0.20"/>
      <!-- Half-closed droopy eyes -->
      <rect x="54" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
      <rect x="92" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
      <rect x="58" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>
      <rect x="96" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>
      <!-- Droopy eyelid overlay -->
      <rect x="53" y="43" width="16" height="9" rx="3" fill="#ddd0b8"/>
      <rect x="91" y="43" width="16" height="9" rx="3" fill="#ddd0b8"/>
      <!-- Blank open mouth -->
      <rect x="70" y="64" width="20" height="6" rx="3" fill="#1a1a2e" opacity="0.35"/>
      <!-- Z's floating -->
      <text x="125" y="30" font-family="monospace" font-size="11" fill="#f77f00" font-weight="bold">z</text>
      <text x="133" y="21" font-family="monospace" font-size="14" fill="#f77f00" font-weight="bold">Z</text>
      <text x="142" y="13" font-family="monospace" font-size="17" fill="#f77f00" font-weight="bold">Z</text>`)
  },
  'the_conscious_guzzler': {
    id: 'the_conscious_guzzler',
    title: 'The Conscious Guzzler',
    subtitle: 'Knows the cost, pays it anyway',
    description: 'Here\'s the thing — you KNOW AI uses energy, you KNOW the trade-offs, and you chose the heavy options anyway. Points for honesty! But knowing the price and choosing to pay it every time is like reading nutrition labels and still ordering the triple cheeseburger. Your awareness needs a gym buddy called \'restraint.\'',
    byteSvg: _svg(`${_CLOUD}
      <!-- Orange-red tint overlay -->
      <rect x="28" y="12" width="104" height="72" rx="6" fill="#e85d04" opacity="0.22"/>
      <!-- Eyes shifted sideways (guilty glance) -->
      <rect x="54" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
      <rect x="92" y="44" width="14" height="14" rx="3" fill="#1a1a2e"/>
      <rect x="62" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>
      <rect x="100" y="47" width="4" height="4" rx="1" fill="white" opacity="0.8"/>
      <!-- Guilty one-sided smile -->
      <path d="M 62 64 Q 74 72 84 66" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Sweat drop -->
      <ellipse cx="112" cy="44" rx="3" ry="5" fill="#4cc9f0" transform="rotate(15 112 44)"/>
      <!-- Lightning bolts flying off top-right -->
      <polygon points="126,12 118,28 125,28 113,48 130,26 122,26 132,12" fill="#ffbe0b" opacity="0.9"/>
      <polygon points="138,16 132,30 138,30 128,46 142,28 136,28 145,16" fill="#f77f00" opacity="0.75"/>`)
  },
  'the_turbo_tapper': {
    id: 'the_turbo_tapper',
    title: 'The Turbo Tapper',
    subtitle: 'Full throttle, zero regrets',
    description: 'You hit every AI button available without a second thought. Generate! Regenerate! Analyze! Generate again! The servers felt that. If AI use had a sound, yours would be a jet engine. The good news? Now you\'ve seen the receipts. Maybe next time, just one tiny pause before the next prompt?',
    byteSvg: _svg(`${_CLOUD}
      <!-- Red tint overlay -->
      <rect x="28" y="12" width="104" height="72" rx="6" fill="#c1121f" opacity="0.22"/>
      <!-- Wide excited eyes -->
      <rect x="50" y="40" width="18" height="18" rx="3" fill="#1a1a2e"/>
      <rect x="92" y="40" width="18" height="18" rx="3" fill="#1a1a2e"/>
      <rect x="54" y="43" width="5" height="5" rx="1" fill="white" opacity="0.8"/>
      <rect x="96" y="43" width="5" height="5" rx="1" fill="white" opacity="0.8"/>
      <!-- Huge open grin with teeth -->
      <path d="M 56 62 Q 80 80 104 62" stroke="#1a1a2e" stroke-width="4" fill="none" stroke-linecap="round"/>
      <rect x="66" y="63" width="28" height="7" rx="2" fill="white" opacity="0.85"/>
      <!-- Rocket flame left -->
      <path d="M 30 52 L 20 48 L 20 58 Z" fill="#ffbe0b"/>
      <path d="M 30 52 L 15 50 L 15 54 Z" fill="#ff9500" opacity="0.8"/>
      <!-- Rocket flame right -->
      <path d="M 130 52 L 140 48 L 140 58 Z" fill="#ffbe0b"/>
      <path d="M 130 52 L 145 50 L 145 54 Z" fill="#ff9500" opacity="0.8"/>
      <!-- Speed lines top-left -->
      <line x1="20" y1="30" x2="10" y2="32" stroke="#ffbe0b" stroke-width="2" opacity="0.6"/>
      <line x1="20" y1="37" x2="9" y2="37" stroke="#ffbe0b" stroke-width="2" opacity="0.6"/>
      <line x1="20" y1="44" x2="10" y2="42" stroke="#ffbe0b" stroke-width="2" opacity="0.6"/>`)
  }
};

function getPersonality(energyTotal, mindfulnessTotal) {
  const impact = energyTotal < 20 ? 'low' : energyTotal <= 60 ? 'medium' : 'high';
  let type;
  if (impact === 'low') {
    // Low impact: high mindfulness ≥9 → zen, otherwise abstainer (chose zero-energy without much reflection)
    type = mindfulnessTotal >= 9 ? 'the_zen_prompter' : 'the_abstainer';
  } else if (impact === 'medium') {
    // Medium impact: thoughtful ≥11 → balanced, otherwise sleepwalker
    type = mindfulnessTotal >= 11 ? 'the_balanced_byte' : 'the_sleepwalker';
  } else {
    // High impact: aware ≥11 → conscious guzzler, otherwise turbo tapper
    type = mindfulnessTotal >= 11 ? 'the_conscious_guzzler' : 'the_turbo_tapper';
  }
  return PERSONALITY_TYPES[type];
}

// ── Legacy persona alias (kept for old references) ────────────────
const PERSONAS = {
  'guardian': {
    id: 'guardian',
    name: 'THE AI GUARDIAN',
    tagline: 'Thoughtful, responsible, planet-aware',
    description: 'You are literally the AI saint we did not know we needed. Privacy protected. Planet considered. Bias challenged. We would put you on a poster — if we could print it without using too much energy.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Crown -->
      <rect x="58" y="17" width="44" height="7" rx="2" fill="#00f5ff"/>
      <polygon points="58,17 64,7 70,17" fill="#00f5ff"/>
      <polygon points="77,17 80,5 83,17" fill="#00f5ff"/>
      <polygon points="90,17 96,7 102,17" fill="#00f5ff"/>
      <circle cx="64" cy="11" r="2.5" fill="#ff006e"/>
      <circle cx="80" cy="7" r="3" fill="#ffbe0b"/>
      <circle cx="96" cy="11" r="2.5" fill="#ff006e"/>
      ${_EYES}${_BIGSMILE}`)
  },
  'conscious-creator': {
    id: 'conscious-creator',
    name: 'THE CONSCIOUS CREATOR',
    tagline: 'Creative and growing in awareness',
    description: 'You are out here composting your prompts. Metaphorically. You think about the planet, you get creative with fewer resources, and you somehow still get things done. Honestly a bit impressive.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Sprout -->
      <line x1="130" y1="55" x2="130" y2="30" stroke="#06d6a0" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="120" cy="37" rx="12" ry="7" fill="#06d6a0" transform="rotate(-35 120 37)"/>
      <ellipse cx="138" cy="33" rx="12" ry="7" fill="#06d6a0" transform="rotate(25 138 33)"/>
      <circle cx="130" cy="30" r="4" fill="#06d6a0"/>
      ${_EYES}${_SMILE}`)
  },
  'fairness-advocate': {
    id: 'fairness-advocate',
    name: 'THE FAIRNESS ADVOCATE',
    tagline: 'Champion of equal and fair AI',
    description: 'You noticed the algorithm has a problem and you are not just shrugging about it. Respect. You are the kind of person who reads the terms of service and actually cares what they say. Rare.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Scales -->
      <line x1="130" y1="18" x2="130" y2="48" stroke="#ffbe0b" stroke-width="2.5"/>
      <circle cx="130" cy="18" r="3" fill="#ffbe0b"/>
      <line x1="113" y1="28" x2="147" y2="28" stroke="#ffbe0b" stroke-width="2.5"/>
      <line x1="114" y1="28" x2="118" y2="37" stroke="#ffbe0b" stroke-width="1.5"/>
      <ellipse cx="118" cy="41" rx="7" ry="4" fill="none" stroke="#ffbe0b" stroke-width="2"/>
      <line x1="146" y1="28" x2="142" y2="37" stroke="#ffbe0b" stroke-width="1.5"/>
      <ellipse cx="142" cy="41" rx="7" ry="4" fill="none" stroke="#ffbe0b" stroke-width="2"/>
      ${_EYES}${_SMILE}`)
  },
  'privacy-champion': {
    id: 'privacy-champion',
    name: 'THE PRIVACY CHAMPION',
    tagline: 'Data-savvy and rights-aware',
    description: 'You hand out your personal data like it is a limited-edition collector\'s item — which, honestly, it is. Your info is precious and you treat it that way. Now if only everyone else did too.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Shield -->
      <path d="M 114 18 L 148 18 L 148 38 Q 148 52 131 57 Q 114 52 114 38 Z" fill="#4cc9f0" opacity="0.18" stroke="#4cc9f0" stroke-width="2"/>
      <rect x="124" y="36" width="14" height="12" rx="2" fill="#4cc9f0"/>
      <path d="M 126 36 Q 126 29 131 29 Q 136 29 136 36" fill="none" stroke="#4cc9f0" stroke-width="2.5"/>
      <circle cx="131" cy="40" r="2.5" fill="#0f0f2e"/>
      <line x1="131" y1="42.5" x2="131" y2="45" stroke="#0f0f2e" stroke-width="2"/>
      ${_EYES}${_SMILE}`)
  },
  'pragmatic-explorer': {
    id: 'pragmatic-explorer',
    name: 'THE PRAGMATIC EXPLORER',
    tagline: 'Practical, curious, finding the way',
    description: 'You are the "it depends" person of AI ethics. Sometimes green, sometimes not, always weighing the angles. A perfectly reasonable stance — just a few more green choices and you will be running the ethics committee.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Compass -->
      <circle cx="130" cy="35" r="17" fill="#0f0f2e" stroke="#ffbe0b" stroke-width="1.5" opacity="0.85"/>
      <circle cx="130" cy="35" r="13" fill="none" stroke="rgba(255,190,11,0.25)" stroke-width="1"/>
      <polygon points="130,22 133,35 130,48 127,35" fill="#e8e8f8"/>
      <polygon points="130,22 133,35 130,34 127,35" fill="#ff006e"/>
      <polygon points="117,35 130,32 143,35 130,38" fill="rgba(232,232,248,0.35)"/>
      <circle cx="130" cy="35" r="3" fill="#ffbe0b"/>
      ${_EYES}${_SMILE}`)
  },
  'speed-seeker': {
    id: 'speed-seeker',
    name: 'THE SPEED SEEKER',
    tagline: 'Full throttle and loving it',
    description: 'You and AI are basically inseparable — fast, frequent, no questions asked. Totally understandable, honestly. Now that you have seen the receipts though... maybe just one tiny pause before the next prompt? Just one.',
    byteSvg: _svg(`${_CLOUD}
      <!-- Lightning bolts -->
      <polygon points="126,12 117,32 126,32 112,58 132,28 121,28 134,12" fill="#ffbe0b"/>
      <polygon points="138,16 131,34 138,34 127,56 143,32 135,32 146,16" fill="#ff9900" opacity="0.75"/>
      <!-- Speed lines -->
      <line x1="110" y1="22" x2="103" y2="24" stroke="#ffbe0b" stroke-width="1.5" opacity="0.5"/>
      <line x1="110" y1="29" x2="102" y2="29" stroke="#ffbe0b" stroke-width="1.5" opacity="0.5"/>
      <line x1="110" y1="36" x2="103" y2="34" stroke="#ffbe0b" stroke-width="1.5" opacity="0.5"/>
      <!-- Wide excited eyes -->
      <rect x="50" y="40" width="18" height="18" rx="3" fill="#1a1a2e"/>
      <rect x="92" y="40" width="18" height="18" rx="3" fill="#1a1a2e"/>
      <rect x="54" y="43" width="5" height="5" rx="1" fill="white" opacity="0.8"/>
      <rect x="96" y="43" width="5" height="5" rx="1" fill="white" opacity="0.8"/>
      <!-- Excited open mouth -->
      <rect x="66" y="62" width="28" height="7" rx="3.5" fill="#1a1a2e"/>`)
  }
};

function getAIPersona(ethicsAnswers) {
  const greenCount  = ethicsAnswers.filter(a => a.color === 'green').length;
  const redCount    = ethicsAnswers.filter(a => a.color === 'red').length;
  const greenCats   = ethicsAnswers.filter(a => a.color === 'green').map(a => a.category);

  // 4-5 greens: Guardian (genuinely excellent across the board)
  if (greenCount >= 4) return PERSONAS['guardian'];

  // 3+ reds: Speed Seeker (consistently high-impact choices)
  if (redCount >= 3) return PERSONAS['speed-seeker'];

  // 2-3 greens: assign based on WHICH category was green
  // Priority: environmental > social_ethics > privacy > everyday_use/critical_thinking (→ guardian lean)
  if (greenCount >= 2) {
    if (greenCats.includes('environmental'))    return PERSONAS['conscious-creator'];
    if (greenCats.includes('social_ethics'))    return PERSONAS['fairness-advocate'];
    if (greenCats.includes('privacy'))          return PERSONAS['privacy-champion'];
    // everyday_use or critical_thinking green only: close to Guardian
    return PERSONAS['guardian'];
  }

  // Exactly 1 green: assign to that specialty if meaningful, else pragmatic
  if (greenCount === 1) {
    if (greenCats.includes('environmental'))    return PERSONAS['conscious-creator'];
    if (greenCats.includes('social_ethics'))    return PERSONAS['fairness-advocate'];
    if (greenCats.includes('privacy'))          return PERSONAS['privacy-champion'];
  }

  // 0-1 greens, 0-2 reds → Pragmatic Explorer (the reasonable middle)
  return PERSONAS['pragmatic-explorer'];
}

// ── Legacy TIPS (kept for compatibility) ─────

const TIPS = {
  image: [
    TIPS_POOL['simpler-image'],
    TIPS_POOL['use-text-instead'],
    TIPS_POOL['be-specific'],
    TIPS_POOL['search-first']
  ],
  text: [
    TIPS_POOL['check-cached'],
    TIPS_POOL['batch-questions'],
    TIPS_POOL['use-search']
  ]
};

// ── Task type detection ──────────────────────

function detectTaskType(prompt) {
  const imageKeywords = [
    'image', 'picture', 'photo', 'draw', 'generate', 'logo',
    'illustration', 'design', 'sketch', 'paint', 'artwork',
    'visual', 'graphic', 'icon', 'avatar', 'render'
  ];
  const promptLower = prompt.toLowerCase();

  if (imageKeywords.some(word => promptLower.includes(word))) {
    return 'image';
  }

  return 'text';
}

function refineTextType(responseText) {
  const wordCount = responseText.trim().split(/\s+/).length;
  return wordCount > 200 ? 'text-long' : 'text-short';
}

// ── Score-based Persona (Scoring_Logic.md table) ──────────────────

const SCORE_PERSONAS = (function () {
  const C = _CLOUD;
  const E = _EYES;
  const S = _SMILE;
  const BS = _BIGSMILE;

  return {
    'grid-goblin': {
      title: 'GRID GOBLIN',
      subtitle: 'Draining the planet one click at a time',
      description: 'Maximum consumption, zero awareness. You plugged in and never looked back. Data centres are humming overtime just for you — maybe a pause button is in order?',
      tip: 'Start small: pick one task this week where you solve it yourself before turning to AI. One conscious pause per day adds up to real change.',
      byteSvg: _svg(C +
        '<rect x="115" y="14" width="30" height="20" rx="3" fill="#3a0a1a" stroke="#ff006e" stroke-width="2"/>' +
        '<rect x="123" y="8" width="5" height="8" rx="1" fill="#ff006e"/>' +
        '<rect x="132" y="8" width="5" height="8" rx="1" fill="#ff006e"/>' +
        '<rect x="120" y="23" width="5" height="5" rx="2" fill="#ff006e"/>' +
        '<rect x="135" y="23" width="5" height="5" rx="2" fill="#ff006e"/>' +
        '<rect x="54" y="44" width="14" height="8" rx="2" fill="#1a1a2e"/>' +
        '<rect x="92" y="44" width="14" height="8" rx="2" fill="#1a1a2e"/>' +
        '<rect x="64" y="64" width="32" height="4" rx="2" fill="#1a1a2e"/>')
    },
    'turbo-tapper': {
      title: 'TURBO TAPPER',
      subtitle: 'Fast and reckless — consequences be damned',
      description: 'Convenience wins every time for you. You tap, you get, you forget. Quick choices leave long footprints. Just one more second of thought could change the whole game.',
      tip: 'Before you hit generate, ask yourself one question: "Can I do even part of this myself?" That two-second pause is where better habits are built.',
      byteSvg: _svg(C +
        '<polygon points="126,12 117,32 126,32 112,58 132,28 121,28 134,12" fill="#ffbe0b"/>' +
        '<polygon points="138,16 131,34 138,34 127,56 143,32 135,32 146,16" fill="#ff9900" opacity="0.75"/>' +
        '<line x1="110" y1="22" x2="103" y2="24" stroke="#ffbe0b" stroke-width="1.5" opacity="0.5"/>' +
        '<line x1="110" y1="29" x2="102" y2="29" stroke="#ffbe0b" stroke-width="1.5" opacity="0.5"/>' +
        '<rect x="50" y="40" width="18" height="18" rx="3" fill="#1a1a2e"/>' +
        '<rect x="92" y="40" width="18" height="18" rx="3" fill="#1a1a2e"/>' +
        '<rect x="54" y="43" width="5" height="5" rx="1" fill="white" opacity="0.8"/>' +
        '<rect x="96" y="43" width="5" height="5" rx="1" fill="white" opacity="0.8"/>' +
        '<rect x="66" y="62" width="28" height="7" rx="3.5" fill="#1a1a2e"/>')
    },
    'casual-clicker': {
      title: 'CASUAL CLICKER',
      subtitle: 'Convenience-first with occasional good instincts',
      description: 'Not thinking it through, but not reckless either. You have some good instincts hiding in there. A little more intention and you would be surprising yourself.',
      tip: 'Trust your instincts more. Before your next AI prompt, spend 30 seconds attempting it yourself — you\'ll save energy and often get a more personal result.',
      byteSvg: _svg(C + E +
        '<path d="M 64 64 Q 80 70 96 64" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<text x="118" y="50" font-size="22" fill="#ffbe0b">~</text>')
    },
    'eco-experimenter': {
      title: 'ECO EXPERIMENTER',
      subtitle: 'Starting to connect the dots',
      description: 'You are beginning to see the link between your choices and their impact. Keep experimenting — every conscious click moves the needle in the right direction.',
      tip: 'Keep going! Start asking "what\'s the lowest-impact way to get this result?" before every session. The habit becomes automatic faster than you think.',
      byteSvg: _svg(C + E + S +
        '<circle cx="130" cy="32" r="13" fill="none" stroke="#06d6a0" stroke-width="2" opacity="0.6"/>' +
        '<line x1="130" y1="19" x2="130" y2="45" stroke="#06d6a0" stroke-width="1.5" opacity="0.5"/>' +
        '<line x1="117" y1="32" x2="143" y2="32" stroke="#06d6a0" stroke-width="1.5" opacity="0.5"/>' +
        '<circle cx="130" cy="26" r="3" fill="#06d6a0"/>')
    },
    'mindful-maker': {
      title: 'MINDFUL MAKER',
      subtitle: 'Thoughtful and intentional',
      description: 'You balance usefulness with environmental care. You get things done AND think about how — a rare and valuable combination. The planet quietly appreciates you.',
      tip: 'You\'re already doing great. Level up by tracking how often you skip AI entirely for tasks you\'d have prompted last year — that gap is your real impact.',
      byteSvg: _svg(C + E +
        '<path d="M 60 65 Q 80 76 100 65" stroke="#1a1a2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="130" cy="28" rx="10" ry="14" fill="#06d6a0" opacity="0.85" transform="rotate(-20 130 28)"/>' +
        '<line x1="122" y1="38" x2="138" y2="18" stroke="#03a87c" stroke-width="1.5"/>' +
        '<circle cx="130" cy="20" r="3" fill="#03a87c"/>')
    },
    'green-hacker': {
      title: 'GREEN HACKER',
      subtitle: 'Optimising the right things',
      description: 'Deliberately sustainable — you found the cheat codes for low-impact AI use and you are running them. You earn the hacker badge for knowing how the system works AND choosing to work with it.',
      tip: 'You\'ve found the cheat codes — now teach someone else. Sharing sustainable AI habits multiplies your impact far beyond your own sessions.',
      byteSvg: _svg(C +
        '<rect x="48" y="40" width="28" height="22" rx="5" fill="#06d6a0" opacity="0.9"/>' +
        '<rect x="84" y="40" width="28" height="22" rx="5" fill="#06d6a0" opacity="0.9"/>' +
        '<line x1="76" y1="51" x2="84" y2="51" stroke="#06d6a0" stroke-width="3"/>' +
        '<rect x="51" y="43" width="22" height="16" rx="3" fill="#044a35"/>' +
        '<rect x="87" y="43" width="22" height="16" rx="3" fill="#044a35"/>' +
        '<rect x="54" y="46" width="7" height="5" rx="1" fill="white" opacity="0.25"/>' +
        '<path d="M 56 66 Q 80 80 104 66" stroke="#1a1a2e" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<text x="120" y="90" font-size="20">🌿</text>')
    },
    'sustainable-sage': {
      title: 'SUSTAINABLE SAGE',
      subtitle: 'Near-perfect alignment of impact and intent',
      description: 'The rarest unlock. You have achieved near-perfect harmony between what you need from AI and the footprint you leave behind. You are not just a player — you are proof it is possible.',
      tip: 'You\'ve unlocked the top tier. The next challenge: help design systems that make low-impact AI the default, not the exception. You\'re ready for that conversation.',
      byteSvg: _svg(C +
        '<rect x="58" y="17" width="44" height="7" rx="2" fill="#06d6a0"/>' +
        '<polygon points="58,17 64,7 70,17" fill="#06d6a0"/>' +
        '<polygon points="77,17 80,5 83,17" fill="#06d6a0"/>' +
        '<polygon points="90,17 96,7 102,17" fill="#06d6a0"/>' +
        '<circle cx="64" cy="11" r="2.5" fill="#00f5ff"/>' +
        '<circle cx="80" cy="7" r="3" fill="#ffbe0b"/>' +
        '<circle cx="96" cy="11" r="2.5" fill="#00f5ff"/>' +
        _EYES + BS)
    }
  };
})();

function getPersonaFromScore(score) {
  if (score <=  7)  return SCORE_PERSONAS['grid-goblin'];
  if (score <= 13)  return SCORE_PERSONAS['turbo-tapper'];
  if (score <= 19)  return SCORE_PERSONAS['casual-clicker'];
  if (score <= 24)  return SCORE_PERSONAS['eco-experimenter'];
  if (score <= 29)  return SCORE_PERSONAS['mindful-maker'];
  if (score <= 32)  return SCORE_PERSONAS['green-hacker'];
  return SCORE_PERSONAS['sustainable-sage'];
}

// ── Personalized Tip (Personalized_Tips.md) ─────────────────────
// Based on worst-impact (H) answer scenario; fallback by type B/L

// Answer type → display color (shared across script.js and data.js)
const ANSWER_TYPE_COLOR = { H: 'red', B: 'yellow', L: 'green' };

// Generic WHY explanation shown after each ethics answer
const WHY_TEXT = {
  H: 'This option relies heavily on AI, which uses significantly more energy and water. High-impact choices add up quickly across millions of users.',
  B: 'This is a balanced approach — using AI where it helps without over-relying on it. A good middle ground for most situations.',
  L: 'Great choice! Doing tasks yourself or minimising AI use has a much lighter environmental footprint and builds real skills.'
};

const PERSONALIZED_TIP_TEXT = {
  H: {
    keywords: [
      [['homework'],                   'AI is a great explainer but a poor substitute. Next time, struggle with the problem for 5 minutes first — your brain will actually remember the answer.'],
      [['learn', 'read', 'stor', 'writ'], 'Stories written by you carry your voice. Use AI for a spark of inspiration, then close the tab and write it yourself.'],
      [['draw', 'art', 'image', 'creat'], 'Every image you generate costs water and electricity. Try sketching your idea first — you might love what comes out.'],
      [['research', 'science', 'project'], 'AI summaries can miss nuance. Use it to find starting points, then dig into the sources yourself.'],
      [['cod', 'website', 'app'],       'AI-generated code often has hidden bugs. Write the logic yourself and use AI only to debug or explain concepts.']
    ],
    fallback: 'You picked the high-impact option this round. Next time, try the "do one step yourself first" rule — it reduces AI load and often produces better results.'
  },
  B: 'Good balance! You\'re on the right track. Next session, challenge yourself to take one more task fully offline — you might be surprised what you can do without AI.',
  L: 'Great choice — you kept AI use minimal and intentional. Share this habit with someone who might not have considered the footprint of their prompts.'
};

function getPersonalizedTip(ethicsAnswers, persona) {
  if (!ethicsAnswers || !ethicsAnswers.length) {
    return persona ? persona.tip : PERSONALIZED_TIP_TEXT.B;
  }
  const hAnswers = ethicsAnswers.filter(a => a.type === 'H');
  const worstAnswer = hAnswers.length > 0
    ? hAnswers.reduce((min, a) => a.score < min.score ? a : min)
    : ethicsAnswers[ethicsAnswers.length - 1];
  if (!worstAnswer) return PERSONALIZED_TIP_TEXT.B;
  const type     = worstAnswer.type || 'B';
  const scenario = (worstAnswer.category || '').toLowerCase();
  if (type === 'H') {
    for (const [keywords, tip] of PERSONALIZED_TIP_TEXT.H.keywords) {
      if (keywords.some(kw => scenario.includes(kw))) return tip;
    }
    return PERSONALIZED_TIP_TEXT.H.fallback;
  }
  return typeof PERSONALIZED_TIP_TEXT[type] === 'string'
    ? PERSONALIZED_TIP_TEXT[type]
    : PERSONALIZED_TIP_TEXT.B;
}

// ── Stamina level from cumulative score ──────────────────────────
// Maps score range 0..35 to tree levels 1..5
function calculateStaminaLevel(score) {
  if (score <=  7) return 1;
  if (score <= 14) return 2;
  if (score <= 21) return 3;
  if (score <= 28) return 4;
  return 5;
}

// Estimated daily AI-related footprint per stamina level (1=heaviest, 5=lightest)
const DAILY_FOOTPRINT = {
  1: { water: '3.5 L', co2: '520 g', energy: '0.80 kWh' },
  2: { water: '2.5 L', co2: '380 g', energy: '0.58 kWh' },
  3: { water: '1.5 L', co2: '230 g', energy: '0.35 kWh' },
  4: { water: '0.8 L', co2: '110 g', energy: '0.18 kWh' },
  5: { water: '0.3 L', co2: '35 g',  energy: '0.06 kWh' }
};

// ── Session ID generator ─────────────────────

function generateSessionId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// ── Format helpers ───────────────────────────

function formatWater(liters) {
  if (liters < 0.01) return `${(liters * 1000).toFixed(1)} ml`;
  if (liters < 1)    return `${liters.toFixed(3)} L`;
  return `${liters.toFixed(2)} L`;
}

function formatEnergy(wh) {
  if (wh < 10) return `${wh.toFixed(1)} Wh`;
  return `${wh} Wh`;
}

function formatCo2(grams) {
  if (grams < 1) return `${grams.toFixed(1)} g CO2`;
  return `${grams.toFixed(1)} g CO2`;
}
