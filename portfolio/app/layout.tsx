import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Instrument_Sans, Space_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { profile } from "@/lib/planets"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitin-pandey.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nitin Kumar Pandey | Forward deployed engineer",
    template: "%s",
  },
  description:
    "Nitin Kumar Pandey is a forward deployed engineer building production AI systems: fashion AI at Aeza, voice AI at LoadMinds (acquired), construction AI at BuildSmartr, plus published crowd-safety research and agentic AI for space.",
  keywords: [
    "Nitin Kumar Pandey",
    "Nitin Pandey",
    "forward deployed engineer",
    "AI engineer",
    "LangGraph",
    "RAG",
    "VIT Vellore",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/?text=1" },
  openGraph: {
    type: "website",
    title: "Nitin Kumar Pandey | Forward deployed engineer",
    description:
      "A hand-illustrated solar system of AI engineering work: Aeza, LoadMinds, BuildSmartr, published research and agentic AI for space.",
    url: siteUrl,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Kumar Pandey | Forward deployed engineer",
    description:
      "A hand-illustrated solar system of AI engineering work across fashion, logistics, construction, safety and space.",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Forward deployed engineer",
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.github, profile.linkedin],
  alumniOf: "Vellore Institute of Technology",
  worksFor: { "@type": "Organization", name: "Aeza" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${spaceMono.variable}`}
    >
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
