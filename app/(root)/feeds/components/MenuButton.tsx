'use client'


import React from 'react'
import { IconType } from 'react-icons'

type menuButtonProps = {
  icon:IconType
  label:string
  onClick: () => void
}

const MenuButton =({icon:Icon, label, onClick}:menuButtonProps) => {
  return (
    <button className='flex items-center gap-2 py-2 rounded-md hover:bg-blue-500 hover:text-white lg:-mx-6 -mx-5 px-5 lg:px-6' onClick={onClick}>
      <Icon size={18}/>
      <h2>{label}</h2>
    </button>
  )
};

export default MenuButton