"use client";

import { useEffect, useState } from "react";
import JWT from "./controllers/jwt.controller";
import API from "./controllers/api.controller";
import ErrorPage from "./error.page";
import { Card, CardBody } from "@nextui-org/react";
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-10 p-10">
      {genres.map((genre: any) => (
          <Link href={`/collection?g=${genre.id}`} key={genre.id}>
          <Card>
            <CardBody className="w-full flex items-center py-20">
              <span className="text-2xl font-bold">{genre.name}</span>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
    </>
  );
}
