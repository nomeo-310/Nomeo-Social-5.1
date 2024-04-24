'use client'


import React from 'react'
import ImageAvatar from '@/components/ImageAvatar';
import { rawUserData, singleComment, singlePostData } from '@/types';
import { toast } from 'sonner';
import { createReply } from '@/actions/comment.actions';
import { UnControlledInput } from '@/components/Inputs';

const CreateReply = ({comment, currentUser, post, path}:{comment:singleComment, currentUser:rawUserData, post:singlePostData, path:string}) => {
  const { commentAuthor } = comment
  const [replyText, setReplyText] = React.useState('');

  const handleCreateReply = async () => {

    if (replyText.length < 5 || replyText === '') {
      toast.error('The reply field cannot be empty!')

      return;
    }

    const replyData = {
      parentComment: comment._id,
      commentAuthor: commentAuthor._id,
      postId: post._id,
      commentText: replyText,
      commentType: 'reply',
      userId: currentUser._id,
      path: path
    }

    try {
      const response = await createReply(replyData)

      if (response.success) {
        toast.success(response.success);
        setReplyText('');
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  };

  return (
    <div className='flex items-center'>
      <div className="w-fit">
        <ImageAvatar className='w-11 h-11' imageSrc={currentUser.image} />
      </div>
      <div className='flex gap-3 grow items-center'>
        <UnControlledInput
          inputElementStyle='px-3 bg-white'
          placeholder='reply the comment...' 
          type={'text'} 
          id={'comment'}
          value={replyText}
          onChange={(event) => setReplyText(event.target.value)}
        />
        <div>
          <button className='bg-green-600 py-2 px-6 rounded-full text-white' onClick={() => handleCreateReply()}>Reply</button>
        </div>
      </div>
    </div>
  )
}

export default CreateReply