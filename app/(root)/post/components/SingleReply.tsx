'use client'

import React from 'react'
import ImageAvatar from '@/components/ImageAvatar'
import { rawUserData, singleComment } from '@/types'
import { getTimeFormat } from '@/hooks/formatDate'
import { HiOutlineTrash } from 'react-icons/hi2'
import { usePathname } from 'next/navigation'
import { deleteComment } from '@/actions/comment.actions'
import { toast } from 'sonner'


const SingleReply = ({comment, currentUser}:{comment:singleComment, currentUser:rawUserData}) => {
  const { commentAuthor } = comment
  const path = usePathname();
  const commentAuthorLoggedIn = commentAuthor._id === currentUser._id;

  const handleDeleteComment = React.useCallback(async() => {

    const deleteData = {
      userId: currentUser._id, 
      commentId:comment._id, 
      path: path
    }

    try {
      const response = await deleteComment(deleteData)
      if (response?.success) {
        toast.success(response.success)
      }
    } catch (error) {
      toast.error('Internal server error')
    }

  }, [comment._id, path, currentUser._id])
  
  return (
    <div className='flex gap-2 pt-3 w-full' >
      <div className="w-fit">
        <ImageAvatar className='w-11 h-11' imageSrc={commentAuthor.image}/>
      </div>
      <div className='flex flex-col w-full grow'>
        <div className="w-full flex justify-between">
          <div>
            <div>
              <p>{commentAuthor.name}</p>
              <p className='text-sm text-gray-400'>{getTimeFormat(comment.createdAt).distance}</p>
            </div>
            <p>{comment.commentText}</p>
          </div>
          <div>
            { commentAuthorLoggedIn &&
              <button className='p-2 bg-red-200 rounded-full hover:bg-red-300' onClick={() => handleDeleteComment()}>
                <HiOutlineTrash size={18}/>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleReply