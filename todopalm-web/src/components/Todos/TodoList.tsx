"use client";

import { todoService } from "@/api/todos";
import Tooltip from "@/components/util/Tooltip";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { shouldBeBlackText } from "@/lib/util/theme";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Check, Filter, MoreVertical, PlusCircle } from "react-feather";

interface Todo {
  id: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Todo[];
  user: {
    id: string;
    name: string;
    imageUrl: string;
    theme: string;
  };
  accessToken: string;
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

const TodoList: FC<TodoListProps> = ({
  todos,
  user: { id, name, imageUrl, theme },
  accessToken,
}) => {
  useKeyboardShortcut("d", () => {
    const modal = document.getElementById("create_todo_modal") as any;
    modal?.showModal();
  });

  const router = useRouter();

  const userTheme = theme;
  const blackText = shouldBeBlackText(userTheme);

  const handleCompleteTodo = async (id: string) => {
    const res = await todoService.completeTodo(accessToken, id);
    console.log(res);
    router.refresh();
  };

  const handleUnCompleteTodo = async (id: string) => {
    const res = await todoService.unCompletetodo(accessToken, id);
    console.log(res);
    router.refresh();
  };

  return (
    <div
      className={`h-[80vh] absolute bottom-0 px-[5%] sm:px-[10%] md:px-[20%] lg:px-[25%] w-full ${
        todos.length === 0 ? "items-start" : "items-center"
      } justify-start flex flex-col`}
    >
      <div className="w-full flex flex-row items-center justify-between">
        <h4
          className={`font-semibold underline text-lg sm:text-xl md:text-xl lg:text-2xl ${
            userTheme === "default"
              ? "text-black dark:text-white"
              : `${blackText ? "text-black" : "text-white"}`
          }`}
        >
          {getFormattedDate()}
        </h4>

        <div className="flex flex-row items-center justify-center">
          <div className="mr-5">
            <Tooltip message="Create todo">
              <button
                className="flex flex-row items-center justify-center"
                onClick={() => {
                  const modal = document.getElementById(
                    "create_todo_modal"
                  ) as any;
                  modal?.showModal();
                }}
              >
                <PlusCircle
                  className={`${
                    userTheme === "default"
                      ? "text-black dark:text-white"
                      : `${blackText ? "text-black" : "text-white"}`
                  } m-0 p-0 hover:rotate-[15deg] transition-all duration-200 ease-in-out`}
                />
              </button>
            </Tooltip>
          </div>
          {todos.length > 0 && (
            <Tooltip message="Filter todos">
              <button>
                <Filter
                  size={20}
                  className={`${
                    userTheme === "default"
                      ? "text-black dark:text-white"
                      : `${blackText ? "text-black" : "text-white"}`
                  } m-0 p-0`}
                />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {todos.length === 0 ? (
        <>
          <p
            className={`font-lyon mt-2 text-lg ${
              userTheme === "default"
                ? "text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]"
                : `${
                    blackText
                      ? "text-[rgba(0,0,0,0.5)]"
                      : "text-[rgba(255,255,255,0.5)]"
                  }`
            }`}
          >
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
              className={`rounded-full text-sm ${
                userTheme === "default"
                  ? "text-white bg-black dark:text-black dark:bg-white"
                  : `${
                      blackText ? "text-white bg-black" : "text-black bg-white"
                    }`
              } shadow-lg px-4 py-3 font-semibold`}
            >
              Create Todo
            </button>

            <p
              className={`ml-5 text-xs ${
                userTheme === "default"
                  ? "text-gray-500 dark:text-gray-300"
                  : `${blackText ? "text-gray-500" : "text-gray-300"}`
              }`}
            >
              or
            </p>

            <p
              className={`${
                userTheme === "default"
                  ? "text-gray-500 dark:text-gray-300"
                  : `${blackText ? "text-gray-500" : "text-gray-300"}`
              } ml-5 text-xs`}
            >
              You can always press <kbd className="kbd kbd-xs">Cmd/Ctrl</kbd> +{" "}
              <kbd className="kbd kbd-xs">D</kbd> to toggle the todo.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start overflow-x-hidden overflow-auto justify-start w-full">
            {todos.map((todo, i) => (
              <div
                className={`flex flex-row items-center justify-between w-full ${
                  i === 0 ? "mt-10" : "mt-5"
                } ${i === todos.length - 1 ? "mb-20" : "mb-0"}`}
                key={todo.id}
              >
                <div className="flex flex-row items-start justify-start w-full">
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className={`${
                        userTheme === "default"
                          ? "text-[rgba(0,0,0,0.6)] dark:text-gray-400"
                          : `${
                              blackText
                                ? "text-[rgba(0,0,0,0.6)]"
                                : "dark:text-gray-400"
                            }`
                      } font-semibold text-lg items-center justify-center`}
                    >
                      {i + 1}
                    </p>
                  </div>

                  <div
                    className={`${
                      todo.isCompleted && "line-through"
                    } flex flex-col items-start justify-center ml-3`}
                  >
                    <h4
                      className={`font-semibold ${
                        userTheme === "default"
                          ? "text-white bg-black dark:text-black dark:bg-white"
                          : `${
                              blackText
                                ? "text-white bg-black"
                                : "text-black bg-white"
                            }`
                      }  text-lg`}
                    >
                      {todo.title}
                    </h4>
                    <p
                      className={`text-xs ${
                        userTheme === "default"
                          ? "text-white bg-black dark:text-black dark:bg-white"
                          : `${
                              blackText
                                ? "text-white bg-black"
                                : "text-black bg-white"
                            }`
                      }`}
                    >
                      {todo.content}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center">
                  <button
                    onClick={() => {
                      if (todo.isCompleted) {
                        handleUnCompleteTodo(todo.id);
                      } else {
                        handleCompleteTodo(todo.id);
                      }
                    }}
                    className={`border ${
                      userTheme === "default"
                        ? "border-gray-400 dark:border-[rgba(255,255,255,0.2)]"
                        : `${
                            blackText
                              ? "border-gray-400"
                              : "border-[rgba(255,255,255,0.2)]"
                          }`
                    } rounded-lg p-2 group`}
                  >
                    <Check
                      className={`${
                        !todo.isCompleted
                          ? "group-hover:opacity-100"
                          : "opacity-100 group-hover:opacity-0"
                      }
                      text-green-500 opacity-0 dark:text-green-400 transition-all duration-200 ease-in-out m-0 p-0
                      `}
                      size={15}
                    />
                  </button>
                  <MoreVertical
                    tabIndex={0}
                    size={20}
                    className="text-[rgba(0,0,0,0.5)] cursor-pointer hover:text-black transition-colors ml-5 duration-200 ease-linear dark:text-[rgba(255,255,255,0.5)] dark:hover:text-white m-0 p-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
