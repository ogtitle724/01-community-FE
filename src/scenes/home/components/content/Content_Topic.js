import { useSelector } from "react-redux";
import { selectCategory } from "../../../../redux/slice/pageSlice";
import Board from "../../../../components/board/Board";

export default function ContentTopic({ posts }) {
  const category = useSelector(selectCategory);

  return <Board posts={posts} postNum={35} title={category} />;
}
