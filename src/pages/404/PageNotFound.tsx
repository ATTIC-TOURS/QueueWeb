import { useLocation, Navigate } from "react-router-dom";

export default function PageNotFound() {
  const { state } = useLocation();
  return <Navigate to={state?.pathname || "/"} replace />;
}
