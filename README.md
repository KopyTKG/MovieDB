# MovieDB
Database viewer of my plex library

### Setup
- Run **npm install** to install all packages
- create **.env** file

**.env**
```env
DATABASE_URL="mysql://johndoe:password@127.0.0,1:3306/database"
BASE_URL = http://localhost:3000
```
 - Run 


```bash
npm run dev
# or
yarn dev
```

### Database schema

```prisma
model Movie {
  id Int @id
  title String
  year Int
  quality String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posters Poster[]
}

model Poster {
  id String @id @default(uuid())
  src String
  width Int @default(0)
  height Int @default(0)
  movieId Int
  display Boolean @default(false)
  backdrop Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  movie Movie @relation(fields: [movieId], references: [id])
}
```