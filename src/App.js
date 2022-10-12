import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Creator from "./pages/Creator";
import { AppProvider } from "./store";
import { DEFAULT_PATH } from "./utils/constants";
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
            <Route path={DEFAULT_PATH.home} element={<Home />} />
            <Route path={DEFAULT_PATH.login} element={<Login />} />
            <Route path={DEFAULT_PATH.app} element={<Creator />} />
          </Routes>
        </ThemeProvider>
      </AppProvider>
    </>
  );
}

export default App;
