import axios from "axios";
import {
  selectSearchPage,
  setSearchPage,
} from "../../../../redux/slice/pageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import timeConverter from "../../../../components/util/time_converter";
import "./style.css";

export default function Board({ postData }) {
  const posts = postData.content;

  return (
    <>
      {posts.length ? (
        posts.map((post, idx) => {
          return <Post post={post} idx={idx} />;
        })
      ) : (
        <span className="search-board__notfound">
          {"일치하는 게시물이 없습니다 :("}
        </span>
      )}
      <Nav postData={postData} />
    </>
  );
}

function Post({ post, idx }) {
  const navigate = useNavigate();
  const timeDisplay = timeConverter(post.wr_date);

  const handleClickPost = async (e, post) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_PATH_VIEW, {
        postId: post.id,
      });
    } catch (err) {
      console.log(err);
    }
    navigate(process.env.REACT_APP_ROUTE_POST, { state: { postId: post.id } });
  };

  return (
    <a
      key={"search_" + idx}
      href="/post"
      className="search-board__a"
      onClick={(e) => handleClickPost(e, post)}
    >
      <h3 className="search-board__title">{post.title}</h3>
      <section className="search-board__data-wrapper">
        <div className="search-board__writer-data">
          <div className="search-board__img"></div>
          <span className="search-board__nick">{post.user.nick}</span>
        </div>
        <span className="search-board__category">
          {post.category ? post.category : "카테고리 없음"}
        </span>
        <span className="search-board__view">{post.view_cnt}</span>
        <span className="search-board__date">{timeDisplay}</span>
      </section>
    </a>
  );
}

function Nav({ postData }) {
  const [navPage, setNavPage] = useState(0);
  const page = useSelector(selectSearchPage);
  const dispatch = useDispatch();
  const navItems = useRef();
  navItems.current = Array(postData.totalPages)
    .fill(1)
    .map((ele, idx) => ele + idx);

  const handleClickPrev = () => {
    if (navPage > 0) {
      setNavPage((prevNavPage) => prevNavPage - 1);
    }
  };

  const handleClickNext = () => {
    const totalPages = ~~(postData.totalPages / 10);
    if (navPage < totalPages) {
      setNavPage((prevNavPage) => prevNavPage + 1);
    }
  };

  const handleClickNav = (pageNum) => {
    sessionStorage.setItem("searchPage", pageNum);
    dispatch(setSearchPage({ nextPage: pageNum }));
  };

  return (
    <nav className="search-board__nav">
      <li className="search-board__nav-btn" onClick={handleClickPrev}>
        {"<"}
      </li>
      {navItems.current
        .slice(navPage * 10, navPage * 10 + 10)
        .map((ele, idx) => {
          return (
            <li
              className={
                "search-board__nav-btn" +
                (page === ele ? " search-board__nav-btn--focus" : "")
              }
              key={idx}
              onClick={() => handleClickNav(ele)}
            >
              {ele}
            </li>
          );
        })}
      <li className="search-board__nav-btn" onClick={handleClickNext}>
        {">"}
      </li>
    </nav>
  );
}
