import { useState } from "react";
import axios from "axios";
import "./style.css";

export default function SearchBar({ serverURL }) {
  const [searchTerm, setsearchTerm] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.get(
        serverURL + `/api/board?id=${searchTerm}`
      );
      /**
       * response로 연관 post데이터 받고
       * 해당 데이터와 함께 post 페이지로 리다이렉션
       */
    } catch (err) {
      alert("ERROR:", err);
    }
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="search-bar center-xy">
      <input
        className="search-bar__input center-xy"
        name="searchTerm"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
      />
    </form>
  );
}
