import { fetchPoster } from "@/modules/api/routes";
import Box from "@/modules/box";

export default async function Page() {
  const rawData = await fetchPoster()  
  let data = rawData.message? rawData.message : { src: ""}
  return (
    <main className="Page-home">
      <a href="/movies" id="movies"> <Box poster={data.src}>Movies</Box></a>
      <a href="/movies" id="series"> <Box poster={""}>Series</Box></a>
    </main>
  )
}
