import moongose, { Schema, Document } from "mongoose";
import { User } from "../interface/user.interface";
import userInformationModel from "./userInformation.model";

export interface IUser extends User, Document {}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware que se ejecuta despues de eliminar un usuario
UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await userInformationModel.deleteOne({ userId: doc._id });
  }
});

export default moongose.model<IUser>("User", UserSchema);
