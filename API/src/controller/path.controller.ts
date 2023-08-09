import jwt from "jsonwebtoken";
import Database from "./database.controller.js";
import fs from "fs";

class Paths {
    Database: Database;
    constructor(DB) {
        this.Database = DB;
    }

    getAuth = async (req:any, res:any) => {
        try {
            const payload : string = Buffer.from((Date.now()).toString()).toString(`base64`);
            const jwt_sign : string = process.env.JWT_SECRET;
            const options : any = {
                algorithm: "HS512",
            }
            let token : string = jwt.sign(payload, jwt_sign, options);
            await this.Database.getData('INSERT INTO `Tokens` (`token`, `base`) VALUES ("'+token+'", "'+payload+'")');
            res.send({status: 200, token: token});
            
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    getMovies = async (req:any, res:any) => {
        try {
            let token = req.headers["authorization"].split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, async (err:any, decoded:any) => {
                if (err) {
                    res.sendStatus(401);
                } else {
                    let dbRes = await this.Database.getData('SELECT `base` FROM `Tokens` WHERE `token`="'+token+'"');
                    if (dbRes[0].base != decoded) {
                        res.sendStatus(401);
                    } else {
                        let movies = await this.Database.getData(
                            'SELECT `Movies`.`title`, `Movies`.`year`,`Movies`.`quality`, `Movies`.`id`,`Posters`.`src`,`Posters`.`width`, `Posters`.`height` FROM `Movies` INNER JOIN `Link` ON `Movies`.`id` = `Link`.`movieId` INNER JOIN `Posters` ON `Link`.`assetId` = `Posters`.`id` ORDER BY `Movies`.`title`');
                        res.send(movies);

                    }
                }
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    }
}

export default Paths;
