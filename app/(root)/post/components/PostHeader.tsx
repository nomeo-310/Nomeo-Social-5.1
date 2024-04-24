'use client'



import React from 'react'
import { singlePostData } from '@/types';
import ImageAvatar from '@/components/ImageAvatar';
import { getTimeFormat } from '@/hooks/formatDate';


const PostHeader = ({post}:{post:singlePostData}) => {

  const { repostAuthor } = post;
  const { postAuthor } = post;

  return (
    <React.Fragment>
      { post.isRepost ?
        <React.Fragment>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-2">
              <div className="w-fit">
                <ImageAvatar className='cursor-pointer' imageSrc={repostAuthor.image}/>
              </div>
              <div className="flex flex-col">
                <p><span className='capitalize'>{repostAuthor.name}</span> <span className='text-green-600'>repost</span></p>
                <p className='text-gray-500'>{getTimeFormat(post.createdAt).distance} {post.postLocation ? post.postLocation : ''}.</p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-fit">
                <ImageAvatar className='cursor-pointer' imageSrc={postAuthor.image}/>
              </div>
              <div className="flex flex-col">
                <p><span className='capitalize'>{postAuthor.name}</span>&apos;s <span className='text-green-600'>post</span></p>
              </div>
            </div>
          </div>
        </React.Fragment> :
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2">
            <div className="w-fit">
              <ImageAvatar className='cursor-pointer' imageSrc={postAuthor.image}/>
            </div>
            <div className="flex flex-col">
              <p><span className='capitalize'>{postAuthor.name}</span> shared a <span className='text-green-600'>post</span></p>
              <p className='text-gray-500'>{getTimeFormat(post.createdAt).distance} {post.postLocation ? post.postLocation : ''}.</p>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
};

export default PostHeader