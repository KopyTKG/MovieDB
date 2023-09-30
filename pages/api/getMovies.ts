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
                .then(parsedRes => {
                    prisma.movie.update({

                        where: {
                            id: line.id
                        },
                        data: {
                            rating: parsedRes.vote_average
                        }
                    }).then(() => {
                        
                    })

                })
            })
*/