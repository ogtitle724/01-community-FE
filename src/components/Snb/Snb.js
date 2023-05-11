import { useState } from "react";

import UserBoard from "./components/user_board/UserBoard";
import Sign from "./components/Sign/Sign";
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

export default function Snb({ serverURL, pageTopic, setPageTopic }) {
  /**TODO: change */
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <nav className="snb">
      <SnbMenu
        items={category.feeds}
        optionClass={"snb__item--feed"}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      <SnbMenu
        items={category.topics}
        optionClass={"snb__item--topic"}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      {isLogIn ? (
        <UserBoard setIsLogIn={setIsLogIn} />
      ) : (
        <Sign serverURL={serverURL} setIsLogIn={setIsLogIn} />
      )}
    </nav>
  );
}

function SnbMenu({ items, optionClass, pageTopic, setPageTopic }) {
  return (
    <ul className={"snb__menu " + optionClass}>
      {items.map((item, idx) => {
        return (
          <li
            onClick={(e) => setPageTopic(e.target.innerHTML)}
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
