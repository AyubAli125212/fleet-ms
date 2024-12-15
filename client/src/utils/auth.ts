import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "../constants/routes";

// Middleware: Check if the user is authenticated Decodes the JWT and validates the token.
export const authLoader = async () => {
  const token = getToken();
  if (!token) {
    return redirect(ROUTES.LOGIN.ABSOLUTE);
  }

  try {
    const decoded = jwtDecode<{ role: string }>(token);
    return { decoded };
  } catch {
    return redirect(ROUTES.LOGIN.ABSOLUTE);
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
