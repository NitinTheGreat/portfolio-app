"use client"

import { useState } from "react"
import Link from "next/link"
import { usePortfolio } from "@/store/portfolio"

const pillClass =
  "pointer-events-auto w-full max-w-[180px] rounded-full border border-[#e8e4dc]/25 bg-[#e8e4dc]/[0.04] px-4 py-2 text-right font-mono text-xs uppercase tracking-widest text-[#e8e4dc]/70 backdrop-blur-md transition-colors hover:border-[#4a8fb8] hover:text-[#e8e4dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"

export function HudMenu() {
  const openModal = usePortfolio((state) => state.openModal)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="absolute right-6 top-6 flex flex-col items-end gap-2">
      <div className="hidden flex-col items-end gap-2 sm:flex">
        <Link href="/?text=1" className={pillClass}>
          Skip the journey ↗
        </Link>
        <button type="button" onClick={() => openModal("cv")} className={pillClass}>
          CV →
        </button>
        <button type="button" onClick={() => openModal("contact")} className={pillClass}>
          Contact →
        </button>
      </div>

      <div className="flex flex-col items-end gap-2 sm:hidden">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="pointer-events-auto rounded-full border border-[#e8e4dc]/25 bg-[#e8e4dc]/[0.04] px-3 py-2 backdrop-blur-md"
        >
          <span className="block h-0.5 w-5 bg-[#e8e4dc]/80" />
          <span className="mt-1 block h-0.5 w-5 bg-[#e8e4dc]/80" />
          <span className="mt-1 block h-0.5 w-5 bg-[#e8e4dc]/80" />
        </button>
        {menuOpen ? (
          <div className="flex flex-col items-end gap-2">
            <Link href="/?text=1" className={pillClass} onClick={() => setMenuOpen(false)}>
              Skip ↗
            </Link>
            <button
              type="button"
              onClick={() => {
                openModal("cv")
                setMenuOpen(false)
              }}
              className={pillClass}
            >
              CV →
            </button>
            <button
              type="button"
              onClick={() => {
                openModal("contact")
                setMenuOpen(false)
              }}
              className={pillClass}
            >
              Contact →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
