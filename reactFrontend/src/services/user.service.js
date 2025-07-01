import axios from "axios";

export const getUserByToken = async (token) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
