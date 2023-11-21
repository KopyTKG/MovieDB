import Movies from '@/modules/display.movies'
import SearchNavbar from '@/modules/search.navbar'

export default function Page() {
 return (
  <>
   <SearchNavbar />
   <div className="min-h-screen w-full flex flex-col items-center">
    <Movies />
   </div>
  </>
 )
}
