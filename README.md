

# MovieDB

MovieDB is a NextJS project to share my plex movie library. It is also use as learning ground for NextJS, caching and MongoDB. MovieDB UI is build in [NextUI](https://nextui.org/) + [FramerMotion](https://www.framer.com/motion/) and [Tailwind](https://tailwindcss.com/). 


[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0) 

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/KopyTKG/MovieDB/Live)



## Security

See [`SECURITY.md`](https://github.com/KopyTKG/MovieDB/blob/Live/SECURITY.md) for information on supported versions.



## Deployment

**For public use is recomended to use [Vercel](https://vercel.com)**


for home use it is needed to fill `.env` file

#### recomended `.env`
```env
NEXT_PUBLIC_BASE_URL = "http://localhost:3000" //change to public URL if uploaded to Vercel

REDIS_URL= //redis url connect string
DATABASE_URL= //mongodb url connect string

NEXT_PUBLIC_JWT_KEY = //PKCS8 key

```

#### To deploy this project for home use run
```bash
npm install && npx prisma generate && npm build && npm start
```

