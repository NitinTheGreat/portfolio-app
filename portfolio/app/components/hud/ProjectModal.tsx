"use client"

import { usePortfolio } from "@/store/portfolio"
import { constellationBySlug } from "@/lib/planets"
import { ModalShell } from "./ModalShell"
import { ProjectCarousel } from "./ProjectCarousel"

export function ProjectModal() {
  const active = usePortfolio((state) => state.activeModal)
  const slug = usePortfolio((state) => state.activeProjectSlug)
  const close = usePortfolio((state) => state.closeModal)
  const project = slug ? constellationBySlug[slug] : undefined

  return (
    <ModalShell open={active === "project" && !!project} onClose={close} label="Project" maxWidth={760}>
      {project ? (
        <div>
          <div className="flex items-start justify-between px-6 pt-6">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight">{project.name}</h2>
              <p className="mt-2 max-w-md text-sm text-[#e8e4dc]/75">{project.oneLiner}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full px-2 text-2xl leading-none text-[#e8e4dc]/60 hover:text-[#e8e4dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"
            >
              ×
            </button>
          </div>

          <div className="mt-5 aspect-[16/9] px-6">
            <ProjectCarousel images={project.images} />
          </div>

          <p className="mt-5 px-6 leading-relaxed text-[#e8e4dc]/80">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-2 px-6">
            {project.tech.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[#e8e4dc]/20 px-3 py-1 font-mono text-xs text-[#e8e4dc]/70"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 px-6 pb-6 pt-6">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#4a8fb8] px-5 py-2.5 text-sm font-medium text-[#04070e] hover:bg-[#5a9fc8]"
              >
                Live ↗
              </a>
            ) : null}
            {project.code ? (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#e8e4dc]/25 px-5 py-2.5 text-sm font-medium hover:border-[#4a8fb8]"
              >
                Code ↗
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </ModalShell>
  )
}
