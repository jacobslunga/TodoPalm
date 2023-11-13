"use client";

import { todoService } from "@/api/todos";
import { FC, useState } from "react";
import { X } from "react-feather";
import CategoryList from "../util/CategoryList";

interface CreateTodoModalProps {
  user: any;
  accessToken: string;
}

const CreateTodoModal: FC<CreateTodoModalProps> = ({ user, accessToken }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(
    user.categories.length > 0 ? user.categories[0].name : ""
  );

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

    const res = await todoService.createTodo(accessToken, todoData);
    console.log(res);
    setLoading(false);

    setCategory("");
    setTitle("");
    setContent("");

    modal?.close();
  };

  return (
    <dialog
      id="create_todo_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white min-h-2/3 dark:bg-[#1B1C1D] border dark:border-[rgba(255,255,255,0.1)]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Create Todo
          </h2>

          <form method="dialog">
            <button onClick={() => {}}>
              <X className="text-black dark:text-white m-0 p-0" size={20} />
            </button>
          </form>
        </div>
        {user.categories.length > 0 && (
          <div className="">
            <label
              htmlFor="category"
              className="text-xs font-medium text-black dark:text-white mb-1"
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
            className="text-xl font-medium text-black dark:text-white mb-1"
          >
            Todo
          </label>
          <input
            placeholder="Your todo"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            className="p-5 border text-sm dark:border-[rgba(255,255,255,0.1)] bg-gray-50 outline-none rounded-lg dark:bg-dark_bg dark:text-white"
          />
        </div>

        <div className="flex flex-col mt-5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-black dark:text-white mb-1"
          >
            Description
          </label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your todo description"
            className="p-3 border text-sm dark:border-[rgba(255,255,255,0.1)] bg-gray-50 outline-none rounded-lg dark:bg-dark_bg dark:text-white"
          />
        </div>

        <div className="flex flex-row justify-end mt-5">
          <button
            disabled={isDisabled}
            onClick={handleAddTodo}
            className="px-5 py-2 bg-primary flex flex-row items-center justify-center text-white hover:opacity-70 duration-200 transition-opacity disabled:hover:opacity-100 text-sm font-medium disabled:cursor-not-allowed cursor-pointer disabled:text-[rgba(0,0,0,0.3)] disabled:dark:text-[rgba(255,255,255,0.3)] disabled:bg-gray-50 disabled:dark:bg-dark_bg rounded-lg"
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
