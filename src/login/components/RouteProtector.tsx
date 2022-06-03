import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function RouteProtector({
  children,
  role = "cashier",
}: {
  children: JSX.Element;
  role?: string;
}) {
  const auth = React.useContext(AuthContext);
  const location = useLocation();

  if (!auth.user || role !== auth.user.role) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RouteProtector;