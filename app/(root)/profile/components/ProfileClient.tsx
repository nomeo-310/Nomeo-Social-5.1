'use client'

import React from 'react'
import { rawUserData, singleImageData, singlePostData, userFriends } from '@/types'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { testImages } from './data'

type profileClientProps = {
  user:rawUserData
  currentUser:rawUserData
  userPosts: singlePostData[]
  userReposts: singlePostData[]
  userAlbum: singleImageData[]
  userFriends: any
}


const ProfileClient = ({user, currentUser, userPosts, userReposts, userAlbum, userFriends}: profileClientProps) => {
  const [activeTab, setActiveTab] = React.useState('about');

  const handleClick = (tabName:string) => {
    setActiveTab(tabName);
  };

  const userLoggedIn = user._id === currentUser._id;

  return (
  <React.Fragment>
    <ProfileHeader
      user={user}
      userLoggedIn={userLoggedIn}
      activeTab={activeTab}
      handleClick={handleClick}
      currentUser={currentUser}
    />
    <ProfileContent
      user={user}
      activeTab={activeTab}
      userPosts={userPosts}
      userReposts={userReposts}
      currentUser={currentUser}
      userAlbum={userAlbum}
      userFriends={userFriends}
    />
  </React.Fragment>
  )
}

export default ProfileClient