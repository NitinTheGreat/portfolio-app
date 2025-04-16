"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaDownload, FaArrowLeft } from "react-icons/fa"
import Link from "next/link"

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </motion.button>
          </Link>

          <motion.a
            href="/hero/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="w-4 h-4" />
            Download Resume
          </motion.a>
        </div>

        <motion.div
          className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading && (
            <div className="flex justify-center items-center h-[800px]">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <iframe
            src="/hero/resume.pdf"
            className="w-full h-[800px]"
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </motion.div>
      </div>
    </main>
  )
}
