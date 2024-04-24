'use client'

import React from 'react'
import Card from '@/components/Card'
import NotificationCard from './NotificationCard'
import { notificationProps } from '@/types'
import EmptyState from '@/components/EmptyState'
import { usePathname } from 'next/navigation'
import { clearAllNotifications, seenNotification } from '@/actions/notification.actions'
import { BsTrash2 } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi2'
import { toast } from 'sonner'


const NotificationClient = ({notifications}:{notifications: notificationProps[]}) => {
  const path = usePathname();

  const seeNotifications = React.useCallback(async() => {
    const ids:string[] = notifications.map((notification:notificationProps) => notification._id);
    
    try {
      await seenNotification({ids: ids, path: path})
    } catch (error) {
      console.error(error)
    }
  }, [notifications, path]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(seeNotifications, 8000);
    return () => clearTimeout(delayDebounceFn);
  }, [seeNotifications]);

  const deleteNotification = React.useCallback(async() => {

    try {
      const response = await clearAllNotifications()
      if (response?.success) {
        toast.success(response.success)
      }

    } catch (error) {
      toast.error('Internal server error')
    }

  }, [])

  return (
    <React.Fragment>
      <div className='w-full flex justify-between items-center sticky md:top-4 top-20 z-30 bg-white'>
        <h2 className='lg:text-6xl text-4xl font-bold text-gray-400 mb-4'>Notifications</h2>
        { notifications && notifications.length > 0 && 
          <button className='px-4 py-2 rounded-full flex gap-2 items-center bg-red-200 transition-all hover:bg-red-300 hover:scale-110' onClick={() => deleteNotification()}> 
            Clear all <HiOutlineTrash/>
          </button> 
        }
      </div>
      { notifications && notifications.length === 0 ?
        <EmptyState message='No notifications yet'/> :
        <Card>
          { notifications && notifications.length > 0 && notifications.map((notification:notificationProps, index:number) => (
            <NotificationCard  key={index} index={index} notification={notification} active={!notification.notificationSeen}/>
          ))}
        </Card>
      }
    </React.Fragment>
  )
}

export default NotificationClient