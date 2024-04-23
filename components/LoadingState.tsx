'use client'

import React from 'react'
import { BounceLoader} from 'react-spinners'


const LoadingState = () => {
  return (
    <div className='h-[calc(100vh-120px)] w-full flex items-center justify-center'>
      <BounceLoader color='#3b82f6' size={90}/>
    </div>
  )
}

export default LoadingState