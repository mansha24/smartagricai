export type Role = "admin" | "farmer" | "userfarmer";

export type UserRecord = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};
