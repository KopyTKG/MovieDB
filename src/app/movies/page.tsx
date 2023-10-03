'use client'
import Movies from "@/modules/display.movies";
import { useEffect, useState, Suspense } from "react";
import API from "@/modules/controllers/api.controller"


export default function Page() {
  const [data, setData] = useState([])

  useEffect(()=>{
    const fetcher = new API(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`)
    fetcher.getData()
    .then((raw) => {
      console.log(raw.message.length)
      setData(raw.message)
    })
  },[])


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

