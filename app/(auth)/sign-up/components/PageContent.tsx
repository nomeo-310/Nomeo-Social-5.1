'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SignUpForm from './SignUpForm'
import AuthLayout from '../../components/AuthLayout'


const PageContent = () => {
  const router = useRouter();
  return (
    <AuthLayout type='signup' mobileImageSrc='/images/signupBanner_1a.jpg' desktopImageSrc='/images/signupBanner_1.jpg'>
      <SignUpForm/>
    </AuthLayout>
  )
}

export default PageContent