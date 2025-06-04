import { UserRegisterDto } from "../dto/request/userRegisterRequest.dto";
import { LoginResponse } from "../dto/response/loginResponse.dto";
import { JwtPayload } from "../interface/jwtPayload.interface";
import { User } from "../interface/user.interface";
import userModel from "../model/user.model";
import { comparePassword, encryptPassword } from "../utils";
import {
  BadRequestException,
  UnauthorizedException,
} from "../utils/errors/http-errors";
import { generateJwt } from "../utils/jwtUtils";

export const registerService = async (
  user: UserRegisterDto
): Promise<LoginResponse> => {
  try {
    const { password } = user;
    const encryptedPassword = await encryptPassword(password);

    const newUser: User = {
      ...user,
      password: encryptedPassword,
    };

    const createdUser = await userModel.create(newUser);

    const payload: JwtPayload = {
      id: createdUser._id as string,
      email: createdUser.email,
      username: createdUser.username,
    };

    const token = generateJwt(payload);

    return {
      message: "Usuario creado correctamente",
      token,
      status: true,
    };
  } catch (error: any) {
    if (error.code === 11000) {
      const campo = Object.keys(error.keyValue)[0];
      throw new BadRequestException(`El ${campo} ya está en uso`);
    }

    throw error;
  }
};

export const loginService = async (
  credential: string,
  password: string
): Promise<LoginResponse> => {
  const user = await userModel.findOne({
    $or: [{ email: credential }, { username: credential }],
  });

  if (!user) {
    throw new UnauthorizedException("Usuario no encontrado");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException("Credenciales no validas");
  }

  const payload: JwtPayload = {
    id: user._id as string,
    email: user.email,
    username: user.username,
  };

  const token = generateJwt(payload);

  return {
    message: "Usuario logueado correctamente",
    token,
    status: true,
  };
};
