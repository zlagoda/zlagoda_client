import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
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

  return (
    <>
      <main>
        <h2>Welcome to the dashboard page, {auth.user?.login}!</h2>
        <button onClick={auth.signout}>Log out</button>
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
          <Route
            path="/dashboard"
            element={
              <RouteProtector>
                <Dashboard />
              </RouteProtector>
            }
          >
            <Route path="cashier" element={<Cashier />} />
            <Route path="manager" element={<Manager />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
