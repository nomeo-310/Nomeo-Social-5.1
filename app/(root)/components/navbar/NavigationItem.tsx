'use client'

import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type navigationItemProps = {
  href:string
  active?: boolean
  label: string
  icon:IconType
  counter?: number
}

const NavigationItem = ({href, active, label, icon: Icon, counter}: navigationItemProps) => {

  return (
    <Link href={href} className={twMerge('flex items-center  justify-between py-3 hover:bg-green-300 hover:-mx-6 hover:px-6 my-2 rounded-md transition-all hover:scale-110 hover:shadow-md hover:shadow-gray-300', ( active && 'bg-green-600 text-white my-2 -mx-6 py-3.5 scale-110 rounded-md px-6 shadow-md shadow-gray-300 hover:-mx-6 hover:px-6 hover:bg-green-600'))}>
      <div className="flex items-center gap-3">
        <Icon size={25}/>
        <h2 className='font-bold text-lg'>{label}</h2>
      </div>
      { counter && counter > 0  && counter !== 0 && <div className={(active ? 'bg-white text-black': 'bg-green-600 text-white') + ' w-8 h-8 rounded-full flex items-center justify-center'}>{ counter === 0 ? '' : counter > 0 ? counter : null }</div> }
    </Link>
  )
}

export default NavigationItem