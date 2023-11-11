"use client";
import API from "@/modules/controllers/api.controller";
import { Suspense, useEffect, useState } from "react";
import Movie from "./movie.card";
import JWT from "./controllers/jwt.controller";
import { useSearchParams } from "next/navigation";
import ErrorPage from "./error.page";

export default function Movies({ data, page, setData, search }: any) {
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [max, setMax] = useState(0);
  const jwt = new JWT();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getToken = async () => {
      try {
        const tkn = await jwt.getToken();
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`;
        const fetcher = new API(url);
        const raw = await fetcher.getData(tkn);
        
        setToken(tkn);
        if (typeof raw === "number") {
          setMax(raw / 10);
        }
      } catch (e: any) {
        setError(e);
      }
    }
      
    getToken();
      
  }, [token]);

  const fetchData = async (url: string, search: string) => {
    try {
      const fetcher = new API(url);
      const raw = await fetcher.postData(
        {
          page: page,
          limit: 10,
          search: search,
        },
      token);
      
      let parsed: string[] = [];
      if (search == "") {
        parsed = [...data, ...raw];
      } else {
        parsed = [...raw];
        setLoading(true);
      }
      setData(parsed);
    } catch (e: any) {
      setError(e);
    }
  }
    useEffect(() => {
  
    
    if (token != "" && !loading && page < max) {
      const params = new URLSearchParams(searchParams.toString());
      const search = params.get('q') || ''

      let url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
      if (search == "") {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search`;
      }

      fetchData(url, search)
      .catch((e) => { 
        setError(e);
      })
      
    }
  }, [page, search, token, setLoading, max]);

  if (error) {
    return <ErrorPage error={error} />
  } else {


  return (
      <div className="min:h-screen w-max grid sm:grid-cols-2 xs:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
        {token ? (
          data?.map((movie: any) => {
            return (
              <Suspense
                key={movie.id}
                fallback={<div className="text-red">Loading...</div>}
              >
                <Movie
                  key={movie.id}
                  id={movie.id}
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.posters[0].src}`}
                  title={movie.title}
                  year={movie.year}
                  quality={movie.quality}
                />
              </Suspense>
            );
          })
        ) : (
          <></>
        )}
      </div>
  );
  }
}
