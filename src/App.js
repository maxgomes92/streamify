import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Creator from "./pages/Creator";
import { AppProvider } from "./store";
import { DEFAULT_PATH } from "./utils/constants";

function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route path={DEFAULT_PATH.home} element={<Home />} />
          <Route path={DEFAULT_PATH.login} element={<Login />} />
          <Route path={DEFAULT_PATH.app} element={<App />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
