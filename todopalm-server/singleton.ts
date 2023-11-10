import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: function () {
      return prismaMock;
    },
  };
});

beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
