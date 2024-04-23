'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge';

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = React.forwardRef<HTMLButtonElement, buttonProps>(({className, children, type = 'button', disabled, ...props}, ref) => {
  return (
    <button type={type} className={twMerge('w-full rounded-full bg-blue-600 border border-transparent py-3 px-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-bold hover:opacity-75 transition', className)} disabled={disabled} ref={ref} {...props}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button;