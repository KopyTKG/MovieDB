import prisma from '../../../../prisma/client'
import JWT from '@/modules/controllers/jwt.controller';
import * as jose from 'jose'



export async function POST(
    req: Request,
  ){
    try{
        const headers = req.headers
        const token = String(headers.get('authorization')?.split(" ")[1])
        const settings = await req.json();

        // JWT stuff
        const jwt = new JWT();
        const secret = await jwt.getPublic();

        try {
            
            const { payload, protectedHeader } = await jose.jwtVerify(token , secret, {
                issuer: 'urn:thekrew:issuer',
                audience: 'urn:thekrew:audience',
            })
            
            if(payload) {
                const data = await prisma.movie.findMany({
                    skip: settings.page * settings.limit,
                    take: settings.limit,
                    orderBy: {
                        title: 'asc'
                    },
                    include: {
                        posters: true,
                        backdrops: true
                    }
                });
                return Response.json(data)                
            }
        } catch(e) {
            return Response.json(JSON.stringify('Invalid Token'))
        }
    } catch (e) {
        throw e;
        return Response.json('Internal Server Error')
    }
}