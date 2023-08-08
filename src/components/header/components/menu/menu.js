import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLogIn } from "../../../../redux/slice/signSlice";
import Sign from "../sign/Sign";
import UserBoard from "../user_board/UserBoard";
import SearchBar from "../../../search_bar/SearchBar";
import ThemeToggle from "../themetoggle/ThemeToggle";
import "./style.css";

export default function MenuBtn() {
  const [showMenu, setShowMenu] = useState(false);
  const isLogIn = useSelector(selectIsLogIn);

  return (
    <>
      <button className="menu-btn" onClick={() => setShowMenu(true)}></button>
      {showMenu && (
        <section className="menu">
          <h3 hidden>mobile menu</h3>
          <button
            className="btn-close"
            onClick={() => setShowMenu(false)}
          ></button>
          <ThemeToggle />
          <SearchBar />
          {isLogIn ? <UserBoard /> : <Sign />}
        </section>
      )}
    </>
  );
}
