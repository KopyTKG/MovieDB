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
        res.status(501).json({message: "missing endpoint"})
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}