"use client";
import { useEffect, useState } from "react";
import Movies from "@/modules/display.movies";
import { useInView } from "react-intersection-observer";
import Loading from "@/modules/loading";
import JWT from "@/modules/controllers/jwt.controller";
import { setToken } from "./actions";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const { user, error, isLoading } = useUser();
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
    } else if (selected >= max) {
      let load: any = document.getElementById("Loading");
      load.style.display = "None";
    } else {
      let load: any = document.getElementById("Loading");
      load.style.display = "Block";
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
    <main className="movies">
      <div className="header">
        <div className="nav">
          <div className="count">
            Total: <div className="c-div">{max}</div>
          </div>
          <div className="search">
            <div className="icon" />
            <input
              type="text"
              placeholder="search"
              onChange={(e) => {
                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
                setPage(0);
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="admin">
            <a href="admin" className="admin-name">
            {user?.name ? user?.nickname: ""}
            </a>
            {user?.name ? (
              <a
                className="btn-nav btn-secondary-outline"
                href="api/auth/logout"
              >
                Logout
              </a>
            ) : (
              <a
                className="btn-nav btn-secondary-outline"
                href="api/auth/login"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
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
      <Loading useRef={ref} />
    </main>
  );
}
