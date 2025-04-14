"use client"

import { motion } from "framer-motion"
import type { Project } from "@/lib/types"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, PresentationControls } from "@react-three/drei"
import { useRef } from "react"
import { FaGithub } from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"

interface ProjectCardProps {
  project: Project
  isHighlighted?: boolean
  colorIndex?: number
}

function Card3D({ colorIndex = 0 }) {
  // Different colors for different cards
  const colors = [
    "#6366f1", // indigo
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#ec4899", // pink
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
  ]

  const color = colors[colorIndex % colors.length]

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh>
        <boxGeometry args={[2.5, 3.5, 0.2]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  )
}

export default function ProjectCard({ project, isHighlighted = false, colorIndex = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Different gradient backgrounds for different cards
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

  const gradient = isHighlighted
    ? premiumGradients[colorIndex % premiumGradients.length]
    : gradients[colorIndex % gradients.length]

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] rounded-2xl overflow-hidden group"
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.4, 0.4]}
            
          >
            <Card3D colorIndex={colorIndex} />
          </PresentationControls>
          <Environment preset="city" />
        </Canvas>
      </div>

      <div
        className={`absolute inset-0 z-10 p-6 flex flex-col justify-between bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all`}
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

        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-3">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="w-5 h-5" />
            </motion.a>

            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>

          {isHighlighted && (
            <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium">
              Featured
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
