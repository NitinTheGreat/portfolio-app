import type { Project } from "./types"

export const projects: Project[] = [
  {
    id: 1,
    title: "DealHarbor",
    slug: "deal-harbor",
    shortDescription: "E-commerce platform with real-time deals and personalized recommendations",
    description:
      "DealHarbor is a comprehensive e-commerce platform that focuses on providing users with real-time deals and personalized product recommendations. The platform integrates with multiple payment gateways and features an advanced search system with filters.",
    features: [
      "Real-time deal tracking and notifications",
      "Personalized product recommendations using ML algorithms",
      "Advanced search with multiple filtering options",
      "Secure checkout with multiple payment options",
      "Responsive design for all devices",
    ],
    challenges:
      "One of the main challenges was implementing the real-time deal tracking system that could handle thousands of concurrent users without performance degradation. I solved this by implementing a WebSocket-based architecture with Redis for caching and pub/sub messaging.",
    timeline: "4 months (Jan 2023 - Apr 2023)",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Redis", "WebSockets"],
    githubUrl: "https://github.com/NItinTheGreat/deal-harbor",
    liveUrl: "https://deal-harbor.vercel.app",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isHighlighted: true,
  },
  {
    id: 2,
    title: "Riviera'25 Website",
    slug: "riviera-25",
    shortDescription: "Official website for Riviera'25, a cultural and technical festival",
    description:
      "Designed and developed the official website for Riviera'25, a major cultural and technical festival. The website features event registration, schedule management, and real-time updates for attendees.",
    features: [
      "Online event registration and ticket booking",
      "Interactive schedule with filtering options",
      "Real-time updates and announcements",
      "User authentication and profile management",
      "Admin dashboard for event management",
    ],
    challenges:
      "The main challenge was handling peak traffic during the event registration period. I implemented a queue-based registration system with Cloudflare caching to ensure the website remained responsive even during high traffic periods.",
    timeline: "3 months (Sep 2022 - Nov 2022)",
    technologies: ["React", "Next.js", "Firebase", "Framer Motion", "Tailwind CSS", "Cloudflare"],
    githubUrl: "https://github.com/NItinTheGreat/riviera-25",
    liveUrl: "https://riviera25.vercel.app",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isHighlighted: true,
  },
  {
    id: 3,
    title: "StreetGuardian",
    slug: "street-guardian",
    shortDescription: "AI-powered road safety monitoring system with real-time alerts",
    description:
      "StreetGuardian is an AI-powered road safety monitoring system that uses computer vision to detect traffic violations, accidents, and hazardous conditions in real-time. The system sends alerts to relevant authorities and provides a dashboard for monitoring.",
    features: [
      "Real-time video analysis using computer vision",
      "Automatic detection of traffic violations and accidents",
      "Alert system for emergency services",
      "Historical data analysis and reporting",
      "Mobile app for on-the-go monitoring",
    ],
    challenges:
      "The biggest challenge was optimizing the computer vision algorithms to run efficiently on edge devices with limited computing power. I implemented model quantization and used TensorFlow Lite to ensure the system could run on various hardware configurations.",
    timeline: "6 months (May 2022 - Oct 2022)",
    technologies: ["Python", "TensorFlow", "OpenCV", "React", "Node.js", "MongoDB", "WebRTC"],
    githubUrl: "https://github.com/NItinTheGreat/street-guardian",
    liveUrl: "https://street-guardian.vercel.app",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isHighlighted: true,
  },
  {
    id: 4,
    title: "CodeCollab",
    shortDescription: "Real-time collaborative code editor with video chat",
    description:
      "A real-time collaborative code editor that allows multiple developers to work on the same codebase simultaneously. Features syntax highlighting, video chat, and instant deployment.",
    technologies: ["React", "Node.js", "WebSockets", "CodeMirror"],
    githubUrl: "https://github.com/NItinTheGreat/codecollab",
    liveUrl: "https://codecollab.example.com",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 5,
    title: "AI Image Upscaler",
    shortDescription: "Web app to upscale and enhance low-resolution images using AI.",
    description:
      "An AI-powered image upscaling tool that uses deep learning to increase the resolution of images while preserving detail and quality.",
    technologies: ["Python", "TensorFlow", "Flask", "JavaScript"],
    githubUrl: "https://github.com/NItinTheGreat/ai-image-upscaler",
    liveUrl: "https://ai-upscaler.example.com",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 6,
    title: "Personal Finance Tracker",
    shortDescription: "A tool to track income, expenses, and investments.",
    description:
      "A personal finance management application that helps users track their income, expenses, and investments, providing insights into their financial health.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/NItinTheGreat/finance-tracker",
    liveUrl: "https://finance-tracker.example.com",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
]

export const highlightedProjects = projects.filter((p) => p.isHighlighted)
