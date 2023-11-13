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

describe("Categories", () => {
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
    prismaMock.$disconnect();
  });

  test("GET /api/v1/categories", async () => {
    prismaMock.category.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Test Category",
        createdAt: new Date(),
        userId: "1",
        icon: "test",
      },
    ]);

    const mockToken = generateMockToken("1");

    const response = await request(app)
      .get("/api/v1/categories")
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "1",
        name: "Test Category",
        createdAt: expect.any(String),
        userId: "1",
        icon: "test",
      },
    ]);
  });

  test("GET /api/v1/categories/:id", async () => {
    prismaMock.category.findUnique.mockResolvedValue({
      id: "1",
      name: "Test Category",
      createdAt: new Date(),
      userId: "1",
      icon: "test",
    });

    const mockToken = generateMockToken("1");

    const response = await request(app)
      .get("/api/v1/categories/1")
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: "1",
      name: "Test Category",
      createdAt: expect.any(String),
      userId: "1",
      icon: "test",
    });
  });

  test("POST /api/v1/categories", async () => {
    prismaMock.category.createMany.mockResolvedValue({ count: 1 });

    const mockToken = generateMockToken("1");
    const categories = [
      {
        name: "Test Category",
        icon: "test",
      },
    ];

    const response = await request(app)
      .post("/api/v1/categories")
      .send({ categories })
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ count: 1 });
  });
});
