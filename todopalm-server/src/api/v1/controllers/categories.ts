import { Request, Response } from "express";
import { prisma } from "../../../prismaClient";

// GET /api/v1/categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/v1/categories/:id
export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// POST /api/v1/categories
export const createCategories = async (req: Request, res: Response) => {
  const { categories } = req.body;
  const { id } = req.user;

  try {
    const createdCategories = await prisma.category.createMany({
      data: categories.map((category: any) => ({
        ...category,
        userId: id,
      })),
    });

    res.status(201).json(createdCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// PUT /api/v1/categories/:id
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// DELETE /api/v1/categories/:id
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    res.json(deletedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
