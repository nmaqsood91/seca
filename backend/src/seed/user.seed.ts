import { UsersService } from "../featuers/user/users.service";
import { CreateUserCommand } from "../featuers/user/commands/create-user.command";
import { faker } from "@faker-js/faker";

export async function seedUsers(usersService: UsersService) {
  const existing = await usersService.findAll();
  if (existing.length > 0) {
    console.log("Users already seeded. Skipping...");
    return;
  }

  const seedData: CreateUserCommand[] = Array.from({ length: 5 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  await usersService.createMany(seedData);

  console.log("Seeding completed.");
}
