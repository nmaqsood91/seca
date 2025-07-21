# Backend README

## Folder Structure

- `src/` — Main source code
- `src/entities/` — Shared entity definitions (e.g., `task.entity.ts`, `user.entity.ts`)
- `src/featuers/` — Feature modules (tasks, users, etc.)
  - `task/` — Task feature (controller, service, module, commands, schemas)
  - `user/` — User feature (controller, service, module, commands, schemas)
  - `seed/` — Seeding logic
- `src/config/` — Configuration files (e.g., database config)
- `test/` — Test files
- `dist/` — Compiled output (ignored by git)

## Approach

- Modular architecture using NestJS modules
- Separation of concerns: controllers, services, entities, commands
- Command objects (e.g., `CreateTaskCommand`) for validation and type safety using `class-validator`
- Service layer for business logic
- Repository pattern for database access (if used)

## Database

- Uses MongoDB (configurable in `.env` as `MONGO_URI`)
- Mongoose for ODM
- Entities and schemas defined in `src/entities/` and `src/featuers/*/schemas/`

## How to Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env` (see example below)
   ```env
   MONGO_URI=mongodb://localhost:27017/tasks
   ```
3. (Optional) Seed initial users:
   ```bash
   npm run seed:users
   ```
4. Start the server:
   ```bash
   npm run start:dev
   ```

## Seeding Users

Before using the API, you can run the seed script to create initial users:
```bash
npm run seed:users
```
This will populate the database with sample users for testing and development.

## Notes

- Validation is handled using command objects (e.g., `CreateTaskCommand`) with decorators from `class-validator`.
- Feature modules are under `src/featuers/` (note the spelling).
- MongoDB is used for data storage; update `MONGO_URI` in your `.env` as needed.
