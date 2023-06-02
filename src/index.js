import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./scenes/home/Home.js";
import WritePage from "./scenes/write_page/WritePage.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import PostDetail from "./scenes/post_detail/PostDetail.js";
import SearchResult from "./scenes/search_result/SearchResult.js";
import "./index.css";

const local = "http://localhost:8080";
const cloud = "http://3.34.80.12:8080";

const domain = local;

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
  {
    path: "/search",
    element: <SearchResult domain={domain} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
