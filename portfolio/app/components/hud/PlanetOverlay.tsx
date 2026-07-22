"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePortfolio } from "@/store/portfolio"
import { planets, planetById } from "@/lib/planets"

const last = planets.length - 1

export function PlanetOverlay() {
  const current = usePortfolio((state) => state.currentPlanet)
  const progress = usePortfolio((state) => state.scrollProgress)
  const index = planets.findIndex((p) => p.id === current)
  const planetT = index / last
  const settled = Math.abs(progress - planetT) < 0.045
  const planet = planetById[current]

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex w-full max-w-2xl items-center bg-gradient-to-l from-[#04070e]/70 via-[#04070e]/25 to-transparent px-6 sm:px-14">
      <AnimatePresence mode="wait">
        {settled ? (
          <motion.div
            key={planet.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full text-[#e8e4dc]"
          >
            {planet.caption ? (
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4a8fb8]">
                {planet.caption}
              </p>
            ) : null}
            <h2 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              {planet.name}
            </h2>
            <p className="mt-5 max-w-md text-xl text-[#e8e4dc]/90 sm:text-2xl">{planet.oneLiner}</p>
            {planet.metric ? (
              <p className="mt-3 font-mono text-sm text-[#e8e4dc]/70">{planet.metric}</p>
            ) : null}
            {planet.chips.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {planet.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-[#e8e4dc]/25 px-3 py-1 font-mono text-xs text-[#e8e4dc]/70"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 max-w-md leading-relaxed text-[#e8e4dc]/70">
              {planet.environmentalLine}
            </p>
            {planet.links.length ? (
              <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
                {planet.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-[#e8e4dc]/25 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-[#4a8fb8]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
