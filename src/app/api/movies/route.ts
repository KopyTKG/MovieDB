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
        return Response.json({message: data})
    } catch (e) {
        return Response.json({ message: 'Internal Server Error' })
    }
}

export async function POST(
    req: Request,
  ){
    try{
        const settings = await req.json();
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
        return Response.json({message: data})
    } catch (e) {
        return Response.json({ message: 'Internal Server Error' })
    }
}