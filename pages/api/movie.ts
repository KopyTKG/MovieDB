import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

type ResponseData = {
  message: any
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        try{
            const id = parseInt(JSON.parse(req.body))
            const data = await prisma.movie.findUnique({
                where: {
                    id: id
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
