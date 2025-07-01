import axios from "axios";
import { getUserByToken } from "./user.service";

const API_URL = `${import.meta.env.VITE_API_URL}/auth/login`;

export const login = async ({ username, password }) => {
  const response = await axios.post(API_URL, { username, password });
  const token = response.data.token;

  const user = await getUserByToken(token);

  return { token, user };
};