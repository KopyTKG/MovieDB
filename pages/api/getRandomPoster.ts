import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'
import { randomInt } from 'crypto'

type ResponseData = {
  message: any
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {

        try{
            let skip = randomInt(0, 200)
            const data = await prisma.poster.findFirst({
                skip: skip
            });
            res.status(200).json({message: data})
        } catch (e) {
            res.status(500).json({ message: e })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
