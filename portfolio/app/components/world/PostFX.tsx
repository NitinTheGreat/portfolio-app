"use client"

import { useMemo } from "react"
import { Vector2 } from "three"
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing"
import { BlendFunction, KernelSize } from "postprocessing"
import { usePortfolio } from "@/store/portfolio"

export function PostFX({ bloomParam }: { bloomParam?: string }) {
  const tier = usePortfolio((state) => state.qualityTier)
  const enabled = bloomParam === "1" ? true : bloomParam === "0" ? false : tier === "high"
  const caOffset = useMemo(() => new Vector2(0.001, 0.001), [])
  if (!enabled) return null

  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.85}
        intensity={1.1}
        kernelSize={KernelSize.HUGE}
        mipmapBlur={false}
      />
      <ChromaticAberration offset={caOffset} radialModulation modulationOffset={0.45} />
      <Noise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.3} darkness={0.5} />
    </EffectComposer>
  )
}
