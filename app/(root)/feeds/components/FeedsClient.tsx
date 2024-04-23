'use client'

import React from 'react'
import CreatePost from './CreatePost'
import SinglePost from './SinglePost'
import { rawUserData, singlePostData } from '@/types'
import EmptyState from '@/components/EmptyState'

type Props = {
  currentUser: rawUserData
  allPost: singlePostData[]
}

const FeedsClient = ({ currentUser, allPost }: Props) => {
  return (
    <React.Fragment>
      <CreatePost currentUser={currentUser}/>
      { allPost.length === 0 &&
        <EmptyState message='No post yet'/> 
      }
      { allPost.length > 0 && allPost.map((post:singlePostData, index:number) => (
        <SinglePost post={post} userId={currentUser._id} index={index} key={index}/>
      ))}
    </React.Fragment>
  )
}

export default FeedsClient