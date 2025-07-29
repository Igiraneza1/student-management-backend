export interface IUser {
  email: string;
  password: string;
  registrationNumber: string;
  fieldOfStudy: string;
  year: Number;
  role: "user" | "admin";
}
