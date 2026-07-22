"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePortfolio } from "@/store/portfolio"
import { constellation, type ConstellationBody } from "@/lib/planets"
import { ProjectCarousel } from "./ProjectCarousel"

function Card({ body }: { body: ConstellationBody }) {
  const openModal = usePortfolio((state) => state.openModal)

  return (
    <div className="pointer-events-auto flex flex-col rounded-xl border border-[#e8e4dc]/12 bg-[#04070e]/50 p-3 backdrop-blur-md">
      <button
        type="button"
        onClick={() => openModal("project", body.slug)}
        className="aspect-video w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"
        aria-label={`Open ${body.name}`}
      >
        <ProjectCarousel images={body.images} />
      </button>
      <h3 className="mt-2 font-display text-lg font-black leading-tight tracking-tight text-[#e8e4dc]">
        {body.name}
      </h3>
      <p className="mt-1 text-[13px] leading-snug text-[#e8e4dc]/70">{body.oneLiner}</p>
      <ul className="mt-2 flex flex-wrap gap-1">
        {body.tech.slice(0, 4).map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-[#e8e4dc]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#e8e4dc]/65"
          >
            {chip}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        {body.live ? (
          <a
            href={body.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#4a8fb8] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#04070e]"
          >
            Live
          </a>
        ) : null}
        {body.code ? (
          <a
            href={body.code}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#e8e4dc]/25 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#e8e4dc]/80 hover:border-[#4a8fb8]"
          >
            Code
          </a>
        ) : null}
      </div>
    </div>
  )
}

export function ConstellationOverlay() {
  const inRange = usePortfolio(
    (state) => state.scrollProgress >= 0.84 && state.scrollProgress <= 0.965,
  )

  return (
    <AnimatePresence>
      {inRange ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-6 right-0 top-44 flex items-center px-6 sm:px-10"
        >
          <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {constellation.map((body) => (
              <Card key={body.slug} body={body} />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
