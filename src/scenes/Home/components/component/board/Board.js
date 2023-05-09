import { useState } from "react";
import "./style.css";

const initialPost = {
  id: 123,
  title:
    "An overview of the COVID-19 Pandemic Impact on Small Businesses in the U.S",
  description: "this is sample description for post",
  date: "2023.5.1",
  time: "23:52",
  writer: "samS732",
  view: 57,
  like: 30,
  dislike: 4,
  category: "유머",
  comment: [],
};

export default function Board({ title, postData, postNum }) {
  const [pageNum, setPageNum] = useState(0);

  function Post({ postData }) {
    return (
      <li className="post">
        <a className="post__title" href={`/post?id=${postData.id}`}>
          {postData.title}
        </a>
        <div className="post__data-wrapper">
          <p className="post__data">
            {postData.category + " | " + postData.view}
          </p>
          <p className="post__data">{postData.time} </p>
        </div>
      </li>
    );
  }

  return (
    <section className="board">
      <h2 className="board__title">{title}</h2>
      <ul>
        {Array(postNum)
          .fill(initialPost)
          .map((post, idx) => {
            return <Post key={"post_" + idx} postData={post} />;
          })}
      </ul>
      <nav className="board__nav">
        <div className="board__nav-direction center-x">
          {String.fromCharCode(94)}
        </div>
        <li
          className="board__nav-btn"
          onClick={() => {
            let curr = pageNum;
            setPageNum(curr + 1);
          }}
        >
          {"<"}
        </li>
        {Array(postData.length / 25)
          .fill("")
          .map((ele, idx) => {
            return (
              <li
                className="board__nav-btn"
                key={idx}
                onClick={() => setPageNum(idx + 1)}
              >
                {idx + 1}
              </li>
            );
          })}
        <li
          className="board__nav-btn"
          onClick={() => {
            let curr = pageNum;
            setPageNum(curr + 1);
          }}
        >
          {">"}
        </li>
      </nav>
    </section>
  );
}
