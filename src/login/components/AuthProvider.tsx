import React from "react";

interface User {
  login: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  signin: () => void;
  signout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<User | null>(null);

  let signin = () => {
    setUser({ login: "bob", role: "manager" });
  };

  let signout = () => {
    setUser(null);
  };

  let value: AuthContextType = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;