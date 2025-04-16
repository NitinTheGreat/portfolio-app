"use client"

import { forwardRef, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws, FaJava, FaGithub } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiTensorflow,
  SiThreedotjs,
  SiVercel,
//   SiAzure,
//   SiGolang,
  SiDjango,
  SiGraphql,
  SiRedis,
  SiPostgresql,
} from "react-icons/si"

const skills = [
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
  { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
  { name: "Python", icon: FaPython, color: "text-blue-500" },
  { name: "Java", icon: FaJava, color: "text-orange-500" },
//   { name: "Golang", icon: SiGolang, color: "text-blue-400" },
  { name: "Django", icon: SiDjango, color: "text-green-600" },
  { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
  { name: "Three.js", icon: SiThreedotjs, color: "text-white" },
  { name: "Docker", icon: FaDocker, color: "text-blue-400" },
  { name: "AWS", icon: FaAws, color: "text-yellow-500" },
//   { name: "Azure", icon: SiAzure, color: "text-blue-600" },
  { name: "Vercel", icon: SiVercel, color: "text-white" },
  { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
  { name: "GitHub", icon: FaGithub, color: "text-white" },
]

const SkillsSection = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section ref={ref} id="skills" className="py-20 md:py-32 px-6 bg-gradient-to-br from-slate-950 to-indigo-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={containerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Skills & Technologies
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A comprehensive collection of technologies and tools I work with
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all"
            >
              <div className={`text-4xl mb-3 ${skill.color}`}>
                <skill.icon />
              </div>
              <span className="text-sm font-medium text-slate-300 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

SkillsSection.displayName = "SkillsSection"
export default SkillsSection
