'use client'

import React from 'react'
import MenuButton from './MenuButton';
import Card from '@/components/Card';
import { singlePostData } from '@/types';
import { toast } from 'sonner'
import { HiArrowPathRoundedSquare, HiOutlineBellAlert, HiOutlineBellSlash, HiOutlineBookmark, HiOutlineExclamationTriangle, HiOutlineTrash, HiXMark } from 'react-icons/hi2'
import { usePathname } from 'next/navigation';
import { deletePost, hidePost, reportPost, repost, savePosts, showPost, turnOffNotification, turnOnNotification } from '@/actions/post.action'


const PostMenu = ({post, postId, userId, setShowMenu}:{postId:string, userId:string, post:singlePostData, setShowMenu: React.Dispatch<React.SetStateAction<boolean>>}) => {


  const { postAuthor } = post;
  const { repostAuthor } = post;

  const notificationOn = post.showNotification;
  const authorLoggedIn = post.isRepost ? userId === repostAuthor._id :  userId === postAuthor._id;

  const path = usePathname();

  const handleSavePost = async(postId:string) => {

    const savePostData = {
      postId: postId,
      path: path,
      userId: userId
    }

    try {
      const response = await savePosts(savePostData)

      if (response.success) {
        toast.success(response.success)
        setShowMenu(false);
      }
      
    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleTurnOnNotification = async(postId:string) => {

    const notificationData = {
      postId: postId,
      path: path
    }

    try {
      const response = await turnOnNotification(notificationData)

      if (response.success) {
        toast.success(response.success)
        setShowMenu(false);
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleTurnOffNotification = async(postId:string) => {
    const notificationData = {
      postId: postId,
      path: path
    }

    try {
      const response = await turnOffNotification(notificationData)

      if (response.success) {
        toast.success(response.success)
        setShowMenu(false);
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleHidePost = async(postId:string) => {
    const notificationData = {
      postId: postId,
      path: path
    }

    try {
      const response = await hidePost(notificationData)

      if (response.success) {
        toast.success(response.success)
        setShowMenu(false);
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleShowPost = async(postId:string) => {
    const notificationData = {
      postId: postId,
      path: path
    }

    try {
      const response = await showPost(notificationData)

      if (response.success) {
        toast.success(response.success)
        setShowMenu(false);
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleDeletePost = async(postId:string) => {
    const deleteData = {
      postId: postId,
      path: path
    }

    try {
      const response = await deletePost(deleteData)

      if (response?.success) {
        toast.success(response.success)
        setShowMenu(false);
      }

    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleReportPost = async(postId:string) => {

    const reportData = {
      postId:postId, 
      userId:userId, 
      path:path
    }

    try {
      const response = await reportPost(reportData)

      if (response?.success) {
        toast.success(response.success)
        setShowMenu(false);
      }
    } catch (error) {
      toast.error('Internal server error')
    }
  }

  const handleRepost = async(postId:string) => {

    const repostData = {
      postId:postId, 
      userId:userId
    }

    try {
      const response = await repost(repostData)

      if (response?.success) {
        toast.success(response.success)
        setShowMenu(false);
      }
    } catch (error) {
      toast.error('Internal server error')
    }
  }

  return (
    <Card className="absolute top-4 -right-6 lg:-right-8 flex flex-col w-52 rounded-md bg-white shadow-md z-20">
      { !authorLoggedIn &&
        <MenuButton
          icon={HiOutlineBookmark}
          label='Save post'
          onClick={() => handleSavePost(postId)}
        />
      }
      { authorLoggedIn && 
        <React.Fragment>
          { notificationOn ? 
            <MenuButton
              icon={HiOutlineBellSlash}
              label='Turn off notification'
              onClick={() => handleTurnOffNotification(postId)}
            /> :
            <MenuButton
              icon={HiOutlineBellAlert}
              label='Turn on notification'
              onClick={() => handleTurnOnNotification(postId)}
            />
          }
        </React.Fragment>
      }
      { authorLoggedIn &&
        <React.Fragment>
          {post.hidePost ?
            <MenuButton
              icon={HiXMark}
              label='Unhide post'
              onClick={() => handleShowPost(postId)}
            /> :
            <MenuButton
              icon={HiXMark}
              label='Hide post'
              onClick={() => handleHidePost(postId)}
            />
          }
        </React.Fragment>
      }
      { authorLoggedIn && 
        <MenuButton
          icon={HiOutlineTrash}
          label='Delete post'
          onClick={() => handleDeletePost(postId)}
        />
      }
      { !authorLoggedIn &&
        <MenuButton
          icon={HiOutlineExclamationTriangle}
          label='Report post'
          onClick={() => handleReportPost(postId)}
        />
      }
      { !authorLoggedIn &&
        <MenuButton
          icon={HiArrowPathRoundedSquare}
          label='Repost'
          onClick={() => handleRepost(postId)}
        />
      }
    </Card> 
  )
};

export default PostMenu