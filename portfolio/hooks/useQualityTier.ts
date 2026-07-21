import { useEffect } from "react"
import { usePortfolio, type QualityTier } from "@/store/portfolio"

function probeFrameRate(durationMs: number): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0
    const start = performance.now()
    const tick = () => {
      frames += 1
      const elapsed = performance.now() - start
      if (elapsed >= durationMs) {
        resolve((frames / elapsed) * 1000)
        return
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

type NavigatorWithMemory = Navigator & { deviceMemory?: number }

async function detectQualityTier(): Promise<QualityTier> {
  const nav = navigator as NavigatorWithMemory
  const memory = nav.deviceMemory ?? 4
  const cores = nav.hardwareConcurrency ?? 4

  if (memory <= 2 || cores <= 2) return "low"

  const fps = await probeFrameRate(500)
  if (fps >= 55) return "high"
  if (fps >= 30) return "medium"
  return "low"
}

export function useQualityTier() {
  useEffect(() => {
    let cancelled = false
    detectQualityTier().then((tier) => {
      if (cancelled) return
      const { qualityOverridden, setQuality } = usePortfolio.getState()
      if (qualityOverridden) return
      setQuality(tier, false)
    })
    return () => {
      cancelled = true
    }
  }, [])
}
