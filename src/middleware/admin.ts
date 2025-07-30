import { Request, Response, NextFunction } from "express";

// Extend Request to include user info from the decoded JWT
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Allow only admin users
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// Allow only student users
export const isStudent = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "student") {
    return res.status(403).json({ message: "Access denied: Students only" });
  }
  next();
};

// Allow only specific roles
export const allowRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Unauthorized role" });
    }
    next();
  };
};
