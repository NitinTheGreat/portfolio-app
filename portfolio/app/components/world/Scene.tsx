"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { AmbientClock } from "@/hooks/useAmbientClock"
import { Sky } from "./Sky"
import { Lighting } from "./Lighting"
import { CameraRig } from "./CameraRig"
import { HomePlanet } from "./planets/HomePlanet"

const SplineDebug = dynamic(() => import("./SplineDebug").then((m) => m.SplineDebug), {
  ssr: false,
})

export function Scene({ debug = false }: { debug?: boolean }) {
  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 1.5]}
      camera={{ fov: 50, near: 0.1, far: 1000, position: [2, 3, 14] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-label="Nitin Kumar Pandey's portfolio, a solar system you fly through"
    >
      <Suspense fallback={null}>
        <Sky />
        <Lighting />
        <HomePlanet />
        <CameraRig />
        <AmbientClock />
        {debug ? <SplineDebug /> : null}
      </Suspense>
    </Canvas>
  )
}
