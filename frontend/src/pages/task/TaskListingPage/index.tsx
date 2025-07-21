import "./task-listing.css";
import AddIcon from "@mui/icons-material/Add";
import {
  Typography,
  CircularProgress,
  Button,
  Box,
  Chip,
} from "@mui/material";
import TaskFilter from "./TaskFilter";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateUpdateTaskModal from "./components/CreateUpdateTaskModal";
import { useTaskListing } from "./useTaskListing";

export default function TaskListingPage() {
  const {
    statusFilter,
    setStatusFilter,
    selectedTask,
    setSelectedTask,
    modalOpen,
    setModalOpen,
    assignedToFilter,
    setAssignedToFilter,
    sortModel,
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
  } = useTaskListing();

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1, sortable: true },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Chip
          label={
            params?.value === "OPEN"
              ? "Open"
              : params?.value === "INPROGRESS"
              ? "In Progress"
              : "Done"
          }
          color={
            params?.value === "OPEN"
              ? "default"
              : params?.value === "INPROGRESS"
              ? "success"
              : "primary"
          }
        />
      ),
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value.name,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button
            disableElevation
            className="action-button"
            variant="contained"
            size="small"
            onClick={() => {
              setReadOnly(true);
              setSelectedTask(params?.row);
              setModalOpen(true);
            }}
          >
            View
          </Button>
          <Button
            className="action-button"
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedTask(params?.row);
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            className="action-button"
            color="error"
            variant="outlined"
            size="small"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                deleteTaskMutation.mutate(params?.row?._id);
              }
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          setSelectedTask(null);
          setModalOpen(true);
        }}
        startIcon={<AddIcon />}
      >
        Create Task
      </Button>

      <TaskFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        assignedToFilter={assignedToFilter}
        setAssignedToFilter={setAssignedToFilter}
        users={users}
        isUsersLoading={isUsersLoading}
      />

      <Box
        mt={2}
        style={{
          display: "flex",
          justifyContent: "center",
          height: 500,
          width: "100%",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Typography color="error">Failed to load tasks</Typography>
        ) : (
          <DataGrid
            rows={data || []}
            columns={columns}
            getRowId={(row) => row?._id}
            pageSizeOptions={[5, 10, 20]}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
          />
        )}
      </Box>

      <CreateUpdateTaskModal
        open={modalOpen}
        onClose={handleModalClose}
        selectedTask={selectedTask}
        readOnly={readOnly}
        onSuccess={() => refetchTasks()}
      />
    </Box>
  );
}
