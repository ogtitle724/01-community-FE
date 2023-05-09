import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./scenes/Home/Home.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import "./index.css";

const serverURL = "http://localhost:8080";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home serverURL={serverURL} />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
