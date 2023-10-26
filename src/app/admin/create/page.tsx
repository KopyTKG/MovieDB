"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import API from "@/modules/controllers/api.controller";
import Blob from "@/modules/blob";
export default function MovieAdd() {
  const [id, setId] = useState<string | undefined>();
  const [quality, setQuality] = useState<string | undefined>();
  const [movie, setMovie] = useState<any>({
    Title: "",
    Rating: 0,
    Year: 0,
    Description: "",
    Backdrop: "",
    Posters: "",
  });
  const ValidQual = ['720p', '1080p', '2160p'];

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
    if (!id) {
      alert("Please enter a movie id");
      return;
    }
    const Movies = new API(`${process.env.NEXT_PUBLIC_TMDB_URL}/${id}`);
    const data = await Movies.getData(process.env.NEXT_PUBLIC_TMDB_KEY);

    if (data) {
      const parsed = {
        Title: data.title,
        Rating: data.vote_average,
        Year: data.release_date,
        Description: data.overview,
        Backdrops: data.backdrop_path,
        Poster: data.poster_path,
      };
      console.log(parsed);
      setMovie(parsed);
    }
  }

  async function postData() {
    if (!id || !movie || !quality) {
      alert("Please enter a movie id and click the search button or enter quality");
      return;
    } else {
      if (!ValidQual.includes(quality)) {
        alert("Please enter a valid quality");
        setQuality("");
        return;
      }

      const creater = new API(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/crud`);
      creater.postData({
        id: parseInt(id),
        quality: quality,
        title: movie.Title,
        year: parseInt(movie.Year),
        description: movie.Description,
        rating: parseFloat(movie.Rating),
        backdrops: movie.Backdrops,
        posters: movie.Poster,
      }).finally(() => {
        setId('');
        setQuality('');
        setMovie({
          Title: "",
          Rating: 0,
          Year: 0,
          Description: "",
          Backdrop: "",
          Posters: "",
        });
      });
    }
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
      <div className="dash-form">
        <form>
          <h2> Adding new movie </h2>

          <div className="form-head">
            <input
              type="number"
              value={id}
              placeholder="TMBD id"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="text"
              value={quality}
              placeholder="Quality"
              onChange={(e) => setQuality(e.target.value)}
            />
            <button type="button" onClick={getMovie}>
              Search
            </button>
          </div>

          <div className="form-body">
            <Blob title="Title" value={movie.Title} placeholder="Title" />
            <Blob title="Year" value={movie.Year} placeholder="Year" />
            <Blob
              title="Description"
              value={movie.Description}
              placeholder="Description"
              type="block"
            />
            <Blob title="Rating" value={movie.Rating} placeholder="Rating" />
          </div>

          <button
            className="btn btn-secondary-outline"
            type="button"
            onClick={postData}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
