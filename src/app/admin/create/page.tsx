"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function MovieAdd() {
    const [id, setId] = useState<string | undefined>();
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    if (error) {
      redirect("/");
    }
    if (!user && !isLoading) {
      redirect("/");
    }
  });

  async function getMovie() {
    
  }

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
        <form>
          <h2> Adding new movie </h2>

          <div className="form-head">
            <input type="number" placeholder="TMBD id" onChange={(e) => setId(e.target.value)} />
            <button type="button" onClick={getMovie}>Search</button>
          </div>

          <div className="form-body">
            <input type="text" disabled={true} placeholder="Title" />
            <input type="text" disabled={true} placeholder="Year" />
            <input type="text" disabled={true} placeholder="Description" />
            <input type="text" disabled={true} placeholder="Rating" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
