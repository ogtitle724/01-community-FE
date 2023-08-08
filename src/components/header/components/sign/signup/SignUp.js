import { useEffect, useState } from "react";
import axios from "axios";
import {
  checkUid,
  checkNick,
  checkEmail,
  checkPwd,
  isMatch,
} from "../../../../../util/validation";
import "./style.css";

export default function SignUp({ setShowSignUpForm }) {
  const [uid, setUid] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [isUidVaild, setIsUidValid] = useState(false);
  const [canUseUid, setCanUseUid] = useState(false);
  const [isNickVaild, setIsNickValid] = useState(false);
  const [canUseNick, setCanUseNick] = useState(false);
  const [isEmailVaild, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState(false);
  const [isCodeValid, setIsCodeVaild] = useState(false);

  const [isClickBtnAuth, setIsClickBtnAuth] = useState(false);
  const [count, setCount] = useState();
  const [isAuthBtnDisabled, setIsAuthBtnDisabled] = useState(false);
  const [isFail, setIsFail] = useState(false);

  useEffect(() => {
    if (isClickBtnAuth && count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
    if (count === 0) {
      setIsAuthBtnDisabled(false);
    }
  }, [count, isClickBtnAuth]);

  const handleClickBtnAuth = async () => {
    setIsClickBtnAuth(true);
    setIsAuthBtnDisabled(true);
    setCount(240);

    try {
      await axios.get(process.env.REACT_APP_PATH_EMAIL_AUTHCODE, {
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBtnConfrim = async () => {
    try {
      await axios.post(process.env.REACT_APP_PATH_EMAIL_AUTHCODE, {
        authCode: Number(authCode),
      });
      setIsCodeVaild(true);
    } catch (err) {
      console.log(err);
      setIsFail(true);
      setTimeout(() => setIsFail(false), 3000);
    }
  };

  const handleClickBtnSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(process.env.REACT_APP_PATH_USER, {
        uid: uid,
        nick: nick,
        email: email,
        pwd: pwd,
      });

      if (res.data) setShowSignUpForm(false);
      else throw new Error("singin rejected");
    } catch (err) {
      console.log(err);
      alert("ERROR:", err);
    }
  };

  const handleCheckDuplication = async (value, type) => {
    try {
      if (type === "nick") {
        await axios.post(process.env.REACT_APP_PATH_CHECK_NICK, {
          nick: value,
        });
        setCanUseNick(true);
      } else if (type === "uid") {
        await axios.post(process.env.REACT_APP_PATH_CHECK_UID, {
          uid: value,
        });
        setCanUseUid(true);
      }
    } catch (err) {
      if (type === "nick") {
        setCanUseNick(false);
      } else if (type === "uid") {
        setCanUseUid(false);
      }
      console.log(err);
    }
  };

  return (
    <form className="form-signup">
      <h2 className="form-signup__title">회원 가입</h2>
      <button
        className="btn-close"
        onClick={() => setShowSignUpForm(false)}
      ></button>
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
            handleCheckDuplication(e.target.value, "uid");
          }}
          autoComplete="off"
        />
        <p className="form-signup__warn-wrapper">
          <span
            className={
              "form-signup__warn" +
              (canUseUid ? " form-signup__warn-duplication" : "")
            }
          >
            {uid &&
              isUidVaild &&
              (canUseUid
                ? "사용 가능한 아이디입니다."
                : "이미 사용중인 아이디입니다.")}
          </span>
          <span className="form-signup__warn">
            {uid &&
              (isUidVaild
                ? ""
                : "아이디는 3~20자 사이의 영문/숫자로 이루어져야 합니다.")}{" "}
          </span>
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
            handleCheckDuplication(e.target.value, "nick");
          }}
          autoComplete="off"
        />
        <p className="form-signup__warn-wrapper">
          <span
            className={
              "form-signup__warn" +
              (canUseNick ? " form-signup__warn-duplication" : "")
            }
          >
            {nick &&
              isNickVaild &&
              (canUseNick
                ? "사용 가능한 닉네임입니다."
                : "이미 사용중인 닉네임입니다.")}
          </span>
          <span className="form-signup__warn">
            {nick && (isNickVaild ? "" : "닉네임은 2~8자 이내여야 합니다.")}{" "}
          </span>
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
            autoComplete="off"
          />
          <button
            className={"form-signup__btn-auth"}
            onClick={handleClickBtnAuth}
            disabled={isAuthBtnDisabled || !isEmailVaild}
          >
            {count ? `${~~(count / 60)} : ${count % 60}` : "인증"}
          </button>
        </div>
        <section className="form-signup__section-auth">
          <input
            type="text"
            className={
              "form-signup__input-auth" +
              (isClickBtnAuth
                ? " form-signup__input-auth--active"
                : " form-signup__input-auth--disable") +
              (isClickBtnAuth && isFail ? " form-signup__input-auth--fail" : "")
            }
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            autoComplete="off"
          ></input>
          <button
            className={
              "form-signup__btn-auth" +
              (isClickBtnAuth
                ? " form-signup__btn-auth--active"
                : " form-signup__btn-auth--disable")
            }
            onClick={() => handleClickBtnConfrim()}
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
          autoComplete="off"
        />
        <p className="form-signup__warn-wrapper">
          <span className="form-signup__warn">
            {pwd &&
              (isPwdValid
                ? ""
                : "비밀번호는 8 ~ 16자 영문/숫자로 이루어져야 합니다.")}
          </span>
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
          autoComplete="off"
        />
        <p className="form-signup__warn-wrapper">
          <span className="form-signup__warn">
            {confirmPwd &&
              (isPwdMatch ? "" : "입력한 비밀번호가 일치하지 않습니다.")}
          </span>
        </p>
      </section>
      <button
        type="submit"
        className="form-signup__btn"
        disabled={
          !(
            isUidVaild &&
            canUseUid &&
            isNickVaild &&
            canUseNick &&
            isEmailVaild &&
            isPwdValid &&
            isPwdMatch &&
            isCodeValid
          )
        }
        onClick={(e) => handleClickBtnSignUp(e)}
      >
        Sign up
      </button>
    </form>
  );
}
