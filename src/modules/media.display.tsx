'use client'
import { Modal, ModalContent, useDisclosure, Image, Card } from '@nextui-org/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

function Media(props: any) {
 const { isOpen, onOpen, onOpenChange } = useDisclosure()
 const size = props.type == 'backdrop' ? 'w300' : props.type == 'poster' ? 'w185' : 'w300'
 return (
  <div className="w-max mx-auto">
   <Card key={props.src} className="w-max" onClick={onOpen} isPressable>
    <Image
     src={`https://www.themoviedb.org/t/p/${size}${props.src}`}
     alt="PosterAlt"
     className="aspect-picture w-full max-w-[300px]"
    />
   </Card>
   <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    onClick={() => onOpenChange()}
    className="w-full h-full flex justify-center items-center bg-transparent">
    <ModalContent>
     <Image
      src={`https://www.themoviedb.org/t/p/original${props.src}`}
      alt="PosterAlt"
      className="aspect-auto"
     />
    </ModalContent>
   </Modal>
  </div>
 )
}

export default function MediaDisplay(props: any) {
 return (
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
   className="grid"
   modules={[Pagination]}>
   {props.media.map((media: any) => {
    return (
     <SwiperSlide key={media.file_path}>
      <Media src={media.file_path} type="backdrop" />
     </SwiperSlide>
    )
   })}
  </Swiper>
 )
}
