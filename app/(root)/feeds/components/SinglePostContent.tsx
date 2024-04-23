'use client'

import React from 'react'
import Image from 'next/image';
import { singlePostData } from '@/types';


const SinglePostContent = ({post}:{post:singlePostData}) => {
  return (
    <div className="w-full mb-3 z-10">
      <p className='mb-3'>{post.postText}</p>
      { post.postImage.secure_url !== '' &&
        <div className=" aspect-video w-full overflow-hidden flex items-center justify-center relative rounded-md z-10">
          <Image src={post.postImage.secure_url} alt='post_image' fill className='object-cover z-10' priority/>
        </div>
      }
    </div>
  )
};

export default SinglePostContent