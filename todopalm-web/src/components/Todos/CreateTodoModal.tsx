"use client";

import { todoService } from "@/api/todos";
import { shouldBeBlackText } from "@/lib/util/theme";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { X } from "react-feather";
import CategoryList from "../util/CategoryList";

interface CreateTodoModalProps {
  user: any;
  accessToken: string;
}

const CreateTodoModal: FC<CreateTodoModalProps> = ({ user, accessToken }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(
    user.categories.length > 0 ? user.categories[0].name : ""
  );

  const userTheme = user.theme;
  const blackText = shouldBeBlackText(userTheme);

  const [loading, setLoading] = useState(false);

  const isDisabled = title.length === 0 || content.length === 0;

  const handleAddTodo = async () => {
    if (isDisabled) return;

    setLoading(true);
    const modal = document.getElementById("create_todo_modal") as any;

    const todoData = {
      title,
      content,
      categoryId: user.categories.find((c: any) => c.name === category)
        .id as string,
    };

    await todoService.createTodo(accessToken, todoData);
    setLoading(false);

    setCategory("");
    setTitle("");
    setContent("");

    router.refresh();

    modal?.close();
  };

  return (
    <dialog
      id="create_todo_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div
        className={`modal-box border-none ${
          userTheme === "default"
            ? "bg-white dark:bg-[#1B1C1D] dark:border-[rgba(255,255,255,0.1)]"
            : `bg-${userTheme}`
        } min-h-2/3 border`}
      >
        <div className="flex flex-row items-center justify-between">
          <h2
            className={`font-semibold underline text-lg sm:text-xl md:text-xl lg:text-2xl ${
              userTheme === "default"
                ? "text-black dark:text-white"
                : `${blackText ? "text-black" : "text-white"}`
            }`}
          >
            Create Todo
          </h2>

          <form method="dialog">
            <button onClick={() => {}}>
              <X
                className={`font-semibold underline text-lg sm:text-xl md:text-xl lg:text-2xl ${
                  userTheme === "default"
                    ? "text-black dark:text-white"
                    : `${blackText ? "text-black" : "text-white"}`
                } p-0 m-0`}
              />
            </button>
          </form>
        </div>
        {user.categories.length > 0 && (
          <div className="flex flex-col mt-5">
            <label
              htmlFor="category"
              className={`${
                userTheme === "default"
                  ? "text-black dark:text-white"
                  : `${blackText ? "text-black" : "text-white"}`
              } p-0 m-0 text-lg font-normal mb-1`}
            >
              Category
            </label>
            <CategoryList
              category={category}
              setCategory={setCategory}
              user={user}
            />
          </div>
        )}

        <div className="flex flex-col mt-5">
          <label
            htmlFor="email"
            className={`${
              userTheme === "default"
                ? "text-black dark:text-white"
                : `${blackText ? "text-black" : "text-white"}`
            } p-0 m-0 text-lg font-normal mb-1`}
          >
            Todo
          </label>
          <input
            placeholder="Your todo"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            className={`p-5 border text-sm ${
              userTheme === "default"
                ? "bg-gray-50 text-black dark:text-white dark:bg-dark_bg dark:border-[rgba(255,255,255,0.1)]"
                : `${
                    blackText
                      ? "bg-gray-50 text-black"
                      : "text-white bg-dark_bg border-[rgba(255,255,255,0.1)]"
                  }`
            } outline-none rounded-lg`}
          />
        </div>

        <div className="flex flex-col mt-5">
          <label
            htmlFor="email"
            className={`${
              userTheme === "default"
                ? "text-black dark:text-white"
                : `${blackText ? "text-black" : "text-white"}`
            } p-0 m-0 text-sm font-normal mb-1`}
          >
            Description
          </label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your todo description"
            className={`p-3 border text-sm ${
              userTheme === "default"
                ? "bg-gray-50 text-black dark:text-white dark:bg-dark_bg dark:border-[rgba(255,255,255,0.1)]"
                : `${
                    blackText
                      ? "bg-gray-50 text-black"
                      : "text-white bg-dark_bg border-[rgba(255,255,255,0.1)]"
                  }`
            } outline-none rounded-lg`}
          />
        </div>

        <div className="flex flex-row justify-end mt-5">
          <button
            disabled={isDisabled}
            onClick={handleAddTodo}
            className={`px-5 py-2 bg-primary flex flex-row items-center justify-center ${
              userTheme === "default"
                ? "disabled:text-[rgba(0,0,0,0.3)] disabled:dark:text-[rgba(255,255,255,0.3)] disabled:bg-gray-50 disabled:dark:bg-dark_bg"
                : blackText
                ? "disabled:text-[rgba(0,0,0,0.3)] disabled:bg-gray-50"
                : "disabled:dark:bg-dark_bg"
            } text-white hover:opacity-70 duration-200 transition-opacity disabled:hover:opacity-100 text-sm font-medium disabled:cursor-not-allowed cursor-pointer rounded-lg`}
          >
            Create
            {loading && (
              <span className="loading loading-dots loading-xs ml-2"></span>
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreateTodoModal;
