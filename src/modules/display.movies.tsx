'use client'
import API from "@/modules/controllers/api.controller"
import { useEffect } from "react";


export default function Movies({data, page, limit, setData, setLoading}: any) { 
  useEffect(()=>{
    const fetcher = new API(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`)
    fetcher.postData({
      page: page,
      limit: limit,
    })
    .then((raw) => {
      const parsed: string[]= [...data, ...raw.message]
      setData(parsed)
      setLoading(false)
    })
  },[page])
  return (
    <div className="container">
      {data?.map((movie: any) => {
        return (
          <a href={"/"+movie.id} className="item" key={movie.id}>
            {
                movie.posters[0] != undefined ?
            <div className="backsplash" style={
                {backgroundImage: "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+movie.posters[0].src+')' }}/>
            :
            <div className="backsplash"/>
            }
            <div className="info">
                <div className="title">
                    {movie.title}
                </div>
                <div className="year">
                    ({movie.year})
                </div>
                <div className="quality">
                    {movie.quality}
                </div>
            </div>
          </a>
          )
        }
        )
      }
    </div>
  )
}

