'use client'
import API from "@/modules/controllers/api.controller";
import Pie from "@/modules/pie";
import { useState, useEffect } from "react";

export default function Page({params}: {params: {id: string}}) {
  const [data, setData] = useState({title: "", rating: 0, year: 0, quality: "", description: "", backdrops: [{src: ""}], posters: [{src: ""}] })

  useEffect(() => {
    const fetcher = new API(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie`)
    fetcher.postData(params.id, 60)
    .then((raw) => {
      setData(raw.message)
    })
  }, [])


  return (
    <div className="movie">
      <section className="master">
        <div className="backdrop">
          <div className="backposter" style={{backgroundImage: `url(https://www.themoviedb.org/t/p/original/${data.backdrops[0].src})`}}/>
          <div className="shade"></div>
        </div>
        <div className="details">

        <div className="poster" 
          style={{backgroundImage: "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+ data.posters[0].src+')'}}
          />
        <div className="text">

          <div className="title">{data.title}</div>
          <div className="rating">
            TMDB rating: 
            <Pie rating={(data.rating*10)}/>
          </div>
          <div className="technical">
            <div className="year">
              release year: &nbsp;
                <span className="bold">
                  {data.year}
                </span>
            </div>
            <div className="quality">
              quality on disk: &nbsp;
                <span className="bold">
                  {data.quality}
                </span>
            </div>
          </div>
            <div className="description">description: </div>
            <div className="description-api">{data.description}</div>

          </div>
        </div>
      </section>

      
    </div>
  )
}

