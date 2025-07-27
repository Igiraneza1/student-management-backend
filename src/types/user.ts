export interface IUser {
  email: string;
  password: string;
  registrationNumber: string;
  fieldOfStudy: string;
  role: "user" | "admin";
}
