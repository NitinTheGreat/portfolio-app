import { TextIndex } from "@/app/components/text/TextIndex"
import { JourneyExperience } from "@/app/components/JourneyExperience"

type SearchParams = { text?: string; debug?: string }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { text, debug } = await searchParams

  if (text === "1") {
    return <TextIndex />
  }

  return <JourneyExperience debug={debug === "1"} />
}
