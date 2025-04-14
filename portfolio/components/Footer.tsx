"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <motion.div
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Nitin Pandey
            </motion.div>
            <p className="text-slate-400 max-w-md">
              A passionate developer focused on creating beautiful, functional, and user-friendly applications with
              modern technologies.
            </p>

            <div className="flex gap-4 mt-6">
              <motion.a
                href="https://github.com/NItinTheGreat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/nitinkrpandey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://twitter.com/NItinTheGreat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-400">
                <MdEmail className="w-4 h-4 text-indigo-400" />
                <a href="mailto:nitinkrpandey@gmail.com" className="hover:text-indigo-400 transition-colors">
                  nitinkrpandey@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MdLocationOn className="w-4 h-4 text-indigo-400" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">&copy; {currentYear} Nitin Pandey. All rights reserved.</p>

          <div className="mt-4 md:mt-0">
            <ul className="flex gap-6">
              <li>
                <Link href="/privacy" className="text-slate-500 text-sm hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 text-sm hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
