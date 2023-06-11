import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slice/signSlice";
import axios from "axios";
import profileImg from "../../../../asset/icons/person.svg";
import "./style.css";

export default function UserBoard() {
  const dispatch = useDispatch();

  const handleClickLogOut = async () => {
    try {
      await axios.post("/api/auth/logout", null);

      delete axios.defaults.headers.common["Authorization"];
      dispatch(logout());
    } catch (err) {
      alert("Error:", err);
    }
  };

  return (
    <div className="user-board">
      <div className="user-board__detail">
        <img
          src={profileImg}
          alt="profile"
          className="user-board__profile-img"
        ></img>
        <div>
          <p className="user-board__nickname">NickName</p>
          <p className="user-board__email">sample@example.com</p>
        </div>
      </div>
      <button className="user-board__btn-logout" onClick={handleClickLogOut}>
        ✖
      </button>
    </div>
  );
}
