import { userService } from "@/api/users";
import Header from "@/components/Header";
import CreateTodoModal from "@/components/Todos/CreateTodoModal";
import TodoList from "@/components/Todos/TodoList";
import { authOptions } from "@/lib/util/authOptions";
import { getServerSession } from "next-auth";
import { GitHub } from "react-feather";

export default async function TodoGroup() {
  const session: any = await getServerSession(authOptions);

  const userData = await userService.getOrCreate(session.accessToken);

  return (
    <main className="flex min-h-screen flex-col bg-light_bg dark:bg-dark_bg items-center justify-center">
      <Header
        user={{
          imageUrl: userData.imageUrl,
        }}
      />

      <TodoList
        todos={userData.todaysTodos}
        user={{
          id: userData.id,
          name: userData.name,
          imageUrl: userData.imageUrl,
        }}
      />

      <div
        className="absolute bottom-5 right-5 flex flex-row items-center justify-center text-black dark:text-white"
        style={{ fontSize: "0.8rem" }}
      >
        Made with ❤️ by{" "}
        <a
          href="https://github.com/jacobslunga"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 brush ml-1 flex flex-row items-center justify-center"
        >
          @jacobslunga
          <GitHub className="text-black dark:text-white ml-2" size={15} />
        </a>
      </div>

      <CreateTodoModal user={userData} />
    </main>
  );
}
