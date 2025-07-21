import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserCommand } from "./commands/create-user.command";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserCommand) {
    return {
      data: await this.usersService.createMany(dto),
      message: "SUCCESS",
    };
  }

  @Get()
  async findAll() {
    return { data: await this.usersService.findAll(), message: "SUCCESS" };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return { data: await this.usersService.findById(id), message: "SUCCESS" };
  }
}
