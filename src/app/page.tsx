import Box from "@/modules/box";

export default function Home() {
  return (
    <main className="Page-home">
      <a href="/movies"> <Box>Movies</Box></a>
      <a href="/series"> <Box>Series</Box></a>
    </main>
  )
}
