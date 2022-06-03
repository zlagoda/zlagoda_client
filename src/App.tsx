import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import RouteProtector from "./login/components/RouteProtector";
import AuthProvider from "./login/components/AuthProvider";
import DashboardLayout from "./common/components/DashboardLayout";
import Manager from "./manager/components/Manager";
import Cashier from "./cashier/components/Cashier";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
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
