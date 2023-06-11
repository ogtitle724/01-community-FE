import Board from "../board/Board";
import "./style.css";

export default function Best({ posts, mainEle }) {
  return (
    <div className="main__content">
      <Board title={"Best Posts"} posts={posts} mainEle={mainEle} />
    </div>
  );
}
