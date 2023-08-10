
async function getPoster(params: any) {
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
  
export default async function Item(props: any) {
    return(
        <>
            <a href={"/movies/"+props.id} className="item" key={props.id}>
                <div className="backsplash" style={
                    {backgroundImage: "url(https://www.themoviedb.org/t/p/w"+props.width+"_and_h"+props.height+"_multi_faces"+props.src+')' }}/>
                <span>
                    <div className="title">
                        {props.title}
                    </div>
                    <div className="info">
                        <div className="year">
                            ({props.year})
                        </div>
                        <div className="quality">
                            {props.quality}
                        </div>
                    </div>
                </span>
            </a>
        </>
    )
}