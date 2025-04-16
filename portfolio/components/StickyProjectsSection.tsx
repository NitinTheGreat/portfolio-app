"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { projects } from "@/lib/data"
import ProjectModal from "./ProjectModal"
import { Github, ExternalLink } from "lucide-react"

export default function StickyProjectsSection({ ref }: {ref: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [sectionHeight, setSectionHeight] = useState(0)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [isMobile, setIsMobile] = useState(false)

  // Filter highlighted projects
  const highlightedProjects = projects.filter((p) => p.isHighlighted)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate the height based on the number of projects to ensure enough scroll space
  useEffect(() => {
    if (containerRef.current) {
      // For mobile, we need more height to ensure all projects are visible
      const height = isMobile
        ? window.innerHeight * 3 // More scroll space on mobile
        : window.innerHeight * 2 // Less scroll space needed on desktop

      setSectionHeight(height)
    }
  }, [isMobile])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform the vertical scroll into horizontal movement
  // Adjust the output range based on the number of projects and screen size
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1], // Input range (scroll progress)
    isMobile
      ? ["0%", "-100%", "-200%"] // More movement on mobile
      : ["0%", "-50%", "-100%"], // Less movement needed on desktop
  )

  // Generate different gradient colors for each project
  const getGradient = (index: number, isHighlighted = false) => {
    const gradients = [
      "from-indigo-900/80 to-cyan-900/80", // Indigo to Cyan
      "from-purple-900/80 to-pink-900/80", // Purple to Pink
      "from-cyan-900/80 to-emerald-900/80", // Cyan to Emerald
      "from-amber-900/80 to-red-900/80", // Amber to Red
      "from-emerald-900/80 to-teal-900/80", // Emerald to Teal
      "from-rose-900/80 to-orange-900/80", // Rose to Orange
      "from-blue-900/80 to-indigo-900/80", // Blue to Indigo
    ]

    // Premium gradients for highlighted projects
    const premiumGradients = [
      "from-amber-800/90 to-yellow-700/90", // Gold-like
      "from-slate-800/90 to-zinc-700/90", // Platinum-like\
      "from-rose-800  // Gold-like",
      "from-slate-800/90 to-zinc-700/90", // Platinum-like
      "from-rose-800/90 to-pink-700/90", // Rose Gold-like
    ]

    return isHighlighted ? premiumGradients[index % premiumGradients.length] : gradients[index % gradients.length]
  }

  return (
    <section ref={containerRef} id="projects" style={{ height: `${sectionHeight}px` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={sectionRef}
          className="flex flex-nowrap gap-8 px-4 md:px-12 w-fit"
          style={{ x }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-w-[300px] md:min-w-[500px] flex flex-col justify-center pr-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Featured Projects
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-slate-300 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Scroll horizontally to discover my best work. Each project represents a unique challenge and solution.
            </motion.p>
          </div>

          {highlightedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] h-[500px] md:h-[600px] flex-shrink-0 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{
                y: -20,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onClick={() => setSelectedProject(project.id)}
            >
              <div
                className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br ${getGradient(
                  index,
                  project.isHighlighted,
                )} backdrop-blur-sm border border-white/10 cursor-pointer shadow-lg hover:shadow-xl transition-all`}
                style={{
                  backgroundImage: project.id === 2 ? "url(/placeholder.svg?height=600&width=400)" : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay",
                }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-300">{project.shortDescription}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-black/30 text-slate-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 text-sm rounded-full bg-black/30 text-slate-300">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {project.isHighlighted && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectModal
            project={projects.find((p) => p.id === selectedProject)!}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
