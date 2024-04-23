import React from "react";
import FeedsClient from "./components/FeedsClient";
import { getCurrentSession, getCurrentUser } from "@/actions/data.actions";
import { fetchAllPosts } from "@/actions/post.action";
import { redirect } from "next/navigation";
import { fetchNotificationCounts } from "@/actions/notification.actions";

const FeedsPage = async() => {
  const user = await getCurrentUser();
  const currentUser = JSON.parse(JSON.stringify(user));
  const posts = await fetchAllPosts();

  const session = await getCurrentSession();

  const notification = await fetchNotificationCounts();
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  return <FeedsClient currentUser={currentUser} allPost={posts}/>;
};

export default FeedsPage;
