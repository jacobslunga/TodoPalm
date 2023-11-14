import { FC } from "react";

interface TodoListProps {}

const TodoLists: FC<TodoListProps> = ({}) => {
  return (
    <main className="flex min-h-screen flex-col bg-light_bg dark:bg-dark_bg items-center justify-center"></main>
  );
};

export default TodoLists;
