'use client'

import { useEffect, useState } from "react";
import JWT from "./controllers/jwt.controller";
import API from "./controllers/api.controller";
import ErrorPage from "./error.page";


export default function Category() {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        const getAuth = async () => {
            return await new JWT().getToken();
        }

        const getData = async () => {
            try {

                const Token = await getAuth();
                
                const fetche = new API(process.env.NEXT_PUBLIC_BASE_URL + "/api/genres");
                const data = await fetche.getData(Token);
                
                if(data) {
                    setGenres(data);
                } else {
                    setError(data);
                }
            } catch (e: any) {
                setError(e);
            }
        }

        getAuth();
        getData();
    }, [])


    if (error || !genres) {
        return (
            <ErrorPage error={error} /> 
        )
    }
    return (
        <div>
         { genres.map((genre: any) => (
             <div key={genre.id}>
                 <h1>{genre.name}</h1>
             </div>
         ))}
        </div>
    )
}