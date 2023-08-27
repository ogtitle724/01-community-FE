import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { selectPage } from "../../redux/slice/pageSlice";
import { useSelector } from "react-redux";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import Board from "../../components/board/Board";
import "./style.css";

export default function SearchResult() {
  const page = useSelector(selectPage);
  const mainEle = useRef();
  const [postData, setPostData] = useState();
  const location = useLocation();
  const term = location.state.term;

  useEffect(() => {
    const getSearchData = async (term, page) => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_PATH_SEARCH +
            `?page=${page - 1}&size=20&searchTerm=${term}`
        );
        setPostData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSearchData(term, page);
  }, [term, page]);

  return (
    <div className="search-result">
      <Header />
      <Gnb />
      <main ref={mainEle} className="search-result__main">
        <section className="search-result__content">
          <h3 hidden>{"'" + term + "' 관련 게시물"}</h3>
          <div className="board-pre">
            {postData && (
              <Board
                posts={postData}
                mainEle={mainEle}
                title={"'" + term + "' 관련 게시물"}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
