export const dynamic = "force-dynamic"

const FALLBACK = {
  name: "ISS (ZARYA)",
  line1: "1 25544U 98067A   26200.51782528  .00016717  00000-0  10270-3 0  9005",
  line2: "2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537",
  source: "fallback",
}

export async function GET() {
  try {
    const res = await fetch(
      "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE",
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) },
    )
    if (!res.ok) throw new Error(`status ${res.status}`)
    const lines = (await res.text())
      .trim()
      .split("\n")
      .map((l) => l.trim())
    if (lines.length < 3 || !lines[1].startsWith("1 ") || !lines[2].startsWith("2 ")) {
      throw new Error("malformed TLE")
    }
    return Response.json({ name: lines[0], line1: lines[1], line2: lines[2], source: "celestrak" })
  } catch {
    return Response.json(FALLBACK)
  }
}
