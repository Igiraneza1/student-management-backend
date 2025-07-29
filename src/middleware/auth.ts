import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Extend Express Request to include user
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if header is present and starts with "Bearer "
  if (!authHeader || !/^Bearer\s+/i.test(authHeader)) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // Verify token with secret
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not set in environment");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & { id: string; role: string };

    // Optional: check token expiration
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: "Token has expired" });
    }

    // Attach decoded user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); // Proceed to next middleware or route
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ message: "Token verification failed" });
  }
};
