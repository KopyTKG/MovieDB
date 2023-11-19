'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export default function SearchNavbar(props: any) {
 const searchParams = useSearchParams()
 const router = useRouter()
 function Search(e: any) {
  if (e.key === 'Enter') {
   window.scrollTo({
    top: 0,
    behavior: 'instant',
   })
   props.setPage(0)

   const val = e.target.value
   const newParams = new URLSearchParams(searchParams.toString())

   if (val) {
    newParams.set('q', val)
   } else {
    newParams.delete('q')
   }
   window.location.href = '?' + newParams
  }
 }

 useEffect(() => {}, [props.setSearch])

 return (
  <Navbar className="w-full">
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
       props.setPage(0)
       props.setSearch('')
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
