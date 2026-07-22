"use client"

import { useEffect, useState } from "react"
import { usePortfolio } from "@/store/portfolio"
import { profile } from "@/lib/planets"
import { ModalShell } from "./ModalShell"

export function ResumeModal() {
  const active = usePortfolio((state) => state.activeModal)
  const close = usePortfolio((state) => state.closeModal)
  const open = active === "cv"
  const [status, setStatus] = useState<"checking" | "ok" | "missing">("checking")

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setStatus("checking")
    fetch(profile.cv, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return
        setStatus(res.ok && res.headers.get("content-type")?.includes("pdf") ? "ok" : "missing")
      })
      .catch(() => {
        if (!cancelled) setStatus("missing")
      })
    return () => {
      cancelled = true
    }
  }, [open])

  return (
    <ModalShell open={open} onClose={close} label="Resume" maxWidth={900}>
      <div className="flex items-center justify-between border-b border-[#e8e4dc]/12 px-6 py-4">
        <h2 className="font-display text-2xl font-black tracking-tight">
          Nitin Kumar Pandey — Résumé
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="rounded-full px-2 text-2xl leading-none text-[#e8e4dc]/60 hover:text-[#e8e4dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"
        >
          ×
        </button>
      </div>

      {status === "missing" ? (
        <div className="px-6 py-16 text-center text-[#e8e4dc]/75">
          The résumé is being updated. Reach out via the contact button.
        </div>
      ) : (
        <>
          <div className="hidden h-[68vh] sm:block">
            {status === "ok" ? (
              <object data={profile.cv} type="application/pdf" className="h-full w-full">
                <iframe src={profile.cv} title="Résumé" className="h-full w-full" />
              </object>
            ) : (
              <div className="grid h-full place-items-center text-[#e8e4dc]/50">Loading…</div>
            )}
          </div>
          <div className="px-8 py-14 text-center text-[#e8e4dc]/75 sm:hidden">
            PDF preview is not supported on mobile. Download to view.
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-3 border-t border-[#e8e4dc]/12 px-6 py-4">
        <a
          href={profile.cv}
          download
          className="rounded-full bg-[#4a8fb8] px-5 py-2.5 text-sm font-medium text-[#04070e] hover:bg-[#5a9fc8]"
        >
          Download PDF
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#e8e4dc]/25 px-5 py-2.5 text-sm font-medium hover:border-[#4a8fb8]"
        >
          Open in new tab
        </a>
      </div>
    </ModalShell>
  )
}
