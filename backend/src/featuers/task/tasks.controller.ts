import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskCommand } from "../task/commands/create-task.command";
import { UpdateTaskCommand } from "../task/commands/update-task.command";
import mongoose, { FilterQuery, SortOrder } from "mongoose";
import { Task } from "./schemas/task.schema";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() dto: CreateTaskCommand,
  ): Promise<{ data: Task; message: string }> {
    return { data: await this.tasksService.create(dto), message: "SUCCESS" };
  }

  @Get()
  async findAll(
    @Query()
    query: {
      sortBy?: string;
      order?: "asc" | "desc";
      assignedTo?: string;
      status?: string;
    },
  ): Promise<{ data: Task[]; message: string }> {
    const filter: FilterQuery<Task> = {};
    const sort: { [key: string]: SortOrder } = {};

    if (query.sortBy) {
      sort[query.sortBy] = query.order === "desc" ? -1 : 1;
    }

    if (query.assignedTo && mongoose.isValidObjectId(query.assignedTo)) {
      filter.assignedTo = query.assignedTo;
    }

    if (query.status) {
      filter.status = query.status;
    }

    return {
      data: await this.tasksService.findAll(filter, sort),
      message: "SUCCESS",
    };
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
  ): Promise<{ data: Task; message: string }> {
    return { data: await this.tasksService.findById(id), message: "SUCCESS" };
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateTaskCommand,
  ): Promise<{ data: Task; message: string }> {
    return {
      data: await this.tasksService.update(id, dto),
      message: "SUCCESS",
    };
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ data: Task; message: string }> {
    return { data: await this.tasksService.delete(id), message: "SUCCESS" };
  }
}
