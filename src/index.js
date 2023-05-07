import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Post from "./routes/post";
import ErrorPage from "./error-page";
import "./stylesheet/index.css";
import "./stylesheet/root.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/* color palette
orange : rgb(204, 133, 69)
green : rgb(14, 112, 113)
skyblue : rgb(94, 148, 195)
lavender : rgb(178, 166, 206)
red : rgb(208, 61, 69)
*/
