import jwt from "jsonwebtoken";
import Database from "./database.controller.js";
import Auth from "./auth.controller.js";

class Paths {
    Database: Database;
    auth: Auth;
    constructor(DB) {
        this.Database = DB;
        this.auth = new Auth();
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
        let authStatus  = await this.auth.verify(req.headers);
        if(!authStatus) {
            res.sendStatus(401);
            return;
        } else {
        let movies = await this.Database.getData('SELECT `Movies`.`title`, `Movies`.`year`,`Movies`.`quality`, `Movies`.`id`,`Posters`.`src`,`Posters`.`width`, `Posters`.`height` FROM `Movies` INNER JOIN `Link` ON `Movies`.`id` = `Link`.`movieId` INNER JOIN `Posters` ON `Link`.`assetId` = `Posters`.`id` ORDER BY `Movies`.`title`');
        res.send(movies);
        }
    }
}

export default Paths;
