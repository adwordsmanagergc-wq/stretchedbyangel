import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRoutes from "@/App";
import { Analytics } from "@vercel/analytics/react";
import "@/index.css";

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);

// Prerendered routes ship full HTML, so hydrate it; fall back to a fresh
// render if the container is empty (e.g. vite dev server).
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
