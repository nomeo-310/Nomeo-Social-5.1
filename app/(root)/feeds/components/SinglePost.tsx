'use client'

import React from 'react'
import Card from '@/components/Card'
import AnimationWrapper from '@/components/AnimationWrapper'
import SinglePostHeader from './SinglePostHeader'
import SinglePostContent from './SinglePostContent'
import SinglePostControls from './SinglePostControls'
import { singlePostData } from '@/types'

type singlePostProps = {
  post: singlePostData
  userId:string
  index: number
}

const SinglePost = ({post, userId, index}: singlePostProps) => {

  return (
    <AnimationWrapper key={index} transition={{duration: 1, delay: index*0.5}} keyValue={`${index}`}>
      <Card>
        <SinglePostHeader post={post} userId={userId}/>
        <SinglePostContent post={post}/>
        <hr className='-mx-4'/>
        <SinglePostControls post={post} userId={userId}/>
      </Card>
    </AnimationWrapper>
  )
}

export default SinglePost