import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User as UserEntity } from "../../entities/user.entity";

@Schema({ timestamps: true })
export class User extends Document implements UserEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
