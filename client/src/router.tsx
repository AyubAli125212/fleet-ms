import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import ProtectedLayout from "./components/ProtectedLayout";
import ErrorPage from "./components/ErrorPage";

import App from "./App";
import Landing from "./pages/landing/Landing";
import {
  Auth,
  LogIn,
  loginAction,
  SignUp,
  signupAction,
  Unauthorized,
  NotFound,
} from "./pages/auth";

import {
  ManagerHome,
  managerHomeLoader,
  VehicleList,
  vehicleListLoader,
  vehicleListAction,
  VehicleCreate,
  vehicleCreateAction,
} from "./pages/manager";
import { authLoader } from "./utils/auth";

// Router Configuration
// prettier-ignore
const router = createBrowserRouter([
  {
    path: ROUTES.BASE.ABSOLUTE,
    element: <App />,
    children: [
      // Public Routes
      { index: true, element: <Landing /> },
      { path: ROUTES.UNAUTHORIZED.ABSOLUTE, element: <Unauthorized /> },
      {
        path: ROUTES.AUTH.ABSOLUTE,
        element: <Auth />,
        children: [
          { path: ROUTES.LOGIN.ABSOLUTE, element: <LogIn /> , action: loginAction },
          { path: ROUTES.SIGNUP.ABSOLUTE, element: <SignUp />, action: signupAction },
        ],
      },

      // Protected Routes
      {
        element: <ProtectedLayout />,
        loader: authLoader,
        children: [
          { path: ROUTES.MANAGER.ABSOLUTE, element: <ManagerHome />, errorElement: <ErrorPage />, loader: managerHomeLoader },
          { path: ROUTES.MANAGER_VEHICLES_CREATE.ABSOLUTE, element: <VehicleCreate />, errorElement: <ErrorPage />, action: vehicleCreateAction },
          { path: ROUTES.MANAGER_VEHICLES.ABSOLUTE, element: <VehicleList />, errorElement: <ErrorPage />, loader: vehicleListLoader, action: vehicleListAction },
        ],
      },

      // Catch-All Route
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
