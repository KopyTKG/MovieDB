import  API from "@/modules/controllers/api.controller";
import Pie from "@/modules/pie";


export default async function Movie({params}: {params: {id: string}}) {
  const fetcher = new API(`${process.env.BASE_URL}/api/getMovie`)
  const dataRaw = await fetcher.postData(params.id)
  let data = dataRaw.message

  let poster: any = ""
  let backdrop: any = ""

  data.posters.forEach((item: any) => {
    if (item.display) {
      poster = item
    }
    if (item.backdrop) {
      backdrop = item
    }
  })

  
  return (
    <div className="movie">
      <section className="master">
        <div className="backdrop">
          <div className="backposter" style={{backgroundImage: `url(https://www.themoviedb.org/t/p/original/${backdrop.src})`}}/>
          <div className="shade"></div>
        </div>
        <div className="details">

        <div className="poster" 
          style={{backgroundImage: "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+ poster.src+')'}}
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