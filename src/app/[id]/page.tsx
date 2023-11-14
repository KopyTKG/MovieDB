"use client";
import API from "@/modules/controllers/api.controller";
import { useState, useEffect, Suspense } from "react";
import JWT from "@/modules/controllers/jwt.controller";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ErrorAPIToken, NotFound } from "@/lib/errors";
import ErrorPage from "@/modules/error.page";
export default function Page({ params }: { params: { id: number } }) {
  const [error, setError] = useState<Error | null>(null);

  const [data, setData] = useState({
    title: "",
    rating: 0,
    year: 0,
    quality: "",
    description: "",
    backdrops: [{ src: "" }],
    posters: [{ src: "" }],
    genres: [],
    imdb_id: "",
  });
  const jwt = new JWT();

  useEffect(() => {
    const getData = async () => {
      const tkn = await jwt.getToken();
      const fetcher = new API(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie`);
      const raw = await fetcher.postData(params.id, tkn);
      if (raw === null) {
        setError(new NotFound());
      } else if (typeof raw === "string") {
        setError(new ErrorAPIToken());
      } else {
        setData(raw);
      }
    };

    getData().catch((e) => {
      throw e;
    });
  }, []);

  if (error) {
    return <ErrorPage error={error} />;
  } else {
    return (
      <div className="w-full h-[calc(100vh-8rem)] xl:px-[25rem] ">
        <Suspense fallback={<div>Loading...</div>}>
          <Card className="relative" isFooterBlurred radius="lg">
            <CardHeader className="text-2xl font-bold">{data.title}</CardHeader>
            <Divider />
            <CardBody className="grid lg:grid-cols-[30%_60%] grid-cols-1 gap-4 w-full">
              <div className="w-full flex justify-center">
                <Image
                  alt="Movie poster"
                  src={
                    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
                    data.posters[0].src
                  }
                  className="h-[30rem] xs:h-[20rem]"
                  loading="lazy"
                />
              </div>
              <Table
                hideHeader
                isStriped
                className="justify-center"
                aria-label="  table"
                aria-labelledby="tableTitle"
              >
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Value</TableColumn>
                </TableHeader>
                <TableBody className="h-full">
                  <TableRow>
                    <TableCell>TMDB rationg:</TableCell>
                    <TableCell>
                      <CircularProgress
                        size="lg"
                        value={Number((data.rating * 10).toPrecision(2))}
                        color={
                          Number((data.rating * 10).toPrecision(2)) >= 75
                            ? "success"
                            : Number((data.rating * 10).toPrecision(2)) >= 50
                            ? "warning"
                            : "danger"
                        }
                        formatOptions={{ style: "unit", unit: "percent" }}
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
                    <TableCell className="text-justify w-[80%]">
                      {data.description}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Genres</TableCell>
                    <TableCell>
                      <div className="w-full flex flex-row gap-1">
                      {data.genres.map((genre) => {
                        return (
                            <Button 
                            as={Link}
                            key={genre}  
                            color="secondary"
                            href={`/collection?g=${genre}`}
                            >
                              {genre}
                            </Button>
                        );
                      })}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>IMDB</TableCell>
                    <TableCell>
                      <Link
                        color="primary"
                        href={`https://www.imdb.com/title/${data.imdb_id}`}
                      >
                        Find on IMDB
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
            <Divider />
            <CardFooter>
              Images providet by &nbsp;
              <Link color="primary" href="https://themoviedb.org">
                themoviedb.org
              </Link>
            </CardFooter>
          </Card>
        </Suspense>
      </div>
    );
  }
}
