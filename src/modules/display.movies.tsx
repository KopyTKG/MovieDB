'use client'
import API from '@/modules/controllers/api.controller'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Movie from './movie.component'
import JWT from './controllers/jwt.controller'
import { useSearchParams } from 'next/navigation'
import ErrorPage from './error.page'
import { Pagination } from '@nextui-org/react'

export default function Movies() {
 const [data, setData] = useState<string[]>([])

 const [error, setError] = useState<Error | null>(null)
 const [token, setToken] = useState<any>('')
 const [loading, setLoading] = useState(false)
 const [fetched, setFetched] = useState(false)
 const [max, setMax] = useState(0)
 const [page, setPage] = useState(1)
 const jwt = useMemo(() => new JWT(), [])
 const searchParams = useSearchParams()

 function ChangePage(newPage: number) {
  if (newPage == page) return
  const newParams = new URLSearchParams(searchParams.toString())
  newParams.set('page', newPage.toString())
  window.location.href = '?' + newParams
 }

 useEffect(() => {
  const getToken = async () => {
   try {
    const tkn = await jwt.getToken()
    setToken(tkn)
   } catch (e: any) {
    setError(e)
   }
  }

  getToken()
 }, [jwt, searchParams, token])

 // fetch length from api
 const fetchLength = useCallback(
  async (url: string, query: { search: string; genre: string }) => {
   const newUrl = `${url}?s=${query.search}&g=${query.genre}`
   const fetcher = new API(newUrl)
   const raw = await fetcher.getData(token)
   console.log(raw)

   if (typeof raw === 'number') {
    setMax(Number.parseInt((raw / 20).toFixed(0)))
    const newParams = new URLSearchParams(searchParams.toString())
    const pageParm = newParams.get('page') || '1'
    setPage(Number.parseInt(pageParm))
    setFetched(true)
   }
  },
  [searchParams, token],
 )

 // fetch data from api -> Search path
 const fetchData = useCallback(
  async (url: string, query: any) => {
   try {
    const fetcher = new API(url)
    const raw = await fetcher.postData(
     {
      page: page - 1,
      limit: 20,
      search: query.search,
      genre: query.genre,
     },
     token,
    )
    setData(raw)
   } catch (e: any) {
    setError(e)
   }
  },
  [page, token],
 )

 useEffect(() => {
  setData([])
  let query = {
   search: '',
   genre: '',
  }
  if (token != '' && !loading) {
   const params = new URLSearchParams(searchParams.toString())
   query.search = params.get('q') || ''
   query.genre = params.get('g') || ''
   let url = `${process.env.NEXT_PUBLIC_BASE_URL}`
   if (query.search != '' || query.genre != '') {
    url = `${url}/api/search`
   } else {
    url = `${url}/api/movies`
   }

   fetchLength(url, query)
    .catch((e) => {
     setError(e)
    })
    .finally(() => {
     setFetched(true)
    })

   fetchData(url, query)
    .catch((e) => {
     setError(e)
    })
    .finally(() => {
     setLoading(false)
    })
  }
 }, [token, setLoading, max, loading, searchParams, fetchData, fetchLength])

 if (error) {
  return <ErrorPage error={error} />
 } else {
  return (
   <div className=" mb-10  flex items-center flex-col gap-5">
    <div className="min:h-screen w-max grid sm:grid-cols-2 xs:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
     {token ? (
      data?.map((movie: any) => {
       return (
        <Suspense key={movie.id} fallback={<></>}>
         <Movie key={movie.id} data={movie} />
        </Suspense>
       )
      })
     ) : (
      <></>
     )}
    </div>
    {fetched && max > 1 ? (
     <Pagination
      loop
      showControls
      showShadow
      total={max}
      initialPage={page}
      page={page}
      onChange={ChangePage}
     />
    ) : (
     <></>
    )}
   </div>
  )
 }
}
