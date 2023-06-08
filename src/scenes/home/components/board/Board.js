import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Board({ title, posts, page, setPage }) {
  return (
    <section className="board">
      <h2 className="board__title">{title}</h2>
      <ul>
        {posts.content.map((post, idx) => {
          return <Post key={"post_" + idx} post={post} />;
        })}
      </ul>
      <Nav posts={posts} page={page} setPage={setPage} />
    </section>
  );
}

function Post({ post }) {
  const navigate = useNavigate();

  const handleClickPost = async (e) => {
    e.preventDefault();
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

function Nav({ posts, page, setPage }) {
  const [navPage, setNavPage] = useState(0);
  const navItems = useRef();
  navItems.current = Array(posts.totalPages)
    .fill(1)
    .map((ele, idx) => ele + idx);

  return (
    <nav className="board__nav">
      <div className="board__nav-direction center-x">
        {String.fromCharCode(94)}
      </div>
      <li
        className="board__nav-btn"
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
                "board__nav-btn" +
                (page === ele ? " board__nav-btn--focus" : "")
              }
              key={"navItem_" + idx}
              onClick={() => setPage(ele)}
            >
              {ele}
            </li>
          );
        })}
      <li
        className="board__nav-btn"
        onClick={() => {
          if (navPage < ~~(posts.totalPages / 10)) setNavPage(navPage + 1);
        }}
      >
        {">"}
      </li>
    </nav>
  );
}
