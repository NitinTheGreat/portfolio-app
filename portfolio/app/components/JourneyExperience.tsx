"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useQualityTier } from "@/hooks/useQualityTier"
import { usePortfolio } from "@/store/portfolio"
import { ScrollDriver } from "./world/ScrollDriver"
import { LoaderScene } from "./world/LoaderScene"

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
  forceBloom = false,
}: {
  debug?: boolean
  forceBloom?: boolean
}) {
  useQualityTier()

  return (
    <>
      <Scene debug={debug} forceBloom={forceBloom} />
      <ScrollDriver />
      <div id="journey-scroll" aria-hidden className="pointer-events-none h-[700vh]" />
      {debug ? <DebugReadout /> : null}
    </>
  )
}
