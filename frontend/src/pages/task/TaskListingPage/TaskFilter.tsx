import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface TaskFilterProps {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  assignedToFilter: string;
  setAssignedToFilter: (val: string) => void;
  users: Array<{ _id: string; name: string }>;
  isUsersLoading: boolean;
}

export default function TaskFilter({
  statusFilter,
  setStatusFilter,
  assignedToFilter,
  setAssignedToFilter,
  users,
  isUsersLoading,
}: TaskFilterProps) {
  return (
    <div className="filter-wrapper">
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label" htmlFor="status-select">Status</InputLabel>
        <Select
          id="status-select"
          labelId="status-label"
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="OPEN">Open</MenuItem>
          <MenuItem value="INPROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" sx={{ marginLeft: 2 }}>
        <InputLabel id="assigned-to-label" htmlFor="assigned-to-select">Assigned To</InputLabel>
        <Select
          id="assigned-to-select"
          labelId="assigned-to-label"
          label="Assigned To"
          name="assignedTo"
          value={assignedToFilter}
          onChange={(e) => setAssignedToFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {isUsersLoading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            users?.map((user) => (
              <MenuItem key={user?._id} value={user?._id}>
                {user?.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}
