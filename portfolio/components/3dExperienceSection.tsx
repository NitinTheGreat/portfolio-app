"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

// Simplified version without 3D models that were causing errors
const expertiseAreas = [
  {
    id: 1,
    name: "Web Development",
    description: "Building responsive and interactive web applications with modern frameworks and technologies.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: 2,
    name: "Mobile Development",
    description: "Creating cross-platform mobile applications with React Native and native technologies.",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
  },
  {
    id: 3,
    name: "Machine Learning",
    description: "Implementing intelligent systems using machine learning algorithms and neural networks.",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP"],
  },
]

export default function ExpertiseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2, margin: "-100px 0px" })
  const [activeArea, setActiveArea] = useState(0)

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 bg-gradient-to-br from-slate-950 to-indigo-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
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
              My Expertise Areas
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore my areas of expertise and technical skills
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="h-[400px] md:h-[500px] bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-5xl">{expertiseAreas[activeArea].name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                {expertiseAreas[activeArea].name}
              </h3>
              <p className="text-slate-300 mb-6">{expertiseAreas[activeArea].description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {expertiseAreas[activeArea].skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Technical Expertise
            </h3>
            <p className="text-slate-300 mb-8">
              As a Computer Science and Engineering student at Vellore Institute of Technology, I've developed strong
              skills across multiple domains. Select an area to learn more about my capabilities and experience.
            </p>

            <div className="space-y-4">
              {expertiseAreas.map((area, index) => (
                <motion.button
                  key={area.id}
                  className={`w-full p-4 rounded-lg text-left transition-all cursor-pointer ${
                    activeArea === index
                      ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/50"
                      : "bg-slate-800/50 border border-slate-700 hover:border-slate-600"
                  }`}
                  onClick={() => setActiveArea(index)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-medium text-white">{area.name}</h4>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
