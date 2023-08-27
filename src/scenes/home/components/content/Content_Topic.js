import { useSelector } from "react-redux";
import { selectCategory } from "../../../../redux/slice/pageSlice";
import Board from "../../../../components/board/Board";
import "./style.css";

export default function Others({ posts, mainEle }) {
  const category = useSelector(selectCategory);
  return (
    <div className="board-pre">
      <Board posts={posts} postNum={35} mainEle={mainEle} title={category} />
    </div>
  );
}
