"use client"

import { usePortfolio } from "@/store/portfolio"
import { planets } from "@/lib/planets"

export function MiniMap() {
  const current = usePortfolio((state) => state.currentPlanet)
  const last = planets.length - 1

  return (
    <div className="absolute left-6 top-6">
      <svg width="168" height="56" viewBox="0 0 168 56" fill="none" aria-hidden>
        <path
          d="M8 44 Q 84 6 160 44"
          stroke="#e8e4dc"
          strokeOpacity="0.2"
          strokeWidth="1"
          fill="none"
        />
        {planets.map((planet, i) => {
          const t = i / last
          const x = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 84 + t * t * 160
          const y = (1 - t) * (1 - t) * 44 + 2 * (1 - t) * t * 6 + t * t * 44
          const active = planet.id === current
          return (
            <circle
              key={planet.id}
              cx={x}
              cy={y}
              r={active ? 4 : 2.5}
              fill={active ? "#4a8fb8" : "#e8e4dc"}
              fillOpacity={active ? 1 : 0.4}
            />
          )
        })}
      </svg>
    </div>
  )
}
