import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import NavigationDrawer from "./NavigationDrawer";

function DashboardLayout() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavigationDrawer />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;
