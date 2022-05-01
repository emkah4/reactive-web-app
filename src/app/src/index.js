import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AuthProvider } from "./context/UserContext";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
