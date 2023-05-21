import Board from "../component/board/Board";
import "./style.css";

export default function Others({ title, postData }) {
  return (
    <div className="main__content main__content--topic">
      <Board title={title} postData={postData} postNum={35} />
      <section className="hits">
        <aside className="hits__wrapper">
          <h2 className="hits__title">{"Hits"}</h2>
          <Hits postNum={20} />
          <Hits postNum={10} />
        </aside>
      </section>
    </div>
  );
}

function Hits({ postNum }) {
  return (
    <ul className="hits-board">
      {Array(postNum)
        .fill("")
        .map((ele, idx) => {
          return (
            <li className="hits-board__post">
              <span
                className={
                  "hits-board__order" +
                  (idx < 3 ? " hits-board__order--best" : "")
                }
              >
                {idx + 1}
              </span>

              <a href="/post?title=" className="hits-board__title">
                {"여기에 따봉수로 컷한글 15개"}
              </a>
              <span className="hits-board__like">{12}</span>
            </li>
          );
        })}
    </ul>
  );
}
