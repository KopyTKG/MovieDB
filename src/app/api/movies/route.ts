import prisma from '../../../../prisma/client'


export async function GET(
    req: Request,
  ){
    try{
        const data = await prisma.movie.findMany({
            orderBy: {
                title: 'asc'
            },
            include: {
                posters: true,
                backdrops: true
            }
        });
        console.log(data)
        return Response.json({message: data})
    } catch (e) {
        return Response.json({ message: 'Internal Server Error' })
    }
}