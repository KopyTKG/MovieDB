

# MovieDB

MovieDB is a NextJS project to share my plex movie library. It is also use as learning ground for NextJS, caching and MongoDB. MovieDB UI is build in [NextUI](https://nextui.org/) + [FramerMotion](https://www.framer.com/motion/) and [Tailwind](https://tailwindcss.com/). 


[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0) 

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/KopyTKG/MovieDB/Live)

![Website](https://img.shields.io/website?up_message=live&down_message=droped&url=https%3A%2F%2Fmovies.thekrew.app%2F)

## Security

See [`SECURITY.md`](https://github.com/KopyTKG/MovieDB/blob/Live/SECURITY.md) for information on supported versions.



## Deployment

**For public use is recomended to use [Vercel](https://vercel.com)**


for home use it is needed to fill `.env` file

### `.env` settings
```env
NEXT_PUBLIC_BASE_URL = "http://localhost:3000" //change to public URL if uploaded to Vercel
NEXT_PUBLIC_JWT_KEY = //PKCS8 key

REDIS_URL= redis://user:password@url:port
MONGO_URL= mongo://user:password@url:port/db 
```

It is recomended to use [**Railway**](https://railway.app/) as a DB/Redis provider for easy setup and management.

### Railway mongo setup
for easy mongo connection please read this [article](https://ajcwebdev.com/query-mongodb-with-prisma-and-railway/)


## Self-hosted Installation

1. clone this repo
2. navigate into root folder of the repo
2. fill all required variables in `.env`
3. run all commands listed below
```bash
npm install 
npx prisma generate
npx prisma db push
npm build && npm start
```
    
