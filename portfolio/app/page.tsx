"use client"

import { useEffect, useState, useRef } from "react"
import LoadingAnimation from "@/components/LoadingAnimation"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProjectsSection from "@/components/ProjectsSection"
import StickyProjectsSection from "@/components/StickyProjectsSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import MarqueeSection from "@/components/Marquee"
// import TestimonialSection from "@/components/TestimonialSection"
import StatsSection from "@/components/StatsSection"
import ThreeDExperienceSection from "@/components/3dExperienceSection"
import OtherProjectsSection from "@/components/OtherProjectsSection"
import SkillsSection from "@/components/SkillsSection"
export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Refs for scroll navigation
  const heroRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const stickyProjectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLElement>(null)

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
    <main>
      <Navbar heroRef={heroRef} projectsRef={projectsRef} aboutRef={aboutRef} contactRef={contactRef} skillsRef={skillsRef} />
      {/* <Navbar heroRef={heroRef} projectsRef={projectsRef} aboutRef={aboutRef} contactRef={contactRef} /> */}

      <HeroSection ref={heroRef} />
      <StickyProjectsSection ref={stickyProjectsRef} />
      {/* <StickyProjectsSection /> */}
      <MarqueeSection />
      <ProjectsSection ref={projectsRef} />
      <OtherProjectsSection />
      <ThreeDExperienceSection />
      {/* <TestimonialSection /> */}
      <AboutSection ref={aboutRef} />
      <SkillsSection ref={skillsRef} />
      <ContactSection ref={contactRef} />
      <Footer />
    </main>
  )
}
