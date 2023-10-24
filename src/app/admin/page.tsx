"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { redirect } from "next/navigation";
import API from "@/modules/controllers/api.controller";
export default function DashBoard() {
  const { user, error, isLoading } = useUser();
  const [count, setCount] = useState<number | undefined>();
  useEffect(() => {
    if (error) {
      redirect("/");
    }
    if (!user && !isLoading) {
      redirect("/");
    }
  });

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard`;
    const fetcher = new API(url);
    fetcher.getData().then((raw) => {
      setCount(raw);
    });
  }, [count]);

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
                <h2>Tagged count</h2>
              </div>
            </div>
            <div className="dash-col">
              <div className="dash-card">
                <h2>Add movie</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
