"use client"

import { forwardRef, useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PerspectiveCamera, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import dynamic from "next/dynamic"

// Dynamically import the Rive component to avoid SSR issues
const RiveAnimation = dynamic(() => import("./RiveAnimation"), { ssr: false })

// Animated planet component
function Planet({
  position,
  color,
  size,
  speed,
  distort,
  orbitRadius = 0,
  orbitSpeed = 0.1,
}: {
  position: [number, number, number]
  color: string
  size: number
  speed: number
  distort: number
  orbitRadius?: number
  orbitSpeed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += speed * 0.01

      // If this planet orbits (orbitRadius > 0)
      if (orbitRadius > 0 && groupRef.current) {
        const angle = clock.getElapsedTime() * orbitSpeed
        groupRef.current.position.x = Math.cos(angle) * orbitRadius
        groupRef.current.position.z = Math.sin(angle) * orbitRadius
      }
    }
  })

  if (orbitRadius > 0) {
    return (
      <group position={position}>
        <group ref={groupRef}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[size, 64, 64]} />
            <MeshDistortMaterial color={color} speed={2} distort={distort} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>
    )
  }

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshDistortMaterial color={color} speed={2} distort={distort} roughness={0.2} metalness={0.8} />
    </mesh>
  )
}

// Animated ring component
function PlanetRing({
  position,
  color,
  innerRadius,
  outerRadius,
  rotationSpeed,
}: {
  position: [number, number, number]
  color: string
  innerRadius: number
  outerRadius: number
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 // Make it flat
      meshRef.current.rotation.z += rotationSpeed * 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>
  )
}

// Animated particles component
function StarField() {
  const count = 2000
  const positions = useRef<Float32Array>(new Float32Array(count * 3))
  const sizes = useRef<Float32Array>(new Float32Array(count))
  const pointsRef = useRef<THREE.Points>(null)

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions.current[i3] = (Math.random() - 0.5) * 50
      positions.current[i3 + 1] = (Math.random() - 0.5) * 50
      positions.current[i3 + 2] = (Math.random() - 0.5) * 50
      sizes.current[i] = Math.random() * 0.1 + 0.01
    }
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
          needsUpdate={true}
          args={[positions.current, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes.current}
          itemSize={1}
          needsUpdate={true}
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation={true} color="#ffffff" transparent opacity={0.6} depthWrite={false} />
    </points>
  )
}

// Main 3D scene component
function SolarSystem() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Smooth parallax effect based on mouse position
      groupRef.current.rotation.y += (mousePosition.x * 0.05 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (mousePosition.y * 0.05 - groupRef.current.rotation.x) * 0.05
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />

      <group ref={groupRef}>
        {/* Sun (center) */}
        <Planet position={[0, 0, 0]} color="#f59e0b" size={1.5} speed={0.1} distort={0.1} />

        {/* Mercury */}
        <Planet
          position={[0, 0, 0]}
          color="#94a3b8"
          size={0.2}
          speed={0.5}
          distort={0.2}
          orbitRadius={3}
          orbitSpeed={0.5}
        />

        {/* Venus */}
        <Planet
          position={[0, 0, 0]}
          color="#d97706"
          size={0.3}
          speed={0.4}
          distort={0.1}
          orbitRadius={4.5}
          orbitSpeed={0.35}
        />

        {/* Earth */}
        <Planet
          position={[0, 0, 0]}
          color="#3b82f6"
          size={0.4}
          speed={0.3}
          distort={0.1}
          orbitRadius={6}
          orbitSpeed={0.25}
        />

        {/* Mars */}
        <Planet
          position={[0, 0, 0]}
          color="#ef4444"
          size={0.35}
          speed={0.25}
          distort={0.15}
          orbitRadius={7.5}
          orbitSpeed={0.2}
        />

        {/* Jupiter with ring */}
        <Planet
          position={[0, 0, 0]}
          color="#eab308"
          size={0.8}
          speed={0.15}
          distort={0.2}
          orbitRadius={10}
          orbitSpeed={0.1}
        />
        <PlanetRing position={[0, 0, 0]} color="#eab308" innerRadius={0.9} outerRadius={1.2} rotationSpeed={0.1} />

        {/* Saturn with prominent ring */}
        <Planet
          position={[0, 0, 0]}
          color="#f97316"
          size={0.7}
          speed={0.1}
          distort={0.15}
          orbitRadius={13}
          orbitSpeed={0.08}
        />
        <PlanetRing position={[13, 0, 0]} color="#f97316" innerRadius={1} outerRadius={2} rotationSpeed={0.05} />
      </group>

      <StarField />

      <Environment preset="night" />
    </>
  )
}

// Animated background gradient component
function AnimatedBackgroundGradient() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-indigo-900/30 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-purple-900/30 to-transparent opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-cyan-900/20 to-transparent opacity-40" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pink-900/20 to-transparent opacity-30 animate-pulse-slow" />
    </div>
  )
}

// Glowing orbs component
function GlowingOrbs() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow animation-delay-1000" />
    </>
  )
}

// Main hero section component
const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="h-screen relative flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <AnimatedBackgroundGradient />

      {/* 3D Background */}
      <div className="absolute inset-0 z-10">
        <Canvas>
          <SolarSystem />
        </Canvas>
      </div>

      {/* Glowing orbs */}
      <GlowingOrbs />

      {/* Rive animation container - bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 z-20 opacity-70 hidden md:block">
        <RiveAnimation animationSrc="/animations/tech-orbit.riv" />
      </div>

      {/* Content overlay */}
      <div className="z-30 text-center px-4 relative">
        {/* Animated badge */}
        <motion.div
          className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-indigo-300 text-sm font-medium">Full Stack Developer & UI/UX Designer</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            Nitin Pandey
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full"></div>
        </motion.h1>

        <motion.p
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I craft digital experiences that blend creativity with cutting-edge technology.
          <span className="hidden sm:inline"> Building innovative solutions that make a difference.</span>
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-slate-300 border border-indigo-500/30 backdrop-blur-sm">
            React & Next.js
          </span>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-slate-300 border border-purple-500/30 backdrop-blur-sm">
            TypeScript
          </span>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-slate-300 border border-cyan-500/30 backdrop-blur-sm">
            Node.js
          </span>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-900/50 to-green-900/50 text-slate-300 border border-emerald-500/30 backdrop-blur-sm">
            Machine Learning
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
            <ArrowDown className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="/resume"
            className="px-8 py-3 rounded-full bg-slate-800/80 backdrop-blur-sm text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-20" />

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-slate-400 flex items-start justify-center p-1"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="w-1 h-2 bg-slate-400 rounded-full"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
})

HeroSection.displayName = "HeroSection"
export default HeroSection
