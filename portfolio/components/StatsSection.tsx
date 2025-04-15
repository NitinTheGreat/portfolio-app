"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaCode, FaLaptopCode, FaUsers, FaCoffee } from "react-icons/fa"

const stats = [
  {
    id: 1,
    value: "50+",
    label: "Projects Completed",
    icon: FaLaptopCode,
    color: "text-indigo-400",
  },
  {
    id: 2,
    value: "500K+",
    label: "Lines of Code",
    icon: FaCode,
    color: "text-cyan-400",
  },
  {
    id: 3,
    value: "30+",
    label: "Happy Clients",
    icon: FaUsers,
    color: "text-purple-400",
  },
  {
    id: 4,
    value: "1000+",
    label: "Cups of Coffee",
    icon: FaCoffee,
    color: "text-amber-400",
  },
]

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col items-center text-center"
            >
              <div className={`p-4 rounded-full bg-slate-800 ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
