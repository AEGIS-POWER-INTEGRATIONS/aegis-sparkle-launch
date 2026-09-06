/**
 * English (business) overlay for the Prompt Library.
 * Keyed by slug; every slug in PROMPTS (see ./prompts.ts) must appear here.
 */

export type PromptEnOverlay = {
  title: string;
  summary: string;
  audience: string;
  tags: string[];
  preparation: string[];
  variables: { name: string; description: string }[];
  promptContent: string;
  usageSteps: string[];
  example: string;
  commonMistakes: string[];
  cautions: string[];
  seoTitle: string;
  seoDescription: string;
};

export const PROMPT_CATEGORY_LABEL_EN: Record<string, string> = {
  "website-build": "Website Build",
  "system-build": "System Build",
  management: "Management",
};

export const PROMPT_DIFFICULTY_LABEL_EN: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const PROMPT_AUDIENCE_LABEL_EN: Record<string, string> = {
  sme: "SME",
  manufacturing: "Manufacturing",
  engineering: "Engineering",
  general: "General",
};

const TAIL_EN = `

[Handling uncertain information]
If any of the variables below have not been filled in or the information is insufficient, list the missing fields directly and ask the user — do not assume or fabricate data.

[Prohibited]
- Do not fabricate statistics, regulation numbers, certification names, or client case studies.
- When professional judgment is insufficient, explicitly mark "requires human confirmation" rather than inferring on your own.

[Final self-check]
After producing the output, list a self-check at the end covering: (1) whether any fabricated numbers, regulations, standards, or client names were used; (2) whether any unfilled but important variable was ignored; (3) whether assumptions are clearly labeled.`;

export const PROMPTS_EN: Record<string, PromptEnOverlay> = {
  "corporate-website-architecture": {
    title: "Corporate Website Architecture Planning Prompt",
    summary:
      "Helps map out website goals, target audience, core pages and information architecture, producing a website blueprint ready to discuss with design and development.",
    audience: "Marketing, product, or IT managers",
    tags: ["Corporate Website", "Information Architecture", "B2B"],
    preparation: [
      "A description of the company's main services, product lines, and differentiators.",
      "The types of customers closed over the past year (no real names needed).",
      "The current state of the existing website (if any) and areas to improve.",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Main Service or Product]", description: "The main product or service your company provides" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Current Problem]", description: "A brief description of the problem and context you want to solve" },
    ],
    promptContent: `You are a senior B2B website strategy consultant, specialized in planning information architecture and content strategy for corporate websites in engineering, manufacturing, and technology integration companies.

[Task Objective]
Plan a website architecture proposal for the following company that can be handed to the design and development teams, including goals, audience, core pages, content priorities, SEO themes, and navigation structure.

[Company Background]
- Company Name: [Company Name]
- Industry: [Industry]
- Main Service or Product: [Main Service or Product]
- Target Customer: [Target Customer]
- Current Problem: [Current Problem]

[Execution Steps]
1. First, summarize in 3–5 lines the company's website positioning and the key messages that need to be communicated.
2. Prioritize based on the site's main business goals (generate inquiries / build brand trust / recruiting / explain services).
3. List 6–10 recommended top-level pages, each including: page name, purpose, primary audience, required content blocks, and key call-to-action (CTA).
4. For each page, propose 3–5 SEO theme directions and possible long-tail keywords (directions only — do not fabricate search volume).
5. Recommend the navigation bar and footer structure, and explain the rationale.

[Output Format]
Output using bullet points and tables in English, with blank lines between sections. Table columns are fixed as: Page / Purpose / Audience / Content Focus / CTA.

[Judgment Criteria]
- Page planning must fit the company's actual size — do not require a small business to maintain 100 blog posts.
- Content focus must map to "services that actually exist"; do not speculate about or invent product lines.`,
    usageSteps: [
      "Fill in the four company-background variables.",
      "Paste the prompt into ChatGPT / Claude or another LLM to get a first draft architecture.",
      "Use the page table from Step 3 to discuss with the internal team and remove unnecessary pages.",
      "Hand the final architecture to the design / development team as the basis for wireframes.",
    ],
    example:
      "Using \"AEGIS POWER INTEGRATIONS\" as an example: Company = AEGIS POWER INTEGRATIONS, Industry = engineering integration & AI consulting, Main Service = engineering integration services and AI system integration, Target Customer = manufacturing and data-center engineering managers, Current Problem = the website fails to clearly present the dual service focus.",
    commonMistakes: [
      "Filling in only \"product name\" without \"target customer\" — the AI will produce generic advice.",
      "Expecting the AI to generate finished copy directly, causing inconsistency between page structure and brand messaging.",
      "Not deciding the business goal first, resulting in too many pages with no clear priority.",
    ],
    cautions: [
      "AI suggestions are only a draft; the final architecture should be finalized after discussion among brand, sales, and SEO stakeholders.",
      "Never let the AI guess at real company case studies; such content should be provided by the company or kept abstract.",
    ],
    seoTitle: "Corporate Website Architecture Prompt | AEGIS AI Prompt Library",
    seoDescription:
      "A ready-to-use B2B website architecture prompt to help companies map goals, target customers, core pages, and SEO themes.",
  },

  "brand-value-proposition": {
    title: "Brand Positioning & Website Value Proposition Prompt",
    summary:
      "Based on company background, helps consolidate brand positioning, differentiators, and the core value proposition the homepage should communicate.",
    audience: "Founders, marketing managers",
    tags: ["Brand Positioning", "Value Proposition", "Messaging Strategy"],
    preparation: [
      "A list of the services or products the company provides.",
      "The names and websites of 3–5 main competitors (if any).",
      "The one sentence the company wants customers to remember (if already defined).",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Main Service or Product]", description: "The main product or service your company provides" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Current Problem]", description: "The pain points your customers currently face" },
    ],
    promptContent: `You are a consultant specialized in B2B brand messaging and value proposition design. Your task is to derive a brand positioning and value proposition, usable on the homepage and in proposal documents, from the company background provided.

[Company Background]
- Company Name: [Company Name]
- Industry: [Industry]
- Main Service or Product: [Main Service or Product]
- Target Customer: [Target Customer]
- Customer's Current Pain Point: [Current Problem]

[Execution Steps]
1. Using the four elements "for whom, solving what problem, in what way, and how it differs from competitors," draft one core positioning statement of 20–30 words.
2. Propose 3 alternative value propositions (each 30–50 words), with a brief note on when each is applicable.
3. Write for the homepage hero section: a headline, a subheadline, 3 supporting bullet points, and 2 recommended CTAs.
4. List 5 "anti-messages" — things this company deliberately does NOT claim — to keep brand messaging sharp.

[Output Format]
Output with headings and bullet points, using [Section] markers to separate sections. Each value proposition should include a score (1–5) for: clarity, differentiation, and provability.`,
    usageSteps: [
      "Fill in the company background.",
      "Discuss and vote internally on the 3 alternative value propositions.",
      "Once finalized, hand off to design and copywriting for the homepage hero, About page, and proposals.",
    ],
    example:
      "When filling in AEGIS POWER INTEGRATIONS data, the AI might produce a starting positioning direction such as \"With a dual focus on engineering integration and AI consulting, we help enterprises make systems truly work together,\" to be refined further by the team.",
    commonMistakes: [
      "Cramming \"every strength\" into the proposition, causing loss of focus.",
      "Using AI-generated buzzwords (Empower / Transform) without adapting them into language that resonates with customers.",
    ],
    cautions: [
      "Avoid unprovable claims such as \"number one in the industry\" or \"only.\"",
      "Value propositions should be validated with real customer interviews; AI is only a starting accelerator.",
    ],
    seoTitle: "Brand Positioning & Value Proposition Prompt | AEGIS AI Library",
    seoDescription:
      "Produce an actionable brand positioning and homepage value proposition for B2B companies, including anti-messages and clarity scoring.",
  },

  "b2b-homepage-copy": {
    title: "B2B Corporate Homepage Copywriting Prompt",
    summary:
      "Produces complete homepage copy for a corporate website in a structured way: hero, service summary, social proof, CTA, and FAQ.",
    audience: "Marketing, content editors",
    tags: ["Homepage Copy", "Copywriting", "B2B"],
    preparation: [
      "A finalized brand value proposition.",
      "Short descriptions of 3–5 core services or products.",
      "Approved, publishable customer types (no names).",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Main Service]", description: "Your company's main service" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Brand Value Proposition]", description: "The finalized one-sentence brand positioning" },
    ],
    promptContent: `You are a B2B website copywriting expert. Based on the following company information, write complete homepage copy in a professional, clear tone, avoiding marketing slogans.

[Company Information]
- Company Name: [Company Name]
- Industry: [Industry]
- Main Service: [Main Service]
- Target Customer: [Target Customer]
- Brand Value Proposition: [Brand Value Proposition]

[Page Structure]
1. Hero: headline (6–10 words), subheadline (15–25 words), 1 primary CTA + 1 secondary CTA.
2. Quick trust block: 3 provable capability statements (under 8 words each).
3. Service summary: 30–45 words per service + 3 concrete benefits to the customer.
4. Who we're for: 3 ideal customer profiles (industry, size, situation).
5. FAQ: 4 questions, each answer 30–60 words, avoiding fabricated promises.
6. Closing CTA: 2 types — Contact Us Now, Schedule a Consultation.

[Judgment Criteria]
- Every sentence must map to a "service actually provided" — do not invent features that don't exist.
- Avoid specific figures (e.g., number of clients, projects, satisfaction rate) unless already provided by the user.`,
    usageSteps: [
      "Fill in company information and value proposition.",
      "After getting the AI draft, have a colleague familiar with the business proofread every \"benefit\" claim.",
      "Before publishing, double-check for any unverified figures.",
    ],
    example:
      "When filling in AEGIS POWER INTEGRATIONS, the AI can first produce a neutral draft; before adoption, the sales manager must confirm the service descriptions.",
    commonMistakes: [
      "Pasting the AI's \"served 100+ clients\" claim directly onto the website.",
      "Making unverified promises in the FAQ, such as \"completed within 7 days.\"",
    ],
    cautions: ["Never let the AI invent statistics or client names out of thin air."],
    seoTitle: "B2B Homepage Copywriting Prompt | AEGIS AI Prompt Library",
    seoDescription:
      "Generate structured B2B corporate homepage copy: hero, service summary, ideal customer profiles, FAQ, and CTA.",
  },

  "service-page-content": {
    title: "Corporate Service Page Content Planning Prompt",
    summary:
      "Plans content structure, target audience, keyword direction, and FAQ topics for a single service page.",
    audience: "Marketing, sales contacts",
    tags: ["Service Page", "Content Architecture", "SEO"],
    preparation: [
      "The actual process and deliverables of the service.",
      "A list of frequently asked customer questions.",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Main Service]", description: "Your company's main service" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Current Problem]", description: "A brief description of the problem and context you want to solve" },
      { name: "[Service Name]", description: "The name of the service featured on this page" },
    ],
    promptContent: `You are a senior B2B content strategist. Plan a complete service-page content outline for the specified service.

[Background]
- Company Name: [Company Name]
- Target Customer: [Target Customer]
- Customer Pain Point: [Current Problem]
- Service Name: [Service Name]

[Page Structure]
1. Page title and subheading.
2. Who it's for (3 bullet points).
3. Problems we solve (3–5 bullet points).
4. Service process (4–6 steps, each with input / deliverable).
5. Common scenarios (2 anonymized scenarios).
6. FAQ (5 questions).
7. 2 recommended CTAs.

[Judgment Criteria] Do not fabricate the process; if details are missing, list what information should be obtained from the customer.`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm the process steps with the delivery team.",
      "Finalize and publish.",
    ],
    example:
      "When using this for the \"Engineering Integration Services\" page, first obtain the actual 4–6-step process from the project manager.",
    commonMistakes: ["Writing \"service\" as \"product specs,\" forgetting to emphasize customer value."],
    cautions: ["Anonymized scenarios must be internally approved; do not disclose sensitive client information."],
    seoTitle: "Service Page Content Planning Prompt | AEGIS",
    seoDescription:
      "Produce a complete content outline for a single B2B service page: process steps, common scenarios, and FAQ.",
  },

  "landing-page": {
    title: "Landing Page Design Prompt",
    summary:
      "Designs a high-conversion landing page structure and copy skeleton for a single campaign, whitepaper, or offer.",
    audience: "Marketing, sales",
    tags: ["Landing Page", "Conversion", "Marketing"],
    preparation: [
      "The campaign / whitepaper topic and the offer provided.",
      "The type of lead information you want to capture.",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Campaign or Offer]", description: "The topic being promoted on the landing page" },
      { name: "[Primary Action]", description: "The action you want the user to complete, e.g., download the whitepaper" },
    ],
    promptContent: `You are a B2B conversion rate optimization consultant. Write a landing-page structure and copy skeleton for the following campaign.

[Background]
- Company: [Company Name]
- Target Audience: [Target Customer]
- Campaign or Offer: [Campaign or Offer]
- Primary Action: [Primary Action]

[Structure]
1. Hero: headline, subheadline, CTA.
2. 3 reasons why it's worth reading / attending.
3. Content / agenda summary.
4. Who it's for / not for.
5. Objection handling (3 questions).
6. Copy near the form and a privacy notice.
7. First draft of the thank-you page.

[Judgment Criteria] Do not use unproven claims such as "guaranteed X-times growth."`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm data-collection purposes with compliance.",
      "Track actual conversion after launch.",
    ],
    example:
      "When promoting an \"AI Adoption Health-Check Consultation,\" the primary action could be set as booking a 30-minute online consultation.",
    commonMistakes: [
      "Overly exaggerated copy.",
      "Missing an explanation of \"who it's not for,\" resulting in low-quality leads.",
    ],
    cautions: ["Data collection must comply with applicable data privacy regulations."],
    seoTitle: "Landing Page Design Prompt | AEGIS",
    seoDescription:
      "Produce a clear, high-conversion B2B landing page structure and copy skeleton, including objection handling.",
  },

  "website-requirements-doc": {
    title: "Website Requirements Document Generator Prompt",
    summary:
      "Turns business expectations into a draft functional requirements document ready to hand to design and development teams.",
    audience: "IT, product, project managers",
    tags: ["Requirements Document", "SOW", "Development"],
    preparation: [
      "A list of business expectations.",
      "Any existing system integration requirements.",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Main Website Goal]", description: "e.g., generate inquiries, recruiting, brand image" },
      { name: "[Target Completion Date]", description: "e.g., launch by Q2, within 3 months" },
      { name: "[Budget Range]", description: "e.g., NT$300K–600K; TBD" },
    ],
    promptContent: `You are a senior project manager skilled at turning business needs into a clear website functional requirements document.

[Background]
- Company: [Company Name] / [Industry]
- Main Website Goal: [Main Website Goal]
- Target Completion Date: [Target Completion Date]
- Budget Range: [Budget Range]

[Output Sections]
1. Project goals and success metrics.
2. User roles and scenarios.
3. Information architecture and page list.
4. Functional modules (including forms, CMS, multilingual support, tracking, basic SEO settings).
5. Non-functional requirements (performance, usability, accessibility, basic security).
6. Content-production responsibility matrix.
7. Delivery milestones and acceptance criteria.
8. Assumptions and risks.

[Judgment Criteria] All performance and usability criteria must be clearly measurable; avoid vague terms like "fast" or "smooth."`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm technical constraints with the IT manager.",
      "Finalize and send to development for a quote.",
    ],
    example:
      "Filling in a budget of NT$600K–1M and a Q3 launch, the AI will produce a first draft SOW usable for bidding.",
    commonMistakes: [
      "Writing vague features like \"AI smart recommendations\" into requirements, causing acceptance disputes.",
    ],
    cautions: ["Requirement changes must be version-controlled to avoid scope creep."],
    seoTitle: "Website Requirements Document Prompt | AEGIS",
    seoDescription:
      "Turn business expectations into a deliverable website requirements document covering roles, modules, non-functional requirements, and acceptance.",
  },

  "ui-ux-design-system": {
    title: "Website UI/UX & Design System Planning Prompt",
    summary:
      "Plans baseline UI styles, components, and UX principles for a corporate website or system, shared between designers and engineers.",
    audience: "Product, design, front-end",
    tags: ["UI", "UX", "Design System"],
    preparation: ["Brand guidelines (if any).", "Screenshots of the existing website or system."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Brand Style Keywords]", description: "e.g., professional, grounded, tech-forward, B2B" },
      { name: "[Primary Device Usage]", description: "e.g., mostly desktop, 40% mobile" },
    ],
    promptContent: `You are a senior UX design consultant. Plan a design system and UX principles based on the following inputs.

[Background]
- Company: [Company Name]
- Brand Style Keywords: [Brand Style Keywords]
- Primary Device Usage: [Primary Device Usage]

[Output]
1. 5 UX principles (each with judgment criteria).
2. Color system: primary / secondary / text / background / status colors.
3. Typography system: headings, body text, buttons; recommended sizes and line heights.
4. Spacing and corner radius.
5. Common components: buttons, inputs, cards, tables, tags, toasts, with all states.
6. Responsive breakpoints and navigation strategy.
7. Accessibility check (contrast, keyboard operation, ARIA).

[Judgment Criteria] Do not suggest visuals that conflict with the brand style keywords; explain the purpose of each color, not just provide swatches.`,
    usageSteps: [
      "Fill in the variables.",
      "Hand the output to designers to build Figma styles.",
      "Confirm token naming with front-end engineers.",
    ],
    example:
      "AEGIS POWER INTEGRATIONS brand style: professional, grounded, tech-forward; primary device usage: mostly desktop, 30% mobile.",
    commonMistakes: [
      "Insufficient color contrast making body text hard to read.",
      "Only showing visuals without component states (hover / disabled).",
    ],
    cautions: ["Must meet WCAG 2.1 AA contrast requirements."],
    seoTitle: "UI/UX & Design System Planning Prompt | AEGIS",
    seoDescription:
      "Produce a deliverable design system and UX principles for a B2B website or internal system.",
  },

  "website-seo-content": {
    title: "Website SEO Keyword & Content Architecture Prompt",
    summary:
      "Derives SEO topic clusters and a content map from the company's services and customer questions.",
    audience: "Marketing, content",
    tags: ["SEO", "Content Strategy", "Keywords"],
    preparation: ["A list of the company's services.", "Questions the sales team is frequently asked."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Main Service]", description: "Your company's main service" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
    ],
    promptContent: `You are a B2B SEO strategist. Plan SEO topic clusters and a content map for the following company.

[Background]
- Company: [Company Name]
- Main Service: [Main Service]
- Target Customer: [Target Customer]

[Task]
1. Derive 3–5 topic clusters from the services, each with 1 pillar topic and 4–6 cluster topics.
2. For each topic, provide: possible long-tail keyword directions (do not fabricate search volume), search-intent classification (informational / commercial / transactional), and recommended content format (service page, guide, comparison, case study).
3. Recommend an internal linking strategy.
4. Provide content-production priorities for 30, 90, and 180 days.

[Judgment Criteria] Do not fabricate specific search volumes; if verification is needed, note "recommend validating with GSC / a keyword tool."`,
    usageSteps: [
      "Fill in the variables.",
      "Validate keywords with real tools.",
      "Schedule content production according to the 30/90/180-day roadmap.",
    ],
    example:
      "For an engineering integration company, clusters might include: data-center cabling, systems integration acceptance testing, AI adoption, etc.",
    commonMistakes: ["Treating AI-generated keywords as real search-volume data."],
    cautions: ["Keyword strategy must be paired with content quality, or rankings won't hold."],
    seoTitle: "Website SEO Keyword & Content Architecture Prompt | AEGIS",
    seoDescription:
      "Use the topic-cluster method to plan B2B website SEO themes and content production priorities.",
  },

  "website-launch-checklist": {
    title: "Pre-Launch Website Review & Acceptance Prompt",
    summary:
      "Produces a pre-launch checklist covering technical, content, SEO, and compliance items.",
    audience: "Project manager, IT",
    tags: ["Launch", "Acceptance", "Checklist"],
    preparation: [
      "The completed staging version of the website.",
      "Basic SEO and tracking configuration documentation (if any).",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Website URL]", description: "The staging or production URL" },
      { name: "[Primary Language]", description: "e.g., English, English/Chinese" },
    ],
    promptContent: `You are a senior QA consultant. Generate a pre-launch checklist for the website about to go live.

[Background]
- Company: [Company Name]
- URL: [Website URL]
- Language: [Primary Language]

[Checklist Categories]
1. Content (typos, contact info, legal/compliance text, image copyrights).
2. Technical (Lighthouse score, 404s, broken links, HTTPS, 301 redirects, favicon, OG image).
3. SEO (title / meta / canonical / sitemap / robots / Search Console verification / GA4).
4. Forms (submission, validation, notification emails, spam protection).
5. Tracking (GA, GTM, Pixel, event naming).
6. Security and backups (certificates, backup frequency, CMS account permissions).
7. Responsiveness (mobile, tablet, desktop).

[Output Format] A table: Category / Check Item / Pass Criteria / Status (leave blank).`,
    usageSteps: [
      "Fill in the variables.",
      "Import the AI-generated checklist into your project management tool.",
      "Check off each item before launch.",
    ],
    example:
      "Suitable for SMEs before launch, filling gaps commonly overlooked in SEO and tracking items.",
    commonMistakes: [
      "Only checking desktop and forgetting mobile.",
      "Missing Google Search Console verification and sitemap submission.",
    ],
    cautions: ["Legal/compliance text must be confirmed by legal counsel or an advisor, not fully drafted by AI."],
    seoTitle: "Pre-Launch Website Checklist Prompt | AEGIS",
    seoDescription:
      "Generate a complete pre-launch checklist covering technical, content, SEO, compliance, and tracking items.",
  },

  "website-audit": {
    title: "Existing Corporate Website Audit & Optimization Prompt",
    summary:
      "Provides optimization recommendations for an existing website from the angles of information architecture, content, SEO, UX, and conversion.",
    audience: "Marketing, IT, executive management",
    tags: ["Website Audit", "Optimization", "SEO"],
    preparation: ["The existing website URL.", "Google Analytics or GSC export data (if available)."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Website URL]", description: "The existing website URL" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Main Business Goal]", description: "e.g., inquiries, sign-ups, recruiting" },
    ],
    promptContent: `You are a B2B website audit consultant. Produce a draft website audit report based on the following company information.

[Background]
- Company: [Company Name]
- URL: [Website URL]
- Target Customer: [Target Customer]
- Main Business Goal: [Main Business Goal]

[Audit Dimensions]
1. Information architecture: navigation logic, page hierarchy, paths.
2. Messaging and positioning: does the hero section clearly communicate value?
3. Content depth: are services, case studies, and resources credible?
4. Basic SEO: title, meta, H1, structured data, internal links.
5. UX: readability, contrast, mobile experience, load speed.
6. Conversion: CTA placement, form length, contact channels.
7. Tracking: is GA4 / GSC / GTM fully set up?

[Output] For each dimension, list: current observation, risk / impact, recommended action, priority (P0/P1/P2). If it cannot be judged directly from the URL, mark it "requires manual review."`,
    usageSteps: [
      "Compare the AI's recommendations against actual data.",
      "Add items to the product or marketing roadmap by priority.",
    ],
    example:
      "The AI might suggest moving the \"Contact Us\" CTA to the top-right of the hero section, but this needs verification against brand tone.",
    commonMistakes: ["Treating the AI's \"feels outdated\" opinion as fact."],
    cautions: ["AI cannot truly crawl the entire site; for important pages, provide content excerpts manually."],
    seoTitle: "Corporate Website Audit Prompt | AEGIS",
    seoDescription:
      "Produce a draft website audit report covering information architecture, content, SEO, UX, and conversion.",
  },

  "erp-requirements": {
    title: "ERP System Requirements Analysis Prompt",
    summary:
      "Helps map operational processes, module scope, and data integration needs before an ERP rollout.",
    audience: "IT, finance, operations managers",
    tags: ["ERP", "Requirements Analysis", "Digital Transformation"],
    preparation: [
      "A documented review of current processes.",
      "A list of existing systems and their data flows.",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Number of Employees]", description: "e.g., 25, 120, 500+" },
      { name: "[Annual Revenue Range]", description: "e.g., NT$500M–1B" },
      { name: "[Top 3 Pain Points]", description: "The top three problems you currently want to solve" },
    ],
    promptContent: `You are a senior ERP implementation consultant familiar with finance, production planning, procurement, and inventory processes in manufacturing and engineering companies. Conduct an ERP requirements analysis based on the following background.

[Background]
- Company: [Company Name] / [Industry]
- Number of Employees: [Number of Employees]
- Annual Revenue Range: [Annual Revenue Range]
- Top 3 Pain Points: [Top 3 Pain Points]

[Task]
1. In no more than 200 words, describe your assumed current process (explicitly labeled "the following is an assumption").
2. Recommend module scope priority (finance, general ledger, AR/AP, procurement, inventory, production planning, costing, projects, BI reporting).
3. List 20 user stories (As a / I want / So that).
4. Recommend data integration targets (CRM, MES, e-invoicing, banking, government platforms).
5. Recommend rollout phases and milestones (Wave 1 / 2 / 3).
6. Recommend key risks and mitigations.

[Judgment Criteria] Do not name a specific vendor (SAP / Oracle, etc.) as the only solution; explain the situations each fits.`,
    usageSteps: [
      "Fill in the variables.",
      "Validate assumptions through interviews with finance / production planning teams.",
      "Compile into an RFP for candidate vendors.",
    ],
    example:
      "For a 100-employee manufacturer, Wave 1 typically focuses on finance, inventory, and procurement.",
    commonMistakes: [
      "Requiring all modules to launch at once.",
      "Starting vendor selection before clearly documenting current processes.",
    ],
    cautions: ["ERP adoption involves organizational change, not just system selection."],
    seoTitle: "ERP Requirements Analysis Prompt | AEGIS",
    seoDescription:
      "Systematically map ERP module scope, user stories, data integration, and rollout phases before implementation.",
  },

  "crm-planning": {
    title: "CRM Customer Management System Planning Prompt",
    summary:
      "Plans CRM rollout goals, data model, phases, and integration with ERP/marketing tools.",
    audience: "Sales, marketing, IT",
    tags: ["CRM", "Sales", "Customer Management"],
    preparation: ["Sources of existing customer lists.", "Sales process and stage definitions."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Number of Employees]", description: "e.g., 25, 120, 500+" },
      { name: "[Current CRM Status]", description: "e.g., Excel, no system, name of existing CRM" },
      { name: "[Main Sales Process Stages]", description: "e.g., Lead → Opportunity → Proposal → Contract → Payment" },
    ],
    promptContent: `You are a CRM consultant. Plan a CRM rollout for the following company.

[Background]
- Company: [Company Name]
- Number of Employees: [Number of Employees]
- Target Customer: [Target Customer]
- Current CRM Status: [Current CRM Status]
- Sales Process: [Main Sales Process Stages]

[Output]
1. 3–5 CRM rollout goals, each with a measurable metric.
2. Data model: recommended fields for customer, contact, opportunity, quote, activity, task.
3. Sales pipeline design (with entry/exit criteria for each stage).
4. 5 day-to-day sales usage scenarios.
5. Integration recommendations with ERP, EDM, and customer service systems.
6. Rollout phases: Phase 1 (basic CRM), Phase 2 (automation), Phase 3 (AI insights).
7. Common failure causes and countermeasures.

[Judgment Criteria] Do not assume a specific brand; success metrics must be measurable.`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm pipeline stage definitions with the sales manager.",
      "Finalize before starting vendor selection.",
    ],
    example:
      "Small and medium manufacturers often upgrade directly from Excel and must first resolve duplicate customer records.",
    commonMistakes: ["Unclear pipeline stage definitions causing sales reps to avoid using it."],
    cautions: ["CRM success hinges on data discipline, not just system selection."],
    seoTitle: "CRM System Planning Prompt | AEGIS",
    seoDescription:
      "Plan CRM goals, data model, pipeline, integrations, and rollout phases.",
  },

  "bi-dashboard": {
    title: "BI Management Dashboard Planning Prompt",
    summary:
      "Starts from 'decision questions' to plan a management dashboard, avoiding a pile of useless metrics.",
    audience: "Executive management, IT",
    tags: ["BI", "Dashboard", "Data"],
    preparation: ["Current KPI status.", "A list of data sources."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Target Users]", description: "e.g., general manager, sales manager, plant manager" },
      { name: "[3 Key Decision Questions]", description: "e.g., Are we on track this month? Which product line's margin is declining?" },
    ],
    promptContent: `You are a BI dashboard design consultant. Plan a management dashboard for the following audience.

[Background]
- Company: [Company Name]
- Target Users: [Target Users]
- 3 Key Decision Questions: [3 Key Decision Questions]

[Output]
1. For each decision question, list 3–5 core metrics and their data sources.
2. Dashboard layering: high-level (1 page), drill-down (3–5 pages).
3. Recommended chart types with rationale.
4. Data refresh frequency (real-time / daily / weekly).
5. Data-quality risks and governance recommendations.
6. An outline of a user-training plan.

[Judgment Criteria] Avoid producing a "show everything" dashboard; every metric must tie to a concrete decision or action.`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm source feasibility with data engineers.",
      "Build an MVP first, then expand.",
    ],
    example:
      "A sales manager's dashboard typically focuses on pipeline value, projected achievement rate, and top-account activity.",
    commonMistakes: ["Moving all ERP reports into BI without redesigning them."],
    cautions: ["Data quality is the foundation of dashboard trust."],
    seoTitle: "BI Management Dashboard Planning Prompt | AEGIS",
    seoDescription:
      "Plan a layered dashboard and metric selection starting from decision questions.",
  },

  "engineering-pm-system": {
    title: "Engineering Project Management System Planning Prompt",
    summary:
      "Plans modules and data model for an engineering project management system spanning multiple sites and contractors.",
    audience: "Engineering PMs, IT",
    tags: ["Engineering", "PM", "Project Management"],
    preparation: ["Current project processes.", "Site reporting method (LINE / Excel / system)."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Annual Project Count]", description: "Order-of-magnitude number of projects executed in the past year" },
      { name: "[Main Project Type]", description: "e.g., data-center cabling, low-voltage systems integration" },
    ],
    promptContent: `You are a digital transformation consultant for engineering companies. Plan an engineering project management system.

[Background]
- Company: [Company Name]
- Annual Project Count: [Annual Project Count]
- Main Project Type: [Main Project Type]

[Output]
1. Data model: project, phase, task, resource, material, change order, acceptance, defect.
2. Roles and usage scenarios at the site and office levels.
3. Progress-reporting mechanism (daily / weekly / milestone).
4. Risk and change management process.
5. Cost and margin calculation fields and rules.
6. Integration recommendations with CostFlow, ERP, and finance systems.
7. Recommended rollout phases.

[Judgment Criteria] Must account for unstable site connectivity and the need for offline record syncing.`,
    usageSteps: [
      "Fill in the variables.",
      "Validate reporting habits by interviewing site supervisors.",
      "Build a mobile MVP first.",
    ],
    example:
      "Data-center cabling projects usually need to track by floor, rack, and fiber core count.",
    commonMistakes: ["Designing the system from an office-only perspective, so field crews don't actually use it."],
    cautions: ["Involves subcontractor data access; permissions must be set carefully."],
    seoTitle: "Engineering Project Management System Prompt | AEGIS",
    seoDescription:
      "Plan the data model and processes for a multi-site, multi-contractor engineering project management system.",
  },

  "inventory-procurement": {
    title: "Inventory & Procurement Management System Planning Prompt",
    summary:
      "Plans fields, processes, and KPIs for an inventory/procurement system for manufacturing and engineering companies.",
    audience: "Materials management, procurement, IT",
    tags: ["Inventory", "Procurement", "Supply Chain"],
    preparation: ["Current inventory management method.", "A list of main suppliers."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Main Inventory Categories]", description: "e.g., raw materials, finished goods, consumables, tools" },
      { name: "[Main Pain Point]", description: "e.g., excess dead stock, duplicate part numbers, frequent stockouts" },
    ],
    promptContent: `You are an SCM consultant. Plan an inventory and procurement system for the following company.

[Background]
- Company: [Company Name] / [Industry]
- Main Inventory Categories: [Main Inventory Categories]
- Main Pain Point: [Main Pain Point]

[Output]
1. Recommended part-number rules (structured coding).
2. Data fields (item, supplier, purchase order, receiving, inventory movement, stocktake).
3. Procurement process (requisition → approval → order → receiving → inspection → payment).
4. Safety stock and reorder-point calculation methods.
5. Recommended KPIs (dead-stock rate, inventory turnover, on-time delivery rate).
6. Integration recommendations with ERP, MES, and finance.
7. Rollout phases.

[Judgment Criteria] Do not recommend unverified mechanisms such as "AI auto-ordering."`,
    usageSteps: [
      "Fill in the variables.",
      "Resolve part-numbering and stocktaking issues first, then automate.",
    ],
    example: "A common pain point in engineering firms is consumables with no part number, making cost tracking impossible.",
    commonMistakes: ["Deploying a system before cleaning up part numbers."],
    cautions: ["Stocktaking discipline and process matter more than system features."],
    seoTitle: "Inventory & Procurement System Planning Prompt | AEGIS",
    seoDescription:
      "Plan fields, processes, and KPIs for an inventory / procurement system for manufacturing and engineering companies.",
  },

  "workflow-automation": {
    title: "Enterprise Workflow Automation Planning Prompt",
    summary:
      "Identifies automatable processes, priority order, and tool selection recommendations.",
    audience: "IT, operations",
    tags: ["Automation", "Process", "Low-code"],
    preparation: ["A list of existing processes.", "Current tool landscape (Google Workspace, M365, LINE, etc.)."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Number of Employees]", description: "e.g., 25, 120, 500+" },
      { name: "[3 Most Time-Consuming Processes]", description: "e.g., quote review, purchase requisition, monthly reporting" },
    ],
    promptContent: `You are a process automation consultant. Identify automatable processes for the following company.

[Background]
- Company: [Company Name]
- Number of Employees: [Number of Employees]
- 3 Most Time-Consuming Processes: [3 Most Time-Consuming Processes]

[Output]
1. For each process, draw a text-based "as-is" (current state) and "to-be" (automated) flow.
2. Classify degree of automation: pure reminder, partially automated, fully automated, requires AI judgment.
3. Tool-selection categories (forms, approvals, iPaaS, RPA, AI) and when each applies.
4. Priority ranking: an effort × value matrix.
5. Rollout roadmap (30 / 90 / 180 days).
6. Common pitfalls: exception handling, audit trails, permissions.

[Judgment Criteria] Do not assume a specific product; if API integration is required, note that official support must be confirmed.`,
    usageSteps: [
      "Fill in the variables.",
      "Deliver one quick win first to build trust.",
      "Then expand cross-departmentally.",
    ],
    example: "Quote review can often be replaced with an approval workflow + notifications instead of email.",
    commonMistakes: ["Automating a broken process → making mistakes faster."],
    cautions: ["Confirm the process itself is sound before automating it."],
    seoTitle: "Enterprise Workflow Automation Prompt | AEGIS",
    seoDescription:
      "Identify automatable processes, prioritize them, and choose tool categories.",
  },

  "roles-permissions": {
    title: "System Accounts, Roles & Permissions Planning Prompt",
    summary: "Plans a role matrix and least-privilege principles for a new system.",
    audience: "IT, security",
    tags: ["Permissions", "Roles", "Security"],
    preparation: ["An organizational chart.", "Roles in the main business processes."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[System Name]", description: "The system being planned" },
      { name: "[Main Roles]", description: "e.g., sales, sales assistant, PM, finance, owner" },
    ],
    promptContent: `You are an IT governance consultant. Plan roles and permissions for a system.

[Background]
- Company: [Company Name]
- System: [System Name]
- Main Roles: [Main Roles]

[Output]
1. Role matrix (Role × Feature), marking CRUD access.
2. A list of sensitive operations (export, delete, financial, personal data).
3. Concrete ways to enforce the principle of least privilege.
4. An exception-authorization process.
5. Recommended fields for logging and auditing.
6. Recommended frequency for periodic permission reviews.

[Judgment Criteria] Do not give all managers full access; distinguish "view" from "edit."`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm actual needs with each manager.",
      "Implement RBAC in the system.",
    ],
    example: "A sales assistant typically only needs to view contracts and edit quotes, not delete them.",
    commonMistakes: ["Making the \"owner\" a super-admin with no auditing."],
    cautions: ["Roles that touch personal data must comply with data privacy law."],
    seoTitle: "System Roles & Permissions Planning Prompt | AEGIS",
    seoDescription:
      "Plan a role matrix, least-privilege principles, and auditing for internal enterprise systems.",
  },

  "database-entities": {
    title: "System Database & Core Entities Planning Prompt",
    summary: "Derives core entities and relationships for a new system from its business processes.",
    audience: "IT, back-end engineers",
    tags: ["Database", "Data Model", "ERD"],
    preparation: ["A description of the business process.", "Data export from an existing system (if any)."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[System Name]", description: "The system being planned" },
      { name: "[Main Business Objects]", description: "e.g., customer, quote, project, part number" },
    ],
    promptContent: `You are a senior database architect. Plan the core entities and relationships for a system.

[Background]
- Company: [Company Name]
- System: [System Name]
- Main Business Objects: [Main Business Objects]

[Output]
1. A list of entities, each with: fields, data type, required flag, default value, notes.
2. Primary keys and relationships (1:N / N:M).
3. Audit fields (created at, created by, updated at, updated by).
4. Soft-delete strategy.
5. Indexing recommendations.
6. 5 example common queries, confirming the data model supports them.
7. Classification of private / sensitive fields.

[Judgment Criteria] Do not over-normalize the design to the point queries become difficult; avoid over-denormalizing to the point consistency becomes risky.`,
    usageSteps: [
      "Fill in the variables.",
      "Draw the ERD using a diagramming tool (dbdiagram, Mermaid).",
      "Review with the back-end team.",
    ],
    example: "The core of a quoting system usually includes Customer, Quote, QuoteItem, and Product.",
    commonMistakes: [
      "Putting all fields in one table.",
      "Missing a soft-delete strategy, creating compliance risk.",
    ],
    cautions: ["Personal-data fields need to consider encryption and access logging."],
    seoTitle: "System Database Planning Prompt | AEGIS",
    seoDescription:
      "Derive core entities, fields, relationships, and indexes from business processes.",
  },

  "user-stories-acceptance": {
    title: "System User Stories & Acceptance Criteria Prompt",
    summary: "Turns functional requirements into testable user stories with Given-When-Then acceptance criteria.",
    audience: "PM, QA",
    tags: ["User Story", "Acceptance", "Agile"],
    preparation: ["A list of functional requirements.", "The main user roles."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[System Name]", description: "The system being planned" },
      { name: "[Feature Topic]", description: "e.g., quote approval, project reporting" },
    ],
    promptContent: `You are a senior agile PM. Turn the functional requirements into user stories.

[Background]
- Company: [Company Name]
- System: [System Name]
- Feature Topic: [Feature Topic]

[Output]
1. 10–15 user stories (As a / I want / So that).
2. 3–5 acceptance criteria per story (Given-When-Then).
3. Priority labeling (Must / Should / Could / Won't).
4. Dependency notes.
5. Recommended types of test data.

[Judgment Criteria] Stories must describe "what result the user gets," not interface details.`,
    usageSteps: [
      "Fill in the variables.",
      "Review acceptance criteria together with QA.",
      "Add to the backlog.",
    ],
    example:
      "\"As a sales manager, I want to view this month's pipeline so that I can track my achievement rate.\"",
    commonMistakes: ["Writing stories as \"add a button on the screen.\""],
    cautions: ["Acceptance criteria must be testable; avoid subjective language like \"user is satisfied.\""],
    seoTitle: "User Stories & Acceptance Criteria Prompt | AEGIS",
    seoDescription:
      "Turn functional requirements into testable As-a / Given-When-Then user stories.",
  },

  "system-security-checklist": {
    title: "System Security & Launch Review Prompt",
    summary: "Produces a pre-launch security and reliability checklist for a new system.",
    audience: "IT, security, DevOps",
    tags: ["Security", "Launch", "Checklist"],
    preparation: ["A system architecture diagram.", "A data flow diagram."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[System Name]", description: "The name of the system" },
      { name: "[Data Sensitivity]", description: "e.g., contains personal data, contains financial data, internal only" },
    ],
    promptContent: `You are a security and reliability engineering consultant. Produce a launch checklist for the following system.

[Background]
- Company: [Company Name]
- System: [System Name]
- Data Sensitivity: [Data Sensitivity]

[Checklist Dimensions]
1. Identity and access (MFA, SSO, role permissions, offboarding process).
2. Data protection (encryption in transit, encryption at rest, backups, anonymization).
3. Application security (OWASP Top 10, dependency scanning, secrets management).
4. Monitoring and auditing (logging, alerting, retention).
5. High availability (RTO / RPO, fault tolerance, redundancy).
6. Supply chain and third parties (SaaS licensing, data processing agreements).
7. Incident response process.
8. Training and phishing drills.

[Output Format] A table: Dimension / Check Item / Judgment Criteria / Owner / Status. Do not recommend unverified specific security products.`,
    usageSteps: [
      "Fill in the variables.",
      "Review with security / compliance teams.",
      "Include in the go/no-go launch decision.",
    ],
    example: "A system handling personal data must complete data processing records and consent forms.",
    commonMistakes: ["Only running functional tests while neglecting security testing."],
    cautions: ["Personal-data and cross-border data handling must comply with local regulations."],
    seoTitle: "System Security & Launch Review Prompt | AEGIS",
    seoDescription:
      "Produce a pre-launch checklist covering security, auditing, redundancy, and incident response.",
  },

  "sop-writing-prompt": {
    title: "Enterprise SOP Writing Prompt",
    summary: "Turns word-of-mouth processes into a clear, trainable, and auditable SOP.",
    audience: "Operations, HR, department managers",
    tags: ["SOP", "Process", "Governance"],
    preparation: ["A verbal description of the current practice.", "Common error cases."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[SOP Topic]", description: "e.g., customer complaint handling, incoming goods inspection" },
      { name: "[Related Roles]", description: "Departments and roles involved" },
      { name: "[Current Problem]", description: "A brief description of the problem and context you want to solve" },
    ],
    promptContent: `You are an enterprise process consultant. Turn the described process into a formal SOP.

[Background]
- Company: [Company Name]
- SOP Topic: [SOP Topic]
- Related Roles: [Related Roles]
- Current Problem: [Current Problem]

[SOP Sections]
1. Purpose.
2. Scope of application.
3. Term definitions.
4. Roles and responsibilities (RACI).
5. Prerequisites.
6. Steps (each with input, action, output, decision point).
7. Exception handling.
8. Audit records and KPIs.
9. Version history.

[Judgment Criteria] Steps must be executable by a new hire without guidance; if information is missing, list who to confirm with.`,
    usageSteps: [
      "Fill in the variables.",
      "Have the actual executor pilot-run the AI-generated SOP.",
      "Revise and finalize.",
    ],
    example: "A common gap in customer complaint SOPs is missing a \"respond within 48 hours\" KPI.",
    commonMistakes: ["Writing the SOP like a novel, making it hard to follow."],
    cautions: ["SOPs involving safety or regulation need professional review."],
    seoTitle: "Enterprise SOP Writing Prompt | AEGIS",
    seoDescription:
      "Turn verbal processes into a structured SOP with RACI, KPIs, and exception handling.",
  },

  "meeting-notes-prompt": {
    title: "Meeting Notes & Action Item Summary Prompt",
    summary: "Turns lengthy meeting discussions into decisions, action items, owners, and deadlines.",
    audience: "All departments",
    tags: ["Meetings", "Action Items", "Productivity"],
    preparation: ["A meeting transcript or summary."],
    variables: [
      { name: "[Meeting Topic]", description: "The meeting's topic" },
      { name: "[Attendees]", description: "Meeting participants" },
      { name: "[Meeting Content or Transcript]", description: "Paste the meeting discussion content" },
    ],
    promptContent: `You are a project assistant. Turn the following meeting content into formal minutes.

[Input]
- Meeting Topic: [Meeting Topic]
- Attendees: [Attendees]
- Meeting Content: [Meeting Content or Transcript]

[Output]
1. A meeting summary in 5 lines or fewer.
2. A list of decisions made.
3. An action-item table: item / owner / due date / deliverable.
4. Open items to confirm (with who is responsible for following up).
5. Suggestions for the next meeting.

[Judgment Criteria] Do not write "discussion" as if it were a "decision"; anything without a clearly named owner should be listed under open items.`,
    usageSteps: [
      "Paste in the transcript or recording transcription.",
      "Confirm owners and deadlines before sending.",
    ],
    example:
      "Common issue: the AI mistakes \"someone mentioned\" for a \"decision\" — this needs manual verification.",
    commonMistakes: ["Handing an entire long meeting to AI without reviewing it."],
    cautions: ["When confidential data is involved, be mindful of the company's AI tool data-usage policy."],
    seoTitle: "Meeting Notes Prompt | AEGIS",
    seoDescription:
      "Turn meeting discussions into decisions, action items, and open items to confirm.",
  },

  "quarterly-goals": {
    title: "Annual & Quarterly Operating Goals Planning Prompt",
    summary: "Uses an OKR/KPI structure to help departments set measurable quarterly goals.",
    audience: "Executive management, department managers",
    tags: ["OKR", "KPI", "Goal Management"],
    preparation: ["The company's overall annual goal.", "The current state of each department."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Department Name]", description: "The department setting goals" },
      { name: "[Annual Goal]", description: "The company's annual strategic goal" },
      { name: "[Current Challenge]", description: "The main challenge this quarter" },
    ],
    promptContent: `You are a strategic planning consultant. Help the following department design this quarter's goals.

[Background]
- Company: [Company Name]
- Department: [Department Name]
- Annual Goal: [Annual Goal]
- Current Challenge: [Current Challenge]

[Output]
1. 3 Objectives (achievable within 12 weeks, ambitious yet realistic).
2. 3–5 measurable Key Results per Objective.
3. Action plan, owner, and milestones for each Key Result.
4. Risks and contingencies.
5. A recommended weekly review cadence.

[Judgment Criteria] KRs must be quantifiable; avoid unmeasurable statements like "improve customer satisfaction."`,
    usageSteps: [
      "Fill in the variables.",
      "Review with the department whether the KRs are overly optimistic.",
      "Track in the weekly meeting.",
    ],
    example:
      "Sales Dept. O1: Achieve a 25% quote conversion rate in Q3; KR1: Submit 30 valid quotes...",
    commonMistakes: ["Setting OKRs and then never tracking them."],
    cautions: ["KRs must honestly reflect challenges; avoid self-deceiving numbers."],
    seoTitle: "Quarterly OKR Goal-Planning Prompt | AEGIS",
    seoDescription:
      "Use the OKR structure to help departments design measurable quarterly goals and action plans.",
  },

  "sales-pipeline-management-prompt": {
    title: "Sales Pipeline & Customer Tiering Prompt",
    summary: "Designs pipeline stages and customer-tiering rules that match the company's actual sales rhythm.",
    audience: "Sales managers",
    tags: ["Sales", "Pipeline", "Tiering"],
    preparation: [
      "Analysis of closed deals from the past 12 months (if available).",
      "Size and seniority of the sales team.",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Main Service]", description: "Your company's main service" },
      { name: "[Target Customer]", description: "e.g., procurement managers at mid-size manufacturers, regional government procurement units" },
      { name: "[Average Sales Cycle]", description: "Average number of days from lead to signed contract" },
    ],
    promptContent: `You are a B2B sales consultant. Design a sales pipeline and customer tiering system for the following company.

[Background]
- Company: [Company Name]
- Main Service: [Main Service]
- Target Customer: [Target Customer]
- Average Sales Cycle: [Average Sales Cycle]

[Output]
1. Pipeline stages (5–7 stages), each with: definition, entry/exit criteria, probability, expected output.
2. Customer tiering (A/B/C) criteria: size, industry, win probability, strategic value.
3. Recommended contact frequency per tier.
4. Common "fake pipeline" warning signs.
5. 3 ways to improve forecast accuracy.

[Judgment Criteria] Probability percentages must match actual historical conversion rates; if no data exists, mark as an assumption.`,
    usageSteps: [
      "Fill in the variables.",
      "Review stage definitions with senior sales reps.",
      "Implement in the CRM.",
    ],
    example: "Engineering-sector sales cycles are typically 3–9 months, so the pipeline needs to accommodate a longer horizon.",
    commonMistakes: ["Using subjective terms like \"very promising\" for pipeline stages."],
    cautions: ["Avoid sales reps padding the pipeline with fake opportunities to boost reports."],
    seoTitle: "Sales Pipeline Management Prompt | AEGIS",
    seoDescription:
      "Design pipeline stages and customer tiering that match your actual sales rhythm.",
  },

  "engineering-project-risk-prompt": {
    title: "Project Progress & Risk Management Prompt",
    summary: "Produces a progress-tracking and risk-register template for an engineering or systems project.",
    audience: "PM, project managers",
    tags: ["Project Management", "Risk", "Progress"],
    preparation: ["The project charter or SOW.", "Team member roles."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Project Name]", description: "This project's name" },
      { name: "[Project Type]", description: "e.g., data-center cabling, ERP implementation" },
      { name: "[Target Completion Date]", description: "e.g., launch by Q2, within 3 months" },
    ],
    promptContent: `You are a senior PMO consultant. Produce a progress-tracking and risk-management framework for the following project.

[Background]
- Company: [Company Name]
- Project Name: [Project Name]
- Project Type: [Project Type]
- Target Completion Date: [Target Completion Date]

[Output]
1. The first two levels of a WBS.
2. Recommended milestones and deadlines.
3. A risk register: risk / impact / probability / score / mitigation / owner. List 10 initial risks.
4. A weekly progress-report format.
5. A communication plan (who, what, frequency, channel).
6. A change-control process.

[Judgment Criteria] Risk descriptions must include a trigger condition and quantified impact; avoid simply writing "delay."`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm the WBS with the team.",
      "Include in the weekly project meeting.",
    ],
    example:
      "Common risks in data-center projects: site-access restrictions, delayed material delivery, power-window constraints.",
    commonMistakes: ["Setting milestones to \"finish as soon as possible.\""],
    cautions: ["The risk register must be updated continuously."],
    seoTitle: "Project Progress & Risk Management Prompt | AEGIS",
    seoDescription:
      "Produce a WBS, risk register, progress report, and change-control process for a project.",
  },

  "cost-margin-analysis-prompt": {
    title: "Quoting, Cost & Project Margin Analysis Prompt",
    summary: "Helps build a quote cost structure, margin simulation, and sensitivity analysis.",
    audience: "Sales, finance, project teams",
    tags: ["Quoting", "Cost", "Margin"],
    preparation: ["Historical quotes and actual cost data.", "Main cost category breakdown."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Quote Type]", description: "e.g., engineering integration, system implementation, consumables" },
      { name: "[Main Cost Items]", description: "e.g., labor, materials, subcontracting, travel" },
    ],
    promptContent: `You are a finance and project cost consultant. Help build a quote cost model.

[Background]
- Company: [Company Name]
- Quote Type: [Quote Type]
- Main Cost Items: [Main Cost Items]

[Output]
1. A cost-structure tree (Levels 1–3).
2. A formula and data source for each cost item.
3. A split between direct and indirect costs.
4. Margin-calculation method and a recommended target margin range.
5. Sensitivity analysis: margin impact of ±10% on the 3 key variables.
6. A list of commonly underestimated cost items.
7. Quote-review checkpoints.

[Judgment Criteria] Do not assume specific numbers; provide formulas and a spreadsheet structure, with numbers to be filled in by the company.`,
    usageSteps: [
      "Fill in the variables.",
      "Review the formulas with finance.",
      "Build an Excel / BI spreadsheet.",
    ],
    example: "Engineering integration commonly underestimates: overtime pay, material waste, change-management costs.",
    commonMistakes: ["Reverse-engineering price from margin target while ignoring competitive conditions."],
    cautions: ["Margin strategy must be evaluated alongside long-term customer relationships."],
    seoTitle: "Quote Cost & Margin Analysis Prompt | AEGIS",
    seoDescription:
      "Build a quote cost structure, margin simulation, and sensitivity analysis framework.",
  },

  "job-description-kpi": {
    title: "Job Description & KPI Design Prompt",
    summary:
      "Consolidates a job description, key responsibilities, and KPIs to avoid ambiguous departmental performance standards.",
    audience: "HR, department managers",
    tags: ["HR", "Job Description", "KPI"],
    preparation: ["An organizational chart.", "The department's annual goals."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Job Title]", description: "e.g., sales assistant, project manager" },
      { name: "[Department]", description: "The department this role belongs to" },
      { name: "[Reports To]", description: "The direct manager" },
    ],
    promptContent: `You are a senior HR consultant. Write a job description and KPIs for the following role.

[Background]
- Company: [Company Name]
- Job Title: [Job Title] / [Department]
- Reports To: [Reports To]

[Output]
1. Job purpose in 3 lines.
2. 5–8 key responsibilities (verb + object + standard).
3. A KPI or measurement method for each responsibility.
4. Required and preferred qualifications.
5. A career development path.
6. A 90-day onboarding plan.

[Judgment Criteria] Do not use hard-to-evaluate statements like "has a sense of responsibility"; KPIs must be quantifiable or event-based.`,
    usageSteps: [
      "Fill in the variables.",
      "Confirm responsibility and KPI allocation with the department manager.",
      "Use in recruiting and performance reviews.",
    ],
    example:
      "Sales-assistant KPIs: average quote turnaround time, invoice error rate, timely complaint-resolution rate.",
    commonMistakes: ["Listing \"strong multitasking ability\" as a main KPI."],
    cautions: ["KPIs must comply with labor law and fairness principles."],
    seoTitle: "Job Description & KPI Design Prompt | AEGIS",
    seoDescription:
      "Consolidate a job description, key responsibilities, and quantifiable KPIs.",
  },

  "monthly-management-report": {
    title: "Corporate Monthly & Management Report Generator Prompt",
    summary:
      "Turns cross-departmental monthly figures into a readable executive report with recommended actions.",
    audience: "Executive management, department managers",
    tags: ["Monthly Report", "Management", "Reporting"],
    preparation: ["Figures from each department (sales, finance, projects).", "Trends over the last 3 months."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Report Month]", description: "e.g., July 2026" },
      { name: "[Main Metrics]", description: "e.g., revenue, pipeline, project margin" },
      { name: "[Raw Figures]", description: "Paste the raw data provided by departments" },
    ],
    promptContent: `You are the CEO's executive assistant. Turn the following figures into an executive monthly report.

[Input]
- Company: [Company Name]
- Month: [Report Month]
- Main Metrics: [Main Metrics]
- Raw Figures: [Raw Figures]

[Output]
1. An executive summary in 5 lines.
2. Achievement rate and trend analysis for each metric (with a simple text chart).
3. Three pieces of good news, three warning signs.
4. Possible causes and follow-up questions for each warning sign.
5. 5 recommended actions for next month, each with an owner.
6. 3 items requiring the owner's decision.

[Judgment Criteria] Do not use vague comments like "looks fine"; every conclusion must cite a concrete number.`,
    usageSteps: [
      "Organize the raw figures and paste them in.",
      "Have finance / sales managers review the AI output.",
    ],
    example: "Especially useful when the owner wants to read the whole report in 15 minutes.",
    commonMistakes: ["The AI comparing cross-month figures incorrectly — needs manual verification."],
    cautions: ["Sensitive financial figures must comply with the company's disclosure policy."],
    seoTitle: "Corporate Monthly Report Generator Prompt | AEGIS",
    seoDescription:
      "Turn cross-departmental monthly figures into an executive summary, warning signs, and recommended actions.",
  },

  "supply-chain-inventory-prompt": {
    title: "Procurement, Supply Chain & Inventory Decision Prompt",
    summary: "Uses data to help analyze supplier risk and inventory strategy.",
    audience: "Procurement, materials management",
    tags: ["Procurement", "Supply Chain", "Inventory"],
    preparation: ["A supplier list.", "Purchasing and delivery data from the past 12 months."],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Main Item]", description: "The item being analyzed" },
      { name: "[Main Suppliers]", description: "A list of suppliers" },
      { name: "[Known Risks]", description: "e.g., price increases, shortages, geopolitical risk" },
    ],
    promptContent: `You are a senior supply-chain consultant. Help analyze supplier and inventory strategy.

[Background]
- Company: [Company Name]
- Main Item: [Main Item]
- Main Suppliers: [Main Suppliers]
- Known Risks: [Known Risks]

[Output]
1. Recommended fields for an item ABC analysis.
2. A supplier evaluation matrix (quality, delivery, price, financial stability, geopolitical exposure).
3. A single-supplier dependency risk assessment.
4. Safety-stock strategy (service level, demand variability).
5. A cash-flow impact assessment.
6. Short-, medium-, and long-term recommended actions.

[Judgment Criteria] Do not recommend under-evaluated decisions such as "cut ties with the supplier."`,
    usageSteps: [
      "Fill in the variables.",
      "Run the ABC analysis with real numbers.",
      "Review with the procurement manager.",
    ],
    example: "Semiconductor-related supply chains must factor in geopolitical and exchange-rate risk.",
    commonMistakes: ["Focusing only on price while ignoring delivery time and quality."],
    cautions: ["Stockout risk assessments must be synchronized with production and sales."],
    seoTitle: "Supply Chain & Inventory Decision Prompt | AEGIS",
    seoDescription:
      "Use data to analyze supplier risk, inventory strategy, and cash-flow impact.",
  },

  "ai-transformation-assessment": {
    title: "Enterprise AI Transformation Needs Assessment Prompt",
    summary:
      "Before formally launching an AI project, assess process maturity, data readiness, and rollout priorities.",
    audience: "Executive management, IT, operations",
    tags: ["AI Adoption", "Digital Transformation", "Needs Assessment"],
    preparation: [
      "The company's main business processes.",
      "A list of existing systems.",
      "Current data state (Excel, systems, paper).",
    ],
    variables: [
      { name: "[Company Name]", description: "Your company's official name" },
      { name: "[Industry]", description: "e.g., precision machinery manufacturing, systems integration, engineering consulting" },
      { name: "[Number of Employees]", description: "e.g., 25, 120, 500+" },
      { name: "[Main Expectation]", description: "e.g., customer-service automation, faster quoting, report generation" },
      { name: "[Main Constraint]", description: "e.g., budget, staffing, data quality" },
    ],
    promptContent: `You are an enterprise AI adoption consultant. Conduct a preliminary AI readiness assessment for the following company.

[Background]
- Company: [Company Name] / [Industry]
- Number of Employees: [Number of Employees]
- Main Expectation: [Main Expectation]
- Main Constraint: [Main Constraint]

[Assessment Dimensions]
1. Process maturity (are SOPs in place, is the process repeatable?).
2. Data readiness (digitized or not, data quality, accessibility).
3. System readiness (APIs, permissions, cloud vs. on-premises).
4. Organizational capability (dedicated data / AI personnel or not).
5. Governance and security (policy, personal data, risk).
6. AI suitability of current pain points (which are and aren't a good fit).

[Output]
- A 1–5 score for each dimension with rationale (if information is insufficient, mark it as requiring an interview).
- Based on the expectation and constraint, recommend 3 "quick wins" and 1 "strategic project," with estimated effort.
- A recommended roadmap for the next 90 / 180 / 365 days.

[Judgment Criteria] Do not claim AI can fully replace professional staff; the assessment should include scenarios where "AI is not recommended."`,
    usageSteps: [
      "Fill in the variables.",
      "Align the assessment results with executive management.",
      "Select a quick win and launch a PoC.",
    ],
    example:
      "Common quick wins for small/medium manufacturers: automated quote-document comparison, customer-email classification.",
    commonMistakes: ["Jumping straight to \"adopt ChatGPT Enterprise\" without assessing the data first."],
    cautions: ["AI adoption involves process and personnel changes; coordinate with HR and compliance."],
    seoTitle: "Enterprise AI Adoption Assessment Prompt | AEGIS",
    seoDescription:
      "Before launching an AI project, assess process maturity, data, systems, and organizational capability.",
  },
};

for (const key of Object.keys(PROMPTS_EN)) {
  PROMPTS_EN[key] = { ...PROMPTS_EN[key], promptContent: PROMPTS_EN[key].promptContent.trim() + TAIL_EN };
}
