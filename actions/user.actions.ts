'use server'

import { connectToMongoDB } from "@/utils/connectToMongoDB"
import { deleteImageOnCloudinary, fetchUserByEmail, fetchUserByUsername, getCurrentUser } from "./data.actions"
import User from "@/models/User"
import bcrypt from 'bcryptjs'
import { rawUserData, updateDataProps } from "@/types"
import { revalidatePath } from "next/cache"

type createUserProps = {
  name:string
  email:string
  password:string
}

type formattedDataProps = {
  _id: string, 
  name: string, 
  occupation: string, 
  state: string, 
  country: string, 
  image: string, 
  username: string
  followers: string[]
  followings: string[]
}

export const createUser = async({name, email, password}:createUserProps) => {
  await connectToMongoDB();

  const existingUser = await fetchUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already used!'};
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {name: name, email: email, hashedPassword: hashedPassword };
    const newUser = await User.create(userData);

    newUser.save();
    return { success: 'User successfully created! Login'};
  } catch (error) {
    return { error: 'User not created'}
  }
}

export const fetchUserById = async (id:string) => {
  await connectToMongoDB();

  if (!id) {
    return;
  }
  
  const user:rawUserData | null = await User.findOne({_id: id});

  if (!user) { 
    return;
  } else {
    const userData = JSON.parse(JSON.stringify(user));
    return userData;
  }
}

export const updateProfile = async ({userId, username, bio, state, country, coverImage, profileImage, facebookUrl, twitterUrl, instagramUrl, personalWebsite, isNewCoverImage, isNewProfileImage, occupation}:updateDataProps) => {
  await connectToMongoDB();
  const user:rawUserData = await fetchUserById(userId);

  if (!user) {
    return null;
  }

  const updateData = {
    username: username,
    bio : bio,
    image: isNewProfileImage ? profileImage.secure_url : user.image,
    state: state,
    country: country,
    occupation: occupation,
    coverImage: coverImage,
    profileImage: profileImage,
    facebookUrl: facebookUrl,
    twitterUrl: twitterUrl,
    instagramUrl: instagramUrl,
    personalWebsite: personalWebsite,
  }

  const previousProfileImagePublicId = user.profileImage?.public_id;
  const previousCoverImagePublicId = user.coverImage?.public_id;

  if (isNewCoverImage && previousCoverImagePublicId !== '') {
    deleteImageOnCloudinary(previousCoverImagePublicId!);
  }

  if (isNewProfileImage && previousProfileImagePublicId !== '') {
    deleteImageOnCloudinary(previousProfileImagePublicId!);
  }

  const usernameExist = await fetchUserByUsername(username);

  if (usernameExist && username !== usernameExist.username) {
    return {error: 'Username already taken! Use another one'}
  } else {
    try {
      await User.findByIdAndUpdate({_id: userId}, updateData);

      revalidatePath('/editprofile')
      return {success: 'Profile successfully updated!'}
    } catch (error) {
      return {error: 'Internal server error'}
    }
  }

}

export const followUsers = async ({userId, path}:{userId: string, path: string}) => {
  const currentUser = await getCurrentUser();
  const following = await fetchUserById(userId)

  const alreadyFollowing = currentUser?.followings.includes(userId);

  try {
    if (alreadyFollowing) {
      await User.findOneAndUpdate({_id: currentUser?._id}, {$pull: {followings: userId}, $inc: {totalFollowings: -1}})
      await User.findOneAndUpdate({_id: userId}, {$pull: {followers: currentUser?._id}, $inc: {totalFollowers: -1}})

      revalidatePath(path)
      return {success: `You are no longer following ${following.name}`}
    } else {
      await User.findOneAndUpdate({_id: currentUser?._id}, {$push: {followings: userId}, $inc: {totalFollowings: 1}})
      await User.findOneAndUpdate({_id: userId}, {$push: {followers: currentUser?._id}, $inc: {totalFollowers: 1}})
  
      revalidatePath(path)
      return {success: `You are now following ${following.name}`}
    }
  
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchFriends = async (userId: string) => {
  await connectToMongoDB();

  const user:rawUserData = await fetchUserById(userId);

  const followerIds = user.followers;
  const followingsIds = user.followings;

  try {
    const allFollowings:any = await Promise.all(followingsIds.map((id:string) => User.findById(id)))
    const allFollowers:any = await Promise.all(followerIds.map((id:string) => User.findById(id)));

    const formattedFollowings = allFollowings.map(({_id, name, occupation, state, country, image, username, followers, followings}:formattedDataProps) => {
      return {_id, name, occupation, state, country, image, username, followers, followings }
    });
    const formattedFollowers = allFollowers.map(({_id, name, occupation, state, country, image, username, followers, followings}:formattedDataProps) => {
      return {_id, name, occupation, state, country, image, username, followers, followings }
    });

    const followings = JSON.parse(JSON.stringify(formattedFollowings))
    const followers = JSON.parse(JSON.stringify(formattedFollowers))
    const friends = { followers: followers, followings: followings}

    return friends;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchUserFriends = async () => {
  await connectToMongoDB();

  const currentUser:rawUserData | null = await getCurrentUser();


  if (!currentUser) {
    return;
  }

  const followerIds = currentUser.followers;
  const followingsIds = currentUser.followings;

  try {
    const allFollowings = await Promise.all(followingsIds.map((id:string) => User.findById(id)))
    const allFollowers = await Promise.all(followerIds.map((id:string) => User.findById(id)));

    const formattedFollowings = allFollowings.map(({_id, name, occupation, state, country, image, username}:any) => {
      return {_id, name, occupation, state, country, image, username }
    });
    const formattedFollowers = allFollowers.map(({_id, name, occupation, state, country, image, username}:any) => {
      return {_id, name, occupation, state, country, image, username }
    });

    const followings = JSON.parse(JSON.stringify(formattedFollowings))
    const followers = JSON.parse(JSON.stringify(formattedFollowers))
    const friends = { followers: followers, followings: followings}

    return friends;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchSuggestedUsers = async () => {
  await connectToMongoDB()

  const currentUser:rawUserData | null = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const followings = currentUser?.followings;

  try {
    const users = await User.find({_id: {$nin: followings}, name: {$ne: currentUser.name}})
    .select('_id name occupation state country image username')
    .sort({'totalFollowers':-1, 'totalFollowings':-1, 'createdAt':-1 })

    if (!users) {
      return [];
    }

    const suggestedUsers = JSON.parse(JSON.stringify(users));
    return suggestedUsers;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchAllUsers = async ({query}:{query:string}) => {
  await connectToMongoDB();

  const currentUser:rawUserData | null = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const maxLimit = 15;
  let findQuery = {_id: {$ne: currentUser._id}, $or: [{ username: new RegExp(query, 'i')},{ name: new RegExp(query, 'i') },]}

  try {
    const users = await User.find(findQuery)
    .limit(maxLimit);

    const searchResults = JSON.parse(JSON.stringify(users));
    return searchResults;
  } catch (error) {
    return {error: 'Internal server error'}
  }
  
}








