'use client'
import API from "@/modules/controllers/api.controller"
import { parse } from "path";
import { useEffect, useState } from "react";


export default function Movies({data, page, limit, setData, setLoading, search, setMax}: any) { 
  const [last, setLast] = useState(search)
  useEffect(()=>{
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`
    if(search != ""){
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search`
      const fetcher = new API(url)
      fetcher.postData({
        page: page,
        limit: limit,
        search: search,
      })
      .then((raw) => {
        let parsed: string[]= []
        if(last == search) {
          parsed = [...data, ...raw.message]

        } else {
          parsed = [...raw.message]
        }
        setData(parsed)
        setLoading(false)
        setLast(search)
        setMax(parsed.length)
      })
    } else {
      const fetcher = new API(url)
      fetcher.postData({
        page: page,
        limit: limit,
        search: search,
      })
      .then((raw) => {
        let parsed: string[]= []
        if(last == search) {
          parsed = [...data, ...raw.message]
        } else {
          parsed = [...raw.message]
        }
        setData(parsed)
        setLoading(false)
        setLast(search)
        setMax(parsed.length)

      })
    }
    
  },[page, search])
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

