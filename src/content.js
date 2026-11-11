// ============================================================================
//  YOUR CONTENT - edit here. Everything on the page is driven by this file.
//  (Street address and phone are intentionally left off a public page.
//   Add them back if you want them visible.)
// ============================================================================

export const content = {
  // --- Identity -------------------------------------------------------------
  name: "Himavanth Karpurapu",
  firstName: "Himavanth",
  role: "M.S. Computer Science @ SJSU · AI/ML + Full-Stack Engineer",
  tagline:
    "I build agentic AI systems and full-stack products that ship. Currently researching how LLMs verify their own reasoning.",
  location: "San Jose, CA",
  email: "himvanth89@gmail.com",

  links: [
    { label: "GitHub", url: "https://github.com/himavanthkar" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/himavanth-karpurapu/" },
    // Drop a link to your resume PDF here when it's hosted (Drive, site, etc.)
    { label: "Resume", url: "#" },
  ],

  // --- About ---------------------------------------------------------------
  about: {
    body: [
      "I'm a Master's student in Computer Science at San José State University (4.0 GPA), focused on machine learning, LLMs, and agentic AI, with two years of production software-engineering experience building systems on AWS.",
      "Right now I'm a research intern formalizing the generation-verification gap in language models: the conditions under which a model can solve a problem but can't tell whether its own answer is right.",
      "Outside research, I build fast. Most of my projects started as hackathon weekends and turned into things people actually use.",
    ],
    facts: [
      { label: "Degree", value: "M.S. Computer Science" },
      { label: "School", value: "San José State University" },
      { label: "GPA", value: "4.0 / 4.0" },
      { label: "Focus", value: "LLMs · Agents · AWS" },
    ],
  },

  // --- Awards / recognition -------------------------------------------------
  awards: [
    { title: "AWS re:Invent Grant Scholar", sub: "200 chosen from 100,000 applicants" },
    { title: "TreeHacks 2026: Healthcare AI Track", sub: "Winner · Stanford" },
    { title: "LA Hacks 2026", sub: "1st Place" },
    { title: "UC Berkeley AI Hackathon", sub: "Winner" },
    { title: "SJSU Grad Slam 2026", sub: "Winner" },
    { title: "SpartUp 2026", sub: "Winner" },
    { title: "Mozilla Responsible AI", sub: "Winner" },
    { title: "Shopify Shop Mini", sub: "Winner" },
  ],

  // --- Experience -----------------------------------------------------------
  experience: [
    {
      role: "Research Intern",
      org: "San José State University",
      meta: "Advisor: Dr. Robert Chun",
      period: "May 2025 to Present",
      points: [
        "Formalized the generation-verification gap in LLMs as G(M,T) - V(M,T) with LangGraph, building evaluation pipelines that quantify when models solve problems but cannot verify their own outputs.",
        "Benchmarked GPT-4o, Claude 3.5 Sonnet, Llama 3.1, and DeepSeek on GSM8K, MATH, HumanEval, and MBPP, analyzing false positives, calibration errors, and diversity collapse.",
        "Won SJSU Grad Slam 2026 presenting findings on when LLMs recognize their own mistakes.",
      ],
    },
    {
      role: "Software Engineer",
      org: "WinIT",
      meta: "Hyderabad, India",
      period: "May 2022 to Jul 2024",
      points: [
        "Delivered features for a production platform on AWS Lambda, API Gateway, and DynamoDB using GitHub Actions and Agile sprints across the full SDLC.",
        "Wrote and maintained Lambda functions and SQL queries, improving performance on high-traffic endpoints.",
        "Implemented JWT authentication in Java with Kubernetes secrets and led security reviews that strengthened access controls.",
      ],
    },
  ],

  // --- Projects -------------------------------------------------------------
  // Tip: replace each url with the exact repo link when you have it handy.
  projects: [
    {
      title: "Rewind",
      award: "TreeHacks 2026 Winner",
      blurb:
        "A 7-agent autonomous scheduling system on Fetch.ai uAgents / Agentverse. Agents coordinate calendar, email, tasks, and context, with Meta Ray-Ban glasses for hands-free voice capture.",
      tech: ["Python", "Fetch.ai uAgents", "OpenAI API"],
      url: "https://github.com/himavanthkar",
    },
    {
      title: "Dispatch",
      award: "LA Hacks 2026 · 1st Place",
      blurb:
        "A local-first retrieval engine indexing text, image, and code with SQLite FTS5, LanceDB, SigLIP, and Nomic embeddings, exposed through an MCP server so any tool can query it.",
      tech: ["Electron", "Node.js", "llama.cpp", "Gemma 3 4B"],
      url: "https://github.com/himavanthkar",
    },
    {
      title: "NeuroBoost",
      award: "SpartUp 2026 · YC Startup School",
      blurb:
        "An AI productivity platform serving ~1,000 users, with a LangChain pipeline that turns voice notes into tasks and a priority-graph scheduler. Iterated across three pivots from research with 120 students.",
      tech: ["React", "Django", "Node.js", "PostgreSQL"],
      url: "https://github.com/himavanthkar",
    },
    {
      title: "Three-Tier AWS Migration",
      award: "Cloud · DevOps",
      blurb:
        "A three-tier app containerized on AWS ECS/ECR with autoscaling and CloudWatch, plus a CircleCI pipeline gated on Jest tests and security across VPC, IAM, and CORS.",
      tech: ["React", "Node.js", "MongoDB", "AWS ECS"],
      url: "https://github.com/himavanthkar",
    },
  ],

  // --- Skills ---------------------------------------------------------------
  skills: [
    { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "C++", "SQL", "Go"] },
    { group: "LLMs & Agents", items: ["LangGraph", "LangChain", "LlamaIndex", "MCP", "Fetch.ai uAgents", "Hugging Face"] },
    { group: "RAG & ML", items: ["PyTorch", "TensorFlow", "Pinecone", "Neo4j", "OpenSearch", "Vector DBs"] },
    { group: "Full Stack", items: ["React", "Node.js", "Django", "FastAPI", "Spring Boot", "React Native"] },
    { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CircleCI", "GitHub Actions"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "DynamoDB", "MongoDB", "Redis"] },
  ],

  // --- Articles (write your own; these are starter examples, edit/replace) --
  articles: [
    { title: "When LLMs can't check their own work", blurb: "A plain-English tour of the generation-verification gap I research.", url: "#" },
    { title: "Building a 7-agent system in a weekend", blurb: "What I learned wiring up Fetch.ai uAgents for Rewind.", url: "#" },
    { title: "Local-first AI search, explained", blurb: "How Dispatch indexes text, images, and code on your own machine.", url: "#" },
  ],

  // --- Highlights: LinkedIn posts, conferences, prestigious awards ----------
  highlights: {
    conferences: [
      "AWS re:Invent: All Builders Welcome Grant Scholar (200 chosen from 100,000 applicants at North America's largest tech conference)",
      "TreeHacks @ Stanford: Healthcare AI Track Winner",
      "UC Berkeley AI Hackathon: Winner",
      "YC Startup School 2026",
    ],
    prestigious: [
      "AWS re:Invent Grant Scholar: 200 chosen from 100,000 applicants",
      "TreeHacks 2026: Healthcare AI Track Winner (Stanford)",
      "LA Hacks 2026: 1st Place",
    ],
    // Paste your real LinkedIn post links + a one-line summary each.
    linkedin: [
      { text: "Add a LinkedIn post highlight here, one line about it.", url: "https://www.linkedin.com/in/himavanth-karpurapu/" },
      { text: "…and another. These show inside the Highlights building.", url: "https://www.linkedin.com/in/himavanth-karpurapu/" },
    ],
  },

  // --- "Explain like I'm 5" text, read aloud inside each building -----------
  simple: {
    about: "I'm Himavanth. After a couple of years working as a software engineer, I came to the U.S. for my Master's at San José State University, hoping to get my foot in the door and really learn everything about AI. I leaned on that industry experience and threw myself into competitive hackathons, winning prizes at events like TreeHacks at Stanford and LA Hacks. Along the way I got deeply involved in the Bay Area startup scene, including SpartUp, my college's startup accelerator for Bay Area students, and I've built products like an AI tool to help people with ADHD stay focused. I love turning rough ideas into things people actually use.",
    "exp-0": "I'm a helper-scientist at my school. I study smart computer brains, called AI, to find out when they get an answer right but don't KNOW they're right, like guessing and not being sure. I even won a prize for explaining it!",
    "exp-1": "Before school I had a real job making apps for a company far away in India. I built the behind-the-scenes parts that keep apps fast and safe, using Amazon's giant cloud computers.",
    "proj-0": "Rewind is a team of 7 tiny robot-helpers inside your computer. They plan your day (calendar, emails, and to-dos) and you can even talk to them using smart glasses! It won a big prize at Stanford.",
    "proj-1": "Dispatch is a super-fast search box for everything on your computer (words, pictures, and code) and it all stays private on YOUR machine. It won 1st place at LA Hacks!",
    "proj-2": "NeuroBoost helps you get things done. You just talk, and it turns your voice into a to-do list and figures out what matters most. About a thousand people used it!",
    "proj-3": "I moved a whole app onto Amazon's giant cloud so it never runs out of room and fixes itself when it gets busy. It also tests itself before going live.",
    skills: "These are all the tools I know how to use, like a big toolbox! I can write in many computer languages and use lots of smart-computer and cloud tools.",
    awards: "This is my trophy shelf! I've won lots of coding contests and special scholarships. My favorite: Amazon picked me as one of just 200 people out of 100,000 who applied, for a special program at their biggest conference in North America.",
    articles: "This is where I share stories I write to teach people about computers and AI. New ones are coming soon!",
    highlights: "Here are my proud moments: cool things I posted online, big conferences I got to attend, and my most special awards.",
    contact: "Want to say hi or build something together? This is how you can reach me. My inbox is always open!",
  },
};
