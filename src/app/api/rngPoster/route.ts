import prisma from '../../../../prisma/client'
import { randomInt } from 'crypto'

export async function GET(
  req: Request
) {
    try{
        let skip = randomInt(0, 200)
        const data = await prisma.poster.findFirst({
            skip: skip
        });
        return Response.json({message: data})
    } catch (e) {
        return Response.json({ message: e })
    }
}
