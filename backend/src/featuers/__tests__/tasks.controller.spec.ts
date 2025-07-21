import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "../task/tasks.controller";
import { TasksService } from "../task/tasks.service";
import { CreateTaskCommand } from "../task/commands/create-task.command";
import { UpdateTaskCommand } from "../task/commands/update-task.command";
import { Task } from "../task/schemas/task.schema";
import { TaskStatus } from "../../entities/task.entity";

describe("TasksController", () => {
  let controller: TasksController;

  const mockTask: Partial<Task> = {
    _id: "507f1f77bcf86cd799439011",
    title: "Test Task",
    status: TaskStatus.OPEN,
    createdAt: new Date(),
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findById: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    delete: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a task", async () => {
    const dto: CreateTaskCommand = { title: "Test Task" } as CreateTaskCommand;
    const result = await controller.create(dto);
    expect(result.data).toEqual(mockTask);
    expect(result.message).toBe("SUCCESS");
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it("should return all tasks", async () => {
    const result = await controller.findAll({});
    expect(result.data).toEqual([mockTask]);
    expect(result.message).toBe("SUCCESS");
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it("should return a task by id", async () => {
    const result = await controller.findOne("507f1f77bcf86cd799439011");
    expect(result.data).toEqual(mockTask);
    expect(result.message).toBe("SUCCESS");
    expect(mockService.findById).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
    );
  });

  it("should update a task", async () => {
    const dto: UpdateTaskCommand = {
      status: TaskStatus.DONE,
    } as UpdateTaskCommand;
    const result = await controller.update("507f1f77bcf86cd799439011", dto);
    expect(result.data).toEqual(mockTask);
    expect(result.message).toBe("SUCCESS");
    expect(mockService.update).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      dto,
    );
  });

  it("should delete a task", async () => {
    const result = await controller.remove("507f1f77bcf86cd799439011");
    expect(result.data).toEqual(mockTask);
    expect(result.message).toBe("SUCCESS");
    expect(mockService.delete).toHaveBeenCalledWith("507f1f77bcf86cd799439011");
  });
});
