import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles, getRoles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    // (console.log(roles),
    <Navigate to="/prijava" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
