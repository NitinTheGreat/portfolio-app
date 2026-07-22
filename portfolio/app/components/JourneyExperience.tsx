"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useQualityTier } from "@/hooks/useQualityTier"
import { usePortfolio } from "@/store/portfolio"
import { planets } from "@/lib/planets"
import { ScrollDriver } from "./world/ScrollDriver"
import { LoaderScene } from "./world/LoaderScene"
import { HudLayer } from "./hud/HudLayer"

const Scene = dynamic(() => import("./world/Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => <LoaderScene />,
})

function DebugReadout() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const loop = () => {
      const t = usePortfolio.getState().scrollProgress
      if (ref.current) ref.current.textContent = `t = ${t.toFixed(3)}`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed bottom-3 left-3 z-[60] rounded bg-black/40 px-2 py-1 font-mono text-xs text-white"
    />
  )
}

export function JourneyExperience({
  debug = false,
  bloomParam,
  camParam,
  tParam,
  modalParam,
  hoverParam,
}: {
  debug?: boolean
  bloomParam?: string
  camParam?: string
  tParam?: number
  modalParam?: string
  hoverParam?: string
}) {
  useQualityTier()

  useEffect(() => {
    if (modalParam === "cv" || modalParam === "contact") {
      usePortfolio.getState().openModal(modalParam)
    } else if (modalParam?.startsWith("project:")) {
      usePortfolio.getState().openModal("project", modalParam.slice("project:".length))
    }
  }, [modalParam])

  useEffect(() => {
    if (tParam === undefined) return
    const store = usePortfolio.getState()
    store.setScrollProgress(tParam)
    const id = planets[Math.round(tParam * (planets.length - 1))].id
    store.setPlanet(id)
  }, [tParam])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      usePortfolio.getState().setCursor({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <>
      <Scene
        debug={debug}
        bloomParam={bloomParam}
        camParam={camParam}
        tParam={tParam}
        hoverParam={hoverParam}
      />
      <HudLayer />
      {tParam === undefined ? <ScrollDriver /> : null}
      <div id="journey-scroll" aria-hidden className="pointer-events-none h-[700vh]" />
      {debug ? <DebugReadout /> : null}
    </>
  )
}
