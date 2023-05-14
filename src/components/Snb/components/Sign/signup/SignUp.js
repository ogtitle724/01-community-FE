import { useState } from "react";
import axios from "axios";

import { checkEmail, checkPwd, isMatch } from "../validation";
import "./style.css";

export default function SignUp({ serverURL, setShowSignUpForm }) {
  const [eMail, setEMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isMailVaild, setIsMailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState(false);

  /** post signup data to server */
  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(serverURL + "/api/auth/register", {
        eMail: eMail,
        pwd: pwd,
      });

      console.log(res);

      setShowSignUpForm(false);
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <div className="form-signup__wrapper">
      <div
        className="form-signup__background"
        onClick={() => setShowSignUpForm(false)}
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
              setEMail(e.target.value);
              checkEmail(e.target.value)
                ? setIsMailValid(true)
                : setIsMailValid(false);
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
              setPwd(e.target.value);
              checkPwd(e.target.value)
                ? setIsPwdValid(true)
                : setIsPwdValid(false);
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
              isMatch(pwd, e.target.value)
                ? setIsPwdMatch(true)
                : setIsPwdMatch(false);
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
