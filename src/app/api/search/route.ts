import prisma from "../../../../prisma/client";
import JWT from "@/modules/controllers/jwt.controller";
import redis from "@/lib/redis";
import * as jose from "jose";

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const headers = req.headers;
    const token = String(headers.get("authorization")?.split(" ")[1]);
    const settings = await req.json();

    // JWT stuff
    const jwt = new JWT();
    const secret = await jwt.getPublic();

    try {
      const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
        issuer: "urn:thekrew:issuer",
        audience: "urn:thekrew:audience",
      });
      if (payload) {
        const search = (settings.search).toLowerCase();
        const genre = settings.genre
        const cache = await redis.get(search? search : `g:${genre.toString()}`);
        if (cache) {
          return Response.json(JSON.parse(cache));
        } else {
          let data = null;
          if(search != "" && genre == '' ) {
            data = await prisma.movie.findMany({
              where: {
                title:  {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              orderBy: {
                title: "asc",
              },
            })
          } else if(search == "" && genre != '') {
            data = await prisma.movie.findMany({
              where: {
                genres: {
                  has: genre,
                },
              },
              orderBy: {
                title: "asc",
              },
            })
          } else {
            data = await prisma.movie.findMany({
              where: {
                genres: {
                  has: genre
                },
                title:  {
                  contains: search,
                  mode: 'insensitive'
                },
                
              },
              orderBy: {
                title: "asc",
              },
            })
          }
          await redis.set(search? search : `g:${genre.toString()}`, JSON.stringify(data), "EX", 60 * 60 * 2);
          return Response.json(data);
        }
      }
    } catch (e) {
      return Response.json("Invalid token");
    }
  } catch (e) {
    return Response.json("Internal Server Error");
  }
}
