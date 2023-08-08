import HorizontalList from "../horizontal_list/Horizontal_List";
import Board from "../../../../components/board/Board";
import "./style.css";

export default function ContentHome({ posts, mainEle }) {
  return (
    <>
      <HorizontalList />
      <div className="board-pre">
        <Board posts={posts} mainEle={mainEle} title={"최신글"} />
      </div>
    </>
  );
}
