'use client'




async function getData(params: any) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDk4MzAzYTJhYmZlMzkwMjI4NTBhZjIxMzdlMmRjOCIsInN1YiI6IjY0ZDBmNDNlODUwOTBmMDBlNzk3ZWE5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._BN9AI5ZvOtYbMWUxO4kUAWKljuuepaGNCi5OPuOgxI'
    }
  };

  const res = await fetch('https://api.themoviedb.org/3/movie/'+params.id+'?language=en-US', options)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Movie({params}: {params: {id: string}}) {
  const data = await getData(params)
  console.log(data)

  return (
    <>
      <h1>  Movie : {data.original_title}</h1>
      <img src={"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/"+data.poster_path} alt="backdrop" />
    </>
  )
}