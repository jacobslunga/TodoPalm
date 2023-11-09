"use client";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { FC } from "react";

interface Todo {
  id: string;
  title: string;
  content: string;
}

interface TodoListProps {
  todos: Todo[];
  user: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

function getFormattedDate(): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  const date = today.getDate();
  const monthName = monthsOfYear[today.getMonth()];
  const year = today.getFullYear();

  return `${dayName} ${date} ${monthName} ${year}`;
}

const getOS = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;

    if (/Win(dows)?/.test(userAgent)) {
      return "Windows";
    }

    if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
      return "MacOS";
    }

    if (/Linux/.test(userAgent)) {
      return "Linux";
    }
  }

  return "Unknown";
};

const TodoList: FC<TodoListProps> = ({
  todos,
  user: { id, name, imageUrl },
}) => {
  useKeyboardShortcut("d", () => {
    const modal = document.getElementById("create_todo_modal") as any;
    modal?.showModal();
  });

  const OS = getOS();

  return (
    <div className="h-[80vh] absolute bottom-0 overflow-auto w-1/2 items-start justify-start flex flex-col">
      <h4 className="font-semibold underline text-2xl text-black dark:text-white">
        {getFormattedDate()}
      </h4>

      {todos.length === 0 ? (
        <>
          <p className="font-lyon mt-2 text-lg text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]">
            Let's get started! Click the button below to create your first todo
            for today
          </p>

          <div className="flex flex-row items-center justify-center mt-5">
            <button
              onClick={() => {
                const modal = document.getElementById(
                  "create_todo_modal"
                ) as any;
                modal?.showModal();
              }}
              className="rounded-full text-sm bg-black dark:bg-white shadow-lg px-4 py-3 text-white dark:text-black font-semibold"
            >
              Create Todo
            </button>

            <p className="text-gray-300 dark:text-gray-700 ml-5 text-xs">or</p>

            <p className="text-gray-400 dark:text-gray-500 ml-5 text-xs">
              You can always press{" "}
              <kbd className="kbd kbd-xs">
                {OS === "MacOS" ? "Cmd" : "Ctrl"}
              </kbd>{" "}
              + <kbd className="kbd kbd-xs">D</kbd> to toggle the todo.
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodoList;
