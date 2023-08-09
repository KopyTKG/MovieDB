import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import  router  from "./routes/routes.js";
import Database from "./controller/database.controller.js";
import Paths from "./controller/path.controller.js"

dotenv.config();

const api = express();
api.use(cors());
api.use(express.json());
api.use(express.static("public"));

const database = new Database();
const path = new Paths(database);

router(api, path);



api.listen(process.env.PORT, () => {
    console.log(`API running on port ${process.env.PORT}`);
})