'use client'

import Movies from "@/modules/display.movies";
import Button from "@/modules/nav.button";
import { Suspense } from "react";
import  API from "@/modules/controllers/api.controller";
import { useState, useEffect, useRef } from "react";

export default function path_movies() {
  const [data, setData] = useState([]);
  const fileRef: any = useRef();
  const typeRef: any = useRef();

  const HideSeletions = (event:any) => {
    let clicked = event.currentTarget
    if(clicked != fileRef.current && clicked != typeRef.current) {
      if (!fileRef.current.classList.contains("none")) 
      {
            fileRef.current.classList.add("none");
        }
      if (!typeRef.current.classList.contains("none")) 
      {
            typeRef.current.classList.add("none");
      }
    }
  }

  useEffect(() => {
    const api = new API(
      process.env.NEXT_PUBLIC_local_url,
      process.env.NEXT_PUBLIC_local_token
    );
    api.postData("movies/", {})
    .then((res) => {
      setData(res);
    })
  },[])

  return (
      <main className="movies">
        <div className="header">
          <div className="selectors">
            <Button Ref={fileRef} id="files">
              All
            </Button>
            <Button Ref={typeRef} id="query">
              Title
            </Button>
            <div className="c-div">{data.length}</div>
          </div>
          <span className="title">Movies</span>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Movies data={data} onClick={(event:any) => HideSeletions(event)}/>
        </Suspense>
      </main>
    )
  }

