import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import Sentry from "./utils/Sentry";
import TagManager from 'react-gtm-module'
import "./index.css";

Sentry.initialize()

const tagManagerArgs = {
  gtmId: 'G-HHD4S99HSL'
}

TagManager.initialize(tagManagerArgs)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
