import { useDispatch, useSelector } from "react-redux";
import {
  clickModeBtn,
  selectIsDarkMode,
} from "../../../../redux/slice/signSlice";
import "./style.css";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  const handleClickBtn = () => {
    dispatch(clickModeBtn());
    const root = document.documentElement;
    root.setAttribute("color-theme", isDarkMode ? "light" : "dark");
  };
  return (
    <div className="themetoggle" onClick={handleClickBtn}>
      <div
        className={
          "themetoggle__btn" +
          (isDarkMode ? " themetoggle__btn--dark" : " themetoggle__btn--light")
        }
      ></div>
    </div>
  );
}
