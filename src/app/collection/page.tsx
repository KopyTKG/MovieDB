import Movies from '@/modules/display.movies'
import SearchNavbar from '@/modules/search.navbar'
import { Suspense } from 'react'

export default function Page() {
 return (
  <>
   <Suspense>
    <SearchNavbar />
   </Suspense>
   <div className="min-h-screen w-full flex flex-col items-center">
    <Movies />
   </div>
  </>
 )
}
