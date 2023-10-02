import { PrismaClient } from '@prisma/client';
/*
import { Movies } from "./seeding/Movie";
import { Posters } from './seeding/Poster';
import { Backdrops } from './seeding/Backdrop';
const prisma = new PrismaClient();

async function main() {
    const movies = await prisma.movie.createMany({
        data: [
            ...Movies
        ],
        
    })

    const posters = await prisma.poster.createMany({
        data: [ 
            ...Posters
        ],
    })

    const backdrops = await prisma.backdrop.createMany({
        data: [ 
            ...Backdrops
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
*/