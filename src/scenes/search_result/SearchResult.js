import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { selectSearchPage } from "../../redux/slice/pageSlice";
import { useSelector } from "react-redux";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import Board from "./components/board/Board";
import "./style.css";

export default function SearchResult() {
  const page = useSelector(selectSearchPage);

  const [postData, setPostData] = useState();
  const location = useLocation();
  const term = location.state.term;

  const getSearchData = async (term, page) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_PATH_SEARCH +
          `?page=${page - 1}&size=20&term=${term}`
      );
      setPostData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchData(term, page);
  }, [term]);

  useEffect(() => {
    getSearchData(term, page);
  }, [page]);

  return (
    <div className="search-result">
      <Header />
      <Gnb />
      <main className="search-result__main">
        <article className="search-result__board">
          <h2 className="search-result__title">
            {"'" + term + "' 관련 포스팅"}
          </h2>
          {postData ? <Board postData={postData} /> : ""}
        </article>
      </main>
    </div>
  );
}
