import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/user";

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
});

export const User = mongoose.model<IUserModel>("User", userSchema);
