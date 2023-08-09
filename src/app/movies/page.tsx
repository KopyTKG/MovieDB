import Item from "@/modules/item";

async function getMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.TVRZNU1UVTNORGt6T0RnME1nPT0.8_vXM7e51URBeT41eumadH1Pk4ZlVgMCDJbmSlZMs6wf5SEOgrkgdtV3HYK7YNiyLQZpU-S9D0S3zgJP5RWVqA'
    }
  };

  const res = await fetch('http://localhost:5455/movies/', options);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default async function Movies() {
    const data = await getMovies()
    return (
      <main>
        <h1>Movies list</h1>
          <div className="container">
            {data.map((movie: any) => {
              return (
                <Item key={movie.id} {...movie} />
                )
              })}
          </div>
      </main>
    )
  }