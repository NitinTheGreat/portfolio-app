"use client"

import { forwardRef, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws } from "react-icons/fa"
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiFirebase, SiTensorflow, SiThreedotjs } from "react-icons/si"
import { HiDocument } from "react-icons/hi"
import { MdEmail } from "react-icons/md"

const skills = [
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
  { name: "Python", icon: FaPython, color: "text-blue-500" },
  { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
  { name: "Three.js", icon: SiThreedotjs, color: "text-white" },
  { name: "Docker", icon: FaDocker, color: "text-blue-400" },
  { name: "AWS", icon: FaAws, color: "text-yellow-500" },
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
              <Image src="/placeholder.svg?height=400&width=400" alt="Nitin Pandey" fill className="object-cover" />

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
              I'm a full-stack developer with a passion for creating beautiful, functional, and user-friendly
              applications. With over 5 years of experience in web development, I've worked on a variety of projects
              ranging from e-commerce platforms to AI-powered applications.
            </p>
            <p className="text-slate-300 mb-6">
              My approach combines technical expertise with creative problem-solving to deliver solutions that not only
              meet but exceed expectations. I'm constantly learning and exploring new technologies to stay at the
              forefront of the industry.
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
                <HiDocument className="w-5 h-5" />
                Resume
              </motion.a>

              <motion.a
                href="mailto:nitinkrpandey@gmail.com"
                className="px-6 py-3 rounded-lg bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdEmail className="w-5 h-5" />
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.h3
          className="text-3xl font-bold mt-24 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Skills & Technologies
          </span>
        </motion.h3>

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
              className="flex flex-col items-center p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all"
            >
              <div className={`text-3xl mb-2 ${skill.color}`}>
                <skill.icon className="w-10 h-10" />
              </div>
              <span className="text-sm font-medium text-slate-300">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

AboutSection.displayName = "AboutSection"
export default AboutSection
