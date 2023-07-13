import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CryptoProvider } from "./CryptoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <CryptoProvider>
    <App />
  </CryptoProvider>
  // </React.StrictMode>
);
