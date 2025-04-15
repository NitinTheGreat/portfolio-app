"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/data"
import ProjectModal from "./ProjectModal"
import { FaGithub } from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"
import { useInView } from "framer-motion"

export default function StickyProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [sectionHeight, setSectionHeight] = useState(0)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Calculate the height based on the number of projects to ensure enough scroll space
  useEffect(() => {
    if (containerRef.current) {
      // Set the height to be enough for the horizontal scroll effect
      // This creates enough scrolling space for the animation to complete
      setSectionHeight(window.innerHeight * 2)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform the vertical scroll into horizontal movement
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1], // Input range (scroll progress)
    ["0%", "-50%", "-100%"], // Output range (horizontal translation)
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
      "from-slate-800/90 to-zinc-700/90", // Platinum-like
      "from-rose-800/90 to-pink-700/90", // Rose Gold-like
    ]

    return isHighlighted ? premiumGradients[index % premiumGradients.length] : gradients[index % gradients.length]
  }

  return (
    <section ref={containerRef} id="sticky-projects" style={{ height: `${sectionHeight}px` }} className="relative">
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
                Explore My Projects
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-slate-300 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Scroll horizontally to discover my work. Each project represents a unique challenge and solution.
            </motion.p>
          </div>

          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] h-[500px] md:h-[600px] flex-shrink-0"
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
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiExternalLink className="w-5 h-5" />
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
