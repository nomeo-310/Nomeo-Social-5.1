'use client'


import React from 'react'
import { ControlledInput } from '@/components/Inputs'
import { BsEnvelope, BsLock, BsPerson } from 'react-icons/bs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import Button from '@/components/Button'
import { FcGoogle } from "react-icons/fc"
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from '@/utils/validationSchemas'
import { createUser } from '@/actions/user.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


const SignUpForm = () => {
  const router = useRouter();
  const defaultSignUpData = { fullname: '', email: '', password: '' };
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({resolver: zodResolver(signUpSchema), defaultValues: defaultSignUpData});

  React.useEffect(() => {
    reset()
  }, [reset]);

  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const { fullname, email, password } = data;
    const signUpData = {name:fullname, email: email, password:password}
    try {
      const response = await createUser(signUpData);
      console.log(response.error);
      if (response.error) {
        toast.error(response.error)
      }
      if (response.success) {
        toast.success(response.success);
        router.push('/sign-in')
      }
    } catch (error) {
      toast.error('Internal server error, try again')
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-6'>
        <h2 className='lg:text-4xl text-3xl mb-1'>Create an account</h2>
        <p>Already have an account? <Link href={'/sign-in'} className='underline'>Go ahead and login</Link></p>
        <p className='mt-6 text-lg'>Welcome to Nomeo Social, a social community that encourage connections and creativity.</p>
      </div>
      <ControlledInput 
        placeholder='fullname e.g john doe'
        inputElementStyle='bg-transparent text-white placeholder:text-gray-400 border border-gray-400 text-white'
        icon={BsPerson}
        register={register}
        required
        type='text' 
        id='fullname'
        error={errors.fullname?.message as string}
      />
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
      <Button className='mt-5 text-xl' type='submit'>Create Account</Button>
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

export default SignUpForm