'use client'


import React from 'react'
import Image from 'next/image'
import Link from 'next/link'



const ErrorPage = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className="flex md:gap-6 items-center flex-col md:flex-row p-8 gap-14">
        <div className="relative overflow-hidden rounded-md md:w-72 md:h-72 w-60 h-60 shadow-lg">
          <Image src="/images/404.png" className='rounded-md aspect-square' fill alt='404_banner' />
        </div>
        <div>
          <h1 className='text-4xl lg:text-5xl leading-7 text-center md:text-left'>Page not found!</h1>
          <p className='text-dark-grey text-xl leading-7 mt-5 text-center'>The page you are looking for does not exist. Head back to the <Link href="/" className='text-black underline text-xl font-semibold'>home page</Link></p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage