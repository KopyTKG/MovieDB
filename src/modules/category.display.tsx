"use client";

import { useEffect, useState } from "react";
import JWT from "./controllers/jwt.controller";
import API from "./controllers/api.controller";
import ErrorPage from "./error.page";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

export default function Category() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const getAuth = async () => {
      return await new JWT().getToken();
    };

    const getData = async () => {
      try {
        const Token = await getAuth();

        const fetche = new API(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/genres"
        );
        const data = await fetche.getData(Token);

        if (data) {
          setGenres(data);
        } else {
          setError(data);
        }
      } catch (e: any) {
        setError(e);
      }
    };

    getAuth();
    getData();
  }, []);

  if (error || !genres) {
    return <ErrorPage error={error} />;
  }
  return (
    <>
      <div className="w-full grid grid-cols-1 justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-10">
        {genres.map((genre: any) => (
          <Link
            href={`/collection?g=${genre.name}`}
            key={genre.id}
            className="w-max h-max relative flex self-center"
          > 
          <div
            className="w-full h-full absolute rounded-2xl overflow-hidden z-1"
          >

            <Image
              alt="Movie poster"
              src={
                `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/` +
                'bI7lGR5HuYlENlp11brKUAaPHuO.jpg'
              }
              />
            </div>
            <Card className="max-w-full w-[20rem] bg-green-500/80 z-10">
              <CardBody className="flex items-center py-20">
                <span className="text-2xl font-bold">{genre.name}</span>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
