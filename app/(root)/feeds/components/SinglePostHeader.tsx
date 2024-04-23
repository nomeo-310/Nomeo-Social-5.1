'use client'


import React from 'react'
import { singlePostData } from '@/types';
import PostMenu from './PostMenu';
import ImageAvatar from '@/components/ImageAvatar';
import { getTimeFormat } from '@/hooks/formatDate';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';


const SinglePostHeader = ({post, userId}:{post:singlePostData, userId:string}) => {

  const { postAuthor } = post;
  const { repostAuthor } = post;
  const [showMenu, setShowMenu] = React.useState(false);

  const router = useRouter();

  return (
    <React.Fragment>
      { post.isRepost ?
        <React.Fragment>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-2">
              <div className="w-fit">
                <ImageAvatar onClick={() => router.push(`/profile/${repostAuthor._id}`)} className='cursor-pointer' imageSrc={repostAuthor.image}/>
              </div>
              <div className="flex flex-col">
                <p><span className='capitalize'>{repostAuthor.name}</span> <span className='text-blue-500'>repost</span></p>
                <p className='text-gray-500'>{getTimeFormat(post.createdAt).distance} {post.postLocation ? post.postLocation : ''}.</p>
              </div>
            </div>
            <div className='relative'>
              <HiEllipsisHorizontal size={26} className='-mt-2 cursor-pointer' onClick={() => setShowMenu((prevState) => !prevState)}/>
              { showMenu && <PostMenu postId={post._id} post={post} userId={userId} setShowMenu={setShowMenu}/> }
            </div>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-fit">
                <ImageAvatar onClick={() => router.push(`/profile/${postAuthor._id}`)} className='cursor-pointer' imageSrc={postAuthor.image}/>
              </div>
              <div className="flex flex-col">
                <p><span className='capitalize'>{postAuthor.name}</span>&apos;s <span className='text-blue-500'>post</span></p>
              </div>
            </div>
          </div>
        </React.Fragment> :
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2">
            <div className="w-fit">
              <ImageAvatar onClick={() => router.push(`/profile/${postAuthor._id}`)} className='cursor-pointer' imageSrc={postAuthor.image}/>
            </div>
            <div className="flex flex-col">
              <p><span className='capitalize'>{postAuthor.name}</span> shared a <span className='text-blue-500'>post</span></p>
              <p className='text-gray-500'>{getTimeFormat(post.createdAt).distance} {post.postLocation ? post.postLocation : ''}.</p>
            </div>
          </div>
          <div className='relative'>
            <HiEllipsisHorizontal size={26} className='-mt-2 cursor-pointer' onClick={() => setShowMenu((prevState) => !prevState)}/>
            { showMenu && <PostMenu postId={post._id} post={post} userId={userId} setShowMenu={setShowMenu}/> }
          </div>
        </div>
      }
    </React.Fragment>
  )
};

export default SinglePostHeader