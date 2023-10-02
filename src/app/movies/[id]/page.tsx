import { fetchMovie } from "@/modules/api/routes";
import Pie from "@/modules/pie";

export default async function Page({params}: {params: {id: string}}) {
  const dataRaw = await fetchMovie(params.id)
  let data = dataRaw.message ? dataRaw.message: {title: "",year: "",quality: "",description: "",rating: 0,backdrops: [{src: ""}],posters: [{src: ""}],}  

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

