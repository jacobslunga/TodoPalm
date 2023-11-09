import api from "../api";
import { CATEGORIES_ROUTES } from "./routes";

async function getCategories(accessToken: string) {
  try {
    const res = await api.get(CATEGORIES_ROUTES.GET_ALL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getCategory(accessToken: string, id: string) {
  try {
    const res = await api.get(CATEGORIES_ROUTES.GET_ONE(id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function createCategories(accessToken: string, data: any) {
  try {
    const res = await api.post(
      CATEGORIES_ROUTES.CREATE,
      { categories: data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function updateCategory(accessToken: string, id: string, data: any) {
  try {
    const res = await api.put(CATEGORIES_ROUTES.UPDATE(id), data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCategory(accessToken: string, id: string) {
  try {
    const res = await api.delete(CATEGORIES_ROUTES.DELETE(id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const categoriesService = {
  getCategories,
  getCategory,
  createCategories,
  updateCategory,
  deleteCategory,
};
