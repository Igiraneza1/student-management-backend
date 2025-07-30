import mongoose, { Schema, Document } from "mongoose"; 

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String }, // Add this
  password: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  course: { type: String },
  enrollmentYear: { type: Number },
  profilePicture: { type: String }, // Optional Cloudinary link
  status: {
    type: String,
    enum: ["Active", "Graduated", "Dropped"],
    default: "Active",
  },
  role: { type: String, enum: ["student", "admin"], default: "student" },
});
export const User = mongoose.model<IUser>("User", userSchema);
