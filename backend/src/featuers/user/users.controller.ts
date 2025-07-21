import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './commands/create-user.command';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return { data: await this.usersService.create(dto), message: 'SUCCESS' };
  }

  @Get()
  async findAll() {
    return { data: await this.usersService.findAll(), message: 'SUCCESS' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.usersService.findById(id), message: 'SUCCESS' };
  }
}
