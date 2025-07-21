import { Module } from "@nestjs/common";
import { UsersModule } from "./featuers/user/users.module";
import { TasksModule } from "./featuers/task/tasks.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseConfig } from "./config/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DatabaseConfig,
    }),
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
