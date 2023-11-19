import redis from '@/lib/redis'
import prisma from '../../../../prisma/client'
import JWT from '@/modules/controllers/jwt.controller'
import * as jose from 'jose'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
 try {
  const headers = req.headers
  const token = String(headers.get('authorization')?.split(' ')[1])
  const settings = await req.json()

  // JWT stuff
  const jwt = new JWT()
  const secret = await jwt.getPublic()

  try {
   const { payload } = await jose.jwtVerify(token, secret, {
    issuer: 'urn:thekrew:issuer',
    audience: 'urn:thekrew:audience',
   })
   if (payload) {
    const cache = await redis.get(settings)
    if (cache) {
     return Response.json(JSON.parse(cache))
    } else {
     let raw = await prisma.movie.findUnique({
      where: {
       id: parseInt(settings),
      },
     })
     if (raw) {
      await redis.set(settings, JSON.stringify(raw), 'EX', 60 * 60 * 2)
      return Response.json(raw)
     } else {
      return Response.json(raw)
     }
    }
   }
  } catch (e) {
   return Response.json('Invalid token')
  }
 } catch (e) {
  return Response.json(e)
 }
}
