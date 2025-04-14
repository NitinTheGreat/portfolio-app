"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/lib/types"
import { FaGithub } from "react-icons/fa"
import { FiExternalLink, FiX } from "react-icons/fi"

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    // Auto-advance slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [project.images.length])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX className="w-5 h-5" />
          </motion.button>

          <div className="relative h-64 md:h-80">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
              </motion.div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              {project.title}
            </h2>
            <p className="text-slate-300 mb-6">{project.description}</p>

            {project.features && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300">
                      <span className="text-indigo-400 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.timeline && (
              <div className="mb-6 text-slate-300">
                <span className="font-semibold text-white">Timeline:</span> {project.timeline}
              </div>
            )}

            <div className="flex gap-4">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="w-5 h-5" />
                GitHub
              </motion.a>

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
