import { Request, Response } from 'express';
import Student from '../models/student';
import { protect, admin } from '../middleware/auth';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find().populate('user', 'name email phone role');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email phone role');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};