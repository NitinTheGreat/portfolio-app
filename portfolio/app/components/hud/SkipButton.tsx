"use client"

import Link from "next/link"

export function SkipButton() {
  return (
    <Link
      href="/?text=1"
      className="pointer-events-auto absolute right-6 top-6 rounded-full border border-[#e8e4dc]/25 bg-[#e8e4dc]/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#e8e4dc]/80 backdrop-blur-md transition-colors hover:border-[#4a8fb8] hover:text-[#e8e4dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"
    >
      Skip the journey
    </Link>
  )
}
