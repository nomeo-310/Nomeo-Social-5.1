'use client'

import React from 'react'
import { IconType } from 'react-icons';
import { FieldValues, UseFormRegister } from "react-hook-form";
import { twMerge } from 'tailwind-merge'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

type controlledInputProps = {
  type: string
  id: string
  disabled?: boolean
  placeholder?: string
  required?: boolean
  icon: IconType
  inputElementStyle?: string
  error?: string
  register: UseFormRegister<FieldValues>;
  containerStyle?: string
}

type unControlledInputProps = {
  type: string
  id: string
  icon?:IconType
  disabled?: boolean
  placeholder?: string
  className?: string
  containerStyle?: string
  inputElementStyle?: string
  value?: string
  onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
}

const ControlledInput = ({type, id, disabled, placeholder, icon: Icon, inputElementStyle, error, register, containerStyle, required}: controlledInputProps) => {
  const [passwordState, setPasswordState] = React.useState('password');
  return (
    <div className={twMerge('mb-3 w-full', containerStyle)}>
      <div className="relative w-full">
        <input 
          type={ type === 'password' ? passwordState : type } 
          id={id} 
          disabled={disabled} 
          placeholder={placeholder} 
          className={twMerge('w-full rounded-md p-3.5 bg-grey pl-12 bg-neutral-200 placeholder:text-black focus:outline-none', inputElementStyle)}
          {...register(id, {required})}
          autoComplete='off'
        />
        <Icon size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        {type === 'password' && 
          <React.Fragment>
            { passwordState === 'password' ?
              (<BsEyeSlashFill size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setPasswordState("text")}/>) : 
              (<BsEyeFill size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setPasswordState("password")}/>)
            }
          </React.Fragment>
        }
      </div>
      <p className="mt-1 ml-2 text-red-400">{error}</p>
    </div>
  )
}

const UnControlledInput = ({containerStyle, type, id, disabled, placeholder, value, inputElementStyle, onChange, icon:Icon}: unControlledInputProps) => {
  return (
    <div className={twMerge('mb-3 w-full', containerStyle)}>
    <div className="relative w-full">
      <input 
        type={ type } 
        id={id} 
        disabled={disabled} 
        placeholder={placeholder} 
        className={twMerge('w-full rounded-md p-3.5 bg-grey pl-12 bg-neutral-200 placeholder:text-black focus:outline-none', inputElementStyle)}
        autoComplete='off'
        value={value}
        onChange={onChange}
      />
      {Icon && <Icon size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
    </div>
  </div>
  )
}

export { ControlledInput, UnControlledInput }