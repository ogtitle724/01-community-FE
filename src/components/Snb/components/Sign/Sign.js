import { useState } from "react";
import axios from "axios";

import { checkEmail, checkPwd } from "./validation";
import SignUp from "./signup/SignUp";
import "./style.css";

export default function Sign({ serverURL, setIsLogIn }) {
  const [eMail, setEMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isMailVaild, setIsMailValid] = useState("");
  const [isPwdValid, setIsPwdValid] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  // if token is exist directly set login true and eMail, pwd

  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(serverURL + "/api/auth/authenticate", {
        uid: eMail,
        password: pwd,
      });

      /** Store the token received with res in a browser cookie. */
      /** If the email and password are invalid, a notification is displayed.
       * if they are valid, the isLogIn state is set to true. */

      setIsLogIn(true);
    } catch (err) {
      alert("Log in failed!");
    }
  };

  return (
    <>
      <form className="form-login">
        <input
          value={eMail}
          className="form-login__input"
          name="email"
          type="text"
          placeholder="e-mail"
          onChange={(e) => {
            setEMail(e.target.value);
            checkEmail(e.target.value)
              ? setIsMailValid(true)
              : setIsMailValid(false);
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
          disabled={!(isMailVaild && isPwdValid)}
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
      {showSignUpForm && (
        <SignUp serverURL={serverURL} setShowSignUpForm={setShowSignUpForm} />
      )}
    </>
  );
}
