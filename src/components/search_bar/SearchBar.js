import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/slice/pageSlice";
import "./style.css";

export default function SearchBar() {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      dispatch(setPage({ nextPage: 1 }));
      navigate(process.env.REACT_APP_ROUTE_SEARCH, {
        state: { term: searchTerm },
      });
    }
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="search-bar">
      <input
        className="search-bar__input"
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
        autoComplete="off"
      />
      <button className="search-bar__btn" onClick={handleOnSubmit}></button>
    </form>
  );
}
