import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  setPage,
  setCategory,
  setScrollY,
} from "../../redux/slice/pageSlice";
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

export default function Snb() {
  return (
    <nav className="snb">
      <SnbMenu items={category.feeds} optionClass={"snb__item--feed"} />
      <SnbMenu items={category.topics} optionClass={"snb__item--topic"} />
    </nav>
  );
}

function SnbMenu({ items, optionClass }) {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  const handleClickItem = (e) => {
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setCategory({ category: e.target.innerHTML }));
    dispatch(setPage({ nextPage: 1 }));
  };

  return (
    <ul className={"snb__menu " + optionClass}>
      {items.map((item, idx) => {
        return (
          <li
            onClick={(e) => handleClickItem(e)}
            className={
              "snb__item" + (item === category ? " snb__item--focus" : "")
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
