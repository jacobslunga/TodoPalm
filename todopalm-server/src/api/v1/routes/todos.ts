import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todos";

const todosRouter = Router();

// GET
todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodoById);

// PUT
todosRouter.put("/:id", updateTodo);

// POST
todosRouter.post("/", createTodo);

// DELETE
todosRouter.delete("/:id", deleteTodo);

export default todosRouter;
