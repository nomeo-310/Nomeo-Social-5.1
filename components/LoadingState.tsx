'use client'

import React from 'react'
import { PuffLoader} from 'react-spinners'


const LoadingState = () => {
  return (
    <div className='h-[calc(100vh-120px)] w-full flex items-center justify-center'>
      <PuffLoader color='#16a34a' size={80}/>
    </div>
  )
}

export default LoadingState