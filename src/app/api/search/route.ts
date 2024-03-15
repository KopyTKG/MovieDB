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
    const search = settings.search.toLowerCase()
    const genre = settings.genre
    let data = null
    if (search != '' && genre == '') {
     data = await prisma.movie.findMany({
      where: {
       title: {
        contains: search,
        mode: 'insensitive',
       },
      },
      skip: settings.page * settings.limit,
      take: settings.limit,
      orderBy: {
       title: 'asc',
      },
     })
    } else if (search == '' && genre != '') {
     data = await prisma.movie.findMany({
      where: {
       genres: {
        has: genre,
       },
      },
      skip: settings.page * settings.limit,
      take: settings.limit,
      orderBy: {
       title: 'asc',
      },
     })
    } else {
     data = await prisma.movie.findMany({
      where: {
       genres: {
        has: genre,
       },
       title: {
        contains: search,
        mode: 'insensitive',
       },
      },
      skip: settings.page * settings.limit,
      take: settings.limit,
      orderBy: {
       title: 'asc',
      },
     })
    }
    return Response.json(data)
   }
  } catch (e) {
   return Response.json('Invalid token')
  }
 } catch (e) {
  return Response.json('Internal Server Error')
 }
}

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
    const url = new URL(req.url)
    const search = url.searchParams.get('s')?.toLocaleLowerCase() || ''
    const genre = url.searchParams.get('g') || ''

    console.log(search, genre)
    let data = null
    if (search != '' && genre == '') {
     data = await prisma.movie.findMany({
      where: {
       title: {
        contains: search,
        mode: 'insensitive',
       },
      },
      orderBy: {
       title: 'asc',
      },
     })
    } else if (search == '' && genre != '') {
     data = await prisma.movie.findMany({
      where: {
       genres: {
        has: genre,
       },
      },
      orderBy: {
       title: 'asc',
      },
     })
    } else {
     data = await prisma.movie.findMany({
      where: {
       genres: {
        has: genre,
       },
       title: {
        contains: search,
        mode: 'insensitive',
       },
      },
      orderBy: {
       title: 'asc',
      },
     })
    }
    console.log(data.length)
    return Response.json(data.length)
   }
  } catch (e) {
   return Response.json('Invalid token')
  }
 } catch (e) {
  return Response.json('Internal Server Error')
 }
}
