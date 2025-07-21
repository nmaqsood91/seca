import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { TasksService } from "../task/tasks.service";
import { Task, TaskStatus } from "../task/schemas/task.schema";
import { CreateTaskCommand } from "../task/commands/create-task.command";
import { UpdateTaskCommand } from "../task/commands/update-task.command";

describe("TasksService", () => {
  let service: TasksService;

  const mockTask = {
    _id: "507f1f77bcf86cd799439011",
    title: "Test Task",
    status: TaskStatus.OPEN,
    createdAt: new Date(),
  };

  const status = "assigned";

  const mockTaskArray = [mockTask];

  const mockTaskModel = {
    create: jest.fn().mockResolvedValue(mockTask),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockTaskArray),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a task", async () => {
    const dto: CreateTaskCommand = { title: "Test Task" } as CreateTaskCommand;
    const result = await service.create(dto);
    expect(mockTaskModel.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockTask);
  });

  it("should find all tasks", async () => {
    const result = await service.findAll({}, {});
    expect(mockTaskModel.find).toHaveBeenCalledWith({});
    expect(mockTaskModel.sort).toHaveBeenCalledWith({});
    expect(mockTaskModel.populate).toHaveBeenCalledWith(status);
    expect(result).toEqual(mockTaskArray);
  });

  it("should find a task by id", async () => {
    mockTaskModel.exec.mockResolvedValueOnce(mockTask);
    const result = await service.findById(mockTask._id);
    expect(mockTaskModel.findById).toHaveBeenCalledWith(mockTask._id);
    expect(mockTaskModel.populate).toHaveBeenCalledWith(status);
    expect(result).toEqual(mockTask);
  });

  it("should update a task", async () => {
    mockTaskModel.exec.mockResolvedValueOnce(mockTask);
    const dto: UpdateTaskCommand = { status: TaskStatus.DONE } as UpdateTaskCommand;
    const result = await service.update(mockTask._id, dto);
    expect(mockTaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockTask._id,
      dto,
      { new: true },
    );
    expect(result).toEqual(mockTask);
  });

  it("should delete a task", async () => {
    mockTaskModel.exec.mockResolvedValueOnce(mockTask);
    const result = await service.delete(mockTask._id);
    expect(mockTaskModel.findByIdAndDelete).toHaveBeenCalledWith(mockTask._id);
    expect(result).toEqual(mockTask);
  });
});
