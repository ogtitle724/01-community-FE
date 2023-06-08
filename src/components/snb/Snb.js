import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectSign, login, logout } from "../../redux/slice/signSlice";

import UserBoard from "./components/user_board/UserBoard";
import Sign from "./components/sign/Sign";
import "./style.css";

const category = {
  feeds: ["HOME", "BEST"],
  topics: [
    "유머",
    "게임/스포츠",
    "연예/방송",
    "여행",
    "취미",
    "경제/금융",
    "시사/이슈",
  ],
};

export default function Snb({ setPage, pageTopic, setPageTopic }) {
  const isLogIn = useSelector(selectSign);
  const dispatch = useDispatch();
  const accessToken = axios.defaults.headers.common["Authorization"];

  /*   if (accessToken) {
    dispatch(login());
  } else {
    dispatch(logout());
  }
 */

  return (
    <nav className="snb">
      <SnbMenu
        setPage={setPage}
        items={category.feeds}
        optionClass={"snb__item--feed"}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      <SnbMenu
        setPage={setPage}
        items={category.topics}
        optionClass={"snb__item--topic"}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      {accessToken ? <UserBoard /> : <Sign />}
    </nav>
  );
}

function SnbMenu({ setPage, items, optionClass, pageTopic, setPageTopic }) {
  const handleClickItem = (e) => {
    setPageTopic(e.target.innerHTML);
    setPage(1);
  };

  return (
    <ul className={"snb__menu " + optionClass}>
      {items.map((item, idx) => {
        return (
          <li
            onClick={(e) => handleClickItem(e)}
            className={
              "snb__item" + (item === pageTopic ? " snb__item--focus" : "")
            }
            key={idx + `-${item.slice(0, 2)}`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
