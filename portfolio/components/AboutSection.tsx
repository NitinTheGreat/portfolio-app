"use client"

import { forwardRef, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { FileText, Mail } from "lucide-react"
import RiveAnimation from "./RiveAnimation"
const skills = [
  { name: "React", color: "text-cyan-400" },
  { name: "Next.js", color: "text-white" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "JavaScript", color: "text-yellow-400" },
  { name: "Node.js", color: "text-green-400" },
  { name: "Tailwind CSS", color: "text-cyan-400" },
  { name: "MongoDB", color: "text-green-500" },
  { name: "MySQL", color: "text-blue-500" },
  { name: "Firebase", color: "text-yellow-500" },
  { name: "Python", color: "text-blue-500" },
  { name: "Java", color: "text-orange-500" },
  { name: "Golang", color: "text-blue-400" },
  { name: "Django", color: "text-green-600" },
  { name: "TensorFlow", color: "text-orange-500" },
  { name: "Three.js", color: "text-white" },
  { name: "Docker", color: "text-blue-400" },
  { name: "AWS", color: "text-yellow-500" },
  { name: "Azure", color: "text-blue-600" },
]

const AboutSection = forwardRef<HTMLElement>((props, ref) => {
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
    <section ref={ref} id="about" className="py-20 md:py-32 px-6 bg-gradient-to-br from-slate-950 to-indigo-950/50">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">About Me</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I'm a passionate developer with expertise in building modern web applications and exploring new
            technologies.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-indigo-500/20">
            <RiveAnimation animationSrc="/hero/loading.riv" />

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 bg-indigo-500" />
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 bg-cyan-500" />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              My Journey
            </h3>
            <p className="text-slate-300 mb-6">
              It started with QBasic when I started to hate Computer Science but all changed with Java and the introduction of programming paradigms. I fell in love with programming and started to explore the world of web development. I have worked on various projects, from small personal websites to large-scale applications, and I enjoy every step of the process.
            </p>
            <p className="text-slate-300 mb-6">
              I might not be the best developer, but I am always eager to learn and improve. I believe in the power of collaboration and open-source, and I love sharing my knowledge with others. I am currently exploring the world of AI and machine learning, and I am excited about the possibilities it brings to web development.
            </p>

            <div className="flex gap-4">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5" />
                Resume
              </motion.a>

              <motion.a
                href="mailto:nitinpandey1304@gmail.com"
                className="px-6 py-3 rounded-lg bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>

       
      </div>
    </section>
  )
})

AboutSection.displayName = "AboutSection"
export default AboutSection
