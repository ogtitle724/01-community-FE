import HorizontalList from "../horizontal_list/Horizontal_List";
import Board from "../board/Board";
import "./style.css";

export default function ContentHome({ posts }) {
  return (
    <div className="main__content">
      <HorizontalList />
      <Board title={"Recent Posts"} posts={posts} />
    </div>
  );
}
