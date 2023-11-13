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

describe("Todo Group", () => {
  beforeAll(async () => {
    prismaMock.user.create.mockResolvedValue({
      id: "1",
      email: "testuser@example.com",
      password: "password",
      name: "Test User",
      additionalInfo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      occupation: null,
      imageUrl: null,
      authType: "EMAIL",
      theme: "default",
    });
  });

  afterAll(async () => {
    await prismaMock.$disconnect();
  });

  describe("GET /api/v1/todo-groups", () => {
    it("should return 401 if no token is provided", async () => {
      const res = await request(app).get("/api/v1/todo-groups");
      expect(res.status).toBe(401);
    });

    it("should return 200 if a valid token is provided", async () => {
      prismaMock.todoGroup.findMany.mockResolvedValue([
        {
          id: "1",
          createdAt: new Date(),
          userId: "1",
          status: "ACTIVE",
          isLocked: false,
        },
      ]);

      const token = generateMockToken("1");
      const res = await request(app)
        .get("/api/v1/todo-groups")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /api/v1/todo-groups/:id", () => {
    it("should return 401 if no token is provided", async () => {
      const res = await request(app).get("/api/v1/todo-groups/1");
      expect(res.status).toBe(401);
    });

    it("should return 200 if a valid token is provided", async () => {
      prismaMock.todoGroup.findUnique.mockResolvedValue({
        id: "1",
        createdAt: new Date(),
        userId: "1",
        status: "ACTIVE",
        isLocked: false,
      });

      const token = generateMockToken("1");
      const res = await request(app)
        .get("/api/v1/todo-groups/1")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /api/v1/todo-groups/:id/lock", () => {
    it("should return 401 if no token is provided", async () => {
      const res = await request(app).post("/api/v1/todo-groups/1/lock");
      expect(res.status).toBe(401);
    });

    it("should return 200 if a valid token is provided", async () => {
      prismaMock.todoGroup.update.mockResolvedValue({
        id: "1",
        createdAt: new Date(),
        userId: "1",
        status: "ACTIVE",
        isLocked: false,
      });

      const token = generateMockToken("1");
      const res = await request(app)
        .put("/api/v1/todo-groups/1/lock")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
