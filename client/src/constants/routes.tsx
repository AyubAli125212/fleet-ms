export const ROUTES = {
  BASE: {
    RELATIVE: "/",
    ABSOLUTE: "/",
  },
  
  // AUTH : Authentication
  AUTH:{
    RELATIVE: "/auth",
    ABSOLUTE: "/auth",
  },
  LOGIN: {
    RELATIVE: "/login",
    ABSOLUTE: "/auth/login",
  },
  SIGNUP: {
    RELATIVE: "/signup",
    ABSOLUTE: "/auth/signup",
  },
  UNAUTHORIZED: {
    RELATIVE: "/unauthorized",
    ABSOLUTE: "/unauthorized",
  },

  // Manager
  MANAGER: {
    RELATIVE: "/manager/dashboard",
    ABSOLUTE: "/manager/dashboard",
  },
  MANAGER_VEHICLES: {
    RELATIVE: "/vehicles",
    ABSOLUTE: "/manager/vehicles",
  },
  MANAGER_VEHICLES_DETAIL: {
    RELATIVE: "/vehicles/:id",
    ABSOLUTE: "/manager/vehicles/:id",
    getAbsolute: (id: string) => `/manager/vehicles/${id}`,
  },
  MANAGER_VEHICLES_CREATE: {
    RELATIVE: "/vehicles/create",
    ABSOLUTE: "/manager/vehicles/create",
  },
};
