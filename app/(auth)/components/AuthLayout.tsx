'use client'

import React from 'react'
import AnimationWrapper from '@/components/AnimationWrapper'
import Image from 'next/image'

type authLayoutProps = {
  type: string
  children: React.ReactNode
  mobileImageSrc: string
  desktopImageSrc: string
}

const AuthLayout = ({type, children, mobileImageSrc, desktopImageSrc}: authLayoutProps) => {

  return (
    <AnimationWrapper className='w-full h-full overflow-hidden bg-neutral-200 relative'>
      <div className="relative w-full h-screen flex items-center justify-center">
        <Image src={mobileImageSrc} alt='banner' fill priority className='object-cover hidden md:block'/>
        <Image src={desktopImageSrc} alt='banner' fill priority className='object-cover md:hidden'/>
        <div className='absolute left-0 top-0 w-full h-full bg-black/20 z-10'/>
      </div>
      <div className='absolute top-0 left-0 w-full h-full p-6 z-20'>
        <AnimationWrapper initial={type === 'signup' ? {x: '-100vw', opacity: 0} : {x: '100vw', opacity: 0} } animate={{x: 0, opacity: 1}} transition={{delay: 2, duration: 2, type: 'spring', }} exit={{opacity: 0}} className={'w-full flex items-center justify-center h-full ' + (type === 'signup' ? 'md:justify-end': 'md:justify-start')}>
          <div className="bg-black/40 text-white p-8 rounded-md shadow-md w-full max-w-[450px] md:max-w-[400px] lg:max-w-[500px]">
            {children}
          </div>
        </AnimationWrapper>
      </div>
    </AnimationWrapper>
  )
}

export default AuthLayout