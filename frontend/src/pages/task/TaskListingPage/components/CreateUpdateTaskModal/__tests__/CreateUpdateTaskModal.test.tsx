import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateUpdateTaskModal from "..";
import { Task } from "../../../../../../shared/types/task";
import { User } from "../../../../../../shared/types/user";
import * as usersService from "../../../../../../services/users.service";

jest.mock("../../../../../../services/users.service");

const mockUsers: User[] = [
  { _id: "u1", name: "John", email: "john@example.com" },
  { _id: "u2", name: "Jane", email: "jane@example.com" },
];

(usersService.getUsers as jest.Mock).mockResolvedValue(mockUsers);

const queryClient = new QueryClient();

const renderModal = (
  props: Partial<React.ComponentProps<typeof CreateUpdateTaskModal>> = {}
) =>
  render(
    <QueryClientProvider client={queryClient}>
      <CreateUpdateTaskModal
        open
        onClose={jest.fn()}
        selectedTask={null}
        {...props}
      />
    </QueryClientProvider>
  );

describe("CreateUpdateTaskModal", () => {
  it("renders Create Task modal", async () => {
    renderModal();
    expect(await screen.findByText(/Create Task/i)).toBeInTheDocument();
  });

  it("renders Edit Task modal", async () => {
    const task: Task = {
      _id: "1",
      title: "Test Task",
      description: "Test Desc",
      status: "INPROGRESS",
      assignedTo: mockUsers[0]._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    renderModal({ selectedTask: task });
    expect(await screen.findByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
  });

  it("renders read-only mode", async () => {
    const task: Task = {
      _id: "2",
      title: "Read-only Task",
      description: "Read-only Desc",
      status: "DONE",
      assignedTo: mockUsers[1]._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    renderModal({ selectedTask: task, readOnly: true });
    expect(await screen.findByDisplayValue("Read-only Task")).toBeDisabled();
    expect(screen.getByText(/Task Details/i)).toBeInTheDocument();
  });

  it("closes modal on close button", async () => {
    const onClose = jest.fn();
    renderModal({ onClose });
    fireEvent.click(await screen.findByText(/Close/i));
    expect(onClose).toHaveBeenCalled();
  });
});
