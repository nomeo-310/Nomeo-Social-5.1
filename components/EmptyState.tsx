'use client'

import React from 'react'
import Card from './Card'

type Props = {
  message:string
}

const EmptyState = ({message}: Props) => {
  return (
    <Card className='rounded-full text-center bg-gray-200 shadow-none mt-4'>
      <p>{message}</p>
    </Card>
  )
}

export default EmptyState