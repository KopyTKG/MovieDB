import Item from "@/modules/item";

async function getMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.TVRZNU1UVXhPVGN4TWpRME5BPT0.joo9GCWLeo6wo0VutZS5FRGRZxREq9hcHwi335Sl2wW3MzyKjLyklD7n2IZfv9QitYR7QlTwSa93tBtpbO_3EQ'
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
    console.log(data)
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