import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLegacy from "./backup/App";
import { AppProvider } from "./store";

function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLegacy />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
