import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface Token {
  id: number;
  login: string;
  role: string;
  exp: number;
}

interface Credentials {
  login: string;
  password: string;
}

interface AuthContextType {
  user: Token | null;
  signin: (credentials: Credentials, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  error: string;
  setError: Function;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const getJwt = (): Token | null => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      const decoded: Token = jwtDecode(token);
      return decoded;
    }
    return null;
  };
  const [user, setUser] = React.useState<Token | null>(getJwt());
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (user && user.exp * 1000 <= Date.now()) {
        localStorage.clear();
        setUser(null);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  const signin = ({ login, password }: Credentials, callback: VoidFunction) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/login", { login, password })
      .then(
        (res) => {
          localStorage.setItem("jwt_token", res.data);
          const decoded: Token = jwtDecode(res.data);
          setUser(decoded);
          setError("");
          callback();
        },
        (err) => {
          setError(err.response.data);
        }
      );
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.clear();
    callback();
  };

  const value: AuthContextType = { user, signin, signout, error, setError };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
