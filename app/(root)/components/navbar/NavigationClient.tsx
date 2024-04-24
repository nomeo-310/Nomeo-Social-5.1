'use client'

import React from 'react'
import Card from '@/components/Card'
import NavigationItem from './NavigationItem'
import { HiOutlineHome, HiOutlineUserGroup, HiOutlineBookmark, HiOutlineBell, HiArrowLeftOnRectangle, HiOutlineMagnifyingGlass, HiBars3 } from "react-icons/hi2"
import { usePathname, useRouter } from 'next/navigation'
import ImageAvatar from '@/components/ImageAvatar'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import { signOut } from 'next-auth/react'
import { rawUserData } from '@/types'
import { fetchNotificationCounts } from '@/actions/notification.actions'

type navigationClientProps = {
  currentUser:rawUserData
  notificationCount: number
};

const NavigationClient = ({currentUser, notificationCount}: navigationClientProps) => {

  const currentPath = usePathname();
  const route = useRouter();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const navigation = [
    {
      label:'Home',
      href: '/',
      icon: HiOutlineHome
    },
    {
      label:'Friends',
      href: '/friends',
      icon: HiOutlineUserGroup
    },
    {
      label:'Saved Posts',
      href: '/saved-posts',
      icon: HiOutlineBookmark
    },
    {
      label:'Notifications',
      href: '/notifications',
      icon: HiOutlineBell
    },
  ];

  const SearchBar = () => {
    const handleToggleMobileMenu = () => {
      setShowMobileMenu((prevState) => !prevState);
      if (!showMobileMenu) {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
    }
    return (
      <>
        <Card className='cursor-pointer hidden md:block w-fit pr-16 py-3 pl-4 rounded-full' onClick={() => route.push('/search')}>
          <HiOutlineMagnifyingGlass size={26} />
        </Card>
        <Card className='cursor-pointer md:hidden w-fit py-3 px-6 rounded-full mb-0 flex items-center gap-3'>
          <HiBars3 size={26} onClick={handleToggleMobileMenu}/>
          <div className='border-l border-black pl-3'>
            <HiOutlineMagnifyingGlass size={26} onClick={() => route.push('/search')}/>
          </div> 
        </Card>
      </>
    )
  };

  const NavigationMenu = () => {
    return (
      <Card>
        <h2 className='mb-8 text-3xl text-semibold text-gray-400 mt-3'>Navigation</h2>
        <div className='flex items-center justify-between -mx-4 pb-4 px-4 cursor-pointer'>
          <ImageAvatar className='hover:opacity-75'  onClick={() =>route.push(`/profile/${currentUser?._id}`)} imageSrc={currentUser?.image}/>
          <button className='flex items-center gap-x-2 py-3 px-6 rounded-full border hover:bg-green-600 hover:text-white border-green-600 text-green-600' onClick={() => signOut()}>
            <p className='lg:text-lg font-semibold'>Signout</p>
            <HiArrowLeftOnRectangle size={26}/>
          </button>
        </div>
        <div className='px-3 py-0'>
          <div className='flex flex-col'>
            <NavigationItem
              label='Home'
              href='/'
              icon={HiOutlineHome}
              active={currentPath === '/'}
            />
            <NavigationItem
              label='Friends'
              href='/friends'
              icon={HiOutlineUserGroup}
              active={currentPath === '/friends'}
              counter={currentUser?.totalFollowers ? currentUser?.totalFollowers : undefined}
            />
            <NavigationItem
              label='Saved Posts'
              href='/saved-posts'
              icon={HiOutlineBookmark}
              active={currentPath === '/saved-posts'}
              counter={currentUser?.totalSavedPosts > 0 ? currentUser?.totalSavedPosts : undefined}
            />
            <NavigationItem
              label='Notifications'
              href='/notifications'
              icon={HiOutlineBell}
              active={currentPath === '/notifications'}
              counter={notificationCount > 0 ? notificationCount : undefined}
            />
          </div>
        </div>
      </Card>
    )
  };

  const MobileNavigationItem = ({href, active, icon: Icon, label}: {href:string, active:boolean, icon:IconType, label:string}) => {
    const handleClick =(href:string) => {
      route.push(href);
      setShowMobileMenu(false);
    }

    return (
      <button onClick={() => handleClick(href)} className={twMerge('flex items-center gap-2 hover:text-green-600 text-gray-400', ( active && 'group p-2 rounded-full text-white bg-green-600 hover:bg-green-600 hover:text-white'))}>
        <Icon size={21}/>
        <h2 className='font-semibold'>{label}</h2>
      </button>
    )
  }

  return (
    <React.Fragment>
      <div className="hidden md:block">
        <SearchBar/>
        <NavigationMenu/>
      </div>
      <div>
        <div className="md:hidden flex items-center justify-between mb-3 z-30">
          <SearchBar/>
          <div className='flex items-center gap-3'>
            <ImageAvatar className='hover:opacity-75 w-12 h-12 cursor-pointer' onClick={() =>route.push(`/profile/${currentUser?._id}`)} imageSrc={currentUser?.image}/>
            <button className='flex items-center gap-x-2 bg-white py-3 px-6 rounded-full shadow-md hover:bg-green-600 hover:text-white border-green-600' onClick={() =>signOut()}>
              <p className='font-semibold'>Signout</p>
              <HiArrowLeftOnRectangle size={26}/>
            </button>
          </div>
        </div>
        { showMobileMenu &&
          <Card className='p-2 md:hidden rounded-full'>
            <div className='flex items-center justify-between'>
              {navigation.map((item:any, index:number) => (
                <MobileNavigationItem href={item.href} icon={item.icon} key={index} active={item.href === currentPath} label={item.label}/>)
              )}
            </div>
          </Card>
        }
      </div>
    </React.Fragment>
  )
}

export default NavigationClient