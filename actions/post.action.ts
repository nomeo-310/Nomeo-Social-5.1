'use server'

import { connectToMongoDB } from "@/utils/connectToMongoDB"
import Post from "@/models/Post"
import { postDataProps, rawPostData, rawUserData } from "@/types"
import { fetchUserById } from "./user.actions"
import User from "@/models/User"
import { revalidatePath } from "next/cache"
import Notification from "@/models/Notification"
import { deleteImageOnCloudinary, getCurrentUser } from "./data.actions"



export const createPost = async ({postAuthor, postText, postImage, postLocation, mood}:postDataProps) => {
  await connectToMongoDB();

  const author = await fetchUserById(postAuthor);

  if (!author) {
    throw new Error('Author does not exist');
  }


  const postData = {
    postAuthor: postAuthor,
    postText: postText,
    postImage: postImage,
    postLocation: postLocation,
    mood: mood,
  }

  try {

    const newPost = await Post.create(postData)
    newPost.save();
    await User.findOneAndUpdate({_id: postAuthor}, {$push: {createdPosts: newPost._id}, $inc: {totalCreataedPosts: 1}})

    revalidatePath('/')
    return {success: 'Post successfully created!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }


}

export const likePost = async ({userId, postId, path}:{userId:string, postId:string, path:string}) => {
  await connectToMongoDB();

  const post:rawPostData | null = await Post.findOne({_id: postId});

  if (!post) {
    return {error: 'Post does not exist'}
  }

  const postAuthor = await User.findOne({_id: post.postAuthor})

  if (!postAuthor) {
    return {error: 'Post author does not exist'}
  }

  const alreadyLiked = post.likes.includes(userId);
  const notificationStatus = post.showNotification;

  try {
    if (alreadyLiked) {
      await Post.findOneAndUpdate({_id: postId}, {$pull: {likes: userId}, $inc: {totalLikes: -1}})

      revalidatePath(path);
      return {success: `You unliked ${postAuthor.name}'s post!`}
    } else {
      await Post.findOneAndUpdate({_id: postId}, {$push: {likes: userId}, $inc: {totalLikes: 1}})
  
      if (notificationStatus) {
  
        const notificationData = {
          type: 'like',
          isLiked: true,
          post: postId,
          notificationCreatedBy: userId,
          notificationFor: post.postAuthor
        }
        const newNotification = await Notification.create(notificationData);
        newNotification.save();
  
        await User.findOneAndUpdate({_id: post.postAuthor}, {$push: {notifications: newNotification._id}, $inc: {totalNotifications: 1}})
      }

      revalidatePath(path);
      return {success: `You liked ${postAuthor.name}'s post!`}
    }
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const turnOnNotification = async ({postId, path}:{postId:string, path:string}) => {
  await connectToMongoDB();

  try {
    await Post.findOneAndUpdate({_id: postId}, {showNotification: true});
    
    revalidatePath(path);
    return {success: 'Notification turned on'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const turnOffNotification = async ({postId, path}:{postId:string, path:string}) => {
  await connectToMongoDB();

  try {
    await Post.findOneAndUpdate({_id: postId}, {showNotification: false});
    
    revalidatePath(path);
    return {success: 'Notification turned off'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const hidePost = async ({postId, path}:{postId:string, path:string}) => {
  await connectToMongoDB();

  try {
    await Post.findOneAndUpdate({_id: postId}, {hidePost: true});
    
    revalidatePath(path);
    return {success: 'Post hidden'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const showPost = async ({postId, path}:{postId:string, path:string}) => {
  await connectToMongoDB();

  try {
    await Post.findOneAndUpdate({_id: postId}, {hidePost: false});
    
    revalidatePath(path);
    return {success: 'Post unhidden'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const reportPost = async ({postId, userId, path}:{postId:string, userId:string, path:string}) => {
  await connectToMongoDB();

  const post:rawPostData | null = await Post.findOne({_id: postId});

  if (!post) {
    return;
  }

  try {
    if (post.postReported) {

      if (post.totalReports > 1) {
        await Post.findOneAndUpdate({_id: postId}, { barredStatus: true })

        const notificationData = {
          type: 'barred',
          isBarred: true,
          post: postId,
          notificationCreatedBy: userId,
          notificationFor: post.postAuthor
        }

        const newNotification = await Notification.create(notificationData);
        newNotification.save();
      }

      await Post.findOneAndUpdate({_id: postId}, {$inc: {totalReports: 1}});

      const notificationData = {
        type: 'report',
        isReport: true,
        post: postId,
        notificationCreatedBy: userId,
        notificationFor: post.postAuthor
      }

      const newNotification = await Notification.create(notificationData);
      newNotification.save();

    } else {
      await Post.findOneAndUpdate({_id: postId}, {postReported: true}, {$inc: {totalReports: 1}});

      const notificationData = {
        type: 'report',
        isReport: true,
        post: postId,
        notificationCreatedBy: userId,
        notificationFor: post.postAuthor
      }
      const newNotification = await Notification.create(notificationData);
      newNotification.save();

    }
    
    revalidatePath(path)
    return {success: 'Post reported'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchAllPosts = async () => {
  await connectToMongoDB();

  try {
    const allPosts = await Post.find({barredStatus: false, hidePost: false})
    .populate('postAuthor', 'name image image username')
    .populate('repostAuthor', 'name image image username')
    .sort({createdAt: -1})

    const posts = JSON.parse(JSON.stringify(allPosts))
    return posts
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchUserPosts = async (userId: string) => {
  await connectToMongoDB();
  try {
    const allPosts = await Post.find({postAuthor: userId, isRepost: false})
    .populate('postAuthor', 'name image image username')
    .populate('repostAuthor', 'name image image username')
    .sort({createdAt: -1})

    const posts = JSON.parse(JSON.stringify(allPosts))
    return posts
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchUserReposts = async (userId: string) => {
  await connectToMongoDB();
  try {
    const allPosts = await Post.find({repostAuthor: userId})
    .populate('postAuthor', 'name image image username')
    .populate('repostAuthor', 'name image image username')
    .sort({createdAt: -1})

    const posts = JSON.parse(JSON.stringify(allPosts))
    return posts
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchUserAlbum = async (userId: string) => {
  await connectToMongoDB();
  try {
    const allPosts = await Post.find({postAuthor: userId, isRepost: false})
    .select('_id postText postImage')
    .sort({createdAt: -1})

    const posts = JSON.parse(JSON.stringify(allPosts.filter((item:any) => item.postImage.secure_url !== '')))
    return posts
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const deletePost = async ({postId, path}:{postId:string, path:string}) => {
  await connectToMongoDB();

  try {
    const post:rawPostData | null = await Post.findOne({_id: postId})

    if (!post) {
      return;
    }

    const { postAuthor } = post;
    const { repostAuthor } = post;

    const postImage = post.postImage;
    const repost = post.isRepost;

    if (postImage.public_id !== '' && !repost) {
      deleteImageOnCloudinary(postImage.public_id)
    }

    await User.findOneAndUpdate({_id: postAuthor}, {$pull: {createdPosts: postId}, $inc: {totalcreatedPosts: -1}})

    if (repost) {
      await Post.findOneAndUpdate({_id: post.parentPost}, {$pull: {repost: post.repostAuthor}, $inc: {totalReposts: -1}})
      await User.findOneAndUpdate({_id: repostAuthor}, {$pull: {createdPosts: postId}, $inc: {totalcreatedPosts: -1}})
    }

    await Post.findOneAndDelete({_id: postId})

    revalidatePath(path)
    return { success: 'Post successfully deleted'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const repost = async ({userId, postId}:{userId:string, postId:string}) => {
  await connectToMongoDB();
  const originalPost:rawPostData | null = await Post.findOne({_id: postId})
  const repostAuthor:rawUserData | null = await User.findOne({_id: userId})

  if (!originalPost || !repostAuthor) {
    return;
  }
  
  const postData = {
    postAuthor: originalPost.postAuthor,
    postText: originalPost.postText,
    postImage: originalPost.postImage,
    postLocation: originalPost.postLocation,
    mood: originalPost.mood,
    isRepost: true,
    parentPost: originalPost._id,
    repostAuthor: userId
  }

  try {

    const newPost = await Post.create(postData)
    newPost.save();

    await User.findOneAndUpdate({_id: userId}, {$push: {createdPosts: newPost._id}, $inc: {totalCreataedPosts: 1}})
    await Post.findOneAndUpdate({_id: postId}, {$push: {reposts: userId}, $inc: {totalReposts: 1}})

    revalidatePath('/')
    return {success: 'Repost successfully created!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const savePosts = async ({userId, postId, path}:{userId:string, postId:string, path: string}) => {
  await connectToMongoDB();

  try {
    await User.findOneAndUpdate({_id: userId}, {$push: {savedPosts: postId}, $inc: {totalSavedPosts: 1}})
    await Post.findOneAndUpdate({_id: postId}, {$push: {saves: userId}, $inc: {totalSaves: 1}})

    revalidatePath(path)
    return { success: 'Post successfully saved'}
  } catch (error) {
    return { error: 'Internal server error'}
  }
}

export const fetchSavedPosts = async () => {
  await connectToMongoDB();

  const currentUser:rawUserData | null = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const allSavedPosts = currentUser.savedPosts;

  try {
    const allPosts = await Promise.all(allSavedPosts.map((id:string) => Post.findById(id).populate('postAuthor', 'name image image username')))

    const savedPosts = JSON.parse(JSON.stringify(allPosts))

    return savedPosts;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchSinglePost = async (postId:string) => {
  await connectToMongoDB();

  try {
    const post = await Post.findOne({_id: postId})
    .populate('postAuthor', 'name image image username')
    .populate('repostAuthor', 'name image image username')

    const singlePost = JSON.parse(JSON.stringify(post))

    return singlePost;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

