import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
}

export default ProtectedRoute;
