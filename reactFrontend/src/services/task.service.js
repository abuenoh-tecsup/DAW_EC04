import axiosInstance from "../utils/axiosInstance";

export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/tasks", taskData);
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await axiosInstance.put(`/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  await axiosInstance.delete(`/tasks/${id}`);
};
