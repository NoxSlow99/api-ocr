import { NextFunction, Request, Response } from "express";
import {
  ForbiddenException,
  UnauthorizedException,
} from "../utils/errors/http-errors";
import { verifyJwt } from "../utils/jwtUtils";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedException("No ha iniciado sesion");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyJwt(token);

    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new ForbiddenException(
      `Token inválido o expirado: ${(error as Error).message}`
    );
  }
};
