'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
export default function SearchNavbar() {
 const searchParams = useSearchParams()
 const router = useRouter()
 function Search(e: any) {
  if (e.key === 'Enter') {
   window.scrollTo({
    top: 0,
    behavior: 'instant',
   })

   const val = e.target.value
   const newParams = new URLSearchParams(searchParams.toString())

   if (val) {
    newParams.set('q', val)
   } else {
    newParams.delete('q')
   }
   newParams.delete('page')
   window.location.href = '?' + newParams
  }
 }

 return (
  <Navbar className="w-full" isBlurred>
   <NavbarContent>
    <NavbarItem className="flex flex-row w-full">
     <Input
      className="w-full mx-[5rem]"
      placeholder="search"
      type="text"
      isClearable={true}
      startContent={<MagnifyingGlassIcon className="w-6" />}
      onKeyDown={(e) => Search(e)}

      onClear={() => {
       window.scrollTo({
        top: 0,
        behavior: 'instant',
       })
       const newParams = new URLSearchParams(searchParams.toString())
       newParams.delete('q')
       router.push('?' + newParams)
      }}
     />
    </NavbarItem>
   </NavbarContent>
  </Navbar>
 )
}
