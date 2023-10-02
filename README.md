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

### **API endpoints**
#### all endpoint are under **https://localhost/api/endpoint**

- /movie
  + request
    - **POST** 
    + body
      + movieID (as int example: 62) 

**response** - json body
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

- /movies
  + request
    - **GET**

**response** - json body
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

- /rngPoster
  + request
    - **GET**

**response** - json body
```
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
