import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type imageAvatarProps = {
  className?: string
  onClick?: () => void
  imageSrc?: string
}

const ImageAvatar = ({className, onClick, imageSrc}: imageAvatarProps) => {
  return (
    <div className={twMerge('relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden', className)} onClick={onClick}>
      <Image src={imageSrc ? imageSrc : '/images/default_user.png'} alt='profile_image' fill/>
    </div>
  )
}

export default ImageAvatar