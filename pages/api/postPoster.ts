import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        try{
            let body = JSON.parse(req.body)
            
            let setup = {
                src: body.src,
                width: body.width,
                height: body.height,
                movieId: body.movieId,
                display: body.display
            }
        
            const data = await prisma.poster.create(
                {
                    data: setup
                }
            );
            res.status(200).json({message: data})
        } catch (e) {
            res.status(500).json({ message: `Post: ${e}` })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
