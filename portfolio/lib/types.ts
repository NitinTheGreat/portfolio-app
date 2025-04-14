export interface Project {
    id: number
    title: string
    slug?: string
    shortDescription: string
    description: string
    features?: string[]
    challenges?: string
    timeline?: string
    technologies: string[]
    githubUrl: string
    liveUrl?: string
    images: string[]
    isHighlighted?: boolean
  }
  