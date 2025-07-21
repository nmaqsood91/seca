import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, FilterQuery, SortOrder } from "mongoose";
import { Task } from "./schemas/task.schema";
import { CreateTaskCommand } from "../task/commands/create-task.command";
import { UpdateTaskCommand } from "../task/commands/update-task.command";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  private validateObjectId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid task ID");
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof HttpException) throw error;
    const message =
      error instanceof Error ? error.message : "Internal server error";
    throw new HttpException(message, 500);
  }

  async create(dto: CreateTaskCommand): Promise<Task> {
    try {
      return await this.taskModel.create(dto);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(
    filter: FilterQuery<Task> = {},
    sort: string | { [key: string]: SortOrder } = {},
  ): Promise<Task[]> {
    try {
      return await this.taskModel
        .find(filter)
        .sort(sort)
        .populate("assignedTo")
        .lean()
        .exec();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string): Promise<Task> {
    try {
      this.validateObjectId(id);

      const task = await this.taskModel
        .findById(id)
        .populate("assignedTo")
        .lean()
        .exec();

      if (!task) {
        throw new NotFoundException("Task not found");
      }

      return task;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateTaskCommand): Promise<Task> {
    try {
      this.validateObjectId(id);

      const task = await this.taskModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();

      if (!task) {
        throw new NotFoundException("Task not found");
      }

      return task;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<Task> {
    try {
      this.validateObjectId(id);

      const task = await this.taskModel.findByIdAndDelete(id).exec();

      if (!task) {
        throw new NotFoundException("Task not found");
      }

      return task;
    } catch (error) {
      this.handleError(error);
    }
  }
}
