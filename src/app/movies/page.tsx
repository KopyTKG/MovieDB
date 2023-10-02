import Movies from "@/modules/display.movies";
import { Suspense } from "react";
import { fetchMovies } from "@/modules/api/routes";



export default async function Page() {

  const dataRaw = await fetchMovies()
  let data = dataRaw.message ? dataRaw.message : []

  return (
      <main className="movies">
        <div className="header">
          <div className="selectors">
            total: <div className="c-div">{data.length}</div>
          </div>
          <span className="title">Movies</span>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Movies data={data}/>
        </Suspense>
      </main>
    )
  }

