import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Tailwind base
import "./index.css";

// Custom pixel + print styles
import "./styles/pixel.css";
import "./styles/print.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
