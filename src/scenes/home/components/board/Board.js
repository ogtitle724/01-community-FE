import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
        href="#"
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
  return (
    <nav className="board__nav">
      <div className="board__nav-direction center-x">
        {String.fromCharCode(94)}
      </div>
      <li
        className="board__nav-btn"
        onClick={() => {
          if (page > 1) {
            setPage(page + 1);
          }
        }}
      >
        {"<"}
      </li>
      {Array(posts.totalPages)
        .fill("")
        .map((ele, idx) => {
          return (
            <li
              className={
                "board__nav-btn" +
                (page === idx + 1 ? " board__nav-btn--focus" : "")
              }
              key={idx}
              onClick={(e) => setPage(Number(e.target.innerText))}
            >
              {idx + 1}
            </li>
          );
        })}
      <li
        className="board__nav-btn"
        onClick={() => {
          if (page < posts.totalPages + 1) {
            setPage(page + 1);
          }
        }}
      >
        {">"}
      </li>
    </nav>
  );
}
