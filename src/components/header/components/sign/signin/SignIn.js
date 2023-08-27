import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  setLoginDeadline,
  setUser,
} from "../../../../../redux/slice/signSlice";
import { blindInput } from "../../../../../util/secure";
import "./style.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFail, setIsFail] = useState(false);

  const handleClickBtnLogIn = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_PATH_LOGIN, {
        uid: uid,
        pwd: pwd,
      });

      let now = new Date();
      let afterAWeek = new Date();
      afterAWeek.setDate(now.getUTCDate() + 7);

      dispatch(login());
      dispatch(setLoginDeadline({ deadline: afterAWeek.toString() }));
      setTimeout(silentRenew, process.env.REACT_APP_TOKEN_REGENERATE_TIME);
    } catch (err) {
      setIsFail(true);
      setTimeout(() => setIsFail(false), 3000);
      setUid("");
      setPwd("");
    }
  };

  const silentRenew = async () => {
    try {
      await axios.get(process.env.REACT_APP_PATH_LOGIN_SILENCE);
      setTimeout(silentRenew, process.env.REACT_APP_TOKEN_REGENERATE_TIME);
      console.log("token regenerated(silent)");
    } catch (err) {
      dispatch(logout());
      dispatch(setUser({ user: null }));
      dispatch(setLoginDeadline({ deadline: null }));
      console.log(err);
    }
  };

  return (
    <form className={"signin" + (isFail ? " signin--fail" : "")}>
      <input
        value={uid}
        className="signin__input"
        name="uid"
        type="text"
        placeholder="아이디"
        autoComplete="off"
        onChange={(e) => {
          setUid(e.target.value);
        }}
      />
      <input
        value={blindInput(pwd)}
        className="signin__input"
        name="pwd"
        type="text"
        placeholder="비밀번호"
        autoComplete="off"
        onChange={(e) => {
          if (pwd.length < e.target.value.length) {
            setPwd(pwd + e.target.value.at(-1));
          } else {
            setPwd(pwd.slice(0, -1));
          }
        }}
      />

      <button className="signin__btn-submit" onClick={handleClickBtnLogIn}>
        ✔
      </button>
    </form>
  );
}
