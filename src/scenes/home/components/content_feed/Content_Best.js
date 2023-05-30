import Board from "../board/Board";
import "./style.css";

export default function Best({ posts, page, setPage }) {
  return (
    <div className="main__content">
      <Board title={"Best Posts"} posts={posts} page={page} setPage={setPage} />
    </div>
  );
}
