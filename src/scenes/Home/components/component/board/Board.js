import { useState } from "react";
import "./style.css";

export default function Board({ title, postData, pageNum, setPageNum }) {
  return (
    <section className="board">
      <h2 className="board__title">{title}</h2>
      <ul>
        {postData.content.map((post, idx) => {
          return <Post key={"post_" + idx} post={post} />;
        })}
      </ul>
      <nav className="board__nav">
        <div className="board__nav-direction center-x">
          {String.fromCharCode(94)}
        </div>
        <li
          className="board__nav-btn"
          onClick={() => {
            if (pageNum > 1) {
              setPageNum(pageNum + 1);
            }
          }}
        >
          {"<"}
        </li>
        {Array(postData.totalPages)
          .fill("")
          .map((ele, idx) => {
            return (
              <li
                className="board__nav-btn"
                key={idx}
                onClick={(e) => setPageNum(Number(e.target.innerText))}
              >
                {idx + 1}
              </li>
            );
          })}
        <li
          className="board__nav-btn"
          onClick={() => {
            if (pageNum < postData.totalPages + 1) {
              setPageNum(pageNum + 1);
            }
          }}
        >
          {">"}
        </li>
      </nav>
    </section>
  );
}

function Post({ post }) {
  return (
    <li className="post">
      <a className="post__title" href={`/post?id=${post.id}`}>
        {post.title}
      </a>
      <div className="post__data-wrapper">
        <p className="post__data">{post.category + " | " + post.view_cnt}</p>
        <p className="post__data">{post.wr_date.slice(11, 16)} </p>
      </div>
    </li>
  );
}
