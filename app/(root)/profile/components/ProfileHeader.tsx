import React from 'react'
import Card from '@/components/Card'
import Image from 'next/image'
import ImageAvatar from '@/components/ImageAvatar'
import Link from 'next/link'
import { BsPersonFillGear } from 'react-icons/bs'
import FollowButton from '@/components/FollowButton'
import { rawUserData } from '@/types'
import NavItem from './NavItem'
import { tabList } from './data'

type profileHeaderProps = {
  userLoggedIn:boolean
  currentUser:rawUserData
  user: rawUserData
  activeTab:string
  handleClick: (value:string) => void
}

const ProfileHeader = ({user, userLoggedIn, currentUser,activeTab, handleClick}: profileHeaderProps) => {
  return (
    <Card className='p-0 lg:p-0 overflow-hidden'>
      <div className="w-full relative bg-gray-300 rounded-md aspect-video lg:h-60 h-44 flex items-center justify-center">
        <Image src={user.coverImage.secure_url !== '' ? user.coverImage.secure_url : '/images/defaultCoverImage.jpg'} alt='default_banner' fill className='object-cover' priority/>
      </div>
      <div className="-mt-10 md:-mt-10 lg:-mt-12 p-4 lg:pb-6 pb-12 flex items-center gap-3 relative">
        <div className="w-fit">
          <ImageAvatar className='lg:w-36 lg:h-36 w-20 h-20' imageSrc={user.image}/>  
        </div>
        <div className='lg:mt-6 mt-4 grow'>
          <h2 className='lg:text-3xl font-semibold text-2xl capitalize'>{user.name}</h2>
          <p className='lg:text-xl font-semibold text-gray-400 capitalize'>{user.state}, {user.country}.</p>
        </div>
        { userLoggedIn ?
          <Link href={'/editprofile'} className='text-white px-3 bg-blue-500 py-1 mt-2 rounded-full flex items-center gap-2 hover:bg-blue-400'>
            <BsPersonFillGear size={20}/>
            Edit Profile
          </Link> :
          <FollowButton currentUser={currentUser} userId={user._id}/>
        }
        <div className="absolute bottom-0 lg:left-44 left-0 w-full flex items-center justify-center lg:justify-start">
          {tabList.map((item:any) => (
            <NavItem name={item.name} icon={item.icon} key={item.name} active={activeTab === item.name} onClick={() => handleClick(item.name)}/>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ProfileHeader