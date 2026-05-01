import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Suppress MetaMask and other extension errors
const originalError = console.error;
console.error = function (...args) {
  if (
    args[0]?.includes?.("Could not establish connection") ||
    args[0]?.includes?.("MetaMask") ||
    args[0]?.includes?.("lastError")
  ) {
    return;
  }
  originalError.apply(console, args);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
