import React from "react";
import NavigationClient from "./NavigationClient";
import { getCurrentUser } from "@/actions/data.actions";
import { fetchNotificationCounts } from "@/actions/notification.actions";


const Navigation = async() => {
  const user = await getCurrentUser();
  const currentUser = JSON.parse(JSON.stringify(user));
  const notifications = await fetchNotificationCounts();

  return <NavigationClient currentUser={currentUser} notificationCount={notifications}/>;
};

export default Navigation;
