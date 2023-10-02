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
// May be updated for later to store series as well as movies
model Movie {
  id Int @id
  title String
  year Int
  quality String
  description String? @db.LongText
  rating Float?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posters Poster[]
  backdrops Backdrop[]
}

// Table only for posters (first 100 is used as splash art for main menu)
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

// Table only for backdrop images
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

**API endpoints**

- /movie
  + request
    - **POST** 
    + body
      + movieID (as int example: 62) 

**response** - json body
```json
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

- /movies
  + request
    - **GET**

**response** - json body
```json
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

- /rngPoster
  + request
    - **GET**

**response** - json body
```json
message: {
  id: '',
  src: '',
  width: 0,
  height: 0,
  movieId: 0,
  createdAt: '',
  updatedAt: ''
}
```
