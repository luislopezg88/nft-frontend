import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "state/stateAuth";

export default function Guards({ rol }) {
  const { isAuthenticated } = useAuth();
  /*return isAuthenticated && rol === info.role ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );*/
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
