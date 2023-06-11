import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchPage } from "../../redux/slice/pageSlice";
import "./style.css";

export default function SearchBar() {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      dispatch(setSearchPage({ nextPage: 1 }));
      navigate(`/search`, { state: { term: searchTerm } });
    }
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="search-bar">
      <input
        className="search-bar__input"
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
