import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setScrollY } from "../../redux/slice/pageSlice";
import "./style.css";
import { selectIsLogIn } from "../../redux/slice/signSlice";
import SearchBar from "../search_bar/SearchBar";
import Sign from "../header/components/sign/Sign";
import ThemeToggle from "../header/components/themetoggle/ThemeToggle";
import UserBoard from "../header/components/user_board/UserBoard";

export default function MenuBtn({ mainEle }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsLogIn);
  const btn = useRef();
  const handleClickBtnWrite = () => {
    if (isLogIn) {
      dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
      navigate(process.env.REACT_APP_ROUTE_WRITE);
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  const handleClickBtnMenu = () => {
    setIsShowMenu(true);
  };

  return (
    <>
      <button
        className="write-btn"
        ref={btn}
        onClick={handleClickBtnWrite}
      ></button>
    </>
  );
}
