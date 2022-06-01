import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

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
  const pathname = state?.from?.pathname ?? "/dashboard/cashier";
  const auth = React.useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(login, password);
    auth.signin();
    navigate(pathname, {replace: true});
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
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default LoginForm;
