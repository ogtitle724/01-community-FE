import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setScrollY } from "../../redux/slice/pageSlice";
import "./style.css";

export default function MenuBtn({ mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const btn = useRef();

  const handleClickBtn = () => {
    dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
    navigate(process.env.REACT_APP_ROUTE_WRITE);
  };

  return (
    <button className="menu-btn" ref={btn} onClick={handleClickBtn}></button>
  );
}
