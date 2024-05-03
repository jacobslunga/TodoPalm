import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
  completeTodo,
  unCompleteTodo,
} from "../controllers/todos";

const todosRouter = Router();

// GET
todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodoById);

// PUT
todosRouter.put("/:id", updateTodo);
todosRouter.put("/:id/complete", completeTodo);
todosRouter.put("/:id/uncomplete", unCompleteTodo);

// POST
todosRouter.post("/", createTodo);

// DELETE
todosRouter.delete("/:id", deleteTodo);

export default todosRouter;
