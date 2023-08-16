import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage, setScrollY } from "../../redux/slice/pageSlice";
import timeConverter from "../../util/time_converter";
import "./style.css";

export default function Board({ posts, mainEle, title }) {
  const [isDivide, setIsDivide] = useState(false);
  const handleChangeLayout = () => {
    setIsDivide(!isDivide);
  };

  return (
    <>
      <section className="board">
        <h2 className="board__title">{title}</h2>
        <button
          className={
            "board__btn-layout" +
            (isDivide
              ? " board__btn-layout--two-line"
              : " board__btn-layout--one-line")
          }
          onClick={handleChangeLayout}
        ></button>
        <ul
          className={
            posts.content.length
              ? "board__ul" +
                (isDivide ? " board__ul--two-line" : " board__ul--one-line")
              : " board__skeleton"
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
        <Nav posts={posts} />
      </section>
    </>
  );
}

function Post({ post, mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeDisplay = timeConverter(post.wr_date);

  const handleClickPost = async (e) => {
    e.preventDefault();
    dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
    navigate(process.env.REACT_APP_ROUTE_POST, { state: { postId: post.id } });
  };

  return (
    <li className="post-li" onClick={(e) => handleClickPost(e)}>
      <span className="post-li__category">
        {post.category ? post.category : "카테고리 없음"}
      </span>
      <h3 className="post-li__title">{post.title}</h3>
      <div className="post-li__data-wrapper">
        <span className="post-li__data post-li__view">{post.view_cnt}</span>
        <span className="post-li__data post-li__like">{76}</span>
        <span className="post-li__data post-li__comment">{17}</span>
        <span className="post-li__data post-li__nick">{post.nick}</span>
        <span className="post-li__data post-li__date">{timeDisplay} </span>
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
