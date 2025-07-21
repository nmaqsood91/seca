export enum TaskStatus {
  OPEN = "OPEN",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

export class Task {
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
