import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Login from "./login/Login";
import RouteProtector from "./login/components/RouteProtector";
import AuthProvider, { AuthContext } from "./login/components/AuthProvider";

function Cashier() {
  return (
    <>
      <h1>Cashier page</h1>
    </>
  );
}

function Manager() {
  return (
    <>
      <h1>Manager page</h1>
    </>
  );
}

function Dashboard() {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <main>
        <h2>Welcome to the dashboard page, {auth.user?.login}!</h2>
        <button
          onClick={() => {
            auth.signout(() => {
              navigate("/");
            });
          }}
        >
          Log out
        </button>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              path="cashier"
              element={
                <RouteProtector role="cashier">
                  <Cashier />
                </RouteProtector>
              }
            />
            <Route
              path="manager"
              element={
                <RouteProtector role="manager">
                  <Manager />
                </RouteProtector>
              }
            />
          </Route>
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
