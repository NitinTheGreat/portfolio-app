import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nitin Pandey | Portfolio",
  description:
    "Personal portfolio showcasing projects and skills of Nitin Pandey, a full-stack developer specializing in modern web technologies.",
  keywords: ["developer", "portfolio", "web development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Nitin Pandey" }],
  creator: "Nitin Pandey",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
