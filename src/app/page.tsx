'use client'
import { useEffect, useState} from "react";
import Movies from "@/modules/display.movies";
import { useInView } from 'react-intersection-observer';

export default function Page() {
  const [data, setData] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const limit: Number = 21;
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
    initialInView: false,
    //triggerOnce: true,
  });

  useEffect(()=>{
    if(inView && !loading) {
      setPage(page+1)
      setLoading(true)
    }


  },[page, inView])


  return (
      <main className="movies">
        <div className="header">
          <div className="selectors">
            loaded: <div className="c-div">{data.length}</div>
          </div>
        </div>
        <Movies 
        data={data}
        setData={setData}
        page={page}
        limit={limit}
        setLoading={setLoading}
        />
        <div className="circle">
          <div className="outter-circle">
          <div className="inner-circle"/>
          </div>
        </div>
            
      </main>
    )
  }

