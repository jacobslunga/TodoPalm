import { Router } from "express";
import {
  deleteAccount,
  getMe,
  getUser,
  googleLogin,
  login,
  refreshToken,
  setTheme,
  updateBasicInfo,
  updateUser,
} from "../controllers/users";

const usersRouter = Router();

// GET
usersRouter.get("/me", getMe);
usersRouter.get("/:id", getUser);

// PUT
usersRouter.put("/me", updateUser);
usersRouter.put("/me/set-theme", setTheme);
usersRouter.put("/me/basic-info", updateBasicInfo);

// POST
usersRouter.post("/auth/login", login);
usersRouter.post("/auth/refresh-token", refreshToken);
usersRouter.post("/auth/google", googleLogin);

// DELETE
usersRouter.delete("/me", deleteAccount);

export default usersRouter;
