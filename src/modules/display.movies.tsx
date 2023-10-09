"use client";
import API from "@/modules/controllers/api.controller";
import { useEffect, useState } from "react";
import { getToken } from "@/app/actions";

export default function Movies({
  data,
  page,
  limit,
  setData,
  setLoading,
  search,
  setMax,
  token,
}: any) {
  const [last, setLast] = useState(search);
  useEffect(() => {
    console.log(token);
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
            console.log(raw);
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
            setLast(search);
            setMax(parsed.length);
            console.log(raw);
          });
      }
    }
  }, [page, search, token]);
  return (
    <div className="container">
      {data?.map((movie: any) => {
        return (
          <a href={"/" + movie.id} className="item" key={movie.id}>
            {movie.posters[0] != undefined ? (
              <div
                className="backsplash"
                style={{
                  backgroundImage:
                    "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
                    movie.posters[0].src +
                    ")",
                }}
              />
            ) : (
              <div className="backsplash" />
            )}
            <div className="info">
              <div className="title">{movie.title}</div>
              <div className="year">({movie.year})</div>
              <div className="quality">{movie.quality}</div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
