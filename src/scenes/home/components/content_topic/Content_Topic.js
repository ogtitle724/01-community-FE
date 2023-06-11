import Board from "../board/Board";
import "./style.css";

export default function Others({ posts, mainEle }) {
  return (
    <div className="main__content main__content--topic">
      <Board posts={posts} postNum={35} mainEle={mainEle} />
      <section className="main__hit">
        <Hit />
      </section>
    </div>
  );
}
function Hit() {
  return (
    <aside className="hit__wrapper">
      <h2 className="hit__title">{"Hit"}</h2>
      <HitTitles postNum={20} />
      <HitComments postNum={10} />
    </aside>
  );
}

function HitTitles({ hitPostData }) {
  return (
    <ul className="hit-board hit-board--post">
      {Array(20)
        .fill("")
        .map((ele, idx) => {
          return (
            <li
              key={"hitTitle_" + idx}
              className="hit-board__li hit-board__li--post"
            >
              <span
                className={
                  "hit-board__order" +
                  (idx < 3 ? " hit-board__order--best" : "")
                }
              >
                {idx + 1}
              </span>

              <a href="/post?title=" className="hit-board__a">
                <span className="hit-board__a-title center-y">
                  {
                    "최근 일정기간 조회수, 좋아요, 댓글 등을 바탕으로 정렬한 포스팅"
                  }
                </span>
              </a>
              <span className="hit-board__like">{12}</span>
            </li>
          );
        })}
    </ul>
  );
}

function HitComments({ hitCommentData }) {
  return (
    <ul className="hit-board hit-board--comment">
      {Array(10)
        .fill("")
        .map((ele, idx) => {
          return (
            <li key={idx + "hit"} className="hit-board__li">
              <span
                className={
                  "hit-board__order" +
                  (idx < 3 ? " hit-board__order--best" : "")
                }
              >
                {idx + 1}
              </span>
              <a
                href="/post?title="
                className="hit-board__a hit-board__a--comment"
              >
                <span className="hit-board__a-title hit-board__a-title--comment center-y">
                  {"최근 일정기간 좋아요 증가순 정렬한 댓글"}
                </span>
              </a>
              <span className="hit-board__like">{12}</span>
            </li>
          );
        })}
    </ul>
  );
}
