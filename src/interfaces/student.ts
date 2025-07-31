import { Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  registrationNumber: string;
  course: string;
  enrollmentYear: number;
  status: 'Active' | 'Graduated' | 'Dropped';
  role: 'student' | 'admin';
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}