import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout, setUser } from "../../../../../redux/slice/signSlice";
import { blindPwd } from "../../../../../util/secure";
import "./style.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFail, setIsFail] = useState(false);

  const handleClickBtnLogIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(process.env.REACT_APP_PATH_LOGIN, {
        uid: uid,
        pwd: pwd,
      });

      const userData = res.data;

      dispatch(login());
      dispatch(setUser({ user: userData }));
      setTimeout(silentRenew, process.env.REACT_APP_TOKEN_REGENERATE_TIME);
    } catch (err) {
      setIsFail(true);
      setUid("");
      setPwd("");
      setTimeout(() => setIsFail(false), 3000);
    }
  };

  const silentRenew = async () => {
    try {
      await axios.get(process.env.REACT_APP_PATH_LOGIN_SILENCE);
      setTimeout(silentRenew, process.env.REACT_APP_TOKEN_REGENERATE_TIME);
      console.log("AUTO Login executed");
    } catch (err) {
      dispatch(logout());
      dispatch(setUser({ user: null }));
      console.log(err);
    }
  };

  return (
    <form className={"form-login" + (isFail ? " form-login--fail" : "")}>
      <input
        value={uid}
        className="form-login__input"
        name="uid"
        type="text"
        placeholder="아이디"
        autoComplete="off"
        onChange={(e) => {
          setUid(e.target.value);
        }}
      />
      <input
        value={blindPwd(pwd)}
        className="form-login__input"
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

      <button
        className="form-login__btn-login"
        onClick={(e) => handleClickBtnLogIn(e)}
      >
        ✔
      </button>
    </form>
  );
}
