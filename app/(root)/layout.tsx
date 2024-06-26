import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import PageLayout from "./components/PageLayout";
import ToastProvider from "@/providers/ToastProvider";
import { getCurrentUser } from "@/actions/data.actions";
import { fetchNotificationCounts } from "@/actions/notification.actions";

const customFont = localFont({ src: "../../public/fonts/Barlow-Regular.ttf" });

export const metadata: Metadata = {
  title: "Nomeo 5.1",
  description: "Generated by create next app",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  const currentUser = JSON.parse(JSON.stringify(user));
  const notificationCounts = await fetchNotificationCounts();

  return (
    <html lang="en">
      <body className={customFont.className}>
        <div className="absolute">
          <ToastProvider />
        </div>
        <PageLayout currentUser={currentUser} notificationCount={notificationCounts}>{children}</PageLayout>
      </body>
    </html>
  );
}
