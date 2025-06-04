import mongoose, { Document, Schema } from "mongoose";
import { UserInformation } from "../interface/userInformation.interface";

export interface IUserInformation extends UserInformation, Document {}

const UserInformationSchema = new Schema<IUserInformation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String },
    lastNames: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    postalCode: { type: Number },
    dateOfBirth: { type: String },
    curp: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUserInformation>(
  "UserInformation",
  UserInformationSchema
);
