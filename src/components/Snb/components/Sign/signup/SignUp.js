import { useState } from "react";
import axios from "axios";

import "./style.css";

export default function SignUp({ serverURL, setshowSignUpForm }) {
  const [eMail, setEMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isMailVaild, setIsMailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState(false);

  /* email, password validation */
  const checkEmail = (eMail) => {
    const pattern = /^[0-9a-zA-Z_\.-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+){1,2}$/i;

    if (pattern.test(eMail)) setIsMailValid(true);
    else setIsMailValid(false);
    return;
  };

  const checkPwd = (pwd) => {
    const pattern = /^(?!.*\s)(?=.*[A-Za-z])(?=.*[0-9]).{8,16}$/;

    if (pattern.test(pwd)) setIsPwdValid(true);
    else setIsPwdValid(false);
    return;
  };

  const isMatch = (pwdA, pwdB) => {
    if (pwdA === pwdB) setIsPwdMatch(true);
    else setIsPwdMatch(false);
    return;
  };

  /** post signup data to server */
  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(serverURL + "/process_signup", {
        eMail: eMail,
        pwd: pwd,
      });

      setshowSignUpForm(false);
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <div className="form-signup__wrapper">
      <div
        className="form-signup__background"
        onClick={() => setshowSignUpForm(false)}
      ></div>
      <form className="form-signup">
        <h2 className="form-signup__title">Create Account</h2>

        <section className="form-signup__section">
          <h3 className="form-signup__h3">e-mail</h3>
          <input
            id="form-signup__email"
            type="text"
            value={eMail}
            onChange={(e) => {
              checkEmail(e.target.value);
              setEMail(e.target.value);
            }}
          />
          <p className="form-signup-warn">
            {eMail && (isMailVaild ? "" : "Invalid e-mail format.")}
          </p>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">password</h3>
          <input
            id="form-signup__pwd"
            type="text"
            value={pwd}
            onChange={(e) => {
              checkPwd(e.target.value);
              setPwd(e.target.value);
            }}
          />
          <p className="form-signup-warn">
            {pwd &&
              (isPwdValid
                ? ""
                : "Password must consist of 8 to 16 charactors/numbers")}
          </p>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">confirm password</h3>
          <input
            id="form-signup__pwd-confirm"
            type="text"
            value={confirmPwd}
            onChange={(e) => {
              setConfirmPwd(e.target.value);
              isMatch(pwd, e.target.value);
            }}
          />
          <p className="form-signup-warn">
            {confirmPwd &&
              (isPwdMatch ? "" : "The two passwords you entered do not match.")}
          </p>
        </section>
        <button
          type="submit"
          className="form-signup__btn"
          disabled={!(isMailVaild && isPwdValid && isPwdMatch)}
          onClick={(e) => handleBtnClick(e)}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
