import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test User',
    email: 'test@example.com',
  };
  const mockUserArray = [mockUser];
  const mockUserModel = {
    create: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockUserArray),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
    } as CreateUserDto;
    const result = await service.create(dto);
    expect(mockUserModel.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockUser);
  });

  it('should find all users', async () => {
    const result = await service.findAll();
    expect(mockUserModel.find).toHaveBeenCalled();
    expect(mockUserModel.exec).toHaveBeenCalled();
    expect(result).toEqual(mockUserArray);
  });

  it('should find a user by id', async () => {
    mockUserModel.exec.mockResolvedValueOnce(mockUser);
    const result = await service.findById('507f1f77bcf86cd799439011');
    expect(mockUserModel.findById).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011',
    );
    expect(mockUserModel.exec).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });
});
