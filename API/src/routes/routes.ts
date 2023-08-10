import express from "express";
import cors from "cors";

const api = express();


export default async function routes(app, paths) {
    api.get("/", (req, res) => {res.sendStatus(202)});
    api.put("/auth", paths.getAuth);
    api.post("/movies", paths.getMovies);
    app.use(api)
}
