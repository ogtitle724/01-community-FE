import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import { setCategory, setScrollY, setPage } from "../../redux/slice/pageSlice";

const category = [
  "홈",
  "유머",
  "게임·스포츠",
  "연예·방송",
  "여행",
  "취미",
  "경제·금융",
  "시사·이슈",
];

export default function Gnb() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const category = e.target.innerHTML;

    dispatch(setCategory({ category }));
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setPage({ nextPage: 1 }));
    navigate(process.env.REACT_APP_ROUTE_HOME);
  };

  return (
    <nav className="gnb">
      {category.map((item, idx) => {
        return (
          <a
            key={"gnb-a_" + idx}
            href="/"
            className="gnb__a"
            onClick={(e) => handleClick(e)}
          >
            {item}
          </a>
        );
      })}
    </nav>
  );
}
