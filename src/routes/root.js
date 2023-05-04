import { Children, useState } from "react";
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
  let mainContent;

  if (pageTopic === "HOME") mainContent = <Home />;
  else if (pageTopic === "BEST") mainContent = <Best />;
  else mainContent = <Others />;

  return (
    <>
      <Header setTextSearch={setTextSearch} />
      <Nav setPageTopic={setPageTopic} />
      <Main>{mainContent}</Main>
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

    try {
      //queryString => searchTerm
      //response => contain posts containing search terms
      const res = await axios.get(`/search?term=${inputText}`);
    } catch (err) {
      console.log(err);
    }
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

function Nav({ setPageTopic }) {
  return (
    <>
      <nav className="snb">
        <SnbMenu
          items={feeds}
          optionClass={"snb__item--feed"}
          setPageTopic={setPageTopic}
        />
        <SnbMenu
          items={topics}
          optionClass={"snb__item--topic"}
          setPageTopic={setPageTopic}
        />
        <LogIn />
      </nav>
    </>
  );
}

function SnbMenu({ items, optionClass, setPageTopic }) {
  return (
    <ul className={"snb__menu " + optionClass}>
      {items.map((item, idx) => {
        return (
          <li
            onClick={(e) => setPageTopic(e.target.innerHTML)}
            className="snb__item"
            key={idx + `-${item.slice(0, 2)}`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

function LogIn() {
  return (
    <form className="form-login">
      <div className="form-login__input-container">
        <div className="form-login__input-wrapper">
          <input
            className="form-login__input center-xy"
            name="email"
            type="text"
            placeholder="e-mail"
          />
        </div>
        <div className="form-login__input-wrapper">
          <input
            className="form-login__input center-xy"
            name="pwd"
            type="text"
            placeholder="password"
          />
        </div>
      </div>
      <span className="form-login__warn"></span>
      <button className="form-login__btn--signin">Log in</button>
      <span className="form-login__btn--signup">Join us!</span>
    </form>
  );
}

function Main({ classMain, children }) {
  return <main className="main">{children}</main>;
}
