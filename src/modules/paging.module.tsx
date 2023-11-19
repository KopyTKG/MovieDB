'use client'
import { Spinner } from '@nextui-org/react'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function Paging(props: any) {
 const { ref, inView } = useInView({
  threshold: 1,
  initialInView: false,
 })

 useEffect(() => {
  if (inView) {
   props.setPage(props.page + 1)
  }
 }, [inView, props])

 return (
  <div className="w-full flex justify-center">
   <Spinner color="danger" size="lg" ref={ref} label="Loading more content" />
  </div>
 )
}
