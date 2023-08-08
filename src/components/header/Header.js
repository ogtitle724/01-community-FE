import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setCategory,
  setScrollY,
  setWidth,
  selectWidth,
} from "../../redux/slice/pageSlice";
import { selectIsLogIn } from "../../redux/slice/signSlice";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import ThemeToggle from "./components/themetoggle/ThemeToggle";
import MenuBtn from "./components/menu/menu";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);

  useEffect(() => {
    const handleResize = () => dispatch(setWidth({ width: window.innerWidth }));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

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
          클립마켓
        </a>
        {width > 1024 ? <SearchBar /> : ""}
        <ThemeToggle />
        <div className="sign">{isLogIn ? <UserBoard /> : <Sign />}</div>
        {width < 1024 && <MenuBtn />}
      </header>
    </>
  );
}
