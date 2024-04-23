'use server'

import Notification from "@/models/Notification"
import { connectToMongoDB } from "@/utils/connectToMongoDB"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "./data.actions"


export const fetchNotificationCounts = async () => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const notificationCounts = await Notification.countDocuments({notificationFor: currentUser._id, notificationSeen: false, notificationCreatedBy: {$ne: currentUser._id}})

    const count = JSON.parse(JSON.stringify(notificationCounts ))

    return count;
  } catch (error) {
    return { error: 'Internal server error'}
  }
}

export const fetchNotifications = async () => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }


  try {
    const allNotifications = await Notification.find({ notificationFor: currentUser._id, notificationCreatedBy: {$ne: currentUser._id}})
    .populate('notificationCreatedBy', '_id name username image')
    .populate('post', '_id postText')
    .sort({createdAt: -1})

    const notifications = JSON.parse(JSON.stringify(allNotifications));

    return notifications;
  } catch (error) {
    return { error: 'Internal server error'}
  }
}

export const seenNotification = async ({ids, path}:{ids:string[], path:string}) => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    await Notification.updateMany({_id: {$in: ids}, notificationSeen: false}, {notificationSeen: true})
    
    revalidatePath(path);
    return {success: 'Notification seen'}
  } catch (error) {
    return {error: 'Internal server error'}
  }

}

export const clearAllNotifications = async () => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    await Notification.deleteMany({notificationFor: currentUser._id, notificationSeen: true})

    revalidatePath('/notifications')
    return {success: 'Notifications cleared successfully!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const removeNotification = async (notificationId:string) => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    await Notification.findByIdAndDelete({_id: notificationId})

    revalidatePath('/notifications')
    return {success: 'Notification removed successfully!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }

}