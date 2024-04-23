'use client'

import React from 'react'
import Card from '@/components/Card'
import ImageAvatar from '@/components/ImageAvatar'
import Link from 'next/link'
import { HiExclamationTriangle, HiOutlineTrash } from 'react-icons/hi2'
import AnimationWrapper from '@/components/AnimationWrapper'
import { notificationProps } from '@/types'
import { removeNotification } from '@/actions/notification.actions'
import { toast } from 'sonner'

type notificationCardProps = {
  notification: notificationProps
  active:boolean
  index: number

}

const NotificationCard = ({index, active, notification}: notificationCardProps) => {
  
  const { post } = notification;
  const { notificationCreatedBy } = notification;

  const deleteNotification = React.useCallback(async(id:string) => {

    try {
      const response = await removeNotification(id)
      if (response?.success) {
        toast.success(response.success)
      }

    } catch (error) {
      toast.error('Internal server error')
    }

  }, [])

  return (
    <AnimationWrapper key={index} transition={{duration: 1, delay: index*0.5}} keyValue={`${index}`} className='border-b last:border-b-0 relative'>
      <div className={active ? 'border-l-blue-500 border-l-[6px] text-blue-500 flex gap-3 p-2 group':  'group p-2 flex gap-3'}>
        {!notification.isBarred ?
          <div className="w-fit">
            <ImageAvatar className='w-10 h-10' imageSrc={notificationCreatedBy.image as string}/>
          </div> : 
          <div className="w-10 h-10 flex rounded-full bg-red-200 items-center justify-center">
            <HiExclamationTriangle size={24} className='text-red-500'/>
          </div>
        }
        <div className="grow">
          <p className={active ? 'text-blue-500 lg:text-lg line-clamp-1': 'text-gray-400 lg:text-lg line-clamp-1'}>
          {!notification.isBarred && <span className={active ? 'font-semibold text-blue-500': 'font-semibold text-black'}>{notificationCreatedBy.name}</span>} 
            <Link href={`/profile/${notificationCreatedBy._id}`} className={active ? 'underline text-blue-500 ml-2': 'underline text-black ml-2'}>{!notification.isBarred && notificationCreatedBy.username}</Link>
            { 
              notification.isLikedComment ? <span className='ml-2'>liked your comment on</span> : 
              notification.isComment ? <span className='ml-2'>comment on your post</span> : 
              notification.isReply ? <span className='ml-2'>replied on your comment on the post</span> :
              notification.isReport ? <span className='ml-2'>reported your post</span> :
              notification.isBarred ? <span className='ml-2'>Your post has been barred from being viewed by the public.</span> :
              notification.isLiked ? <span className='ml-2'>liked your post</span> : ''
            }
          </p>
          <p className='lg:text-xl text-lg'><Link href={`/post/${post._id}`} className={active ? 'text-blue-500 line-clamp-1 mt-1 underline': 'line-clamp-1 mt-1 underline'}>&ldquo;{post.postText }&rdquo;</Link></p>
        </div>
        <button className='p-2 rounded-full bg-red-300 absolute right-2 lg:top-3 top-2 opacity-0 group-hover:opacity-100 hover:scale-110' onClick={() => deleteNotification(notification._id)}>
          <HiOutlineTrash size={18} />
        </button>
      </div>
    </AnimationWrapper>
  )
}

export default NotificationCard