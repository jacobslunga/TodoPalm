"use client";

import Image from "next/image";
import { FC, ReactNode, useState } from "react";
import { List, Settings, User } from "react-feather";

interface HeaderProps {
  user?: any;
}

const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex flex-col items-center group">
      <span
        className="flex justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      <div
        className={`absolute whitespace-nowrap top-full mt-1 flex flex-col items-center transition-all duration-200 ease-in-out opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 ${
          !show ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-3 h-3 -mb-2 rotate-45 bg-black dark:bg-gray-200" />
        <span className="relative z-10 p-2 text-xs leading-none text-white dark:text-black font-medium whitespace-no-wrap bg-black dark:bg-gray-200 shadow-lg rounded-lg">
          {message}
        </span>
      </div>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <div className="fixed w-full px-[5%] sm:px-[10%] md:px-[20%] lg:px-[25%] py-5 top-0 bg-transparent flex flex-row items-center justify-between">
      <Image
        src="/todopalm-logo.png"
        alt="TodoPalm"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex flex-row items-center justify-center">
        <Tooltip message="Me">
          <button>
            {user && user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <User className="text-black dark:text-white" size={25} />
            )}
          </button>
        </Tooltip>
        <div className="ml-5">
          <Tooltip message="Todo Lists">
            <button>
              <List className="text-black dark:text-white" size={25} />
            </button>
          </Tooltip>
        </div>
        <div className="ml-5">
          <Tooltip message="Settings">
            <button>
              <Settings
                className="text-black dark:text-white hover:rotate-[15deg] transition-transform duration-200 ease-in-out"
                size={25}
              />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
