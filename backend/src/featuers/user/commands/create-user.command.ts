import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserCommand {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
