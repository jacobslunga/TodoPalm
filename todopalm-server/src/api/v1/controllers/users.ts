import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../../prismaClient";
import { generateAccessToken, generateRefreshToken } from "../middleware/jwt";

// GET /api/v1/users/me
export async function getMe(req: Request, res: Response) {
  try {
    const { id } = req?.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        occupation: true,
        additionalInfo: true,
        imageUrl: true,
        todoGroups: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const today = new Date();
    let todaysTodoGroup = user?.todoGroups[0];
    const lastTodoGroupDate = todaysTodoGroup?.createdAt;

    if (
      !lastTodoGroupDate ||
      lastTodoGroupDate.getDate() !== today.getDate() ||
      lastTodoGroupDate.getMonth() !== today.getMonth() ||
      lastTodoGroupDate.getFullYear() !== today.getFullYear()
    ) {
      await prisma.todoGroup.updateMany({
        where: {
          userId: id,
          createdAt: {
            lt: today,
          },
        },
        data: {
          status: "inactive",
        },
      });

      todaysTodoGroup = await prisma.todoGroup.create({
        data: {
          userId: id,
        },
      });
    }

    if (!todaysTodoGroup) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    const todaysTodos = await prisma.todo.findMany({
      where: {
        todoGroupId: todaysTodoGroup.id,
      },
      include: {
        category: true,
      },
    });

    const response = {
      ...user,
      todaysTodoGroup: todaysTodoGroup,
      todaysTodos,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user data: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// GET /api/v1/users/:id
export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        occupation: true,
        additionalInfo: true,
        imageUrl: true,
        todos: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// PUT /api/v1/users/me/basic-info
export async function updateBasicInfo(req: Request, res: Response) {
  try {
    const { id } = req?.user;
    const { occupation } = req.body;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        occupation,
      },
    });

    res.status(200).json({
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// PUT /api/v1/users/me/set-theme
export async function setTheme(req: Request, res: Response) {
  try {
    const { theme } = req.body;
    const { id } = req.user;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        theme,
      },
    });

    res.status(200).json({
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// PUT /api/v1/users/me
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req?.user;
    const { name, email, imageUrl } = req.body;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        imageUrl,
      },
    });

    res.status(200).json({
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// DELETE /api/v1/users/me/delete-account
export async function deleteAccount(req: Request, res: Response) {
  try {
    const { id } = req?.user;

    await prisma.todoGroup.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.todo.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

/* AUTHENTICATION */

// POST /api/v1/users/auth/login
export async function login(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: await bcrypt.hash(password, 10),
        },
      });

      const { token: accessToken, expiresAt } = generateAccessToken(newUser.id);
      const refreshToken = generateRefreshToken(newUser.id);

      return res.status(200).json({
        accessToken,
        expiresAt,
        refreshToken,
        id: newUser.id,
      });
    }

    if (!user.password) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { token: accessToken, expiresAt } = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      accessToken,
      expiresAt,
      refreshToken,
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// POST /api/v1/users/auth/google
export async function googleLogin(req: Request, res: Response) {
  try {
    const { email, name, imageUrl } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          imageUrl,
        },
      });

      const { token: accessToken, expiresAt } = generateAccessToken(newUser.id);
      const refreshToken = generateRefreshToken(newUser.id);

      return res.status(200).json({
        accessToken,
        expiresAt,
        refreshToken,
        id: newUser.id,
      });
    }

    const { token: accessToken, expiresAt } = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      accessToken,
      expiresAt,
      refreshToken,
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// POST /api/v1/users/auth/refresh-token
export async function refreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.body.token;

    if (!refreshToken) {
      return res.status(400).json({ message: "No token provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const { token: newAccessToken, expiresAt } = generateAccessToken(
          user.sub
        );

        const newRefreshToken = generateRefreshToken(user.sub);

        return res.status(200).json({
          accessToken: newAccessToken,
          expiresAt,
          refreshToken: newRefreshToken,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
