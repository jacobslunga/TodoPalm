"use client";

import { FC, useState } from "react";
import { X } from "react-feather";

interface CreateTodoModalProps {
  user: any;
}

const CreateTodoModal: FC<CreateTodoModalProps> = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <dialog
      id="create_todo_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white dark:bg-[#1B1C1D] border dark:border-[rgba(255,255,255,0.1)]">
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
        <div className="flex flex-col">
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
            onClick={() => {}}
            className="px-5 py-2 text-sm font-medium text-black dark:text-white bg-gray-50 dark:bg-dark_bg rounded-lg"
          >
            Create
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
