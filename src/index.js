import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./scenes/Home/Home.js";
import WritePage from "./scenes/write_page/WritePage.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import PostDetail from "./scenes/post_detail/PostDetail.js";
import "./index.css";

const serverURL = "http://localhost:8000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home serverURL={serverURL} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/write",
    element: <WritePage serverURL={serverURL} />,
  },
  {
    path: "/post",
    element: <PostDetail serverURL={serverURL} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
