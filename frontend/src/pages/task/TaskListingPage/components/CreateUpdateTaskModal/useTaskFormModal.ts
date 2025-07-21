import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Task } from "../../../../../shared/types/task";
import { createTask, updateTask } from "../../../../../services/tasks.service";
import { User } from "../../../../../shared/types/user";
import { getUsers } from "../../../../../services/users.service";
import * as Yup from "yup";
import { useFormik } from "formik";

export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  assignedTo: Yup.string().required("Assigned To is required"),
  status: Yup.string().oneOf(["OPEN", "INPROGRESS", "DONE"]),
});

export function useTaskFormModal({ selectedTask, readOnly = false, onSuccess, onClose }: {
  selectedTask?: Task | null;
  readOnly?: boolean;
  onSuccess?: () => void;
  onClose: () => void;
}) {
  const isEdit = Boolean(selectedTask);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "OPEN" as "OPEN" | "INPROGRESS" | "DONE",
  });

  const { data: users = [], isPending: isUsersLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (selectedTask) {
      setInitialValues({
        title: selectedTask.title,
        description: selectedTask.description,
        assignedTo: selectedTask?.assignedTo?._id || "",
        status: selectedTask.status,
      });
    } else {
      setInitialValues({
        title: "",
        description: "",
        assignedTo: "",
        status: "OPEN",
      });
    }
  }, [selectedTask]);

  const mutation = useMutation({
    mutationFn: (values: typeof initialValues) =>
      isEdit && selectedTask?._id
        ? updateTask(selectedTask?._id, values)
        : createTask(values),
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return {
    users,
    isUsersLoading,
    mutation,
    formik,
    isEdit,
    readOnly,
  };
}
