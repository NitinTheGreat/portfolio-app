"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { projects } from "@/lib/data"
import ProjectModal from "./ProjectModal"
import { Github, ExternalLink } from "lucide-react"

export default function OtherProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [sectionHeight, setSectionHeight] = useState(0)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 })
  const [isMobile, setIsMobile] = useState(false)

  // Filter non-highlighted projects
  const otherProjects = projects.filter((p) => !p.isHighlighted)

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
      // Adjust height based on number of projects and screen size
      const projectCount = otherProjects.length
      const baseHeight = window.innerHeight

      // More projects need more scroll space
      const multiplier = isMobile
        ? Math.max(2, projectCount / 2) // More scroll space on mobile
        : Math.max(1.5, projectCount / 3) // Less scroll space needed on desktop

      setSectionHeight(baseHeight * multiplier)
    }
  }, [otherProjects.length, isMobile])

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
  const getGradient = (index: number) => {
    const gradients = [
      "from-purple-900/80 to-pink-900/80", // Purple to Pink
      "from-cyan-900/80 to-emerald-900/80", // Cyan to Emerald
      "from-amber-900/80 to-red-900/80", // Amber to Red
      "from-emerald-900/80 to-teal-900/80", // Emerald to Teal
      "from-rose-900/80 to-orange-900/80", // Rose to Orange
      "from-blue-900/80 to-indigo-900/80", // Blue to Indigo
      "from-indigo-900/80 to-cyan-900/80", // Indigo to Cyan
    ]

    return gradients[index % gradients.length]
  }

  return (
    <section ref={containerRef} id="other-projects" style={{ height: `${sectionHeight}px` }} className="relative mt-40">
      <motion.div
        ref={titleRef}
        className="text-center mb-16 sticky top-[15vh] z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Other Projects
          </span>
        </h2>
        <p className="text-slate-300 mt-2 max-w-2xl mx-auto">
          Explore more of my work across various technologies and domains
        </p>
      </motion.div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-32">
        <motion.div
          className="flex flex-nowrap gap-8 px-4 md:px-12 w-fit"
          style={{ x }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-w-[300px] md:min-w-[400px] flex flex-col justify-center pr-8">
            <motion.div
              className="h-[400px] rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 flex items-center justify-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="text-center">
                <span className="text-6xl mb-4 block">🚀</span>
                <p className="text-lg text-slate-300">Swipe to explore more of my projects and experiments</p>
              </div>
            </motion.div>
          </div>

          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] h-[400px] md:h-[500px] flex-shrink-0 cursor-pointer"
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
                className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br ${getGradient(index)} backdrop-blur-sm border border-white/10 cursor-pointer shadow-lg hover:shadow-xl transition-all`}
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
