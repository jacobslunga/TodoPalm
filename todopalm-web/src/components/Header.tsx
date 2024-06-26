"use client";

import { userService } from "@/api/users";
import Tooltip from "@/components/util/Tooltip";
import { shouldBeBlackText } from "@/lib/util/theme";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { List, Settings, User } from "react-feather";

interface HeaderProps {
  user?: any;
  accessToken?: string;
}

const Header: FC<HeaderProps> = ({ user, accessToken }) => {
  const router = useRouter();
  const themeOptions = [
    { name: "Default", bg: "default" },
    { name: "Coffee Barista", bg: "coffee-bg", accent: "coffee-accent" },
    { name: "Forest Woods", bg: "forest-bg", accent: "forest-accent" },
    { name: "Deep Ocean", bg: "ocean-bg", accent: "ocean-accent" },
    { name: "Sunset Desert", bg: "desert-bg", accent: "desert-accent" },
    { name: "Urban Nightlife", bg: "urban-bg", accent: "urban-accent" },
    { name: "Sakura Spring", bg: "sakura-bg", accent: "sakura-accent" },
    { name: "Polar Ice", bg: "polar-bg", accent: "polar-accent" },
    { name: "Vintage Paper", bg: "vintage-bg", accent: "vintage-accent" },
  ];

  async function handleThemeChange(theme: string) {
    await userService.setTheme(accessToken as string, theme);
    router.refresh();
  }

  const userTheme = user && user.theme;
  const blackText = shouldBeBlackText(userTheme);

  return (
    <div className="fixed w-full px-[5%] sm:px-[10%] md:px-[20%] lg:px-[25%] py-5 top-0 bg-transparent flex flex-row items-center justify-between">
      <Link href="/me">
        <Image
          src="/todopalm-logo.png"
          alt="TodoPalm"
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>
      <div className="flex flex-row items-center justify-center">
        <Tooltip message="Profile">
          <Link href="/me/profile">
            {user && user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <User
                className={`${
                  userTheme === "default"
                    ? "text-black dark:text-white"
                    : `${blackText ? "text-black" : "text-white"}`
                }`}
                size={25}
              />
            )}
          </Link>
        </Tooltip>
        <div className="ml-5 flex flex-row items-center justify-center">
          <Tooltip message="Todo Lists">
            <Link href="/todo-lists">
              <List
                className={`${
                  userTheme === "default"
                    ? "text-black dark:text-white"
                    : `${blackText ? "text-black" : "text-white"}`
                }`}
                size={25}
              />
            </Link>
          </Tooltip>
        </div>
        <div className="ml-5 flex flex-row items-center justify-center">
          <Tooltip message="Settings">
            <Link href="/settings">
              <Settings
                className={`${
                  userTheme === "default"
                    ? "text-black dark:text-white"
                    : `${blackText ? "text-black" : "text-white"}`
                } hover:rotate-[15deg] transition-transform duration-200 ease-in-out`}
                size={25}
              />
            </Link>
          </Tooltip>
        </div>
        <div
          className={`${
            userTheme === "default"
              ? "bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(255,255,255,0.5)]"
              : `${
                  blackText
                    ? "bg-[rgba(0,0,0,0.5)]"
                    : "bg-[rgba(255,255,255,0.5)]"
                }`
          } ml-5 mr-5 h-[20px] w-[1.5px] rounded-xl`}
        />
        <select
          className={`w-full ${
            userTheme === "default"
              ? "text-[rgba(0,0,0,0.7)] bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)] dark:text-[rgba(255,255,255,0.7)]"
              : `${
                  blackText
                    ? "text-[rgba(0,0,0,0.7)] bg-[rgba(0,0,0,0.1)]"
                    : "text-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.1)]"
                }`
          } text-sm outline-none font-normal max-w-xs border-none focus:border-none active:border-none p-2 rounded-xl`}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="">Theme</option>
          {themeOptions.map((option, index) => (
            <option key={index} value={option.bg}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
