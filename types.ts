import { ObjectId } from "mongoose"

export type IUser = {
  username: string,
  name: string,
  email: string,
  hashedPassword?: string,
  image?: string,
  profileImage?: { public_id: string, secure_url: string },
  coverImage?: { public_id: string, secure_url: string },
  occupation: string,
  savedPosts: ObjectId[],
  totalSavedPosts: number,
  reposts: ObjectId[],
  totalReposts: number,
  followers: ObjectId[],
  totalFollowers: number,  
  followings: ObjectId[],
  totalFollowings: number,
  state: string,
  country: string,
  bio: string,
  createdPosts: ObjectId[],
  totalCreatedPosts: number,
  totalNotifications: number,
  twitterUrl: string,
  facebookUrl: string,
  instagramUrl: string,
  personalWebsite: string,
  notifications: ObjectId[],
  createdAt?: string
  updatedAt?: string
}

export type rawUserData = {
  _id: string,
  username: string,
  name: string,
  email: string,
  hashedPassword?: string,
  image: string,
  profileImage: { public_id: string, secure_url: string },
  coverImage: { public_id: string, secure_url: string },
  occupation: string,
  savedPosts: string[],
  totalSavedPosts: number,
  reposts: string[],
  totalReposts: number,
  followers: string[],
  totalFollowers: number,  
  followings: string[],
  totalFollowings: number,
  state: string,
  country: string,
  bio: string,
  createdPosts: string[],
  totalCreatedPosts: number,
  totalNotifications: number,
  twitterUrl: string,
  facebookUrl: string,
  instagramUrl: string,
  personalWebsite: string,
  notifications: string[],
  createdAt: string
  updatedAt: string
}

export type rawPostData = {
  _id: string
  postText: string,
  postImage: { public_id: string, secure_url: string },
  postLocation: string,
  postAuthor: string,
  mood: boolean,
  totalLikes: number,
  likes: string[],
  totalSaves: number,
  saves: string[],
  isRepost: boolean,
  parentPost: string,
  repostAuthor: string,
  showNotification: boolean,
  hidePost: boolean,
  postReported: boolean,
  totalReports: number
  barredStatus: boolean
  postType: string,
  totalComments: number,
  comments: string[],
  reposts: string[],
  totalReposts: number,
}

export type singlePostData = {
  _id: string,
  postText: string
  postImage: { public_id: string, secure_url: string },
  postLocation: string,
  postAuthor: {
    _id: string,
    username: string,
    name: string,
    image: string
  },
  repostAuthor: {
    _id: string,
    username: string,
    name: string,
    image: string
  },
  mood: boolean,
  totalLikes: number,
  likes: string[],
  totalSaves: number,
  saves: string[],
  isRepost: boolean,
  showNotification: boolean,
  barredStatus: boolean,
  hidePost: boolean,
  postReported: boolean,
  postType: string,
  totalComments: number,
  comments: string[],
  reposts: string[],
  totalReposts: number,
  createdAt: string,
  updatedAt: string,
}

export type updateDataProps = {
  username: string,
  bio : string,
  state: string,
  country: string,
  occupation: string,
  coverImage: {public_id: string, secure_url: string},
  profileImage: {public_id: string, secure_url: string},
  facebookUrl: string,
  twitterUrl: string,
  instagramUrl: string,
  personalWebsite: string,
  userId: string
  isNewCoverImage: boolean,
  isNewProfileImage: boolean
}

export type postDataProps = {
  postAuthor: string,
  postText: string,
  postImage: {public_id: string, secure_url: string},
  postLocation?: string,
  mood?: boolean,
}

export type singleImageData = {
  _id: string
  postText: string
  postImage: {public_id: string, secure_url:string}
}

export type followDataProps =     {
  _id: string
  name: string
  occupation: string
  state: string
  country: string
  image: string
  username: string
  followers: string[]
  followings: string[]
}

export type userFriends = {
  followers: followDataProps[]
  followings: followDataProps[]
  error: string
}

export type singleComment = {
  _id: string
  commentText: string
  commentType: string
  commentAuthor: {
    _id: string,
    name: string
    image: string
    username: string
  },
  postId: string
  isReply: boolean
  totalLikes: number
  likes: string[],
  childrenComments: [{
    _id: string
    commentText: string
    commentType: string
    commentAuthor: {
      _id: string,
      name: string
      image: string
      username: string
    },
    postId: string
    isReply: boolean
    totalLikes: number
    likes: string[],
    totalChildrenComments: number
    createdAt: string
    childrenComments: string[]
  }],
  totalChildrenComments: number
  createdAt: string
}

export type notificationProps = {
  _id: string
  notificationCreatedBy: {
    _id: string
    name: string
    username: string 
    image: string
  }
  type: string
  isLiked?: boolean
  isLikedComment?: boolean
  isReply?: boolean
  isComment?: boolean
  isReport?: boolean
  isBarred?: boolean
  post: {
    _id: string
    postText: string
  }
  comment: {
    _id: string
    commentText: string
  }
  notificationSeen: boolean
}


