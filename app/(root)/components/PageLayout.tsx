'use client'

import React from 'react'
import Navigation from './navbar/NavigationClient'
import { rawUserData } from '@/types'


type pageLayoutProps = {
  children: React.ReactNode
  currentUser: rawUserData
  notificationCount: number
}

const PageLayout = ({children, currentUser, notificationCount}: pageLayoutProps) => {
  return (
    <section className='flex md:flex-row flex-col lg:gap-8 md:gap-5'>
      <div className='w-full md:min-w-[40%] lg:min-w-[30%] sticky top-5 h-full z-30'>
        <Navigation currentUser={currentUser} notificationCount={notificationCount}/>
      </div>
      <div className='md:min-w-[60%] lg:min-w-[70%] w-full'>
        {children}
      </div>
    </section>
  )
}

export default PageLayout