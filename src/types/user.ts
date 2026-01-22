export type User = {
  id?: number;
  username: string;
  password?: string;
  role: "ADMIN" | "USER";
  status?: number;
};
