import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface User {
  login: string;
  role: string;
}

interface Credentials {
  login: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signin: (credentials: Credentials, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  error: string;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const getJwt = (): User | null => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      const decoded: User = jwtDecode(token);
      return decoded;
    }
    return null;
  };
  const [user, setUser] = React.useState<User | null>(getJwt());
  const [error, setError] = React.useState<string>("");

  const signin = ({ login, password }: Credentials, callback: VoidFunction) => {
    axios.post("http://localhost:8080/login", { login, password }).then(
      (res) => {
        localStorage.setItem("jwt_token", res.data);
        const decoded: User = jwtDecode(res.data);
        setUser(decoded);
        callback();
      },
      (err) => {
        setError(err.response.data)
      }
    );
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.clear();
    callback();
  };

  const value: AuthContextType = { user, signin, signout, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
