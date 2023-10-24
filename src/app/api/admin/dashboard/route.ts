import prisma from '../../../../../prisma/client'
import { GetAuth } from '../tools';
import { getSession } from '@auth0/nextjs-auth0';


export async function GET(
    req: Request,
){
    try{
        const { user }: any = await getSession();

        if(!user) {
            return Response.json('Invalid Token')
        } else {
            const data = await prisma.movie.count()
            return Response.json(data)                    
        }
        
        
    } catch (e) {
        console.log(e);
        return Response.json('Invalid session')
    }
}
