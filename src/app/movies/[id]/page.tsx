import  API from "@/modules/controllers/api.controller";


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
        <div className="poster" 
          style={{backgroundImage: "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+ poster.src+')'}}
        />
        <h1>  Movie : {data.title}</h1>
      </section>
      <section className="posters">
        ...
      </section>
    </div>
  )
}