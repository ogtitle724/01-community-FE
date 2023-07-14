import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectPage,
  setPage,
  setScrollY,
} from "../../../../redux/slice/pageSlice";
import timeConverter from "../../../../components/util/time_converter";
import "./style.css";

export default function Board({ posts, mainEle }) {
  const title = useSelector(selectCategory);

  return (
    <section className="board">
      <h2 className="board__title">{title === "HOME" ? "BEST" : title}</h2>
      <ul
        className={
          "board__ul" + (posts.content.length ? "" : " board__skeleton")
        }
      >
        {posts.content.length ? (
          posts.content.map((post, idx) => {
            return <Post key={"post_" + idx} post={post} mainEle={mainEle} />;
          })
        ) : (
          <span className="board__notification">
            {"첫 게시물을 작성해주세요 :)"}
          </span>
        )}
      </ul>
      <Nav posts={posts} />
    </section>
  );
}

function Post({ post, mainEle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeDisplay = timeConverter(post.wr_date);

  const handleClickPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_PATH_VIEW, {
        postId: post.id,
      });
    } catch (err) {
      console.log(err);
    }

    dispatch(setScrollY({ scrollY: mainEle.current.scrollTop }));
    navigate(process.env.REACT_APP_ROUTE_POST, { state: { postId: post.id } });
  };

  return (
    <li className="post">
      <a
        className="post__a"
        href="/post"
        id={post.id}
        onClick={(e) => handleClickPost(e)}
      >
        <span className="post__span">{post.title}</span>
      </a>
      <div className="post__data-wrapper">
        <div className="post__wrtier">
          <div className="post__writer-level"></div>
          <span className="post__writer-nick">{post.user.nick}</span>
        </div>
        <span className="post__data post__category">
          {post.category ? post.category : "카테고리 없음"}
        </span>
        <span className="post__data post__view">{post.view_cnt}</span>
        <span className="post__data post__date">{timeDisplay} </span>
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
