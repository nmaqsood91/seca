import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserCommand } from "./commands/create-user.command";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createMany(createUserCommands: CreateUserCommand[]) {
    return this.userModel.insertMany(createUserCommands);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
