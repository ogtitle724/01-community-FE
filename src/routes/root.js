import { useState } from "react";
import axios from "axios";

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

  function handleClickMenu(clickedItem) {
    console.log(clickedItem + " clicked!");
  }

  return (
    <>
      <Header setTextSearch={setTextSearch} />
      <Nav handleClick={handleClickMenu} />
      <Main />
    </>
  );
}

function Header({ setTextSearch }) {
  return (
    <>
      <header>
        <a href="/">COMMUNITY</a>
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
      const res = await axios.get(`/search?value=${inputText}`);
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

function Nav({ handleClick }) {
  return (
    <>
      <nav className="snb">
        <SnbMenu
          items={feeds}
          optionClass={"snb__item--feed"}
          handleClick={handleClick}
        />
        <SnbMenu
          items={topics}
          optionClass={"snb__item--topic"}
          handleClick={handleClick}
        />
        <LogIn />
      </nav>
    </>
  );
}

function SnbMenu({ items, optionClass, handleClick }) {
  return (
    <ul className={"snb__menu " + optionClass}>
      {items.map((item, idx) => {
        return (
          <li
            onClick={() => handleClick(item)}
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

function Main() {
  return <main></main>;
}
