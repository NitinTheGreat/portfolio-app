"use client"

import { usePortfolio } from "@/store/portfolio"

export function SoundToggle() {
  const enabled = usePortfolio((state) => state.soundEnabled)
  const setSound = usePortfolio((state) => state.setSound)

  return (
    <button
      type="button"
      onClick={() => setSound(!enabled)}
      aria-pressed={enabled}
      className="pointer-events-auto absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-[#e8e4dc]/25 bg-[#e8e4dc]/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#e8e4dc]/80 backdrop-blur-md transition-colors hover:border-[#4a8fb8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${enabled ? "bg-[#4a8fb8]" : "bg-[#e8e4dc]/40"}`}
      />
      Sound {enabled ? "on" : "off"}
    </button>
  )
}
