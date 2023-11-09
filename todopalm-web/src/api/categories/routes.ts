export const CATEGORIES_ROUTES = {
  GET_ALL: "/categories",
  GET_ONE: (id: string) => `/categories/${id}`,
  CREATE: "/categories",
  UPDATE: (id: string) => `/categories/${id}`,
  DELETE: (id: string) => `/categories/${id}`,
};
