import { z } from "zod"

export const planetIdSchema = z.enum([
  "home",
  "aeza",
  "iivy",
  "donna",
  "drishti",
  "conjunction-triage",
  "landing",
])

export type PlanetId = z.infer<typeof planetIdSchema>

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const planetSchema = z.object({
  id: planetIdSchema,
  name: z.string(),
  caption: z.string().optional(),
  role: z.string().optional(),
  period: z.string().optional(),
  oneLiner: z.string(),
  metric: z.string(),
  chips: z.array(z.string()),
  environmentalLine: z.string(),
  summary: z.string(),
  accent: z.string(),
  palette: z.array(z.string()),
  links: z.array(linkSchema),
  worldPosition: z.tuple([z.number(), z.number(), z.number()]),
})

export type Planet = z.infer<typeof planetSchema>

export const constellationBodySchema = z.object({
  name: z.string(),
  summary: z.string(),
  tech: z.array(z.string()),
  href: z.string().optional(),
})

export type ConstellationBody = z.infer<typeof constellationBodySchema>

export const profile = {
  name: "Nitin Kumar Pandey",
  pitch: "Forward deployed engineer.",
  status: "Currently at Aeza. Previously LoadMinds (acquired), BuildSmartr.",
  closer: "Currently open to full-time offers, graduating 2027.",
  email: "nitinpandey1304@gmail.com",
  phone: "+91 8840089220",
  github: "https://github.com/NitinTheGreat",
  githubHandle: "NitinTheGreat",
  linkedin: "https://www.linkedin.com/in/nitinkumarpandey/",
  cv: "/cv/nitin-pandey-cv.pdf",
  education: "B.Tech Computer Science, VIT Vellore. CGPA 9.19. Graduating 2027.",
} as const

export const planets: Planet[] = [
  {
    id: "home",
    name: "Nitin Kumar Pandey",
    oneLiner: "Forward deployed engineer, executing AI engineering engagements at startup scale.",
    metric: "CGPA 9.19, VIT Vellore, graduating 2027",
    chips: ["FastAPI", "LangGraph", "RAG", "Voice AI", "R3F"],
    environmentalLine: "The sun rises over the shoulder of a small blue world.",
    summary:
      "Final year Computer Science student at VIT Vellore, currently an AI engineering intern at Aeza, with prior remote engagements at LoadMinds and BuildSmartr in Canada. I build production AI systems across domains: fashion, construction, logistics voice, crowd safety and space.",
    accent: "#E6A15E",
    palette: ["#F2C89A", "#B8724D", "#2B3A55"],
    links: [],
    worldPosition: [0, 0, 0],
  },
  {
    id: "aeza",
    name: "Aeza",
    caption: "Aeza",
    role: "AI Engineering Intern",
    period: "Current",
    oneLiner: "Teaching a machine what suits you.",
    metric: "In production",
    chips: ["FastAPI", "pgvector", "Redis", "LangChain", "RAG"],
    environmentalLine: "An ocean planet with something small in orbit, learning.",
    summary:
      "Building the backend for a personal AI fashion stylist at Aeza, an early-stage AI fashion assistant founded by VIT alumni. Vector search over garment catalogues, retrieval-augmented recommendations and taste-conditioned agent orchestration.",
    accent: "#D8829E",
    palette: ["#D8829E", "#F6EFE2", "#C9A05B"],
    links: [],
    worldPosition: [16, 4, -30],
  },
  {
    id: "iivy",
    name: "iivy",
    caption: "BuildSmartr Inc., Delta, BC",
    role: "AI Engineer",
    period: "Dec 2025 to Feb 2026",
    oneLiner: "An autonomous quote engine for construction.",
    metric: "10x the per-file ceiling. ~80% quote-time cut.",
    chips: ["LangGraph", "Pinecone", "Gemini", "FastAPI", "Multi-tenant RAG"],
    environmentalLine:
      "A gas giant banded in slate and cream. In orbit, a scaffold under quiet construction.",
    summary:
      "iivy is a stealth AI product for the construction industry. I built the agentic backend in LangGraph orchestrating web search, quotation generation and document parsing, a multi-tenant RAG pipeline on Pinecone with Gemini embeddings and Project Memory, and a map-reduce ingestion pipeline handling documents 10x the Gemini per-file ceiling. I was also the technical face to North American clients on demos, reducing manual quoting time by roughly 80%.",
    accent: "#5B7C99",
    palette: ["#5B7C99", "#B8A07A", "#7FD4E8"],
    links: [],
    worldPosition: [-14, -3, -58],
  },
  {
    id: "donna",
    name: "Donna",
    caption: "LoadMinds Inc., Burnaby, BC",
    role: "AI Engineer",
    period: "May to Oct 2025",
    oneLiner: "A voice on the line, in four languages, in under two seconds.",
    metric: "1.5s time-to-first-audio. Acquired by MG Transport, 2025.",
    chips: ["LangGraph", "LiveKit", "AssemblyAI", "Cartesia", "Gemini"],
    environmentalLine:
      "A world seen mostly by its lights. Somewhere down there, a voice is answering.",
    summary:
      "LoadMinds built Donna, an AI dispatcher for cross-border trucking that automates quoting, customs clearance, invoicing and email. I built the real-time multilingual voice pipeline across English, Hindi, Punjabi and Spanish using LiveKit, AssemblyAI, Cartesia and Gemini Flash via LangGraph, reaching roughly 1.5s time-to-first-audio (2.5s self-hosted), plus an Azure Functions email backend unifying Gmail and Outlook. My contract was extended from two to six months, and the company was acquired by MG Transport Ltd. in 2025 with my work cited as the primary acquisition asset.",
    accent: "#C25B4F",
    palette: ["#C25B4F", "#2B2545", "#E8A15E"],
    links: [],
    worldPosition: [20, 8, -88],
  },
  {
    id: "drishti",
    name: "Drishti",
    caption: "Published research",
    role: "First author",
    period: "Under review",
    oneLiner: "Watching crowds, so nobody watches after.",
    metric: "Submitted to ICSEIS 2026, NIT Warangal. Paper ID 316.",
    chips: ["LangGraph", "YOLOv8n", "GCV", "FastAPI", "Cloud Run"],
    environmentalLine:
      "An ice-world under watch. Its constellation of eyes reforms with each pass.",
    summary:
      "A physics-grounded crowd safety monitoring system built with LangGraph, YOLOv8n, Google Cloud Vision and FastAPI, deployed on Docker and Cloud Run. First-authored paper submitted to ICSEIS 2026 at NIT Warangal, Paper ID 316, targeting Springer/Scopus proceedings, currently under review.",
    accent: "#E58B3B",
    palette: ["#E58B3B", "#8A93A8", "#3A4560"],
    links: [],
    worldPosition: [-18, 1, -116],
  },
  {
    id: "conjunction-triage",
    name: "ConjunctionTriage",
    caption: "Agentic AI for space",
    role: "Academic project with Prof. Sudhakar T",
    period: "BCSE497J",
    oneLiner: "An agent that reads collision warnings before someone has to.",
    metric: "Live ISS telemetry. Trained on TraCSS.",
    chips: ["LangGraph", "Skyfield", "CelesTrak", "FastAPI"],
    environmentalLine: "The debris field drifts. Above it, the ISS keeps time.",
    summary:
      "An agentic AI framework for satellite conjunction risk assessment, pulling live ISS TLE data from the CelesTrak GP endpoint and training on the ESA Kelvins dataset, the TraCSS Verification Set and Space-Track CDMs. A longstanding space and physics interest turned into a working agent.",
    accent: "#3EA6B8",
    palette: ["#3EA6B8", "#0B0E14", "#C264A8"],
    links: [],
    worldPosition: [6, -6, -146],
  },
  {
    id: "landing",
    name: "Let's build something.",
    oneLiner: "Currently open to full-time offers, graduating 2027.",
    metric: "",
    chips: [],
    environmentalLine: "A small module at the edge of the map. Warm light, an open channel.",
    summary:
      "A small module at the end of the journey. Download the CV, send an email, or follow the code.",
    accent: "#E6A15E",
    palette: ["#F2C89A", "#4E7A5C", "#2B3A55"],
    links: [],
    worldPosition: [-2, 3, -172],
  },
]

export const planetById = Object.fromEntries(planets.map((p) => [p.id, p])) as Record<PlanetId, Planet>

export const journeyPlanets = planets.filter(
  (p) => p.id !== "home" && p.id !== "landing",
)

export const constellation: ConstellationBody[] = [
  {
    name: "DealHarbor",
    summary: "Campus marketplace with a 20-entity normalised schema and real-time updates.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Redis", "WebSocket"],
    href: "https://github.com/NitinTheGreat/deal-harbor",
  },
  {
    name: "HeatAgent",
    summary: "Agentic framework for urban heat island prediction. Targeting IEEE ISC2 2026.",
    tech: ["LangGraph", "FastAPI"],
  },
  {
    name: "SemStream",
    summary: "Content-aware, semantic, modality-adaptive streaming for lecture video.",
    tech: ["BITE314L"],
  },
  {
    name: "PlugFit",
    summary: "OpenAPI-to-MCP server generator with quality optimisation.",
    tech: ["MCP", "OpenAPI"],
  },
  {
    name: "Riviera '25",
    summary: "GDSC VIT fest site. 1.6M page views, zero downtime.",
    tech: ["Next.js", "SSR"],
    href: "https://riviera.vit.ac.in",
  },
  {
    name: "Gravitas '25",
    summary: "GDSC VIT fest platform. 3M+ real-time interactions at peak.",
    tech: ["Next.js", "WebSocket"],
  },
]
