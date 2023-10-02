import Movies from "@/modules/display.movies";
import { Suspense } from "react";
import  API from "@/modules/controllers/api.controller";

export default async function path_movies() {

  const fetcher = new API(`${process.env.BASE_URL}/api/movies`)
  const dataRaw = await fetcher.getData()
  let data: any = []
  data = dataRaw.message ? dataRaw.message : []

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

