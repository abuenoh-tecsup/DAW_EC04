import axiosInstance from "../utils/axiosInstance";

export const getSubmissions = async () => {
  const res = await axiosInstance.get("/submissions");
  return res.data;
};

export const getSubmissionById = async (id) => {
  const res = await axiosInstance.get(`/submissions/${id}`);
  return res.data;
};

export const getSubmissionsByTask = async (taskId) => {
  const res = await axiosInstance.get(`/submissions/task/${taskId}`);
  return res.data;
};

export const createSubmission = async (submissionData) => {
  const res = await axiosInstance.post("/submissions", submissionData);
  return res.data;
};

export const updateSubmission = async (id, submissionData) => {
  const res = await axiosInstance.put(`/submissions/${id}`, submissionData);
  return res.data;
};

export const deleteSubmission = async (id) => {
  await axiosInstance.delete(`/submissions/${id}`);
};
