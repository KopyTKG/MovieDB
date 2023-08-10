import jwt from "jsonwebtoken";
import Database from "./database.controller.js";

class Auth {
    DB: Database;
    constructor() {
        this.DB = new Database();
    }
    async verify(headers: any) :Promise<boolean> {
        try {
            let token = headers["authorization"].split(" ")[1];
            let dbRes = await this.DB.getData('SELECT `token` FROM `Tokens` WHERE `token`="'+token+'"');
            if (dbRes[0].token != token) {
                return false;
            } else {
                jwt.verify(token, process.env.JWT_SECRET, async (err:any, decoded:any) => {
                    if (err) {
                        return false;
                    } else {
                        return true;
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}

export default Auth;