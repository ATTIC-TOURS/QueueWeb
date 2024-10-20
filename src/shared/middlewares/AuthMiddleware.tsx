import { Navigate } from "react-router-dom";
import { useAuthSession } from "../../hooks/useAuthSession";

export default function AuthMiddleware({ child }: { child: JSX.Element }) {
  const is_authenticated = useAuthSession();

  return is_authenticated.auth ? (
    child
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
