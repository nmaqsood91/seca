import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskListingPage from "../index";

const queryClient = new QueryClient();

describe("TaskListingPage", () => {
  it("renders without crashing", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskListingPage />
      </QueryClientProvider>
    );
    expect(await screen.findByText(/Create Task/i)).toBeInTheDocument();
  });

  it("shows loading spinner when loading", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskListingPage />
      </QueryClientProvider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows filter controls", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskListingPage />
      </QueryClientProvider>
    );
    expect(screen.getByRole('combobox', { name: /Status/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Assigned To/i })).toBeInTheDocument();
  });

  it("opens create modal when Create Task is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskListingPage />
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));
    expect(await screen.findByRole('heading', { name: /Create Task/i })).toBeInTheDocument();
  });
});
