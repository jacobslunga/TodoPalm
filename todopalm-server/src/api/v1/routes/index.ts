import { Router } from "express";
import categoriesRouter from "./categories";
import todoGroupsRouter from "./todoGroups";
import todosRouter from "./todos";
import usersRouter from "./users";

const v1Router = Router();

v1Router.use("/todos", todosRouter);
v1Router.use("/users", usersRouter);
v1Router.use("/categories", categoriesRouter);
v1Router.use("/todo-groups", todoGroupsRouter);

export default v1Router;
