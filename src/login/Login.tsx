import React from "react";
import "./Login.css";
import LoginForm from "./components/LoginForm";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";

function Login() {
  const auth = React.useContext(AuthContext);
  if (auth.user) {
    return <Navigate to={"/dashboard/" + auth.user.role} replace />
  }

  return (
    <div className="login-page-container">
      <LoginForm />
    </div>
  );
}

export default Login;
