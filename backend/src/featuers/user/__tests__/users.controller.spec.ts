import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { CreateUserCommand } from "../commands/create-user.command";

describe("UsersController", () => {
  let controller: UsersController;

  const mockUser = {
    _id: "507f1f77bcf86cd799439011",
    name: "Test User",
    email: "test@example.com",
  };
  const mockUserArray = [mockUser];
  const mockService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue(mockUserArray),
    findById: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async () => {
    const command: CreateUserCommand[] = [
      {
        name: "Test User",
        email: "test@example.com",
      },
    ] as CreateUserCommand[];
    const result = await controller.create(command);
    expect(result).toEqual({ data: mockUser, message: "SUCCESS" });
    expect(mockService.create).toHaveBeenCalledWith(command);
  });

  it("should return all users", async () => {
    const result = await controller.findAll();
    expect(result).toEqual({ data: mockUserArray, message: "SUCCESS" });
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it("should return a user by id", async () => {
    const result = await controller.findOne("507f1f77bcf86cd799439011");
    expect(result).toEqual({ data: mockUser, message: "SUCCESS" });
    expect(mockService.findById).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
    );
  });
});
