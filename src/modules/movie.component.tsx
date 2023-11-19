import { Card, Link, CardFooter, CardHeader, Chip, Image, CardBody } from '@nextui-org/react'
import '/node_modules/flag-icons/css/flag-icons.min.css'

export default function Movie({ data, type }: any) {
 const Language = () => {
  switch (data.language) {
   case 'en-US':
    return 'fi-us'
   case 'en-GB':
    return 'fi-gb'
  }
 }
 return (
  <Link href={`/${data.id}`} className="flex justify-center">
   <Card isFooterBlurred className="w-max">
    <Image
     className="object-cover z-1"
     alt="Movie poster"
     width={300}
     src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + data.posters[0].src}
    />
    <CardHeader className="bg-black flex justify-center align-center border-white/20 border-1 overflow-hidden py-1  absolute before:rounded-xl rounded-large top-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-2 text-center">
     <span>{data.title}</span>
    </CardHeader>
    <CardBody className="absolute bottom-10">
     {type ? (
      <Chip color="primary" size="sm">
       new
      </Chip>
     ) : null}
    </CardBody>
    <CardFooter className="before:bg-black/10 bg-black/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-2">
     <div className="flex justify-between w-full font-semibold text-lg">
      <span>{data.year}</span>
      <span className={'fi ' + Language()}></span>
      <span>{data.quality}</span>
     </div>
    </CardFooter>
   </Card>
  </Link>
 )
}
