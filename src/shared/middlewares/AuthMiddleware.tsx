import { Navigate } from "react-router-dom";

export default function AuthMiddleware({ child }: { child: JSX.Element }) {
  const is_authenticated = sessionStorage.getItem("is_authenticated");

  return is_authenticated === "true" ? child : <Navigate to="/login" />;
}
