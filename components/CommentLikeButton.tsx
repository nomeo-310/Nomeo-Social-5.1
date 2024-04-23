'use client'


import React from 'react'
import { likePost } from '@/actions/post.action'
import { usePathname } from 'next/navigation'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'
import { toast } from 'sonner'
import { likeComment } from '@/actions/comment.actions'

type likeButtonProps = {
  userId: string
  likes: string[]
  commentId: string
  commentAuthor: string
  postId: string
}

const CommentLikeButton = ({userId, likes, commentId, commentAuthor, postId}: likeButtonProps) => {
  const alreadyLiked = likes.includes(userId);
  const path = usePathname();

  const handleLikePost = async () => {

    const likePostData = {
      userId: userId,
      commentId: commentId,
      commentAuthor: commentAuthor,
      postId: postId,
      path: path
    }

    try {
      const response = await likeComment(likePostData);
      
      if (response?.success) {
        toast.success(response.success)
      }

      if (response?.error) {
        toast.error(response.error)
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }
  return (
    <React.Fragment>
      <button onClick={() => handleLikePost()}>
        { alreadyLiked ?
          <HiHeart size={20} className='text-red-400'/> : 
          <HiOutlineHeart size={20}/>
        }
      </button>
    </React.Fragment>
  )
}

export default CommentLikeButton