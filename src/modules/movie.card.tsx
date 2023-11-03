import { Card, CardFooter, CardHeader, Chip, Image, Link } from "@nextui-org/react";

export default function Movie(props: {
  src: string;
  title: string;
  id: number;
  year: string;
  quality: string;
}) {
  return (
    <Link href={`/${props.id}`}>
      <Card className="relative" isHoverable isFooterBlurred radius="lg">
        
        <Image
          alt="Movie poster"
          className="object-cover z-1"
          width={300}
          src={props.src}
        />
        
        <CardHeader className="bg-black flex justify-center align-center border-white/20 border-1 overflow-hidden py-1  absolute before:rounded-xl rounded-large top-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-2 text-center">
          <span>{props.title}
          </span>
        </CardHeader>
        <CardFooter className="before:bg-black/10 bg-black/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-2">
          <div className="grid grid-cols-2 w-full font-semibold text-lg">
            <span className="">{props.year}</span>
            <span className="flex  justify-end">{props.quality}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
