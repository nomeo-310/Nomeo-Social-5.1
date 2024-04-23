'use server'

import { connectToMongoDB } from "@/utils/connectToMongoDB"
import Post from "@/models/Post"
import { rawPostData, singleComment } from "@/types"
import User from "@/models/User"
import { revalidatePath } from "next/cache"
import Notification from "@/models/Notification"
import Comment from "@/models/Comment"
import { fetchUserById } from "./user.actions"

type createCommentProps = {
  commentText: string,
  commentAuthor: string,
  commentType: string,
  path: string
  postId: string
}

type createReplyProps = {
  commentText: string,
  commentAuthor: string,
  commentType: string,
  path: string
  postId: string
  parentComment: string
  userId: string
}


export const createComment = async({commentText, commentAuthor, commentType, path, postId}:createCommentProps) => {
  await connectToMongoDB();

  const post:rawPostData | null = await Post.findOne({_id: postId});

  if (!post) {
    return {error: 'Post does not exist!'}
  }

  const { postAuthor , showNotification } = post;

  const commentData = {
    commentText: commentText,
    commentType: commentType,
    commentAuthor: commentAuthor,
    postId: postId
  }

  try {
    const newComment = await Comment.create(commentData)
    newComment.save();

    await Post.findOneAndUpdate({_id: postId}, {$push: {comments: newComment._id}, $inc: {totalComments: 1}})

    if (showNotification) {

      const notificationData = {
        type: 'comment',
        isComment: true,
        post: postId,
        notificationCreatedBy: commentAuthor,
        notificationFor: postAuthor,
      }

      const newNotification = await Notification.create(notificationData);
      newNotification.save();

      await User.findOneAndUpdate({_id: postAuthor}, {$push: {notifications: newNotification._id}, $inc: {totalNotifications: 1}})
    }

    revalidatePath(path)
    return {success: 'Comment successfully created!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }

}

export const createReply = async({commentText, commentAuthor, commentType, path, postId, parentComment, userId}:createReplyProps) => {
  await connectToMongoDB();

  const post:rawPostData | null = await Post.findOne({_id: postId});

  if (!post) {
    return {error: 'Post does not exist!'}
  }

  const commentData = {
    commentText: commentText,
    commentType: commentType,
    commentAuthor: userId,
    postId: postId,
    parentComments: parentComment
  }

  try {
    const newComment = await Comment.create(commentData)
    newComment.save();

    await Comment.findOneAndUpdate({_id: parentComment}, {$push: {childrenComments: newComment._id}, $inc: {totalChildrenComments: 1}})

    const notificationData = {
      type: 'reply',
      isReply: true,
      post: postId,
      notificationCreatedBy: userId,
      notificationFor: commentAuthor,
      comment: parentComment
    }

    const newNotification = await Notification.create(notificationData);
    newNotification.save();

    await User.findOneAndUpdate({_id: commentAuthor}, {$push: {notifications: newNotification._id}, $inc: {totalNotifications: 1}})

    revalidatePath(path)
    return {success: 'Response successfully sent!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }

}

export const fetchComments = async (postId:string) => {
  await connectToMongoDB();

  try {
    const allComments = await Comment.find({postId: postId, parentComments: {$in: [null, undefined]}})
    .populate('commentAuthor', 'name image image username')
    .populate({path: 'childrenComments', populate: { path: 'commentAuthor'}})

    const comments = JSON.parse(JSON.stringify(allComments))
    return comments;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const likeComment = async ({userId, commentId, commentAuthor, path, postId}:{userId:string,  commentId:string, commentAuthor:string, path:string, postId:string}) => {
  await connectToMongoDB();

  const commentCreator = await fetchUserById(commentAuthor)
  const comment:singleComment | null = await Comment.findOne({_id: commentId})

  if (!comment) {
    return;
  }

  const alreadyLikedComment = comment.likes.includes(userId);

  try {

    if (alreadyLikedComment) {
      await Comment.findOneAndUpdate({_id: commentId}, {$pull: {likes: userId}, $inc: {totalLikes: -1}})
      
      revalidatePath(path);
      return {success: `You unliked ${commentCreator.name}'s comment.`}
    }

    await Comment.findOneAndUpdate({_id: commentId}, {$push: {likes: userId}, $inc: {totalLikes: 1}})

    const notificationData = {
      type: 'like-comment',
      isLikedComment: true,
      post: postId,
      notificationCreatedBy: userId,
      comment: commentId,
      notificationFor: commentAuthor
    }

    const newNotification = await Notification.create(notificationData);
    newNotification.save();

    await User.findOneAndUpdate({_id: commentAuthor}, {$push: {notifications: newNotification._id}, $inc: {totalNotifications: 1}})

    revalidatePath(path);
    return {success: `You liked ${commentCreator.name}'s comment.`}
  } catch (error) {
    return { error: 'Internal server error' }
  }
}

export const deleteComment = async ({userId, commentId, path}:{userId:string, commentId:string, path:string}) => {
  await connectToMongoDB();

  const comment = await Comment.findOne({_id: commentId, commentAuthor: userId})

  if (!comment) {
    return;
  }

  const commentIsAChild = comment.parentComments !== null || comment.parentComments !== undefined;
  const commentIsAParent = comment.parentComments === null || comment.parentComments === undefined;

  try {
    if (commentIsAChild) {
      await Comment.findOneAndUpdate({_id: comment.parentComments}, {$pull: {childrenComments: commentId}, $inc: {totalChildrenComments: -1}})
    }

    if (commentIsAParent) {
      await Post.findOneAndUpdate({_id: comment.postId}, {$pull: {comments: commentId}, $inc: {totalComments: -1}})
    }
  
    await Comment.findOneAndDelete({_id: commentId})

    revalidatePath(path);
    return {success: 'Comment successfully deleted'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

