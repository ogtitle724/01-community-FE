import HorizontalList from "../horizontal_list/Horizontal_List";
import Board from "../board/Board";
import "./style.css";

export default function ContentHome({ posts, mainEle }) {
  return (
    <div className="main__content">
      <HorizontalList />
      <Board posts={posts} mainEle={mainEle} />
    </div>
  );
}
