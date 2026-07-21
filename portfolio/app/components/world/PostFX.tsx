"use client"

import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { usePortfolio } from "@/store/portfolio"

export function PostFX() {
  const tier = usePortfolio((state) => state.qualityTier)
  if (tier !== "high") return null

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.85} intensity={1.5} radius={0.7} mipmapBlur />
    </EffectComposer>
  )
}
