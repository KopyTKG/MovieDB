"use client";
import {
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import API from "@/modules/controllers/api.controller";
import JWT from "@/modules/controllers/jwt.controller";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ErrorPage from "./error.page";

export default function Latest() {
  const [error, setError] = useState<Error | null>(null);

  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const jwt = new JWT();

  useEffect(() => {
    const getToken = async () => {
      try {
        const tkn = await jwt.getToken();
        setToken(tkn);
      } catch (e: any) {
        setError(e);
      }
    };

    getToken();
  }, [token]);

  useEffect(() => {
    if (token !== "" && !loading) {
      try {
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/latest`;

        const fetcher = new API(url);
        fetcher.getData(token).then((data) => {
          setLoading(true);
          setData(data);
        });
      } catch (e: any) {
        setError(e);
      }
    }
  }, [token]);
  if (error) {
    return <ErrorPage error={error} />;
  } else {
    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
        >
          {data.map((movie: any) => {
                return (
                  <SwiperSlide key={movie.id}>
                    <Link href={`/${movie.id}`} className="flex justify-center">
                      <Card isFooterBlurred className="w-max">
                        <Image
                          className="object-cover z-1"
                          alt="Movie poster"
                          width={300}
                          src={
                            `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/` +
                            movie.posters[0].src
                          }
                        />
                        <CardHeader className="bg-black flex justify-center align-center border-white/20 border-1 overflow-hidden py-1  absolute before:rounded-xl rounded-large top-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-2 text-center">
                          <span>{movie.title}</span>
                          <Chip
                            color="primary"
                            size="sm"
                            className="absolute right-1"
                          >
                            new
                          </Chip>
                        </CardHeader>
                        <CardFooter className="before:bg-black/10 bg-black/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-2">
                          <div className="flex justify-center w-full font-semibold text-lg">
                            {movie.quality}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </SwiperSlide>
                );
              }
            )}
        </Swiper>
      </>
    );
  }
}
