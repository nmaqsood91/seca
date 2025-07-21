import { api } from "./api";
import { User } from "../shared/types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response?.data?.data || [];
};
