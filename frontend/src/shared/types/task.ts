import { User } from "./user";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "OPEN" | "INPROGRESS" | "DONE";
  assignedTo?: User;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description: string;
  assignedTo?: string;
}

export interface GetTasksParams {
  status?: string;
  assignedTo?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}
