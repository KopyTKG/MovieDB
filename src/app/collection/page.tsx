"use client";
import { useState } from "react";
import Movies from "@/modules/display.movies";
import SearchNavbar from "@/modules/search.navbar";
import Paging from "@/modules/paging.module";

export default function Page() {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchNavbar setPage={setPage} setSearch={setSearch} />
      <div className="min-h-screen w-full flex flex-col items-center">
        <Movies
          data={data}
          setData={setData}
          page={page}
          search={search}
        />
      </div>
      <Paging setPage={setPage} page={page} />
    </>
  );
}
