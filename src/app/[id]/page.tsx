"use client";
import API from "@/modules/controllers/api.controller";
import { useState, useEffect, Suspense } from "react";
import JWT from "@/modules/controllers/jwt.controller";
import { setToken } from "../actions";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState({
    title: "",
    rating: 0,
    year: 0,
    quality: "",
    description: "",
    backdrops: [{ src: "" }],
    posters: [{ src: "" }],
  });
  const jwt = new JWT();
  const [token, setJWT] = useState("");

  useEffect(() => {
    jwt.getToken().then((data) => {
      setToken(data).catch((e) => {
        throw e;
      });
      setJWT(data);
      if (token != "") {
        const fetcher = new API(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie`
        );
        fetcher.postData(params.id, data, 60).then((raw) => {
          setData(raw);
        });
      }
    });
  }, [token]);

  return (
    <div className="w-full h-[calc(100vh-8rem)] xl:px-[25rem] ">
      <Suspense fallback={<div>Loading...</div>}>
        <Card className="relative" isHoverable isFooterBlurred radius="lg">
          <CardHeader className="text-2xl font-bold">{data.title}</CardHeader>
          <Divider />
          <CardBody className="flex lg:flex-row gap-10">
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Image
                  alt="Movie poster"
                  src={
                    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
                    data.posters[0].src
                  }
                  width={600}
                />
              </Suspense>
            </div>
            <div>
              <div className="rating">TMDB rating:</div>
              <div className="technical">
                <div className="year">
                  release year: &nbsp;
                  <span className="bold">{data.year}</span>
                </div>
                <div className="quality">
                  quality on disk: &nbsp;
                  <span className="bold">{data.quality}</span>
                </div>
              </div>
              <div className="description">description: </div>
              <div className="description-api">{data.description}</div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            Images providet by &nbsp;
            <Link color="primary" href="https://themoviedb.org">
              themoviedb.org
            </Link>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  );
}
