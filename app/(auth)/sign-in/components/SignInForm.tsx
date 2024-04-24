'use client'


import React from 'react'
import { ControlledInput } from '@/components/Inputs'
import { BsEnvelope, BsLock} from 'react-icons/bs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import Button from '@/components/Button'
import { FcGoogle } from "react-icons/fc"
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/utils/validationSchemas' 
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

type Props = {}

const SignInForm = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const defaultSignInData = { email: '', password: ''};
  const { register, handleSubmit, formState: { errors }, reset} = useForm<FieldValues>({resolver: zodResolver(signInSchema), defaultValues: defaultSignInData});

  React.useEffect(() => {
    reset()
  }, [reset]);

  const onSubmit:SubmitHandler<FieldValues> = (data)=> {
    signIn('credentials', {...data, redirect: false})
    .then((callback) => {
      if (callback?.ok) {
        toast.success("Succesfully Logged In");
        router.refresh();
        router.push(next ? next : "/");
      }

      if (callback?.error) {
        toast.error(callback.error);
        console.log(callback.error)
      }
    })
  }

  return (
    <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} className='relative'>
      <div className="absolute -right-2 -top-2 z-50">
        <div className="w-16 h-16 lg:w-24 lg:h-24 overflow-hidden flex items-center justify-center">
          <Image src={'/images/app_logo.png'} fill priority alt='app-logo'/>
        </div>
      </div>
      <div className='mb-10'>
        <h2 className='lg:text-4xl text-3xl mb-1'>Login to your account</h2>
        <p>Don&apos;t have an account yet? <Link href={'/sign-up'} className='underline'>Create one right away</Link></p>
        <p className='mt-10 text-lg'>Welcome back, We are so excited to inform you that we added some new cool features and interface just to make your experience more fun and enable you create moments easily.</p>
      </div>
      <ControlledInput 
        placeholder='email e.g johndoe@gmail.com'
        inputElementStyle='bg-transparent text-white placeholder:text-gray-400 border border-gray-400 text-white'
        icon={BsEnvelope}
        register={register}
        required
        type='email' 
        id='email'
        error={errors.email?.message as string}
      />
      <ControlledInput 
        placeholder='password'
        inputElementStyle='bg-transparent text-white placeholder:text-gray-400 border border-gray-400 text-white'
        icon={BsLock}
        register={register}
        required
        type='password' 
        id='password'
        error={errors.password?.message as string}
      />
      <Button className='bg-green-600 mt-5 text-xl' type='submit'>Login</Button>
      <hr className='my-5'/>
      <Button className='px-10 bg-white text-black text-xl font-semibold' type='button' onClick={() => signIn('google')}>
        <div className="flex gap-x-4 items-center justify-center">
          <FcGoogle size={30}/>
          <div className='border-l px-4 border-neutral-600'>
            Continue With Google
          </div>
        </div>
      </Button>
    </form>
  )
}

export default SignInForm