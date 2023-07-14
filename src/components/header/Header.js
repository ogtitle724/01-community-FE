import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setCategory } from "../../redux/slice/pageSlice";
import { selectSign } from "../../redux/slice/signSlice";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import ThemeToggle from "./components/themetoggle/ThemeToggle";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectSign);

  const handleClickLogo = (e) => {
    e.preventDefault();

    dispatch(setPage({ nextPage: 1 }));
    dispatch(setCategory({ category: "HOME" }));
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
          BayClip
        </a>
        <SearchBar />
        <section className="sign">
          {<ThemeToggle />}
          {isLogIn ? <UserBoard /> : <Sign />}
        </section>
      </header>
    </>
  );
}
