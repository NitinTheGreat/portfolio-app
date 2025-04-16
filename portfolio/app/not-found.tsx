"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Rocket, Satellite, Star, Moon, Sun } from "lucide-react"

export default function Custom404() {
  const [text, setText] = useState("")
  const fullText = "Houston, we have a problem. The page you're looking for has floated away into space."
  const [showStars, setShowStars] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Set the full text immediately to avoid inconsistencies
    setText(fullText)
    setShowStars(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* Fixed starry background - no animation tied to mouse movement */}
      <div className="fixed inset-0 bg-black">
        <div className="fixed-stars"></div>
      </div>

      {/* Nebula effect */}
      <div className="nebula-1"></div>
      <div className="nebula-2"></div>

      {/* Main content with subtle parallax effect */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={{
          x: mousePosition.x * -10,
          y: mousePosition.y * -10,
        }}
      >
        <motion.div
          className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "easeInOut" }}
        >
          <span className="inline-block">4</span>
          <motion.span
            className="inline-block text-purple-500"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "linear" }}
          >
            0
          </motion.span>
          <span className="inline-block">4</span>
        </motion.div>

        <motion.div
          className="text-xl ml-12 mr-12 md:mr-0 md:ml-0  mt-6 max-w-md text-center font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {text}
        </motion.div>

        <Link href="/">
          <motion.button
            className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer rounded-full font-semibold flex items-center shadow-lg shadow-blue-500/20"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="mr-2" /> Return to Earth
          </motion.button>
        </Link>
      </motion.div>

      {/* Floating elements with parallax */}
      <motion.div
        className="absolute top-[15%] left-[15%]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 40, ease: "linear" }}
        style={{
          x: mousePosition.x * 15,
          y: mousePosition.y * 15,
        }}
      >
        <Satellite size={48} className="text-blue-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] right-[15%]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
        style={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
      >
        <Satellite size={64} className="text-purple-500" />
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute top-[30%] left-[20%]"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20 }}
        style={{
          x: mousePosition.x * 12,
          y: mousePosition.y * 12,
        }}
      >
        <div className="relative">
          <Moon size={80} className="text-gray-300" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-gray-900/50"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Sun */}
      <motion.div
        className="absolute bottom-[30%] right-[20%]"
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "easeInOut" }}
        style={{
          x: mousePosition.x * -8,
          y: mousePosition.y * -8,
        }}
      >
        <div className="relative">
          <Sun size={100} className="text-yellow-500" />
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          />
        </div>
      </motion.div>

      {/* Shooting star */}
      <motion.div
        className="absolute h-0.5 w-20 bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ x: "-100vw", y: "10vh", rotate: 15 }}
        animate={{ x: "100vw", y: "30vh" }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          repeatDelay: 7,
          ease: "easeOut",
        }}
      />

      {/* Individual twinkling stars - completely independent of mouse movement
      <AnimatePresence>
        {showStars && (
          <>
            {[...Array(30)].map((_, i) => {
              const top = `${Math.random() * 100}%`
              const left = `${Math.random() * 100}%`
              const size = 8 + Math.random() * 12

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 1, 0.5, 0.8, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  style={{
                    top,
                    left,
                    position: "fixed",
                  }}
                >
                  <Star size={size} className="text-white" fill="white" />
                </motion.div>
              )
            })}
          </>
        )}
      </AnimatePresence> */}

      {/* Floating astronaut */}
      <motion.div
        className="absolute w-16 h-16 bottom-[15%] left-[30%]"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
          x: [0, 30, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 12,
          ease: "easeInOut",
        }}
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-white"></div>
          <div className="absolute inset-1 rounded-full bg-gray-100"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 rounded-full bg-blue-400"></div>
          <div className="absolute bottom-0 left-1/2 w-6 h-8 -ml-3 bg-white rounded-full"></div>
        </div>
      </motion.div>

      {/* CSS for space effects - completely new approach for stars */}
      <style jsx>{`
        .fixed-stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 25% 25%, white, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 50% 50%, white, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 75% 75%, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 10% 10%, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 30% 30%, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 60% 60%, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 80% 80%, white, rgba(0, 0, 0, 0)),
            radial-gradient(3px 3px at 15% 15%, white, rgba(0, 0, 0, 0)),
            radial-gradient(3px 3px at 40% 40%, white, rgba(0, 0, 0, 0)),
            radial-gradient(3px 3px at 65% 65%, white, rgba(0, 0, 0, 0)),
            radial-gradient(3px 3px at 90% 90%, white, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 1000px 1000px;
          opacity: 0.5;
        }

        .nebula-1, .nebula-2 {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.15;
          z-index: 1;
        }

        .nebula-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(111, 78, 255, 0.8) 0%, rgba(33, 150, 243, 0) 70%);
          top: -10%;
          right: -10%;
          animation: nebula-float 20s ease-in-out infinite alternate;
        }

        .nebula-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 0, 255, 0.5) 0%, rgba(33, 150, 243, 0) 70%);
          bottom: -10%;
          left: -10%;
          animation: nebula-float 15s ease-in-out infinite alternate-reverse;
        }

        @keyframes nebula-float {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  )
}
