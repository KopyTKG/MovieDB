'use client'
import { useState, useEffect, useMemo } from 'react'
import API from '@/modules/controllers/api.controller'
import JWT from '@/modules/controllers/jwt.controller'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import ErrorPage from './error.page'
import Movie from './movie.component'

export default function Latest() {
 const [error, setError] = useState<Error | null>(null)

 const [data, setData] = useState<any[]>([])
 const [token, setToken] = useState<any>('')
 const [loading, setLoading] = useState(false)
 const jwt = useMemo(() => new JWT(), [])

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
 }, [jwt, token])

 useEffect(() => {
  if (token !== '' && !loading) {
   try {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/latest`

    const fetcher = new API(url)
    fetcher.getData(token).then((data) => {
     setLoading(true)
     setData(data)
    })
   } catch (e: any) {
    setError(e)
   }
  }
 }, [loading, token])

 if (error) {
  return <ErrorPage error={error} />
 } else {
  return (
   <>
    <Swiper
     slidesPerView={1}
     spaceBetween={10}
     freeMode={true}
     pagination={{
      clickable: true,
     }}
     breakpoints={{
      640: {
       slidesPerView: 2,
       spaceBetween: 20,
      },
      1024: {
       slidesPerView: 3,
       spaceBetween: 50,
      },
      1280: {
       slidesPerView: 5,
       spaceBetween: 50,
      },
     }}
     modules={[Pagination]}>
     {data.map((movie: any) => {
      return (
       <SwiperSlide key={movie.id}>
        <Movie data={movie} type="latest" />
       </SwiperSlide>
      )
     })}
    </Swiper>
   </>
  )
 }
}
