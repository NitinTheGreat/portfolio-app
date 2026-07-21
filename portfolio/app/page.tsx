import { TextIndex } from "@/app/components/text/TextIndex"

type SearchParams = { text?: string }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { text } = await searchParams
  const textOnly = text === "1"

  // Milestone 2 swaps the default branch for the R3F journey experience.
  // Until then the text index is the shippable baseline for every visitor.
  if (textOnly) {
    return <TextIndex />
  }

  return <TextIndex />
}
