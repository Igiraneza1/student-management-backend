import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  registrationNumber: string;
  course: string;
  enrollmentYear: number;
  status: "Active" | "Graduated" | "Dropped";
  role: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  course: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Active", "Graduated", "Dropped"],
    default: "Active",
  },
  role: { type: String, default: "user" },
});

export const User = mongoose.model<IUser>("User", userSchema);
