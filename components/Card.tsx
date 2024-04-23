import React from 'react'
import { twMerge } from 'tailwind-merge'

type cardProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Card = ({children, className, onClick}: cardProps) => {
  return (
    <div className={twMerge('bg-white shadow-md shadow-gray-300 rounded-md p-3 lg:p-4 lg:mb-4 mb-3', className)} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card