import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthContext, Credentials } from "./AuthProvider";

import "./LoginForm.css";

function LoginForm() {
  interface LocationState {
    from: {
      pathname: string;
    };
  }

  const navigate = useNavigate();
  const state = useLocation().state as LocationState;
  const pathname = state?.from?.pathname ?? "/";

  const { signin, error } = React.useContext(AuthContext);

  const { register, handleSubmit } = useForm<Credentials>();

  const onSubmit = ({ login, password }: Credentials) => {
    signin({ login, password }, () => {
      navigate(pathname, { replace: true });
    });
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="text"
          placeholder="Input login"
          {...register("login", { required: "Login is required" })}
        ></input>
        <input
          type="password"
          placeholder="Input password"
          {...register("password", { required: "Password is required" })}
        ></input>
        <span>{error}</span>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default LoginForm;
