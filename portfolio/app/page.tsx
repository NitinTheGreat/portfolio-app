"use client"

import { useEffect, useState, useRef } from "react"
import LoadingAnimation from "@/components/LoadingAnimation"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProjectsSection from "@/components/ProjectsSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Refs for scroll navigation
  const heroRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <Navbar heroRef={heroRef} projectsRef={projectsRef} aboutRef={aboutRef} contactRef={contactRef} />

      <HeroSection ref={heroRef} />
      <ProjectsSection ref={projectsRef} />
      <AboutSection ref={aboutRef} />
      <ContactSection ref={contactRef} />
      <Footer />
    </main>
  )
}
