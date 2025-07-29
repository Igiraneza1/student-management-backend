export default interface User {
  id: string;
  name: string;
  email: string;
  registrationNumber: string;
  course: string;
  enrollmentYear: number;
  status: "Active" | "Graduated" | "Dropped";
  role: string;
}
