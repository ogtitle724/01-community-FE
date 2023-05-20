import { useState } from "react";
import axios from "axios";

import {
  checkUid,
  checkNick,
  checkEmail,
  checkPwd,
  isMatch,
} from "../validation";
import "./style.css";

export default function SignUp({ serverURL, setShowSignUpForm }) {
  const [uid, setUid] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isUidVaild, setIsUidValid] = useState(false);
  const [isNickVaild, setIsNickValid] = useState(false);
  const [isEmailVaild, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState(false);

  /** post signup data to server */
  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(serverURL + "/api/auth/register", {
        uid: uid,
        nick: nick,
        email: email,
        pwd: pwd,
        emailReceive: "true",
      });

      if (res.data) setShowSignUpForm(false);
      else throw new Error("singin rejected");
    } catch (err) {
      console.log(err);
      alert("this e-mail already in use");
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
          <h3 className="form-signup__h3">아이디</h3>
          <input
            id="form-signup__uid"
            type="text"
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
              checkUid(e.target.value)
                ? setIsUidValid(true)
                : setIsUidValid(false);
            }}
          />
          <p className="form-signup-warn">
            {uid &&
              (isUidVaild
                ? ""
                : "사용자 ID는 3~20자 사이의 영문+숫자로 이루어져야 하며 영문으로 시작되어야 합니다.")}
          </p>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">닉네임</h3>
          <input
            id="form-signup__nick"
            type="text"
            value={nick}
            onChange={(e) => {
              setNick(e.target.value);
              checkNick(e.target.value)
                ? setIsNickValid(true)
                : setIsNickValid(false);
            }}
          />
          <p className="form-signup-warn">
            {nick && (isNickVaild ? "" : "닉네임은 2~8자 이내여야 합니다.")}{" "}
            {/*정치 관련, 특정 사이트 언급, 반사회적, 성적, 욕설 닉네임은 금지합니다.*/}
          </p>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">이메일 주소</h3>
          <input
            id="form-signup__email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmail(e.target.value)
                ? setIsEmailValid(true)
                : setIsEmailValid(false);
            }}
          />
          <p className="form-signup-warn">
            {email && (isEmailVaild ? "" : "Invalid e-mail format.")}
          </p>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">비밀번호</h3>
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
          <h3 className="form-signup__h3">비밀번호 확인</h3>
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
          disabled={!(isEmailVaild && isPwdValid && isPwdMatch)}
          onClick={(e) => handleBtnClick(e)}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
