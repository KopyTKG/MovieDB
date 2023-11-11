"use client";
import {
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import API from "@/modules/controllers/api.controller";
import JWT from "@/modules/controllers/jwt.controller";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function Latest() {
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const jwt = new JWT();

  useEffect(() => {
    jwt
      .getToken()
      .then((data) => {
        setToken(data);
      })
      .catch((e) => {
        throw e;
      });
  }, [token]);

  useEffect(() => {
    if (token !== "" && !loading) {
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/latest`;

      const fetcher = new API(url);
      fetcher.getData(token).then((data) => {
        setLoading(true);
        setData(data);
      });
    }
  }, [token]);
  if (data) {
    return (
      <>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true }}
        >
          {data.map((movie: any) => {
            return (
              <SwiperSlide key={movie.id}>
                <Link href={`/${movie.id}`}>
                  <Card isFooterBlurred>
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
          })}
        </Swiper>
      </>
    );
  }
}