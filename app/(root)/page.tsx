
import React from "react";
import FeedsPage from "./feeds/page";
import { getCurrentSession } from "@/actions/data.actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nomeo 5.1 | Home",
  description: "Generated by create next app",
};

export default async function Home () {
  const session = await getCurrentSession();

  if (!session?.user?.email) {
    redirect('/sign-in');
  }


  return (
    <React.Fragment>
      <FeedsPage/>
    </React.Fragment>
  );
}
