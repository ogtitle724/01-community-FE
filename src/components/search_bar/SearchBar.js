import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function SearchBar({ domain }) {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) navigate(`/search`, { state: { term: searchTerm } });
  };

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
