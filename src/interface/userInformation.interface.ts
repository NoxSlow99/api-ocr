import { Types } from "mongoose";

export interface UserInformation {
  userId: Types.ObjectId; // Referencia al ID del usuario
  name: string;
  lastNames: string;
  phoneNumber: string;
  address: string;
  postalCode: number;
  dateOfBirth: string;
  curp: string;
  gender: string;
}
