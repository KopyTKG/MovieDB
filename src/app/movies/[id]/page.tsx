'use client'
import API from "@/modules/controllers/api.controller";

export default async function Movie({params}: {params: {id: string}}) {
  const api = new API(
    process.env.NEXT_PUBLIC_tmdb_url,
    process.env.NEXT_PUBLIC_tmdb_token
  )
  let data = await api.getData("movie/"+params.id)
  console.log(data)

  return (
    <>
      <h1>  Movie : {data.original_title}</h1>
      <img src={"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/"+data.poster_path} alt="backdrop" />
    </>
  )
}