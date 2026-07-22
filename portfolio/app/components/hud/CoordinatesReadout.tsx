"use client"

import { usePortfolio } from "@/store/portfolio"
import { planetById } from "@/lib/planets"

export function CoordinatesReadout() {
  const current = usePortfolio((state) => state.currentPlanet)
  const planet = planetById[current]
  const [x, y, z] = planet.worldPosition

  return (
    <div className="absolute bottom-6 right-6 text-right font-mono text-[11px] leading-relaxed text-[#e8e4dc]/55">
      <div className="uppercase tracking-[0.3em] text-[#e8e4dc]/80">{planet.name}</div>
      <div className="tabular-nums">
        {x.toFixed(1)} · {y.toFixed(1)} · {z.toFixed(1)}
      </div>
    </div>
  )
}
