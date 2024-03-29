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
import ItemDetail from "./scenes/item_detail/ItemDetail.js";
import SearchResult from "./scenes/search_result/SearchResult.js";
import MyPage from "./scenes/mypage/MyPage.js";
import ChatHouse from "./scenes/chat_house/ChatHouse.js";
import ChatRoom from "./scenes/chat_room/ChatRoom.js";
import { store, persistor } from "./redux/store.js";
import "./index.css";
import { logout, setLoginDeadline, setUser } from "./redux/slice/signSlice.js";
import { setWidth } from "./redux/slice/pageSlice.js";

axios.defaults.baseURL = process.env.REACT_APP_DOMAIN;
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  const authHeader = res.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  return res;
});

//css color-theme setting => using redux state makes an mismatch error when initial rendering
const handleInitialSetting = () => {
  const root = document.documentElement;

  //set dark mode
  let states = store.getState();
  let isDarkMode = states.sign.isDarkMode;
  root.setAttribute("color-theme", isDarkMode ? "dark" : "light");

  //check whether the login state expired or not
  let loginDeadline = states.sign.loginDeadline;
  let now = new Date();

  if (new Date(loginDeadline) <= now) {
    store.dispatch(logout());
    store.dispatch(setUser({ user: null }));
    store.dispatch(setLoginDeadline({ deadline: null }));
  }

  //set eventlistener for browser width
  window.addEventListener("resize", () =>
    store.dispatch(setWidth({ width: window.innerWidth }))
  );
};

const router = createBrowserRouter([
  {
    path: process.env.REACT_APP_ROUTE_HOME,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: process.env.REACT_APP_ROUTE_WRITE,
    element: <WritePage />,
  },
  {
    path: process.env.REACT_APP_ROUTE_POST + "/:postId",
    element: <PostDetail />,
  },
  {
    path: process.env.REACT_APP_ROUTE_ITEM + "/:itemId",
    element: <ItemDetail />,
  },
  {
    path: process.env.REACT_APP_ROUTE_SEARCH,
    element: <SearchResult />,
  },
  {
    path: process.env.REACT_APP_ROUTE_CHATHOUSE,
    element: <ChatHouse />,
  },
  {
    path: process.env.REACT_APP_ROUTE_CHATROOM,
    element: <ChatRoom />,
  },
  {
    path: process.env.REACT_APP_ROUTE_MYPAGE,
    element: <MyPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={handleInitialSetting}
    >
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
