import { User } from "../constants/types";
import api from "./API";

export const IsEmailUnique = async (email: string) => {
  try {
    const response = await api.get(`/auth/check-email`, { params: { email } });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Login = async (user: User) => {
  try {
    const response = await api.post("/auth/login", user);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Signup = async (user: User) => {
  try {
    const response = await api.post("/auth/signup", user);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
