import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { login } from "./redux/slice/signSlice.js";

import Home from "./scenes/home/Home.js";
import WritePage from "./scenes/write_page/WritePage.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import PostDetail from "./scenes/post_detail/PostDetail.js";
import SearchResult from "./scenes/search_result/SearchResult.js";
import store from "./redux/store.js";
import "./index.css";

const local = "http://localhost:8000";
const cloud = "http://3.34.80.12:8080";

const domain = local;

axios.defaults.baseURL = domain;
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  const authHeader = res.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (accessToken) {
    console.log("axios default auth header setted");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return res;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/write",
    element: <WritePage />,
  },
  {
    path: "/post",
    element: <PostDetail />,
  },
  {
    path: "/search",
    element: <SearchResult />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
