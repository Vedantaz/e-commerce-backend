import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/AuthPayload";


export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) : void=> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      "role" in decoded
    ) {
      const payload = decoded as AuthPayload;
      req.user = payload;
      next();
      // Now you can safely use payload.id and payload.role
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
