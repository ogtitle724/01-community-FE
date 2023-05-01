import { useState } from "react";

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
        <h1>COMMUNITY</h1>
        <form className="search-bar">
          <input
            value={inputText}
            name="search-text"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <input
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(inputText);
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
      <nav className="gnb">
        <ul>
          {categories.map((category, idx) => {
            return <li key={idx}>{category}</li>;
          })}
        </ul>
      </nav>
    </>
  );
}
