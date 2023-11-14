import api from "../api";
import { USER_ROUTES } from "./routes";

async function getOrCreate(accessToken: string) {
  try {
    const res = await api.get(USER_ROUTES.GET_OR_CREATE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateBasicInfo(accessToken: string, occupation: string) {
  try {
    const res = await api.put(
      USER_ROUTES.UPDATE_BASIC_INFO,
      {
        occupation,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function setTheme(accessToken: string, theme: string) {
  try {
    const res = await api.put(
      USER_ROUTES.SET_THEME,
      {
        theme,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const userService = {
  getOrCreate,
  updateBasicInfo,
  setTheme,
};
