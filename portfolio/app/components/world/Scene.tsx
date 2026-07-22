"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { AmbientClock } from "@/hooks/useAmbientClock"
import { Sky } from "./Sky"
import { Lighting } from "./Lighting"
import { CameraRig } from "./CameraRig"
import { Sun } from "./Sun"
import { HeroForeground } from "./HeroForeground"
import { AezaPlanet } from "./planets/AezaPlanet"
import { IivyPlanet } from "./planets/IivyPlanet"
import { Constellation } from "./planets/Constellation"
import { LandingModule } from "./planets/LandingModule"
import { PostFX } from "./PostFX"

const SplineDebug = dynamic(() => import("./SplineDebug").then((m) => m.SplineDebug), {
  ssr: false,
})

export function Scene({
  debug = false,
  bloomParam,
  camParam,
  tParam,
  hoverParam,
}: {
  debug?: boolean
  bloomParam?: string
  camParam?: string
  tParam?: number
  hoverParam?: string
}) {
  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 1.5]}
      camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0.5, 3] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.debug.checkShaderErrors = true
      }}
      aria-label="Nitin Kumar Pandey's portfolio, a solar system you fly through"
    >
      <color attach="background" args={["#04070E"]} />
      <Suspense fallback={null}>
        <Sky />
        <Lighting />
        <Sun />
        <HeroForeground />
        <AezaPlanet />
        <IivyPlanet />
        <Constellation forcedHover={hoverParam} />
        <LandingModule />
        <CameraRig camTarget={camParam} tOverride={tParam} />
        <AmbientClock />
        {debug ? <SplineDebug /> : null}
      </Suspense>
      <PostFX bloomParam={bloomParam} />
    </Canvas>
  )
}
