# Movie Database viewer
Plex library

## Table of content

- [Setup](#setup)
  - [.env file](#env-file-structure)
- [Database](#database)
  - [prisma connection](#prisma-settings)
  - [Database schema](#database-schema)
- [API docs](#api-endpoints)



## Setup
1. Install all node packages with  (**`npm install`**) 
1. Create **`.env`** file 
1. Run application **`npm run dev`** 

### .env file structure
```env
DATABASE_URL="postgresql://johndoe:password@127.0.0,1:3306/database"
NEXT_PUBLIC_BASE_URL = http://localhost:3000
```
 
## Database 

### Prisma settings
Database used in live version is [cockroachdb](https://cockroachlabs.cloud/)
```prisma
datasource db {
  provider = "cockroachdb"
  url      = env("DATABASE_URL")
}
```

### Database schema
Tables are subjects to change
```prisma
model Movie {
  id Int @id
  title String
  year Int
  quality String
  description String?
  rating Float?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posters Poster[]
  backdrops Backdrop[]
}

model Poster {
  id String @id @default(uuid())
  src String
  width Int? @default(0)
  height Int? @default(0)
  movieId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  movie Movie @relation(fields: [movieId], references: [id])
}

model Backdrop {
  id String @id @default(uuid())
  src String
  width Int? @default(0)
  height Int? @default(0)
  movieId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  movie Movie @relation(fields: [movieId], references: [id])
}



```

## **API endpoints**
all endpoint are under **https://localhost/api/endpoint**

---
### /movies
`GET` - returns total count of movies in DB

`POST` - needs `limit, page` parameters in body 
- `limit` number of movies that should be selected
- `page` limit multiplier

return array of movies
```
message: [
  {
      id: 0,
      title: '',
      year: 0,
      quality: '1080p',
      description: '',
      rating: 0,
      createdAt: '',
      updatedAt: '',
      posters: [{src: ""}],
      backdrops: [{src: ""}]
    },
    ...
]
```
---
### /movie
`POST` - needs `id` to select record from database

returns JSON of all information for that id
```
 message: {
  title: "",
  year: "",
  quality: "",
  description: "",
  rating: 0,
  backdrops: [{src: ""}],
  posters: [{src: ""}],
}
```
---
