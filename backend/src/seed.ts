import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { UsersService } from './featuers/user/users.service';
import { seedUsers } from './seed/user.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const usersService = app.get(UsersService);

  await seedUsers(usersService);

  await app.close();
}

bootstrap();
