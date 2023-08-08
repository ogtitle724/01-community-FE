import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { selectSearchPage, selectScrollY } from "../../redux/slice/pageSlice";
import { useSelector } from "react-redux";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import Board from "../../components/board/Board";
import "./style.css";

export default function SearchResult() {
  const page = useSelector(selectSearchPage);
  const scrollY = useSelector(selectScrollY);
  const mainEle = useRef();
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
  }, [term, page]);

  if (mainEle.current) {
    if (scrollY) {
      mainEle.current.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });
    } else {
      mainEle.current.scrollTo({
        top: scrollY,
        behavior: "auto",
      });
    }
  }

  return (
    <div className="search-result">
      <Header />
      <Gnb />
      <main ref={mainEle} className="search-result__main">
        <section className="search-result__content">
          <h3 hidden>{"'" + term + "' 관련 포스팅"}</h3>
          <div className="board-pre">
            {postData && (
              <Board
                posts={postData}
                mainEle={mainEle}
                title={"'" + term + "' 관련 게시물"}
              />
            )}
          </div>
          {/* {postData ? <Board postData={postData} /> : ""} */}
        </section>
      </main>
    </div>
  );
}
