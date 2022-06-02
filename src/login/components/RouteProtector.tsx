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

  if (!auth.user) {
    console.log(auth);
    console.log("navigate to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (role !== auth.user.role) {
    return <Navigate to={"/dashboard/" + auth.user.role} replace />
  }

  return children;
};

export default RouteProtector;