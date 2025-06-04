import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/errors/http-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Middleware 'error-handler': ", err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Error interno del servidor",
    });
  }
};
