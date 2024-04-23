'use client'

import React from 'react'
import Card from '@/components/Card'
import ImageAvatar from '@/components/ImageAvatar';
import Image from 'next/image';
import { UnControlledInput } from '@/components/Inputs';
import { HiArrowPathRoundedSquare, HiOutlineChatBubbleLeft, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi2';
import { singleComment, rawUserData, singlePostData } from '@/types';
import { getTimeFormat } from '@/hooks/formatDate';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { createComment, createReply } from '@/actions/comment.actions';
import Link from 'next/link';
import LikeButton from '@/components/LikeButton';
import AnimationWrapper from '@/components/AnimationWrapper';
import EmptyState from '@/components/EmptyState';
import CommentLikeButton from '@/components/CommentLikeButton';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import CreateComment from './CreateComment';
import SingleComment from './SingleComment';

type postClientProps = {
  post: singlePostData
  currentUser: rawUserData;
  comments: singleComment[]
}

const PostClient = ({post, currentUser, comments}: postClientProps) => {
  const path = usePathname();
  console.log(post.postReported)

  return (
    <Card>
      <PostHeader post={post}/>
      <PostContent post={post} currentUser={currentUser}/>
      <hr/>
      <CreateComment currentUser={currentUser} post={post} path={path} />
      <hr/>
      { comments.length == 0 &&
        <EmptyState message='No comments yet'/>
      }
      { comments.length > 0 && comments.map((comment:singleComment, index:number) => (
        <AnimationWrapper key={index} keyValue={comment._id} transition={{duration: 1, delay: index*0.5}} className='border-b last:border-b-0'>
          <SingleComment comment={comment} currentUser={currentUser} post={post} path={path}/>
        </AnimationWrapper>
      ))}
    </Card>
  )
}

export default PostClient;