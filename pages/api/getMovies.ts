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
                where: {
                    title: {
                        contains: "Pirates of the Caribbean"
                    }
                },
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