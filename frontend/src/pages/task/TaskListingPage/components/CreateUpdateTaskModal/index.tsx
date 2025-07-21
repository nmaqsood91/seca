import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import { User } from "../../../../../shared/types/user";
import { Task } from "../../../../../shared/types/task";
import { useTaskFormModal } from "./useTaskFormModal";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  selectedTask?: Task | null;
  readOnly?: boolean;
  onSuccess?: () => void;
}

export default function CreateUpdateTaskModal(props: TaskFormModalProps) {
  const { open, onClose, selectedTask, readOnly = false, onSuccess } = props;
  const {
    users,
    isUsersLoading,
    mutation,
    formik,
    isEdit,
    readOnly: hookReadOnly,
  } = useTaskFormModal({ selectedTask, readOnly, onSuccess, onClose });

  // Config for form fields
  type FieldKey = "title" | "description";
  const fields: Array<{
    key: FieldKey;
    label: string;
    type: string;
    multiline: boolean;
    rows: number;
  }> = [
    {
      key: "title",
      label: "Title",
      type: "text",
      multiline: false,
      rows: 1,
    },
    {
      key: "description",
      label: "Description",
      type: "text",
      multiline: true,
      rows: 4,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {hookReadOnly ? "Task Details" : isEdit ? "Edit Task" : "Create Task"}
      </DialogTitle>
      <DialogContent dividers>
        {isEdit && !selectedTask ? (
          <Box textAlign="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit} id="task-form">
            {fields.map((field) => (
              <TextField
                key={field.key}
                disabled={hookReadOnly}
                fullWidth
                margin="normal"
                label={field.label}
                name={field.key}
                value={formik.values[field.key as FieldKey]}
                onChange={formik.handleChange}
                error={formik.touched[field.key as FieldKey] && Boolean(formik.errors[field.key as FieldKey])}
                helperText={formik.touched[field.key as FieldKey] && formik.errors[field.key as FieldKey]}
                multiline={field.multiline}
                rows={field.rows}
              />
            ))}

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                disabled={hookReadOnly}
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <MenuItem value="OPEN">Open</MenuItem>
                <MenuItem value="INPROGRESS">In Progress</MenuItem>
                <MenuItem value="DONE">Done</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Assigned To</InputLabel>
              <Select
                disabled={hookReadOnly}
                name="assignedTo"
                value={formik.values.assignedTo}
                onChange={formik.handleChange}
                error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
              >
                {isUsersLoading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  users.map((user: User) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!hookReadOnly && (
          <Button
            type="submit"
            form="task-form"
            variant="contained"
            disabled={mutation.isPending}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
