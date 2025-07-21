import { IsNotEmpty, IsOptional, IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../../../entities/task.entity";

export class CreateTaskCommand {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  assignedTo?: string;
}
