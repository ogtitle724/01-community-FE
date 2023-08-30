import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  selectScrollY,
  setPage,
  setScrollY,
} from "../../redux/slice/pageSlice";
import timeConverter from "../../util/time_converter";
import "./style.css";

export default function Board({ posts, mainEle, title }) {
  const [isDivide, setIsDivide] = useState(false);
  const scrollY = useSelector(selectScrollY);
  const handleChangeLayout = () => {
    setIsDivide(!isDivide);
  };

  if (scrollY) {
    mainEle.current.scrollTo({
      top: scrollY,
      behavior: "instant",
    });
  } else {
    mainEle.current.scrollTo({
      top: scrollY,
      behavior: "instant",
    });
  }

  return (
    <>
      <section className="board">
        <h2 className="board__title">{title}</h2>
        <button
          className={
            "board__btn-layout" +
            (isDivide ? " board__btn-layout--grid" : " board__btn-layout--list")
          }
          onClick={handleChangeLayout}
        ></button>
        <ul
          className={
            posts.content.length
              ? "board__ul" + (isDivide ? " board__ul--grid" : "")
              : "board__skeleton"
          }
        >
          {posts.content.length ? (
            posts.content.map((post, idx) => {
              return <Post key={"post_" + idx} post={post} mainEle={mainEle} />;
            })
          ) : (
            <span className="board__notification">
              {"게시물이 존재하지 않습니다 :("}
            </span>
          )}
        </ul>
        {posts.totalPages > 1 && <Nav posts={posts} />}
      </section>
    </>
  );
}

function Post({ post, mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const time = timeConverter(post.wr_date);

  const handleClickPost = async () => {
    dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
    navigate(process.env.REACT_APP_ROUTE_POST + `/${post.id}`);
  };

  return (
    <li className="board-item" onClick={handleClickPost}>
      <span className="board-item__category">{post.category}</span>
      <h3 className="board-item__title">{post.title}</h3>
      <div className="board-item__data-wrapper">
        <div className="board-item__data board-item__view">
          <span>{post.view_cnt}</span>
        </div>
        <div className="board-item__data board-item__like">
          <span>{post.recommend_cnt}</span>
        </div>
        <div className="board-item__data board-item__comment">
          <span>{post.comment_cnt}</span>
        </div>
        <span className="board-item__nick">{post.nick}</span>
        <span className="board-item__date">{time} </span>
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
