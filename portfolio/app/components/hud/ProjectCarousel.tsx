"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function ProjectCarousel({
  images = [],
  interval = 2500,
}: {
  images?: string[]
  interval?: number
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval>>(undefined)

  const go = useCallback(
    (next: number) => setIndex((next + images.length) % Math.max(images.length, 1)),
    [images.length],
  )

  useEffect(() => {
    if (images.length < 2 || paused) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(timer.current)
  }, [images.length, paused, interval])

  if (images.length === 0) {
    return (
      <div className="grid h-full w-full place-items-center rounded-lg border border-[#e8e4dc]/12 bg-[#e8e4dc]/[0.03] font-mono text-[10px] uppercase tracking-widest text-[#e8e4dc]/45">
        Preview coming soon
      </div>
    )
  }

  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-lg bg-[#04070e]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1)
        if (e.key === "ArrowRight") go(index + 1)
      }}
      tabIndex={0}
      role="group"
      aria-label="Project images"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(index - 1)}
            className="absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#04070e]/60 px-2 py-1 text-[#e8e4dc] group-hover:block"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(index + 1)}
            className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#04070e]/60 px-2 py-1 text-[#e8e4dc] group-hover:block"
          >
            ›
          </button>
          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
            {images.map((src, i) => (
              <span
                key={src}
                className={`h-1 w-1 rounded-full ${i === index ? "bg-[#4a8fb8]" : "bg-[#e8e4dc]/40"}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
