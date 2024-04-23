import LikeButton from '@/components/LikeButton';
import { singlePostData } from '@/types';
import Link from 'next/link';
import React from 'react'
import { HiArrowPathRoundedSquare, HiBookmark, HiOutlineBookmark, HiOutlineChatBubbleLeft } from 'react-icons/hi2';

type Props = {}

const SinglePostControls = ({post, userId}:{post:singlePostData, userId:string}) => {

  const alreadySavedPost = post.saves.includes(userId)
  return (
    <div className="flex items-center lg:gap-6 gap-4 pt-3">
      <div className="flex gap-1 items-center">
        <LikeButton userId={userId} likes={post.likes} postId={post._id}/>
        {post.totalLikes > 0 && <span>{post.totalLikes} {post.totalLikes > 1 ? 'likes' : 'like'} </span>}
      </div>
      <Link className="flex gap-1 items-center cursor-pointer" href={`/post/${post._id}`}>
        <HiOutlineChatBubbleLeft size={20}/>
        {post.totalComments > 0 && <span>{post.totalComments} {post.totalComments > 1 ? 'comments' : 'comment'} </span>}
      </Link>
      <div className="flex gap-1 items-center">
        { alreadySavedPost ? <HiBookmark size={20} className='text-blue-500'/> : <HiOutlineBookmark size={20}/> }
        { post.totalSaves > 0 && <span>{post.totalSaves} {post.totalSaves > 1 ? 'saves' : 'save'} </span>}
      </div>
      <div className="flex gap-1 items-center">
        <HiArrowPathRoundedSquare size={20}/>
        {post.totalReposts > 0 && <span>{post.totalReposts} {post.totalReposts > 1 ? 'reposts' : 'repost'} </span>}
      </div>
    </div>
  )
};

export default SinglePostControls