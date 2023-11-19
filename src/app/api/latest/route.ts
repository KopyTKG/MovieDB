import redis from '@/lib/redis'
import prisma from '../../../../prisma/client'
import JWT from '@/modules/controllers/jwt.controller'
import * as jose from 'jose'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
 try {
  const headers = req.headers
  const token = String(headers.get('authorization')?.split(' ')[1])

  // JWT stuff
  const jwt = new JWT()
  const secret = await jwt.getPublic()

  try {
   const { payload } = await jose.jwtVerify(token, secret, {
    issuer: 'urn:thekrew:issuer',
    audience: 'urn:thekrew:audience',
   })
   if (payload) {
    const cache = await redis.get('latest')
    if (cache) {
     return Response.json(JSON.parse(cache))
    } else {
     const data = await prisma.movie.findMany({
      take: 10,
      orderBy: {
       createdAt: 'desc',
      },
     })
     await redis.set('latest', JSON.stringify(data), 'EX', 60 * 60 * 2)
     return Response.json(data)
    }
   }
  } catch (e) {
   return Response.json('Invalid token')
  }
 } catch (e) {
  return Response.json(e)
 }
}
