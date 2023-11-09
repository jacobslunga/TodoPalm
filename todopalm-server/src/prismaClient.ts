import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.NODE_ENV === "test"
          ? process.env.DATABASE_URL_DEV
          : process.env.DATABASE_URL_DEV,
    },
  },
});

export { prisma };
