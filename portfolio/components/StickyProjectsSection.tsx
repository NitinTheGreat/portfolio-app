"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { projects } from "@/lib/data"
import ProjectModal from "./ProjectModal"
import { FaGithub } from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"

export default function StickyProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Use spring for smoother animation
  const springX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.7, 1],
      [0, -projects.length * 100, -projects.length * 300, -projects.length * 400],
    ),
    { stiffness: 100, damping: 30 },
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
    <section ref={containerRef} id="projects" className="h-[250vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-8 pl-[100vw]" style={{ x: springX }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="w-[400px] h-[600px] flex-shrink-0"
              whileHover={{
                y: -20,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onClick={() => setSelectedProject(index)}
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
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-black/30 text-slate-300">
                      {tech}
                    </span>
                  ))}
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

      {selectedProject !== null && (
        <ProjectModal project={projects[selectedProject]} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
