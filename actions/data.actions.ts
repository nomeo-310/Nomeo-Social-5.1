'use server'

import { rawUserData } from "@/types";
import cloudinary from "@/utils/cloudinary";
import { connectToMongoDB } from "@/utils/connectToMongoDB";
import { authOptions } from '../app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from "next-auth";
import User from "@/models/User";



export const fetchUserByEmail = async (email:string) => {
  await connectToMongoDB();
  const user:rawUserData | null = await User.findOne({email: email});

  if (!user) { 
    return null;
  } else {
    return user;
  }
}

export const fetchUserByUsername = async (username:string) => {
  await connectToMongoDB();
  const user:rawUserData | null = await User.findOne({username: username});

  if (!user) { 
    return null;
  } else {
    return user;
  }
}

export const getCurrentSession = async() => {
  return await getServerSession(authOptions);
}

export const getCurrentUser = async () => {
  await connectToMongoDB();
  try {
    const currentSession = await getCurrentSession();

    if (!currentSession?.user?.email) {
      return null
    }

    const currentUser = await fetchUserByEmail(currentSession.user.email);

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
}

export const deleteImageOnCloudinary = (publicId:string) => {
  cloudinary.uploader.destroy(publicId, function(error: any,result: any) {
    console.log(result, error) })
    .then((resp: any) => console.log(resp))
    .catch((_err: any)=> console.log("Something went wrong, please try again later."));
}
