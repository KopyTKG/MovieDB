"use client";
import API from "@/modules/controllers/api.controller";
import { Suspense, useEffect, useState } from "react";
import Movie from "./movie.card";
import JWT from "./controllers/jwt.controller";

export default function Movies({ data, page, setData, search }: any) {
  const [last, setLast] = useState(search);
  const [token, setToken] = useState<any>("");
  const jwt = new JWT();
  useEffect(() => {
    jwt
      .getToken()
      .then((data) => {
        setToken(data);
        console.log(data);
      })
      .catch((e) => {
        throw e;
      });
  }, [token]);

  useEffect(() => {
    if (token != "") {
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
      if (search == "") {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search`;
      }
      const fetcher = new API(url);
      fetcher
        .postData(
          {
            page: page,
            limit: 10,
            search: search,
          },
          token
        )
        .then((raw) => {
          let parsed: string[] = [];
          if (page > 0 && search == last) {
            parsed = [...data, ...raw];
          } else {
            parsed = [...raw];
          }
          setData(parsed);
          setLast(search);
        });
    }
  }, [page, search, token]);
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
