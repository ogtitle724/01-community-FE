import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const categories = [
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

  return (
    <>
      <Header setTextSearch={setTextSearch} />
      <Nav />
      <Main />
    </>
  );
}

function Header({ setTextSearch }) {
  const [inputText, setInputText] = useState("");

  function handleSubmit(inputText) {
    setTextSearch(inputText);
  }

  return (
    <>
      <header>
        <a href="/">COMMUNITY</a>
        <form className="search-bar center-xy">
          <input
            className="center-xy"
            value={inputText}
            name="search-text"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
        </form>
      </header>
    </>
  );
}

function Nav() {
  return (
    <>
      <nav className="snb">
        <ul className="menu-ul" id="feeds">
          <li className="menu-li">
            <Link to={`page/Home`}>Home</Link>
          </li>
          <li className="menu-li">
            <Link to={`page/Best`}>Best</Link>
          </li>
        </ul>
        <ul className="menu-ul" id="topics">
          {categories.map((category, idx) => {
            return (
              <li className="menu-li" key={idx}>
                <Link to={`page/${category}`}></Link>
                {category}
              </li>
            );
          })}
        </ul>
        <form className="form-login">
          <div className="input-wrapper">
            <div className="input-login">
              <input
                className="input-text center-xy"
                name="email"
                type="text"
                placeholder="e-mail"
              />
            </div>
            <div className="input-login">
              <input
                className="input-text center-xy"
                name="pwd"
                type="text"
                placeholder="password"
              />
            </div>
          </div>
          <button className="btn-login">Log in</button>
        </form>
      </nav>
    </>
  );
}

function Main() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
