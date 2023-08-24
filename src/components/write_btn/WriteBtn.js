import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setScrollY } from "../../redux/slice/pageSlice";
import "./style.css";
import { selectIsLogIn } from "../../redux/slice/signSlice";

export default function MenuBtn({ mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsLogIn);
  const btn = useRef();
  const handleClickBtnWrite = () => {
    if (isLogIn) {
      dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
      navigate(process.env.REACT_APP_ROUTE_WRITE);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <>
      <button
        className="write-btn"
        ref={btn}
        onClick={handleClickBtnWrite}
      ></button>
    </>
  );
}
