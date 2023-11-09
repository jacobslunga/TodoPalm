import { Router } from "express";
import {
  getTodoGroup,
  getTodoGroups,
  lockTodoGroup,
} from "../controllers/todoGroups";

const todoGroupsRouter = Router();

// GET
todoGroupsRouter.get("/", getTodoGroups);
todoGroupsRouter.get("/:id", getTodoGroup);

// PUT
todoGroupsRouter.put("/:id/lock", lockTodoGroup);

export default todoGroupsRouter;
