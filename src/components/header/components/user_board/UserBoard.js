import { useDispatch, useSelector } from "react-redux";
import { logout, setUser, selectUser } from "../../../../redux/slice/signSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileImg from "../../../../asset/icons/person.svg";
import "./style.css";
import { useEffect, useState } from "react";

export default function UserBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleClickLogOut = async () => {
    try {
      await axios.post(process.env.REACT_APP_PATH_AUTH_LOGOUT, null);

      delete axios.defaults.headers.common["Authorization"];
      dispatch(logout());
      dispatch(setUser({ user: null }));
    } catch (err) {
      alert("Error:", err);
    }
  };

  const handleNavigateMypage = () => {
    navigate(process.env.REACT_APP_ROUTE_MYPAGE);
  };

  return (
    <div className="user-board">
      <div className="user-board__detail">
        <img
          src={profileImg}
          alt="profile"
          className="user-board__profile-img"
          onClick={handleNavigateMypage}
        ></img>
        <div>
          <p className="user-board__nickname" onClick={handleNavigateMypage}>
            {user.nick}
          </p>
          <p className="user-board__email">{user.email}</p>
        </div>
      </div>
      <button className="user-board__btn-logout" onClick={handleClickLogOut}>
        ✖
      </button>
    </div>
  );
}
