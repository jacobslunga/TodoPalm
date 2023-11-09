import api from "../api";
import { TODOS_ROUTES } from "./routes";

async function getTodos(accessToken: string) {
  try {
    const res = await api.get(TODOS_ROUTES.GET_TODOS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getTodo(accessToken: string, id: string) {
  try {
    const res = await api.get(TODOS_ROUTES.GET_TODO(id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function createTodo(
  accessToken: string,
  todoData: {
    title: string;
    content: string;
    categoryId: string;
  }
) {
  try {
    const res = await api.post(TODOS_ROUTES.CREATE_TODO, todoData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const todoService = {
  createTodo,
};
