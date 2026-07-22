"use client"

import { usePortfolio } from "@/store/portfolio"
import { profile } from "@/lib/planets"
import { ModalShell } from "./ModalShell"

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.66c0-1.35-.03-3.09-1.94-3.09-1.94 0-2.24 1.47-2.24 2.99V21h-4V9Z" />
    </svg>
  )
}

const items = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: MailIcon, external: false },
  { label: profile.githubHandle, href: profile.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon, external: true },
]

export function ContactModal() {
  const active = usePortfolio((state) => state.activeModal)
  const close = usePortfolio((state) => state.closeModal)

  return (
    <ModalShell open={active === "contact"} onClose={close} label="Contact" maxWidth={480}>
      <div className="flex items-start justify-between px-6 pt-6">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight">Let&apos;s talk.</h2>
          <p className="mt-2 text-sm text-[#e8e4dc]/70">{profile.closer}</p>
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

      <div className="grid gap-2 px-6 pb-6 pt-6">
        {items.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center gap-3 rounded-xl border border-[#e8e4dc]/12 px-4 py-3 text-sm text-[#e8e4dc]/85 transition-colors hover:border-[#4a8fb8] hover:text-[#e8e4dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a8fb8]"
          >
            <span className="text-[#4a8fb8]">
              <Icon />
            </span>
            <span className="font-mono">{label}</span>
          </a>
        ))}
      </div>
    </ModalShell>
  )
}
