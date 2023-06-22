import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectPage,
  setPage,
  setScrollY,
} from "../../../../redux/slice/pageSlice";
import "./style.css";

export default function Board({ posts, mainEle }) {
  const title = useSelector(selectCategory);

  return (
    <section className="board">
      <h2 className="board__title">{title === "HOME" ? "BEST" : title}</h2>
      <ul>
        {posts.content.map((post, idx) => {
          return <Post key={"post_" + idx} post={post} mainEle={mainEle} />;
        })}
      </ul>
      <Nav posts={posts} />
    </section>
  );
}

function Post({ post, mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickPost = async (e) => {
    e.preventDefault();
    dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
    navigate(`/post`, { state: post });
  };

  return (
    <li className="post">
      <a
        className="post__title"
        href="/post"
        id={post.id}
        onClick={(e) => handleClickPost(e)}
      >
        {post.title}
      </a>
      <div className="post__data-wrapper">
        <p className="post__data">{post.category + " | " + post.view_cnt}</p>
        <p className="post__data">{post.wr_date} </p>
      </div>
    </li>
  );
}

function Nav({ posts }) {
  const [navPage, setNavPage] = useState(0);
  const page = useSelector(selectPage);
  const navItems = useRef();
  const dispatch = useDispatch();

  navItems.current = Array(posts.totalPages)
    .fill(1)
    .map((ele, idx) => ele + idx);

  const handleClickPrev = () => {
    if (navPage > 0) setNavPage(navPage - 1);
  };

  const handleClickNext = () => {
    if (navPage < ~~(posts.totalPages / 10)) setNavPage(navPage + 1);
  };

  const handleClickNav = (pageNum) => {
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setPage({ nextPage: pageNum }));
  };

  return (
    <ul className="board__nav">
      <li
        className="board__nav-btn board__nav-btn-direction"
        onClick={handleClickPrev}
      >
        {"❮"}
      </li>
      {navItems.current
        .slice(navPage * 10, navPage * 10 + 10)
        .map((ele, idx) => {
          return (
            <li
              className={
                "board__nav-btn" +
                (page === ele ? " board__nav-btn--focus" : "")
              }
              key={"navItem_" + idx}
              onClick={() => handleClickNav(ele)}
            >
              {ele}
            </li>
          );
        })}
      <li
        className="board__nav-btn board__nav-btn-direction"
        onClick={handleClickNext}
      >
        {"❯"}
      </li>
    </ul>
  );
}
