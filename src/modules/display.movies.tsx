'use client'
import API from '@/modules/controllers/api.controller'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Movie from './movie.component'
import JWT from './controllers/jwt.controller'
import { useSearchParams } from 'next/navigation'
import ErrorPage from './error.page'

export default function Movies({ data, page, setData }: any) {
 const [error, setError] = useState<Error | null>(null)
 const [token, setToken] = useState<any>('')
 const [loading, setLoading] = useState(false)
 const [max, setMax] = useState(0)
 const [lastPage, setLastPage] = useState(1)
 const jwt = useMemo(() => new JWT(), [])
 const searchParams = useSearchParams()

 useEffect(() => {
  const getToken = async () => {
   try {
    const tkn = await jwt.getToken()
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`
    const fetcher = new API(url)
    const raw = await fetcher.getData(tkn)

    setToken(tkn)
    if (typeof raw === 'number') {
     setMax(raw / 10)
    }
   } catch (e: any) {
    setError(e)
   }
  }

  getToken()
 }, [jwt, token])

 // fetch data from api -> Search path
 const fetchData = useCallback(
  async (url: string, query: any) => {
   try {
    const fetcher = new API(url)
    const raw = await fetcher.postData(
     {
      page: page,
      limit: 10,
      search: query.search,
      genre: query.genre,
     },
     token,
    )

    let parsed: string[] = []
    if (query.search == '' && query.genre == '') {
     parsed = [...data, ...raw]
    } else {
     parsed = [...raw]
     setLoading(true)
    }
    setData(parsed)
   } catch (e: any) {
    setError(e)
   }
  },
  [data, page, setData, token],
 )

 useEffect(() => {
  let query = {
   search: '',
   genre: '',
  }
  if (token != '' && !loading && page < max && page != lastPage) {
   console.log(max)
   const params = new URLSearchParams(searchParams.toString())
   query.search = params.get('q') || ''
   query.genre = params.get('g') || ''
   let url = `${process.env.NEXT_PUBLIC_BASE_URL}`
   if (query.search != '' || query.genre != '') {
    url = `${url}/api/search`
   } else {
    url = `${url}/api/movies`
   }

   fetchData(url, query).catch((e) => {
    setError(e)
   })
   setLastPage(page)
  }
 }, [page, token, setLoading, max, loading, lastPage, searchParams, fetchData])

 if (error) {
  return <ErrorPage error={error} />
 } else {
  return (
   <div className="min:h-screen w-max grid sm:grid-cols-2 xs:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
    {token ? (
     data?.map((movie: any) => {
      return <Movie key={movie.id} data={movie} />
     })
    ) : (
     <></>
    )}
   </div>
  )
 }
}
