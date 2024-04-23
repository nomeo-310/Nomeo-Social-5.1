'use client'

import Card from '@/components/Card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SinglePost from '../../feeds/components/SinglePost'
import FriendCard from '../../friends/components/FriendCard'
import { BsBriefcase, BsFacebook, BsGeoAlt, BsGlobe2, BsInstagram, BsTwitter } from 'react-icons/bs'
import { getFullDateFormat } from '@/hooks/formatDate'
import { followDataProps, rawUserData, singleImageData, singlePostData, userFriends } from '@/types'
import EmptyState from '@/components/EmptyState'
import AnimationWrapper from '@/components/AnimationWrapper'

type profileContentProps = {
  activeTab: string,
  user: rawUserData
  userPosts: singlePostData[]
  userReposts: singlePostData[]
  currentUser:rawUserData
  userAlbum:singleImageData[]
  userFriends: userFriends
}

const ProfileContent = ({user, activeTab, userPosts, userReposts, currentUser, userAlbum, userFriends}: profileContentProps) => {

  const [postState, setPostState] = React.useState('posts');
  const [friendState, setFriendState] = React.useState('followers');
  return (
    <React.Fragment>
      {activeTab === 'about' && 
        <Card>
          <div className='flex flex-col gap-3'>
            <div>
              <h2 className='lg:text-2xl text-xl mb-2'>About me:</h2>
              <p className='text-gray-400 text-lg'>{user.bio ? user.bio : 'Nothing to see yet'}</p>
            </div>
            <div>
              <h2 className='lg:text-2xl text-xl mb-2'>Personal details:</h2>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 text-gray-400'>
                  <BsBriefcase size={20}/>
                  Occupation : {user.occupation}
                </div>
                <div className='flex items-center gap-2 text-gray-400 capitalize'>
                  <BsGeoAlt size={20}/>
                  Location : {user.state}, {user.country}.
                </div>
              </div>
            </div>
            <div>
              <h2 className='lg:text-2xl text-xl mb-2'>You can follow me on:</h2>
              <div className='flex items-center gap-3'>
                { user.twitterUrl === '' && user.facebookUrl === ''  && user.instagramUrl === ''  && user.personalWebsite === ''  &&
                  <h2 className='text-lg text-gray-400'>No social media link provided.</h2>
                }
                { user.twitterUrl &&
                  <a href={user.twitterUrl} className='p-2 rounded-full bg-gray-100 shadow-md'>
                    <BsTwitter size={20}/>
                  </a>
                }
                { user.facebookUrl && 
                  <a href={user.facebookUrl} className='p-2 rounded-full bg-gray-100 shadow-md'>
                    <BsFacebook size={20} />
                  </a>
                }
                { user.instagramUrl &&
                  <a href={user.instagramUrl} className='p-2 rounded-full bg-gray-100 shadow-md'>
                    <BsInstagram size={20}/>
                  </a>
                }
                { user.personalWebsite &&
                  <a href={user.personalWebsite} className='p-2 rounded-full bg-gray-100 shadow-md'>
                    <BsGlobe2 size={20}/>
                  </a>
                }
              </div>
            </div>
            <div className="mt-6">
              <h2 className='lg:text-2xl text-xl'>Joined: <span className='text-gray-400 lg:text-2xl text-xl'>{getFullDateFormat(user.createdAt as string)}</span></h2>
            </div>
          </div>
        </Card>
      }

      {activeTab === 'photos' && 
        <React.Fragment>
          { userAlbum && userAlbum.length == 0 &&
            <EmptyState message='No photos yet'/>
          }
          <div className="grid grid-cols-2 gap-2 lg:gap-3 w-full mt-4">
            {userAlbum && userAlbum.length > 0 && userAlbum.map((item:singleImageData, index:number) => (
              <AnimationWrapper transition={{duration: 1, delay: index*0.5}} key={index} >
                <div className="aspect-video w-full relative rounded-md overflow-hidden bg-gray-300 group cursor-pointer">
                  <Image src={item.postImage.secure_url} alt='photo_album' fill priority className='object-cover'/>
                  <div className='absolute left-0 top-0 w-full h-full hover:bg-blue-600/40 z-10 flex items-center'>
                    <Link href={`/post/${item._id}`} className='text-white underline opacity-0 group-hover:opacity-100 p-4 line-clamp-1'>{item.postText}</Link>
                  </div>
                </div>
              </AnimationWrapper>
            ))}
          </div>
        </React.Fragment>
      }

      {activeTab === 'posts' && 
        <React.Fragment>
          <Card className='w-fit py-3 px-6 rounded-full flex gap-3 cursor-pointer'>
            <div className={postState === 'posts' ? 'text-blue-500 font-semibold flex items-center gap-6': ' flex items-center gap-6'} onClick={() => setPostState('posts')}>
              Posts
              {userPosts && userPosts.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500'>{userPosts.length}</span>}
            </div>
            <div className={postState === 'reposts' ? 'text-blue-500 font-semibold border-l pl-3 flex items-center gap-6': 'border-l pl-3 flex items-center gap-6'} onClick={() => setPostState('reposts')}>
              Reposts
              {userReposts && userReposts.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500'>{userReposts.length}</span>}
            </div>
          </Card>
          { postState === 'posts' ?
            <React.Fragment>
              { userPosts && userPosts.length == 0 &&
                <EmptyState message='No created posts yet'/>
              }
              {userPosts && userPosts.length > 0 && userPosts.map((post:singlePostData, index:number) => (
                <SinglePost key={post._id} post={post} userId={currentUser._id} index={index}/>
              ))}
            </React.Fragment> :
            <React.Fragment>
              { userReposts && userReposts.length == 0 &&
                <EmptyState message='No reposts yet'/>
              }
              { userReposts  && userReposts .length > 0 && userReposts .map((post:singlePostData, index:number) => (
                <SinglePost key={post._id} post={post} userId={currentUser._id} index={index} />
              ))}
            </React.Fragment>
          }
        </React.Fragment>
      }

      {activeTab === 'friends' && 
        <React.Fragment>
          <Card className='w-fit py-3 px-6 rounded-full flex gap-3 cursor-pointer'>
            <div onClick={() => setFriendState('followers')} className={friendState === 'followers' ? 'text-blue-500 font-semibold flex items-center gap-6': 'flex items-center gap-6'}>
              Followers
              {userFriends.followers.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500'>{userFriends.followers.length}</span>}
            </div>
            <div className={friendState === 'followings' ? 'text-blue-500 font-semibold border-l pl-3 flex items-center gap-6': 'border-l pl-3 flex items-center gap-6'} onClick={() => setFriendState('followings')}>
              Followings
              {userFriends.followings.length > 0 && <span className='w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500'>{userFriends.followings.length}</span>}
            </div>
          </Card>
          { friendState === 'followers' ?
            <React.Fragment>
              { userFriends?.followers && userFriends.followers.length == 0 &&
                <EmptyState message='No followers yet'/>
              }
              { userFriends?.followers && userFriends.followers.length > 0 &&  
              userFriends.followers.map((follower:followDataProps, index:number) => (
                <FriendCard key={follower._id} currentUser={currentUser} user={follower} index={index}/>
              ))}
            </React.Fragment> :
            <React.Fragment>
              { userFriends?.followings && userFriends.followings.length == 0 &&
                <EmptyState message='No followings yet'/>
              }
              { userFriends?.followings && userFriends.followings.length > 0 &&  
              userFriends.followings.map((following:followDataProps, index:number) => (
                <FriendCard key={following._id} currentUser={currentUser} user={following} index={index}/>
              ))}
            </React.Fragment>
          }
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default ProfileContent