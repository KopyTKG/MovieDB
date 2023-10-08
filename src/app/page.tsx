'use client'
import { useEffect, useState} from "react";
import Movies from "@/modules/display.movies";
import { useInView } from 'react-intersection-observer';
import Loading from "@/modules/loading";
import API from "@/modules/controllers/api.controller";

export default function Page() {
  const [data, setData] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [max, setMax] = useState(0)
  const [loading, setLoading] = useState(false)
  const limit: any = 21;

  let selected = page * limit;

  const { ref, inView, entry } = useInView({
    threshold: .2,
    initialInView: false,
  });

  useEffect(()=>{
    if(inView && !loading && max != 0 ) {
      setPage(page+1)
      setLoading(true)

    } else if (selected >= max)  {
      let load: any = document.getElementById("Loading")
      load.style.display = "None";
    } else {
      let load: any = document.getElementById("Loading")
      load.style.display = "Block";
    }

  },[page, inView, search, max])


  return (
      <main className="movies">
        <div className="header">
          <div className="nav">
            <div className="count">
              Total: <div className="c-div">{max}</div>
            </div>
            <div className="search">
              <div className="icon"/>
              <input type="text" placeholder="search" onChange={(e) => {
                window.scrollTo({
                  top: 0,
                  behavior: 'instant',
                });
                setPage(0)
                setSearch(e.target.value)
              }}  />
            </div>
          </div>
          
        </div>
        <Movies 
        data={data}
        setData={setData}
        page={page}
        limit={limit}
        setLoading={setLoading}
        search={search}
        setMax={setMax}
        />
        <Loading useRef={ref}/>
            
      </main>
    )
  }

