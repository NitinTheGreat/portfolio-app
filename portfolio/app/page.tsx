import { TextIndex } from "@/app/components/text/TextIndex"
import { JourneyExperience } from "@/app/components/JourneyExperience"

type SearchParams = { text?: string; debug?: string; bloom?: string; cam?: string; t?: string }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { text, debug, bloom, cam, t } = await searchParams

  if (text === "1") {
    return <TextIndex />
  }

  const tParsed = t !== undefined && !Number.isNaN(Number(t)) ? Number(t) : undefined

  return (
    <JourneyExperience
      debug={debug === "1"}
      bloomParam={bloom}
      camParam={cam}
      tParam={tParsed}
    />
  )
}
