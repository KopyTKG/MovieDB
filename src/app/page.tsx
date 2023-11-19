import Category from '@/modules/category.display'
import Latest from '@/modules/latest.display'
import { Divider } from '@nextui-org/react'

export default function Home() {
 return (
  <>
   <div className="container mx-auto px-2">
    <h1 className="text-3xl font-bold underline mb-5">Latest addition</h1>
    <Divider className="mb-5" />
    <Latest />

    <h1 className="text-3xl font-bold underline my-5">Genres</h1>
    <Divider />
    <Category />
   </div>
  </>
 )
}
