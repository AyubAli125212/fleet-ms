import { QueryParams, User } from "../constants/types";
import api from "./API";

export const GetManagerDashboard = async () => {
  try {
    const response = await api.get("/manager/dashboard");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetVehicles = async (params: QueryParams) => {
  try {
    const response = await api.get("/manager/vehicles", { params });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CreateVehicle = async (user: User) => {
  try {
    const response = await api.post("/manager/vehicle", user);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ToggleVehicleStatus = async (id: string) => {
  try {
    const response = await api.patch(`/manager/vehicle/${id}/status`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
