"use client"

import dynamic from "next/dynamic"
import { usePortfolio } from "@/store/portfolio"

const ResumeModal = dynamic(() => import("./ResumeModal").then((m) => m.ResumeModal), {
  ssr: false,
})
const ContactModal = dynamic(() => import("./ContactModal").then((m) => m.ContactModal), {
  ssr: false,
})
const ProjectModal = dynamic(() => import("./ProjectModal").then((m) => m.ProjectModal), {
  ssr: false,
})

export function ModalRoot() {
  const active = usePortfolio((state) => state.activeModal)

  return (
    <>
      {active === "cv" ? <ResumeModal /> : null}
      {active === "contact" ? <ContactModal /> : null}
      {active === "project" ? <ProjectModal /> : null}
    </>
  )
}
