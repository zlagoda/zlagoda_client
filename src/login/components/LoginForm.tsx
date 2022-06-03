import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "./LoginForm.css"

function LoginForm() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  interface LocationState {
    from: {
      pathname: string;
    };
  }

  const navigate = useNavigate();
  const state = useLocation().state as LocationState;
  const auth = React.useContext(AuthContext);
  const pathname = state?.from?.pathname ?? "/";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!(login && password)) {
      auth.setError("All input is required")
      return;
    }
    auth.signin({ login, password }, () => {
      navigate(pathname, { replace: true });
    });
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Input login"
          onChange={onLoginChange}
        ></input>
        <input
          type="password"
          placeholder="Input password"
          onChange={onPasswordChange}
        ></input>
        <span>{auth.error}</span>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default LoginForm;
