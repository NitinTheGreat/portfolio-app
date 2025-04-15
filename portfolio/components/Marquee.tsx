"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaFigma, FaGithub } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiTensorflow,
  SiThreedotjs,
  SiVercel,
  SiAdobexd,
  SiJavascript,
  SiGraphql,
  SiRedis,
  SiPostgresql,
} from "react-icons/si"

const technologies = [
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
  { name: "Python", icon: FaPython, color: "text-blue-500" },
  { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
  { name: "Three.js", icon: SiThreedotjs, color: "text-white" },
  { name: "Docker", icon: FaDocker, color: "text-blue-400" },
  { name: "AWS", icon: FaAws, color: "text-yellow-500" },
  { name: "Vercel", icon: SiVercel, color: "text-white" },
  { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
  { name: "Figma", icon: FaFigma, color: "text-purple-400" },
  { name: "Adobe XD", icon: SiAdobexd, color: "text-pink-600" },
  { name: "GitHub", icon: FaGithub, color: "text-white" },
]

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2, margin: "-100px 0px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -1000])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 1000])

  const springX1 = useSpring(x1, { stiffness: 100, damping: 30 })
  const springX2 = useSpring(x2, { stiffness: 100, damping: 30 })

  return (
    <section ref={containerRef} className="py-20 overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Technologies I Work With
          </span>
        </motion.h2>
      </div>

      <div className="relative">
        {/* First row - moving left */}
        <motion.div className="flex gap-12 py-8" style={{ x: springX1 }}>
          {technologies.slice(0, 10).map((tech, index) => (
            <div key={`tech1-${index}`} className="flex flex-col items-center gap-2 min-w-[100px]">
              <tech.icon className={`w-12 h-12 ${tech.color}`} />
              <span className="text-sm text-slate-300">{tech.name}</span>
            </div>
          ))}
          {technologies.slice(0, 10).map((tech, index) => (
            <div key={`tech1-repeat-${index}`} className="flex flex-col items-center gap-2 min-w-[100px]">
              <tech.icon className={`w-12 h-12 ${tech.color}`} />
              <span className="text-sm text-slate-300">{tech.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Second row - moving right */}
        <motion.div className="flex gap-12 py-8" style={{ x: springX2 }}>
          {technologies.slice(10).map((tech, index) => (
            <div key={`tech2-${index}`} className="flex flex-col items-center gap-2 min-w-[100px]">
              <tech.icon className={`w-12 h-12 ${tech.color}`} />
              <span className="text-sm text-slate-300">{tech.name}</span>
            </div>
          ))}
          {technologies.slice(10).map((tech, index) => (
            <div key={`tech2-repeat-${index}`} className="flex flex-col items-center gap-2 min-w-[100px]">
              <tech.icon className={`w-12 h-12 ${tech.color}`} />
              <span className="text-sm text-slate-300">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
