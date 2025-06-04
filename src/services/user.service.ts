import mongoose, { Types } from "mongoose";
import userInformationModel from "../model/userInformation.model";
import userModel from "../model/user.model";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../utils/errors/http-errors";
import { UpdateUserProfileDto, UserInformationDto } from "../dto/request";
import { encryptPassword } from "../utils";
import { MessageResponse } from "../dto/response";

export const userService = {
  /*   async createOrUpdateInformation(userId: string, data: UserInformationDto) {
    let userInformation = await userInformationModel.findOne({
      userId: userId,
    });

    const userInformationdata: UserInformation = {
      userId: new Types.ObjectId(userId),
      ...data,
    };

    if (userInformation) {
      console.log("Update");
      userInformation.phoneNumber =
        data.phoneNumber ?? userInformation.phoneNumber;

      userInformation.address = data.address ?? userInformation.address;

      userInformation.postalCode =
        data.postalCode ?? userInformation.postalCode;

      userInformation.dateOfBirth =
        data.dateOfBirth ?? userInformation.dateOfBirth;

      userInformation.curp = data.curp ?? userInformation.curp;

      userInformation.gender = data.gender ?? userInformation.gender;

      await userInformation.save();
    } else {
      console.log("Created");
      userInformation = new userInformationModel(userInformationdata);
      await userInformation.save();
    }
  }, */

  async createOrUpdateInformation(
    userId: string,
    data: UserInformationDto
  ): Promise<MessageResponse> {
    const exist = await userInformationModel.exists({ userId });
    console.log(exist);
    if (exist) {
      throw new ConflictException("La informacion del usuario ya existe");
    }

    const userInformation = new userInformationModel({
      userId: new Types.ObjectId(userId),
      ...data,
    });

    await userInformation.save();

    return {
      message: "Informacion del usuario cargado correctamente",
      status: true,
    };
  },

  async updateUserProfile(
    userId: string,
    data: UpdateUserProfileDto
  ): Promise<MessageResponse> {
    const { username, password, ...infoData } = data;
    const userUpdate: Partial<{ username: string; password: string }> = {};

    try {
      if (username) userUpdate.username = username;
      if (password) userUpdate.password = await encryptPassword(password);

      if (Object.keys(userUpdate).length > 0) {
        await userModel.findByIdAndUpdate(userId, userUpdate, { new: true });
      }

      if (Object.keys(infoData).length > 0) {
        await userInformationModel.findOneAndUpdate(
          { userId: userId },
          { $set: infoData },
          { upsert: true, new: true }
        );
      }

      return {
        message: "Usuario actualizado correctamente",
        status: true,
      };
    } catch (error) {
      console.log("Error al actualizar al usuario: ", error);
      throw error;
    }
  },

  async deleteUserById(userId: string): Promise<MessageResponse> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException("ID de usuario no valido");
    }

    const deleteUser = await userModel.findByIdAndDelete(userId);

    if (!deleteUser) {
      throw new NotFoundException("Usuario no encontrado");
    }

    return {
      message: "Usuario eliminado correctamente",
      status: true,
    };
  },
};
