import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./scenes/home/Home.js";
import WritePage from "./scenes/write_page/WritePage.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import PostDetail from "./scenes/post_detail/PostDetail.js";
import "./index.css";

const domain = "http://localhost:8000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home domain={domain} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/write",
    element: <WritePage domain={domain} />,
  },
  {
    path: "/post",
    element: <PostDetail domain={domain} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
