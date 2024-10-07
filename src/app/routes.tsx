import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import PageNotFound from "../pages/404/PageNotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthMiddleware from "../shared/middlewares/AuthMiddleware";

const is_authenticated = sessionStorage.getItem("is_authenticated");

export const router = createBrowserRouter([
  {
    path: "/login",
    element: is_authenticated !== "true" ? <Login /> : <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <AuthMiddleware child={<Dashboard />} />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
