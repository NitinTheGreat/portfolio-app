import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitin-pandey.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/?text=1`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/text`, lastModified: now, priority: 0.8 },
  ]
}
