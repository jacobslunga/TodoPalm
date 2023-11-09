export const TODOS_ROUTES = {
  CREATE_TODO: "/todos/",
  GET_TODO: (id: string) => `/todos/${id}`,
  UPDATE_TODO: (id: string) => `/todos/${id}`,
  DELETE_TODO: (id: string) => `/todos/${id}`,
  GET_TODOS: "/todos",
};
