import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import PageNotFound from "../pages/404/PageNotFound";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
