import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout, setUser } from "../../../../../redux/slice/signSlice";
import { blindPwd } from "../../../../util/secure";
import "./style.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFail, setIsFail] = useState(false);

  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(process.env.REACT_APP_PATH_AUTH_LOGIN, {
        uid: uid,
        pwd: pwd,
      });
      const userData = res.data;
      dispatch(login());
      dispatch(setUser({ user: userData }));
      setTimeout(silentRefresh, process.env.REACT_APP_REGENERATE_TIME);
    } catch (err) {
      setIsFail(true);
      setUid("");
      setPwd("");

      setTimeout(() => setIsFail(false), 3000);
    }
  };

  const silentRefresh = async () => {
    console.log("regenerate time:", process.env.REACT_APP_REGENERATE_TIME);

    try {
      await axios.post(process.env.REACT_APP_PATH_AUTH_LOGIN_SILENT, null);
      setTimeout(silentRefresh, process.env.REACT_APP_REGENERATE_TIME);
      console.log("silent refresh executed!");
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
        placeholder="e-mail"
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
        placeholder="password"
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
        onClick={(e) => handleBtnClick(e)}
      >
        ✔
      </button>
    </form>
  );
}
