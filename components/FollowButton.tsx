'use client'

import { followUsers } from '@/actions/user.actions';
import { rawUserData } from '@/types';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsPersonDashFill, BsPersonPlusFill } from 'react-icons/bs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

type followButtonProps = {
  currentUser: rawUserData
  userId:string
  className?: string
}

const FollowButton = ({currentUser, userId, className}: followButtonProps) => {
  const followingAlready = currentUser.followings.includes(userId);

  const path = usePathname();

  const handleFollowUser = async() => {

    const followData = {
      userId: userId,
      path: path
    }
    
    try {
      const response = await followUsers(followData)
      
      if (response.success) {
        toast.success(response.success)
      }

      if (response.error) {
        toast.error(response.error)
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }
  return (
    <React.Fragment>
      {followingAlready ?
        <button className={twMerge('text-white px-4 bg-blue-500 py-1 mt-2 rounded-full flex items-center gap-4', className)} onClick={() => handleFollowUser()}>
          <BsPersonDashFill size={20}/>
          Unfollow
        </button> :
        <button className={twMerge('text-white px-4 bg-blue-500 py-1 mt-2 rounded-full flex items-center gap-4', className)} onClick={() => handleFollowUser()}>
          <BsPersonPlusFill size={20}/>
          Follow
        </button>
      }
    </React.Fragment>
  )
}

export default FollowButton;