'use client'

import React from 'react'
import { singleComment, rawUserData, singlePostData } from '@/types';
import { toast } from 'sonner';
import { HiOutlineChatBubbleLeft, HiOutlineTrash } from 'react-icons/hi2';
import CommentLikeButton from '@/components/CommentLikeButton';
import { getTimeFormat } from '@/hooks/formatDate';
import ImageAvatar from '@/components/ImageAvatar';
import CreateReply from './CreateReply';
import SingleReply from './SingleReply';
import AnimationWrapper from '@/components/AnimationWrapper';
import { deleteComment } from '@/actions/comment.actions';


const SingleComment = ({comment, currentUser, post, path}:{comment:singleComment, currentUser:rawUserData, post:singlePostData, path:string}) => {
  const { commentAuthor } = comment
  const commentAuthorLoggedIn = commentAuthor._id === currentUser._id;

  const [showReply, setShowReply] = React.useState(false);

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
    <div className='flex gap-2 pt-3' >
      <div className="w-fit">
        <ImageAvatar className='w-11 h-11' imageSrc={commentAuthor.image}/>
      </div>
      <div className='w-full'>
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
        <div className="flex pt-3 pb-2 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex gap-1 items-center">
              <CommentLikeButton userId={currentUser._id} likes={comment.likes} postId={post._id} commentAuthor={commentAuthor._id} commentId={comment._id}/>
              {comment.totalLikes > 0 && <span>{comment.totalLikes} {comment.totalLikes > 1 ? 'likes' : 'like'} </span>}
            </div>
            <div className="flex gap-1 items-center cursor-pointer" onClick={() => setShowReply((prevState) => !prevState)}>
              <HiOutlineChatBubbleLeft size={20}/>
              {comment.totalChildrenComments > 0 && <span>{comment.totalChildrenComments} {comment.totalChildrenComments > 1 ? 'replies' : 'reply'} </span>}
            </div>
          </div>
        </div>
        { showReply &&
          <React.Fragment>
            <hr/>
            {comment.childrenComments && comment.childrenComments.length > 0 && 
              comment.childrenComments.map((comment:any, index:number) => (
                <AnimationWrapper key={index} keyValue={comment._id} transition={{duration: 1, delay: index*0.5}} className='border-b pb-2'>
                  <SingleReply comment={comment} currentUser={currentUser}/>
                </AnimationWrapper>
              ))
            }
            <CreateReply comment={comment} currentUser={currentUser} path={path} post={post}/>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default SingleComment