/* ═══════════════════════════════════════════
   (AI)RCADE — Question Bank
   Source: Question_Bank.md
   15 combinations: 5 age groups × 3 expertise levels, 20 questions each
   Format per question: [scenario, A_text, A_type, B_text, B_type, C_text, C_type]
   Types: H=High AI impact (-3pts), B=Balanced (+1pt), L=Low/conscious (+4pts)
═══════════════════════════════════════════ */

// Score per type (from Scoring_Logic.md)
// H: envScore=-3, moralAdj=-1 → clamp(-3,4,-4) = -3
// B: envScore=+1, moralAdj=0  → clamp(-3,4,+1) = +1
// L: envScore=+3, moralAdj=+1 → clamp(-3,4,+4) = +4
const ANSWER_SCORES = { H: -3, B: 1, L: 4 };

// Env metric estimates per type (for legacy resource bars)
const ANSWER_METRICS = {
  H: { energy_wh: 50, water_ml: 500, co2_g: 15 },
  B: { energy_wh: 15, water_ml: 150, co2_g:  5 },
  L: { energy_wh:  2, water_ml:  20, co2_g:  1 }
};

// Raw bank: QB[ageGroup][expertise] = array of 20 questions
// Each question: [scenario, A_text, A_type, B_text, B_type, C_text, C_type]
const QB = {

  '0-12': {
    'Beginner': [
      ['homework help','Ask AI to explain what you don\'t understand.','B','Try yourself, ask your teacher if stuck.','L','Ask AI to do all your homework.','H'],
      ['learning to read','Read books yourself with a parent.','L','Let AI read everything to you.','H','Read along, ask AI to explain hard words.','B'],
      ['maths practice','Ask AI for every answer.','H','Use AI to explain how to solve problems.','B','Work out sums yourself, check with a teacher.','L'],
      ['drawing and art','Let AI make all your pictures.','H','Use AI for ideas, draw everything yourself.','B','Draw and colour everything by hand.','L'],
      ['bedtime stories','Co-create a story together with AI.','B','Ask AI to tell you a new story every night.','H','Ask a parent or read a book instead.','L'],
      ['learning a new language','Learn words with flashcards and apps.','L','Let AI translate everything for you.','H','Practise conversations with AI.','B'],
      ['spelling practice','Let AI correct all your spelling.','H','Try the spelling first, then use AI to check.','B','Write it out and ask a teacher.','L'],
      ['science projects','Research using books and ask your teacher.','L','Ask AI to design and explain your whole project.','H','Use AI to research one part, do the rest yourself.','B'],
      ['learning about animals','Use AI for facts about animals you\'re curious about.','B','Ask AI every animal question.','H','Visit the library or watch nature documentaries.','L'],
      ['asking questions about the world','Ask parents, teachers, or look in books.','L','Ask AI every question you have.','H','Ask AI some things, explore others yourself.','B'],
      ['creative storytelling','Make up the whole story in your head.','L','Ask AI for ideas, write the story yourself.','B','Ask AI to write the whole story.','H'],
      ['learning maths concepts','Use AI to explain a concept, then practise.','B','Let AI solve all your maths problems.','H','Work through examples in your textbook.','L'],
      ['learning about space','Use AI to answer specific space questions.','B','Watch space documentaries and read books.','L','Ask AI to tell you everything about space.','H'],
      ['educational games','Use AI games for all your learning.','H','Play board games and read books to learn.','L','Mix AI games with board games and books.','B'],
      ['exploring history','Use AI to summarise events, read more yourself.','B','Read history books and visit museums.','L','Ask AI to write all your history notes.','H'],
      ['making music','Let AI create all your music.','H','Learn an instrument and practise yourself.','L','Use AI to learn notes and theory, play yourself.','B'],
      ['drawing characters','Use AI for inspiration, draw characters yourself.','B','Sketch all characters entirely by hand.','L','Generate all characters with AI.','H'],
      ['playing memory games','Use AI as a hint only when really stuck.','B','Use AI to answer all memory games for you.','H','Train your memory yourself without any help.','L'],
      ['learning numbers','Ask AI to do all counting for you.','H','Count with toys and practise yourself.','L','Use AI when confused about a number concept.','B'],
      ['understanding safety online','Let AI manage all your online safety.','H','Talk to parents and teachers about staying safe.','L','Use AI to learn about staying safe online.','B']
    ],
    'Average': [
      ['research projects','Use AI for research, write the report yourself.','B','Use AI to research and write the whole project.','H','Research in books, AI only for structure check.','L'],
      ['learning to code','Use AI to write all your code.','H','Use AI to explain concepts, write code yourself.','B','Write all code yourself from tutorials.','L'],
      ['creating digital art','Create all artwork yourself in drawing apps.','L','Generate all artwork with AI.','H','Use AI for references and ideas, create yourself.','B'],
      ['writing short stories','Use AI for plot ideas, write the story yourself.','B','Use AI to write the whole story.','H','Write the full story yourself.','L'],
      ['making presentations','Let AI build the entire presentation.','H','Use AI for structure, add your own content.','B','Build and design the whole presentation yourself.','L'],
      ['music composition','Use AI for chord ideas, compose the melody yourself.','B','Use AI to compose all the music.','H','Compose everything yourself or on an instrument.','L'],
      ['interactive learning games','Use AI games only for difficult subjects.','B','Use AI games for all your studying.','H','Use books and non-AI games most of the time.','L'],
      ['creating animations','Use AI for backgrounds, animate characters yourself.','B','Create all frames manually.','L','Use AI to generate all animation frames.','H'],
      ['building simple websites','Use AI to build and write the whole website.','H','Build the website from scratch with a guide.','L','Use AI for code problems, design the site yourself.','B'],
      ['science experiments','Use AI to understand the science, design it yourself.','B','Ask AI to plan and run the whole experiment.','H','Plan and run the experiment independently.','L'],
      ['geography learning','Study maps and atlases yourself.','L','Use AI for interactive map exploration.','B','Ask AI every geography question.','H'],
      ['public speaking practice','Write and practise your speech completely yourself.','L','Use AI for structure, write and deliver yourself.','B','Ask AI to write all your speeches.','H'],
      ['creating comic strips','Create all panels and dialogue yourself.','L','Use AI to generate all panels and text.','H','Use AI for story ideas, draw all panels yourself.','B'],
      ['problem-solving challenges','Ask AI for all the answers immediately.','H','Work through all problems independently.','L','Try yourself first, use AI only as a hint.','B'],
      ['book summaries','Ask AI to summarise every book.','H','Read and summarise every book yourself.','L','Read the book, use AI to check key themes.','B'],
      ['nature identification','Use AI to learn about specific things you found.','B','Use field guides and observation to identify.','L','Use AI to identify everything automatically.','H'],
      ['environmental projects','Research with books and field visits.','L','Ask AI to plan and write the whole project.','H','Use AI for research, plan and present yourself.','B'],
      ['reading comprehension','Read yourself, use AI for hard vocabulary.','B','Use AI to answer all comprehension questions.','H','Read and answer all questions independently.','L'],
      ['creating videos','Use AI to script, edit, and produce videos.','H','Script, film, and edit everything yourself.','L','Script and film yourself, use AI for editing.','B'],
      ['learning geography','Use AI for specific places you\'re curious about.','B','Ask AI to tell you everything about countries.','H','Study maps and read books yourself.','L']
    ],
    'Expert': [
      ['building simple apps','Use AI to debug and explain tricky parts.','B','Use AI to generate all the app code.','H','Write all code yourself following documentation.','L'],
      ['understanding how AI works','Ask AI for clarification after reading yourself.','B','Ask AI to explain everything about itself.','H','Study textbooks and run small experiments yourself.','L'],
      ['training simple models','Build and train a basic model from scratch.','L','Use a template and adjust parameters yourself.','B','Use a pre-built model without customising.','H'],
      ['image recognition basics','Write a basic recognition algorithm yourself.','L','Use a cloud API without understanding it.','H','Use TensorFlow.js and learn what each part does.','B'],
      ['building a chatbot','Use a no-code builder for everything.','H','Use a simple API, write conversation logic yourself.','B','Design all logic and responses from scratch.','L'],
      ['pattern recognition','Use AI for complex patterns, find simple ones yourself.','B','Code the pattern-matching logic yourself.','L','Use AI to find all patterns automatically.','H'],
      ['coding a game','Code the entire game yourself.','L','Use AI to generate all game code.','H','Use AI to debug and explain logic.','B'],
      ['data collection projects','Use AI to collect and analyse all data.','H','Collect data yourself, use AI for cleaning.','B','Collect and organise all data manually.','L'],
      ['making a robot move','Programme all robot movements manually.','L','Use AI to control all robot movements.','H','Use AI for path planning, code basic movements yourself.','B'],
      ['AI-powered art projects','Use AI to generate all artwork.','H','Create all art yourself, AI only for colour palette.','L','Use AI for style, create the piece yourself.','B'],
      ['data visualisation','Create all visualisations manually.','L','Use AI to create all charts automatically.','H','Use a library and write the chart code yourself.','B'],
      ['natural language basics','Use a large LLM API without understanding it.','H','Write basic text-processing from scratch.','L','Use a simple NLP library and learn what it does.','B'],
      ['automation tasks','Use AI to automate everything without review.','H','Automate repetitive tasks, understand each step.','B','Do tasks manually until you understand them fully.','L'],
      ['voice commands programming','Use a speech API, write the command logic yourself.','B','Use a pre-built voice AI platform.','H','Code basic voice recognition from scratch.','L'],
      ['understanding algorithms','Ask AI to clarify things you can\'t understand yourself.','B','Ask AI to explain every algorithm.','H','Study algorithms in books and solve independently.','L'],
      ['AI ethics for kids','Read and discuss with adults, form views yourself.','L','Use AI to write all your views on AI ethics.','H','Research with AI, then form your own opinions.','B'],
      ['predicting simple outcomes','Use an AI model without understanding it.','H','Code a basic prediction rule yourself.','L','Use a simple tool and understand what it outputs.','B'],
      ['image classification','Use a cloud API for all image classification.','H','Use a pre-trained model and evaluate its results.','B','Build and train a basic classifier yourself.','L'],
      ['solving puzzles with code','Solve all puzzles independently.','L','Try yourself, use AI to check your approach.','B','Use AI to solve all coding puzzles for you.','H'],
      ['AI storytelling projects','Write the whole story yourself.','L','Use AI to generate the entire story.','H','Co-write with AI, directing the story yourself.','B']
    ]
  },

  '13-19': {
    'Beginner': [
      ['study help','Ask ChatGPT to write all your notes.','H','Study from textbooks and class notes yourself.','L','Use AI to explain topics you find hard.','B'],
      ['social media content','Use AI to create all your posts and captions.','H','Use AI for caption ideas, add your own voice.','B','Write and create all your own content.','L'],
      ['managing stress','Use an AI wellbeing app for everything.','H','Talk to a friend, counsellor, or family member.','L','Use AI for breathing exercises and tips.','B'],
      ['creative writing','Ask AI to write the full piece for you.','H','Ask AI for a story starter, write the rest yourself.','B','Write the whole piece yourself.','L'],
      ['music discovery','Browse playlists and ask friends for recommendations.','L','Use AI to find new artists, then explore yourself.','B','Let AI curate all your music automatically.','H'],
      ['gaming strategies','Figure out strategies yourself or watch gameplay.','L','Use AI for specific tips only when really stuck.','B','Ask AI for all strategies and walkthroughs.','H'],
      ['understanding the news','Ask AI to summarise all the news for you.','H','Use AI to explain complex news stories.','B','Read articles and form your own view.','L'],
      ['career exploration','Talk to people in jobs you\'re interested in.','L','Use AI to research career options, decide yourself.','B','Let AI decide which career you should choose.','H'],
      ['language learning','Use apps, take classes, practise with real people.','L','Use AI to translate everything for you.','H','Use AI to practise conversations.','B'],
      ['photography editing','Edit all your photos manually.','L','Use AI to automatically edit all your photos.','H','Use AI presets, adjust them yourself.','B'],
      ['understanding AI safety','Read articles and talk to trusted adults.','L','Ask AI to manage and explain all safety risks.','H','Use AI to learn about digital safety topics.','B'],
      ['journalling prompts','Write freely in your journal without any prompts.','L','Ask AI to write all your journal entries.','H','Use AI for prompts, write entries yourself.','B'],
      ['physical fitness','Follow a training plan from a coach or book.','L','Use AI for workout ideas, adjust to your own needs.','B','Use AI to plan all your training automatically.','H'],
      ['managing screen time','Set your own screen limits with parental support.','L','Use AI to track time, set your own rules.','B','Let AI manage and control all your screen time.','H'],
      ['cooking ideas','Use AI for recipe ideas when you have no inspiration.','B','Ask AI what to cook every single day.','H','Look up recipes in books or ask family.','L'],
      ['finding reliable information','Use AI as your only information source.','H','Search multiple sources and evaluate them yourself.','L','Use AI to find sources, check them yourself.','B'],
      ['understanding relationships','Use AI for general tips, trust your instincts.','B','Ask AI for all relationship advice.','H','Talk to trusted friends, family, or a counsellor.','L'],
      ['exam preparation','Use AI to generate all your study materials.','H','Use AI for practice questions, study yourself.','B','Prepare using past papers and your own notes.','L'],
      ['online safety','Let AI manage all your privacy settings.','H','Use AI to learn about safe online practices.','B','Follow school guidelines and talk to parents.','L'],
      ['travel planning','Ask AI to plan every detail of your trip.','H','Use AI for destination ideas, plan the rest yourself.','B','Research and plan the trip yourself.','L']
    ],
    'Average': [
      ['academic research','Use AI to find sources, research and write yourself.','B','Use AI to research and write your full paper.','H','Research using academic sources, AI for citations only.','L'],
      ['creating digital content','Use AI to generate all content you post.','H','Use AI for ideas, create all content yourself.','B','Create all content from scratch yourself.','L'],
      ['AI companion / mental health','Use an AI companion as your main emotional support.','H','Journal yourself and talk to friends or a counsellor.','L','Use AI for mood tracking, talk to real people too.','B'],
      ['college application essays','Ask AI to write your whole personal statement.','H','Write the essay completely yourself.','L','Use AI for structure, write in your own voice.','B'],
      ['learning to code','Use AI to write all your code.','H','Use AI to explain concepts and fix bugs.','B','Write code yourself, AI only for documentation.','L'],
      ['building a portfolio','Use AI for layout ideas, write descriptions yourself.','B','Use AI to write all portfolio descriptions.','H','Build and write everything yourself.','L'],
      ['debate preparation','Research and develop all arguments yourself.','L','Use AI for counterarguments, form your own views first.','B','Use AI to find all your arguments.','H'],
      ['social media strategy','Manage your own social media entirely yourself.','L','Use AI for analytics, create content yourself.','B','Use AI to run and post all your content.','H'],
      ['mental health journalling','Use AI for prompts, write reflections yourself.','B','Use AI to reflect and summarise for you.','H','Journal freely without AI involvement.','L'],
      ['exploring career paths','Let AI choose your career direction.','H','Shadow professionals and talk to mentors.','L','Use AI to research options, decide yourself.','B'],
      ['learning new skills','Use AI to do the skill on your behalf.','H','Use AI for lessons and guidance, practise yourself.','B','Learn through courses, books, and direct practice.','L'],
      ['making music','Use AI to produce your entire track.','H','Compose, record, and produce entirely yourself.','L','Use AI for beats and effects, compose yourself.','B'],
      ['sports performance','Train with your coach, no AI involved.','L','Use AI for data tracking, your coach decides training.','B','Use AI to automate all your training plans.','H'],
      ['environmental activism','Research and advocate entirely yourself.','L','Use AI for research, write and speak yourself.','B','Use AI to write all your campaign content.','H'],
      ['personal finance basics','Use AI for budgeting tools, make your own choices.','B','Budget and plan manually with a parent or book.','L','Let AI make all your financial decisions.','H'],
      ['art and design projects','Use AI for colour and composition ideas, create yourself.','B','Create all artwork completely yourself.','L','Use AI to generate all your artwork.','H'],
      ['managing online identity','Use AI to manage all your profiles.','H','Use AI for privacy tips, manage accounts yourself.','B','Handle all your accounts and privacy yourself.','L'],
      ['creative business ideas','Use AI to generate and plan the whole business.','H','Brainstorm and plan the business yourself.','L','Use AI to research similar ideas, plan yourself.','B'],
      ['peer support tools','Engage with real peer support communities.','L','Use AI to find resources, connect with real people.','B','Use an AI for all peer support.','H'],
      ['learning a new language','Learn through classes and real conversations.','L','Use AI to translate everything all the time.','H','Use AI for practice and corrections.','B']
    ],
    'Expert': [
      ['building apps and tools','Use AI to accelerate specific parts, code logic yourself.','B','Use AI to generate all code for the app.','H','Build the entire app from scratch yourself.','L'],
      ['exploring LLMs','Experiment with LLMs and learn how they actually work.','B','Use an LLM for every task without understanding it.','H','Study transformer architecture from first principles.','L'],
      ['training simple models','Train a model from scratch on your own dataset.','L','Use pre-trained models for everything.','H','Fine-tune a pre-trained model for your use case.','B'],
      ['prompt engineering','Design systematic prompts with clear objectives.','B','Use random prompts with no structure.','H','Build structured prompt pipelines with evaluation.','L'],
      ['computer vision basics','Use OpenCV and understand the processing pipeline.','B','Implement a vision algorithm from scratch.','L','Use a cloud vision API without understanding it.','H'],
      ['automating tasks','Use AI to automate everything without review.','H','Automate only after fully understanding the manual steps.','L','Script specific automations you understand and monitor.','B'],
      ['data analysis projects','Use Python/pandas for analysis, AI for clarification.','B','Write all analysis code and interpretation yourself.','L','Use AI to run and interpret all analysis.','H'],
      ['building recommendation systems','Build a collaborative filtering model with guidance.','B','Use an off-the-shelf AI recommender.','H','Implement a recommendation algorithm from scratch.','L'],
      ['neural network basics','Use a black-box deep learning framework.','H','Build a simple neural network using Keras or PyTorch.','B','Implement backpropagation from scratch in code.','L'],
      ['AI-generated music','Use AI tools for specific layers, compose the rest.','B','Use AI to produce all music automatically.','H','Compose and produce the full track yourself.','L'],
      ['API use and integration','Use AI to write all API integration code.','H','Build the API client from scratch.','L','Learn the API docs, write the integration yourself.','B'],
      ['AI for competitive gaming','Use AI to analyse game data and improve strategy.','B','Analyse your own performance without AI tools.','L','Use AI to play the game for you.','H'],
      ['AI ethics discussions','Study AI ethics from multiple sources independently.','L','Research AI ethics, form your own views.','B','Ask AI to write all your ethics arguments.','H'],
      ['creating AI-powered art','Use AI for one element, create the rest yourself.','B','Use a generative AI tool for all artwork.','H','Create entirely original work, no AI generation.','L'],
      ['AI for social causes','Plan and run the campaign entirely yourself.','L','Use AI for data analysis, lead the campaign yourself.','B','Use AI to run the entire campaign.','H'],
      ['AI in scientific projects','Use AI to run and interpret all experiments.','H','Design and run all experiments independently.','L','Use AI for literature review, run experiments yourself.','B'],
      ['building simple datasets','Use AI to generate all synthetic data.','H','Collect and clean all data entirely yourself.','L','Collect real data and use AI to clean it.','B'],
      ['fine-tuning basics','Fine-tune using a public framework you understand.','B','Implement fine-tuning from scratch.','L','Use a base model with no fine-tuning.','H'],
      ['AI career exploration','Use AI for job market research, decide yourself.','B','Let AI map your entire career path.','H','Research through interviews and self-reflection.','L'],
      ['AI journalism and media','Research and write all journalism yourself.','L','Use AI to write all your articles.','H','Use AI for research, write all articles yourself.','B']
    ]
  },

  '20-39': {
    'Beginner': [
      ['email writing','Write all your own emails.','L','Use AI to draft, then edit in your own words.','B','Ask AI to write all your emails.','H'],
      ['daily planning','Use AI to suggest tasks, make decisions yourself.','B','Plan your day yourself.','L','Let AI plan your whole day.','H'],
      ['fitness and health','Let AI plan all your workouts and diet.','H','Follow a plan from a trainer or fitness book.','L','Use AI for workout ideas, adapt to your own needs.','B'],
      ['cooking recipes','Ask AI what to cook for every meal.','H','Use AI for recipe ideas when you\'re uninspired.','B','Use cookbooks and ask friends for recipes.','L'],
      ['travel planning','Ask AI to plan every detail of your trip.','H','Research and book everything yourself.','L','Use AI for destination research, plan yourself.','B'],
      ['budget management','Track finances in a spreadsheet yourself.','L','Let AI manage all your finances.','H','Use AI budgeting tools, make your own decisions.','B'],
      ['job applications','Write all applications yourself.','L','Use AI for structure, write in your own voice.','B','Ask AI to write all your CVs and cover letters.','H'],
      ['social media','Use AI to create and post all your content.','H','Create and manage all content yourself.','L','Use AI for ideas, create the content yourself.','B'],
      ['learning new skills','Use AI to do the skill for you.','H','Learn through courses and hands-on practice.','L','Use AI for explanations, practise yourself.','B'],
      ['home organisation','Let AI plan all your home routines.','H','Use AI for ideas, implement everything yourself.','B','Plan and organise your home yourself.','L'],
      ['entertainment choices','Let AI pick all your films and shows.','H','Use AI for recommendations, choose yourself.','B','Browse reviews and ask friends what to watch.','L'],
      ['starting a side hustle','Use AI for market research, build it yourself.','B','Research and start the business yourself.','L','Ask AI to build and run your whole business.','H'],
      ['managing anxiety','Use an AI therapy app as your only support.','H','Talk to a therapist or trusted person.','L','Use AI for coping techniques, talk to people too.','B'],
      ['language learning','Take a class and practise with real speakers.','L','Use AI to translate everything for you.','H','Use AI for practice and corrections.','B'],
      ['parenting support','Talk to your GP, health visitor, and other parents.','L','Ask AI for all parenting decisions.','H','Use AI for tips, trust your own instincts.','B'],
      ['understanding news','Ask AI to summarise all news for you.','H','Use AI to explain complex stories.','B','Read multiple news sources yourself.','L'],
      ['online dating / relationships','Let AI write all your messages.','H','Use AI for icebreaker ideas, be yourself after.','B','Write your own authentic messages.','L'],
      ['home decoration ideas','Use AI for style ideas, design yourself.','B','Use AI to design your entire home.','H','Browse magazines and plan yourself.','L'],
      ['car maintenance advice','Use AI to understand a problem, get it checked.','B','Ask AI for all car maintenance decisions.','H','Take your car directly to a professional mechanic.','L'],
      ['shopping decisions','Let AI decide all your purchases.','H','Use AI for product comparisons, decide yourself.','B','Read reviews and decide yourself.','L']
    ],
    'Average': [
      ['work productivity','Handle all work tasks with your own systems.','L','Use AI for repetitive tasks, lead the important work.','B','Automate all your work tasks with AI.','H'],
      ['creative projects','Use AI to generate all creative output.','H','Use AI for ideas, create everything yourself.','B','Create entirely without AI involvement.','L'],
      ['financial planning','Use AI for analysis, make all decisions yourself.','B','Let AI make all financial decisions.','H','Plan your finances with a professional or yourself.','L'],
      ['learning to code','Use AI to explain concepts, write the code yourself.','B','Code everything yourself from documentation.','L','Use AI to write all your code.','H'],
      ['content creation','Use AI to write all your content.','H','Write all content from scratch yourself.','L','Use AI for outlines, write in your own voice.','B'],
      ['freelance work','Complete all client work yourself.','L','Use AI for research and drafting, deliver in your voice.','B','Use AI to complete all client work.','H'],
      ['starting a business','Let AI build and run your whole business.','H','Start and run the business entirely yourself.','L','Use AI for market research, build the business yourself.','B'],
      ['data analysis basics','Use AI to run all analysis automatically.','H','Use AI for complex queries, interpret results yourself.','B','Learn SQL or Excel and run all analysis yourself.','L'],
      ['career growth','Use AI for job market research, make choices yourself.','B','Ask AI to plan your entire career.','H','Network with mentors and plan your career yourself.','L'],
      ['building a personal brand','Use AI for content ideas, create and post yourself.','B','Use AI to create all your brand content.','H','Build your brand through authentic self-expression.','L'],
      ['project management','Manage projects with your own tools and experience.','L','Use AI for scheduling, lead the project yourself.','B','Let AI manage all your project decisions.','H'],
      ['market research','Use AI for data collection, analyse and decide yourself.','B','Use AI to do all market research.','H','Conduct research through interviews and direct analysis.','L'],
      ['mental wellness tools','Use an AI wellness app as your only tool.','H','Focus on human connection and professional support.','L','Use AI for tracking, engage with real people too.','B'],
      ['remote work tools','Work without AI using your own systems.','L','Use AI for meeting summaries, work independently.','B','Use AI to automate all remote work tasks.','H'],
      ['skill development','Build skills through deliberate practice only.','L','Use AI to shortcut all skill-building.','H','Use AI for guidance, put in the practice yourself.','B'],
      ['property research','Use AI for market data, decide yourself.','B','Research independently and consult a professional.','L','Use AI to make all property decisions.','H'],
      ['educational content creation','Use AI to write all your course material.','H','Create all educational content entirely yourself.','L','Use AI for structure, write the content yourself.','B'],
      ['environmental footprint tracking','Track your impact manually and make informed choices.','L','Use AI to manage all your sustainability choices.','H','Use AI to calculate footprint, make changes yourself.','B'],
      ['relationship and life coaching','Use AI for reflection prompts, seek human support.','B','Use AI as your sole life coach.','H','Work with a real coach or trusted person.','L'],
      ['managing personal health data','Share all health data with AI for decisions.','H','Use AI for tracking, consult a doctor for decisions.','B','Track health manually and consult your GP.','L']
    ],
    'Expert': [
      ['building AI-powered apps','Use AI only where it clearly outperforms simpler methods.','L','Use the right-sized model for each specific task.','B','Use the largest model available for everything.','H'],
      ['working with LLMs','Use LLMs for specific steps with clear evaluation.','B','Use LLMs only where they outperform simpler approaches.','L','Use LLMs for all text tasks without evaluation.','H'],
      ['training ML models','Train a targeted model with minimum required data.','B','Train the largest model possible on all data.','H','Use rule-based systems until ML is clearly justified.','L'],
      ['prompt engineering at scale','Design and systematically evaluate prompt pipelines.','B','Use structured templates with rigorous benchmarking.','L','Run thousands of prompts without evaluation.','H'],
      ['computer vision projects','Implement the minimum viable vision solution.','L','Use a large cloud model for all inference.','H','Use a pre-trained model fine-tuned for your use case.','B'],
      ['NLP projects','Use a smaller model suited to the specific task.','B','Use GPT-4 for all text processing.','H','Build a targeted rule-based or small-model solution.','L'],
      ['building recommendation systems','Use a simple rule-based recommender and iterate.','L','Deploy a massive system without clear metrics.','H','Build a targeted recommender with clear success criteria.','B'],
      ['automating workflows','Automate only after deeply understanding the manual flow.','L','Automate everything immediately with AI.','H','Automate specific bottlenecks after manual testing.','B'],
      ['model evaluation','Build custom evaluation datasets for your use case.','L','Evaluate on standard benchmarks for your task.','B','Skip evaluation and trust the model.','H'],
      ['fine-tuning models','Fine-tune the largest available model.','H','Evaluate whether fine-tuning is needed vs prompting.','L','Fine-tune a base model on a minimal representative dataset.','B'],
      ['deploying AI models','Deploy with full observability and rollback plans.','L','Deploy with basic logging and performance monitoring.','B','Deploy immediately with no monitoring.','H'],
      ['data pipeline creation','Define minimum data requirements before building.','L','Ingest relevant data with quality checks.','B','Ingest all available data without filtering.','H'],
      ['AI for product design','Make product decisions from direct user research.','L','Use AI for all product decisions.','H','Use AI for user research synthesis, you set direction.','B'],
      ['multimodal AI use','Use multimodal only where text alone is insufficient.','B','Use multimodal AI for every task.','H','Use the simplest input modality that solves the problem.','L'],
      ['AI ethics in practice','Conduct full ethical review before every deployment.','L','Review for bias and fairness at key milestones.','B','Ship features without ethical review.','H'],
      ['AI-assisted creative work','Create entirely yourself, AI only for technical checks.','L','Let AI do all the creative work.','H','Use AI for exploration, direct the creative output.','B'],
      ['integrating AI into teams','Introduce AI incrementally with full team understanding.','L','Integrate AI for specific team pain points.','B','Replace as many team processes as possible.','H'],
      ['object detection projects','Select a model sized to your inference constraints.','B','Implement a minimal detection pipeline for your task.','L','Use the largest detection model on all data.','H'],
      ['AI for research','Use AI for literature review, conduct research yourself.','B','Use AI to generate all research findings.','H','Use AI only for search, conduct all analysis yourself.','L'],
      ['AI for business strategy','Let AI make all strategic decisions.','H','Use your expertise to strategise, AI only for data.','L','Use AI for market and data analysis, strategise yourself.','B']
    ]
  },

  '40-59': {
    'Beginner': [
      ['health information','Consult your GP or pharmacist directly, no AI.','L','Ask AI for all health diagnoses and advice.','H','Use AI to understand symptoms, then call your GP.','B'],
      ['email assistance','Write all your own emails.','L','Ask AI to write all your emails.','H','Use AI for difficult emails, write simple ones yourself.','B'],
      ['understanding medical info','Let AI explain and make all medical decisions.','H','Discuss everything directly with your doctor.','L','Use AI to understand medical terms, then discuss with your doctor.','B'],
      ['recipes and cooking','Use cookbooks and family recipes you know well.','L','Use AI when you need cooking inspiration.','B','Ask AI what to cook for every meal.','H'],
      ['learning new technology','Ask a family member or attend a local class.','L','Use AI for step-by-step explanations.','B','Ask AI to handle all technology tasks for you.','H'],
      ['staying connected with family','Call, text, and visit family directly.','L','Use AI to write all family messages.','H','Use AI to suggest topics, write messages yourself.','B'],
      ['travel planning','Ask AI to plan every detail of your trip.','H','Use a travel agent or plan yourself.','L','Use AI for destination ideas, book yourself.','B'],
      ['shopping assistance','Read reviews and ask family for recommendations.','L','Let AI make all your shopping decisions.','H','Use AI for product comparisons, decide yourself.','B'],
      ['managing finances','Work with a financial advisor.','L','Use AI for budgeting tools, make decisions yourself.','B','Let AI handle all your financial decisions.','H'],
      ['navigation help','Use GPS with AI traffic updates.','B','Use a map and your own judgement.','L','Use full AI-powered autonomous navigation.','H'],
      ['home repair advice','Ask AI for all home repair solutions.','H','Use AI to understand the problem, hire a professional.','B','Call a tradesperson directly.','L'],
      ['managing work emails','Use AI to draft difficult replies, review and send yourself.','B','Write and manage all emails yourself.','L','Let AI write and respond to all emails.','H'],
      ['fitness tracking','Use a fitness app for tracking, set your own goals.','B','Let AI plan all exercise and diet for you.','H','Track exercise yourself with a notebook.','L'],
      ['understanding the news','Read trusted newspapers and watch news channels.','L','Ask AI to summarise all news.','H','Use AI to explain complex news stories.','B'],
      ['gardening advice','Ask AI for all gardening decisions.','H','Use AI for plant care tips, apply your own judgement.','B','Join a local gardening club and learn hands-on.','L'],
      ['managing stress','Talk to your GP or a trusted friend.','L','Use AI for relaxation techniques, also talk to people.','B','Use an AI app as your sole stress management.','H'],
      ['learning new digital skills','Use AI to handle all digital tasks for you.','H','Take a local IT course or ask family for help.','L','Use AI for step-by-step guidance.','B'],
      ['home organisation','Let AI plan all your home routines.','H','Organise your home your own way.','L','Use AI for organisation ideas, implement yourself.','B'],
      ['understanding AI safety','Ask AI to manage all your online safety.','H','Use AI to learn about digital safety topics.','B','Attend a local digital safety workshop.','L'],
      ['entertainment choices','Let AI choose everything you watch and read.','H','Ask friends and read reviews.','L','Use AI for recommendations, choose yourself.','B']
    ],
    'Average': [
      ['work automation','Automate all work processes with AI.','H','Handle all work processes with your own expertise.','L','Use AI to automate routine tasks, lead strategic work.','B'],
      ['financial planning','Let AI make all investment and saving decisions.','H','Use AI for market analysis, make all decisions yourself.','B','Work with a financial advisor for all planning.','L'],
      ['managing a team','Use AI for scheduling and data, lead the team yourself.','B','Use AI to manage all team communication.','H','Manage the team entirely with your own judgement.','L'],
      ['business strategy','Let AI generate all your business strategy.','H','Use AI for market data, apply your own expertise.','B','Develop strategy entirely from your own experience.','L'],
      ['training new staff','Train staff personally from your own experience.','L','Use AI to deliver all staff training.','H','Use AI for content, deliver training yourself.','B'],
      ['managing projects','Use AI for timelines and reporting, you lead.','B','Manage all projects with your own tools.','L','Use AI to manage all project decisions.','H'],
      ['professional development','Use AI for course recommendations, decide yourself.','B','Plan your development through mentors and experience.','L','Let AI plan all your professional growth.','H'],
      ['understanding market trends','Use AI to interpret all market data for you.','H','Read industry reports and talk to peers.','L','Use AI for data gathering, interpret the data yourself.','B'],
      ['managing chronic conditions','Use AI to track symptoms, consult your doctor.','B','Manage with your doctor and established routines.','L','Use AI to make all health management decisions.','H'],
      ['community involvement','Use AI for draft communications, review and personalise.','B','Engage with your community authentically, no AI.','L','Use AI to write all community communications.','H'],
      ['career transitions','Use AI for job market research, decide yourself.','B','Work with a career coach and trusted mentors.','L','Let AI plan your entire career change.','H'],
      ['small business management','Run the business using your expertise and judgement.','L','Automate all business operations with AI.','H','Use AI for admin tasks, lead the business yourself.','B'],
      ['elder care planning','Let AI make all elder care decisions.','H','Use AI to research care options, decide with family.','B','Consult specialists and decide with your family.','L'],
      ['retirement planning','Use AI for projections, decide with a financial advisor.','B','Plan retirement with a professional advisor.','L','Let AI manage all your retirement finances.','H'],
      ['wellbeing and mindfulness','Use AI for guided practices, prioritise human connection.','B','Focus on relationships and professional guidance.','L','Use an AI wellness app as your only approach.','H'],
      ['real estate decisions','Use AI for market data, decide with an estate agent.','B','Work with a trusted agent and decide yourself.','L','Let AI make all property decisions.','H'],
      ['parenting teenagers','Use AI for all parenting guidance.','H','Talk directly to your teenager and seek family support.','L','Use AI for tips, apply your own judgement.','B'],
      ['content creation for work','Create all work content yourself.','L','Use AI for structure, write in your own words.','B','Use AI to create all work presentations.','H'],
      ['learning new digital tools','Attend a training session or learn with a colleague.','L','Use AI for tutorials, learn the tools yourself.','B','Use AI to handle all new tools for you.','H'],
      ['exploring new career options','Let AI decide your next career move.','H','Talk to mentors and people working in the field.','L','Use AI for research, trust your own instincts.','B']
    ],
    'Expert': [
      ['AI strategy for business','Deploy AI across all operations immediately.','H','Define clear outcomes before any AI adoption.','L','Identify high-value use cases and pilot carefully.','B'],
      ['data-driven decision making','Use data as one input alongside expertise and judgement.','L','Use AI for analysis, you make the final call.','B','Let AI make all business decisions.','H'],
      ['building AI workflows','Automate every workflow with AI immediately.','H','Map manual workflows fully before automating any.','L','Automate specific workflows where ROI is clear.','B'],
      ['leading AI adoption','Pilot with a willing team and learn before scaling.','B','Build AI literacy across the organisation first.','L','Roll out AI to every team at once.','H'],
      ['machine learning for business','Use the largest ML model for every problem.','H','Use ML only where simpler methods clearly fall short.','L','Select the minimal model that solves the business need.','B'],
      ['automating business processes','Automate every process without reviewing them.','H','Automate high-volume, low-judgement processes first.','B','Audit every process thoroughly before any automation.','L'],
      ['AI in product management','Set roadmap from direct customer insight and strategy.','L','Use AI for customer data analysis, you set direction.','B','Use AI to make all product roadmap decisions.','H'],
      ['evaluating AI tools','Test rigorously against your current benchmark first.','L','Adopt every new AI tool as it launches.','H','Evaluate tools against specific business criteria.','B'],
      ['managing AI ethics','Develop and enforce internal AI ethics principles.','L','Delegate all AI ethics to a third party.','H','Embed ethical review into your own product process.','B'],
      ['large-scale data analysis','Run AI on all data without curation.','H','Curate relevant datasets and validate AI outputs.','B','Perform targeted analysis with expert interpretation.','L'],
      ['predictive analytics','Validate predictions against domain expertise before acting.','L','Run AI predictions on everything automatically.','H','Use predictive models for specific high-value decisions.','B'],
      ['customer segmentation','Use AI to segment all customers automatically.','H','Segment manually based on your customer understanding.','L','Use AI for initial clustering, validate with domain knowledge.','B'],
      ['AI governance','Outsource all AI governance to a third party.','H','Establish governance before any AI system goes live.','L','Build an internal governance framework with clear ownership.','B'],
      ['financial modelling with AI','Build all models yourself, AI only for sense-checking.','L','Use AI to accelerate modelling, validate every assumption.','B','Let AI run all financial models.','H'],
      ['training internal AI systems','Define success criteria rigorously before training.','L','Train on all available company data.','H','Identify minimum data needed to solve the specific problem.','B'],
      ['AI in healthcare management','Automate all clinical decision support.','H','Clinician-led decisions, AI as a documentation tool only.','L','Use AI for admin and scheduling, clinicians lead clinical decisions.','B'],
      ['supply chain optimisation','Use AI for demand forecasting, managers handle disruptions.','B','Use expertise and supplier relationships to manage supply.','L','Use AI to make all supply chain decisions.','H'],
      ['building AI teams','Build teams with deep domain expertise first, AI skills second.','L','Hire for AI literacy across diverse roles with human oversight.','B','Replace as many roles as possible with AI.','H'],
      ['AI for risk management','Use expert frameworks and stress-test with AI scenarios.','L','Automate all risk decisions with AI.','H','Use AI for risk scanning, human judgement for assessment.','B'],
      ['digital transformation leadership','Change management first, technology second.','L','Automate all business processes at once.','H','Sequence transformation around business-critical areas.','B']
    ]
  },

  '60+': {
    'Beginner': [
      ['staying in touch with family','Use AI to help draft a message, send it yourself.','B','Call, text, and visit family directly.','L','Use AI to write and send all your messages.','H'],
      ['getting health information','Call your GP or pharmacist directly.','L','Ask AI for all health diagnoses.','H','Use AI to understand symptoms, then call your GP.','B'],
      ['understanding medication','Ask your pharmacist or doctor directly.','L','Ask AI for all medication advice.','H','Use AI to understand what medications do, confirm with your pharmacist.','B'],
      ['finding recipes','Use AI when you can\'t think of anything to cook.','B','Ask AI for every meal every day.','H','Use cookbooks and family recipes you know.','L'],
      ['managing daily reminders','Let AI manage all your reminders.','H','Write reminders on paper or in a diary.','L','Use an AI assistant alongside your own methods.','B'],
      ['understanding the news','Use AI to explain a complex story you\'ve seen.','B','Ask AI to summarise all news.','H','Watch the news on TV or read a trusted newspaper.','L'],
      ['watching videos and entertainment','Use AI for suggestions, choose what interests you.','B','Ask family or friends what to watch.','L','Let AI choose everything you watch.','H'],
      ['shopping assistance','Use AI for price comparisons, decide yourself.','B','Let AI make all your shopping decisions.','H','Shop as you always have, ask for help when needed.','L'],
      ['learning basic smartphone use','Use AI to learn how to do things step by step.','B','Ask a family member or go to a digital help session.','L','Let AI control your phone for you.','H'],
      ['simple language translation','Use a phrasebook or ask someone who speaks the language.','L','Use AI to translate all conversations.','H','Use AI for a key phrase or word when needed.','B'],
      ['listening to audiobooks','Let AI summarise all books for you.','H','Ask your library or local bookshop for suggestions.','L','Use AI to find audiobooks you\'ll enjoy.','B'],
      ['managing finances simply','Use AI to understand a bill or statement.','B','Let AI make all your financial decisions.','H','Work with your bank, family, or a financial advisor.','L'],
      ['remembering important dates','Let AI track all important dates for you.','H','Use AI as a reminder tool alongside your own calendar.','B','Write important dates in a paper diary.','L'],
      ['understanding government services','Use AI to understand a letter or form, confirm with the office.','B','Ask AI for all government service information.','H','Call or visit the relevant government office directly.','L'],
      ['getting emergency help','Rely on AI for all emergency guidance.','H','Know the emergency numbers and call directly.','L','Use AI for non-urgent help, know emergency numbers.','B'],
      ['learning about current events','Ask AI for a full daily news briefing.','H','Watch local news or read a newspaper.','L','Use AI to explain a specific story.','B'],
      ['tracking fitness','Let AI control all your exercise routines.','H','Walk daily and use your own judgement.','L','Use a step counter app, set your own goals.','B'],
      ['staying mentally active','Do crosswords, read books, and socialise regularly.','L','Use AI for one new challenge each week.','B','Use AI for all puzzles and mental exercises.','H'],
      ['weather and travel info','Ask AI for a fully planned travel route.','H','Ask AI for the forecast and transport options.','B','Check weather on TV and ring for transport info.','L'],
      ['online safety for seniors','Attend a local digital safety session with family.','L','Use AI to learn about staying safe online.','B','Let AI manage all your online security.','H']
    ],
    'Average': [
      ['managing health conditions','Work with your healthcare team and manage yourself.','L','Use AI for tracking and research, consult your doctor.','B','Use AI to manage all health decisions.','H'],
      ['learning new digital skills','Take a local digital skills course.','L','Use AI to do all digital tasks for you.','H','Use AI for guided learning, practise yourself.','B'],
      ['staying socially connected','Use AI to help initiate contact, maintain real relationships.','B','Use AI for all social interaction.','H','Call, meet, and write to people directly.','L'],
      ['life memoir writing','Use AI for structure and prompts, write in your own voice.','B','Write your memoir entirely yourself.','L','Use AI to write your entire memoir.','H'],
      ['learning a new language','Take a language class and practise with real speakers.','L','Use AI for practice and pronunciation correction.','B','Use AI to translate everything for you.','H'],
      ['genealogy research','Use AI for database searches, interpret findings yourself.','B','Search family records and archives yourself.','L','Use AI to find and interpret all family history.','H'],
      ['creative hobbies','Use AI for inspiration, create everything yourself.','B','Follow your creative instincts without AI.','L','Use AI to create all your hobby outputs.','H'],
      ['grandchildren education support','Ask AI to provide all educational help.','H','Use AI for resources, explain and support directly.','B','Support grandchildren directly from your own knowledge.','L'],
      ['managing multiple medications','Use a digital pill organiser with reminders.','B','Use a physical pill organiser and your own routine.','L','Use AI to manage all medication schedules.','H'],
      ['cognitive health activities','Use AI for one new challenge regularly.','B','Do puzzles, read, and socialise for brain health.','L','Use AI for all brain training.','H'],
      ['travel research','Use a travel agent and plan the trip yourself.','L','Use AI for destination options, plan the details yourself.','B','Let AI plan your entire trip.','H'],
      ['volunteering and community','Use AI for drafting messages, show up and engage yourself.','B','Engage with your community entirely in person.','L','Use AI to do all volunteering communications.','H'],
      ['religious and spiritual content','Use AI to find texts and resources, practise yourself.','B','Engage with your faith community directly.','L','Use AI for all religious study and practice.','H'],
      ['housing and downsizing','Consult a property professional and your family.','L','Use AI for market information, decide with family.','B','Let AI make all housing decisions.','H'],
      ['legacy planning','Use AI for information, work with a solicitor.','B','Work entirely with a solicitor and your family.','L','Let AI draft all your estate and legacy documents.','H'],
      ['understanding investment basics','Use AI for information, decide with a financial advisor.','B','Let AI make all investment decisions.','H','Work with a trusted financial advisor.','L'],
      ['small business consulting','Apply your expertise without AI assistance.','L','Use AI for research, apply your own expertise.','B','Use AI for all client advice.','H'],
      ['environmental awareness','Use AI to manage all your sustainability choices.','H','Make changes based on your own research and values.','L','Use AI for information, make your own choices.','B'],
      ['teaching and mentoring','Use AI to deliver all mentoring content.','H','Mentor entirely from your own knowledge and experience.','L','Use AI for resources, mentor from your own experience.','B'],
      ['AI for physical accessibility','Use full AI accessibility tools for everything.','H','Use established accessibility tools and human support.','L','Use AI tools for specific accessibility needs.','B']
    ],
    'Expert': [
      ['exploring AI tools professionally','Test tools rigorously using your expertise as the standard.','L','Use every new AI tool without evaluation.','H','Evaluate AI tools against your professional criteria.','B'],
      ['writing and publishing','Use AI for research and structure, write yourself.','B','Use AI to write and publish everything.','H','Write entirely in your own voice, AI only for fact-checking.','L'],
      ['research and analysis','Use AI for literature search, conduct analysis yourself.','B','Use your expertise for all research and interpretation.','L','Use AI to conduct and interpret all research.','H'],
      ['mentoring with AI','Use AI to find resources, mentor from your own experience.','B','Let AI do all the mentoring.','H','Mentor entirely from your own knowledge and relationships.','L'],
      ['understanding LLMs','Learn how LLMs work and use them deliberately.','B','Use LLMs for all tasks without understanding.','H','Understand the architecture before using any LLM tools.','L'],
      ['contributing to AI ethics','Use AI to write all your ethics positions.','H','Research positions and think them through, write yourself.','B','Develop positions independently from your own values and experience.','L'],
      ['community AI education','Use AI to deliver all community education.','H','Teach entirely from your experience and prepared materials.','L','Use AI for resources, teach from your own knowledge.','B'],
      ['digital archiving','Use AI for metadata generation, review each entry yourself.','B','Organise and describe archives using your own expertise.','L','Use AI to organise and describe all archives.','H'],
      ['health data analysis','Discuss all health data directly with your healthcare team.','L','Use AI to interpret all personal health data.','H','Use AI for pattern recognition, interpret with your doctor.','B'],
      ['building simple automations','Automate everything without understanding steps.','H','Automate specific repetitive tasks you fully understand.','B','Only automate tasks where you could explain each step.','L'],
      ['teaching AI basics','Use AI to deliver all your AI teaching.','H','Develop and teach all content from your own understanding.','L','Use AI for examples, teach the concepts yourself.','B'],
      ['AI for professional legacy work','Use AI to recreate and publish all past work.','H','Use AI for organisation and formatting, write yourself.','B','Present your work entirely in your own words.','L'],
      ['understanding AI policy','Ask AI for all your policy positions.','H','Engage with policy debates from your own expertise.','L','Research multiple sources, form views independently.','B'],
      ['contributing to open knowledge','Use AI for structure, write content from your knowledge.','B','Use AI to write all your contributions.','H','Contribute entirely from your own expertise.','L'],
      ['creative AI projects','Create entirely yourself, AI only for technical tasks.','L','Use AI to generate all creative output.','H','Co-create with AI, directing all the creative choices.','B'],
      ['sharing expertise via AI','Let AI represent your expertise entirely.','H','Share your expertise directly through writing and speaking.','L','Use AI for reach and formatting, your knowledge is the content.','B'],
      ['evaluating AI tools critically','Adopt tools based on marketing claims.','H','Test tools rigorously using your domain expertise.','L','Evaluate tools against your own professional benchmarks.','B'],
      ['intergenerational AI collaboration','Collaborate directly with no AI mediation.','L','Use AI as a substitute for collaboration.','H','Use AI to facilitate intergenerational knowledge sharing.','B'],
      ['understanding AI risks','Ask AI to explain all AI risks.','H','Develop your risk assessment from first principles.','L','Read widely and form your own risk assessment.','B'],
      ['AI in retirement communities','Keep all community relationships fully human-led.','L','Deploy AI for all community operations.','H','Pilot AI for specific admin tasks, keep relationships human.','B']
    ]
  }

};

// Map dropdown values to QB keys
function mapAgeGroup(userAge) {
  const map = {
    '0-12':  '0-12',
    '13-19': '13-19',
    '20-39': '20-39',
    '40-59': '40-59',
    '60+':   '60+'
  };
  return map[userAge] || '20-39';
}

function mapExpertise(userExpertise) {
  const map = {
    'Beginner': 'Beginner',
    'Average':  'Average',
    'Expert':   'Expert'
  };
  return map[userExpertise] || 'Beginner';
}

// Select 5 random unique questions from the correct bank
function selectQuestionsFromBank(userAge, userExpertise) {
  const ageKey = mapAgeGroup(userAge);
  const expKey = mapExpertise(userExpertise);
  const pool   = QB[ageKey][expKey];
  if (!pool || pool.length === 0) return [];

  // Fisher-Yates shuffle and take 5
  const arr = pool.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 5).map(raw => ({
    question: 'How do you use AI? For ' + raw[0] + '.',
    scenario: raw[0],
    A: buildOption(raw[1], raw[2]),
    B: buildOption(raw[3], raw[4]),
    C: buildOption(raw[5], raw[6])
  }));
}

function buildOption(text, type) {
  const m = ANSWER_METRICS[type];
  return {
    text,
    type,
    score:     ANSWER_SCORES[type],
    energy_wh: m.energy_wh,
    water_ml:  m.water_ml,
    co2_g:     m.co2_g
  };
}

// Icon steps for consumption meters based on cumulative score
// Total range: -15 (worst) to +20 (best)
const ICON_STEPS = {
  water: [
    { icon: '🥤', label: 'Glass of water',    threshold: 15  },  // step 1 best
    { icon: '🍶', label: 'Bottle of water',   threshold: 5   },  // step 2
    { icon: '🫙', label: 'Demijohn',          threshold: -4  },  // step 3
    { icon: '🛢️', label: 'Barrel',            threshold: -99 }   // step 4 worst
  ],
  co2: [
    { icon: '🌳🌲🌳', label: 'Forest',        threshold: 15  },
    { icon: '🌳',    label: 'Single tree',    threshold: 5   },
    { icon: '🌿',    label: 'Leafless tree',  threshold: -4  },
    { icon: '💨',    label: 'Emissions',      threshold: -99 }
  ],
  energy: [
    { icon: '🕯️', label: 'Candle',           threshold: 15  },
    { icon: '💡', label: 'Light bulb',        threshold: 5   },
    { icon: '🪔', label: 'Lamp',              threshold: -4  },
    { icon: '🏮', label: 'Lamp post',         threshold: -99 }
  ]
};

function getIconStep(category, totalScore) {
  const steps = ICON_STEPS[category];
  for (const step of steps) {
    if (totalScore >= step.threshold) return step;
  }
  return steps[steps.length - 1];
}
