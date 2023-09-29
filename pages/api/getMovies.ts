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
                    posters: {
                        select: {
                            src: true,
                            width: true,
                            height: true
                        },
                        where: {
                            display: true
                        }
                    }
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

/* data.forEach(line => {
                let type = line.id == 706503? "/images": "/images?language=en"
                const url = `https://api.themoviedb.org/3/movie/${line.id}${type}`
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDk4MzAzYTJhYmZlMzkwMjI4NTBhZjIxMzdlMmRjOCIsInN1YiI6IjY0ZDBmNDNlODUwOTBmMDBlNzk3ZWE5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._BN9AI5ZvOtYbMWUxO4kUAWKljuuepaGNCi5OPuOgxI'
                    }
                };
                fetch(url, options)
                .then(res => res.json())
                .then(parsedRes => {
                    let posterCount = 0
                   
                    parsedRes.backdrops.forEach((backdrop: { file_path: any; width: any; height: any; }) => {
                        let setup = {
                            src: backdrop.file_path,
                            movieId: line.id,
                            display: false,
                            backdrop: posterCount == 1 ? true : false,
                            width: backdrop.width,
                            height: backdrop.height,
                        }
                        posterCount += 1
                    
                        prisma.poster.create(
                            {
                                data: setup
                            }
                        ).catch(error => {
                            throw new Error(error)
                        })
                    })
                    posterCount = 0
                    parsedRes.posters.forEach((poster: { file_path: any; width: any; height: any; }) => {
                        let setup = {
                            src: poster.file_path,
                            movieId: line.id,
                            display: posterCount == 1 ? true : false,
                            width: poster.width,
                            height: poster.height,
                        }
                        posterCount += 1
                    
                        prisma.poster.create(
                            {
                                data: setup
                            }
                        ).catch(error => {
                            throw new Error(error)
                        })
                    })
                })
            }); 
*/