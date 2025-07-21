import { api } from "./api";
import { GetTasksParams, Task, TaskPayload } from "../shared/types/task";

export const getTasks = async (params?: GetTasksParams): Promise<Task[]> => {
  const res = await api.get("/tasks", { params });
  return res.data?.data;
};
export const getTaskById = async (id: string): Promise<Task> =>
  (await api.get(`/tasks/${id}`))?.data?.data;

export const createTask = async (payload: TaskPayload): Promise<Task> =>
  (await api.post("/tasks", payload))?.data?.data;

export const updateTask = async (
  id: string,
  payload: TaskPayload
): Promise<Task> =>
  (await api.patch(`/tasks/${id}`, payload))?.data?.data;

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
