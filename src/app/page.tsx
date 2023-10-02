import Box from "@/modules/box";
import API from "@/modules/controllers/api.controller";

export default async function Home() {
  let movieFetcher = new API(`${process.env.BASE_URL}/api/rngPoster`)
  let rawData = await movieFetcher.getData(0)
  let data = rawData.message

  console.log(data)

  return (
    <main className="Page-home">
      <a href="/movies" id="movies"> <Box poster={data.src}>Movies</Box></a>
      <a href="/series" id="series"> <Box>Series</Box></a>
    </main>
  )
}
