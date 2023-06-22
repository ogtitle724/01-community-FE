import { useEffect, useState } from "react";
import axios from "axios";
import {
  checkUid,
  checkNick,
  checkEmail,
  checkPwd,
  isMatch,
} from "../util/validation";
import "./style.css";

export default function SignUp({ setShowSignUpForm }) {
  const [uid, setUid] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [isUidVaild, setIsUidValid] = useState(false);
  const [isNickVaild, setIsNickValid] = useState(false);
  const [isEmailVaild, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState(false);
  const [isCodeValid, setIsCodeVaild] = useState(false);

  const [isClickAuthBtn, setIsClickAuthBtn] = useState(false);
  const [count, setCount] = useState();
  const [isAuthBtnDisabled, setIsAuthBtnDisabled] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const handleClickAuthBtn = async () => {
    setIsClickAuthBtn(true);
    setIsAuthBtnDisabled(true);
    setCount(240);

    try {
      await axios.get("/api/auth/creatAuthCode");
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmBtnClick = async () => {
    try {
      await axios.post("/api/auth/emailAuth");
      setIsCodeVaild(true);
    } catch (err) {
      console.log(err);
      setIsFail(true);
      setTimeout(() => setIsFail(false), 3000);
    }
  };

  useEffect(() => {
    if (isClickAuthBtn && count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
    if (count === 0) {
      setIsAuthBtnDisabled(false);
    }
  }, [count]);

  const handleBtnClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", {
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
      alert("ERROR:", err);
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
            className="form-signup__input"
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
            className="form-signup__input"
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
          </p>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">이메일 주소</h3>
          <div className="form-signup__wrapper-email">
            <input
              id="form-signup__email"
              className="form-signup__input"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkEmail(e.target.value)
                  ? setIsEmailValid(true)
                  : setIsEmailValid(false);
              }}
            />
            <button
              className={"form-signup__btn-auth"}
              onClick={handleClickAuthBtn}
              disabled={isAuthBtnDisabled}
            >
              {count ? `${~~(count / 60)} : ${count % 60}` : "인증"}
            </button>
          </div>
          <section className="form-signup__section-auth">
            <input
              type="text"
              className={
                "form-signup__input-auth" +
                (isClickAuthBtn
                  ? " form-signup__input-auth--active"
                  : " form-signup__input-auth--disable") +
                (isClickAuthBtn && isFail
                  ? " form-signup__input-auth--fail"
                  : "")
              }
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            ></input>
            <button
              className={
                "form-signup__btn-auth" +
                (isClickAuthBtn
                  ? " form-signup__btn-auth--active"
                  : " form-signup__btn-auth--disable")
              }
              onClick={() => handleConfirmBtnClick()}
              type="button"
              disabled={isCodeValid}
            >
              {isCodeValid ? "✔" : "확인"}
            </button>
          </section>
        </section>
        <section className="form-signup__section">
          <h3 className="form-signup__h3">비밀번호</h3>
          <input
            id="form-signup__pwd"
            className="form-signup__input"
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
            className="form-signup__input"
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
          disabled={
            !(
              isUidVaild &&
              isNickVaild &&
              isEmailVaild &&
              isPwdValid &&
              isPwdMatch &&
              isCodeValid
            )
          }
          onClick={(e) => handleBtnClick(e)}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
