// Industry question bank — 20 questions per industry, randomly select 5 per session

export const QUESTION_BANK = {
"Architecture & Construction":[
{id:1,text:"You need concept renders for 10 design variations for a client pitch.",options:[
{label:"A",text:"Generate all 10 with AI image generation at maximum resolution.",energyWh:336,waterMl:235,co2g:134,weight:1,moralScore:0,impactLabel:"10 full AI renders"},
{label:"B",text:"AI-generate 3 key concepts and sketch the rest by hand.",energyWh:84,waterMl:59,co2g:34,weight:3,moralScore:1,impactLabel:"3 AI + 7 hand sketches"},
{label:"C",text:"Hand-sketch all variations and scan them for the presentation.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully hand-drawn"},
]},
{id:2,text:"You have 2 years of building sensor data to analyse for energy optimisation.",options:[
{label:"A",text:"Feed the full dataset into a large AI model for deep analysis.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"Full AI dataset analysis"},
{label:"B",text:"Use a lightweight script on pre-filtered monthly summaries.",energyWh:55,waterMl:39,co2g:22,weight:3,moralScore:1,impactLabel:"Lightweight script analysis"},
{label:"C",text:"Review the data manually using spreadsheet pivot tables.",energyWh:2,waterMl:1,co2g:1,weight:5,moralScore:2,impactLabel:"Manual spreadsheet review"},
]},
{id:3,text:"Your firm needs permit compliance checks done across 40 technical drawings.",options:[
{label:"A",text:"Run all 40 drawings through an AI document checker continuously.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI batch compliance scan"},
{label:"B",text:"Use AI only on the flagged sections after a manual first pass.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"Targeted AI check"},
{label:"C",text:"Check compliance manually against the regulation checklist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual checklist review"},
]},
{id:4,text:"A client wants real-time energy simulation for different facade options.",options:[
{label:"A",text:"Run continuous AI simulation for every change the client requests.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"Continuous AI simulation"},
{label:"B",text:"Run simulation for the 3 finalist options after narrowing down manually.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"Selective simulation runs"},
{label:"C",text:"Use standard energy calculation tables and manual estimates.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual estimation"},
]},
{id:5,text:"You need a structural load analysis for a complex cantilevered section.",options:[
{label:"A",text:"Use AI-assisted FEM with thousands of load combination scenarios.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI-powered FEM sweep"},
{label:"B",text:"Run targeted FEM for the 5 critical load cases only.",energyWh:75,waterMl:53,co2g:30,weight:3,moralScore:1,impactLabel:"Targeted structural FEM"},
{label:"C",text:"Apply code-compliant manual calculation methods.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual structural calc"},
]},
{id:6,text:"You are simulating pedestrian flow for a new public building layout.",options:[
{label:"A",text:"Run a full AI agent-based simulation with 10,000 virtual pedestrians.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"Full AI crowd simulation"},
{label:"B",text:"Use a simple rule-based model with 200 agents and standard flow data.",energyWh:45,waterMl:32,co2g:18,weight:3,moralScore:1,impactLabel:"Lightweight agent model"},
{label:"C",text:"Apply published pedestrian flow guidelines manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Guideline-based manual"},
]},
{id:7,text:"A client needs a 20-page project progress report by end of day.",options:[
{label:"A",text:"Have AI draft the full report from your raw meeting notes.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"Full AI report draft"},
{label:"B",text:"Use AI for the executive summary; write technical sections yourself.",energyWh:40,waterMl:28,co2g:16,weight:4,moralScore:1,impactLabel:"AI summary + manual body"},
{label:"C",text:"Write the full report yourself from your project notes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual report writing"},
]},
{id:8,text:"You need to optimise the bill of quantities to reduce material waste.",options:[
{label:"A",text:"Feed the entire BIM model into an AI optimiser for all materials.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"Full AI BOQ optimisation"},
{label:"B",text:"Use AI on the three most expensive material categories only.",energyWh:65,waterMl:46,co2g:26,weight:3,moralScore:1,impactLabel:"Targeted material AI"},
{label:"C",text:"Review quantities manually and apply known waste reduction factors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual BOQ review"},
]},
{id:9,text:"Your construction site needs automated safety monitoring across 6 cameras.",options:[
{label:"A",text:"Deploy AI video analysis on all 6 feeds continuously, 24/7.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"24/7 AI video monitoring"},
{label:"B",text:"Run AI monitoring only during active working hours on key feeds.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"Scheduled AI monitoring"},
{label:"C",text:"Have site supervisors conduct scheduled manual safety walkthroughs.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual site inspections"},
]},
{id:10,text:"You want to speed up your daily task scheduling and time-blocking routine.",options:[
{label:"A",text:"Use an AI assistant that monitors your calendar and reschedules automatically.",energyWh:150,waterMl:105,co2g:60,weight:2,moralScore:0,impactLabel:"Always-on AI scheduler"},
{label:"B",text:"Ask AI once each Monday to suggest your weekly plan.",energyWh:12,waterMl:8,co2g:5,weight:5,moralScore:1,impactLabel:"Weekly AI plan only"},
{label:"C",text:"Plan your own week in a paper notebook each Monday morning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Paper-based planning"},
]},
{id:11,text:"Your practice needs to handle five times more projects simultaneously.",options:[
{label:"A",text:"Deploy AI project management across every workflow automatically.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"Full AI project management"},
{label:"B",text:"Add AI only to the bottleneck areas like scheduling and quality control.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"Targeted AI at bottlenecks"},
{label:"C",text:"Hire additional staff and maintain current manual processes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Scale via hiring"},
]},
{id:12,text:"A client wants an interactive virtual walkthrough of the unbuilt design.",options:[
{label:"A",text:"Build a full AI-rendered real-time VR environment.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"Real-time AI VR"},
{label:"B",text:"Create a pre-rendered 360 degree video tour instead.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"Pre-rendered video tour"},
{label:"C",text:"Walk the client through physical scale models and drawings.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical model walkthrough"},
]},
{id:13,text:"Multiple subcontractors are competing for the same limited crane time.",options:[
{label:"A",text:"Use AI to continuously re-optimise crane allocation in real time.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"Real-time AI crane scheduling"},
{label:"B",text:"Update a shared spreadsheet each morning with the day plan.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Daily spreadsheet plan"},
{label:"C",text:"Hold a 15-minute daily coordination meeting between all contractors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Daily meeting"},
]},
{id:14,text:"You want to explore radically different structural approaches for a project.",options:[
{label:"A",text:"Generate 50 or more AI structural form explorations parametrically.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"50+ AI explorations"},
{label:"B",text:"Use AI to generate 8 variations based on 2 principles you define.",energyWh:65,waterMl:46,co2g:26,weight:3,moralScore:1,impactLabel:"Guided AI exploration"},
{label:"C",text:"Sketch 5 structural options by hand from your own knowledge.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Hand-sketched exploration"},
]},
{id:15,text:"A discrepancy in the structural calculations could cause project delays.",options:[
{label:"A",text:"Run the entire model through an AI error-detection engine.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI full model scan"},
{label:"B",text:"Use AI to check only the flagged calculation section.",energyWh:50,waterMl:35,co2g:20,weight:4,moralScore:1,impactLabel:"Targeted AI check"},
{label:"C",text:"Manually trace the calculation chain back to the source of the error.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual trace"},
]},
{id:16,text:"You need to forecast the cost impact of a change in material prices.",options:[
{label:"A",text:"Use an AI model with live commodity market data for instant forecasting.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"Live AI cost model"},
{label:"B",text:"Run a three-scenario analysis in a spreadsheet with high/mid/low bands.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet scenario"},
{label:"C",text:"Apply standard contingency percentages from your firm's historical data.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Historical contingency"},
]},
{id:17,text:"You need technical specifications for 30 building components.",options:[
{label:"A",text:"Use AI to auto-generate all 30 spec documents from product data sheets.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI auto-spec all 30"},
{label:"B",text:"Use AI to draft the 5 non-standard specs; use templates for the rest.",energyWh:45,waterMl:32,co2g:18,weight:4,moralScore:1,impactLabel:"AI 5 custom + templates"},
{label:"C",text:"Populate all specs manually from the established template library.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual template library"},
]},
{id:18,text:"A junior architect needs to learn building regulations quickly.",options:[
{label:"A",text:"Give them full access to an AI tutor for all their regulation questions.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"Full AI tutoring"},
{label:"B",text:"Point them to the official code; use AI only for clarification summaries.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Official docs + AI summary"},
{label:"C",text:"Pair them with a senior architect for guided mentored learning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior mentorship"},
]},
{id:19,text:"You need to quality-check 60 construction drawings before formal submission.",options:[
{label:"A",text:"Run all 60 drawings through an AI checking tool automatically.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI QC all drawings"},
{label:"B",text:"Use AI for the 10 complex drawings; manually check the rest.",energyWh:55,waterMl:39,co2g:22,weight:4,moralScore:1,impactLabel:"AI complex + manual simple"},
{label:"C",text:"Conduct a full manual drawing review with a printed checklist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual checklist review"},
]},
{id:20,text:"A severe storm is forecast and you need to rapidly assess site risk.",options:[
{label:"A",text:"Deploy AI to scan all site data and simulate every risk scenario.",energyWh:390,waterMl:273,co2g:156,weight:1,moralScore:0,impactLabel:"Full AI risk simulation"},
{label:"B",text:"Use AI to flag the top 5 critical risk areas from the site plan.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"AI-assisted risk triage"},
{label:"C",text:"Walk the site with the safety officer and apply the emergency protocol.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual site emergency check"},
]},
],
"Art & Design":[
{id:1,text:"A client needs 20 unique social media visuals for a campaign launch.",options:[
{label:"A",text:"Generate all 20 with an AI image generator.",energyWh:280,waterMl:196,co2g:112,weight:1,moralScore:0,impactLabel:"20 AI-generated images"},
{label:"B",text:"Design 5 master templates manually and use AI for variation fills.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"5 templates + AI variants"},
{label:"C",text:"Design all 20 manually using the existing brand asset library.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual design"},
]},
{id:2,text:"You want to research current visual trends across Instagram and Pinterest.",options:[
{label:"A",text:"Use an AI trend analysis tool to continuously monitor both platforms.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI continuous monitoring"},
{label:"B",text:"Run a one-off AI scrape and summary of the last 3 months.",energyWh:55,waterMl:39,co2g:22,weight:3,moralScore:1,impactLabel:"One-off AI analysis"},
{label:"C",text:"Browse manually and save inspiration to a physical mood board.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:2,impactLabel:"Manual trend research"},
]},
{id:3,text:"A brand needs 100 icon variations in different colours and styles.",options:[
{label:"A",text:"Use AI to auto-generate all 100 variations.",energyWh:340,waterMl:238,co2g:136,weight:1,moralScore:0,impactLabel:"100 AI icon variants"},
{label:"B",text:"Draw 10 master icons and script batch colour variations.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"10 masters + scripted vars"},
{label:"C",text:"Create all icons manually in Illustrator.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual icon creation"},
]},
{id:4,text:"You are in a client meeting and need to mock up a design direction on the spot.",options:[
{label:"A",text:"Generate multiple AI mockups live during the meeting.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"Live AI mockup generation"},
{label:"B",text:"Sketch a rough concept and show a related portfolio example.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Sketch + portfolio ref"},
{label:"C",text:"Describe the direction verbally and follow up with a formal proposal.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Verbal + written proposal"},
]},
{id:5,text:"You need a colour palette for a rebrand that works across digital and print.",options:[
{label:"A",text:"Use AI to generate and test 200 palette combinations automatically.",energyWh:165,waterMl:116,co2g:66,weight:2,moralScore:0,impactLabel:"200 AI palette combos"},
{label:"B",text:"Use an AI colour tool to evaluate your own hand-selected palette options.",energyWh:12,waterMl:8,co2g:5,weight:5,moralScore:1,impactLabel:"AI validates manual choice"},
{label:"C",text:"Build the palette manually using colour theory and brand guidelines.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual colour theory"},
]},
{id:6,text:"You are designing for print and need to simulate the finished production result.",options:[
{label:"A",text:"Use AI-powered proofing software to run every press simulation variant.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI full press simulation"},
{label:"B",text:"Use a standard soft-proof colour profile and print one physical proof.",energyWh:4,waterMl:3,co2g:2,weight:5,moralScore:1,impactLabel:"Soft-proof + 1 print"},
{label:"C",text:"Order a printer's proof and review it physically.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical printer proof"},
]},
{id:7,text:"A client sent a vague brief and you need to respond with creative ideas.",options:[
{label:"A",text:"Feed the brief to AI and generate 15 concept directions.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI-generated concepts"},
{label:"B",text:"Write a clarifying question list, then draft 3 concepts yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual concept response"},
{label:"C",text:"Call the client to discuss the brief before any concept work.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Client call first"},
]},
{id:8,text:"Your studio handles 30 plus client projects and needs faster asset handoff.",options:[
{label:"A",text:"Use AI to auto-organise, tag, and export all client assets.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI asset management"},
{label:"B",text:"Set up a consistent folder structure and naming system manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual asset organisation"},
{label:"C",text:"Dedicate 30 minutes at the end of each project to manual handoff.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual handoff process"},
]},
{id:9,text:"You need to ensure visual consistency across 50 pieces of a design system.",options:[
{label:"A",text:"Run AI analysis on every file for style deviation detection.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI consistency scan"},
{label:"B",text:"Use a linting script against your shared component library.",energyWh:8,waterMl:6,co2g:3,weight:5,moralScore:1,impactLabel:"Automated linting"},
{label:"C",text:"Do a visual review session with the whole design team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual team review"},
]},
{id:10,text:"You feel creatively blocked on a personal project and want fresh inspiration.",options:[
{label:"A",text:"Ask AI to generate 40 visual inspiration images for your brief.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"40 AI inspiration images"},
{label:"B",text:"Ask AI for 5 creative direction prompts based on your concept.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"5 AI creative prompts"},
{label:"C",text:"Take a walk, visit a gallery, or browse physical books for inspiration.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Offline inspiration"},
]},
{id:11,text:"A client wants 500 product images with background removal and restyling.",options:[
{label:"A",text:"Use AI to batch-process all 500 images fully automatically.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI batch 500 images"},
{label:"B",text:"Use automated background removal; style manually in batches.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"Auto removal + manual style"},
{label:"C",text:"Process each image manually in Photoshop.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:2,impactLabel:"Manual image editing"},
]},
{id:12,text:"A client keeps requesting minor logo revisions after a completed delivery.",options:[
{label:"A",text:"Use AI to auto-generate alternative versions for each revision request.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"AI revision generation"},
{label:"B",text:"Address revisions manually and propose a revision limit for the contract.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual + scope discussion"},
{label:"C",text:"Call the client to understand the underlying concern before any changes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Client call + manual"},
]},
{id:13,text:"You need to allocate studio time across 8 active projects for the coming week.",options:[
{label:"A",text:"Use an AI project tool to continuously rebalance all studio work.",energyWh:155,waterMl:109,co2g:62,weight:2,moralScore:0,impactLabel:"AI studio planning"},
{label:"B",text:"Use a shared spreadsheet to assign hours every Monday morning.",energyWh:2,waterMl:1,co2g:1,weight:5,moralScore:1,impactLabel:"Weekly spreadsheet plan"},
{label:"C",text:"Hold a 15-minute weekly team standup to allocate work manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual team standup"},
]},
{id:14,text:"You want to explore a completely new visual style for your portfolio.",options:[
{label:"A",text:"Generate 100 AI images to broadly explore the style space.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"100 AI explorations"},
{label:"B",text:"Generate 10 AI reference images then develop your own interpretation.",energyWh:65,waterMl:46,co2g:26,weight:3,moralScore:1,impactLabel:"10 AI refs + manual dev"},
{label:"C",text:"Study artists in that style and fill a sketchbook with your own attempts.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Sketchbook exploration"},
]},
{id:15,text:"A printed deliverable has a colour error and the client needs it fixed urgently.",options:[
{label:"A",text:"Re-run the entire file set through AI colour correction automatically.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI colour correction batch"},
{label:"B",text:"Manually fix the colour profile on the specific affected files only.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual targeted fix"},
{label:"C",text:"Call the printer to discuss correction options before any digital work.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Printer consultation first"},
]},
{id:16,text:"You want to forecast which visual styles will be trending next season.",options:[
{label:"A",text:"Subscribe to an AI trend-prediction platform with live data feeds.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI trend prediction service"},
{label:"B",text:"Read industry reports and synthesise the trends yourself.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual trend synthesis"},
{label:"C",text:"Ask your professional network and attend design events.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Community-based research"},
]},
{id:17,text:"Your studio needs design process documentation for a new client onboarding pack.",options:[
{label:"A",text:"Use AI to write the full documentation from brief notes.",energyWh:170,waterMl:119,co2g:68,weight:2,moralScore:0,impactLabel:"AI full documentation"},
{label:"B",text:"Write the documentation yourself using an existing template as a base.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Template-based writing"},
{label:"C",text:"Repurpose your existing client communication emails into a practical guide.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Repurposed existing content"},
]},
{id:18,text:"A new team member needs to learn your studio's design style and tools.",options:[
{label:"A",text:"Set them up with an AI tutor that answers every design question they have.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI-driven onboarding"},
{label:"B",text:"Give them a curated set of references and weekly check-in sessions.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Guided manual onboarding"},
{label:"C",text:"Pair them with a senior designer for hands-on learning from day one.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior designer mentorship"},
]},
{id:19,text:"Before delivering a brand identity system you need to verify all files are correct.",options:[
{label:"A",text:"Run an AI quality assurance tool across all files for errors.",energyWh:255,waterMl:179,co2g:102,weight:2,moralScore:0,impactLabel:"AI file QA scan"},
{label:"B",text:"Use a QA checklist and manually check the high-risk files only.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Checklist-based manual QA"},
{label:"C",text:"Have a second designer independently review all files before delivery.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Peer review QA"},
]},
{id:20,text:"A key client has a last-minute request for campaign assets needed in 2 hours.",options:[
{label:"A",text:"Use AI to generate all the required assets immediately.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"Full AI emergency output"},
{label:"B",text:"Adapt and repurpose existing approved assets manually for the new use.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual asset adaptation"},
{label:"C",text:"Call the client to clarify what is truly essential and do only that.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Scope triage + manual"},
]},
],
"Education":[
{id:1,text:"You need to create 5 weeks of lesson materials for a new course module.",options:[
{label:"A",text:"Use AI to generate all lesson plans, slides, and exercises.",energyWh:290,waterMl:203,co2g:116,weight:1,moralScore:0,impactLabel:"Full AI curriculum"},
{label:"B",text:"Use AI to draft outlines; write the actual lesson content yourself.",energyWh:55,waterMl:39,co2g:22,weight:3,moralScore:1,impactLabel:"AI outlines + manual content"},
{label:"C",text:"Develop all materials from scratch using your existing teaching notes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual curriculum creation"},
]},
{id:2,text:"You want to identify which students are struggling before the next assessment.",options:[
{label:"A",text:"Run an AI model on all student activity logs for early warning signals.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI student data analysis"},
{label:"B",text:"Review participation rates and recent grades yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual grade review"},
{label:"C",text:"Check in with students during class and hold open office hours.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct student contact"},
]},
{id:3,text:"You are grading 80 student essays and need to manage the workload.",options:[
{label:"A",text:"Use AI to grade all 80 essays automatically.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI grades all essays"},
{label:"B",text:"Use AI to check for plagiarism; grade all essays yourself.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"AI plagiarism check + manual grading"},
{label:"C",text:"Grade all essays manually with a clear rubric.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual rubric grading"},
]},
{id:4,text:"A student asks a complex question mid-class that you want to answer accurately.",options:[
{label:"A",text:"Query an AI assistant live on the classroom whiteboard.",energyWh:40,waterMl:28,co2g:16,weight:3,moralScore:0,impactLabel:"Live classroom AI query"},
{label:"B",text:"Use your knowledge to answer and note it for follow-up research later.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Expert answer + follow-up"},
{label:"C",text:"Turn the question into a class research task for the next session.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Student research task"},
]},
{id:5,text:"You need to differentiate learning materials for 4 different ability levels.",options:[
{label:"A",text:"Use AI to auto-generate separate material versions for all 4 levels.",energyWh:330,waterMl:231,co2g:132,weight:1,moralScore:0,impactLabel:"AI differentiated materials"},
{label:"B",text:"Write one core version and adapt the most critical sections manually.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"One base + manual tweaks"},
{label:"C",text:"Create the base material and use classroom discussion to scaffold.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Discussion-based scaffolding"},
]},
{id:6,text:"You want to simulate a historical event for students to experience interactively.",options:[
{label:"A",text:"Use an AI-driven simulation engine with branching narrative paths.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI branching simulation"},
{label:"B",text:"Run a structured role-play activity with prepared scenario cards.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Role-play with cards"},
{label:"C",text:"Use primary source documents and a whole-class debate.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Primary sources debate"},
]},
{id:7,text:"Parents have requested more frequent updates on their child's progress.",options:[
{label:"A",text:"Use AI to auto-generate personalised weekly progress reports.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI weekly parent reports"},
{label:"B",text:"Send a monthly summary email you write yourself in 20 minutes.",energyWh:2,waterMl:1,co2g:1,weight:5,moralScore:1,impactLabel:"Manual monthly summary"},
{label:"C",text:"Hold brief parent consultations each half-term.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal consultations"},
]},
{id:8,text:"Your department wants to reduce lesson scheduling clashes across the timetable.",options:[
{label:"A",text:"Deploy an AI scheduling engine to optimise the full timetable.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI timetable optimisation"},
{label:"B",text:"Use a spreadsheet to manually identify and fix recurring clashes.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet clash fixing"},
{label:"C",text:"Hold a department meeting to agree the schedule collaboratively.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Collaborative scheduling"},
]},
{id:9,text:"You want to monitor how engaged students are during online lessons.",options:[
{label:"A",text:"Use AI-powered engagement tracking on all student screens.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI engagement monitoring"},
{label:"B",text:"Use quick polls and hand-raises to gauge engagement in real time.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Live polling"},
{label:"C",text:"Use direct questioning and observe student responses and body language.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct observation"},
]},
{id:10,text:"You need to prepare for tomorrow's lesson and are short on preparation time.",options:[
{label:"A",text:"Have AI rewrite and enhance your existing notes into a full lesson plan.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI lesson enhancement"},
{label:"B",text:"Skim your notes and add 3 key discussion questions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Light manual prep"},
{label:"C",text:"Teach from your existing knowledge with students leading discussion.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Discussion-led lesson"},
]},
{id:11,text:"Your school wants to scale personalised learning across all 500 students.",options:[
{label:"A",text:"Deploy an AI adaptive learning platform for every student.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"AI adaptive platform"},
{label:"B",text:"Use AI only for students with documented learning needs.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"Targeted AI support"},
{label:"C",text:"Train teachers in differentiation techniques instead.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Teacher training approach"},
]},
{id:12,text:"A struggling student asks for extra help outside of class hours.",options:[
{label:"A",text:"Subscribe them to an AI tutoring service for unlimited support.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI tutoring subscription"},
{label:"B",text:"Point them to curated resources and offer one additional session.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Resources + manual session"},
{label:"C",text:"Arrange peer tutoring with a classmate who is excelling.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Peer tutoring"},
]},
{id:13,text:"You need to allocate limited classroom assistant time across multiple classes.",options:[
{label:"A",text:"Use an AI tool to dynamically re-allocate assistant time based on live data.",energyWh:145,waterMl:102,co2g:58,weight:2,moralScore:0,impactLabel:"AI dynamic allocation"},
{label:"B",text:"Review class needs each week and assign assistant hours manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Weekly manual allocation"},
{label:"C",text:"Ask the assistant to decide based on their own classroom observations.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Autonomous judgement"},
]},
{id:14,text:"You want to develop a more creative and engaging personal teaching style.",options:[
{label:"A",text:"Use AI to continuously generate new teaching ideas and classroom activities.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI continuous ideas"},
{label:"B",text:"Observe 3 colleagues' lessons and adapt what you see.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Peer observation"},
{label:"C",text:"Join a teacher professional development community.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Professional community"},
]},
{id:15,text:"A recurring misconception keeps appearing across student work.",options:[
{label:"A",text:"Use AI to analyse all past work and identify the conceptual root cause.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI misconception analysis"},
{label:"B",text:"Review 10 student examples yourself and design a targeted re-teach.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual root cause review"},
{label:"C",text:"Ask the class directly what they find most confusing.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct class discussion"},
]},
{id:16,text:"You want to forecast which students are at risk of failing end-of-year exams.",options:[
{label:"A",text:"Run an AI predictive model on all available term data.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI exam risk prediction"},
{label:"B",text:"Flag students with two or more concerning indicators from your records.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual indicator review"},
{label:"C",text:"Have honest individual conversations with every student about confidence.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"One-to-one conversations"},
]},
{id:17,text:"Your school needs a new student handbook documenting all policies and procedures.",options:[
{label:"A",text:"Use AI to draft the full handbook from existing policy documents.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI full handbook draft"},
{label:"B",text:"Use AI to reformat existing documents; edit the text yourself.",energyWh:30,waterMl:21,co2g:12,weight:4,moralScore:1,impactLabel:"AI formatting + manual edit"},
{label:"C",text:"Write the handbook collaboratively with a small staff team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Collaborative staff writing"},
]},
{id:18,text:"New teachers joining your department need to learn your curriculum approach.",options:[
{label:"A",text:"Set up an AI onboarding chatbot with all curriculum documentation loaded.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI onboarding chatbot"},
{label:"B",text:"Give them a printed handbook and a week of classroom shadowing.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Handbook + shadowing"},
{label:"C",text:"Pair each new teacher with an experienced mentor for the first term.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Mentorship programme"},
]},
{id:19,text:"Before publishing next year's curriculum you need to verify all content.",options:[
{label:"A",text:"Run the entire curriculum through an AI accuracy and bias checker.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI curriculum QA"},
{label:"B",text:"Have each teacher review their own subject content with a checklist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Self-review with checklist"},
{label:"C",text:"Conduct a whole-department peer review over two planned sessions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Department peer review"},
]},
{id:20,text:"A student has a panic attack during an exam and you need immediate guidance.",options:[
{label:"A",text:"Query an AI assistant for the best protocol steps right now.",energyWh:25,waterMl:18,co2g:10,weight:4,moralScore:0,impactLabel:"AI protocol lookup"},
{label:"B",text:"Apply the wellbeing protocol you were trained in.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Trained protocol response"},
{label:"C",text:"Stay with the student, follow your instincts, and call the school counsellor.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Human-first response"},
]},
],
"Engineering":[
{id:1,text:"You need technical documentation for a newly designed mechanical component.",options:[
{label:"A",text:"Generate the full technical document set with an AI writing tool.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI-generated tech docs"},
{label:"B",text:"Use AI to draft the spec sheet; write the narrative sections yourself.",energyWh:45,waterMl:32,co2g:18,weight:4,moralScore:1,impactLabel:"AI draft + manual narrative"},
{label:"C",text:"Write all documentation from engineering drawings and standards.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual documentation"},
]},
{id:2,text:"You have sensor data from 200 hours of field testing to analyse.",options:[
{label:"A",text:"Feed all data into an AI analysis platform for deep performance insights.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"Full AI data analysis"},
{label:"B",text:"Use Python scripts to calculate the key performance metrics you care about.",energyWh:8,waterMl:6,co2g:3,weight:5,moralScore:1,impactLabel:"Script-based analysis"},
{label:"C",text:"Manually review the data against expected performance ranges.",energyWh:2,waterMl:1,co2g:1,weight:5,moralScore:2,impactLabel:"Manual data review"},
]},
{id:3,text:"Repetitive inspection reports take your team 3 hours each to complete.",options:[
{label:"A",text:"Implement AI to auto-generate all inspection reports end-to-end.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI auto-reports"},
{label:"B",text:"Create a smart template that auto-fills standard sections.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Smart template"},
{label:"C",text:"Streamline the report form but keep completion fully manual.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Streamlined manual form"},
]},
{id:4,text:"You need real-time vibration monitoring on critical rotating equipment.",options:[
{label:"A",text:"Deploy an AI model monitoring all sensors continuously, 24/7.",energyWh:440,waterMl:308,co2g:176,weight:1,moralScore:0,impactLabel:"24/7 AI sensor monitoring"},
{label:"B",text:"Set threshold alarms on key sensors and manually review triggered alerts.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Threshold alerts + manual"},
{label:"C",text:"Conduct manual vibration checks on a scheduled weekly basis.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Scheduled manual checks"},
]},
{id:5,text:"You need to choose between three competing design configurations.",options:[
{label:"A",text:"Run AI multi-objective optimisation across thousands of permutations.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"AI multi-objective sweep"},
{label:"B",text:"Model the top 3 configurations in CAD and compare key metrics.",energyWh:55,waterMl:39,co2g:22,weight:4,moralScore:1,impactLabel:"CAD modelling + comparison"},
{label:"C",text:"Apply engineering judgement and standard design criteria.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Engineering judgement"},
]},
{id:6,text:"You need to simulate thermal behaviour of a new heat exchanger design.",options:[
{label:"A",text:"Run an AI-enhanced CFD simulation across thousands of conditions.",energyWh:500,waterMl:350,co2g:200,weight:1,moralScore:0,impactLabel:"AI-enhanced CFD sweep"},
{label:"B",text:"Run a focused CFD simulation for the 3 critical operating conditions.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"Targeted CFD simulation"},
{label:"C",text:"Use analytical heat transfer equations and published correlations.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Analytical calculation"},
]},
{id:7,text:"You need to write a failure mode analysis report for a client design review.",options:[
{label:"A",text:"Use AI to generate the full FMEA from your system design data.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI-generated FMEA"},
{label:"B",text:"Use AI to structure the table; populate failure modes yourself.",energyWh:35,waterMl:25,co2g:14,weight:4,moralScore:1,impactLabel:"AI structure + manual content"},
{label:"C",text:"Conduct a team FMEA workshop and document results manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual team FMEA workshop"},
]},
{id:8,text:"Your production line has a bottleneck causing 15 percent efficiency loss.",options:[
{label:"A",text:"Use AI to model and optimise the entire production flow.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI production optimisation"},
{label:"B",text:"Map the process on a whiteboard and apply lean principles manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual lean analysis"},
{label:"C",text:"Walk the production floor and time each stage yourself over 2 shifts.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical floor observation"},
]},
{id:9,text:"You want to monitor product quality across 8 assembly stations.",options:[
{label:"A",text:"Deploy AI computer vision quality control on all 8 stations simultaneously.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"AI vision QC all stations"},
{label:"B",text:"Deploy AI vision on the 2 highest-defect stations only.",energyWh:95,waterMl:67,co2g:38,weight:3,moralScore:1,impactLabel:"Targeted AI vision QC"},
{label:"C",text:"Assign trained QC inspectors to each station on a rotating schedule.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual QC inspectors"},
]},
{id:10,text:"You need to draft a technical proposal for a new client project quickly.",options:[
{label:"A",text:"Use AI to write the full proposal from your specification notes.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI-written proposal"},
{label:"B",text:"Use a proposal template and write the technical sections yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Template + manual writing"},
{label:"C",text:"Reuse and adapt a previous similar proposal from the archive.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Adapted prior proposal"},
]},
{id:11,text:"Your company needs to scale design review capacity for a major new contract.",options:[
{label:"A",text:"Deploy AI to perform automated design reviews on all submissions.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI automated design review"},
{label:"B",text:"Use AI to pre-screen for obvious errors; engineers review the rest.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"AI pre-screen + manual review"},
{label:"C",text:"Hire contract engineers and maintain existing manual review processes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Contract engineers hired"},
]},
{id:12,text:"A client keeps requesting design changes that affect multiple subsystems.",options:[
{label:"A",text:"Use AI to automatically propagate every change across the entire design.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI auto change propagation"},
{label:"B",text:"Assess the impact manually and update only the affected subsystems.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual impact assessment"},
{label:"C",text:"Hold a change review meeting before implementing any revisions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Change review meeting"},
]},
{id:13,text:"You have a limited test budget to allocate across 5 distinct test phases.",options:[
{label:"A",text:"Use AI to model the optimal budget allocation across all phases.",energyWh:165,waterMl:116,co2g:66,weight:2,moralScore:0,impactLabel:"AI budget modelling"},
{label:"B",text:"Allocate based on risk scores you assign manually to each phase.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual risk-based allocation"},
{label:"C",text:"Discuss the allocation with the team and reach a consensus together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team consensus allocation"},
]},
{id:14,text:"You want to explore unconventional material choices for a structural application.",options:[
{label:"A",text:"Use AI to search thousands of materials databases for candidate options.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI materials database search"},
{label:"B",text:"Review key material property databases and shortlist candidates yourself.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual database review"},
{label:"C",text:"Consult a materials specialist and leverage their domain knowledge.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert consultation"},
]},
{id:15,text:"A component has failed in the field and you need to find the root cause fast.",options:[
{label:"A",text:"Feed all design history data into an AI root cause analysis system.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI root cause analysis"},
{label:"B",text:"Work through a fishbone diagram with the engineering team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team fishbone analysis"},
{label:"C",text:"Physically examine the failed component and trace the failure mode.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical failure examination"},
]},
{id:16,text:"You need to forecast equipment maintenance needs for the next 12 months.",options:[
{label:"A",text:"Deploy a full AI predictive maintenance model on all equipment data.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI predictive maintenance"},
{label:"B",text:"Use manufacturer service intervals combined with your own fault history.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Interval + history based"},
{label:"C",text:"Ask experienced maintenance technicians for their honest assessment.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Technician expertise"},
]},
{id:17,text:"You need to produce standard operating procedures for a new manufacturing process.",options:[
{label:"A",text:"Use AI to draft all SOPs from the process design documentation.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"AI-drafted SOPs"},
{label:"B",text:"Use a template and complete it after directly observing the process.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Template + observation"},
{label:"C",text:"Write the SOPs collaboratively with the operators who will use them.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Operator-authored SOPs"},
]},
{id:18,text:"Graduate engineers joining your team need to understand your systems quickly.",options:[
{label:"A",text:"Give them access to an AI assistant trained on all internal documentation.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI documentation assistant"},
{label:"B",text:"Give them a structured reading list with monthly progress reviews.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Structured reading + reviews"},
{label:"C",text:"Pair them with senior engineers on live active projects.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior engineer pairing"},
]},
{id:19,text:"You need to verify that a design meets all applicable safety standards.",options:[
{label:"A",text:"Run the design through an AI compliance checking platform.",energyWh:275,waterMl:193,co2g:110,weight:2,moralScore:0,impactLabel:"AI compliance checking"},
{label:"B",text:"Work through the standards checklist manually with the design team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual standards review"},
{label:"C",text:"Engage a third-party certifier for an independent safety assessment.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Third-party certification"},
]},
{id:20,text:"A safety-critical system raises an unexpected alarm during live operation.",options:[
{label:"A",text:"Query an AI diagnostic tool for the most likely cause and recommended fix.",energyWh:55,waterMl:39,co2g:22,weight:3,moralScore:0,impactLabel:"AI emergency diagnosis"},
{label:"B",text:"Follow the emergency response procedure you were trained in.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Trained emergency response"},
{label:"C",text:"Shut down the system safely and escalate to the safety engineer on call.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Safe shutdown + escalation"},
]},
],
"Finance & Banking":[
{id:1,text:"You need to produce a 30-page equity research report on a new sector.",options:[
{label:"A",text:"Use AI to generate the full report from market data automatically.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI-generated research report"},
{label:"B",text:"Use AI for data aggregation; write the analysis and conclusions yourself.",energyWh:65,waterMl:46,co2g:26,weight:3,moralScore:1,impactLabel:"AI data + manual analysis"},
{label:"C",text:"Write the full report yourself from primary financial data.",energyWh:2,waterMl:1,co2g:1,weight:5,moralScore:2,impactLabel:"Manual research report"},
]},
{id:2,text:"Your risk team needs to analyse 10 years of transaction data for anomalies.",options:[
{label:"A",text:"Deploy a deep learning model across the full 10-year dataset.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"Deep learning on full dataset"},
{label:"B",text:"Apply rule-based anomaly detection on pre-cleaned recent data.",energyWh:40,waterMl:28,co2g:16,weight:4,moralScore:1,impactLabel:"Rule-based anomaly detection"},
{label:"C",text:"Have analysts manually sample and audit a representative set of transactions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual transaction audit"},
]},
{id:3,text:"Your team spends 4 hours per day on routine regulatory reporting.",options:[
{label:"A",text:"Use AI to automate all regulatory reports end-to-end.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"Full AI regulatory automation"},
{label:"B",text:"Automate the data extraction; have analysts validate and submit.",energyWh:45,waterMl:32,co2g:18,weight:4,moralScore:1,impactLabel:"Auto extract + manual review"},
{label:"C",text:"Streamline the manual process with better templates and checklists.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Streamlined manual process"},
]},
{id:4,text:"You need to provide real-time credit risk scoring for incoming loan applications.",options:[
{label:"A",text:"Deploy a continuous AI model updating risk scores every minute.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"Continuous AI risk scoring"},
{label:"B",text:"Run a scorecard model that updates on each new application received.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Per-application scorecard"},
{label:"C",text:"Have credit analysts assess each application using standard criteria.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual credit analysis"},
]},
{id:5,text:"A client wants an investment strategy recommendation tailored to their portfolio.",options:[
{label:"A",text:"Feed the portfolio into an AI to generate a full strategy recommendation.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI strategy recommendation"},
{label:"B",text:"Use AI to model 3 scenarios; add your own analysis and recommendation.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"AI scenarios + advisor judgement"},
{label:"C",text:"Prepare the recommendation yourself from your analysis of their goals.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual advisor recommendation"},
]},
{id:6,text:"Your quant team wants to stress-test the portfolio against extreme market scenarios.",options:[
{label:"A",text:"Run thousands of AI-generated synthetic market stress scenarios.",energyWh:490,waterMl:343,co2g:196,weight:1,moralScore:0,impactLabel:"AI synthetic stress testing"},
{label:"B",text:"Model 5 historically informed stress scenarios using existing tools.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"Historical scenario modelling"},
{label:"C",text:"Apply the regulatory standard stress test parameters manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Regulatory stress test"},
]},
{id:7,text:"You need to draft the annual shareholders letter from a set of talking points.",options:[
{label:"A",text:"Use AI to write the full letter from the talking points.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI-written shareholders letter"},
{label:"B",text:"Write a first draft yourself and use AI only to refine the language.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Manual draft + AI polish"},
{label:"C",text:"Write and edit the letter entirely yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual writing"},
]},
{id:8,text:"You need to optimise timing for a large block trade to minimise market impact.",options:[
{label:"A",text:"Use an AI algorithm to continuously optimise execution in real time.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI real-time execution"},
{label:"B",text:"Use a VWAP algorithm with parameters you set manually.",energyWh:30,waterMl:21,co2g:12,weight:4,moralScore:1,impactLabel:"VWAP + manual params"},
{label:"C",text:"Execute the trade yourself based on market timing experience.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual trader execution"},
]},
{id:9,text:"Your compliance team needs to monitor client communications for violations.",options:[
{label:"A",text:"Deploy AI to monitor all communications across all channels 24/7.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"24/7 AI communication scan"},
{label:"B",text:"Use keyword flagging on the highest-risk communication channels only.",energyWh:35,waterMl:25,co2g:14,weight:4,moralScore:1,impactLabel:"Keyword flagging"},
{label:"C",text:"Conduct periodic manual reviews of sampled communications.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual compliance sampling"},
]},
{id:10,text:"You need to prepare quickly for a client meeting about their portfolio.",options:[
{label:"A",text:"Have AI generate a personalised briefing pack automatically.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI auto-briefing pack"},
{label:"B",text:"Pull the key metrics yourself and write your own talking points.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual meeting prep"},
{label:"C",text:"Review the account history directly and prepare without notes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct account review"},
]},
{id:11,text:"Your bank needs to scale AML detection to cover a larger transaction volume.",options:[
{label:"A",text:"Deploy AI to flag suspicious patterns across 100 percent of all transactions.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"AI full transaction coverage"},
{label:"B",text:"Apply AI only to transactions above a risk threshold you define.",energyWh:100,waterMl:70,co2g:40,weight:3,moralScore:1,impactLabel:"Risk-threshold AI coverage"},
{label:"C",text:"Hire additional AML analysts and expand the existing rules-based filters.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Analyst + rules-based filter"},
]},
{id:12,text:"A retail banking client is disputing a charge on their account.",options:[
{label:"A",text:"Use an AI chat agent to handle the full dispute resolution process.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI dispute resolution"},
{label:"B",text:"Use AI to pull the relevant transaction history; resolve the dispute yourself.",energyWh:25,waterMl:18,co2g:10,weight:5,moralScore:1,impactLabel:"AI data pull + manual resolve"},
{label:"C",text:"Look up the account history directly and resolve the dispute in person.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual direct resolution"},
]},
{id:13,text:"Your team has limited analyst time and three major reports are due simultaneously.",options:[
{label:"A",text:"Use AI to draft all three reports in parallel.",energyWh:340,waterMl:238,co2g:136,weight:1,moralScore:0,impactLabel:"AI parallel report drafting"},
{label:"B",text:"Use AI for the most data-heavy report; write the other two manually.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"AI one + manual two"},
{label:"C",text:"Prioritise, negotiate deadlines, and write all three manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Prioritise + manual"},
]},
{id:14,text:"You want to identify new investment opportunities outside your usual coverage.",options:[
{label:"A",text:"Use AI to screen thousands of global stocks for matching opportunities.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI global stock screen"},
{label:"B",text:"Apply your investment thesis manually to a curated watchlist.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual thesis screen"},
{label:"C",text:"Talk to industry contacts and read relevant sector reports.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Network-based research"},
]},
{id:15,text:"A valuation model produces unexpected results ahead of a board presentation.",options:[
{label:"A",text:"Run the model through an AI audit tool to locate the error.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI model audit"},
{label:"B",text:"Manually trace the logic by reviewing formulas cell by cell.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual formula trace"},
{label:"C",text:"Have a colleague independently rebuild the key calculation.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Independent rebuild"},
]},
{id:16,text:"The CFO wants a 3-year revenue forecast for a new product line.",options:[
{label:"A",text:"Use AI to build a full forecast model from historic and market data.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI full forecast model"},
{label:"B",text:"Build a three-scenario spreadsheet model yourself using sector benchmarks.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual scenario model"},
{label:"C",text:"Ground the forecast in bottom-up sales estimates from the commercial team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Bottom-up estimate"},
]},
{id:17,text:"You need to update your fund's investment policy statement.",options:[
{label:"A",text:"Use AI to rewrite the full policy from the current version and new guidelines.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI full policy rewrite"},
{label:"B",text:"Use last year's version as a base and manually update the changed sections.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual update from prior"},
{label:"C",text:"Review with the investment committee and draft the update collaboratively.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Committee collaborative draft"},
]},
{id:18,text:"New analysts need to understand your firm's risk frameworks quickly.",options:[
{label:"A",text:"Give them access to an AI system trained on all internal documentation.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI internal knowledge base"},
{label:"B",text:"Assign them a structured reading programme with checkpoint quizzes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Structured reading programme"},
{label:"C",text:"Have them shadow senior analysts for the first 3 months.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior analyst shadowing"},
]},
{id:19,text:"Before launching a new financial product you need to verify regulatory compliance.",options:[
{label:"A",text:"Run the product specification through an AI compliance engine.",energyWh:265,waterMl:186,co2g:106,weight:2,moralScore:0,impactLabel:"AI compliance check"},
{label:"B",text:"Work through the applicable regulations manually with legal counsel.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual legal review"},
{label:"C",text:"Commission an independent legal opinion from a specialist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Independent legal opinion"},
]},
{id:20,text:"A market flash crash is unfolding and you need to assess exposure immediately.",options:[
{label:"A",text:"Query an AI system for automated real-time risk exposure analysis.",energyWh:85,waterMl:60,co2g:34,weight:3,moralScore:0,impactLabel:"AI emergency analysis"},
{label:"B",text:"Pull your risk dashboard manually and escalate to the risk desk.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual dashboard + escalation"},
{label:"C",text:"Follow the firm's market stress protocol and convene the risk committee.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Stress protocol + committee"},
]},
],
"Government & Public Sector":[
{id:1,text:"You need to produce public-facing communications about a complex new policy.",options:[
{label:"A",text:"Use AI to generate all press releases, FAQs, and social content at once.",energyWh:250,waterMl:175,co2g:100,weight:2,moralScore:0,impactLabel:"AI multi-channel content"},
{label:"B",text:"Draft the core message yourself; use AI to adapt it for each channel.",energyWh:55,waterMl:39,co2g:22,weight:4,moralScore:1,impactLabel:"Manual core + AI variants"},
{label:"C",text:"Write all communications yourself and route through public affairs.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual comms"},
]},
{id:2,text:"Your department needs to analyse 50,000 public consultation responses.",options:[
{label:"A",text:"Use AI sentiment and theme analysis on all 50,000 responses.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI full consultation analysis"},
{label:"B",text:"Use AI to cluster themes; manually read a representative sample.",energyWh:85,waterMl:60,co2g:34,weight:3,moralScore:1,impactLabel:"AI clustering + manual sample"},
{label:"C",text:"Manually read and code a statistically valid representative sample.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual statistical sample"},
]},
{id:3,text:"Your team processes 200 planning applications per month manually.",options:[
{label:"A",text:"Automate the entire application triage and categorisation with AI.",energyWh:340,waterMl:238,co2g:136,weight:1,moralScore:0,impactLabel:"AI full triage"},
{label:"B",text:"Automate the data extraction; staff review and decide each application.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"Auto extract + manual decision"},
{label:"C",text:"Improve the application form and processing templates; keep it manual.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Improved manual process"},
]},
{id:4,text:"Your city traffic management centre needs real-time signal optimisation.",options:[
{label:"A",text:"Deploy AI to continuously optimise every traffic signal across the city.",energyWh:500,waterMl:350,co2g:200,weight:1,moralScore:0,impactLabel:"AI city-wide signal control"},
{label:"B",text:"Use AI on the 10 highest-congestion junctions only.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"AI on critical junctions"},
{label:"C",text:"Apply cycle time adjustments manually during identified peak hours.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual peak-hour adjustments"},
]},
{id:5,text:"Senior officials need evidence-based advice to inform a major policy decision.",options:[
{label:"A",text:"Use AI to synthesise all available research and generate a policy briefing.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI evidence synthesis"},
{label:"B",text:"Conduct a manual evidence review using a structured methodology.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual evidence review"},
{label:"C",text:"Commission an independent expert review from a recognised specialist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Independent expert review"},
]},
{id:6,text:"Your emergency management team needs to plan for multiple disaster scenarios.",options:[
{label:"A",text:"Use AI to simulate hundreds of disaster response scenarios automatically.",energyWh:470,waterMl:329,co2g:188,weight:1,moralScore:0,impactLabel:"AI disaster simulation"},
{label:"B",text:"Run structured tabletop exercises for the 4 most probable scenarios.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Tabletop exercises"},
{label:"C",text:"Review past incident reports and update plans based on lessons learned.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Lessons-learned review"},
]},
{id:7,text:"Ministers need a briefing note on a complex technical topic by 8am.",options:[
{label:"A",text:"Use AI to generate the full briefing note from policy documents.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI briefing note"},
{label:"B",text:"Write the briefing yourself and use AI only to improve clarity.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Manual draft + AI editing"},
{label:"C",text:"Write the briefing yourself and have a colleague proof it.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual + peer review"},
]},
{id:8,text:"Your department is trying to reduce the cost of processing benefit claims.",options:[
{label:"A",text:"Use AI to automate all eligibility assessments end-to-end.",energyWh:430,waterMl:301,co2g:172,weight:1,moralScore:0,impactLabel:"AI full eligibility automation"},
{label:"B",text:"Use AI to flag straightforward approvals; staff handle all complex cases.",energyWh:95,waterMl:67,co2g:38,weight:3,moralScore:1,impactLabel:"AI simple + manual complex"},
{label:"C",text:"Redesign the claims process to eliminate unnecessary steps without AI.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Process redesign"},
]},
{id:9,text:"Your IT team needs to monitor a large government network for cyber threats.",options:[
{label:"A",text:"Deploy AI threat detection across the entire network in real time.",energyWh:490,waterMl:343,co2g:196,weight:1,moralScore:0,impactLabel:"AI real-time threat detection"},
{label:"B",text:"Use automated alerts for known threat signatures; analysts triage.",energyWh:75,waterMl:53,co2g:30,weight:3,moralScore:1,impactLabel:"Automated alerts + triage"},
{label:"C",text:"Follow the security monitoring schedule and manual review protocol.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual security review"},
]},
{id:10,text:"You need to prepare a personal briefing for a public hearing appearance.",options:[
{label:"A",text:"Use AI to generate talking points and anticipate all likely questions.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI hearing preparation"},
{label:"B",text:"Prepare your key points manually and do a practice run with colleagues.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual prep + practice"},
{label:"C",text:"Prepare your own notes and rely on your subject-matter expertise.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert-knowledge preparation"},
]},
{id:11,text:"A public services portal is receiving 10 times the expected citizen traffic.",options:[
{label:"A",text:"Deploy AI auto-scaling and automated chatbot responses to all queries.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI auto-scale + chatbot"},
{label:"B",text:"Activate the cloud scaling plan and redirect some queries to the FAQ.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"Scaling plan + FAQ redirect"},
{label:"C",text:"Post a service update, deploy additional staff, and queue requests.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Staff deployment + queuing"},
]},
{id:12,text:"Citizens are having difficulty navigating the online planning portal.",options:[
{label:"A",text:"Integrate an AI assistant to guide every citizen through the portal.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI portal assistant"},
{label:"B",text:"Improve the written guidance and add a simple FAQ page.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Improved written guidance"},
{label:"C",text:"Run user testing with real citizens and redesign the navigation.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"User-tested redesign"},
]},
{id:13,text:"You have limited staff to cover three simultaneous government projects.",options:[
{label:"A",text:"Use AI project management to auto-prioritise and allocate all tasks.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI task allocation"},
{label:"B",text:"Hold a weekly resource meeting to manually assign priorities.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual resource meeting"},
{label:"C",text:"Escalate one project deadline directly to the sponsoring minister.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Ministerial escalation"},
]},
{id:14,text:"You want to explore innovative digital service delivery approaches.",options:[
{label:"A",text:"Use AI to generate 50 or more service design concept proposals.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI concept generation"},
{label:"B",text:"Run a discovery workshop with front-line staff and citizens.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Discovery workshop"},
{label:"C",text:"Research similar services in other countries and adapt the best approach.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"International best practice"},
]},
{id:15,text:"A government IT system has failed and services are unavailable to citizens.",options:[
{label:"A",text:"Use AI diagnostics to scan all logs and identify the failure source.",energyWh:120,waterMl:84,co2g:48,weight:3,moralScore:0,impactLabel:"AI log diagnostics"},
{label:"B",text:"Follow the incident response runbook with the on-call team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Runbook response"},
{label:"C",text:"Activate the business continuity plan and notify all affected departments.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Business continuity"},
]},
{id:16,text:"You need to forecast next year's demand for a public housing programme.",options:[
{label:"A",text:"Build an AI demand forecasting model from all historical data.",energyWh:330,waterMl:231,co2g:132,weight:1,moralScore:0,impactLabel:"AI demand forecasting"},
{label:"B",text:"Use demographic projections and waiting list trends in a spreadsheet.",energyWh:4,waterMl:3,co2g:2,weight:5,moralScore:1,impactLabel:"Spreadsheet trend analysis"},
{label:"C",text:"Consult housing associations and local authorities for ground-level data.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Stakeholder consultation"},
]},
{id:17,text:"You need to publish updated guidance on a recently changed regulation.",options:[
{label:"A",text:"Use AI to rewrite all guidance pages to reflect the regulation change.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI guidance rewrite"},
{label:"B",text:"Identify the specific sections that changed and update them manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Have the policy team draft the updated guidance in plain English.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Policy team plain-English draft"},
]},
{id:18,text:"New civil servants need to understand complex departmental procedures quickly.",options:[
{label:"A",text:"Deploy an AI assistant trained on all departmental procedures.",energyWh:235,waterMl:165,co2g:94,weight:2,moralScore:0,impactLabel:"AI procedure assistant"},
{label:"B",text:"Provide a structured induction programme with experienced mentors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Structured induction"},
{label:"C",text:"Use job shadowing and supervised practice for the first month.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Job shadowing"},
]},
{id:19,text:"Before a policy goes live you need to check it for unintended consequences.",options:[
{label:"A",text:"Use AI to model all potential second-order effects of the policy.",energyWh:390,waterMl:273,co2g:156,weight:1,moralScore:0,impactLabel:"AI impact modelling"},
{label:"B",text:"Run a structured impact assessment with key stakeholder groups.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Stakeholder impact assessment"},
{label:"C",text:"Pilot the policy in one region before national rollout.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Regional pilot programme"},
]},
{id:20,text:"A national infrastructure outage is affecting essential public services.",options:[
{label:"A",text:"Use AI to coordinate all emergency response actions in real time.",energyWh:150,waterMl:105,co2g:60,weight:2,moralScore:0,impactLabel:"AI emergency coordination"},
{label:"B",text:"Activate the emergency protocol and coordinate response manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Emergency protocol"},
{label:"C",text:"Follow established command-and-control procedures with human leads.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Human command-and-control"},
]},
],
"Healthcare & Medicine":[
{id:1,text:"You need to generate patient education materials for a new treatment programme.",options:[
{label:"A",text:"Use AI to generate all brochures, FAQs, and leaflets from clinical notes.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI-generated all materials"},
{label:"B",text:"Use AI to draft plain-English summaries; review and sign off yourself.",energyWh:50,waterMl:35,co2g:20,weight:4,moralScore:1,impactLabel:"AI draft + clinical review"},
{label:"C",text:"Write and review all materials yourself with input from patient advocates.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual + patient input"},
]},
{id:2,text:"You need to analyse 3 years of patient outcome data to identify care patterns.",options:[
{label:"A",text:"Feed all records into an AI model for deep pattern discovery.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"Full AI outcome analysis"},
{label:"B",text:"Use statistical software to test your specific clinical hypotheses.",energyWh:35,waterMl:25,co2g:14,weight:4,moralScore:1,impactLabel:"Targeted statistical analysis"},
{label:"C",text:"Conduct a structured manual audit of a representative patient sample.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual clinical audit"},
]},
{id:3,text:"Your ward has a backlog of routine referral letters to complete.",options:[
{label:"A",text:"Use AI to auto-draft all referral letters from clinical records.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI auto-drafts all letters"},
{label:"B",text:"Use AI to populate standard sections; you write the clinical assessment.",energyWh:55,waterMl:39,co2g:22,weight:3,moralScore:1,impactLabel:"AI template + manual clinical"},
{label:"C",text:"Dictate or type each letter yourself from the patient notes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual letter dictation"},
]},
{id:4,text:"You need real-time diagnostic support for a complex presentation in A&E.",options:[
{label:"A",text:"Query an AI diagnostic assistant for differential diagnoses in real time.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:0,impactLabel:"Real-time AI diagnosis"},
{label:"B",text:"Consult a senior colleague or specialist and use clinical guidelines.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Senior consult + guidelines"},
{label:"C",text:"Apply your clinical training and escalate appropriately.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Clinical training + escalation"},
]},
{id:5,text:"Your team needs to review 100 scans this week to meet a reporting deadline.",options:[
{label:"A",text:"Use AI to pre-read all 100 scans and generate draft reports.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"AI pre-reads all scans"},
{label:"B",text:"Use AI to flag and prioritise abnormal scans; you review all of them.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"AI triage + full manual review"},
{label:"C",text:"Read and report all 100 scans yourself with your clinical team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full manual reading"},
]},
{id:6,text:"Your hospital wants to simulate patient flow to reduce A&E waiting times.",options:[
{label:"A",text:"Build a full AI agent-based simulation of the entire hospital patient flow.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"AI full patient flow sim"},
{label:"B",text:"Model the A&E pathway specifically using existing flow data.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"Targeted pathway model"},
{label:"C",text:"Observe and map the patient journey on the ground with the clinical team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical journey mapping"},
]},
{id:7,text:"You need to send weekly personalised health updates to 200 patients.",options:[
{label:"A",text:"Use AI to auto-generate all 200 personalised weekly updates.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI auto patient updates"},
{label:"B",text:"Use a template with auto-filled key metrics; personalise only outlier cases.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Template + manual outliers"},
{label:"C",text:"Call or write to patients individually for all meaningful updates.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Individual patient contact"},
]},
{id:8,text:"Your clinic needs to reduce appointment scheduling inefficiencies.",options:[
{label:"A",text:"Deploy AI to continuously optimise the appointment schedule in real time.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI continuous scheduling"},
{label:"B",text:"Use a scheduling tool with simple rules to reduce double-bookings.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Rules-based scheduling"},
{label:"C",text:"Train reception staff on better manual scheduling practices.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Staff training + manual"},
]},
{id:9,text:"Your ICU needs to monitor vitals across 20 patients for early deterioration signs.",options:[
{label:"A",text:"Deploy AI to continuously analyse all 20 patients' vitals with alert scoring.",energyWh:500,waterMl:350,co2g:200,weight:1,moralScore:0,impactLabel:"AI continuous ICU monitoring"},
{label:"B",text:"Set alert thresholds on standard vital signs monitors.",energyWh:25,waterMl:18,co2g:10,weight:5,moralScore:1,moralScore:1,impactLabel:"Threshold-based alerts"},
{label:"C",text:"Conduct regular nurse-led clinical observations on a set schedule.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Scheduled nursing obs"},
]},
{id:10,text:"You need to prepare for a challenging case review meeting quickly.",options:[
{label:"A",text:"Use AI to generate a full case summary and suggested discussion points.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI case summary"},
{label:"B",text:"Review the patient notes yourself and write your own talking points.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual case review"},
{label:"C",text:"Read the notes directly in the meeting and discuss the case openly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Live case discussion"},
]},
{id:11,text:"Your hospital needs to scale triage capacity during a winter surge.",options:[
{label:"A",text:"Deploy AI to perform automated triage scoring on all incoming patients.",energyWh:430,waterMl:301,co2g:172,weight:1,moralScore:0,impactLabel:"AI full triage automation"},
{label:"B",text:"Use AI to pre-screen and flag critical cases; clinicians triage the rest.",energyWh:85,waterMl:60,co2g:34,weight:3,moralScore:1,impactLabel:"AI flag + clinical triage"},
{label:"C",text:"Call in additional clinical staff and apply the surge triage protocol.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Surge protocol + extra staff"},
]},
{id:12,text:"A patient is asking detailed questions about their diagnosis and treatment options.",options:[
{label:"A",text:"Direct the patient to an AI health assistant for a full explanation.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI patient explanation"},
{label:"B",text:"Provide a leaflet and offer a follow-up appointment to answer questions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Leaflet + follow-up appt"},
{label:"C",text:"Take the time to answer their questions directly in this consultation.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct patient conversation"},
]},
{id:13,text:"Your department has limited clinic slots and high patient demand this month.",options:[
{label:"A",text:"Use AI to continuously remodel patient routing and slot allocation.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI dynamic slot allocation"},
{label:"B",text:"Extend clinic hours for the highest-need cases and manage manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Extended hours + manual"},
{label:"C",text:"Hold a team meeting to discuss and prioritise cases together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team case prioritisation"},
]},
{id:14,text:"You want to explore new diagnostic approaches for a condition with poor outcomes.",options:[
{label:"A",text:"Use AI to mine thousands of published studies for novel diagnostic signals.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI literature mining"},
{label:"B",text:"Review the most recent clinical guidelines and recent trial results.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual guideline review"},
{label:"C",text:"Consult a specialist colleague and discuss the case history.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Specialist consultation"},
]},
{id:15,text:"A medication error has occurred and you need to understand what went wrong.",options:[
{label:"A",text:"Run the incident through an AI root cause analysis system.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI incident analysis"},
{label:"B",text:"Conduct a structured root cause analysis with the clinical team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team root cause analysis"},
{label:"C",text:"Walk through the incident timeline with everyone involved.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual timeline walkthrough"},
]},
{id:16,text:"You want to forecast next quarter's bed occupancy to support staffing decisions.",options:[
{label:"A",text:"Build an AI predictive model from all available patient and seasonal data.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"AI occupancy model"},
{label:"B",text:"Use last year's seasonal data plus current trend data in a spreadsheet.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet trend forecast"},
{label:"C",text:"Consult bed managers and senior nurses for their operational experience.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Operational experience"},
]},
{id:17,text:"Your ward needs updated clinical protocols after new NICE guidance was published.",options:[
{label:"A",text:"Use AI to rewrite all affected protocols from the new guidance.",energyWh:215,waterMl:151,co2g:86,weight:2,moralScore:0,impactLabel:"AI protocol rewrite"},
{label:"B",text:"Identify the specific sections needing change and update them manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Hold a clinical governance meeting to review and approve the updates.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Clinical governance review"},
]},
{id:18,text:"Junior doctors on your team need to learn your ward's clinical protocols.",options:[
{label:"A",text:"Give them access to an AI system that answers all protocol questions.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI protocol assistant"},
{label:"B",text:"Give them the protocol handbook and schedule regular case-based teaching.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Handbook + case teaching"},
{label:"C",text:"Supervise them directly on the ward for the first 4 weeks.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct ward supervision"},
]},
{id:19,text:"Before publishing a new treatment pathway you need to verify it is evidence-based.",options:[
{label:"A",text:"Run the pathway through an AI evidence verification tool.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI evidence verification"},
{label:"B",text:"Cross-reference the pathway manually against current clinical guidelines.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual guideline cross-check"},
{label:"C",text:"Submit the pathway for peer review by a clinical expert panel.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert peer review"},
]},
{id:20,text:"A patient is deteriorating rapidly and you need to act in the next few minutes.",options:[
{label:"A",text:"Query an AI clinical decision support tool for the recommended intervention.",energyWh:30,waterMl:21,co2g:12,weight:4,moralScore:0,impactLabel:"AI decision support"},
{label:"B",text:"Apply the deteriorating patient protocol you were trained in.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Trained protocol response"},
{label:"C",text:"Call the resuscitation team and act on your clinical judgement immediately.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Clinical judgement + resus team"},
]},
],
"Hospitality & Tourism":[
{id:1,text:"You need to create personalised destination guides for 500 different travellers.",options:[
{label:"A",text:"Use AI to auto-generate all 500 personalised guides from traveller data.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI auto-personalised guides"},
{label:"B",text:"Create 8 interest-based templates and let travellers customise them.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Interest templates + self-select"},
{label:"C",text:"Write personalised recommendations manually for high-value bookings.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual high-value personalisation"},
]},
{id:2,text:"Your hotel wants to analyse guest feedback from 3,000 reviews this quarter.",options:[
{label:"A",text:"Feed all reviews into an AI sentiment and theme analysis tool.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI full review analysis"},
{label:"B",text:"Read a sample of 100 reviews and identify recurring themes manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual sample review"},
{label:"C",text:"Hold a team debrief and collate recurring verbal feedback from staff.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Staff debrief session"},
]},
{id:3,text:"Your front desk team spends hours on manual room assignment each morning.",options:[
{label:"A",text:"Use AI to auto-assign all rooms continuously based on real-time preferences.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI continuous room assignment"},
{label:"B",text:"Use a rule-based system that auto-assigns by guest tier and room type.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Rule-based auto-assignment"},
{label:"C",text:"Have an experienced front desk agent make all assignment decisions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert manual assignment"},
]},
{id:4,text:"Your resort needs real-time dynamic pricing across 200 room categories.",options:[
{label:"A",text:"Deploy an AI revenue management system to price every room in real time.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI real-time pricing"},
{label:"B",text:"Set daily pricing rules based on occupancy bands you define.",energyWh:8,waterMl:6,co2g:3,weight:5,moralScore:1,impactLabel:"Band-based pricing rules"},
{label:"C",text:"Have the revenue manager review and set prices each morning manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual daily pricing"},
]},
{id:5,text:"A group travel client wants a bespoke itinerary recommendation for 40 people.",options:[
{label:"A",text:"Use AI to generate a fully personalised multi-day itinerary for the group.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI bespoke itinerary"},
{label:"B",text:"Use your curated experience templates and adapt them for the group.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Template + manual adaptation"},
{label:"C",text:"Have a conversation with the client and build the itinerary yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal consultation"},
]},
{id:6,text:"Your hotel wants to simulate the impact of a new loyalty programme before launch.",options:[
{label:"A",text:"Run a full AI simulation modelling thousands of guest behaviour scenarios.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI full behaviour simulation"},
{label:"B",text:"Model 4 scenarios in a spreadsheet based on comparable programmes.",energyWh:6,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Spreadsheet scenario model"},
{label:"C",text:"Pilot the programme with a small segment of guests first.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Guest pilot programme"},
]},
{id:7,text:"You need to respond to a large volume of guest enquiries before a peak season.",options:[
{label:"A",text:"Deploy an AI chatbot to handle all enquiries automatically.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI chatbot all enquiries"},
{label:"B",text:"Use AI chatbot for FAQs; staff handle all booking-related queries.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"AI FAQs + manual bookings"},
{label:"C",text:"Have staff respond to all enquiries personally.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal staff responses"},
]},
{id:8,text:"You want to optimise housekeeping routes to reduce room turnaround time.",options:[
{label:"A",text:"Use AI to continuously re-route all housekeeping staff in real time.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI real-time routing"},
{label:"B",text:"Design an optimised static route per floor and review it monthly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Optimised static routes"},
{label:"C",text:"Let experienced housekeeping leads self-organise their teams.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team self-organisation"},
]},
{id:9,text:"Your restaurant needs to monitor food safety compliance across 5 kitchens.",options:[
{label:"A",text:"Deploy AI-powered sensors with continuous automated compliance checking.",energyWh:440,waterMl:308,co2g:176,weight:1,moralScore:0,impactLabel:"AI continuous compliance"},
{label:"B",text:"Use digital temperature logging with automated alerts for deviations.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Digital logging + alerts"},
{label:"C",text:"Follow the manual HACCP compliance schedule with your kitchen supervisors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual HACCP schedule"},
]},
{id:10,text:"You want to write personalised thank-you messages to your top 50 loyalty guests.",options:[
{label:"A",text:"Use AI to generate personalised messages for all 50 guests at once.",energyWh:120,waterMl:84,co2g:48,weight:2,moralScore:0,impactLabel:"AI personalised messages"},
{label:"B",text:"Write a warm template and personalise the first two lines yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Template + personal touch"},
{label:"C",text:"Write individual messages from scratch for each of your top guests.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully personal messages"},
]},
{id:11,text:"Your hotel chain needs to scale booking management to 10 times the current volume.",options:[
{label:"A",text:"Deploy AI to handle all booking management and upsell recommendations.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"Full AI booking management"},
{label:"B",text:"Expand the reservations team and implement a better booking platform.",energyWh:30,waterMl:21,co2g:12,weight:4,moralScore:1,impactLabel:"Team expansion + platform"},
{label:"C",text:"Hire specialist reservation staff and maintain personal service standards.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Specialist staff hiring"},
]},
{id:12,text:"An unhappy guest is leaving a complaint at checkout.",options:[
{label:"A",text:"Route the complaint to an AI resolution system for automated handling.",energyWh:150,waterMl:105,co2g:60,weight:2,moralScore:0,impactLabel:"AI complaint handling"},
{label:"B",text:"Log the complaint digitally and follow up with a personal call tomorrow.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Digital log + personal follow-up"},
{label:"C",text:"Address the complaint personally and resolve it before they leave.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal immediate resolution"},
]},
{id:13,text:"You need to allocate seasonal staff across 4 departments for peak season.",options:[
{label:"A",text:"Use AI workforce planning to continuously optimise staff allocation.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI workforce planning"},
{label:"B",text:"Review historic peak data and allocate manually based on past patterns.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual historic planning"},
{label:"C",text:"Consult department heads and agree allocations together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Collaborative allocation"},
]},
{id:14,text:"You want to develop entirely new guest experience concepts for next season.",options:[
{label:"A",text:"Use AI to generate 40 or more novel guest experience concept ideas.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"40+ AI concept ideas"},
{label:"B",text:"Run a creative brainstorm with your team and front-of-house staff.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team brainstorm"},
{label:"C",text:"Interview loyal guests about what would most improve their experience.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Guest interviews"},
]},
{id:15,text:"Your booking system has gone down during peak check-in time.",options:[
{label:"A",text:"Use an AI assistant to try to diagnose and fix the system remotely.",energyWh:95,waterMl:67,co2g:38,weight:3,moralScore:0,impactLabel:"AI remote diagnosis"},
{label:"B",text:"Switch to the offline check-in procedure while IT resolves the issue.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Offline procedure"},
{label:"C",text:"Apologise to guests, check them in manually, and call IT support.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual check-in + IT call"},
]},
{id:16,text:"You need to forecast occupancy for the next 3 months to plan staffing.",options:[
{label:"A",text:"Build an AI forecasting model using booking trends and external events data.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI occupancy forecast"},
{label:"B",text:"Use last year's seasonal data and current booking pace in a spreadsheet.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet seasonal forecast"},
{label:"C",text:"Ask your reservations and events teams for their demand outlook.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team demand outlook"},
]},
{id:17,text:"You need to update your hotel's service standards handbook.",options:[
{label:"A",text:"Use AI to rewrite the entire handbook from the current version.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI full handbook rewrite"},
{label:"B",text:"Update only the sections that have changed; keep the rest.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Co-author the handbook updates with your most experienced front-line staff.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Staff co-authored update"},
]},
{id:18,text:"New seasonal staff need to learn service standards before the busy period.",options:[
{label:"A",text:"Use an AI onboarding system that trains all new staff automatically.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI onboarding system"},
{label:"B",text:"Run a structured 2-day induction with trained team leads.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Structured team induction"},
{label:"C",text:"Pair each new staff member with an experienced colleague for a week.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Buddy system mentoring"},
]},
{id:19,text:"Before the season launch you need to ensure all guest-facing content is accurate.",options:[
{label:"A",text:"Use AI to scan all website, app, and printed content for errors.",energyWh:245,waterMl:172,co2g:98,weight:2,moralScore:0,impactLabel:"AI content audit"},
{label:"B",text:"Assign each department to review their own section with a checklist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Departmental self-review"},
{label:"C",text:"Walk through the guest journey yourself and check every touchpoint.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal journey walkthrough"},
]},
{id:20,text:"A fire alarm has triggered during a fully-booked dinner service.",options:[
{label:"A",text:"Use a venue management AI app to coordinate the emergency response.",energyWh:40,waterMl:28,co2g:16,weight:4,moralScore:0,impactLabel:"AI app coordination"},
{label:"B",text:"Follow the fire evacuation procedure your team has practised.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Practised evacuation procedure"},
{label:"C",text:"Alert staff verbally, evacuate guests immediately, and call the fire brigade.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Immediate human evacuation"},
]},
],
"Legal":[
{id:1,text:"You need to draft a 50-page commercial contract for a new client engagement.",options:[
{label:"A",text:"Use AI to generate the full contract from a brief scope description.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI full contract generation"},
{label:"B",text:"Use your firm's standard template and draft the bespoke clauses yourself.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Template + manual drafting"},
{label:"C",text:"Draft the full contract yourself from the client brief.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full manual drafting"},
]},
{id:2,text:"You need to review 200 documents in a large disclosure exercise.",options:[
{label:"A",text:"Use AI to review and categorise all 200 documents automatically.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI full document review"},
{label:"B",text:"Use AI to triage for relevance; lawyers review all flagged documents.",energyWh:75,waterMl:53,co2g:30,weight:3,moralScore:1,impactLabel:"AI triage + lawyer review"},
{label:"C",text:"Have a paralegal team manually review all documents.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full manual review team"},
]},
{id:3,text:"Your firm needs to automate the first review of new non-disclosure agreements.",options:[
{label:"A",text:"Deploy AI to review all NDAs and flag deviations automatically.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI automated NDA review"},
{label:"B",text:"Use a playbook-based checklist tool for NDA review.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Playbook-based review"},
{label:"C",text:"Have a junior lawyer review each NDA against the standard playbook.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Junior lawyer review"},
]},
{id:4,text:"You are in a hearing and opposing counsel raises a precedent you are not familiar with.",options:[
{label:"A",text:"Search an AI legal research tool on your device in real time.",energyWh:60,waterMl:42,co2g:24,weight:3,moralScore:0,impactLabel:"Real-time AI legal search"},
{label:"B",text:"Request a short adjournment to research the precedent properly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Adjournment + manual research"},
{label:"C",text:"Respond from your existing knowledge and address it more fully in submissions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert response + submissions"},
]},
{id:5,text:"You need to advise a client on the legal risks of a proposed acquisition.",options:[
{label:"A",text:"Use AI to analyse all deal documents and generate a full risk report.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI full deal risk report"},
{label:"B",text:"Use AI to summarise the key documents; write the advice yourself.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"AI summary + manual advice"},
{label:"C",text:"Read all deal documents yourself and prepare the risk advice.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full manual due diligence"},
]},
{id:6,text:"Your litigation team needs to model the financial outcomes of different settlement scenarios.",options:[
{label:"A",text:"Use AI to model all possible outcomes with probabilistic forecasts.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI probabilistic outcome model"},
{label:"B",text:"Model the 3 most likely scenarios in a spreadsheet using case facts.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual 3-scenario model"},
{label:"C",text:"Prepare the financial analysis yourself based on comparable cases.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Comparable case analysis"},
]},
{id:7,text:"You need to write a legal opinion letter for a client facing a regulatory dispute.",options:[
{label:"A",text:"Use AI to draft the full opinion letter from the case notes.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI-drafted opinion letter"},
{label:"B",text:"Write the letter yourself; use AI to check for any missed case references.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Manual write + AI reference check"},
{label:"C",text:"Research and write the opinion letter entirely yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual opinion"},
]},
{id:8,text:"Your firm is reviewing its billing rates and wants to benchmark against competitors.",options:[
{label:"A",text:"Use an AI market intelligence tool to analyse competitor pricing continuously.",energyWh:250,waterMl:175,co2g:100,weight:2,moralScore:0,impactLabel:"AI competitive intelligence"},
{label:"B",text:"Review the latest Legal 500 and industry survey data manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual survey review"},
{label:"C",text:"Talk to peers at other firms and professional association contacts.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Peer network research"},
]},
{id:9,text:"You need to monitor a large volume of case developments across an ongoing matter.",options:[
{label:"A",text:"Deploy AI to continuously monitor all relevant court filings and news.",energyWh:370,waterMl:259,co2g:148,weight:1,moralScore:0,impactLabel:"AI continuous monitoring"},
{label:"B",text:"Set up targeted alerts for key case numbers and parties.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Targeted alert system"},
{label:"C",text:"Assign a paralegal to monitor and report on case developments daily.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Paralegal daily monitoring"},
]},
{id:10,text:"You need to prepare quickly for a client call on a complex regulatory matter.",options:[
{label:"A",text:"Use AI to generate a briefing document from all relevant case materials.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI briefing document"},
{label:"B",text:"Review the key documents yourself and write your own talking points.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual case review"},
{label:"C",text:"Read the latest case notes directly and prepare from your expertise.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expertise-based preparation"},
]},
{id:11,text:"Your firm is taking on a high volume of standard conveyancing matters.",options:[
{label:"A",text:"Use AI to handle the full conveyancing workflow from draft to completion.",energyWh:440,waterMl:308,co2g:176,weight:1,moralScore:0,impactLabel:"AI full conveyancing workflow"},
{label:"B",text:"Use AI to complete standard precedent documents; lawyers review and sign off.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"AI precedents + lawyer sign-off"},
{label:"C",text:"Handle all matters manually with a well-trained conveyancing team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual specialist team"},
]},
{id:12,text:"A client is calling in distress about an urgent injunction they need today.",options:[
{label:"A",text:"Use AI to research and draft the injunction application immediately.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI emergency application"},
{label:"B",text:"Listen to the client, apply your expertise, and draft the application yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Expert manual application"},
{label:"C",text:"Consult a specialist colleague and co-draft the application together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Specialist co-draft"},
]},
{id:13,text:"You need to allocate lawyer time across 12 active matters this week.",options:[
{label:"A",text:"Use an AI matter management tool to automatically allocate all work.",energyWh:160,waterMl:112,co2g:64,weight:2,moralScore:0,impactLabel:"AI matter management"},
{label:"B",text:"Review each matter's status and allocate time yourself each Monday.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Weekly manual allocation"},
{label:"C",text:"Hold a team meeting to allocate priorities together each week.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team allocation meeting"},
]},
{id:14,text:"You want to explore an innovative new legal argument for a commercial dispute.",options:[
{label:"A",text:"Use AI to search thousands of cases and law review articles for precedent.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI broad precedent search"},
{label:"B",text:"Search the major legal databases yourself for relevant authorities.",energyWh:8,waterMl:6,co2g:3,weight:5,moralScore:1,impactLabel:"Manual legal database search"},
{label:"C",text:"Discuss the argument with a senior colleague and a specialist barrister.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert discussion"},
]},
{id:15,text:"A drafted contract has a potentially significant error spotted by the client.",options:[
{label:"A",text:"Run the full contract through an AI contract analysis tool immediately.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI full contract analysis"},
{label:"B",text:"Read the relevant section carefully and trace the drafting history.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual drafting history trace"},
{label:"C",text:"Convene a quick call with the drafting team to review the issue together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team review call"},
]},
{id:16,text:"You need to assess the likely outcome and timeline of a litigation matter.",options:[
{label:"A",text:"Use an AI litigation analytics tool to forecast outcome probability.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI litigation analytics"},
{label:"B",text:"Analyse comparable decided cases and form your own view.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Comparable case analysis"},
{label:"C",text:"Take counsel's opinion from a specialist barrister.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Counsel's opinion"},
]},
{id:17,text:"Your firm needs updated precedent library documents after a change in legislation.",options:[
{label:"A",text:"Use AI to update all precedents in the library to reflect the changes.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI full library update"},
{label:"B",text:"Identify the affected precedents and update them manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Assign the update to the relevant practice group to review and revise.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Practice group revision"},
]},
{id:18,text:"Newly qualified solicitors at your firm need to develop practical drafting skills.",options:[
{label:"A",text:"Give them access to an AI drafting assistant for all their work.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI drafting assistant"},
{label:"B",text:"Give them precedents and review their drafts personally each week.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Precedents + personal review"},
{label:"C",text:"Assign them live client matters supervised by a senior associate.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Supervised live matters"},
]},
{id:19,text:"Before filing a claim you need to check all facts and legal submissions are correct.",options:[
{label:"A",text:"Run the claim through an AI verification tool for accuracy checking.",energyWh:255,waterMl:179,co2g:102,weight:2,moralScore:0,impactLabel:"AI claim verification"},
{label:"B",text:"Have the fee-earner review the claim with a standard verification checklist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Checklist-based review"},
{label:"C",text:"Have a partner conduct a full independent review before filing.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Partner independent review"},
]},
{id:20,text:"A client calls at 5pm needing urgent advice on a freezing injunction for tomorrow.",options:[
{label:"A",text:"Use AI to research the law and draft the application documents immediately.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI urgent research + draft"},
{label:"B",text:"Apply your expertise directly and draft the application yourself tonight.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Expert manual application"},
{label:"C",text:"Brief a specialist barrister immediately and work together overnight.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Barrister collaboration"},
]},
],
"Manufacturing":[
{id:1,text:"Your team needs technical assembly instructions for a new product line.",options:[
{label:"A",text:"Use AI to generate all assembly documentation from CAD data automatically.",energyWh:250,waterMl:175,co2g:100,weight:2,moralScore:0,impactLabel:"AI auto-generated docs"},
{label:"B",text:"Use AI to draft the structure; write the critical safety steps yourself.",energyWh:50,waterMl:35,co2g:20,weight:4,moralScore:1,impactLabel:"AI structure + manual safety"},
{label:"C",text:"Write all assembly instructions based on prototype build observations.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual build-observed docs"},
]},
{id:2,text:"You want to analyse defect data from the last 12 months of production.",options:[
{label:"A",text:"Feed all production and defect records into an AI analytics platform.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"Full AI defect analytics"},
{label:"B",text:"Use a Pareto analysis in a spreadsheet to identify the top defect causes.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual Pareto analysis"},
{label:"C",text:"Review defect reports with the quality team in a structured session.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team quality review"},
]},
{id:3,text:"Your team spends 2 hours per shift on manual production logging.",options:[
{label:"A",text:"Deploy AI to automate all production data capture and logging.",energyWh:290,waterMl:203,co2g:116,weight:1,moralScore:0,impactLabel:"AI full logging automation"},
{label:"B",text:"Use digital input forms to reduce logging time to 20 minutes.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Digital form entry"},
{label:"C",text:"Redesign the paper log to capture only the essential data.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Streamlined paper log"},
]},
{id:4,text:"You need to manage real-time production scheduling across 6 lines.",options:[
{label:"A",text:"Deploy AI to continuously rebalance all 6 lines in real time.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"AI real-time line balancing"},
{label:"B",text:"Use a rules-based scheduler with manual override for disruptions.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Rules-based + manual override"},
{label:"C",text:"Have production supervisors manage scheduling decisions each shift.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Supervisor-led scheduling"},
]},
{id:5,text:"You need to select a supplier from 5 candidates for a critical component.",options:[
{label:"A",text:"Use AI to score all 5 suppliers across hundreds of data points automatically.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI supplier scoring"},
{label:"B",text:"Create a weighted scorecard and evaluate each supplier manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual weighted scorecard"},
{label:"C",text:"Visit the top 2 suppliers on-site and make the decision from direct assessment.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"On-site supplier visit"},
]},
{id:6,text:"Your process engineering team wants to simulate a new production line layout.",options:[
{label:"A",text:"Use a full AI-powered digital twin simulation for the new layout.",energyWh:490,waterMl:343,co2g:196,weight:1,moralScore:0,impactLabel:"AI digital twin sim"},
{label:"B",text:"Build a simple throughput model in a spreadsheet for the key constraints.",energyWh:6,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Spreadsheet throughput model"},
{label:"C",text:"Arrange a physical layout mockup using cardboard and walk through it.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical layout mockup"},
]},
{id:7,text:"You need to communicate a major production process change to 300 floor workers.",options:[
{label:"A",text:"Use AI to generate personalised communication for each worker role.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI personalised comms"},
{label:"B",text:"Write a clear team brief and hold department meetings to explain it.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Written brief + meetings"},
{label:"C",text:"Brief team leaders first and have them cascade to their teams in person.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team leader cascade"},
]},
{id:8,text:"You want to reduce raw material waste by 15 percent across 3 production lines.",options:[
{label:"A",text:"Use AI to continuously optimise material usage across all 3 lines.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI material optimisation"},
{label:"B",text:"Run a value stream mapping exercise and implement the top 3 improvements.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"VSM + targeted improvements"},
{label:"C",text:"Engage production operators to identify and fix waste sources themselves.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Operator-led waste reduction"},
]},
{id:9,text:"Your quality team needs to inspect 1,000 finished units per day.",options:[
{label:"A",text:"Deploy AI computer vision to inspect all 1,000 units automatically.",energyWh:500,waterMl:350,co2g:200,weight:1,moralScore:0,impactLabel:"AI full unit inspection"},
{label:"B",text:"Use statistical sampling and inspect 50 units per hour manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Statistical sampling"},
{label:"C",text:"Have trained inspectors check every unit using a physical go/no-go gauge.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full manual inspection"},
]},
{id:10,text:"You need to prepare for a difficult negotiation with a key supplier.",options:[
{label:"A",text:"Use AI to compile all supplier data and generate negotiation talking points.",energyWh:165,waterMl:116,co2g:66,weight:2,moralScore:0,impactLabel:"AI negotiation prep"},
{label:"B",text:"Review the contract history and current market prices yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual review + prep"},
{label:"C",text:"Talk to your procurement team and draw on their relationship knowledge.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team relationship knowledge"},
]},
{id:11,text:"Your factory needs to scale output by 40 percent in the next quarter.",options:[
{label:"A",text:"Use AI to redesign the full production system for the increased volume.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI full system redesign"},
{label:"B",text:"Identify the top 3 capacity constraints and address them manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted constraint removal"},
{label:"C",text:"Add an extra shift and hire operators to meet the volume target.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Extra shift + hiring"},
]},
{id:12,text:"A customer is complaining about a recurring defect in delivered products.",options:[
{label:"A",text:"Use AI to analyse all production data and identify the defect source.",energyWh:300,waterMl:210,co2g:120,weight:2,moralScore:0,impactLabel:"AI defect source analysis"},
{label:"B",text:"Walk the production line with the quality team and trace the defect.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Physical line trace"},
{label:"C",text:"Involve the customer in a joint review and resolve it collaboratively.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer joint review"},
]},
{id:13,text:"You need to schedule planned maintenance across 12 machines next month.",options:[
{label:"A",text:"Use AI to optimise the maintenance schedule across all machines.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI maintenance scheduling"},
{label:"B",text:"Schedule maintenance based on service intervals and production calendar.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Interval-based scheduling"},
{label:"C",text:"Ask experienced maintenance technicians to define the best schedule.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Technician-defined schedule"},
]},
{id:14,text:"You want to explore new lean manufacturing techniques for the factory floor.",options:[
{label:"A",text:"Use AI to generate 30 or more lean improvement ideas from production data.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI lean idea generation"},
{label:"B",text:"Run a kaizen workshop with production supervisors and team leaders.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Kaizen workshop"},
{label:"C",text:"Visit a benchmark factory and bring back what you observe.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Benchmark factory visit"},
]},
{id:15,text:"A production line has stopped unexpectedly and is causing costly downtime.",options:[
{label:"A",text:"Use an AI diagnostic tool to analyse machine data and identify the fault.",energyWh:120,waterMl:84,co2g:48,weight:3,moralScore:0,impactLabel:"AI fault diagnosis"},
{label:"B",text:"Follow the troubleshooting procedure with the maintenance engineer.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual troubleshooting"},
{label:"C",text:"Have the lead technician inspect the machine and apply their expertise.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Technician physical inspection"},
]},
{id:16,text:"You need to forecast raw material demand for the next 6 months.",options:[
{label:"A",text:"Build an AI demand forecasting model from all production and order data.",energyWh:330,waterMl:231,co2g:132,weight:1,moralScore:0,impactLabel:"AI demand forecast"},
{label:"B",text:"Use historical consumption and confirmed orders in a spreadsheet.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet demand model"},
{label:"C",text:"Consult the sales team for their order pipeline view.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Sales pipeline consultation"},
]},
{id:17,text:"You need to write work instructions for 20 new manufacturing processes.",options:[
{label:"A",text:"Use AI to auto-generate all 20 work instructions from process data.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI auto work instructions"},
{label:"B",text:"Use a standard template and write each instruction after observing the process.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Template + observation"},
{label:"C",text:"Co-write each work instruction with the operator who runs the process.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Operator co-authored"},
]},
{id:18,text:"New operators on the production line need to learn safe working procedures.",options:[
{label:"A",text:"Use an AI interactive training system to onboard all new operators.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI interactive training"},
{label:"B",text:"Run a structured classroom session followed by supervised on-the-job practice.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Classroom + supervised OJT"},
{label:"C",text:"Pair new operators with an experienced buddy for 2 weeks on the line.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Buddy system"},
]},
{id:19,text:"Before shipping a new product batch you need to verify every unit meets spec.",options:[
{label:"A",text:"Use AI computer vision to verify every unit in the batch automatically.",energyWh:470,waterMl:329,co2g:188,weight:1,moralScore:0,impactLabel:"AI batch verification"},
{label:"B",text:"Sample inspect 10 percent of the batch against the acceptance criteria.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Statistical sample inspection"},
{label:"C",text:"Have QC inspectors physically verify a random sample from each pallet.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical random sampling"},
]},
{id:20,text:"A critical machine failure is threatening to miss a major customer delivery.",options:[
{label:"A",text:"Query an AI maintenance system for the fastest repair route.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:0,impactLabel:"AI repair routing"},
{label:"B",text:"Call in the maintenance team and the machine supplier for immediate support.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Maintenance team + supplier"},
{label:"C",text:"Reroute production to the backup line while repairing the failed machine.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Backup line rerouting"},
]},
],
"Marketing & Advertising":[
{id:1,text:"Your agency needs to produce 60 social media posts for a brand campaign.",options:[
{label:"A",text:"Use AI to generate all 60 posts from the campaign brief.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI generates all 60 posts"},
{label:"B",text:"Write 10 core posts manually and use AI to adapt them to each platform.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"10 manual + AI platform adapt"},
{label:"C",text:"Write all 60 posts yourself from the campaign strategy.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual copywriting"},
]},
{id:2,text:"You need to segment and analyse customer data from 100,000 campaign responses.",options:[
{label:"A",text:"Feed all data into an AI clustering model for deep behavioural segmentation.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI deep segmentation"},
{label:"B",text:"Apply your existing segmentation model to the new campaign data.",energyWh:25,waterMl:18,co2g:10,weight:5,moralScore:1,impactLabel:"Existing model applied"},
{label:"C",text:"Analyse the key response metrics manually in a spreadsheet.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual metrics analysis"},
]},
{id:3,text:"Your team sends 20 personalised email variations per campaign manually.",options:[
{label:"A",text:"Use AI to generate 200 hyper-personalised email variations automatically.",energyWh:340,waterMl:238,co2g:136,weight:1,moralScore:0,impactLabel:"200 AI email variations"},
{label:"B",text:"Create 5 carefully crafted variants and use A/B testing to find the best.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"5 manual variants + A/B test"},
{label:"C",text:"Write one strong personalised email for each audience segment.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual segment emails"},
]},
{id:4,text:"You are presenting campaign ideas to a client in 2 hours and need visuals.",options:[
{label:"A",text:"Generate a full set of AI mockups for all concept directions right now.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"Full AI mockup generation"},
{label:"B",text:"Sketch the key concepts and show strong verbal rationale instead.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Sketches + verbal rationale"},
{label:"C",text:"Present the strategy and storytelling first; share visuals after the meeting.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Strategy-first presentation"},
]},
{id:5,text:"A client wants to test 5 different brand voices for their new product launch.",options:[
{label:"A",text:"Use AI to generate 20 copy samples per voice direction instantly.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI 100 copy samples"},
{label:"B",text:"Write 3 strong samples per voice yourself and present those.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual 15 samples"},
{label:"C",text:"Write 1 sample per voice and use the meeting to develop them collaboratively.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Collaborative voice workshop"},
]},
{id:6,text:"You need to simulate how a campaign might perform before committing the budget.",options:[
{label:"A",text:"Run an AI predictive model on thousands of audience scenarios.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI audience simulation"},
{label:"B",text:"Run a small-budget pilot campaign to get real data before full launch.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Real pilot campaign"},
{label:"C",text:"Apply industry benchmarks and your team's past campaign data.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Benchmark-based estimate"},
]},
{id:7,text:"Your client needs a brand positioning statement and key messages document.",options:[
{label:"A",text:"Use AI to generate the full positioning document from research notes.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"AI positioning document"},
{label:"B",text:"Run a positioning workshop with the team and write it up yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Workshop + manual write-up"},
{label:"C",text:"Develop the positioning through structured client interviews.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Client interview approach"},
]},
{id:8,text:"You want to optimise ad spend allocation across 6 channels this quarter.",options:[
{label:"A",text:"Use an AI budget optimisation tool to reallocate spend continuously.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI continuous spend optimisation"},
{label:"B",text:"Review channel ROAS monthly and reallocate manually based on performance.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Monthly manual ROAS review"},
{label:"C",text:"Agree a fixed allocation based on strategy and only adjust at campaign end.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fixed strategic allocation"},
]},
{id:9,text:"You want to monitor brand sentiment across social media in real time.",options:[
{label:"A",text:"Deploy AI to monitor and score all brand mentions 24/7 across all platforms.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"24/7 AI sentiment monitoring"},
{label:"B",text:"Set keyword alerts and review a daily digest of flagged mentions.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Daily digest + manual review"},
{label:"C",text:"Have a team member check brand mentions manually each morning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Daily manual check"},
]},
{id:10,text:"You want to write compelling copy for 3 digital ads before lunch.",options:[
{label:"A",text:"Generate 10 headline variations per ad with AI and select the best.",energyWh:120,waterMl:84,co2g:48,weight:2,moralScore:0,impactLabel:"AI headline generation"},
{label:"B",text:"Write 3 headline options per ad yourself using the brief.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual ad copywriting"},
{label:"C",text:"Write one strong version per ad and refine it with the creative director.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Single strong version + review"},
]},
{id:11,text:"Your agency is pitching for a large account and needs to scale campaign ideas.",options:[
{label:"A",text:"Use AI to generate 50 or more campaign concept proposals for the pitch.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"50+ AI concept proposals"},
{label:"B",text:"Brainstorm intensely as a team and develop the 5 strongest ideas fully.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team brainstorm + 5 developed"},
{label:"C",text:"Develop 2 deeply considered campaign ideas and present them with conviction.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"2 deeply developed ideas"},
]},
{id:12,text:"A client asks you to respond urgently to a social media crisis.",options:[
{label:"A",text:"Use AI to draft a crisis response and social media statement immediately.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI crisis draft"},
{label:"B",text:"Apply your crisis communications framework and draft a response yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Framework-based response"},
{label:"C",text:"Call the client first to agree the response approach before publishing anything.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Client consult before response"},
]},
{id:13,text:"You need to allocate your creative team across 4 simultaneous client campaigns.",options:[
{label:"A",text:"Use AI resource management to auto-allocate all creative work.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI resource allocation"},
{label:"B",text:"Hold a weekly resource meeting and allocate manually based on capacity.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Weekly manual allocation"},
{label:"C",text:"Let creative directors self-manage their team's capacity.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"CD self-management"},
]},
{id:14,text:"You want to develop a breakthrough creative idea that has never been done before.",options:[
{label:"A",text:"Use AI to generate hundreds of creative territory ideas to explore.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI territory generation"},
{label:"B",text:"Run an intensive two-day off-site creative workshop.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Intensive creative workshop"},
{label:"C",text:"Immerse in the brand's world for a week before generating any ideas.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Deep brand immersion"},
]},
{id:15,text:"Campaign results are lower than expected and you need to understand why.",options:[
{label:"A",text:"Use AI to analyse all campaign data for performance signals.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI performance analysis"},
{label:"B",text:"Review the funnel metrics manually and identify the biggest drop-off point.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual funnel review"},
{label:"C",text:"Run 10 customer interviews to understand why they didn't respond.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer interviews"},
]},
{id:16,text:"You need to forecast which content types will drive the most engagement next quarter.",options:[
{label:"A",text:"Use an AI forecasting model trained on your content performance history.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI content forecast"},
{label:"B",text:"Review your last 12 months of content data and identify the trends yourself.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual trend analysis"},
{label:"C",text:"Survey your audience about the content they find most valuable.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Audience survey"},
]},
{id:17,text:"You need to produce a campaign post-mortem report for the client.",options:[
{label:"A",text:"Use AI to auto-generate the full report from campaign data.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI auto post-mortem"},
{label:"B",text:"Pull the key metrics yourself and write the analysis and recommendations.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual metrics + analysis"},
{label:"C",text:"Hold a joint review session with the client to co-write the learnings.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Joint client review"},
]},
{id:18,text:"New junior copywriters need to learn your agency's tone of voice guidelines.",options:[
{label:"A",text:"Use an AI training tool that generates exercises from your brand guidelines.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"AI training tool"},
{label:"B",text:"Give them the guidelines, example work, and weekly feedback on their copy.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Guidelines + weekly feedback"},
{label:"C",text:"Assign them to work directly under your best senior copywriter.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior copywriter mentorship"},
]},
{id:19,text:"Before submitting a campaign for client approval all copy must be accurate.",options:[
{label:"A",text:"Run all copy through an AI fact-checking and brand compliance tool.",energyWh:235,waterMl:165,co2g:94,weight:2,moralScore:0,impactLabel:"AI copy compliance check"},
{label:"B",text:"Have a second copywriter proofread and check all claims manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual peer proofread"},
{label:"C",text:"Read every piece of copy aloud as a final check before submitting.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Read-aloud final check"},
]},
{id:20,text:"A brand is in a PR crisis and needs a statement published in the next hour.",options:[
{label:"A",text:"Use AI to draft the crisis statement from the key facts immediately.",energyWh:155,waterMl:109,co2g:62,weight:2,moralScore:0,impactLabel:"AI crisis statement"},
{label:"B",text:"Apply your crisis PR framework and draft the statement yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Framework-driven draft"},
{label:"C",text:"Get senior sign-off on key messages before writing anything.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior sign-off first"},
]},
],
"Media & Entertainment":[
{id:1,text:"You need to generate thumbnail concepts for 30 YouTube videos.",options:[
{label:"A",text:"Use AI image generation to create all 30 thumbnails automatically.",energyWh:336,waterMl:235,co2g:134,weight:1,moralScore:0,impactLabel:"30 AI-generated thumbnails"},
{label:"B",text:"Design 5 strong thumbnail templates and adapt them manually for each video.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"5 templates + manual adapt"},
{label:"C",text:"Design every thumbnail by hand based on the individual video content.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual per-video design"},
]},
{id:2,text:"Your production company needs to analyse audience data for a new series pitch.",options:[
{label:"A",text:"Use AI to analyse all viewing data and generate audience insight reports.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI full audience analysis"},
{label:"B",text:"Run key queries yourself on your analytics platform.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Manual analytics queries"},
{label:"C",text:"Talk to your commissioners and audience directly for insight.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct audience consultation"},
]},
{id:3,text:"Your post-production team needs subtitles for 50 hours of video content.",options:[
{label:"A",text:"Use AI to auto-transcribe and subtitle all 50 hours.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI auto-subtitle 50 hrs"},
{label:"B",text:"Use AI transcription and have an editor review and correct all subtitles.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"AI transcription + editor review"},
{label:"C",text:"Transcribe and subtitle everything manually.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:2,impactLabel:"Manual transcription"},
]},
{id:4,text:"You need a live real-time content recommendation engine for your streaming platform.",options:[
{label:"A",text:"Build and run a full AI personalisation engine for all users.",energyWh:500,waterMl:350,co2g:200,weight:1,moralScore:0,impactLabel:"AI personalisation engine"},
{label:"B",text:"Use a collaborative filtering model based on genre and watch history.",energyWh:55,waterMl:39,co2g:22,weight:3,moralScore:1,impactLabel:"Collaborative filtering"},
{label:"C",text:"Use a curated editorial team to create weekly featured content lists.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Editorial curation"},
]},
{id:5,text:"Your team needs to choose between 3 script concepts for a new drama series.",options:[
{label:"A",text:"Use AI to score and compare all 3 scripts across 50 narrative criteria.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI script scoring"},
{label:"B",text:"Have each team member read the scripts and vote with a shared rubric.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team read + rubric vote"},
{label:"C",text:"Hold a creative story conference and let the best argument win.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Creative story conference"},
]},
{id:6,text:"Your animation studio wants to pre-visualise a complex action sequence.",options:[
{label:"A",text:"Use AI to generate a full animated previz of the sequence.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"AI animated previz"},
{label:"B",text:"Create a hand-drawn storyboard and a simple 3D blockout.",energyWh:8,waterMl:6,co2g:3,weight:5,moralScore:1,impactLabel:"Storyboard + 3D blockout"},
{label:"C",text:"Board the sequence by hand and present it to the director.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Hand-drawn storyboard"},
]},
{id:7,text:"Your podcast team needs episode show notes written for 20 episodes.",options:[
{label:"A",text:"Use AI to generate all 20 sets of show notes from transcripts.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI auto show notes"},
{label:"B",text:"Use AI to create a summary; write the key highlights yourself.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"AI summary + manual highlights"},
{label:"C",text:"Write show notes yourself by listening to each episode.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual show notes"},
]},
{id:8,text:"Your production schedule is overrun and you need to find time savings.",options:[
{label:"A",text:"Use AI to analyse the full production schedule and reoptimise it.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI schedule reoptimisation"},
{label:"B",text:"Review the schedule with your line producer and identify delays manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Producer schedule review"},
{label:"C",text:"Get the whole production team in a room and solve the overrun together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team schedule crisis meeting"},
]},
{id:9,text:"You want to monitor how your new film is tracking across social platforms.",options:[
{label:"A",text:"Deploy AI to track all mentions and sentiment across every platform 24/7.",energyWh:440,waterMl:308,co2g:176,weight:1,moralScore:0,impactLabel:"24/7 AI social monitoring"},
{label:"B",text:"Set keyword alerts and review a daily morning report.",energyWh:12,waterMl:8,co2g:5,weight:5,moralScore:1,impactLabel:"Daily alert digest"},
{label:"C",text:"Have a team member check the key social channels each morning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Daily manual check"},
]},
{id:10,text:"You want to write a new pitch document for a documentary series idea.",options:[
{label:"A",text:"Use AI to write the full pitch document from your notes.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI pitch document"},
{label:"B",text:"Use AI to refine your own rough draft for language and flow.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Manual draft + AI refine"},
{label:"C",text:"Write the pitch entirely yourself from your creative vision.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual pitch"},
]},
{id:11,text:"Your studio needs to scale content output to meet a platform delivery commitment.",options:[
{label:"A",text:"Use AI to generate a significant portion of the required content.",energyWh:490,waterMl:343,co2g:196,weight:1,moralScore:0,impactLabel:"AI content generation"},
{label:"B",text:"Commission additional freelance writers and directors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Freelance commissioning"},
{label:"C",text:"Renegotiate the delivery schedule with the platform.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Schedule renegotiation"},
]},
{id:12,text:"A viewer has sent a detailed complaint about content accuracy in a documentary.",options:[
{label:"A",text:"Use AI to cross-check all factual claims in the documentary against sources.",energyWh:250,waterMl:175,co2g:100,weight:2,moralScore:0,impactLabel:"AI fact-check review"},
{label:"B",text:"Have the documentary's researcher review the specific claims cited.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Researcher targeted review"},
{label:"C",text:"Respond personally to the viewer, investigate, and correct if warranted.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal response + correction"},
]},
{id:13,text:"You need to schedule 4 overlapping production shoots across the next month.",options:[
{label:"A",text:"Use AI production scheduling software to optimise all crew and equipment.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI production scheduling"},
{label:"B",text:"Use a shared calendar and spreadsheet to coordinate crew and kit.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Shared calendar + spreadsheet"},
{label:"C",text:"Have your production manager coordinate everything via direct team communication.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct team coordination"},
]},
{id:14,text:"You want to develop an original series format that has not been done before.",options:[
{label:"A",text:"Use AI to generate hundreds of format concept ideas as starting points.",energyWh:390,waterMl:273,co2g:156,weight:1,moralScore:0,impactLabel:"AI format idea generation"},
{label:"B",text:"Run a 2-day format development workshop with your creative team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Creative format workshop"},
{label:"C",text:"Develop the format from a deep observation of how your audience lives.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Audience observation-led"},
]},
{id:15,text:"An edit is not working and the director needs to understand why.",options:[
{label:"A",text:"Use an AI edit analysis tool to identify pacing and structure issues.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI edit analysis"},
{label:"B",text:"Watch the cut with the editor and note specific moments that lose momentum.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Watched + noted issues"},
{label:"C",text:"Screen the cut to a fresh test audience and collect their feedback.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Test audience screening"},
]},
{id:16,text:"You need to forecast audience numbers for a new series before commissioning.",options:[
{label:"A",text:"Build an AI audience prediction model from comparable title data.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI audience prediction"},
{label:"B",text:"Analyse comparable titles manually and apply genre benchmark figures.",energyWh:4,waterMl:3,co2g:2,weight:5,moralScore:1,impactLabel:"Comparable title analysis"},
{label:"C",text:"Survey a sample of your target audience for their interest level.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Audience interest survey"},
]},
{id:17,text:"Your production needs delivery documents and technical specifications for the broadcaster.",options:[
{label:"A",text:"Use AI to generate all delivery documents from the technical brief.",energyWh:205,waterMl:144,co2g:82,weight:2,moralScore:0,impactLabel:"AI delivery documents"},
{label:"B",text:"Complete the broadcaster's standard delivery template yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual template completion"},
{label:"C",text:"Have your technical delivery specialist prepare the documents.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Specialist preparation"},
]},
{id:18,text:"New junior editors need to learn your studio's house editing style.",options:[
{label:"A",text:"Use an AI editing assistant to guide their decisions on each cut.",energyWh:215,waterMl:151,co2g:86,weight:2,moralScore:0,impactLabel:"AI editing guidance"},
{label:"B",text:"Give them a style guide and have them re-cut a classic example sequence.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Style guide + practice cut"},
{label:"C",text:"Sit with each junior editor and review their cuts in person.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal cut review"},
]},
{id:19,text:"Before delivering a final cut to the broadcaster all compliance checks must pass.",options:[
{label:"A",text:"Run the full programme through an AI compliance and QC tool.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI compliance QC"},
{label:"B",text:"Run the standard automated loudness and technical QC suite.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Automated technical QC"},
{label:"C",text:"Have an experienced compliance officer screen the programme manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual compliance screening"},
]},
{id:20,text:"A breaking news story requires your outlet to produce content in the next 30 minutes.",options:[
{label:"A",text:"Use AI to draft a full news story from the wire report immediately.",energyWh:100,waterMl:70,co2g:40,weight:2,moralScore:0,impactLabel:"AI news story draft"},
{label:"B",text:"Write the story yourself from the wire report and verified sources.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual journalist writing"},
{label:"C",text:"Verify the story with a primary source before publishing anything.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Verify first then publish"},
]},
],
"Non-profit & NGO":[
{id:1,text:"Your organisation needs to produce its annual impact report for donors.",options:[
{label:"A",text:"Use AI to generate the full report from programme data and case studies.",energyWh:225,waterMl:158,co2g:90,weight:2,moralScore:0,impactLabel:"AI full report generation"},
{label:"B",text:"Use AI to draft the data sections; write the narrative and stories yourself.",energyWh:50,waterMl:35,co2g:20,weight:4,moralScore:1,impactLabel:"AI data + manual narrative"},
{label:"C",text:"Write the full report yourself from field notes and beneficiary stories.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual impact report"},
]},
{id:2,text:"You need to analyse programme outcome data from 5 years of field work.",options:[
{label:"A",text:"Feed all field data into an AI analysis platform for pattern discovery.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI full field data analysis"},
{label:"B",text:"Use your M&E framework to analyse the key indicators yourself.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"M&E framework analysis"},
{label:"C",text:"Conduct participatory evaluation sessions with the communities you serve.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Participatory evaluation"},
]},
{id:3,text:"Your team spends many hours manually processing volunteer applications each month.",options:[
{label:"A",text:"Deploy AI to automatically screen and rank all volunteer applications.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI application screening"},
{label:"B",text:"Use a simple scoring form to standardise manual screening.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Standardised manual scoring"},
{label:"C",text:"Interview every applicant briefly before making selection decisions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Interview-based selection"},
]},
{id:4,text:"Your field team needs immediate support identifying safe routes during a disaster response.",options:[
{label:"A",text:"Use an AI mapping tool to analyse real-time data and suggest routes.",energyWh:150,waterMl:105,co2g:60,weight:2,moralScore:0,impactLabel:"AI real-time routing"},
{label:"B",text:"Use the offline mapping tools and liaison network from your emergency kit.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Offline emergency kit"},
{label:"C",text:"Coordinate with local partners and community leaders who know the area.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Community partner coordination"},
]},
{id:5,text:"Your board needs evidence to decide whether to expand into a new programme area.",options:[
{label:"A",text:"Use AI to synthesise all evidence on the new programme area globally.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI evidence synthesis"},
{label:"B",text:"Review key published evaluations and write a summary recommendation.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual evidence review"},
{label:"C",text:"Visit a similar programme run by another organisation before deciding.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Peer organisation visit"},
]},
{id:6,text:"You want to model the projected impact of scaling your programme by 3 times.",options:[
{label:"A",text:"Use AI to build a full impact model with thousands of scaling scenarios.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI scaling impact model"},
{label:"B",text:"Extend your current M&E model with 3 scaling scenarios in a spreadsheet.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Spreadsheet scaling model"},
{label:"C",text:"Consult programme staff and beneficiaries about what scaling would mean.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Staff and beneficiary consultation"},
]},
{id:7,text:"You need to write a grant application for a major institutional funder.",options:[
{label:"A",text:"Use AI to draft the full grant application from your programme notes.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI grant draft"},
{label:"B",text:"Use a past successful application as a template and write the content yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Past template + manual content"},
{label:"C",text:"Write the application entirely yourself to ensure it reflects your mission voice.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual application"},
]},
{id:8,text:"Your donation processing is slow and causing delays in fund deployment.",options:[
{label:"A",text:"Deploy AI to automate the full donation workflow from receipt to allocation.",energyWh:290,waterMl:203,co2g:116,weight:1,moralScore:0,impactLabel:"AI full workflow automation"},
{label:"B",text:"Adopt a charity payment platform that automates the standard steps.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Platform automation"},
{label:"C",text:"Redesign the manual process with clear roles and a faster approval chain.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Process redesign"},
]},
{id:9,text:"You want to monitor whether your field programmes are delivering against targets.",options:[
{label:"A",text:"Deploy AI to analyse all field data and flag performance deviations.",energyWh:340,waterMl:238,co2g:136,weight:1,moralScore:0,impactLabel:"AI performance monitoring"},
{label:"B",text:"Use a monthly dashboard with the 5 KPIs that matter most.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Monthly KPI dashboard"},
{label:"C",text:"Hold monthly programme reviews with field team leads.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Monthly programme reviews"},
]},
{id:10,text:"You need to prepare a donor update on your programme's progress this quarter.",options:[
{label:"A",text:"Use AI to auto-generate a personalised update for each major donor.",energyWh:165,waterMl:116,co2g:66,weight:2,moralScore:0,impactLabel:"AI personalised donor updates"},
{label:"B",text:"Write one strong quarterly update and send it to all major donors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Single manual update"},
{label:"C",text:"Call your top 5 donors personally to share progress and thank them.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal donor calls"},
]},
{id:11,text:"Your organisation is scaling its operations to reach 10 times more beneficiaries.",options:[
{label:"A",text:"Deploy AI systems to manage all programme operations at scale.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI full operational scaling"},
{label:"B",text:"Build strong community partnerships to deliver the programme locally.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Community partnership model"},
{label:"C",text:"Train local facilitators in-community and delegate programme delivery.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Local facilitator model"},
]},
{id:12,text:"A community member is asking for help accessing a service your NGO doesn't provide.",options:[
{label:"A",text:"Use an AI referral tool to identify and connect the person to services.",energyWh:120,waterMl:84,co2g:48,weight:3,moralScore:0,impactLabel:"AI referral system"},
{label:"B",text:"Use your referral network and contact the most appropriate service directly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Referral network contact"},
{label:"C",text:"Accompany the person to the service or stay on the phone until they get help.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal accompaniment"},
]},
{id:13,text:"You need to allocate a small grants budget fairly across 15 community projects.",options:[
{label:"A",text:"Use AI to score all 15 projects against allocation criteria automatically.",energyWh:145,waterMl:102,co2g:58,weight:2,moralScore:0,impactLabel:"AI allocation scoring"},
{label:"B",text:"Score each project manually against clear criteria as a panel.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Panel manual scoring"},
{label:"C",text:"Hold a participatory allocation process with community representatives.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Participatory allocation"},
]},
{id:14,text:"You want to develop new programme approaches to tackle a persistent social challenge.",options:[
{label:"A",text:"Use AI to review global evidence and generate programme design concepts.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI programme design"},
{label:"B",text:"Run a co-design workshop with the communities you serve.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Community co-design"},
{label:"C",text:"Immerse in the community for a month before designing any programme.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Community immersion"},
]},
{id:15,text:"A programme has not delivered expected results and you need to understand why.",options:[
{label:"A",text:"Use AI to analyse all programme data and generate a failure analysis.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI failure analysis"},
{label:"B",text:"Conduct a structured after-action review with the programme team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team after-action review"},
{label:"C",text:"Ask beneficiaries directly what worked and what did not.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Beneficiary feedback"},
]},
{id:16,text:"You need to forecast the funding gap your organisation will face next year.",options:[
{label:"A",text:"Build an AI financial forecasting model from all income and expenditure data.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI funding gap forecast"},
{label:"B",text:"Project income and costs in a spreadsheet using confirmed and likely funding.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet projection"},
{label:"C",text:"Talk to your major donors about their likely giving intentions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Donor intention conversations"},
]},
{id:17,text:"Your organisation needs a new theory of change document for a strategic review.",options:[
{label:"A",text:"Use AI to generate the theory of change from programme documents.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI theory of change"},
{label:"B",text:"Facilitate a team workshop and document the outcome yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Workshop + manual write-up"},
{label:"C",text:"Develop the theory of change with beneficiaries as co-authors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Beneficiary co-authored"},
]},
{id:18,text:"New volunteers need to understand your safeguarding policies before field work.",options:[
{label:"A",text:"Use an AI e-learning system to train all volunteers automatically.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI e-learning training"},
{label:"B",text:"Run a 3-hour safeguarding induction with scenarios and discussion.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Induction workshop"},
{label:"C",text:"Pair new volunteers with experienced staff for supervised field visits first.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Supervised field experience"},
]},
{id:19,text:"Before submitting a programme report to a major funder all data must be verified.",options:[
{label:"A",text:"Run all data and claims through an AI verification tool.",energyWh:235,waterMl:165,co2g:94,weight:2,moralScore:0,impactLabel:"AI data verification"},
{label:"B",text:"Have the M&E officer independently check all figures against source data.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"M&E independent check"},
{label:"C",text:"Return to the field and verify the most critical data points directly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Field verification"},
]},
{id:20,text:"Your field team reports a safeguarding concern and needs guidance immediately.",options:[
{label:"A",text:"Query an AI safeguarding decision tool for the recommended response.",energyWh:40,waterMl:28,co2g:16,weight:4,moralScore:0,impactLabel:"AI safeguarding tool"},
{label:"B",text:"Apply the safeguarding protocol and contact the designated lead.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Protocol + designated lead"},
{label:"C",text:"Prioritise the person at risk, act immediately, and document everything.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Person-centred immediate response"},
]},
],
"Real Estate":[
{id:1,text:"You need to write property listings for 40 new homes coming to market.",options:[
{label:"A",text:"Use AI to generate all 40 listings from the property data sheets.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI auto-generated listings"},
{label:"B",text:"Write a strong template and adapt the key details for each property.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Template + manual adapt"},
{label:"C",text:"Visit each property and write the listing from your direct impression.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Visit-based manual listing"},
]},
{id:2,text:"You want to analyse market price trends across a whole district to advise a client.",options:[
{label:"A",text:"Feed all transaction data into an AI property analytics platform.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"AI market analytics"},
{label:"B",text:"Review the last 12 months of comparable sales yourself.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual comparables review"},
{label:"C",text:"Talk to local agents and your network for on-the-ground market insight.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Network-based insight"},
]},
{id:3,text:"Your agency sends viewing confirmation and follow-up emails to 200 clients daily.",options:[
{label:"A",text:"Use AI to personalise and automate all client communications.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI personalised all comms"},
{label:"B",text:"Use templates for standard emails; write personal notes for serious buyers.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Templates + manual personal"},
{label:"C",text:"Write and send every client email personally.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal client emails"},
]},
{id:4,text:"A commercial landlord wants real-time yield optimisation across a 50-property portfolio.",options:[
{label:"A",text:"Deploy an AI model to continuously optimise rents and lease terms.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI continuous yield optimisation"},
{label:"B",text:"Review market rents quarterly and adjust manually at lease renewals.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Quarterly manual review"},
{label:"C",text:"Meet with each tenant at renewal to discuss terms face to face.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal tenant meetings"},
]},
{id:5,text:"A buyer wants to know which of 8 shortlisted properties best meets their criteria.",options:[
{label:"A",text:"Use AI to score all 8 properties against the buyer's full criteria list.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI property scoring"},
{label:"B",text:"Walk through each property with the buyer and discuss tradeoffs.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Guided buyer walkthrough"},
{label:"C",text:"Help the buyer articulate their priorities first then let them decide.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Buyer-led priority setting"},
]},
{id:6,text:"A developer wants to simulate the ROI of a proposed mixed-use development.",options:[
{label:"A",text:"Build a full AI financial model with thousands of scenario combinations.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI full scenario model"},
{label:"B",text:"Build a 3-scenario financial model yourself using market assumptions.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual 3-scenario model"},
{label:"C",text:"Consult an independent surveyor before building any financial projections.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Independent surveyor first"},
]},
{id:7,text:"You need to respond to 50 property enquiries that came in this morning.",options:[
{label:"A",text:"Use AI to auto-respond to all 50 enquiries with personalised messages.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI auto-response"},
{label:"B",text:"Send templated responses and personally call the most serious enquiries.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Templates + personal calls"},
{label:"C",text:"Call every enquirer personally before sending any written follow-up.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal call first"},
]},
{id:8,text:"You want to reduce the time it takes to qualify and match buyers to properties.",options:[
{label:"A",text:"Use AI to match buyers to properties automatically from their search criteria.",energyWh:250,waterMl:175,co2g:100,weight:2,moralScore:0,impactLabel:"AI auto-matching"},
{label:"B",text:"Use a filtering tool for initial matches then review the list yourself.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Filter + manual review"},
{label:"C",text:"Have a detailed needs conversation with each buyer before suggesting properties.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Needs conversation first"},
]},
{id:9,text:"You need to monitor valuation changes across your commercial portfolio.",options:[
{label:"A",text:"Deploy AI to continuously revalue and flag changes in all properties.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI continuous revaluation"},
{label:"B",text:"Conduct formal valuations annually and use desktop reviews quarterly.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Annual + quarterly review"},
{label:"C",text:"Commission an independent surveyor for formal valuations each year.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Annual independent valuation"},
]},
{id:10,text:"You need to prepare a market update report for your top 20 landlord clients.",options:[
{label:"A",text:"Use AI to auto-generate a personalised report for each client.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI personalised reports"},
{label:"B",text:"Write one strong market update and personalise the intro for each client.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"One report + personal intro"},
{label:"C",text:"Meet your top clients individually to discuss the market face to face.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Individual client meetings"},
]},
{id:11,text:"Your agency is expanding to cover 3 new towns and needs to scale operations.",options:[
{label:"A",text:"Deploy AI to manage all new-town client communications and matching.",energyWh:430,waterMl:301,co2g:172,weight:1,moralScore:0,impactLabel:"AI managed expansion"},
{label:"B",text:"Hire local agents in each town who know those markets.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Local agent hiring"},
{label:"C",text:"Partner with established local agencies before setting up your own offices.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Local partnership model"},
]},
{id:12,text:"A buyer is unhappy about the condition of a property discovered at survey.",options:[
{label:"A",text:"Use AI to generate a list of comparable properties and renegotiation scenarios.",energyWh:160,waterMl:112,co2g:64,weight:2,moralScore:0,impactLabel:"AI scenario generation"},
{label:"B",text:"Review comparables yourself and advise the buyer on their options.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual comparables + advice"},
{label:"C",text:"Bring the buyer and seller together to negotiate the issue directly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct negotiation facilitation"},
]},
{id:13,text:"Your office needs to allocate 8 agents to different property segments next quarter.",options:[
{label:"A",text:"Use AI performance analytics to optimise the agent-to-segment allocation.",energyWh:175,waterMl:123,co2g:70,weight:2,moralScore:0,impactLabel:"AI performance allocation"},
{label:"B",text:"Review each agent's track record and assign segments based on strengths.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual strengths review"},
{label:"C",text:"Let agents choose their preferred segments and discuss conflicts as a team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Agent preference + discussion"},
]},
{id:14,text:"You want to identify undervalued properties in an emerging neighbourhood.",options:[
{label:"A",text:"Use AI to analyse all available data and flag undervalued assets.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI undervalue detection"},
{label:"B",text:"Walk the neighbourhood and review transactions for the last 2 years.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Physical + manual research"},
{label:"C",text:"Talk to local business owners and residents about the area's trajectory.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Community insight research"},
]},
{id:15,text:"A transaction has stalled due to a legal issue and the deadline is at risk.",options:[
{label:"A",text:"Use AI to research the legal issue and generate resolution options.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI legal research"},
{label:"B",text:"Call the solicitors on both sides and work through the issue together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Direct solicitor coordination"},
{label:"C",text:"Escalate to a specialist conveyancer and let them resolve it.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Specialist escalation"},
]},
{id:16,text:"You want to forecast which property types will be most in demand next year.",options:[
{label:"A",text:"Use an AI market forecasting model trained on economic and demographic data.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI market forecast"},
{label:"B",text:"Analyse planning applications, demographic trends, and rental yields yourself.",energyWh:4,waterMl:3,co2g:2,weight:5,moralScore:1,impactLabel:"Manual trend analysis"},
{label:"C",text:"Talk to developers, mortgage brokers, and local planners.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Stakeholder network research"},
]},
{id:17,text:"You need to update your agency's property marketing guidelines for the new year.",options:[
{label:"A",text:"Use AI to rewrite the guidelines from your current version.",energyWh:170,waterMl:119,co2g:68,weight:2,moralScore:0,impactLabel:"AI guidelines rewrite"},
{label:"B",text:"Review and update the sections that are out of date.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Ask your best-performing agents to co-write the updated guidelines.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Agent co-authored guidelines"},
]},
{id:18,text:"New agents joining your team need to learn property valuation and market knowledge.",options:[
{label:"A",text:"Use an AI learning platform to train all new agents on demand.",energyWh:215,waterMl:151,co2g:86,weight:2,moralScore:0,impactLabel:"AI training platform"},
{label:"B",text:"Pair them with senior agents and have them attend 20 valuations as observers.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Observation programme"},
{label:"C",text:"Have each new agent independently value 10 properties and review their reasoning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Supervised valuation practice"},
]},
{id:19,text:"Before listing a property you need to verify all details in the marketing brochure.",options:[
{label:"A",text:"Use AI to cross-check the brochure against the property records.",energyWh:140,waterMl:98,co2g:56,weight:3,moralScore:0,impactLabel:"AI cross-check"},
{label:"B",text:"Walk through the brochure with a checklist against the Land Registry.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Checklist-based check"},
{label:"C",text:"Visit the property again before listing to verify every detail in person.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical re-inspection"},
]},
{id:20,text:"A flood warning has been issued for an area where you have 10 active sales.",options:[
{label:"A",text:"Use AI to assess flood risk for all 10 properties and generate buyer alerts.",energyWh:145,waterMl:102,co2g:58,weight:2,moralScore:0,impactLabel:"AI flood risk assessment"},
{label:"B",text:"Contact all buyers and solicitors personally to disclose the flood warning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Personal buyer notification"},
{label:"C",text:"Pause all transactions in the area until you have full information.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Transaction pause + assessment"},
]},
],
"Research & Science":[
{id:1,text:"You need to write a literature review section for a research paper.",options:[
{label:"A",text:"Use AI to generate the full literature review from a list of papers.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI literature review"},
{label:"B",text:"Use AI to summarise each paper; synthesise the themes yourself.",energyWh:60,waterMl:42,co2g:24,weight:4,moralScore:1,impactLabel:"AI summaries + manual synthesis"},
{label:"C",text:"Read all papers yourself and write the review from your own understanding.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full manual literature review"},
]},
{id:2,text:"You have a large genomic dataset and want to identify statistically significant patterns.",options:[
{label:"A",text:"Use a deep learning model to search for patterns across the full dataset.",energyWh:500,waterMl:350,co2g:200,weight:1,moralScore:0,impactLabel:"Deep learning pattern search"},
{label:"B",text:"Run targeted statistical tests based on your specific hypotheses.",energyWh:40,waterMl:28,co2g:16,weight:4,moralScore:1,impactLabel:"Hypothesis-driven statistics"},
{label:"C",text:"Analyse the dataset manually using established statistical software.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:2,impactLabel:"Manual statistical analysis"},
]},
{id:3,text:"Your lab needs to process 500 tissue sample images for a pathology study.",options:[
{label:"A",text:"Use AI image analysis to process and classify all 500 images automatically.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI batch image analysis"},
{label:"B",text:"Use AI to flag ambiguous cases; pathologists classify the clear-cut ones.",energyWh:90,waterMl:63,co2g:36,weight:3,moralScore:1,impactLabel:"AI flags + expert classify"},
{label:"C",text:"Have trained pathologists classify all 500 images manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Full expert classification"},
]},
{id:4,text:"You need peer-reviewed references to support a grant application quickly.",options:[
{label:"A",text:"Use an AI research assistant to find and summarise all relevant references.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI reference discovery"},
{label:"B",text:"Search PubMed and Google Scholar yourself with targeted queries.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual database search"},
{label:"C",text:"Draw on your field knowledge to cite references you already know well.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert knowledge references"},
]},
{id:5,text:"Your team needs to choose between 4 experimental designs for a clinical trial.",options:[
{label:"A",text:"Use AI to model the statistical power and feasibility of all 4 designs.",energyWh:340,waterMl:238,co2g:136,weight:1,moralScore:0,impactLabel:"AI design modelling"},
{label:"B",text:"Calculate statistical power manually for the 2 most promising designs.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual power calculation"},
{label:"C",text:"Discuss the designs with your clinical team and the patient advisory group.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Collaborative design selection"},
]},
{id:6,text:"You want to simulate how a new drug compound might interact with target receptors.",options:[
{label:"A",text:"Run an AI-powered molecular docking simulation across all receptor variants.",energyWh:490,waterMl:343,co2g:196,weight:1,moralScore:0,impactLabel:"AI molecular docking sweep"},
{label:"B",text:"Run targeted docking simulations for the 3 most likely receptor binding sites.",energyWh:85,waterMl:60,co2g:34,weight:3,moralScore:1,impactLabel:"Targeted docking simulation"},
{label:"C",text:"Apply established binding affinity models and known receptor pharmacology.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Known pharmacology approach"},
]},
{id:7,text:"You need to write a grant proposal responding to a funding call.",options:[
{label:"A",text:"Use AI to draft the full grant proposal from your research summary.",energyWh:215,waterMl:151,co2g:86,weight:2,moralScore:0,impactLabel:"AI grant draft"},
{label:"B",text:"Use AI to improve your own written draft for language and structure.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Manual draft + AI polish"},
{label:"C",text:"Write the proposal entirely yourself to ensure it reflects your ideas.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual proposal"},
]},
{id:8,text:"You want to optimise the parameters for a complex wet lab experimental protocol.",options:[
{label:"A",text:"Use AI to run hundreds of virtual parameter combinations before any wet work.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI virtual parameter sweep"},
{label:"B",text:"Run a small design-of-experiments matrix to test the key variables.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"DoE matrix"},
{label:"C",text:"Iterate the protocol manually based on the existing published methods.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Published method iteration"},
]},
{id:9,text:"Your research group wants to track all preprints in your field as they are published.",options:[
{label:"A",text:"Deploy AI to continuously monitor and summarise all relevant preprints.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI continuous monitoring"},
{label:"B",text:"Set keyword alerts on bioRxiv and arXiv and review them weekly.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Weekly alert review"},
{label:"C",text:"Share reading responsibilities across the lab team for weekly discussion.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Shared lab reading"},
]},
{id:10,text:"You need to prepare a conference presentation on your latest findings.",options:[
{label:"A",text:"Use AI to generate the slides and talking points from your paper.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI presentation generation"},
{label:"B",text:"Use AI to suggest a structure; build the slides and talk track yourself.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"AI structure + manual build"},
{label:"C",text:"Build the presentation entirely yourself from your research notes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual presentation"},
]},
{id:11,text:"Your lab needs to scale data collection for a population-level health study.",options:[
{label:"A",text:"Deploy AI to automate all data collection and quality checking.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"AI full data automation"},
{label:"B",text:"Use standardised digital collection tools with manual QC checks.",energyWh:25,waterMl:18,co2g:10,weight:5,moralScore:1,impactLabel:"Digital tools + manual QC"},
{label:"C",text:"Train a team of research assistants and collect data manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual research assistant team"},
]},
{id:12,text:"A research participant is raising concerns about how their data is being used.",options:[
{label:"A",text:"Use an AI system to provide a detailed data usage explanation.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:0,impactLabel:"AI data explanation"},
{label:"B",text:"Send the participant the study's information sheet and consent form.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Study documentation"},
{label:"C",text:"Call the participant directly to explain the data use and address their concerns.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Personal participant call"},
]},
{id:13,text:"You need to allocate lab time and equipment across 5 concurrent research projects.",options:[
{label:"A",text:"Use AI to model the optimal equipment and time allocation across all projects.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"AI resource modelling"},
{label:"B",text:"Review each project's critical path and allocate resources manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual critical path review"},
{label:"C",text:"Hold a weekly lab meeting where teams agree resource priorities together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Weekly team allocation"},
]},
{id:14,text:"You want to generate new hypotheses from your lab's accumulated experimental data.",options:[
{label:"A",text:"Use AI to mine all accumulated data for unexpected patterns and hypotheses.",energyWh:420,waterMl:294,co2g:168,weight:1,moralScore:0,impactLabel:"AI hypothesis mining"},
{label:"B",text:"Explore the data yourself with open-ended visualisation and analysis.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Manual exploratory analysis"},
{label:"C",text:"Hold a lab brainstorm and discuss what the data might mean together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Lab brainstorm"},
]},
{id:15,text:"A key experiment has produced unexpected results that contradict your hypothesis.",options:[
{label:"A",text:"Use AI to search for published explanations that fit the unexpected data.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI contradiction search"},
{label:"B",text:"Repeat the experiment under tightly controlled conditions to verify.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Controlled replication"},
{label:"C",text:"Discuss the result openly in a lab meeting before doing any more experiments.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Open lab discussion"},
]},
{id:16,text:"You need to forecast whether your current results will be sufficient for publication.",options:[
{label:"A",text:"Use an AI model to predict publication likelihood based on your data.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI publication prediction"},
{label:"B",text:"Review comparable published studies and assess your data against them.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Comparable study assessment"},
{label:"C",text:"Discuss your results with your PI and a trusted peer in the field.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"PI and peer discussion"},
]},
{id:17,text:"You need to write the methods section of your research paper.",options:[
{label:"A",text:"Use AI to write the methods from your lab notebook entries.",energyWh:160,waterMl:112,co2g:64,weight:2,moralScore:0,impactLabel:"AI methods generation"},
{label:"B",text:"Use a past paper's methods as a template and update it yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Template + manual update"},
{label:"C",text:"Write the methods entirely from your own experimental records.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual methods writing"},
]},
{id:18,text:"New lab members need to learn the experimental techniques used in your group.",options:[
{label:"A",text:"Give them access to an AI tutor trained on your lab's protocols.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI protocol tutor"},
{label:"B",text:"Have them work through the written protocols and ask questions in lab meetings.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Protocol study + Q&A"},
{label:"C",text:"Have them shadow an experienced lab member hands-on for 4 weeks.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Hands-on shadowing"},
]},
{id:19,text:"Before submitting a paper to a journal it needs to meet all reporting guidelines.",options:[
{label:"A",text:"Run the manuscript through an AI reporting standards checker.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI reporting check"},
{label:"B",text:"Work through the CONSORT or STROBE checklist with your co-authors.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual reporting checklist"},
{label:"C",text:"Ask a senior researcher who is not a co-author to critically review it.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Independent senior review"},
]},
{id:20,text:"A lab safety incident has occurred and you need to act and report immediately.",options:[
{label:"A",text:"Query an AI safety system for the correct incident response steps.",energyWh:35,waterMl:25,co2g:14,weight:4,moralScore:0,impactLabel:"AI safety response"},
{label:"B",text:"Apply the COSHH and lab safety protocol you are trained in.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Trained safety protocol"},
{label:"C",text:"Clear the area, ensure everyone is safe, and contact the safety officer.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Immediate safety action"},
]},
],
"Retail & E-commerce":[
{id:1,text:"You need product descriptions for 300 new items added to your online store.",options:[
{label:"A",text:"Use AI to generate all 300 product descriptions automatically.",energyWh:330,waterMl:231,co2g:132,weight:1,moralScore:0,impactLabel:"AI auto all 300 descriptions"},
{label:"B",text:"Write descriptions for hero products manually; use AI for the rest.",energyWh:75,waterMl:53,co2g:30,weight:3,moralScore:1,impactLabel:"Manual heroes + AI rest"},
{label:"C",text:"Write all 300 descriptions manually with consistent brand voice.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual descriptions"},
]},
{id:2,text:"You want to analyse customer purchasing patterns across your full product range.",options:[
{label:"A",text:"Deploy an AI recommendation engine that continuously mines purchase data.",energyWh:430,waterMl:301,co2g:172,weight:1,moralScore:0,impactLabel:"AI continuous mining"},
{label:"B",text:"Run cohort and basket analysis in your analytics platform.",energyWh:25,waterMl:18,co2g:10,weight:5,moralScore:1,impactLabel:"Manual analytics queries"},
{label:"C",text:"Talk to your sales team and review the top 20 products manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Sales team + manual review"},
]},
{id:3,text:"Your customer service team is overwhelmed with repetitive order enquiries.",options:[
{label:"A",text:"Deploy an AI chatbot to handle all customer enquiries end-to-end.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI full customer handling"},
{label:"B",text:"Use a chatbot for FAQs and order tracking; humans handle complaints.",energyWh:70,waterMl:49,co2g:28,weight:3,moralScore:1,impactLabel:"AI FAQs + human complaints"},
{label:"C",text:"Improve your self-service FAQ page and have staff handle all contacts.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Improved FAQ + human service"},
]},
{id:4,text:"You run a flash sale and need real-time price matching against competitors.",options:[
{label:"A",text:"Deploy AI to monitor all competitor prices and adjust yours continuously.",energyWh:470,waterMl:329,co2g:188,weight:1,moralScore:0,impactLabel:"AI real-time price matching"},
{label:"B",text:"Set your flash sale prices based on a pre-sale competitor review.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Pre-sale manual review"},
{label:"C",text:"Set prices based on your margin targets and value proposition.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Margin-based pricing"},
]},
{id:5,text:"A loyal customer asks for a personalised product recommendation for a gift.",options:[
{label:"A",text:"Use AI to generate a personalised recommendation list from their purchase history.",energyWh:155,waterMl:109,co2g:62,weight:2,moralScore:0,impactLabel:"AI personalised list"},
{label:"B",text:"Look at their purchase history yourself and suggest 3 relevant options.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual history review"},
{label:"C",text:"Have a conversation with the customer to understand the recipient before suggesting.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer conversation first"},
]},
{id:6,text:"You want to model the impact of a 15 percent price increase on customer retention.",options:[
{label:"A",text:"Build an AI demand elasticity model from all customer and pricing data.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI elasticity model"},
{label:"B",text:"Run a price sensitivity survey with a sample of your customers.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Customer price survey"},
{label:"C",text:"Apply industry benchmarks and your own knowledge of customer loyalty.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Benchmark + judgement"},
]},
{id:7,text:"You need to write personalised win-back emails for 500 lapsed customers.",options:[
{label:"A",text:"Use AI to generate all 500 personalised win-back emails.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI 500 personalised emails"},
{label:"B",text:"Write 3 strong templates and segment customers into the best fit.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"3 templates + segmentation"},
{label:"C",text:"Write a single compelling win-back email and send it to all 500.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Single strong email"},
]},
{id:8,text:"Your warehouse picking efficiency needs to improve to meet faster delivery promises.",options:[
{label:"A",text:"Use AI to continuously re-optimise all pick paths in real time.",energyWh:410,waterMl:287,co2g:164,weight:1,moralScore:0,impactLabel:"AI real-time pick optimisation"},
{label:"B",text:"Implement zone picking and batch picking strategies manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual picking strategies"},
{label:"C",text:"Involve warehouse staff in redesigning the picking process themselves.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Staff-led process redesign"},
]},
{id:9,text:"You want to detect fraudulent orders before they are dispatched.",options:[
{label:"A",text:"Deploy AI to score every order for fraud risk in real time.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI real-time fraud scoring"},
{label:"B",text:"Apply rule-based fraud filters for high-risk patterns.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Rule-based fraud filter"},
{label:"C",text:"Have your fulfilment team flag and manually review suspicious orders.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual order review"},
]},
{id:10,text:"You need to plan your personal workday across buying, supplier calls, and analysis.",options:[
{label:"A",text:"Use an AI tool to automatically schedule and prioritise your full workday.",energyWh:140,waterMl:98,co2g:56,weight:2,moralScore:0,impactLabel:"AI day scheduling"},
{label:"B",text:"Plan your day yourself in a to-do list each morning.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual to-do planning"},
{label:"C",text:"Focus on the two most important things first and let the rest follow.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Priority-focused planning"},
]},
{id:11,text:"Your store is scaling from 1 to 5 locations and needs consistent customer experience.",options:[
{label:"A",text:"Deploy AI systems to manage consistent customer experience across all stores.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI experience management"},
{label:"B",text:"Create a detailed service standards manual and train all staff consistently.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Standards manual + training"},
{label:"C",text:"Appoint a store manager at each location who embodies your brand values.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Values-aligned managers"},
]},
{id:12,text:"A customer is demanding a refund for a product that is outside your returns policy.",options:[
{label:"A",text:"Route the complaint to an AI resolution tool for a decision.",energyWh:120,waterMl:84,co2g:48,weight:3,moralScore:0,impactLabel:"AI decision routing"},
{label:"B",text:"Review the case yourself and apply policy with empathy.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Policy + empathetic review"},
{label:"C",text:"Have a conversation with the customer to understand the full situation.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer conversation first"},
]},
{id:13,text:"You need to allocate limited promotional budget across 8 product categories.",options:[
{label:"A",text:"Use AI to optimise the allocation based on predicted revenue lift.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI promo budget optimisation"},
{label:"B",text:"Review last season's promotional ROI and allocate based on what worked.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Historical ROI allocation"},
{label:"C",text:"Align allocation with your strategic priorities for the season.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Strategy-led allocation"},
]},
{id:14,text:"You want to develop a new own-brand product range with genuinely unique positioning.",options:[
{label:"A",text:"Use AI to analyse the market and generate product concept ideas.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI concept generation"},
{label:"B",text:"Research the gap in the market yourself and develop concepts from your insight.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual gap research"},
{label:"C",text:"Co-develop the range with your most loyal and engaged customers.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer co-development"},
]},
{id:15,text:"Your returns rate has increased suddenly and you need to understand why.",options:[
{label:"A",text:"Use AI to analyse returns data and identify the patterns.",energyWh:250,waterMl:175,co2g:100,weight:2,moralScore:0,impactLabel:"AI returns analysis"},
{label:"B",text:"Read a sample of the returns reasons and identify the top 3 causes yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual sample review"},
{label:"C",text:"Call 10 customers who returned items to understand their experience.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer call investigation"},
]},
{id:16,text:"You need to forecast demand for your top 50 products for the next quarter.",options:[
{label:"A",text:"Build an AI demand forecasting model from all sales and trend data.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"AI demand forecast"},
{label:"B",text:"Use last year's sales patterns and current trends in a spreadsheet.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet trend forecast"},
{label:"C",text:"Talk to your buyers and the suppliers who know demand best.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Buyer and supplier input"},
]},
{id:17,text:"Your brand needs updated product category descriptions for the website refresh.",options:[
{label:"A",text:"Use AI to rewrite all category descriptions from the current versions.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI category rewrite"},
{label:"B",text:"Update only the descriptions that are out of date or underperforming.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Have your copywriter rewrite all descriptions from scratch for the refresh.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Copywriter full rewrite"},
]},
{id:18,text:"New sales associates need to learn your product range and service standards.",options:[
{label:"A",text:"Use an AI product knowledge system for all new hire training.",energyWh:205,waterMl:144,co2g:82,weight:2,moralScore:0,impactLabel:"AI knowledge system"},
{label:"B",text:"Run a structured 3-day induction with product demos and service roleplay.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Structured induction"},
{label:"C",text:"Have each new associate shadow your best salesperson for their first 2 weeks.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Best salesperson shadowing"},
]},
{id:19,text:"Before the new website goes live all product data and images must be verified.",options:[
{label:"A",text:"Use AI to scan all product pages for errors and missing content.",energyWh:255,waterMl:179,co2g:102,weight:2,moralScore:0,impactLabel:"AI page audit"},
{label:"B",text:"Review every product page against the original data sheet manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual page verification"},
{label:"C",text:"Have each buyer check their own category's product pages before launch.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Buyer category check"},
]},
{id:20,text:"Your site crashes at peak on Black Friday with 10 times normal traffic.",options:[
{label:"A",text:"Use AI infrastructure tools to automatically scale and restore the site.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI auto-scale restore"},
{label:"B",text:"Activate the incident runbook and work with your hosting provider.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Runbook + hosting escalation"},
{label:"C",text:"Switch to the static fallback page, inform customers, and restore manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Static fallback + manual restore"},
]},
],
"Technology & Software":[
{id:1,text:"You need to write technical documentation for a new API your team just built.",options:[
{label:"A",text:"Use AI to generate the full API documentation from the codebase.",energyWh:195,waterMl:137,co2g:78,weight:2,moralScore:0,impactLabel:"AI full API docs"},
{label:"B",text:"Use AI to generate the structure; write the explanations and examples yourself.",energyWh:45,waterMl:32,co2g:18,weight:4,moralScore:1,impactLabel:"AI structure + manual content"},
{label:"C",text:"Write all documentation yourself from your understanding of the codebase.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual documentation"},
]},
{id:2,text:"You need to analyse 6 months of user behaviour logs to improve onboarding.",options:[
{label:"A",text:"Feed all logs into an AI analytics platform for deep pattern analysis.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI full log analysis"},
{label:"B",text:"Write targeted queries against the key funnel events you care about.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Targeted query analysis"},
{label:"C",text:"Watch session recordings for 20 users and take notes manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual session review"},
]},
{id:3,text:"Repetitive code review comments are taking up most of your team's PR review time.",options:[
{label:"A",text:"Deploy an AI code review tool to automate all reviews end-to-end.",energyWh:290,waterMl:203,co2g:116,weight:1,moralScore:0,impactLabel:"AI full code review"},
{label:"B",text:"Use a linter and AI for style and security checks; engineers review logic.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Linter + AI style + human logic"},
{label:"C",text:"Define a code review checklist and have engineers do all reviews manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual checklist reviews"},
]},
{id:4,text:"You are debugging a production incident affecting thousands of users right now.",options:[
{label:"A",text:"Use an AI ops tool to automatically diagnose and attempt to fix the incident.",energyWh:160,waterMl:112,co2g:64,weight:2,moralScore:0,impactLabel:"AI auto incident response"},
{label:"B",text:"Follow your incident runbook and use standard observability tooling.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Runbook + observability"},
{label:"C",text:"Get the right engineers in a call immediately and work through it together.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Incident call + manual debug"},
]},
{id:5,text:"Your team needs to decide between 3 architecture approaches for a new system.",options:[
{label:"A",text:"Use AI to model the performance, cost, and risk trade-offs of all 3 options.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI architecture modelling"},
{label:"B",text:"Write a short ADR for each option and discuss as a team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"ADR + team discussion"},
{label:"C",text:"Build a small proof of concept for the riskiest option before deciding.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"PoC-first approach"},
]},
{id:6,text:"You want to load-test a new microservice before it goes to production.",options:[
{label:"A",text:"Use AI to generate and run thousands of synthetic load scenarios.",energyWh:480,waterMl:336,co2g:192,weight:1,moralScore:0,impactLabel:"AI synthetic load testing"},
{label:"B",text:"Run a targeted load test at 2x expected peak traffic.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"Targeted 2x peak load test"},
{label:"C",text:"Review the resource limits and apply standard capacity planning formulas.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual capacity planning"},
]},
{id:7,text:"You are debugging a complex bug and have been stuck on it for 2 hours.",options:[
{label:"A",text:"Paste the full context into a large AI model and ask it to find the bug.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"Full context AI query"},
{label:"B",text:"Use AI to check one specific hypothesis you have formed yourself.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Targeted hypothesis check"},
{label:"C",text:"Use rubber duck debugging and walk a colleague through the problem.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Rubber duck + colleague"},
]},
{id:8,text:"You need to optimise database query performance across a slow-running service.",options:[
{label:"A",text:"Use an AI query optimiser to automatically rewrite all slow queries.",energyWh:300,waterMl:210,co2g:120,weight:1,moralScore:0,impactLabel:"AI auto query rewrite"},
{label:"B",text:"Profile the queries, identify the slowest, and add targeted indexes.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Profile + targeted indexes"},
{label:"C",text:"Read the query execution plans and rewrite the queries yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual query optimisation"},
]},
{id:9,text:"You need to monitor your cloud infrastructure for cost anomalies.",options:[
{label:"A",text:"Deploy AI to continuously analyse all cloud costs and alert on anomalies.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI cost anomaly monitoring"},
{label:"B",text:"Set budget alerts at key thresholds on your cloud cost dashboard.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Threshold budget alerts"},
{label:"C",text:"Review the cloud bill manually at the end of each week.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Weekly manual cost review"},
]},
{id:10,text:"You need to write a pull request description for a complex feature you just built.",options:[
{label:"A",text:"Use AI to generate the PR description from the diff.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:0,impactLabel:"AI PR description"},
{label:"B",text:"Write the description yourself summarising the what, why, and how to test.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual PR write-up"},
{label:"C",text:"Walk a reviewer through the change verbally before they read the code.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Verbal walkthrough"},
]},
{id:11,text:"Your startup needs to ship features 3 times faster to stay ahead of competitors.",options:[
{label:"A",text:"Adopt AI-assisted coding for all development work immediately.",energyWh:460,waterMl:322,co2g:184,weight:1,moralScore:0,impactLabel:"AI-assisted all development"},
{label:"B",text:"Use AI assistance for boilerplate and tests; write core logic yourself.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"AI boilerplate + manual core"},
{label:"C",text:"Reduce scope, focus on fewer features, and build them well.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Scope reduction + focus"},
]},
{id:12,text:"A customer reports their data is showing up in another user's account.",options:[
{label:"A",text:"Use AI to scan all accounts for similar data isolation issues.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI full isolation scan"},
{label:"B",text:"Immediately disable the affected accounts, investigate manually, and notify.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Disable + investigate + notify"},
{label:"C",text:"Treat it as a security incident, follow your breach response playbook.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Security breach playbook"},
]},
{id:13,text:"Your team has limited engineering capacity and 3 high-priority features in the backlog.",options:[
{label:"A",text:"Use AI to estimate effort and automatically prioritise the backlog.",energyWh:140,waterMl:98,co2g:56,weight:2,moralScore:0,impactLabel:"AI backlog prioritisation"},
{label:"B",text:"Run a quick impact-versus-effort exercise with the team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Impact-effort exercise"},
{label:"C",text:"Talk to customers to understand which feature matters most to them.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer-informed priority"},
]},
{id:14,text:"You want to explore a completely new approach to a long-standing technical problem.",options:[
{label:"A",text:"Use AI to search research papers and generate potential solutions.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI solution search"},
{label:"B",text:"Set aside a day to prototype 2 different approaches yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual prototype day"},
{label:"C",text:"Discuss the problem with engineers outside your team for fresh perspectives.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Cross-team discussion"},
]},
{id:15,text:"A critical test suite has begun failing after a recent deploy.",options:[
{label:"A",text:"Use AI to analyse the failure logs and suggest the most likely root cause.",energyWh:160,waterMl:112,co2g:64,weight:2,moralScore:0,impactLabel:"AI log analysis"},
{label:"B",text:"Bisect the commit history and run tests locally to find the breaking change.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual bisect + local test"},
{label:"C",text:"Roll back the deploy and investigate without time pressure.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Rollback + investigation"},
]},
{id:16,text:"You need to forecast server capacity requirements for the next 12 months.",options:[
{label:"A",text:"Use an AI capacity planning model based on current growth trajectories.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI capacity model"},
{label:"B",text:"Project usage from current growth rates in a spreadsheet.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Spreadsheet growth model"},
{label:"C",text:"Talk to the product and sales teams about expected user growth.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Cross-team growth input"},
]},
{id:17,text:"Your engineering team needs a runbook for handling the most common production incidents.",options:[
{label:"A",text:"Use AI to generate the full runbook from past incident reports.",energyWh:190,waterMl:133,co2g:76,weight:2,moralScore:0,impactLabel:"AI runbook generation"},
{label:"B",text:"Write the runbook collaboratively drawing on the team's experience.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Team experience runbook"},
{label:"C",text:"Run a game day to simulate incidents and document what works.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Game day simulation"},
]},
{id:18,text:"New engineers joining the team need to understand your system architecture.",options:[
{label:"A",text:"Give them access to an AI that answers all their architecture questions.",energyWh:215,waterMl:151,co2g:86,weight:2,moralScore:0,impactLabel:"AI architecture assistant"},
{label:"B",text:"Give them the ADRs and architecture docs and check in weekly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Docs + weekly check-ins"},
{label:"C",text:"Pair them with a senior engineer on real work from day one.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Senior engineer pairing"},
]},
{id:19,text:"Before a major release you need to verify the feature is working correctly.",options:[
{label:"A",text:"Use AI to generate and run a comprehensive test suite automatically.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI generated test suite"},
{label:"B",text:"Run the existing automated test suite and manually test the critical paths.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Automated + manual critical"},
{label:"C",text:"Conduct a full exploratory testing session as a team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team exploratory testing"},
]},
{id:20,text:"Your database server is at 100 percent CPU and customers cannot access the service.",options:[
{label:"A",text:"Use an AI ops tool to automatically identify and resolve the bottleneck.",energyWh:130,waterMl:91,co2g:52,weight:2,moralScore:0,impactLabel:"AI auto-resolve"},
{label:"B",text:"Kill the runaway process, restore service, and investigate the root cause.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Restore + root cause"},
{label:"C",text:"Follow the database emergency runbook with the on-call DBA.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Emergency runbook + DBA"},
]},
],
"Transportation & Logistics":[
{id:1,text:"You need to produce shipping documentation for 200 outbound international orders.",options:[
{label:"A",text:"Use AI to auto-generate all 200 sets of shipping documents.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI auto shipping docs"},
{label:"B",text:"Use templates that auto-fill from the order data; review manually.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Auto-fill templates + review"},
{label:"C",text:"Complete all shipping documentation manually per shipment.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual documentation"},
]},
{id:2,text:"You have a year of fleet telematics data and want to reduce fuel consumption.",options:[
{label:"A",text:"Feed all telematics data into an AI platform for fleet-wide optimisation.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI fleet-wide optimisation"},
{label:"B",text:"Identify the top 10 percent highest fuel-consuming drivers and coach them.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Targeted driver coaching"},
{label:"C",text:"Review average fuel figures and discuss practices with the driver team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Team discussion + coaching"},
]},
{id:3,text:"Your dispatch team spends 3 hours each morning manually assigning delivery routes.",options:[
{label:"A",text:"Use AI to automatically plan all routes the night before.",energyWh:310,waterMl:217,co2g:124,weight:1,moralScore:0,impactLabel:"AI overnight route planning"},
{label:"B",text:"Use route optimisation software with manual adjustments for known constraints.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Optimisation software + manual"},
{label:"C",text:"Have experienced dispatchers plan routes based on their local knowledge.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert dispatcher planning"},
]},
{id:4,text:"You need real-time visibility on all 50 vehicles in your delivery fleet.",options:[
{label:"A",text:"Deploy AI-powered fleet monitoring with automated exception alerts.",energyWh:440,waterMl:308,co2g:176,weight:1,moralScore:0,impactLabel:"AI fleet monitoring"},
{label:"B",text:"Use standard GPS tracking and check the dashboard at key points in the day.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"GPS dashboard checks"},
{label:"C",text:"Have drivers call in at set checkpoints throughout the day.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Driver check-in calls"},
]},
{id:5,text:"A major client wants to know which carrier gives the best cost-to-service trade-off.",options:[
{label:"A",text:"Use AI to score all carriers across hundreds of performance and cost variables.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI carrier scoring"},
{label:"B",text:"Build a comparison scorecard using the data you already have.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual scorecard"},
{label:"C",text:"Talk to clients and drivers who have worked with each carrier.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Stakeholder consultation"},
]},
{id:6,text:"You want to model the network impact of adding a new depot location.",options:[
{label:"A",text:"Run an AI network design model with thousands of location scenarios.",energyWh:470,waterMl:329,co2g:188,weight:1,moralScore:0,impactLabel:"AI network location model"},
{label:"B",text:"Model the impact on your top 10 largest customer delivery zones.",energyWh:10,waterMl:7,co2g:4,weight:5,moralScore:1,impactLabel:"Key zone modelling"},
{label:"C",text:"Consult your most experienced logistics planners for their view.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert planner consultation"},
]},
{id:7,text:"Your company sends delivery confirmation notifications to 2,000 customers daily.",options:[
{label:"A",text:"Use AI to personalise all 2,000 confirmation messages automatically.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI personalised all comms"},
{label:"B",text:"Send standard automated confirmations triggered by delivery scan events.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Automated trigger comms"},
{label:"C",text:"Have drivers confirm delivery directly with recipients on the doorstep.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Driver direct confirmation"},
]},
{id:8,text:"Your warehouse has inefficient inbound goods receiving that is slowing despatch.",options:[
{label:"A",text:"Deploy AI to optimise the full inbound flow and dock scheduling.",energyWh:370,waterMl:259,co2g:148,weight:1,moralScore:0,impactLabel:"AI inbound flow optimisation"},
{label:"B",text:"Apply simple 5S principles to reorganise the receiving area.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"5S reorganisation"},
{label:"C",text:"Spend a shift working in the receiving team to understand the problems.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Immersive floor observation"},
]},
{id:9,text:"Your depot needs to monitor cold chain compliance across refrigerated deliveries.",options:[
{label:"A",text:"Deploy AI to monitor all cold chain data and flag deviations in real time.",energyWh:450,waterMl:315,co2g:180,weight:1,moralScore:0,impactLabel:"AI cold chain monitoring"},
{label:"B",text:"Use digital temperature loggers with threshold alerts.",energyWh:20,waterMl:14,co2g:8,weight:5,moralScore:1,impactLabel:"Digital logger + alerts"},
{label:"C",text:"Have drivers check and record temperatures at each checkpoint manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual driver temperature check"},
]},
{id:10,text:"You need to plan your day across customer calls, route reviews, and operations.",options:[
{label:"A",text:"Use an AI scheduling tool to manage and reprioritise your day automatically.",energyWh:140,waterMl:98,co2g:56,weight:2,moralScore:0,impactLabel:"AI day management"},
{label:"B",text:"Write your priorities in a notebook at the start of the day.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual priority planning"},
{label:"C",text:"Focus on the one thing that will make the biggest difference today.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Single priority focus"},
]},
{id:11,text:"Your logistics network needs to scale to handle a major new retailer contract.",options:[
{label:"A",text:"Use AI to redesign your full logistics network for the new volume.",energyWh:490,waterMl:343,co2g:196,weight:1,moralScore:0,impactLabel:"AI full network redesign"},
{label:"B",text:"Add capacity incrementally based on the ramp-up schedule in the contract.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Incremental capacity ramp"},
{label:"C",text:"Subcontract the initial volume to a partner carrier while you build capacity.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Partner carrier subcontract"},
]},
{id:12,text:"A customer is calling to say their urgent shipment has not arrived as promised.",options:[
{label:"A",text:"Use AI to locate the shipment and generate resolution options automatically.",energyWh:110,waterMl:77,co2g:44,weight:3,moralScore:0,impactLabel:"AI shipment location + options"},
{label:"B",text:"Check the tracking system yourself and call the driver to get a live update.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual tracking + driver call"},
{label:"C",text:"Stay on the phone with the customer while you resolve the issue in real time.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Live customer problem solving"},
]},
{id:13,text:"You need to allocate 12 drivers and 3 vehicle types across next week's jobs.",options:[
{label:"A",text:"Use AI to optimise driver and vehicle allocation across all jobs.",energyWh:230,waterMl:161,co2g:92,weight:2,moralScore:0,impactLabel:"AI full allocation optimisation"},
{label:"B",text:"Match drivers to jobs based on their skills, licenses, and availability.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Skill-based manual allocation"},
{label:"C",text:"Let your most experienced dispatcher handle all driver scheduling.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Experienced dispatcher"},
]},
{id:14,text:"You want to find a more sustainable way to serve a rural delivery area.",options:[
{label:"A",text:"Use AI to model thousands of routing and mode combinations.",energyWh:400,waterMl:280,co2g:160,weight:1,moralScore:0,impactLabel:"AI route and mode modelling"},
{label:"B",text:"Review the route economics and explore consolidation or alternative modes.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Economics + consolidation"},
{label:"C",text:"Visit the area and talk to the customers and the local community.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Customer and community visit"},
]},
{id:15,text:"A major hub is congested and deliveries across the region are running late.",options:[
{label:"A",text:"Use AI to automatically reroute all affected deliveries in real time.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"AI auto-rerouting"},
{label:"B",text:"Get dispatchers on the phone to identify the best manual diversions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Dispatcher manual diversion"},
{label:"C",text:"Notify all affected customers immediately and manage their expectations.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Proactive customer notification"},
]},
{id:16,text:"You need to forecast fuel costs for the next 6 months of fleet operations.",options:[
{label:"A",text:"Build an AI fuel cost model using live price feeds and fleet consumption data.",energyWh:295,waterMl:207,co2g:118,weight:2,moralScore:0,impactLabel:"AI fuel cost model"},
{label:"B",text:"Use current consumption data and published energy market forecasts.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Consumption + market forecast"},
{label:"C",text:"Apply a standard contingency percentage based on your historic variance.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Historic contingency"},
]},
{id:17,text:"Your fleet needs updated driver health and safety procedures after a regulation change.",options:[
{label:"A",text:"Use AI to rewrite all driver H&S procedures from the new regulation.",energyWh:200,waterMl:140,co2g:80,weight:2,moralScore:0,impactLabel:"AI full rewrite"},
{label:"B",text:"Identify the specific changes needed and update only those sections.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Targeted manual update"},
{label:"C",text:"Have drivers review and sign off the updated procedures in a safety briefing.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Driver safety briefing"},
]},
{id:18,text:"New drivers joining the fleet need to learn your routes and safety procedures.",options:[
{label:"A",text:"Use an AI driver training system to onboard all new recruits.",energyWh:225,waterMl:158,co2g:90,weight:2,moralScore:0,impactLabel:"AI driver training system"},
{label:"B",text:"Run a structured 2-day induction covering safety, routes, and systems.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Structured 2-day induction"},
{label:"C",text:"Pair each new driver with a veteran for their first 2 weeks on the road.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Veteran driver mentoring"},
]},
{id:19,text:"Before dispatching a fleet of vehicles you need to verify roadworthiness.",options:[
{label:"A",text:"Use AI-powered vehicle diagnostics to check all vehicles automatically.",energyWh:270,waterMl:189,co2g:108,weight:2,moralScore:0,impactLabel:"AI vehicle diagnostics"},
{label:"B",text:"Use the digital daily walkaround checklist for each vehicle.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Digital walkaround checklist"},
{label:"C",text:"Have drivers physically inspect their vehicles before every trip.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Physical driver walkaround"},
]},
{id:20,text:"One of your HGVs has broken down on a motorway carrying a time-critical load.",options:[
{label:"A",text:"Use an AI logistics tool to find the fastest recovery and alternative route.",energyWh:100,waterMl:70,co2g:40,weight:3,moralScore:0,impactLabel:"AI recovery planning"},
{label:"B",text:"Call the breakdown service and contact your nearest depot for a replacement.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Breakdown service + depot"},
{label:"C",text:"Put the driver's safety first, call the customer, and solve it step by step.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Safety first + customer call"},
]},
],
"Other":[
{id:1,text:"You need to generate written content for a new professional project.",options:[
{label:"A",text:"Use AI to write all required content from your brief.",energyWh:260,waterMl:182,co2g:104,weight:2,moralScore:0,impactLabel:"AI full content generation"},
{label:"B",text:"Use AI to draft an outline; write the content yourself.",energyWh:45,waterMl:32,co2g:18,weight:4,moralScore:1,impactLabel:"AI outline + manual content"},
{label:"C",text:"Write all content yourself from your own knowledge and notes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Fully manual content"},
]},
{id:2,text:"You have a large dataset from your work that you need to draw insights from.",options:[
{label:"A",text:"Feed all data into an AI analytics platform for automated insight generation.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI full data analytics"},
{label:"B",text:"Use targeted queries and charts to explore the most relevant questions.",energyWh:15,waterMl:11,co2g:6,weight:5,moralScore:1,impactLabel:"Targeted manual analysis"},
{label:"C",text:"Review the data by hand and take notes on what stands out.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:2,impactLabel:"Manual data review"},
]},
{id:3,text:"You have a repetitive task that takes you several hours each week.",options:[
{label:"A",text:"Automate the full task with an AI workflow tool.",energyWh:280,waterMl:196,co2g:112,weight:2,moralScore:0,impactLabel:"AI full automation"},
{label:"B",text:"Use simple scripting or templates to speed up the most repetitive parts.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Scripting + templates"},
{label:"C",text:"Redesign the manual process to make it more efficient.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Manual process redesign"},
]},
{id:4,text:"You need to respond quickly to an unexpected request requiring real-time information.",options:[
{label:"A",text:"Query an AI assistant for the information immediately.",energyWh:60,waterMl:42,co2g:24,weight:3,moralScore:0,impactLabel:"Real-time AI query"},
{label:"B",text:"Search the web or your own resources for the answer.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual web search"},
{label:"C",text:"Use your own knowledge and be honest about uncertainty.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert knowledge response"},
]},
{id:5,text:"You need to make a decision between several complex options.",options:[
{label:"A",text:"Use AI to model and compare all options against your criteria.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI option modelling"},
{label:"B",text:"Create a simple decision matrix and score the options yourself.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual decision matrix"},
{label:"C",text:"Talk through the options with a trusted colleague before deciding.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Colleague discussion"},
]},
{id:6,text:"You want to model the possible outcomes of a decision before committing.",options:[
{label:"A",text:"Use AI to run hundreds of scenario simulations.",energyWh:380,waterMl:266,co2g:152,weight:1,moralScore:0,impactLabel:"AI scenario simulation"},
{label:"B",text:"Map out the 3 most plausible scenarios in a simple spreadsheet.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Manual 3-scenario plan"},
{label:"C",text:"Draw on precedents from similar past decisions in your experience.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Experience-based judgement"},
]},
{id:7,text:"You need to communicate an update to a wide group of stakeholders.",options:[
{label:"A",text:"Use AI to generate personalised communications for every stakeholder.",energyWh:210,waterMl:147,co2g:84,weight:2,moralScore:0,impactLabel:"AI personalised comms"},
{label:"B",text:"Write one clear update and tailor the opening line for each group.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"One update + tailored intros"},
{label:"C",text:"Write a single clear, honest communication for everyone.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Single clear communication"},
]},
{id:8,text:"You want to improve the efficiency of a time-consuming workflow.",options:[
{label:"A",text:"Deploy AI to automate and optimise the entire workflow.",energyWh:320,waterMl:224,co2g:128,weight:1,moralScore:0,impactLabel:"AI full workflow automation"},
{label:"B",text:"Map the workflow steps and remove the unnecessary ones manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual process mapping"},
{label:"C",text:"Ask everyone who uses the workflow what slows them down most.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"User pain point research"},
]},
{id:9,text:"You want to monitor the performance of your work over time.",options:[
{label:"A",text:"Deploy an AI dashboard that tracks and analyses all performance metrics.",energyWh:350,waterMl:245,co2g:140,weight:1,moralScore:0,impactLabel:"AI continuous tracking"},
{label:"B",text:"Choose 5 key metrics and review them manually each week.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"5 KPI weekly review"},
{label:"C",text:"Reflect on what went well and what did not at the end of each week.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Weekly personal reflection"},
]},
{id:10,text:"You want to improve your personal productivity during a busy period.",options:[
{label:"A",text:"Use an AI personal assistant to manage your tasks and schedule automatically.",energyWh:170,waterMl:119,co2g:68,weight:2,moralScore:0,impactLabel:"AI personal assistant"},
{label:"B",text:"Use a simple task list and time-block your most important work.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Task list + time-blocking"},
{label:"C",text:"Do the most important thing first every day and protect that time.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Priority-first approach"},
]},
{id:11,text:"Your workload has increased significantly and you need to scale your output.",options:[
{label:"A",text:"Use AI to take over as much of your work as possible.",energyWh:430,waterMl:301,co2g:172,weight:1,moralScore:0,impactLabel:"AI maximum delegation"},
{label:"B",text:"Use AI for specific time-consuming parts while keeping strategic work manual.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:1,impactLabel:"AI for parts + manual strategy"},
{label:"C",text:"Prioritise ruthlessly and push back on lower-value work.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Ruthless prioritisation"},
]},
{id:12,text:"Someone asks you for help with a problem that is outside your expertise.",options:[
{label:"A",text:"Query AI for a complete answer to give them immediately.",energyWh:80,waterMl:56,co2g:32,weight:3,moralScore:0,impactLabel:"AI immediate answer"},
{label:"B",text:"Use your network to find the right person to help them.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Network referral"},
{label:"C",text:"Be honest about the limits of your knowledge and suggest where to look.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Honest referral"},
]},
{id:13,text:"You need to allocate limited resources across competing priorities.",options:[
{label:"A",text:"Use AI to model the optimal allocation automatically.",energyWh:180,waterMl:126,co2g:72,weight:2,moralScore:0,impactLabel:"AI allocation model"},
{label:"B",text:"Use an impact-versus-effort matrix and decide manually.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual impact-effort matrix"},
{label:"C",text:"Consult the people who will be most affected by the decision.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Stakeholder consultation"},
]},
{id:14,text:"You want to develop a completely new approach to a long-standing challenge.",options:[
{label:"A",text:"Use AI to generate a large number of novel idea options.",energyWh:360,waterMl:252,co2g:144,weight:1,moralScore:0,impactLabel:"AI idea generation"},
{label:"B",text:"Research how others have tackled similar problems.",energyWh:5,waterMl:4,co2g:2,weight:5,moralScore:1,impactLabel:"Manual case research"},
{label:"C",text:"Spend focused time thinking deeply before generating any ideas.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Deep focused thinking"},
]},
{id:15,text:"Something has gone wrong and you need to understand the root cause.",options:[
{label:"A",text:"Use AI to analyse all available data and generate a root cause analysis.",energyWh:240,waterMl:168,co2g:96,weight:2,moralScore:0,impactLabel:"AI root cause analysis"},
{label:"B",text:"Work through a 5-whys analysis yourself or with your team.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"5-whys analysis"},
{label:"C",text:"Talk to the people closest to the problem before forming any conclusions.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Human-first investigation"},
]},
{id:16,text:"You need to make a forecast for your area of work for the next 12 months.",options:[
{label:"A",text:"Build an AI forecasting model from all available historical data.",energyWh:290,waterMl:203,co2g:116,weight:2,moralScore:0,impactLabel:"AI forecasting model"},
{label:"B",text:"Review historical trends and apply your own judgement.",energyWh:3,waterMl:2,co2g:1,weight:5,moralScore:1,impactLabel:"Trend review + judgement"},
{label:"C",text:"Consult the most knowledgeable people in your network.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Expert network consultation"},
]},
{id:17,text:"You need to produce written guidance or instructions for others.",options:[
{label:"A",text:"Use AI to generate the full guidance document from a brief description.",energyWh:185,waterMl:130,co2g:74,weight:2,moralScore:0,impactLabel:"AI guidance generation"},
{label:"B",text:"Write the guidance yourself and test it with one person before sharing.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Manual write + user test"},
{label:"C",text:"Co-write the guidance with the people who will use it.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Co-authored guidance"},
]},
{id:18,text:"Someone new needs to get up to speed on your area of work quickly.",options:[
{label:"A",text:"Give them access to an AI trained on all your work's documentation.",energyWh:220,waterMl:154,co2g:88,weight:2,moralScore:0,impactLabel:"AI knowledge assistant"},
{label:"B",text:"Give them a curated set of documents and regular check-in conversations.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Curated docs + check-ins"},
{label:"C",text:"Spend time with them in person showing them the work directly.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Direct personal teaching"},
]},
{id:19,text:"Before finalising important work you need to check it carefully for errors.",options:[
{label:"A",text:"Run the work through an AI checking tool.",energyWh:155,waterMl:109,co2g:62,weight:2,moralScore:0,impactLabel:"AI error checking"},
{label:"B",text:"Review it yourself with a structured checklist.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Checklist-based self-review"},
{label:"C",text:"Ask a trusted person to review it with fresh eyes.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Independent peer review"},
]},
{id:20,text:"An urgent situation requires you to act quickly with incomplete information.",options:[
{label:"A",text:"Query an AI system for the best course of action immediately.",energyWh:60,waterMl:42,co2g:24,weight:3,moralScore:0,impactLabel:"AI immediate guidance"},
{label:"B",text:"Apply the training or protocol relevant to the situation.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:1,impactLabel:"Training-based response"},
{label:"C",text:"Prioritise safety, act on your best judgement, and get help.",energyWh:0,waterMl:0,co2g:0,weight:6,moralScore:2,impactLabel:"Judgement-first + escalation"},
]},
],
};

/**
 * Returns `count` randomly-selected questions for the given industry.
 * Falls back to "Other" if the industry has no dedicated questions.
 */
export function selectQuestions(industry, count = 5) {
  const pool = QUESTION_BANK[industry] || QUESTION_BANK["Other"] || [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
