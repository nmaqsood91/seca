import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Task as TaskEntity, TaskStatus } from "../../../entities/task.entity";

@Schema({ timestamps: true })
export class Task extends Document implements TaskEntity {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @Prop({ required: false })
  assignedTo?: string;

  @Prop() createdAt?: Date;

  @Prop() updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
