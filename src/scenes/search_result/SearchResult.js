import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import Board from "./components/board/Board";
import "./style.css";

export default function SearchResult() {
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState();
  const location = useLocation();
  const term = location.state.term;
  console.log("rendering");

  const getSearchData = async (term, page) => {
    try {
      console.log("await");
      const res = await axios.get(
        `/api/board/search?page=${page - 1}&size=20&term=${term}`
      );
      setPostData(JSON.parse(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSearchData(term, page);
    setPage(1);
    console.log("eff 2");
  }, [term]);

  useEffect(() => {
    getSearchData(term, page);
    console.log("eff 1");
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
          {postData ? (
            <Board postData={postData} page={page} setPage={setPage} />
          ) : (
            <div className="loading"></div>
          )}
        </article>
      </main>
    </div>
  );
}
