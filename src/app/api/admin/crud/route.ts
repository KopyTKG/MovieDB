import prisma from '../../../../../prisma/client'
import {withApiAuthRequired} from '@auth0/nextjs-auth0'


/*
  id Int @id @map("_id")
  title String
  year Int
  quality String
  description String?
  rating Float?

*/


export const POST = withApiAuthRequired(async function myApiRoute(req) {
    try
    {    
        const body = await req.json();
        //const data = await prisma.movie.create({
        //    data: body
        //})
        const data = body; 
        console.log(data);
        return Response.json(data)                    
    } catch (e) {
        console.log(e);
        return Response.json('Internal Server Error')
    }
})
