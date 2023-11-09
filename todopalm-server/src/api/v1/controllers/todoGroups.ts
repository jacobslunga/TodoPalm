import { Request, Response } from "express";
import { prisma } from "../../../prismaClient";

// GET /api/v1/todo-groups
export const getTodoGroups = async (req: Request, res: Response) => {
  try {
    const todoGroups = await prisma.todoGroup.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        todos: true,
      },
    });

    res.json(todoGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/v1/todo-groups/:id
export const getTodoGroup = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todoGroup = await prisma.todoGroup.findUnique({
      where: {
        id,
      },
      include: {
        todos: true,
      },
    });

    if (!todoGroup) {
      return res.status(404).json({ error: "Todo group not found" });
    }

    res.json(todoGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// PUT /api/v1/todo-groups/:id/lock
export const lockTodoGroup = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todoGroup = await prisma.todoGroup.update({
      where: {
        id,
      },
      data: {
        isLocked: true,
      },
    });

    res.json(todoGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
