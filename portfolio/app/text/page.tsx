import type { Metadata } from "next"
import { TextIndex } from "@/app/components/text/TextIndex"

export const metadata: Metadata = {
  title: "Nitin Kumar Pandey | Forward deployed engineer",
  description:
    "Text index of Nitin Kumar Pandey's portfolio: AI engineering work at Aeza, LoadMinds and BuildSmartr, published crowd-safety research, and agentic AI for space.",
  alternates: { canonical: "/?text=1" },
}

export default function TextPage() {
  return <TextIndex />
}
