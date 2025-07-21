import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Task } from "../../../shared/types/task";
import { getTasks, deleteTask } from "../../../services/tasks.service";
import { getUsers } from "../../../services/users.service";
import { User } from "../../../shared/types/user";
import { GridSortModel } from "@mui/x-data-grid";

export function useTaskListing() {
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedToFilter, setAssignedToFilter] = useState("");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const { data: users = [], isPending: isUsersLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const {
    data,
    isLoading,
    isError,
    refetch: refetchTasks,
  } = useQuery<Task[]>({
    queryKey: ["tasks", statusFilter, assignedToFilter, sortModel],
    queryFn: () => {
      const sortBy = sortModel[0]?.field;
      const order = sortModel[0]?.sort === "asc" ? "asc" : "desc";
      return getTasks({
        status: statusFilter || undefined,
        assignedTo: assignedToFilter || undefined,
        sortBy: sortBy || undefined,
        order: sortBy ? order : undefined,
      });
    },
  });

  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      setReadOnly(false);
      setSelectedTask(null);
    }, 300);
  };

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      refetchTasks();
      setSelectedTask(null);
    },
  });

  return {
    statusFilter,
    setStatusFilter,
    selectedTask,
    setSelectedTask,
    modalOpen,
    setModalOpen,
    assignedToFilter,
    setAssignedToFilter,
    sortModel,
    setSortModel,
    readOnly,
    setReadOnly,
    users,
    isUsersLoading,
    data,
    isLoading,
    isError,
    refetchTasks,
    handleSortModelChange,
    handleModalClose,
    deleteTaskMutation,
  };
}
