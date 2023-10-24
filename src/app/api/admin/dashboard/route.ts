import prisma from '../../../../../prisma/client'
import {withApiAuthRequired} from '@auth0/nextjs-auth0'


export const GET = withApiAuthRequired(async function myApiRoute(req) {
    try
    {    
        const data = await prisma.movie.count()
        return Response.json(data)                    
    } catch (e) {
        console.log(e);
        return Response.json('Internal Server Error')
    }
})
