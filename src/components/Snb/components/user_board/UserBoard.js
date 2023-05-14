import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function UserBoard({ setIsLogIn }) {
  const navigate = useNavigate();

  const handleClickLogOut = async () => {
    try {
      /* get user detail by verify token
      const userDetail = await axios.post("/process_verify");
      token disable
      const res = axios.post("/process_logout", userDetail);
 */
      setIsLogIn(false);
    } catch (err) {
      alert("Error:", err);
    }
  };

  const handleClickMypage = () => {};

  const handleClickMyPosts = () => {};

  const handleClickWrite = () => {
    navigate("/write");
  };

  return (
    <div className="user-board">
      <div className="user-board__detail">
        <img
          src="./icons/person.svg"
          alt="profile"
          className="user-board__profile-img"
        ></img>
        <div>
          <p className="user-board__nickname">NickName</p>
          <p className="user-board__mail">sample@example.com</p>
        </div>
        <button className="user-board__btn-logout">
          <img
            src="./icons/close-circle.svg"
            alt="Log out"
            className="user-board__img-logout center-xy"
            onClick={handleClickLogOut}
          ></img>
        </button>
      </div>
      <div className="user-board__btn-wrapper">
        <button className="user-board__btn" onClick={handleClickMypage}>
          <img
            src="./icons/id-card.svg"
            className="user-board__img-mypage"
            alt="mypage"
          ></img>
        </button>
        <button className="user-board__btn" onClick={handleClickMyPosts}>
          <img
            src="./icons/documents.svg"
            className="user-board__img-myposts"
            alt="myposts"
          ></img>
        </button>
        <button className="user-board__btn" onClick={handleClickWrite}>
          <img
            src="./icons/pencil.svg"
            className="user-board__img-write"
            alt="write"
          ></img>
        </button>
      </div>
    </div>
  );
}
