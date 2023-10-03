'use client'
import API from "@/modules/controllers/api.controller"
import Box from "@/modules/box";
import { useEffect, useState, Suspense } from "react";
import Box_Fallback from "@/modules/fallback/box.fallback";


export default function Page() {
  const [data, setData] = useState({src: ""})
  useEffect(()=>{
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/rngPoster`
    let movieFetcher = new API(URL)
    movieFetcher.getData(0)
    .then(raw => {
      console.log(raw)
      setData(raw.message)
    })
  },[])

  return (
    <main className="Page-home">
      <a href="/movies" id="movies">
        <Suspense fallback={<Box_Fallback>Movies</Box_Fallback>}>
          <Box poster={data.src}>Movies</Box>
        </Suspense>
      </a>
      <a href="/movies" id="series">
        <Suspense fallback={<Box_Fallback>Series</Box_Fallback>}>
          <Box poster={""}>Series</Box>
        </Suspense>
      </a>
    </main>
  )
}
