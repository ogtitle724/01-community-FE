import { useState, useRef } from "react";
import { Home, Best, Others } from "../components";
import axios from "axios";
import "../stylesheet/component.css";

const feeds = ["HOME", "BEST"];
const topics = [
  "유머",
  "게임/스포츠",
  "연예/방송",
  "여행",
  "취미",
  "경제/금융",
  "시사/이슈",
];

export default function Root() {
  const [textSearch, setTextSearch] = useState("");
  const [pageTopic, setPageTopic] = useState("HOME");
  const mainContent = useRef("");

  if (pageTopic === "HOME") mainContent.current = <Home />;
  else if (pageTopic === "BEST") mainContent.current = <Best />;
  else mainContent.current = <Others title={pageTopic} />;

  return (
    <>
      <Header setTextSearch={setTextSearch} />
      <Nav pageTopic={pageTopic} setPageTopic={setPageTopic} />
      <Main>{mainContent.current}</Main>
    </>
  );
}

function Header({ setTextSearch }) {
  return (
    <>
      <header className="header-main">
        <a className="header-main__logo" href="/">
          COMMUNITY
        </a>
        <SearchBar />
      </header>
    </>
  );
}

function SearchBar() {
  const [inputText, setInputText] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      action="http://localhost:5000"
      className="form-search center-xy"
    >
      <input
        className="form-search__input center-xy"
        value={inputText}
        name="searchTerm"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
    </form>
  );
}
/** TODO:
 * component nesting 개선 => 깔끔하라고 중복시켜놨는데 보기 더 불편함
 * state 정리(명칭 및 쓰지않는 state 정리) */
function Nav({ pageTopic, setPageTopic }) {
  const [isLogIn, setIsLogIn] = useState(false);
  console.log(isLogIn);

  function SnbMenu({ items, optionClass, pageTopic, setPageTopic }) {
    return (
      <ul className={"snb__menu " + optionClass}>
        {items.map((item, idx) => {
          return (
            <li
              onClick={(e) => setPageTopic(e.target.innerHTML)}
              className={
                "snb__item" + (item === pageTopic ? " snb__item--focus" : "")
              }
              key={idx + `-${item.slice(0, 2)}`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    );
  }

  function UserBoard() {
    const [isSignUp, setIsSignUp] = useState(false);

    function SignUp() {
      const [eMail, setEMail] = useState("");
      const [pwd, setPwd] = useState("");
      const [confirmPwd, setConfirmPwd] = useState("");
      const [isMailVaild, setIsMailValid] = useState(false);
      const [isPwdValid, setIsPwdValid] = useState(false);
      const [isPwdMatch, setIsPwdMatch] = useState(false);

      const handleBtnClick = (e) => {
        e.preventDefault();

        axios
          .post("http://localhost:8080/process_signup", {
            eMail: eMail,
            pwd: pwd,
          })
          .then((res) => {
            /** set userboard data here using res */
            console.log("sign up data passed to /process_signup! (port: 8080)");
          })
          .catch((err) => {
            console.log(err);
          });

        setIsSignUp(false);
      };

      /* email, password validation */
      const checkEmail = (eMail) => {
        const pattern =
          /^[0-9a-zA-Z_\.-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+){1,2}$/i;

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

      return (
        <div className="form-signup__wrapper">
          <div
            className="form-signup__background"
            onClick={() => setIsSignUp(false)}
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
                  (isPwdMatch
                    ? ""
                    : "The two passwords you entered do not match.")}
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

    function Detail() {
      return (
        <>
          <div className="user-board__detail">
            <img
              src="./icons/person.svg"
              alt="profile"
              className="user-board__profile-img"
            ></img>
            <span className="user-board__nickname">NickName</span>
          </div>
          <div className="user-board__btn-wrapper">
            <button className="user-board__btn">
              <img
                src="./icons/id-card.svg"
                className="user-board__img-mypage"
                alt="mypage"
              ></img>
            </button>
            <button className="user-board__btn">
              <img
                src="./icons/documents.svg"
                className="user-board__img-myposts"
                alt="myposts"
              ></img>
            </button>
            <button className="user-board__btn">
              <img
                src="./icons/pencil.svg"
                className="user-board__img-write"
                alt="write"
              ></img>
            </button>
          </div>
        </>
      );
    }

    function LogInForm() {
      const [eMail, setEMail] = useState("");
      const [pwd, setPwd] = useState("");

      const handleBtnClick = (e) => {
        e.preventDefault();

        axios
          .post("http://localhost:8080/process_login", {
            eMail: eMail,
            pwd: pwd,
          })
          .then((res) => {
            /** Store the token received with res in a browser cookie. */
            /** If the email and password are invalid, a notification is displayed.
             * if they are valid, the isLogIn state is set to true. */
          })
          .catch((err) => {
            console.log(err);
          });
      };

      return (
        <>
          <input
            value={eMail}
            className="form-login__input"
            name="email"
            type="text"
            placeholder="e-mail"
            onChange={(e) => setEMail(e.target.value)}
          />
          <input
            value={pwd}
            className="form-login__input"
            name="pwd"
            type="text"
            placeholder="password"
            onChange={(e) => setPwd(e.target.value)}
          />

          <button
            className="form-login__btn-signin"
            onClick={(e) => handleBtnClick(e)}
          >
            Log in
          </button>
          <span
            className="form-login__btn-signup"
            onClick={() => setIsSignUp(true)}
          >
            Join us!
          </span>
        </>
      );
    }

    return (
      <>
        {isSignUp ? <SignUp /> : ""}
        <form className="user-board">
          {isLogIn ? <Detail /> : <LogInForm />}
        </form>
      </>
    );
  }

  return (
    <nav className="snb">
      <SnbMenu
        items={feeds}
        optionClass={"snb__item--feed"}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      <SnbMenu
        items={topics}
        optionClass={"snb__item--topic"}
        pageTopic={pageTopic}
        setPageTopic={setPageTopic}
      />
      <UserBoard />
    </nav>
  );
}

function Main({ classMain, children }) {
  return <main className="main">{children}</main>;
}
