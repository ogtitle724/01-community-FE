import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./scenes/home/Home.js";
import WritePage from "./scenes/write_page/WritePage.js";
import ErrorPage from "./scenes/error_page/ErrorPage.js";
import PostDetail from "./scenes/post_detail/PostDetail.js";
import SearchResult from "./scenes/search_result/SearchResult.js";
import MyPage from "./scenes/mypage/MyPage.js";
import { store, persistor } from "./redux/store.js";
import "./index.css";

const local = "http://localhost:8000";
const cloud = "https://d3peui63u3s8co.cloudfront.net";

const domain = local;

axios.defaults.baseURL = domain;
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  const authHeader = res.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (accessToken) {
    console.log("receive access Token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return res;
});

//css color-theme setting => using redux state makes an mismatch error when initial rendering
const handleInitialSetting = () => {
  const root = document.documentElement;
  const isDarkMode =
    JSON.parse(localStorage.getItem("persist:local")).isDarkMode === "true";
  root.setAttribute("color-theme", isDarkMode ? "dark" : "light");
};

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
  {
    path: "/mypage",
    element: <MyPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={handleInitialSetting}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
