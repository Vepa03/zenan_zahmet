import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import Image from 'next/image'
import { banner } from '@/images'

const HomeBanner = () => {
  return (
    <div className='py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between'>
        <div>
            <Title className='mb-5'>Döredijilik bilen müşderiniň duşuşýan ýeri<br/>
                    El işi, moda we sungat bir ýerde
            </Title>
            <div className='flex flex-row gap-4'>
                <Link href={"/shop"} className='bg-shop_btn_dark_green/90 text-white/90 font-semibold py-2 px-5 rounded-md text-sm hover:text-white hover:bg-shop_btn_dark_green hoverEffect '>Satyn Al</Link>
                <Link href={"/shop"} className='bg-white border-b-gray-950 text-black font-semibold py-2 px-5 rounded-md text-sm  hoverEffect '>Mahabat Gos</Link>
            </div>
            
        </div>
        <div>
            <Image src={banner} alt='banner-1' className='hidden md:inline-flex w-96'/>
        </div>
    </div>
  )
}

export default HomeBanner