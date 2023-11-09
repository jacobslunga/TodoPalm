import { Router } from "express";
import {
  createCategories,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories";

const categoriesRouter = Router();

// GET
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:id", getCategory);

// PUT
categoriesRouter.put("/:id", updateCategory);

// POST
categoriesRouter.post("/", createCategories);

// DELETE
categoriesRouter.delete("/:id", deleteCategory);

export default categoriesRouter;
