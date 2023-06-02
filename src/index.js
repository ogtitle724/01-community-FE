import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./scenes/home/Home.js";
import WritePage from "./scenes/write_page/WritePage.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import PostDetail from "./scenes/post_detail/PostDetail.js";
import SearchResult from "./scenes/search_result/SearchResult.js";
import store from "./redux/store.js";
import "./index.css";

const local = "http://localhost:8080";
const cloud = "http://3.34.80.12:8080";

const domain = local;

axios.defaults.baseURL = domain;
axios.defaults.withCredentials = true;
/* axios.interceptors.request.use(callBack, (err) => {
  console.error(err);
  return Promise.reject(err)
})
axios.interceptors.response.use(callBack, (err) => {
  console.error(err);
  return Promise.reject(err)
})
 */
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
