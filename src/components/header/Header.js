import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setCategory,
  setScrollY,
  selectWidth,
} from "../../redux/slice/pageSlice";
import { selectIsLogIn } from "../../redux/slice/signSlice";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import ThemeToggle from "./components/themetoggle/ThemeToggle";
import MenuBtn from "./components/menu/menu";
import clip from "../../asset/icons/clip.svg";
import "./style.css";

function Header() {
  console.log("header rendered");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);

  const handleClickLogo = (e) => {
    e.preventDefault();
    dispatch(setPage({ nextPage: 1 }));
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setCategory({ category: "홈" }));
    navigate(process.env.REACT_APP_ROUTE_HOME);
  };

  return (
    <>
      <header className="header">
        <a
          className="header__logo"
          href={process.env.REACT_APP_ROUTE_HOME}
          onClick={(e) => handleClickLogo(e)}
        >
          {width < 480 ? (
            <img className="header__logo-img" src={clip} alt="logo_clip"></img>
          ) : (
            "클립마켓"
          )}
        </a>
        {width > 1024 ? (
          <>
            <SearchBar />
            <ThemeToggle />
            <div className="sign-pre">{isLogIn ? <UserBoard /> : <Sign />}</div>
          </>
        ) : (
          <MenuBtn />
        )}
      </header>
    </>
  );
}

export default memo(Header);
