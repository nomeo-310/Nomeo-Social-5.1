'use client'

import React from 'react'
import SinglePost from '../../feeds/components/SinglePost'
import { rawPostData, rawUserData, singlePostData } from '@/types'
import EmptyState from '@/components/EmptyState'

type savedPostClientProps = {
  savedPost: rawPostData[]
  currentUser: rawUserData | null
}

const SavedPostClient = ({savedPost, currentUser}: savedPostClientProps) => {
  return (
    <React.Fragment>
      <h2 className='lg:text-6xl text-4xl font-bold text-gray-400 mb-4 sticky md:top-4 top-24 z-30 bg-white'>Saved Posts</h2>
      { savedPost && savedPost.length === 0 &&
        <EmptyState message='No saved post yet'/> 
      }
      { savedPost && savedPost.length > 0 && savedPost.map((post:any, index:number) => (
        <SinglePost post={post} userId={currentUser?._id as string} index={index} key={index}/>
      ))}
    </React.Fragment>
  )
}

export default SavedPostClient