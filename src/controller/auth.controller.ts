import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";
import { UserRegisterDto } from "../dto/request/userRegisterRequest.dto";
import { LoginDto } from "../dto/request/loginRequest.dto";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.body as UserRegisterDto;

  try {
    const response = await registerService(user);

    res.status(201).json(response);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const credentials = req.body as LoginDto;

  try {
    const response = await loginService(
      credentials.credential,
      credentials.password
    );

    res.status(200).json(response);
  } catch (error: any) {
    next(error);
  }
};
