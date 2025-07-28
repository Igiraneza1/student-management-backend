import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  registrationNumber: string;
  fieldOfStudy: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  role: { type: String, default: "user" }, 
});

export const User = mongoose.model<IUser>("User", userSchema);
