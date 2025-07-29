import mongoose, { Schema, Document, model } from "mongoose";

// Define the user interface
export interface IUser extends Document {
  email: string;
  password: string;
  registrationNumber: string;
  fieldOfStudy: string;
  role: string;
  year:number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the user schema
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, 
  }
);

export const User = model<IUser>("User", userSchema);
