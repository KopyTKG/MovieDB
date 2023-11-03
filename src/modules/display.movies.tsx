"use client";
import API from "@/modules/controllers/api.controller";
import { useEffect, useState } from "react";
import Movie from "./movie.card";

export default function Movies({
  data,
  page,
  limit,
  setData,
  setLoading,
  search,
  token,
  setMax
}: any) {
  const [last, setLast] = useState(search);
  useEffect(() => {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`;
    if (token != "") {
      if (search != "") {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search`;
        const fetcher = new API(url);
        fetcher
          .postData({
            page: page,
            limit: limit,
            search: search,
          }, token )
          .then((raw) => {
            let parsed: string[] = [];
            if (last == search) {
              parsed = [...data, ...raw];
            } else {
              parsed = [...raw];
            }
            setData(parsed);
            setLoading(false);
            setLast(search);
            setMax(parsed.length);

          });
      } else {
        const fetcher = new API(url);
        fetcher
          .postData({
            page: page,
            limit: limit,
            search: search,
          }, token)
          .then((raw) => {
            let parsed: string[] = [];
            if (last == search) {
              parsed = [...data, ...raw];
            } else {
              parsed = [...raw];
            }
            setData(parsed);
            setLoading(false);
            setMax(parsed.length);
            setLast(search);
          });
      }
    }
  }, [page, search, token]);
  return (
    <div className="w-max grid sm:grid-cols-2 xs:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
      {data?.map((movie: any) => {
        return (
          <Movie 
          key={movie.id}
          id={movie.id}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.posters[0].src}`}
          title={movie.title}
          year={movie.year}
          quality={movie.quality}
          />
        );
      })}
    </div>
  );
}
