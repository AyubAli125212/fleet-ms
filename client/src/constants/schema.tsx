import * as Yup from "yup";
import { IsEmailUnique } from "@/api/AuthAPI";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .test("unique-email", "Email is already in use", async (value) => {
      if (!value) return true;
      try {
        const response = await IsEmailUnique(value);
        return response.success;
      } catch {
        throw new Yup.ValidationError("Error checking email uniqueness");
      }
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const vehicleCreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  licensePlate: Yup.string()
    .min(3, "License Plate must be at least 3 characters")
    .required("License Plate is required"),
  brand: Yup.string()
    .min(3, "Brand must be at least 3 characters")
    .required("Brand is required"),
  model: Yup.string()
    .min(3, "Model must be at least 3 characters")
    .required("Model is required"),
  year: Yup.number()
    .min(1900, "Year must be at least 1900")
    .required("Year is required"),
});