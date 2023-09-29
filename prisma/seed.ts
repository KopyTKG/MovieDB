import { PrismaClient } from '@prisma/client';
import { Movies } from "./seeds/movies";
const prisma = new PrismaClient();

async function main() {
    const movies = await prisma.movie.createMany({
        data: [
            ...Movies
        ],
        
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });