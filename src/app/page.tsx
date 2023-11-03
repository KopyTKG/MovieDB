"use client";
import { useEffect, useState } from "react";
import Movies from "@/modules/display.movies";
import { useInView } from "react-intersection-observer";
import JWT from "@/modules/controllers/jwt.controller";
import { setToken } from "./actions";
import { Spinner } from "@nextui-org/react";
import SearchNavbar from "@/modules/search.navbar";

export default function Page() {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [max, setMax] = useState(0);
  const [loading, setLoading] = useState(false);
  const [token, setJWT] = useState("");
  const limit: number = 21;

  const jwt = new JWT();

  let selected = page * limit;

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
    initialInView: false,
  });

  useEffect(() => {
    if (inView && !loading && max != 0) {
      setPage(page + 1);
      setLoading(true);
    }
  }, [page, inView, search, max]);

  useEffect(() => {
    jwt.getToken().then((data) => {
      setToken(data).catch((e) => {
        throw e;
      });
      setJWT(data);
    });
  }, [token]);

  return (
    <>
      <SearchNavbar
        setPage={setPage}
        setSearch={setSearch}
        />
      <div className="w-full flex flex-col items-center">

      <Movies
        data={data}
        setData={setData}
        page={page}
        limit={limit}
        setLoading={setLoading}
        search={search}
        setMax={setMax}
        token={token}
        />
      <Spinner color='danger' size='lg' ref={ref} label="Loading more content"/>
        </div>
      </>
  );
}


// <HomeNav max={max} setSearch={setSearch} setPage={setPage} />