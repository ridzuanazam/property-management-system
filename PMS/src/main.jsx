import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

async function enableMocking() {
  // Only enable mocking in development (Vite)
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./api/mocks/browser.js");
  await worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
