"use client"

import { useEffect } from "react"
import { usePortfolio } from "@/store/portfolio"

export function ScrollDriver() {
  useEffect(() => {
    let cancelled = false
    let cleanup = () => {}

    ;(async () => {
      const Lenis = (await import("lenis")).default
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 })
      lenis.on("scroll", ScrollTrigger.update)

      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      const setScrollProgress = usePortfolio.getState().setScrollProgress
      const trigger = ScrollTrigger.create({
        trigger: "#journey-scroll",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => setScrollProgress(self.progress),
      })

      ScrollTrigger.refresh()

      cleanup = () => {
        trigger.kill()
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return null
}
