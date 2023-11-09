import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as string;

function authenticateJwtRequestToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { path } = req;
    const excludedPaths = [
      "/api/v1/users/auth/login",
      "/api/v1/users/auth/register",
      "/api/v1/users/auth/refresh-token",
      "/api/v1/users/auth/google",
    ];

    if (excludedPaths.includes(path)) {
      next();
    } else {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        try {
          const decoded = jwt.verify(token, jwtSecret) as any;
          req.user = { id: decoded.sub };
          next();
        } catch (error) {
          res.status(401).json({ message: "Invalid token" });
        }
      } else {
        res.status(401).json({ message: "No token provided" });
      }
    }
  };
}

// Function to generate access token
function generateAccessToken(userId: string) {
  const payload = {
    sub: userId,
    type: "access",
  };

  const options = {
    expiresIn: "60m",
  };

  const token = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    options
  );
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60;

  return { token, expiresAt };
}

function generateRefreshToken(userId: string) {
  const payload = {
    sub: userId,
    type: "refresh",
  };

  const options = {
    expiresIn: "30d",
  };

  const token = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    options
  );

  return token;
}

export {
  authenticateJwtRequestToken,
  generateAccessToken,
  generateRefreshToken,
};
