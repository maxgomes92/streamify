import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Creator from "./pages/Creator";
import { AppProvider } from "./store";
import { PATH } from "./utils/constants";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <AppProvider>
        <ThemeProvider theme={darkTheme}>
          <Routes>
            <Route path={PATH.home} element={<Home />} />
            <Route path={PATH.app} element={<Creator />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </AppProvider>
    </>
  );
}

export default App;
