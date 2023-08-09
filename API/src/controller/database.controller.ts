import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

class Database {
    DB: mysql.Connection;

    constructor() {
        this.DB = mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        this.DB.connect((err) => {
            if (err) {
                throw err;
            } else  {
                console.log("Database connected");
            }
        });

    }

    public async getData(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.DB.query(query, (err: Error, result: any) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public HelloWorld() {
        return "Hello World";
    }
}

export default Database;

