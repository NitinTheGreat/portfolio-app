"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePortfolio } from "@/store/portfolio"
import { profile } from "@/lib/planets"

const links = [
  { label: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: `GitHub · ${profile.githubHandle}`, href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
]

export function LandingOverlay() {
  const settled = usePortfolio((state) => state.scrollProgress > 0.955)

  return (
    <AnimatePresence>
      {settled ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="pointer-events-none absolute inset-y-0 right-0 flex w-full max-w-2xl items-center bg-gradient-to-l from-[#04070e]/70 via-[#04070e]/25 to-transparent px-6 sm:px-14"
        >
          <div className="w-full text-[#e8e4dc]">
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Let&apos;s build something.
            </h2>
            <p className="mt-5 max-w-md text-lg text-[#e8e4dc]/80">{profile.closer}</p>

            <div className="pointer-events-auto mt-8 grid max-w-md gap-2">
              {links.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="rounded-xl border border-[#e8e4dc]/12 px-4 py-3 font-mono text-sm text-[#e8e4dc]/85 transition-colors hover:border-[#4a8fb8] hover:text-[#e8e4dc]"
                >
                  {label}
                </a>
              ))}
            </div>

            <a
              href={profile.cv}
              download
              className="pointer-events-auto mt-4 inline-block rounded-full bg-[#4a8fb8] px-6 py-3 text-sm font-medium text-[#04070e] hover:bg-[#5a9fc8]"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
