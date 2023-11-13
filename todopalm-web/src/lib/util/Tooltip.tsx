"use client";
import { ReactNode, useState } from "react";

const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex flex-col items-center group z-50">
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

export default Tooltip;
