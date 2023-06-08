import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Board({ postData, page, setPage }) {
  const posts = postData.content;
  const navigate = useNavigate();

  const handleClickPost = async (e, post) => {
    e.preventDefault();
    navigate(`/post`, { state: post });
  };

  return (
    <>
      {posts ? (
        posts.map((post, idx) => {
          return (
            <a
              key={"search_" + idx}
              href="/post"
              className="search-board__a"
              onClick={(e) => handleClickPost(e, post)}
            >
              <h3 className="search-board__title">{post.title}</h3>
              <section className="search-board__data-wrapper">
                <span className="search-board__category">{post.category}</span>
                <span className="search-board__date">
                  {post.wr_date.slice(-8, -3)}
                </span>
              </section>
            </a>
          );
        })
      ) : (
        <span className="search-board__notfound">
          {"일치하는 게시물이 없습니다 :("}
        </span>
      )}
      <Nav postData={postData} page={page} setPage={setPage} />
    </>
  );
}

function Nav({ postData, page, setPage }) {
  const [navPage, setNavPage] = useState(0);
  const navItems = useRef();
  console.log(navPage, page);
  navItems.current = Array(postData.totalPages)
    .fill(1)
    .map((ele, idx) => ele + idx);

  return (
    <nav className="search-board__nav">
      <li
        className="search-board__nav-btn"
        onClick={() => {
          if (navPage > 0) setNavPage(navPage - 1);
        }}
      >
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
              onClick={(e) => setPage(ele)}
            >
              {ele}
            </li>
          );
        })}
      <li
        className="search-board__nav-btn"
        onClick={() => {
          if (navPage < ~~(postData.totalPages / 10)) setNavPage(navPage + 1);
        }}
      >
        {">"}
      </li>
    </nav>
  );
}
