'use client'
import API from '@/modules/controllers/api.controller'
import { useState, useEffect, useMemo, Key } from 'react'
import JWT from '@/modules/controllers/jwt.controller'
import {
 Button,
 Card,
 CircularProgress,
 Divider,
 Image,
 Link,
 Tab,
 Table,
 TableBody,
 TableCell,
 TableColumn,
 TableHeader,
 TableRow,
 Tabs,
} from '@nextui-org/react'
import { ErrorAPIToken, NotFound } from '@/lib/errors'
import ErrorPage from '@/modules/error.page'
import MediaDisplay from '@/modules/media.display'

export default function Page({ params }: { params: { id: number } }) {
 const [error, setError] = useState<Error | null>(null)
 const [data, setData] = useState({
  title: '',
  rating: 0,
  year: 0,
  quality: '',
  description: '',
  backdrops: [{ src: '' }],
  posters: [{ src: '' }],
  genres: [],
  videos: [{ key: '', type: '', name: '' }],
  imdb_id: '',
 })

 const jwt = useMemo(() => new JWT(), [])
 const [tabSelection, setTabSelection] = useState([{ key: '', type: '', name: '', file_path: '' }])

 async function FetchMedia(selected: Key) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/`
  switch (selected) {
   case 'Videos':
    // eslint-disable-next-line no-case-declarations
    let parsed: any = []
    data.videos.forEach((element) => {
     let obj = {
      key: element.key,
      type: element.type,
      name: element.name,
      file_path: '',
     }
     parsed.push(obj)
    })
    setTabSelection(parsed)
    return
   default:
    url += selected.toString().toLocaleLowerCase()
    break
  }
  const tkn = await jwt.getToken()
  const fetcher = new API(url)
  const fetched = await fetcher.postData(params.id, tkn)
  if (fetched === null) {
   setError(new NotFound())
  } else if (typeof fetched === 'string') {
   setError(new ErrorAPIToken())
  } else {
   console.log(fetched.data)
   setTabSelection(fetched.data)
  }
 }

 useEffect(() => {
  const getData = async () => {
   const tkn = await jwt.getToken()
   const fetcher = new API(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie`)
   const raw = await fetcher.postData(params.id, tkn)
   if (raw === null) {
    setError(new NotFound())
   } else if (typeof raw === 'string') {
    setError(new ErrorAPIToken())
   } else {
    setData(raw)
    setTabSelection(raw.videos)
   }
  }

  getData().catch((e) => {
   throw e
  })
 }, [jwt, params.id])

 if (error) {
  return <ErrorPage error={error} />
 } else {
  return (
   <div className="w-full h-full mb-10">
    <Divider className="mb-2" />
    <div className="container mx-auto flex flex-col items-center xl:flex-row gap-10">
     <div className="max-w-[90vw] w-max py-2 flex justify-center xl:justify-start">
      <Image
       alt="Movie poster"
       src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + data.posters[0].src}
      />
     </div>
     <div>
      <h1 className="text-4xl font-bold m-3 px-2 text-center xl:text-left">{data.title}</h1>
      <Table
       hideHeader
       isStriped
       className="justify-center"
       aria-label="  table"
       aria-labelledby="tableTitle">
       <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Value</TableColumn>
       </TableHeader>
       <TableBody className="h-full">
        <TableRow>
         <TableCell>TMDB rating:</TableCell>
         <TableCell>
          <CircularProgress
           size="lg"
           value={Number((data.rating * 10).toPrecision(2))}
           color={
            Number((data.rating * 10).toPrecision(2)) >= 75
             ? 'success'
             : Number((data.rating * 10).toPrecision(2)) >= 50
               ? 'warning'
               : 'danger'
           }
           formatOptions={{ style: 'unit', unit: 'percent' }}
           showValueLabel={true}
           className=""
          />
         </TableCell>
        </TableRow>
        <TableRow>
         <TableCell>release year</TableCell>
         <TableCell>{data.year}</TableCell>
        </TableRow>
        <TableRow>
         <TableCell>quality on disk</TableCell>
         <TableCell>{data.quality}</TableCell>
        </TableRow>
        <TableRow>
         <TableCell>description</TableCell>
         <TableCell className="text-wrap w-[80%]">{data.description}</TableCell>
        </TableRow>
        <TableRow>
         <TableCell>Genres</TableCell>
         <TableCell>
          <div className="w-full flex flex-row gap-1">
           {data.genres.map((genre) => {
            return (
             <Button as={Link} key={genre} color="secondary" href={`/collection?g=${genre}`}>
              {genre}
             </Button>
            )
           })}
          </div>
         </TableCell>
        </TableRow>
        <TableRow>
         <TableCell>IMDB</TableCell>
         <TableCell>
          <Link color="primary" href={`https://www.imdb.com/title/${data.imdb_id}`}>
           Find on IMDB
          </Link>
         </TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </div>
    </div>
    <Divider className="container mx-auto my-5" />
    <div className="mx-auto container">
     <Tabs aria-label="Options" onSelectionChange={FetchMedia}>
      <Tab
       key="Videos"
       title="Videos"
       className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-5 text-center">
       {tabSelection.map((video) => {
        return (
         <Card key={video.key}>
          <iframe
           className="w-full aspect-video"
           src={`https://www.youtube.com/embed/${video.key}`}
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
           title="Embedded youtube"
          />
         </Card>
        )
       })}
      </Tab>
      <Tab key="Logos" title="Logos">
       <MediaDisplay media={tabSelection} />
      </Tab>
      <Tab key="Posters" title="Posters">
       <MediaDisplay media={tabSelection} />
      </Tab>
      <Tab key="Backdrops" title="Backdrops">
       <MediaDisplay media={tabSelection} />
      </Tab>
     </Tabs>
    </div>
   </div>
  )
 }
}
