import { Request, Response } from "express";
import { prisma } from "../../../prismaClient";

// GET /api/v1/todos
export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        id: req.user?.id,
      },
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// GET /api/v1/todos/:id
export async function getTodoById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// POST /api/v1/todos
export async function createTodo(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, content, categoryId } = req.body;

    const data: any = {
      title,
      content,
      user: {
        connect: {
          id: req.user?.id,
        },
      },
    };

    if (categoryId) {
      data.category = {
        connect: {
          id: categoryId,
        },
      };
    }

    const todo = await prisma.todo.create({ data });

    return res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// PUT /api/v1/todos/:id
export async function updateTodo(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// DELETE /api/v1/todos/:id
export async function deleteTodo(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
