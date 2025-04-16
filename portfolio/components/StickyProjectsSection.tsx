"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { projects } from "@/lib/data"
import ProjectModal from "./ProjectModal"
import { Github, ExternalLink } from "lucide-react"

export default function StickyProjectsSection({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
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

  // Generate premium gradient colors for each project
  const getGradient = (index: number, isHighlighted = false) => {
    // Rich, premium gradients for all cards
    const premiumGradients = [
      { from: "#312e81", to: "#5b21b6" }, // Deep indigo to violet
      { from: "#065f46", to: "#115e59" }, // Rich emerald to teal
      { from: "#881337", to: "#9d174d" }, // Deep rose to pink
      { from: "#78350f", to: "#9a3412" }, // Rich amber to orange
      { from: "#164e63", to: "#1e40af" }, // Deep cyan to blue
      { from: "#581c87", to: "#86198f" }, // Rich purple to fuchsia
      { from: "#0f172a", to: "#27272a" }, // Elegant slate to zinc
    ]

    // Extra premium gradients for highlighted projects
    const highlightedGradients = [
      { from: "#92400e", to: "#ca8a04" }, // Luxurious gold
      { from: "#1e293b", to: "#4b5563" }, // Premium platinum
      { from: "#9d174d", to: "#db2777" }, // Elegant rose gold
      { from: "#065f46", to: "#16a34a" }, // Rich emerald
      { from: "#1e40af", to: "#4f46e5" }, // Royal blue
    ]

    return isHighlighted
      ? highlightedGradients[index % highlightedGradients.length]
      : premiumGradients[index % premiumGradients.length]
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

          {highlightedProjects.map((project, index) => {
            const gradient = getGradient(index, project.isHighlighted)
            return (
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
                  className="w-full h-full rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm border border-white/10 cursor-pointer shadow-lg hover:shadow-xl transition-all text-white"
                  style={{
                    background: project.isHighlighted
                      ? `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to}), url(/placeholder.svg?height=600&width=400)`
                      : `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
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
            )
          })}
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
