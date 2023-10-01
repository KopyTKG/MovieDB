import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

type ResponseData = {
  message: any
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        try{
            const data = await prisma.movie.findMany({
                orderBy: {
                    title: 'asc'
                },
                include: {
                    posters: true,
                    backdrops: true
                }
            });
            
            

            res.status(200).json({message: data})
        } catch (e) {
            res.status(500).json({ message: e })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}

// scraping from TMDB
/*
 data.forEach(line => {
                const url = `https://api.themoviedb.org/3/movie/${line.id}`
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: `Bearer ${process.env.TMDB_KEY}`
                    }
                };
                fetch(url, options)
                .then(res => res.json())
                .then(async parsedRes => {
                    let posters: any = {
                        src: parsedRes.poster_path,
                        movieId: parsedRes.id
                    }
                    let backdrops: any = {
                        src: parsedRes.backdrop_path,
                        movieId: parsedRes.id
                    }
                    
                    prisma.poster.create({
                        data: posters
                    }).then(() => {
                        prisma.backdrop.create({
                            data: backdrops
                        }).then(() => {
                            console.log("done");
                            
                        })
                    })
                    

                })
                
            })
*/

            
