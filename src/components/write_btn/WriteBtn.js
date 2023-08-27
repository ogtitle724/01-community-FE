import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setScrollY } from "../../redux/slice/pageSlice";
import "./style.css";
import { selectIsLogIn } from "../../redux/slice/signSlice";

function WriteBtn({ mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsLogIn);
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
      <button className="btn-write" onClick={handleClickBtnWrite}></button>
    </>
  );
}

export default memo(WriteBtn);
