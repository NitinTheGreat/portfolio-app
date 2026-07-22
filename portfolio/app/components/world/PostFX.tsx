"use client"

import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { usePortfolio } from "@/store/portfolio"

export function PostFX({ force = false }: { force?: boolean }) {
  const tier = usePortfolio((state) => state.qualityTier)
  if (tier !== "high" && !force) return null

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.85} intensity={1.5} radius={1.2} mipmapBlur />
    </EffectComposer>
  )
}
