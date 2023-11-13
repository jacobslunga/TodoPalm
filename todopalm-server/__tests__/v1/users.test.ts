/**
 * This file contains tests for the users endpoint of the TodoPalm server.
 * It tests the GET /api/v1/users/me endpoint and the function to generate a mock JWT token.
 * @packageDocumentation
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import request from "supertest";
import prismaMock from "../../singleton";
import { generateRefreshToken } from "../../src/api/v1/middleware/jwt";
import app from "../../src/app";

/**
 * Generates a mock JWT token for the given user ID.
 * @param userId - The ID of the user to generate the token for.
 * @returns The generated JWT token.
 */
function generateMockToken(userId: string): string {
  const jwtSecret = process.env.ACCESS_TOKEN_SECRET as string;
  return jwt.sign({ sub: userId }, jwtSecret, { expiresIn: "1h" });
}

describe("Users", () => {
  beforeAll(async () => {
    for (let i = 0; i < 5; i++) {
      await prismaMock.user.create({
        data: {
          email: `testuser${i}@example.com`,
          name: `Test User ${i}`,
          id: `${i + 1}`,
        },
      });
    }
  });

  /**
   * Tests the GET /api/v1/users/id endpoint.
   */
  describe("GET /api/v1/users/:id", () => {
    test("It should respond with a 200 status code", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: "1",
        email: `testuser1@example.com`,
        name: `Test User 1`,
        additionalInfo: null,
        occupation: null,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        authType: "GOOGLE",
        theme: "default",
        password: null,
      });

      const mockToken = generateMockToken("1");

      const response = await request(app)
        .get(`/api/v1/users/1`)
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("additionalInfo");
      expect(response.body).toHaveProperty("occupation");
      expect(response.body).toHaveProperty("imageUrl");
      expect(response.body).toHaveProperty("createdAt");
    });
  });

  describe("GET /api/v1/users/me", () => {
    test("It should respond with a 200 status code", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: "1",
        email: "testuser1@example.com",
        name: "Test User 1",
        additionalInfo: null,
        occupation: null,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        authType: "GOOGLE",
        theme: "default",
        password: null,
      });

      prismaMock.todoGroup.updateMany.mockResolvedValue({ count: 1 });

      prismaMock.todoGroup.create.mockResolvedValue({
        id: "newTodoGroupId",
        createdAt: new Date(),
        userId: "1",
        isLocked: false,
        status: "active",
      });

      prismaMock.todo.create.mockResolvedValue({
        content: "Test todo",
        id: "newTodoId",
        todoGroupId: "newTodoGroupId",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: null,
        categoryId: null,
        isCompleted: false,
        title: "Test todo",
        userId: "1",
      });

      prismaMock.todo.findMany.mockResolvedValue([
        {
          content: "Test todo",
          id: "newTodoId",
          todoGroupId: "newTodoGroupId",
          createdAt: new Date(),
          updatedAt: new Date(),
          deadline: null,
          categoryId: null,
          isCompleted: false,
          title: "Test todo",
          userId: "1",
        },
      ]);

      const mockToken = generateMockToken("1");

      const response = await request(app)
        .get(`/api/v1/users/me`)
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("additionalInfo");
      expect(response.body).toHaveProperty("occupation");
      expect(response.body).toHaveProperty("imageUrl");
      expect(response.body).toHaveProperty("createdAt");
    });
  });

  describe("updateBasicInfo", () => {
    test("updates user basic info and returns the updated user data", async () => {
      const userId = "1";
      const updatedOccupation = "Software Developer";

      const mockUser = {
        id: userId,
        email: "testuser1@example.com",
        name: "Test User 1",
        imageUrl: null,
      };

      prismaMock.user.update.mockResolvedValue({
        ...mockUser,
        createdAt: new Date(),
        updatedAt: new Date(),
        authType: "GOOGLE",
        theme: "default",
        password: null,
        occupation: updatedOccupation,
        additionalInfo: null,
      });

      const mockToken = generateMockToken(userId);

      const response = await request(app)
        .put("/api/v1/users/me/basic-info")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({ occupation: updatedOccupation });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        email: mockUser.email,
        name: mockUser.name,
        imageUrl: mockUser.imageUrl,
        id: mockUser.id,
        occupation: updatedOccupation,
      });
    });
  });

  describe("setTheme", () => {
    test("updates user theme and returns updated user data", async () => {
      const userId = "1";
      const updatedTheme = "dark";
      const mockUser = {
        id: userId,
        email: "testuser@example.com",
        name: "Test User",
        imageUrl: "http://example.com/image.jpg",
        theme: updatedTheme,
      };

      prismaMock.user.update.mockResolvedValue({
        ...mockUser,
        additionalInfo: null,
        authType: "GOOGLE",
        password: null,
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const mockToken = generateMockToken(userId);

      const response = await request(app)
        .put("/api/v1/users/me/set-theme")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({ theme: updatedTheme });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        email: mockUser.email,
        name: mockUser.name,
        imageUrl: mockUser.imageUrl,
        id: mockUser.id,
      });
    });
  });

  describe("updateUser", () => {
    test("updates user details and returns updated user data", async () => {
      const userId = "1";
      const updatedUserDetails = {
        name: "Updated Name",
        email: "updated@example.com",
        imageUrl: "http://example.com/updated_image.jpg",
      };
      const mockUser = {
        id: userId,
        ...updatedUserDetails,
      };

      prismaMock.user.update.mockResolvedValue({
        ...mockUser,
        additionalInfo: null,
        authType: "GOOGLE",
        password: null,
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "default",
      });

      const mockToken = generateMockToken(userId);

      const response = await request(app)
        .put("/api/v1/users/me")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(updatedUserDetails);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        email: mockUser.email,
        name: mockUser.name,
        imageUrl: mockUser.imageUrl,
        id: mockUser.id,
      });
    });
  });

  describe("deleteAccount", () => {
    test("deletes user account and associated data", async () => {
      const userId = "1";

      prismaMock.todoGroup.deleteMany.mockResolvedValue({
        count: 1,
      });
      prismaMock.todo.deleteMany.mockResolvedValue({
        count: 1,
      });
      prismaMock.user.delete.mockResolvedValue({
        id: userId,
        additionalInfo: null,
        authType: "GOOGLE",
        password: null,
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "default",
        email: "testuser1@example.com",
        name: "Test User 1",
        imageUrl: null,
      });

      const mockToken = generateMockToken(userId);

      const response = await request(app)
        .delete("/api/v1/users/me")
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Account deleted" });
    });
  });

  describe("login", () => {
    test("successfully logs in an existing user", async () => {
      const mockUser = {
        id: "1",
        email: "existinguser@example.com",
        password: await bcrypt.hash("password", 10),
      };

      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        additionalInfo: null,
        authType: "EMAIL",
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "default",
        name: "Existing User",
        imageUrl: null,
      });

      const response = await request(app)
        .post("/api/v1/users/auth/login")
        .send({ email: mockUser.email, password: "password" });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
      expect(response.body).toHaveProperty("expiresAt");
      expect(response.body).toHaveProperty("id", mockUser.id);
    });

    test("creates and logs in a new user", async () => {
      const newUserDetails = {
        email: "newuser@example.com",
        password: "newpassword",
        name: "New User",
      };

      prismaMock.user.findUnique.mockResolvedValue(null);

      prismaMock.user.create.mockResolvedValue({
        id: "2",
        email: newUserDetails.email,
        password: await bcrypt.hash(newUserDetails.password, 10),
        name: newUserDetails.name,
        additionalInfo: null,
        authType: "EMAIL",
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "default",
        imageUrl: null,
      });

      const response = await request(app)
        .post("/api/v1/users/auth/login")
        .send(newUserDetails);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
      expect(response.body).toHaveProperty("expiresAt");
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("Google Login", () => {
    test("successfully logs in a new user via Google", async () => {
      const mockUser = {
        email: "newuser@example.com",
        name: "New User",
        imageUrl: "http://example.com/image.jpg",
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue({
        id: "new-user-id",
        ...mockUser,
        additionalInfo: null,
        authType: "GOOGLE",
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "default",
        password: null,
      });

      const response = await request(app)
        .post("/api/v1/users/auth/google")
        .send(mockUser);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("expiresAt");
      expect(response.body).toHaveProperty("refreshToken");
      expect(response.body.id).toBe("new-user-id");
    });

    test("successfully logs in an existing user via Google", async () => {
      const mockUser = {
        id: "existing-user-id",
        email: "existinguser@example.com",
        name: "Existing User",
        imageUrl: "http://example.com/existingimage.jpg",
      };

      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        additionalInfo: null,
        authType: "GOOGLE",
        occupation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "default",
        password: null,
      });

      const response = await request(app)
        .post("/api/v1/users/auth/google")
        .send({
          email: mockUser.email,
          name: mockUser.name,
          imageUrl: mockUser.imageUrl,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("expiresAt");
      expect(response.body).toHaveProperty("refreshToken");
      expect(response.body.id).toBe(mockUser.id);
    });
  });

  describe("Refresh Token", () => {
    test("successfully refreshes the token", async () => {
      const userId = "test-user-id";
      const mockRefreshToken = generateRefreshToken(userId);

      (jwt.verify as jest.Mock) = jest.fn((token, secret, callback) => {
        if (token === mockRefreshToken) {
          callback(null, { sub: userId });
        } else {
          callback(new Error("Invalid token"), null);
        }
      });

      const response = await request(app)
        .post("/api/v1/users/auth/refresh-token")
        .send({ token: mockRefreshToken });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("expiresAt");
      expect(response.body).toHaveProperty("refreshToken");
    });

    test("returns an error if no token is provided", async () => {
      const response = await request(app)
        .post("/api/v1/users/auth/refresh-token")
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("No token provided");
    });

    test("returns an error for invalid refresh token", async () => {
      const invalidToken = "invalid-refresh-token";

      const response = await request(app)
        .post("/api/v1/users/auth/refresh-token")
        .send({ token: invalidToken });

      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe("Invalid refresh token");
    });
  });

  // Clean up after tests
  afterAll(async () => {
    await prismaMock.user.deleteMany({
      where: {
        email: {
          startsWith: "testuser",
        },
      },
    });
  });
});
