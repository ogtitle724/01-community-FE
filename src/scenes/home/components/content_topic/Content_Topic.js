import Board from "../board/Board";
import "./style.css";

export default function Others({ title, postData, page, setPage }) {
  return (
    <div className="main__content main__content--topic">
      <Board
        title={title}
        postData={postData}
        postNum={35}
        page={page}
        setPage={setPage}
      />
      <section className="main__hits">
        <Hits />
      </section>
    </div>
  );
}
function Hits() {
  return (
    <aside className="hits__wrapper">
      <h2 className="hits__title">{"Hits"}</h2>
      <HitTitles postNum={20} />
      <HitComments postNum={10} />
    </aside>
  );
}

function HitTitles({ hitPostData }) {
  return (
    <ul className="hits-board hits-board--posts">
      {Array(20)
        .fill("")
        .map((ele, idx) => {
          return (
            <li
              key={"hitTitle_" + idx}
              className="hits-board__li hits-board__li--posts"
            >
              <span
                className={
                  "hits-board__order" +
                  (idx < 3 ? " hits-board__order--best" : "")
                }
              >
                {idx + 1}
              </span>

              <a href="/post?title=" className="hits-board__a">
                <span className="hits-board__a-title center-y">
                  {
                    "최근 일정기간 조회수, 좋아요, 댓글 등을 바탕으로 정렬한 포스팅"
                  }
                </span>
              </a>
              <span className="hits-board__like">{12}</span>
            </li>
          );
        })}
    </ul>
  );
}

function HitComments({ hitCommentData }) {
  return (
    <ul className="hits-board hits-board--comments">
      {Array(10)
        .fill("")
        .map((ele, idx) => {
          return (
            <li key={idx + "hits"} className="hits-board__li">
              <span
                className={
                  "hits-board__order" +
                  (idx < 3 ? " hits-board__order--best" : "")
                }
              >
                {idx + 1}
              </span>
              <a href="/post?title=" className="hits-board__a">
                <span className="hits-board__a-title center-y">
                  {"최근 일정기간 좋아요 증가순 정렬한 댓글"}
                </span>
              </a>
              <span className="hits-board__like">{12}</span>
            </li>
          );
        })}
    </ul>
  );
}
