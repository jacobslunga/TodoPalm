import jwt from "jsonwebtoken";
import request from "supertest";
import prismaMock from "../../singleton";
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

describe("Todos", () => {
  beforeEach(async () => {
    await prismaMock.user.create({
      data: {
        email: `testuser1@example.com`,
        name: `Test User 1`,
        id: `1`,
      },
    });

    prismaMock.todo.findMany.mockResolvedValue([
      {
        id: "todo1",
        title: "Todo 1",
        content: "Content 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "1",
        categoryId: "1",
        deadline: new Date(),
        isCompleted: false,
        todoGroupId: "1",
      },
    ]);
    prismaMock.todo.findUnique.mockResolvedValue({
      id: "todo1",
      title: "Test Todo 1",
      content: "Content for Test Todo 1",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user1",
      categoryId: "category1",
      deadline: new Date(),
      todoGroupId: "todoGroup1",
    });
    prismaMock.todo.create.mockResolvedValue({
      id: "todo1",
      title: "Test Todo 1",
      content: "Content for Test Todo 1",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user1",
      categoryId: "category1",
      deadline: new Date(),
      todoGroupId: "todoGroup1",
    });
    prismaMock.todo.delete.mockResolvedValue({
      id: "todo1",
      title: "Test Todo 1",
      content: "Content for Test Todo 1",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user1",
      categoryId: "category1",
      deadline: new Date(),
      todoGroupId: "todoGroup1",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // GET /api/v1/todos
  describe("GET /api/v1/todos", () => {
    test("fetches all todos", async () => {
      const mockToken = generateMockToken("1");

      const response = await request(app)
        .get("/api/v1/todos")
        .set("Authorization", `Bearer ${mockToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("content");
      expect(response.body[0]).toHaveProperty("isCompleted");
      expect(response.body[0]).toHaveProperty("createdAt");
      expect(response.body[0]).toHaveProperty("updatedAt");
      expect(response.body[0]).toHaveProperty("userId");
    });
  });

  // GET /api/v1/todos/:id
  describe("GET /api/v1/todos/:id", () => {
    test("fetches todo by ID", async () => {
      const mockToken = generateMockToken("1");

      const response = await request(app)
        .get("/api/v1/todos/1")
        .set("Authorization", `Bearer ${mockToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("content");
      expect(response.body).toHaveProperty("isCompleted");
      expect(response.body).toHaveProperty("createdAt");
      expect(response.body).toHaveProperty("updatedAt");
      expect(response.body).toHaveProperty("userId");
    });
  });

  // POST /api/v1/todos
  describe("POST /api/v1/todos", () => {
    test("creates a new todo", async () => {
      const mockToken = generateMockToken("1");

      const response = await request(app)
        .post("/api/v1/todos")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({ title: "New Todo", content: "Content here" });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("content");
      expect(response.body).toHaveProperty("isCompleted");
      expect(response.body).toHaveProperty("createdAt");
      expect(response.body).toHaveProperty("updatedAt");
      expect(response.body).toHaveProperty("userId");
    });
  });
});

// PUT /api/v1/todos/:id
describe("PUT /api/v1/todos/:id", () => {
  test("updates a todo", async () => {
    prismaMock.todo.update.mockResolvedValue({
      id: "todo1",
      title: "Updated Todo",
      content: "Updated content",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user1",
      categoryId: "category1",
      deadline: new Date(),
      todoGroupId: "todoGroup1",
    });

    const mockToken = generateMockToken("1");

    const response = await request(app)
      .put("/api/v1/todos/todo1")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({ title: "Updated Todo", content: "Updated content" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("isCompleted");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("userId");
    expect(response.body.title).toBe("Updated Todo");
    expect(response.body.content).toBe("Updated content");
  });
});

// DELETE /api/v1/todos/:id
describe("DELETE /api/v1/todos/:id", () => {
  test("deletes a todo", async () => {
    const mockToken = generateMockToken("1");

    const response = await request(app)
      .delete("/api/v1/todos/1")
      .set("Authorization", `Bearer ${mockToken}`);
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });
});
