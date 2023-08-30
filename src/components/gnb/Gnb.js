import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategory,
  setScrollY,
  setPage,
  selectWidth,
  selectCategory,
} from "../../redux/slice/pageSlice";
import { categories } from "../../config/config";
import "./style.css";

function Gnb() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useSelector(selectWidth);
  const category = useSelector(selectCategory);
  const marker = useRef();
  const gnb = useRef();
  const btnFocus = useRef();

  useEffect(() => {
    btnFocus.current = Object.values(gnb.current.children).filter(
      (btn) => btn.innerHTML === category
    )[0];
    marker.current.style = `width:${btnFocus.current.offsetWidth}px; left:${btnFocus.current.offsetLeft}px;`;
  }, [width, category]);

  const handleClick = (e) => {
    const category = e.target.innerHTML;

    dispatch(setCategory({ category }));
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setPage({ nextPage: 1 }));

    if (window.location.pathname !== "/")
      navigate(process.env.REACT_APP_ROUTE_HOME);
  };

  return (
    <nav ref={gnb} className="gnb">
      {categories.map((category, idx) => {
        return (
          <button
            key={"gnb-btn_" + idx}
            href="/"
            className="gnb__btn"
            onClick={handleClick}
            onLoad={(e) => console.log("hi", e.target.innerHTML)}
          >
            {category}
          </button>
        );
      })}
      <div ref={marker} className="gnb__mark"></div>
    </nav>
  );
}

export default memo(Gnb);
