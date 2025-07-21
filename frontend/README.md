# Task Management Frontend

A modern React + TypeScript application for managing tasks, built with Material UI, React Query, and Axios. The project follows modular design principles, separation of concerns, and accessibility best practices.

## Design Principles & Approach

This project follows these key design principles:

- **Modular Architecture:** Code is organized into reusable components and custom hooks for maintainability and scalability.
- **Separation of Concerns:** Business logic is separated from UI; API calls are handled in dedicated service files.
- **Accessibility:** UI elements use proper label associations and ARIA roles, following best practices for accessible web applications.
- **Testability:** The codebase is structured for thorough unit and integration testing, with mocks for API calls and coverage for UI interactions.
- **Type Safety:** Shared types are used throughout the codebase to ensure reliability and reduce runtime errors.

- **React Query:** Handles data fetching, caching, and mutation for tasks and users.
- **Material UI:** Provides a consistent, responsive, and accessible UI.

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm
- Docker (optional, for containerized deployment)

### Installation
```sh
npm install
```

### Running the Project (Development)
```sh
npm start
```
This will start the development server at `http://localhost:3000`.

### Building for Production
```sh
npm run build
```

### Running the Project (Production)
```sh
npm run start:prod
```
This requires the `serve` package. Install it globally if needed:
```sh
npm install -g serve
```

### Docker Usage
Build the Docker image:
```sh
npm run docker:build
```
Run the Docker container:
```sh
npm run docker:run
```
Or use Docker Compose:
```sh
npm run docker:compose
```
The app will be available at `http://localhost:3000`.

## Testing

### Run All Tests
```sh
npm run test
```
- Uses Jest and React Testing Library
- Tests are located in `src/services/__tests__` and `src/pages/task/TaskListingPage/__tests__`

### Test Coverage
- Service layer: API calls are mocked and tested for all CRUD operations
- UI: Listing page, modal, and interactions are covered

## Folder Structure
```
src/
  app.css
  App.tsx
  index.css
  index.tsx
  logo.svg
  reportWebVitals.ts
  routes.tsx
  setupTests.ts
  pages/
    task/
      TaskListingPage/
        index.tsx
        task-listing.css
        components/
          CreateUpdateTaskModal/
            index.tsx
            __tests__/
              CreateUpdateTaskModal.test.tsx
  services/
    tasks.service.ts
    users.service.ts
    __tests__/
      tasks.service.test.ts
  shared/
    types/
      task.ts
      user.ts
```

### Environment Variables

To connect the frontend to your backend API, set the following environment variable in a `.env` file in the `frontend` directory:

```env
REACT_APP_BASE_URL=http://localhost:8080/api
```

- Change the URL if your backend runs on a different host or port.
- The `/api` prefix matches the backend route configuration.

### Possible Improvements
- Refactor repeated form/filter logic into reusable components or hooks (DRY principle)
- Add end-to-end (E2E) tests for user flows
- Improve UI
- Add authentication

