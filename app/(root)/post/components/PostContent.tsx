'use client'

import React from 'react'
import { rawUserData, singlePostData } from '@/types';
import Image from 'next/image';
import LikeButton from '@/components/LikeButton';
import { HiArrowPathRoundedSquare, HiOutlineChatBubbleLeft } from 'react-icons/hi2';
import Link from 'next/link';



const PostContent = ({post, currentUser}:{post:singlePostData, currentUser:rawUserData}) => {
  return (
    <div className="w-full mb-3 z-10">
      <p className='mb-3'>{post.postText}</p>
      { post.postImage.secure_url !== '' &&
        <div className=" aspect-video w-full overflow-hidden flex items-center justify-center relative rounded-md z-10">
          <Image src={post.postImage.secure_url} alt='post_image' fill className='object-cover z-10' priority/>
        </div>
      }
      <div className="flex items-center lg:gap-6 gap-4 pt-3">
        <div className="flex gap-1 items-center">
          <LikeButton userId={currentUser._id} likes={post.likes} postId={post._id}/>
          {post.totalLikes > 0 && <span>{post.totalLikes} {post.totalLikes > 1 ? 'likes' : 'like'} </span>}
        </div>
        <Link className="flex gap-1 items-center cursor-pointer" href={`/post/${post._id}`}>
          <HiOutlineChatBubbleLeft size={20}/>
          {post.totalComments > 0 && <span>{post.totalComments} {post.totalComments > 1 ? 'comments' : 'comment'} </span>}
        </Link>
        <div className="flex gap-1 items-center">
          <HiArrowPathRoundedSquare size={20}/>
          {post.totalReposts > 0 && <span>{post.totalReposts} {post.totalReposts > 1 ? 'reposts' : 'repost'} </span>}
        </div>
      </div>
    </div>
  )
};

export default PostContent