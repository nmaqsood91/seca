import { UsersService } from "../featuers/user/users.service";
import { TasksService } from "../featuers/task/tasks.service";
import { CreateUserCommand } from "../featuers/user/commands/create-user.command";
import { CreateTaskCommand } from "../featuers/task/commands/create-task.command";
import { faker } from "@faker-js/faker";
import { TaskStatus } from "../entities/task.entity";

export async function seedUsers(
  usersService: UsersService,
  tasksService: TasksService,
) {
  const seedData: CreateUserCommand[] = Array.from({ length: 3 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  const users = await usersService.createMany(seedData);

  const taskSeedData: CreateTaskCommand = {
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentences(2),
    assignedTo: users[0]._id as string,
    status: TaskStatus.INPROGRESS,
  };

  await tasksService.create(taskSeedData);

  console.log("Seeding completed.");
}
