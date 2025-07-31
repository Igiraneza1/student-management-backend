import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from '../interfaces/student';

const StudentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Graduated', 'Dropped'], default: 'Active' }
}, { timestamps: true });

export default mongoose.model<IStudent>('Student', StudentSchema);


