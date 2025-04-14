"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { highlightedProjects } from "@/lib/data"
import type { Project } from "@/lib/types"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { FaArrowLeft, FaGithub } from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const foundProject = highlightedProjects.find((p) => p.slug === params.slug)
    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push("/")
    }
  }, [params.slug, router])

  if (!project) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute top-8 left-8 z-10">
        <motion.button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="w-4 h-4" />
          Back
        </motion.button>
      </div>

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <mesh>
                <torusKnotGeometry args={[3, 0.8, 256, 32, 2, 3]} />
                <meshStandardMaterial
                  color={project.id === 1 ? "#ff3d00" : project.id === 2 ? "#0071e3" : "#6d28d9"}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            </Float>
            <Environment preset="night" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {project.title}
            </span>
          </motion.h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-zinc-300 mb-6">{project.description}</p>

            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-zinc-300 mb-6 space-y-2">
              {project.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
            <p className="text-zinc-300 mb-6">{project.challenges}</p>
          </div>

          <div>
            <div className="bg-zinc-900 rounded-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>

              <div className="mb-4">
                <h4 className="text-sm text-zinc-400 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-zinc-800 text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm text-zinc-400 mb-2">Timeline</h4>
                <p className="text-zinc-300">{project.timeline}</p>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  View Source
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    <FiExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Project Gallery
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden aspect-video"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
