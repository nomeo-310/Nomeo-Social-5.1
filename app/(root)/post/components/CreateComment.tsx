'use client'


import React from 'react'
import { rawUserData, singlePostData } from '@/types';
import { toast } from 'sonner';
import { createComment } from '@/actions/comment.actions';
import ImageAvatar from '@/components/ImageAvatar';
import { UnControlledInput } from '@/components/Inputs';



const CreateComment = ({currentUser, path, post}:{currentUser:rawUserData, post:singlePostData, path:string}) => {
  const [commentText, setCommentText] = React.useState('');

  const commentData = {
    commentText: commentText,
    commentAuthor: currentUser._id as string,
    commentType: 'comment',
    postId: post._id,
    path: path
  }

  const handleCreateComment = async () => {

    if (commentText.length < 5 || commentText === '') {
      toast.error('Comment field cannot be empty')

      return;
    }

    try {
      const response = await createComment(commentData);

      if (response.success) {
        toast.success(response.success);
        setCommentText('');
      }

      if (response.error) {
        toast.error(response.error)
      }

    } catch (error) {
      toast.error('Internal server error')
    }

  }
  
  return (
    <div className='flex items-center'>
      <div className="w-fit">
        <ImageAvatar className='w-11 h-11' imageSrc={currentUser?.image}/>
      </div>
      <div className='flex gap-3 grow items-center'>
        <UnControlledInput
          inputElementStyle='px-3 bg-white'
          placeholder='share a comment...' 
          type={'text'} 
          id={'comment'}
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <div>
          <button className='bg-green-600 py-2 px-6 rounded-full text-white' onClick={() =>handleCreateComment()}>Comment</button>
        </div>
      </div>
    </div>
  )
};

export default CreateComment