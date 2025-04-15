"use client"

import type React from "react"

import { forwardRef, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"
import { Loader2 } from 'lucide-react'

const ContactSection = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // Increase the amount and margin to ensure the animation stays visible longer
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.1,  // Reduced from 0.2 to 0.1 to trigger earlier
    margin: "200px 0px" // Increased margin to keep it visible longer
  })
  
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const formData = new FormData(e.currentTarget)

      // For development, simulate a successful submission
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => {
          setFormStatus({
            type: "success",
            message: "Message sent successfully! (Development mode)",
          })
          e.currentTarget.reset()
          setIsSubmitting(false)
        }, 1000)
        return
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: data.message || "Message sent successfully! I'll get back to you soon.",
        })
        // Reset form
        e.currentTarget.reset()
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 px-6">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Get In Touch
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="bg-gradient-to-br from-slate-900 to-indigo-950/50 p-8 rounded-2xl border border-slate-800"
          >
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-400">
                  <MdEmail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Email</h4>
                  <a
                    href="mailto:nitinkrpandey@gmail.com"
                    className="text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    nitinkrpandey@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-400">
                  <MdLocationOn className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Location</h4>
                  <p className="text-slate-300">Bangalore, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-400">
                  <FaLinkedin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">LinkedIn</h4>
                  <a
                    href="https://linkedin.com/in/nitinkrpandey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    linkedin.com/in/nitinkrpandey
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/NItinTheGreat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/nitinkrpandey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://twitter.com/NItinTheGreat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter className="w-5 h-5" />
                </motion.a>
              </div>
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
            className="bg-gradient-to-br from-slate-900 to-indigo-950/50 p-8 rounded-2xl border border-slate-800"
          >
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Send Me a Message
            </h3>

            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-white cursor-text"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-white cursor-text"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-white cursor-text"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-white resize-none cursor-text"
                  placeholder="Your message"
                />
              </div>

              {formStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    formStatus.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

ContactSection.displayName = "ContactSection"
export default ContactSection
