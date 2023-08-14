import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import Sentry from "./utils/Sentry";
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'
import "./index.css";

Sentry.initialize()

const root = ReactDOM.createRoot(document.getElementById("root"));

const gtmParams = { id: 'G-HHD4S99HSL' }

root.render(
  <React.StrictMode>
    <GTMProvider state={gtmParams}>
      <HashRouter>
        <App />
      </HashRouter>
    </GTMProvider>
  </React.StrictMode>
);
