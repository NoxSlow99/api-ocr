import { NextFunction, Request, Response } from "express";
import { UserInformationDto } from "../dto/request/userInformationRequest.dto";
import { userService } from "../services/user.service";
import { UpdateUserProfileDto } from "../dto/request";
import { BadRequestException } from "../utils/errors/http-errors";

export const addUserInformation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;

  const data = req.body as UserInformationDto;

  const response = await userService.createOrUpdateInformation(userId, data);

  res.status(200).json(response);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const updateUserProfile: UpdateUserProfileDto = req.body;
  console.log(updateUserProfile);

  if (Object.keys(updateUserProfile).length === 0) {
    throw new BadRequestException("Debe enviar un campo minimo");
  }

  const userId = (req as any).user.id;

  const response = await userService.updateUserProfile(
    userId,
    updateUserProfile
  );

  res.status(200).json(response);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userIdInt = (req as any).user.id;

    const response = await userService.deleteUserById(userIdInt);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
