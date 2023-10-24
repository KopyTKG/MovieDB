"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { redirect } from "next/navigation";
import API from "@/modules/controllers/api.controller";
export default function DashBoard() {
  const { user, error, isLoading } = useUser();
  const [count, setCount] = useState<number | undefined>();
  const [posts, setPosts] = useState<Array<any>>();
  useEffect(() => {
    if (error) {
      redirect("/");
    }
    if (!user && !isLoading) {
      redirect("/");
    }
  });

  useEffect(() => {
    if (user) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`;
      const count = new API(url + "/count");
      count.getData().then((raw) => {
        setCount(raw);
      });

      const latest = new API(url + "/latest");
      latest.getData().then((raw) => {
        setPosts(raw);
        console.log(raw);
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="fallback-container center">
        <h1> Please wait while we load your dashboard</h1>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dash-body">
        <h1 className="dash-title">Dashboard</h1>
        <div className="dash-container">
          <div className="dash-row dash-3">
            <div className="dash-col">
              <div className="dash-card">
                <h2>Movies count: {count}</h2>
              </div>
            </div>
            <div className="dash-col">
              <div className="dash-card">
                <h2>Add movie</h2>
              </div>
            </div>
            <div className="dash-col">
              <div className="dash-card">
                <h2>Edit movie</h2>
              </div>
            </div>
          </div>
          <div className="dash-row">
            <div className="dash-collection-title"> Latest additions </div>
            <div className="dash-collection">
              {posts ? (
                posts.map((post) => (
                  <a className="dash-item" key={post.id} href={"/" + post.id}>
                    <div className="dash-item-title">{post.title}</div>
                    <div className="dash-item-desc">
                      Added at:{" "}
                      {new Date(post.createdAt).toDateString() +
                        " " +
                        new Date(post.createdAt).toLocaleTimeString()}
                    </div>
                  </a>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
