import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectSign } from "../../../../redux/slice/signSlice";

import { checkUid, checkPwd } from "./validation";
import SignUp from "./signup/SignUp";
import "./style.css";

export default function Sign() {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isUidVaild, setIsUidValid] = useState("");
  const [isPwdValid, setIsPwdValid] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const dispatch = useDispatch();
  const ls = useSelector(selectSign);

  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/authenticate", {
        uid: uid,
        pwd: pwd,
      });
      const { accessToken } = JSON.parse(res.data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(login());
    } catch (err) {
      alert("Log in failed!");
    }
  };

  return (
    <>
      <form className="form-login">
        <input
          value={uid}
          className="form-login__input"
          name="uid"
          type="text"
          placeholder="e-mail"
          onChange={(e) => {
            setUid(e.target.value);
            checkUid(e.target.value)
              ? setIsUidValid(true)
              : setIsUidValid(false);
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
            checkPwd(e.target.value)
              ? setIsPwdValid(true)
              : setIsPwdValid(false);
          }}
        />

        <button
          className={"form-login__btn-login"}
          onClick={(e) => handleBtnClick(e)}
          disabled={!(isUidVaild && isPwdValid)}
        >
          Log in
        </button>

        <span
          className="form-login__btn-signup"
          onClick={() => setShowSignUpForm(true)}
        >
          Join us!
        </span>
      </form>
      {showSignUpForm && <SignUp setShowSignUpForm={setShowSignUpForm} />}
    </>
  );
}
