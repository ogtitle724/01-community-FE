import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../../../redux/slice/signSlice";
import "./style.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFail, setIsFail] = useState(false);

  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/authenticate", {
        uid: uid,
        pwd: pwd,
      });

      dispatch(login());
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
      await axios.post("/api/auth/silentRefresh", null);
      setTimeout(silentRefresh, process.env.REACT_APP_REGENERATE_TIME);
      console.log("silent refresh executed!");
    } catch (err) {
      dispatch(logout());
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
        onChange={(e) => {
          setUid(e.target.value);
        }}
      />
      <input
        value={pwd}
        className="form-login__input"
        name="pwd"
        type="text"
        placeholder="password"
        onChange={(e) => {
          setPwd(e.target.value);
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
