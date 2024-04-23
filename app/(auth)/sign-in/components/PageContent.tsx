'use client'

import React from 'react'
import SignInForm from './SignInForm'
import AuthLayout from '../../components/AuthLayout'



const PageContent = () => {
  return (
    <AuthLayout type='signin' mobileImageSrc='/images/loginBanner_1a.jpg' desktopImageSrc='/images/loginBanner_1.jpg'>
      <SignInForm/>
    </AuthLayout>
  )
}

export default PageContent