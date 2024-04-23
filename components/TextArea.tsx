import React from 'react'
import { twMerge } from 'tailwind-merge'

type textAreaProps = {
  className?:string
  placeholder?:string
  value: string
  onChange?: (event:React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({className, placeholder, value, onChange}: textAreaProps) => {
  return (
    <textarea 
      className={twMerge('w-full min-h-[60px] rounded-md focus:outline-none resize-none p-3', className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextArea