import prisma from '../../../../prisma/client'

export async function POST(req: Request) {
    try{
        const id = parseInt(JSON.parse(await req.json()))
        const data = await prisma.movie.findUnique({
            where: {
                id: id
            },
            include: {
                posters: true,
                backdrops: true
            }
        });
        return Response.json({message: data})
    } catch (e) {
        return Response.json({ message: e })
    }
}
