import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory, setScrollY, setPage } from "../../redux/slice/pageSlice";
import { categories } from "../../config/config";
import "./style.css";

function Gnb() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    const category = e.target.innerHTML;

    dispatch(setCategory({ category }));
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setPage({ nextPage: 1 }));

    if (window.location.pathname !== "/")
      navigate(process.env.REACT_APP_ROUTE_HOME);
  };

  return (
    <nav className="gnb">
      {categories.map((category, idx) => {
        return (
          <button
            key={"gnb-btn_" + idx}
            href="/"
            className="gnb__btn"
            onClick={handleClick}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}

export default memo(Gnb);
