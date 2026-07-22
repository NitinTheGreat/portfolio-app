"use client"

import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { usePortfolio } from "@/store/portfolio"

export function PostFX({ bloomParam }: { bloomParam?: string }) {
  const tier = usePortfolio((state) => state.qualityTier)
  const enabled = bloomParam === "1" ? true : bloomParam === "0" ? false : tier === "high"
  if (!enabled) return null

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.85} intensity={1.5} radius={1.2} mipmapBlur />
    </EffectComposer>
  )
}
