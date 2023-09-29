import Movies from "@/modules/display.movies";
import Button from "@/modules/nav.button";
import { Suspense } from "react";
import  API from "@/modules/controllers/api.controller";

export default async function path_movies() {

  const fetcher = new API(`${process.env.BASE_URL}/api/getMovies`)
  //const getter = new API(`${process.env.BASE_URL}/api/postPoster`)
  
  // get movies
  const dataRaw = await fetcher.getData()
  let data = dataRaw.message


  return (
      <main className="movies">
        <div className="header">
          <div className="selectors">
            <Button id="files">
              All
            </Button>
            <Button id="query">
              Title
            </Button>
            <div className="c-div">{data.length}</div>
          </div>
          <span className="title">Movies</span>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Movies data={data}/>
        </Suspense>
      </main>
    )
  }

